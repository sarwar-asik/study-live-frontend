/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { VideoPlayer } from "./VideoPlayer";
import { RoomContext } from "@/context/RoomProvider";


export const Room = () => {
    const { id } = useParams();
    const { ws, me, peers, stream, setStream } = useContext(RoomContext);

    useEffect(() => {
        try {
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    setStream(stream);
                });
        } catch (err) {
            console.error({ err });
        }

        me?.on("open", () => {
            ws.emit("join-room", { roomId: id, peerId: me._id });
        });
    }, [id, me, ws]);

    return (
        <div>
            <>Room id {id}</>
            <div className="grid grid-cols-4 gap-4">
                <VideoPlayer className="me" key={"me"} stream={stream} />

                {Object?.values(peers)?.map((peer: any, index: number) => (
                    <VideoPlayer key={index} stream={peer.stream} />
                ))}
            </div>
        </div>
    );
};
