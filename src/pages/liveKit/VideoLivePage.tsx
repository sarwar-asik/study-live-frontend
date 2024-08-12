
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

const serverUrl = 'wss://study-live-6hvqlmts.livekit.cloud';
// const serverUrl = 'wss://study-live-6hvqlmts.livekit.cloud';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ2aWRlbyI6eyJyb29tSm9pbiI6dHJ1ZSwicm9vbSI6InF1aWNrc3RhcnQtcm9vbSJ9LCJpc3MiOiJ5b3VyX2FwaV9rZXlfaGVyZSIsImV4cCI6MTcyMzM3NzMyNCwibmJmIjowLCJzdWIiOiJxdWlja3N0YXJ0LXVzZXJuYW1lIn0.K-Ns52fvgx16FMkrG5qqzGHkp9qc67ubEHXnC4wd79M';

export default function VideoLivePage() {

    // const { data: tokenData } = usePost<string>(`http://localhost:5000/getToken`)


    // console.log(tokenData)
    return (
        <LiveKitRoom
            video={true}
            audio={true}
            token={token ?? ""}
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
        <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
            {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
            <ParticipantTile />
            {/* The tracks are rendered in the order they are passed in. */}
        </GridLayout>
    );
}