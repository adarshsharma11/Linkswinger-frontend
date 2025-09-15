declare var self: SharedWorkerGlobalScope;
let intervalId: ReturnType<typeof setInterval> | null = null
let socket: WebSocket | null = null;
const connections: MessagePort[] = [];
let websocketURL = "wss://linkswingers.co.uk/websocket"
var socketId = ""
var is_reconnecting = false
var database: IDBDatabase | null = null

self.onconnect = (e: MessageEvent) => {
    const port = e.ports[0];
    connections.push(port);
    if (socket) {
        let copysocket = socket as WebSocket
        if (copysocket.OPEN) {
            let connectedmodel = new SocketConnectionModel()
            connectedmodel.is_connected = true
            connectedmodel.event_name = "connection"
            port.postMessage(connectedmodel)
        }
    }

    port.onmessage = async (event) => {
        opendatabase();
        let eventmodel = event.data as SocketEventModel
        let event_name = eventmodel.event_name ?? ''

        if (event_name === "socketId") {
            let socketidModel = event.data as SocketIdModel
            if (socket === null && socketId.length === 0 && !is_reconnecting) {
                setupWebSocket(socketidModel.socketId ?? '')
            }
            socketId = socketidModel.socketId ?? ''
        }
        else if (event_name === "online") {

            let online_model = event.data as OnlineSocketModel
            onlinerole(online_model)
        }

        else if (event_name === "logoutself") {
            let connectedmodel = new SocketConnectionModel()
            connectedmodel.event_name = "logoutself"
            connections.forEach((element) => {
                element.postMessage(connectedmodel)
            })
            logoutself();
        }
        


    }

};

function setupWebSocket(socketId: string) {

    var initsocket = new WebSocket(websocketURL + `?socketId=${socketId}`);

    initsocket.onopen = () => {
        is_reconnecting = false
        console.log("websocket connected. we are ready to go")
        detectonline()
        let connectedmodel = new SocketConnectionModel()
        connectedmodel.is_connected = true
        connectedmodel.event_name = "connection"
        connections.forEach((element) => {
            element.postMessage(connectedmodel)
        })
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
            connections.forEach((element) => {
                element.postMessage(connectedmodel)
            })
        }
    };
    socket = initsocket
}

async function handlesocketevent(eventdata: Blob) {
    let jsontext = await eventdata.text()
    let json = JSON.parse(jsontext) as SocketEventModel
    let event_name = json.event_name

    if (event_name === "server_date") {
        let json = JSON.parse(jsontext) as ServerDateSocketModel
        useServerTime(json.server_date ?? "")
        connections.forEach((element) => {
            element.postMessage(json)
        })
    }
    else if (event_name === "logout") {
        let json = JSON.parse(jsontext) as OnlineEventResponse
        connections.forEach((element) => {
            element.postMessage(json)
        })
        logoutself()
    }
    else if (event_name === "online") {
        let json = JSON.parse(jsontext) as OnlineEventResponse
        if (json.success) {
            connections.forEach((element) => {
                element.postMessage(json)
            })
        }
        else {
            json.event_name = "logout"
            connections.forEach((element) => {
                element.postMessage(json)
            })
            logoutself()
        }
    }
}
async function onlinerole(model: OnlineSocketModel) {
  const blob = new Blob([JSON.stringify(model)], { type: "application/json" });
  socket?.send(blob)
}

function detectonline() {
    var transaction = database?.transaction('login_store');
    var list = transaction?.objectStore('login_store');
    var idbrequest = list?.get(1)
    if (idbrequest) {
        idbrequest.onsuccess = (event) => {
            if (idbrequest) {
                if (idbrequest.result) {
                       let socketmodel = idbrequest.result as LoginDBStore
                       const onlinemodel = new OnlineSocketModel()
                       onlinemodel.event_name = "online"
                       onlinemodel.login_id = socketmodel.loginId
                       onlinemodel.socket_id = socketId
                       onlinerole(onlinemodel)
                }
            }
        }
        idbrequest.onerror = (event) => {
            console.log("eooror")
        }
    }
}

function useServerTime(initialServerTime: string) {
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
            connections.forEach((element) => {
                element.postMessage(connectedmodel)
            })
            useServerTime(newTime.toString())
        }
    }, 1000)
}


function logoutself() {
    is_reconnecting = false
    socket?.close()
}

function reconnect() {
    if (!is_reconnecting) {
        is_reconnecting = true
        setupWebSocket(socketId)
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


function opendatabase() {
    if (database === null) {
        const DBOpenRequest = self.indexedDB.open('linkswinger', 2);
        DBOpenRequest.onupgradeneeded = (event) => {
            database = DBOpenRequest.result;
        }
        DBOpenRequest.onblocked = (event) => {

        }
        DBOpenRequest.onsuccess = (event) => {
            database = DBOpenRequest.result;
        }
        DBOpenRequest.onerror = (event) => {
        }
    }

}


class SocketEventModel {
    event_name?: string
}
class OnlineSocketModel implements SocketEventModel {
    socket_id: string = "";
    login_id: number = 0;
    event_name?: string;
    online: number = 0;
}
class SocketConnectionModel {
    event_name!: string
    is_connected?: boolean
}

class ServerDateSocketModel implements SocketEventModel {
    event_name?: string
    server_date?: string
}
