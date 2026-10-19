import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    getMe: b.query({
      query: () => "/users/me",
      transformResponse: (res) => res?.data?.user || res?.user || res?.data || res,
      providesTags: ["Me"],
    }),
    updateMe: b.mutation({
      query: (body) => ({ url: "/users/me", method: "PATCH", body }),
      invalidatesTags: ["Me"],
    }),
  }),
});
export const { useGetMeQuery, useUpdateMeMutation } = userApi;
