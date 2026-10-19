import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Single API layer. Do not set Content-Type here: the browser sets the
// multipart boundary itself when a FormData body is sent.
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Me", "Property"],
  endpoints: () => ({}),
});
