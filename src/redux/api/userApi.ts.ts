/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUserDataType, IUserSchema } from "@/type/dataType/user.data";
import { tagType } from "../redux-tags";
import { baseApi } from "./baseApi";

const AUTH_URL = "/auth";
const USERS_URL = "/user";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Endpoint for user login
    userLogin: build.mutation({
      query: (loginData: { email: string; password: string }) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagType.user],
    }),
    // Endpoint for user sign-up
    userSignUP: build.mutation({
      query: (userData: IUserSchema) => ({
        url: `${AUTH_URL}/signup`,
        method: "POST",
        data: userData,
      }),
      invalidatesTags: [tagType.user],
    }),
    // Endpoint to get a single user by ID
    getAllUser: build.query<{ data: IUserDataType[] }, void>({
      query: () => `${USERS_URL}`,
      providesTags: [tagType.user],
    }),
    getSingleUser: build.query<{ data: IUserDataType }, string>({
      query: (id: string) => `${USERS_URL}/${id}`,
      providesTags: [tagType.user],
    }),
    // Endpoint to get the profile of the current user
    getProfile: build.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
        method: "GET",
      }),
      providesTags: [tagType.user],
    }),
    // Endpoint to update user role
    updateRole: build.mutation({
      query: (data: { id: string; body: any }) => ({
        url: `${USERS_URL}/update-role/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagType.user],
    }),
    // Endpoint to add points to a user
    addPoints: build.mutation({
      query: (params: { id: string; points: number }) => ({
        url: `${USERS_URL}/add-points/${params.id}`,
        method: "PATCH",
        body: { points: params.points },
      }),
      invalidatesTags: [tagType.user],
    }),
    // Endpoint to remove points from a user
    removePoints: build.mutation({
      query: (params: { id: string; points: number }) => ({
        url: `${USERS_URL}/decrement-points/${params.id}`,
        method: "PATCH",
        body: { points: params.points }, // Use `body` instead of `data`
      }),
      invalidatesTags: [tagType.user],
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserSignUPMutation,
  useGetSingleUserQuery,
  useGetProfileQuery,
  useUpdateRoleMutation,
  useAddPointsMutation,
  useRemovePointsMutation,
  useGetAllUserQuery,
} = userApi;
