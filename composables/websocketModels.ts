export class SocketEventModel {
  event_name?: string
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