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

export class WorkerModel implements SocketEventModel {
  event_name?: string;
  user_id?: number
  type?: string
  url?: string
  progress?: number
  timeStamp?: number
  media_id?: string
  media_type?: string
  feed_type?: string
  feed_desc?: string
}

export class ChatEventSocketModel implements SocketEventModel {
  chat_id?: number;
  from_id?: number;
  to_id?: number;
  from_type?: string;
  to_type?: string;
  message_type?: string;
  message?: string;
  video?: string;
  event_name!: string;
  success!: boolean;
  created_at?: string;
  media_path?: string;
  socket_id?: string;
}

export class GroupEventSocketModel implements SocketEventModel {
  event_name!: string;
  admin_id?: number;
  user_ids?: number[];
  socket_id? : string
}
