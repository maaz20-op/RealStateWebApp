import { Link } from "react-router-dom";
import { Building2, Home, Landmark, MapPinned, ShieldCheck, Handshake, Search, Trees } from "lucide-react";
import businessConfig from "../../config/businessConfig";
import { useGetPropertiesQuery } from "../../services/propertyApi";
import PropertyGrid from "../properties/PropertyGrid";

export function SectionHeader({ title, text, to, linkLabel }) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div><h2 className="text-3xl sm:text-4xl">{title}</h2>{text && <p className="mt-2 max-w-xl text-muted">{text}</p>}</div>
      {to && <Link to={to} className="text-sm font-semibold text-accent hover:underline">{linkLabel}</Link>}
    </div>
  );
}

export function FeaturedProperties() {
  const query = useGetPropertiesQuery({ featured: true, limit: 3, sort: "newest" });
  return (
    <section className="section container-x">
      <SectionHeader title="Featured properties" text="Selected listings from our team." to="/properties" linkLabel="View all listings" />
      <PropertyGrid query={query} count={3} />
    </section>
  );
}

export function LatestProperties() {
  const query = useGetPropertiesQuery({ limit: 6, sort: "newest" });
  return (
    <section className="section container-x pt-0 sm:pt-0">
      <SectionHeader title="Latest properties" to="/properties" linkLabel="Browse more" />
      <PropertyGrid query={query} count={6} />
    </section>
  );
}

const categories = [
  { type: "House", icon: Home }, { type: "Apartment", icon: Building2 }, { type: "Villa", icon: Landmark },
  { type: "Plot", icon: Trees }, { type: "Commercial", icon: MapPinned },
];
export function Categories() {
  return (
    <section className="section container-x pt-0 sm:pt-0">
      <SectionHeader title="Browse by type" />
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map(({ type, icon: Icon }) => (
          <li key={type}>
            <Link to={`/properties?type=${type}`} className="flex flex-col items-center gap-3 rounded-3xl border border-line bg-surface px-4 py-8 text-sm font-semibold transition hover:border-accent hover:shadow-lift">
              <Icon className="h-7 w-7 text-accent" aria-hidden="true" />{type}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export const reasons = [
  { icon: Search, title: "Clear listings", text: "PLACEHOLDER: explain how listings are verified and presented." },
  { icon: Handshake, title: "Direct contact", text: "Call, message on WhatsApp or send an inquiry from any listing." },
  { icon: ShieldCheck, title: "Guidance", text: "PLACEHOLDER: describe the support offered through each purchase or rental." },
];
export function WhyChooseUs() {
  return (
    <section className="section container-x pt-0 sm:pt-0">
      <SectionHeader title="Why choose us" />
      <div className="grid gap-6 md:grid-cols-3">
        {reasons.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-3xl border border-line bg-surface p-7">
            <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
            <h3 className="mt-5 text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Renders only stats that have real values in businessConfig.
export function Stats() {
  const stats = businessConfig.stats.filter((s) => s.value);
  if (!stats.length) return null;
  return (
    <section className="container-x pb-16">
      <dl className="grid grid-cols-2 gap-6 rounded-3xl border border-line bg-surface p-8 md:grid-cols-4">
        {stats.map((s) => (<div key={s.label}><dd className="font-display text-4xl">{s.value}</dd><dt className="mt-1 text-sm text-muted">{s.label}</dt></div>))}
      </dl>
    </section>
  );
}
