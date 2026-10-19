import { Link } from "react-router-dom";
import businessConfig from "../../config/businessConfig";

export default function Footer() {
  const { name, phone, email, address } = businessConfig;
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-x grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-semibold">{name}</p>
          <p className="mt-3 max-w-xs text-sm text-muted">{businessConfig.description}</p>
        </div>
        <nav aria-label="Footer">
          <p className="text-sm font-semibold">Explore</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {[["/properties", "Properties"], ["/about", "About"], ["/contact", "Contact"], ["/login", "Log in"]].map(([to, l]) => (
              <li key={to}><Link to={to} className="hover:text-ink">{l}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-sm font-semibold">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>{phone ? <a href={`tel:${phone}`} className="hover:text-ink">{phone}</a> : "Phone: not provided yet"}</li>
            <li>{email ? <a href={`mailto:${email}`} className="hover:text-ink">{email}</a> : "Email: not provided yet"}</li>
            <li>{address || "Address: not provided yet"}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-muted">© {new Date().getFullYear()} {name}. All rights reserved.</div>
    </footer>
  );
}
