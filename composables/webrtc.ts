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
    private alreadyFlipped = false;

    constructor(isVideo: boolean = true) {
        if (isVideo) {
            this.mediaConstraints = {
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                },
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
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                }
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


            // const isFront = this.mediaConstraints.video &&
            //     (this.mediaConstraints.video as any).advanced?.some((x: any) => x.facingMode === "user");

            // if (this.isVideo && isFront && !this.alreadyFlipped) {
            //     this.localStream = await this.applyFrontCameraFlip(this.localStream);
            //     this.alreadyFlipped = true;
            // } else {
            //     this.alreadyFlipped = false;
            // }


        } catch (error) {
            this.localStream = new MediaStream();
            this.localStream.addTrack(this.getSilentAudioTrack());
            this.localStream.addTrack(this.getBlackVideoTrack());
            throw error;
        }
    }
    getSilentAudioTrack(): MediaStreamTrack {
        const ctx = new AudioContext();
        const oscillator = ctx.createOscillator();
        const dst = ctx.createMediaStreamDestination(); // <-- destination node
        oscillator.connect(dst);                        // connect separately
        oscillator.start();
        const track = dst.stream.getAudioTracks()[0];   // now TypeScript knows .stream exists
        track.enabled = false;                          // keep it muted
        return track;
    }
    getBlackVideoTrack({ width = 640, height = 480 } = {}) {
        const canvas = Object.assign(document.createElement("canvas"), { width, height });
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error("Failed to get 2D canvas context");
        }
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, width, height);
        const stream = canvas.captureStream();
        const track = stream.getVideoTracks()[0];
        track.enabled = false;
        return track;
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
    toggleVideo(enabled: boolean) {
        if (this.localStream) {
            this.localStream.getVideoTracks().forEach(track => {
                track.enabled = enabled;
            });
        }
    }

    async hasBackCamera(): Promise<boolean> {
        const devices = await navigator.mediaDevices.enumerateDevices();
        return devices.some(d => d.kind === "videoinput" && d.label.toLowerCase().includes("back"));
    }

    currentFacingMode: 'user' | 'environment' = 'user';

    async toggleCamera() {
        const backCameraExists = await this.hasBackCamera();

        // If user tries to switch to back but it's not available → stay on front
        if (this.currentFacingMode === 'user' && !backCameraExists) {
            console.warn("No back camera available");
            return;
        }

        // Stop current tracks
        if (this.localStream) {
            this.localStream.getVideoTracks().forEach(track => track.stop());
        }

        const localVideo = document.getElementById("local-video-track") as HTMLVideoElement | null;
        if (localVideo) {
            // Switch mode
            this.currentFacingMode =
                this.currentFacingMode === 'user' ? 'environment' : 'user';

            try {

                this.mediaConstraints = {
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        autoGainControl: true
                    },
                    video: {
                        width: { max: 640 },
                        height: { max: 480 },
                        frameRate: { max: 60 },
                        advanced: [{ facingMode: this.currentFacingMode }]
                    }
                };
                // Try to get new stream
                const newStream = await navigator.mediaDevices.getUserMedia(this.mediaConstraints);

                const newVideoTrack = newStream.getVideoTracks()[0];

                // 3. Replace track in RTCPeerConnection so remote gets update
                const sender = this.peerConnection?.getSenders().find(s => s.track?.kind === "video");
                if (sender) {
                    await sender.replaceTrack(newVideoTrack);
                }
                if (this.localStream) {
                    this.localStream?.removeTrack(this.localStream.getVideoTracks()[0]);
                    this.localStream?.addTrack(newVideoTrack);
                }
                localVideo.srcObject = this.localStream;

                // ------------------------------
                // FLIP ONLY FRONT CAMERA
                // ------------------------------
                // FRONT camera → apply flip ONCE
                // if (this.currentFacingMode === "user" && !this.alreadyFlipped && this.localStream) {
                //     this.localStream = await this.applyFrontCameraFlip(this.localStream);
                //     this.alreadyFlipped = true;

                //     const sender = this.peerConnection?.getSenders().find(s => s.track?.kind === "video");
                //     if (sender) await sender.replaceTrack(this.localStream.getVideoTracks()[0]);

                //     localVideo.srcObject = this.localStream;
                // }

                // // BACK camera → no flip
                // if (this.currentFacingMode === "environment") {
                //     this.alreadyFlipped = false;
                // }
                // ------------------------------
            } catch (err) {
                console.error("Failed to access camera:", err);
                // If switching to back fails → fall back to front
                this.currentFacingMode = 'user';
                this.localStream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "user" },
                    audio: true
                });
                localVideo.srcObject = this.localStream;
            }
        }

    }

    private async applyFrontCameraFlip(stream: MediaStream): Promise<MediaStream> {
        const video = document.createElement("video");
        video.srcObject = stream;
        await video.play();

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;

        const draw = () => {
            if (video.videoWidth > 0 && video.videoHeight > 0) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                ctx.setTransform(-1, 0, 0, 1, canvas.width, 0);
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            }
            requestAnimationFrame(draw);
        };
        draw();

        const flippedStream = canvas.captureStream();
        const flippedTrack = flippedStream.getVideoTracks()[0];

        const oldTrack = stream.getVideoTracks()[0];
        stream.removeTrack(oldTrack);
        oldTrack.stop();
        stream.addTrack(flippedTrack);

        return stream;
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
                // this.peerConnection!.onconnectionstatechange = evt => {
                //     console.log("Connection state changed:", evt);
                // };

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
