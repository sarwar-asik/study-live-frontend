
import {
    ControlBar,
    GridLayout,
    LiveKitRoom,
    ParticipantTile,
    RoomAudioRenderer,
    useTracks,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { Track } from "livekit-client";
import '@livekit/components-styles';
import { useState, useEffect, useContext } from "react";
import AuthContext from "@/context/AuthProvider";
import useFetchDataHook from "@/hooks/useFetchDataHook";

const serverUrl = 'wss://study-live-6hvqlmts.livekit.cloud';
// const serverUrl = 'wss://study-live-6hvqlmts.livekit.cloud';
// const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ2aWRlbyI6eyJyb29tSm9pbiI6dHJ1ZSwicm9vbSI6InF1aWNrc3RhcnQtcm9vbSJ9LCJpc3MiOiJ5b3VyX2FwaV9rZXlfaGVyZSIsImV4cCI6MTcyMzYxMzI0NiwibmJmIjowLCJzdWIiOiJxdWlja3N0YXJ0LXVzZXJuYW1lIn0.C5VcEZ7nOdnE9GGhuGuctG74tubZ7LaOi42w2xEKQpU';

const receiverId = '74c97403-92a7-4698-b50f-6afa9d281414'
export default function VideoLivePage() {

    const { user } = useContext(AuthContext)
    const userId = user?.id
    // fetch data
    const { data: tokenData } = useFetchDataHook<string>(`http://localhost:5000/getToken?userId=${userId}`)
    // console.log(user)
    console.log(tokenData)

    const [remoteUserId, setRemoteUserId] = useState<string | undefined>(undefined);

    // Function to initiate a call (replace with your call logic)
    const initiateCall = (calleeId: string) => {
        setRemoteUserId(calleeId);
        // Connect to LiveKit room using calleeId (replace with actual connection logic)
    };

    // console.log(tokenData)
    return (
        <LiveKitRoom
            video={true}
            audio={true}
            token={tokenData ?? ""}
            serverUrl={serverUrl}
            // Use the default LiveKit theme for nice styles.
            data-lk-theme="default"
            style={{ height: '100vh' }}
        >
            {/* Your custom component with basic video conferencing functionality. */}
            <MyVideoConference />
            {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
            <RoomAudioRenderer />
            {/* Controls for the user to start/stop audio, video, and screen
      share tracks and to leave the room. */}
            <ControlBar />
        </LiveKitRoom>
    );


}

function MyVideoConference() {
    // `useTracks` returns all camera and screen share tracks. If a user
    // joins without a published camera track, a placeholder track is returned.
    const tracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: true },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { onlySubscribed: false },
    );
    return (
        <GridLayout tracks={tracks} style={{ height: 'calc(80vh - var(--lk-control-bar-height))' }}>
            {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
            <ParticipantTile />
            {/* The tracks are rendered in the order they are passed in. */}
        </GridLayout>
    );
}