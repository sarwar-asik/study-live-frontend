import { useEffect, useRef, useState } from "react"


export default function TestWeb() {
    const [stream, setStream] = useState<MediaStream | null>(null)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        const getMedia = async () => {
            await navigator.mediaDevices.getUserMedia({ video:
                // true
                { width: 640, height: 480, facingMode: "user" },  //facingMode for selfie
                
                 
                 audio: true, })
                .then((stream) => {
                    setStream(stream)
                    if (videoRef.current) {

                        videoRef.current.srcObject = stream
                        // videoRef.current.muted = true

                    }
                })

        }
        // getMedia()
    }, [])
    // console.log(stream)
    return (
        <div className="bg-slate-200 min-h-screen">
            {/* <video ref={videoRef} autoPlay playsInline className="w-full" /> */}
        </div>
    )
}
