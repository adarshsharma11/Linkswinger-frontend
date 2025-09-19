export class SocketEventModel {
  event_name?: string
}

export class LeaderEventModel implements SocketEventModel {
  event_name!: string
  is_asking?: boolean
  tab_id!: string
}

export class SocketConnectionModel {
  event_name!: string
  is_connected?: boolean
}
export class SocketIdModel implements SocketEventModel {
  event_name?: string
  socketId?: string
}
export class ServerDateSocketModel implements SocketEventModel {
  event_name?: string
  server_date?: string
}

export class OnlineEventResponse implements SocketEventModel {
  event_name?: string
  success?: boolean
  message?: string
  server_date?: string
}

export class OnlineSocketModel implements SocketEventModel {
    socket_id: string = "";
    login_id: number = 0;
    event_name?: string;
    online: number = 0;
}