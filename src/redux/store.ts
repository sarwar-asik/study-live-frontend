import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './features/user/counterSlice';
import videoSlice from './features/video/videoSlice';
// import { baseApi } from './api/baseApi';
// import { workSplice } from './features/workSpace/workSpaceSlice';
// ...

const store = configureStore({
    reducer: {
        // posts: postsReducer,
        // comments: commentsReducer,
        // users: usersReducer,
        counter: counterSlice,
        video:videoSlice,
        // workSpace: workSplice,
        // [baseApi.reducerPath]: baseApi.reducer,
    },
    // middleware: getDefaultMiddleware =>
    //     getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
