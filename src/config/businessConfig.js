const env = import.meta.env;

// Everything here is a placeholder until the business owner supplies real details.
// Set values in .env (see .env.example) or edit this file.
const businessConfig = {
  name: "Us Real State",
  phone: env.VITE_BUSINESS_PHONE || "",
  whatsapp: env.VITE_WHATSAPP_NUMBER || "", // international format, e.g. +15551234567
  email: env.VITE_BUSINESS_EMAIL || "",
  address: env.VITE_BUSINESS_ADDRESS || "", // PLACEHOLDER: office address not provided
  currency: "PKR",
  description:
    "PLACEHOLDER: Replace this with the business description supplied by the owner. Describe who you help, the areas you cover and how you work with buyers, sellers and tenants.",
  mission: "PLACEHOLDER: Add the company's mission statement here.",
  vision: "PLACEHOLDER: Add the company's vision statement here.",
  heroImage:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=70", // demo image, replace with business photography
  // Only stats with a real value are displayed. Leave empty until verified numbers exist.
  stats: [
    // { label: "Properties listed", value: "" },
  ],
  values: [
    {
      title: "Transparency",
      text: "PLACEHOLDER: describe how the business approaches honest, clear dealings.",
    },
    {
      title: "Service",
      text: "PLACEHOLDER: describe the level of service clients can expect.",
    },
    {
      title: "Local knowledge",
      text: "PLACEHOLDER: describe the areas and communities the business knows best.",
    },
  ],
  // Clearly labeled demo content, replace with real client feedback before launch.
  testimonials: [
    {
      name: "Demo Client A",
      role: "Home buyer",
      text: "Demo testimonial. Replace with a real client quote.",
    },
    {
      name: "Demo Client B",
      role: "Seller",
      text: "Demo testimonial. Replace with a real client quote.",
    },
    {
      name: "Demo Client C",
      role: "Investor",
      text: "Demo testimonial. Replace with a real client quote.",
    },
  ],
};

export default businessConfig;
