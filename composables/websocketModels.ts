export class SocketEventModel {
  event_name?: string
  from_socket?: boolean
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
      width?: number;
    height?: number;
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
  status?:string
  role?:string
}

export class GroupEventSocketModel implements SocketEventModel {
  event_name!: string;
  admin_id?: string;
  user_ids?: number[];
  socket_id? : string
  last_seens? : LastSeenModel[]
}

export class LastSeenModel  {
  user_id?: number;
  last_active? : string
}

export class TypingEventSocketModel implements SocketEventModel
{
  event_name!: string;
  from_id? : number
  to_id? : number
}
export class CallSocketModel implements SocketEventModel {
  from_id?: number;
  to_id?: number;
  from_socket_id?: string;
  to_socket_id?: string;
  is_video? : boolean
  event_name?: string;
  webrtc_model?: number[];
  type?: CallSocketModel.CallType;
}

export class CallAlertModel implements SocketEventModel {
  from_id?: number;
  to_id?: number;
  from_socket_id?: string;
  event_name?: string;
  nick_name?:string;
  is_video? : boolean
  token?: string;
}


export namespace CallSocketModel {
  export enum CallType {
    OFFER = "offer",
    ANSWER = "answer",
    DECLINE = "decline",
    UNANSWERED = "unanswered",
    USER_REJECTED = "userrejected",
    ENDED = "ended",
    CANDIDATE = "candidate",
    CANDIDATE_RESPONSE = "candidate_response"
  }
}

export namespace CallsModel
{
    export class ValidateCallRequestModel {
         to_id?: number
         from_id?: number
         call_code? : string
    }
    export class ValidateCallResponseModel {
        
    }
      export class AcceptCallResponseModel {
         token? : string
         is_video? : boolean
    }
    
}

