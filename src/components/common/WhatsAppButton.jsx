import { MessageCircle } from "lucide-react";
import businessConfig from "../../config/businessConfig";
import { buildWhatsAppLink } from "../../utils/whatsapp";
import Button from "./Button";

// Renders nothing until a valid WhatsApp number is configured.
export default function WhatsAppButton({ message = "", label = "WhatsApp", variant = "primary", className = "" }) {
  const href = buildWhatsAppLink(businessConfig.whatsapp, message);
  if (!href) return null;
  return (
    <Button as="a" href={href} target="_blank" rel="noopener noreferrer" variant={variant} className={className}>
      <MessageCircle className="h-4 w-4" aria-hidden="true" /> {label}
    </Button>
  );
}
