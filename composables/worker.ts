import { v4 as uuid } from 'uuid';
import { idStore } from '~/store/appstores'
import mitt from 'mitt'
import { CallAlertModel, CallsModel, CallSocketModel, ChatEventSocketModel, GroupEventSocketModel, LeaderEventModel, TypingEventSocketModel } from './websocketModels';
import { detectonline } from './useDatabase';
import { setupWebSocket } from './websockets';
import type { RouletteWorkerModel, UserBannedModel } from './models';

const uniqueId = uuid();
let tab_id = uuid();

var is_connected = false
let is_leader = false
let sharedWorker: SharedWorker
let channel: BroadcastChannel;


let leaderCheckTimeout: ReturnType<typeof setInterval> | null = null
let heartBeatTimeout: ReturnType<typeof setInterval> | null = null
let leaderDiedTimeout: ReturnType<typeof setInterval> | null = null
let lastLeaderHeartbeat = Date.now();



const emitter = mitt<Events>()
export function useMittEmitter() {
  return emitter
}
type Events = {
  serverTime: Date,
  socketConnection: boolean,
  chatEvent: ChatEventSocketModel,
  chatUpdateStatus: ChatEventSocketModel,
  chatDeleteStatus: ChatEventSocketModel,
  onlineUserIds: GroupEventSocketModel,
  typing: TypingEventSocketModel,
  callAlert: CallAlertModel,
  callDeclineAlert: CallAlertModel,
  callAcceptAlert: CallAlertModel,
  callEndAlert: CallAlertModel,
  callEvent: CallSocketModel,
  random_match_server_push: RouletteWorkerModel,
  random_user_remove_server_push: RouletteWorkerModel,
  roullete_session_expired: RouletteWorkerModel,
  roullete_partner_left: RouletteWorkerModel,
  roullete_started: RouletteWorkerModel,
  roullete_start_failed: RouletteWorkerModel,
  roullete_stopped: RouletteWorkerModel,
  roullete_stop_failed: RouletteWorkerModel,
  roullete_next_success: RouletteWorkerModel,
  roullete_next_failed: RouletteWorkerModel,
  roullete_radius_success: RouletteWorkerModel,
  roullete_gender_success: RouletteWorkerModel,
}
let onlinemodel: OnlineEventResponse | null = null


export function initworker() {

  const id_store = idStore();
  var vendorId = id_store.getDeviceId
  if (vendorId.length === 0) {
    vendorId = uniqueId
    id_store.setVendorId(uniqueId)
  }

  // if (typeof SharedWorker !== 'undefined') 
  // {
  //   sharedWorker = new SharedWorker(
  //     new URL('@/workers/shared-worker.ts', import.meta.url),
  //     { name: 'mySharedWorker' }
  //   );

  //   sharedWorker.port.onmessage = async (event) => {
  //     await handleworkerevent(event)
  //   };

  //   sharedWorker.port.start();
  // }
  // else
  // {
  //   channel = new BroadcastChannel("linkswinger_channel");
  //   channel.onmessage = async (event) => {
  //      console.log("Message received from channel", event.data)
  //   }
  // }

  channel = new BroadcastChannel("linkswinger_channel");
  channel.onmessage = async (event) => {
    await handleworkerevent(event)
  }
  askForLeader();
  checkleaderDied();

}

function becomeLeader() {
  is_leader = true;
  if (leaderCheckTimeout) {
    clearTimeout(leaderCheckTimeout);
    leaderCheckTimeout = null;
  }
  setupWebSocket()
  sendHeartbeat();
}

function sendHeartbeat() {
  if (is_leader) {
    let heartbeatModel = new LeaderEventModel()
    heartbeatModel.event_name = "alive_leader"
    heartbeatModel.tab_id = tab_id
    sendmsgtoworker(heartbeatModel)
  }
  if (heartBeatTimeout) {
    clearInterval(heartBeatTimeout)
    heartBeatTimeout = null
  }
  heartBeatTimeout = setTimeout(() => {
    sendHeartbeat()
  }, 1000)
}
function checkleaderDied() {

  if (!is_leader) {
    const now = Date.now();
    if (now - lastLeaderHeartbeat > 2000) {
      becomeLeader();
      if (leaderDiedTimeout) {
        clearInterval(leaderDiedTimeout)
        leaderDiedTimeout = null
      }
    }
    else {
      if (leaderDiedTimeout) {
        clearInterval(leaderDiedTimeout)
        leaderDiedTimeout = null
      }
      leaderDiedTimeout = setTimeout(() => {
        checkleaderDied()
      }, 1000)
    }
  }
}

function askForLeader() {
  let leadermodel = new LeaderEventModel()
  leadermodel.event_name = "who_is_leader"
  leadermodel.is_asking = true
  leadermodel.tab_id = tab_id
  sendmsgtoworker(leadermodel);
  //
  leaderCheckTimeout = setTimeout(() => {
    if (!is_leader) {
      becomeLeader();
    }
  }, 1000); // wait 1s for a reply
}

export async function sendmsgtoworker(message: any, is_self: boolean = false, from_socket: boolean = false) {
  // if (typeof SharedWorker === 'undefined') {
  //   sharedWorker.port.postMessage(message)
  // }
  // else
  // {
  //   channel.postMessage(message)
  // }
  message.from_socket = from_socket
  if (is_self) {
    await handleworkerevent({ data: message } as MessageEvent<any>)
  }
  channel.postMessage(message)
}

export function useServerTime(initialServerTime: string) {
  let serverTime = new Date(initialServerTime)
  emitter.emit('serverTime', serverTime)
}

export function isSocketConnected() {
  return is_connected
}
async function handleworkerevent(event: MessageEvent<any>) {
  let json = event.data as SocketEventModel
  let from_socket = json.from_socket ?? false
  if (json.event_name === "who_is_leader") {
    if (is_leader) {
      let leadermodel = new LeaderEventModel()
      leadermodel.event_name = "i_am_leader"
      leadermodel.is_asking = false
      leadermodel.tab_id = tab_id
      sendmsgtoworker(leadermodel)
    }
    else {
      let leadermodel = new LeaderEventModel()
      leadermodel.event_name = "tab_open"
      leadermodel.is_asking = false
      leadermodel.tab_id = tab_id
      sendmsgtoworker(leadermodel)
    }
  }
  else if (json.event_name === "i_am_leader") {
    let leaderModel = event.data as LeaderEventModel
    if (leaderModel.tab_id !== tab_id) {
      is_leader = false
      if (leaderCheckTimeout) {
        clearTimeout(leaderCheckTimeout);
        leaderCheckTimeout = null;
      }
    }
  }
  else if (json.event_name === "tab_open") {
    if (leaderCheckTimeout) {
      clearTimeout(leaderCheckTimeout);
      leaderCheckTimeout = null;
    }

  }
  else if (json.event_name === "alive_leader") {
    let leadermodel = event.data as LeaderEventModel
    lastLeaderHeartbeat = Date.now();
  }
  else if (json.event_name === "connection") {
    let onlinemodel = event.data as SocketConnectionModel
    is_connected = onlinemodel.is_connected ?? false
    emitter.emit('socketConnection', is_connected)
  }
  else if (json.event_name === "loginsuccess") {
    reloadNuxtApp({ path: "/profile", ttl: 1000 });
    detectonline();
  }
  else if (json.event_name === "server_date") {
    let onlinemodel = event.data as ServerDateSocketModel
    useServerTime(onlinemodel.server_date ?? '')
  }
  else if (json.event_name === "worker_timer") {
    let onlinemodel = event.data as ServerDateSocketModel
    useServerTime(onlinemodel.server_date ?? '')
  }
  else if (json.event_name === "logout") {
    let onlinemodel = event.data as OnlineEventResponse
    showalert(onlinemodel.message ?? '')
    const user_store = userStore();
    user_store.clear()
    await clearloginstore()
    setTimeout(() => {
      reloadNuxtApp({
        path: "/",
        ttl: 1000
      })
    }, 1000);
  }
  else if (json.event_name === "logoutself") {
    const user_store = userStore();
    user_store.clear()
    await clearloginstore()
    reloadNuxtApp({
      path: "/",
      ttl: 1000
    })
  }
  else if (json.event_name === "online") {
    onlinemodel = event.data as OnlineEventResponse
  }
  else if (json.event_name === "uploading") {
    let onlinemodel = event.data as WorkerModel
    sendtosocket(onlinemodel)
  }
  else if (json.event_name === "chat") {
    let onlinemodel = event.data as WorkerModel
    sendtosocket(onlinemodel)
  }
  else if (json.event_name === "chat_sent") {
    let chatmodel = event.data as ChatEventSocketModel
    emitter.emit('chatEvent', chatmodel)
  }
  else if (json.event_name === "chat_response") {
    let chatmodel = event.data as ChatEventSocketModel
    emitter.emit('chatEvent', chatmodel)
  }
  else if (json.event_name === "add_user_to_group") {
    let onlinemodel = event.data as GroupEventSocketModel
    sendtosocket(onlinemodel)
  }
  else if (json.event_name === "typing") {
    let typingmodel = event.data as TypingEventSocketModel
    sendtosocket(typingmodel)
  }
  else if (json.event_name === "typing_response") {
    let typingmodel = event.data as TypingEventSocketModel
    emitter.emit('typing', typingmodel)
  }
  else if (json.event_name === "user_updated_to_group") {
    let json = event.data as GroupEventSocketModel

    emitter.emit('onlineUserIds', json)

  }
  else if (json.event_name === "chat_update_status") {
    let json = event.data as ChatEventSocketModel
    emitter.emit('chatUpdateStatus', json)
  }
  else if (json.event_name === "chat_read_status") {
    let json = event.data as ChatEventSocketModel
    sendtosocket(json)
  }
  else if (json.event_name === "chat_delete") {
    let json = event.data as ChatEventSocketModel
    emitter.emit('chatDeleteStatus', json)
  }

  else if (json.event_name === "call_alert") {
    let json = event.data as CallAlertModel
    emitter.emit('callAlert', json)
  }
  else if (json.event_name === "call_decline_alert") {
    let json = event.data as CallAlertModel
    emitter.emit('callDeclineAlert', json)
  }
  else if (json.event_name === "call_accept_alert") {
    let json = event.data as CallAlertModel
    emitter.emit('callAcceptAlert', json)
  }
  else if (json.event_name === "call_end_alert") {
    let json = event.data as CallAlertModel
    emitter.emit('callEndAlert', json)
  }
  else if (json.event_name === "call") {
    let json = event.data as CallSocketModel
    if (from_socket) {
      emitter.emit('callEvent', json)
    }
    else {
      sendtosocket(json)
    }
  }
  else if (json.event_name === "call_updates") {
    let json = event.data as CallAlertModel
    sendtosocket(json)
  }
  else if (json.event_name === "random_match_server_push") {
    let json = event.data as RouletteWorkerModel
    emitter.emit('random_match_server_push', json)
  }
  else if (json.event_name === "random_user_remove_server_push") {
    let json = event.data as RouletteWorkerModel
    emitter.emit('random_user_remove_server_push', json)
  }
  else if (json.event_name === "roullete_session_expired") {
    let json = event.data as RouletteWorkerModel
    emitter.emit('roullete_session_expired', json)
  }
  else if (json.event_name === "roullete_partner_left") {
    let json = event.data as RouletteWorkerModel
    emitter.emit('roullete_partner_left', json)
  }
  else if (json.event_name === "roullete_updates") {
    let json = event.data as CallAlertModel
    sendtosocket(json)
  }
  else if (json.event_name === "roullete_socket_status_updates") {
    let json = event.data as CallAlertModel
    sendtosocket(json)
  }
  else if (json.event_name === "roullete_start") {
    let json = event.data as RouletteWorkerModel
    sendtosocket(json)
  }
  else if (json.event_name === "roullete_stop") {
    let json = event.data as RouletteWorkerModel
    sendtosocket(json)
  }
  else if (json.event_name === "roullete_started") {
    let json = event.data as RouletteWorkerModel
    emitter.emit('roullete_started', json)
  }
  else if (json.event_name === "roullete_start_failed") {
    let json = event.data as RouletteWorkerModel
    emitter.emit('roullete_start_failed', json)
  }
  else if (json.event_name === "roullete_stopped") {
    let json = event.data as RouletteWorkerModel
    emitter.emit('roullete_stopped', json)
  }
  else if (json.event_name === "roullete_stop_failed") {
    let json = event.data as RouletteWorkerModel
    emitter.emit('roullete_stop_failed', json)
  }

  else if (json.event_name === "roullete_next") {
    let json = event.data as RouletteWorkerModel
    sendtosocket(json)
  }
  else if (json.event_name === "roullete_next_success") {
    let json = event.data as RouletteWorkerModel
    emitter.emit('roullete_next_success', json)
  }
  else if (json.event_name === "roullete_next_failed") {
    let json = event.data as RouletteWorkerModel
    emitter.emit('roullete_next_failed', json)
  }
  else if (json.event_name === "roullete_radius_success") {
    let json = event.data as RouletteWorkerModel
    emitter.emit('roullete_radius_success', json)
  }
  else if (json.event_name === "update_roullete_gender") {
    let json = event.data as RouletteWorkerModel
    sendtosocket(json)
  }
  else if (json.event_name === "update_roullete_radius") {
    let json = event.data as RouletteWorkerModel
    sendtosocket(json)
  }

  else if (json.event_name === "roullete_radius_success") {
    let json = event.data as RouletteWorkerModel
    emitter.emit('roullete_radius_success', json)
  }
  else if (json.event_name === "roullete_gender_success") {
    let json = event.data as RouletteWorkerModel
    emitter.emit('roullete_gender_success', json)
  }
  else if (json.event_name === "account_banned_warning") {
    let json = event.data as UserBannedModel
    let is_warning = json.is_warning ?? false
    if (is_warning === false) {
      const user_store = userStore();
      user_store.clear()
      await clearloginstore()
      reloadNuxtApp({
        path: "/",
        ttl: 1000
      })
    }
  }




}



