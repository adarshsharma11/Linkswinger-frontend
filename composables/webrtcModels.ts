type SdpType = "offer" | "prAnswer" | "answer" | "rollback" | "OFFER" | "PRANSWER" | "ANSWER";

interface SessionDescription {
  sdp: string;
  type: SdpType;
}

interface IceCandidate {
  sdp: string;
  sdpMLineIndex?: number | null;
  sdpMid?: string | null;
}

interface SdpMessage {
  type: "SessionDescription";
  sdp: SessionDescription;
}

interface CandidateMessage {
  type: "IceCandidate";
  candidate: IceCandidate;
}

type Message = SdpMessage | CandidateMessage;

export function encodeMessage(message: Message): string {

  return JSON.stringify(message);
}

export function decodeMessage(json: string): Message {
  const parsed = JSON.parse(json);
  if (parsed.type === "SessionDescription") {
    return { type: "SessionDescription", sdp: parsed.sdp };
  } else if (parsed.type === "IceCandidate") {
    return { type: "IceCandidate", candidate: parsed.candidate };
  } else {
    throw new Error("Unknown message type");
  }
}
export function toRTCSessionDescription(sessionDescription: SessionDescription): RTCSessionDescription {
  return new RTCSessionDescription({
    type: sessionDescription.type as RTCSdpType, // Ensure correct type mapping
    sdp: sessionDescription.sdp
  });
}

export function toRTCIceCandidate(iceCandidate: IceCandidate): RTCIceCandidate {
  return new RTCIceCandidate({
    candidate: iceCandidate.sdp,
    sdpMLineIndex: iceCandidate.sdpMLineIndex,
    sdpMid: iceCandidate.sdpMid ?? null // Ensure correct handling of null/undefined
  });
}




export function encodeToUint8Array(message: Message): Uint8Array {
  const jsonString = JSON.stringify(message);
  return new TextEncoder().encode(jsonString);
}

export function decodeFromUint8Array(data: Uint8Array): Message {
  const jsonString = new TextDecoder().decode(data); // Convert Uint8Array to string
  return JSON.parse(jsonString) as Message; // Parse string to Message object
}



export function createSdpMessage(rtcSdp: RTCSessionDescription): Message {
  return {
    type: "SessionDescription",
    sdp: {
      sdp: rtcSdp.sdp,
      type: rtcSdp.type as SdpType
    }
  };
}

export function createCandidateMessage(candidate: RTCIceCandidate): Message {
  return {
    type: "IceCandidate",
    candidate: {
      sdp: candidate.candidate,
      sdpMLineIndex: candidate.sdpMLineIndex,
      sdpMid: candidate.sdpMid || null
    }
  };
}