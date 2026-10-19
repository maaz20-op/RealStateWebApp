import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    login: b.mutation({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      invalidatesTags: ["Me"],
    }),
    // Only name, email and password are sent. Roles are assigned by the backend.
    signup: b.mutation({
      query: ({ name, email, password }) => ({ url: "/auth/signup", method: "POST", body: { name, email, password } }),
      invalidatesTags: ["Me"],
    }),
    logout: b.mutation({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      invalidatesTags: ["Me"],
    }),
  }),
});
export const { useLoginMutation, useSignupMutation, useLogoutMutation } = authApi;
