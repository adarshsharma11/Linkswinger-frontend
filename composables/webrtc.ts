export class WebRTCClient {
    private mediaConstraints: MediaStreamConstraints;
    private socket: any; // Adjust type according to your socket implementation
     peerConnection: RTCPeerConnection | null;
    private localVideoTrack: HTMLVideoElement | null;
    private localStream: MediaStream | null;
    private remoteStream: MediaStream | null;
    private handleId: string | null;
    private sessionId: string | null;
    private isVideo: boolean;

    constructor(isVideo: boolean = true) {
        if (isVideo) {
            this.mediaConstraints = {
                audio: true,
                video: {
                    width: { max: 640 },
                    height: { max: 480 },
                    frameRate: { max: 60 },
                    advanced: [{ facingMode: 'user' }]
                }
            };
        }
        else {
            this.mediaConstraints = {
                audio: true,
            };
        }
        this.socket = null;
        this.peerConnection = null;
        this.localVideoTrack = null;
        this.localStream = null;
        this.remoteStream = null;
        this.handleId = null;
        this.sessionId = null;
        this.isVideo = isVideo;
    }

    async getAccess(): Promise<void> {
        try {
         //   console.log('getaccess')
            this.localStream = await navigator.mediaDevices.getUserMedia(this.mediaConstraints);
        } catch (error) {
            console.error('Error accessing webcam and microphone:', error);
            throw error;
        }
    }

    setLocalVideoTrack(): void {
        const localVideo = document.getElementById("local-video-track") as HTMLVideoElement | null;
        if (localVideo && this.localStream) {
            this.localVideoTrack = localVideo;
            localVideo.srcObject = this.localStream;
        }
    }

     toggleMicrophone(enabled: boolean) {
        if (this.localStream) {
            this.localStream.getAudioTracks().forEach(track => {
                track.enabled = enabled;
            });
        }
    }
     toggleVideo( enabled: boolean) {
        if (this.localStream) {
            this.localStream.getVideoTracks().forEach(track => {
                track.enabled = enabled;
            });
        }
    }
    
    

    getLocalStream(): void {
      //  console.log('User has granted access; you can now use the stream for various purposes', this.localStream);
    }

    stopLocalStream(): void {
        if (this.localStream) {
            this.localStream.getVideoTracks().forEach(track => track.stop());
            this.localStream.getAudioTracks().forEach(track => track.stop());
        }
        if (this.localVideoTrack) {
            this.localVideoTrack.srcObject = null;
            this.localVideoTrack = null;
        }
    }

    teardown() {
        this.peerConnection?.close()
    }

    setRemoteDes(jsep: RTCSessionDescriptionInit, callback: () => void) {
        this.peerConnection?.setRemoteDescription(jsep).then(() => {
            callback()
        })
    }
    setRemoteCandidate(candidate: RTCIceCandidate, callback: () => void) {
        this.peerConnection?.addIceCandidate(candidate).then(() => {
            callback()
        })
    }
    createOffer(callback: (offer: RTCSessionDescription) => void, candidatecallback: (candidate: RTCIceCandidate) => void): void {
        const configuration: RTCConfiguration = {
            iceServers: [
                { urls: ["stun:l.google.com:19302"] },
                {
                    urls: "turn:72.61.16.165:3478",
                    username: "linkswinger",
                    credential: "linkswinger",
                },
            ],
        };

        this.peerConnection = new RTCPeerConnection(configuration);


        this.peerConnection.ontrack = evt => {
      
            const remoteVideo = document.getElementById("remote-video-track") as HTMLVideoElement | null;

            if (remoteVideo) {
                remoteVideo.srcObject = evt.streams[0];
            }
        };

        if (this.localStream) {
            for (const track of this.localStream.getTracks()) {
                this.peerConnection.addTrack(track, this.localStream);
            }
        }

        var offerOptions: RTCOfferOptions = {
            offerToReceiveAudio: true,
            offerToReceiveVideo: false,
        };

        if (this.isVideo) {
            offerOptions = {
                offerToReceiveAudio: true,
                offerToReceiveVideo: true,
            };
        }
        this.peerConnection.createOffer(offerOptions)
            .then(offer => this.peerConnection!.setLocalDescription(offer))
            .then(() => {
                callback(this.peerConnection!.localDescription!);
                this.peerConnection!.onicecandidate = evt => {
                    if (evt.candidate) {
                        candidatecallback(evt.candidate)
                        //  this.socket.sendCandidate(evt.candidate, this.sessionId, this.handleId);
                    }
                };
                this.peerConnection!.onconnectionstatechange = evt => {
                   // console.log("Connection state changed:", evt);
                };
            })
            .catch(reason => {
                console.error("Offer creation failed:", reason);
            });


    }

    createAnswer(jsep: RTCSessionDescriptionInit, callback: (answer: RTCSessionDescription) => void, candidatecallback: (candidate: RTCIceCandidate) => void): void {
        const configuration: RTCConfiguration = {
            iceServers: [
                { urls: ["stun:l.google.com:19302"] },
                {
                    urls: "turn:72.61.16.165:3478",
                    username: "linkswinger",
                    credential: "linkswinger",
                },
            ],
        };
        this.peerConnection = new RTCPeerConnection(configuration);
        if (this.localStream) {
            for (const track of this.localStream.getTracks()) {
                this.peerConnection!.addTrack(track, this.localStream);
            }
        }
        const sessionDesc = new RTCSessionDescription(jsep);

        this.peerConnection.ontrack = evt => {
         
            const remoteVideo = document.getElementById("remote-video-track") as HTMLVideoElement | null;
            if (remoteVideo) {
                remoteVideo.srcObject = evt.streams[0];
            }
        };
        var answerOptions = {
            offerToReceiveAudio: true, // Disable audio reception
            offerToReceiveVideo: false,  // Enable video reception
        };
        if (this.isVideo) {
            answerOptions = {
                offerToReceiveAudio: true,
                offerToReceiveVideo: true,
            };
        }

        this.peerConnection.setRemoteDescription(sessionDesc)
            .then(() => this.peerConnection!.createAnswer(answerOptions))
            .then(answer => this.peerConnection!.setLocalDescription(answer))
            .then(() => {
                callback(this.peerConnection!.localDescription!);
                this.peerConnection!.onicecandidate = evt => {
                    if (evt.candidate) {
                        candidatecallback(evt.candidate)
                    }
                };
            })
            .catch(error => {
                console.error("Answer creation failed:", error);
            });
    }
}
