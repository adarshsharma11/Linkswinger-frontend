import type { RouletteWorkerModel } from "./models";
import { detectonline } from "./useDatabase";

var is_reconnecting = false
let websocketURL = "wss://linkswingers.co.uk/websocket"
let socket: WebSocket | null = null;
let intervalId: ReturnType<typeof setInterval> | null = null
export function setupWebSocket() {

    if (socket) {
        socket.onopen = null;
        socket.onmessage = null;
        socket.onerror = null;
        socket.onclose = null;
        try {
            socket.close();
        } catch (err) {
            console.warn("Error closing old socket:", err);
        }
        socket = null;
    }
    const id_store = idStore();
    const user_store = userStore();
    var socketId = id_store.getDeviceId
    var loginId = user_store.getLoginId ?? 0
    const initsocket = new WebSocket(
        `${websocketURL}?socketId=${encodeURIComponent(socketId)}&loginId=${encodeURIComponent(loginId)}`
    );

    initsocket.onopen = () => {
        is_reconnecting = false
        console.log("websocket connected. we are ready to go", socketId)
        detectonline()
        let connectedmodel = new SocketConnectionModel()
        connectedmodel.is_connected = true
        connectedmodel.event_name = "connection"
        sendmsgtoworker(connectedmodel, true)
    };
    initsocket.onmessage = async (event) => {
        let eventdata = event.data as Blob
        await handlesocketevent(eventdata)
    };
    initsocket.onerror = (error) => {
        is_reconnecting = false
        initsocket.close()
        console.log("websocket error.")
    };
    initsocket.onclose = (event) => {
        console.log("websocket onclose.", is_reconnecting)
        if (!is_reconnecting) {
            clearsocket()
            is_reconnecting = false
            setTimeout(reconnect, 1000);
            let connectedmodel = new SocketConnectionModel()
            connectedmodel.is_connected = false
            connectedmodel.event_name = "connection"
            sendmsgtoworker(connectedmodel, true)
        }

    };
    socket = initsocket
}

function useServerTimeFromSocket(initialServerTime: string) {
    if (intervalId) {

        clearInterval(intervalId)
    }
    let serverTime = new Date(initialServerTime)
    intervalId = setTimeout(() => {
        if (serverTime) {
            let newTime = new Date(serverTime.getTime() + 1000)
            let connectedmodel = new ServerDateSocketModel()
            connectedmodel.server_date = newTime.toString()
            connectedmodel.event_name = "worker_timer"
            sendmsgtoworker(connectedmodel, true)
            useServerTimeFromSocket(newTime.toString())
        }
    }, 1000)
}
async function handlesocketevent(eventdata: Blob) {
    let jsontext = await eventdata.text()
    let json = JSON.parse(jsontext) as SocketEventModel
    let event_name = json.event_name

    if (event_name === "server_date") {
        let json = JSON.parse(jsontext) as ServerDateSocketModel
        useServerTimeFromSocket(json.server_date ?? "")
        sendmsgtoworker(json, true,true)
    }
    else if (event_name === "logout") {
        let json = JSON.parse(jsontext) as OnlineEventResponse
        sendmsgtoworker(json, true,true)
        logoutself()
    }
    else if (event_name === "online") {
        let json = JSON.parse(jsontext) as OnlineEventResponse
        if (json.success) {
          sendmsgtoworker(json, true,true)
            console.log("onlineeee")
        }
        else {
            json.event_name = "logout"
           sendmsgtoworker(json, true,true)
            logoutself()
        }
    }
    else if (event_name === "chat_sent" || event_name === "chat_response") {
        let json = JSON.parse(jsontext) as ChatEventSocketModel
     sendmsgtoworker(json, true,true)
    }
    else if (event_name === "user_updated_to_group") {
        let json = JSON.parse(jsontext) as GroupEventSocketModel
         sendmsgtoworker(json, true,true)
    }
    else if (event_name === "typing_response") 
    {
        let json = JSON.parse(jsontext) as TypingEventSocketModel
  sendmsgtoworker(json, true,true)
    }
    else if (event_name === "chat_update_status") 
    {
        let json = JSON.parse(jsontext) as ChatEventSocketModel
        sendmsgtoworker(json, true,true)
    }
     else if (event_name === "chat_delete") 
    {
        let json = JSON.parse(jsontext) as  ChatEventSocketModel
         sendmsgtoworker(json, true,true)
    }
else if (event_name === "call_alert") 
    {
        let json = JSON.parse(jsontext) as  CallAlertModel
        sendmsgtoworker(json, true,true)
    }
    else if (event_name === "call_decline_alert") 
    {
        let json = JSON.parse(jsontext) as  CallAlertModel
         sendmsgtoworker(json, true,true)
    }
    else if (event_name === "call_accept_alert") 
    {
        let json = JSON.parse(jsontext) as  CallAlertModel
         sendmsgtoworker(json, true,true)
    }
    else if (event_name === "call_end_alert") 
    {
        let json = JSON.parse(jsontext) as  CallAlertModel
         sendmsgtoworker(json, true,true)
    }
    else if (event_name === "call") 
    {
        let json = JSON.parse(jsontext) as  CallSocketModel
         sendmsgtoworker(json, true,true)
    }
    else if (event_name === "random_match_server_push") 
    {
         let json = JSON.parse(jsontext) as  RouletteWorkerModel
         sendmsgtoworker(json, true,true)
    }
    else if (json.event_name === "random_user_remove_server_push") {
    let json = JSON.parse(jsontext) as  RouletteWorkerModel
         sendmsgtoworker(json, true,true)
    }
    
    
}

export async function onlinerole(model: OnlineSocketModel) {
    const blob = new Blob([JSON.stringify(model)], { type: "application/json" });
    socket?.send(blob)
}
export async function sendtosocket(model: any) {
    const blob = new Blob([JSON.stringify(model)], { type: "application/json" });
    socket?.send(blob)
}

function logoutself() {
    is_reconnecting = false
    socket?.close()
}

function reconnect() {
    if (!is_reconnecting) {
        is_reconnecting = true
        setupWebSocket()
        console.log("websocket reconnecting.")
    }
}

function clearsocket() {
    if (socket) {
        socket.onopen = null;
        socket.onmessage = null;
        socket.onerror = null;
        socket.onclose = null;
        socket = null
    }
}