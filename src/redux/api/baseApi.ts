// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { axiosBaseQuery } from '../../helpers/axios/axiosBaseQuery';
// import { axiosBaseQuery } from 'src/helpers/axios/axiosBaseQuery';
// import { getBaseUrl } from '../../helpers/config/envConfig';
import { tagTypesList } from '../redux-tags';
import { SERVER_URL } from "@/helper/const";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${SERVER_URL}`,
    }),
    endpoints: () => ({}),
    tagTypes: tagTypesList,
});

// export const baseApi = createApi({
//     reducerPath: 'api',
//     baseQuery: axiosBaseQuery({
//         baseUrl: getBaseUrl(),
//     }),
//     endpoints: () => ({}),
//     tagTypes: tagTypesList,
// });
