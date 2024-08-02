import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface PeerState {
  [key: string]: {
    stream?: MediaStream;
    userName?: string;
    userId: string;
  };
}

interface AddUserPayload {
  userId: string;
  stream: MediaStream;
}

interface RemoveUserPayload {
  userId: string;
}

interface AddAllUserPayload {
  peers: Record<
    string,
    {
      stream?: MediaStream;
      userName?: string;
      userId: string;
    }
  >;
}

const initialState: PeerState = {};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    addUserPeer: (state, action: PayloadAction<AddUserPayload>) => {
      console.log(state)
      console.log(action)
      const { userId, stream } = action.payload;
      state[userId] = {
        ...state[userId],
        stream,
      };
    },
    removeUserPeer: (state, action: PayloadAction<RemoveUserPayload>) => {
      const { userId } = action.payload;
      if (state[userId]) {
        state[userId].stream = undefined;
      }
    },
    addAllUserPeer: (state, action: PayloadAction<AddAllUserPayload>) => {
      const { peers } = action.payload;
      return {
        ...state,
        ...peers,
      };
    },
  },
});

export const { addUserPeer, removeUserPeer, addAllUserPeer } =
  videoSlice.actions;

export default videoSlice.reducer;
