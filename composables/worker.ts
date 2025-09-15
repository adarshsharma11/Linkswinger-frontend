import { v4 as uuid } from 'uuid';
import { idStore } from '~/store/appstores'
import mitt from 'mitt'

const uniqueId = uuid();
var is_connected = false
let sharedWorker: SharedWorker
const emitter = mitt<Events>()
type Events = {
  serverTime: Date,
  socketConnection: boolean,
}
let onlinemodel : OnlineEventResponse  | null = null
export function initworker() {

  const id_store = idStore();
  var vendorId = id_store.getDeviceId

  if (vendorId.length === 0) {
    vendorId = uniqueId
    id_store.setVendorId(uniqueId)
  }

  sharedWorker = new SharedWorker(
    new URL('@/workers/shared-worker.ts', import.meta.url),
    { name: 'mySharedWorker' }
  );

  sharedWorker.port.onmessage = async (event) => {
    await handleworkerevent(event)
  };

  sharedWorker.port.start();
}

export function sendmsgtoworker(message: any) {
  sharedWorker.port.postMessage(message)
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

  if (json.event_name === "connection") {
    let onlinemodel = event.data as SocketConnectionModel
    is_connected = onlinemodel.is_connected ?? false
    emitter.emit('socketConnection', is_connected)
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
}
