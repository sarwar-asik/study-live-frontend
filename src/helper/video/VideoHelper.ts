import { IUserDataType } from "@/type/dataType/user.data";

export const ADD_USER = "ADD_USER" as const;
export const REMOVE_USER = "REMOVE_USER" as const;
export const ADD_ALL_USER = "ADD_ALL_USER" as const;

export const addUserPeer = (userId: string, stream: MediaStream) => {

    console.log(userId , stream)
    return {
      type: ADD_USER,
      payload: {
        userId,
        stream,
      },
    };
};

export const removeUserPeer = (userId: string) => ({
  type: REMOVE_USER,
  payload: {
    userId,
  },
});

export const addAllUserPeer = (users: Record<string, IUserDataType>) => ({
  type: ADD_ALL_USER,
  payload: { users },
});






export type PeerState = Record<
  string,
  { stream?: MediaStream; userName?: string; userId: string }
>;
type PeerAction =
  | {
      type: typeof ADD_USER;
      payload: { userId: string; stream: MediaStream };
    }
  | {
      type: typeof REMOVE_USER;
      payload: { userId: string };
    }
//   | {
//       type: typeof ADD_PEER_NAME;
//       payload: { userId: string; userName: string };
//     }
  | {
      type: typeof ADD_ALL_USER;
      payload: {
        peers: Record<string, IUserDataType>;
      };
    };

export const userPeersReducer = (state: PeerState, action: PeerAction): PeerState => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        [action.payload.userId]: {
          ...state[action.payload.userId],
          stream: action.payload.stream,
        },
      };
    case REMOVE_USER:
      return {
        ...state,
        [action.payload.userId]: {
          ...state[action.payload.userId],
          stream: undefined,
        },
      };
    // case ADD_ALL_USER:
    //   return { ...state, ...action.payload.peers };
    default:
      return state;
  }
};
