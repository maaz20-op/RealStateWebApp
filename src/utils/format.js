import businessConfig from "../config/businessConfig";

export const formatPrice = (value) => {
  const n = Number(value);
  if (!Number.isFinite(n)) return "Price on request";
  return new Intl.NumberFormat(undefined, { style: "currency", currency: businessConfig.currency, maximumFractionDigits: 0 }).format(n);
};

export const formatDate = (value) => {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? "Not provided" : d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
};

export const formatLocation = (p) => {
  const a = p?.address || {};
  const parts = typeof a === "string" ? [a] : [a.area, a.city, a.state, a.country];
  return parts.filter(Boolean).join(", ") || p?.location || "Location not provided";
};

export const getImageUrls = (p) =>
  (p?.images || []).map((i) => (typeof i === "string" ? i : i?.url)).filter(Boolean);

export const getId = (p) => p?._id || p?.id;

export const PROPERTY_TYPES = ["House", "Apartment", "Villa", "Plot", "Commercial", "Office"];

export const getErrorMessage = (err, fallback = "Something went wrong. Please try again.") =>
  err?.data?.message || (err?.status === "FETCH_ERROR" ? "Cannot reach the server. Check your connection or try again later." : fallback);
