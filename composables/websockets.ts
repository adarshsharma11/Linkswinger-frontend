import { detectonline } from "./useDatabase";

var is_reconnecting = false
let websocketURL = "wss://linkswingers.co.uk/websocket"
let socket: WebSocket | null = null;
let intervalId: ReturnType<typeof setInterval> | null = null
export function setupWebSocket() {

    const id_store = idStore();
    var socketId = id_store.getDeviceId
    var initsocket = new WebSocket(websocketURL + `?socketId=${socketId}`);
    initsocket.onopen = () => {
        is_reconnecting = false
        console.log("websocket connected. we are ready to go")
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
    };
    initsocket.onclose = (event) => {
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
        sendmsgtoworker(json, true)
    }
    else if (event_name === "logout") {
        let json = JSON.parse(jsontext) as OnlineEventResponse
        sendmsgtoworker(json, true)
        logoutself()
    }
    else if (event_name === "online") {
        let json = JSON.parse(jsontext) as OnlineEventResponse
        if (json.success) {
            sendmsgtoworker(json, true)
        }
        else {
            json.event_name = "logout"
            sendmsgtoworker(json, true)
            logoutself()
        }
    }
  

}

export async function onlinerole(model: OnlineSocketModel) {
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