import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export interface CurrentUser {
  email: string;
  id: string;
}

interface User {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/users",
  }),
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    signIn: build.mutation<CurrentUser, User>({
      query: (user) => ({
        url: "/signin",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Auth"],
    }),
    signUp: build.mutation<CurrentUser, User>({
      query: (user) => ({
        url: "/signup",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Auth"],
    }),
    signOut: build.mutation<{}, {}>({
      query: () => ({
        url: "/signout",
        method: "POST",
        body: {},
      }),
      invalidatesTags: ["Auth"],
    }),
    currentUser: build.query<CurrentUser, void>({
      query: () => ({
        url: "/currentuser",
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSignOutMutation,
  useSignUpMutation,
  useCurrentUserQuery,
} = authApi;
