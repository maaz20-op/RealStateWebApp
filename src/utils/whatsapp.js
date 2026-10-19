// Returns a wa.me link, or null when the number is missing or malformed.
export function buildWhatsAppLink(number, message = "") {
  const digits = String(number || "").replace(/[\s\-()+]/g, "");
  if (!/^\d{8,15}$/.test(digits)) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}
