import { baseApi } from "./baseApi";

// Accepts { data: [...], total, pages } or a bare array and normalizes it.
const normalizeList = (res, args) => {
  const items = Array.isArray(res) ? res : res?.data?.properties || res?.properties || res?.data || [];
  const total = res?.total ?? res?.data?.total ?? items.length;
  const limit = args?.limit || 9;
  return { items, total, pages: res?.pages ?? res?.data?.pages ?? Math.max(1, Math.ceil(total / limit)) };
};

export const propertyApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    getProperties: b.query({
      query: (params = {}) => ({ url: "/properties", params: Object.fromEntries(Object.entries(params).filter(([, v]) => v !== "" && v != null)) }),
      transformResponse: normalizeList,
      providesTags: (r) => [{ type: "Property", id: "LIST" }, ...(r?.items || []).map((p) => ({ type: "Property", id: p._id || p.id }))],
    }),
    getProperty: b.query({
      query: (id) => `/properties/${encodeURIComponent(id)}`,
      transformResponse: (res) => res?.data?.property || res?.property || res?.data || res,
      providesTags: (_r, _e, id) => [{ type: "Property", id }],
    }),
    createProperty: b.mutation({
      query: (formData) => ({ url: "/properties", method: "POST", body: formData }),
      invalidatesTags: [{ type: "Property", id: "LIST" }],
    }),
    updateProperty: b.mutation({
      query: ({ id, body }) => ({ url: `/properties/${id}`, method: "PATCH", body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "Property", id }, { type: "Property", id: "LIST" }],
    }),
    deleteProperty: b.mutation({
      query: (id) => ({ url: `/properties/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Property", id: "LIST" }],
    }),
    sendContact: b.mutation({
      query: (body) => ({ url: "/contact", method: "POST", body }),
    }),
  }),
});
export const {
  useGetPropertiesQuery, useGetPropertyQuery, useCreatePropertyMutation,
  useUpdatePropertyMutation, useDeletePropertyMutation, useSendContactMutation,
} = propertyApi;
