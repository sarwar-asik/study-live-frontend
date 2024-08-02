/* eslint-disable @typescript-eslint/no-explicit-any */
// import { IUserSchema } from '@/types/user';

import { tagType } from "../redux-tags";
import { baseApi } from "./baseApi";

const AUTH_URL = "/auth";

type IUserSchema = {
  name: string;
};

type IWorkSpaceSchema = {
  title: string;
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (build: {
    mutation: (arg0: {
      query:
        | ((loginData: any) => { url: string; method: string; data: any })
        | ((loginData: { user: IUserSchema; workSpace: IWorkSpaceSchema }) => {
            url: string;
            method: string;
            data: { user: IUserSchema; workSpace: IWorkSpaceSchema };
          })
        | ((data: any) => { url: string; method: string; data: any });
      invalidatesTags: tagType[];
    }) => any;
    query: (arg0: {
      query: () => { url: string; method: string };
      providesTags: tagType[];
    }) => any;
  }) => ({
    userLogin: build.mutation({
      query: (loginData: any) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagType.user],
    }),
    userSignUP: build.mutation({
      query: (loginData: {
        user: IUserSchema;
        workSpace: IWorkSpaceSchema;
      }) => ({
        url: `${AUTH_URL}/signup`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagType.user],
    }),
    getProfile: build.query({
      query: () => ({
        url: `/users/profile`,
        method: "GET",
      }),
      providesTags: [tagType.user],
    }),
    updateRole: build.mutation({
      query: (data: any) => ({
        url: `/users/update-role/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagType.user],
    }),
  }),
});

export const {
  useUserLoginMutation,
  useGetProfileQuery,
  useUpdateRoleMutation,
  useUserSignUPMutation,
} = authApi;
