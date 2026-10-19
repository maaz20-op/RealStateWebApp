import { Link, useParams } from "react-router-dom";
import { BedDouble, Bath, Ruler, Trees, Phone, MapPin, Calendar, Check } from "lucide-react";
import businessConfig from "../config/businessConfig";
import { useGetPropertyQuery } from "../services/propertyApi";
import Gallery from "../components/properties/Gallery";
import Button from "../components/common/Button";
import WhatsAppButton from "../components/common/WhatsAppButton";
import { Skeleton, ErrorState } from "../components/common/States";
import { formatDate, formatLocation, formatPrice, getErrorMessage, getImageUrls } from "../utils/format";

export default function PropertyDetails() {
  const { id } = useParams();
  const { data: p, isLoading, isError, error, refetch } = useGetPropertyQuery(id);

  if (isLoading) return <div className="container-x grid gap-8 py-12 lg:grid-cols-[1.3fr_1fr]"><Skeleton className="aspect-[16/10]" /><div className="space-y-4"><Skeleton className="h-10 w-3/4" /><Skeleton className="h-6 w-1/3" /><Skeleton className="h-40" /></div></div>;
  const notFound = [400, 404].includes(error?.status);
  if (isError || !p?.title) return (
    <div className="container-x py-20">
      <ErrorState title={notFound || !isError ? "Property not found" : "We couldn't load this property"}
        text={notFound || !isError ? "It may have been removed, or the link is incorrect." : getErrorMessage(error)}
        onRetry={notFound || !isError ? undefined : refetch} />
      <div className="mt-6 text-center"><Button as={Link} to="/properties" variant="outline">Back to properties</Button></div>
    </div>
  );

  const { phone } = businessConfig;
  const facts = [
    [BedDouble, "Bedrooms", p.bedrooms], [Bath, "Bathrooms", p.bathrooms],
    [Ruler, "Covered area", p.coveredArea && `${p.coveredArea} sq ft`], [Trees, "Land area", p.landArea && `${p.landArea} sq ft`],
  ];
  const details = [["Property type", p.propertyType], ["Availability", p.status || p.availability], ["Listed", p.createdAt && formatDate(p.createdAt)]];

  return (
    <div className="container-x grid gap-10 py-10 lg:grid-cols-[1.3fr_1fr]">
      <div><Gallery images={getImageUrls(p)} title={p.title} />
        <section className="mt-10"><h2 className="text-2xl">About this property</h2><p className="mt-3 whitespace-pre-line text-muted">{p.description || "No description provided."}</p></section>
        {!!p.amenities?.length && (
          <section className="mt-10"><h2 className="text-2xl">Amenities</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">{p.amenities.map((a) => <li key={a} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-accent" aria-hidden="true" />{a}</li>)}</ul>
          </section>)}
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <h1 className="text-3xl sm:text-4xl">{p.title}</h1>
        <p className="mt-2 flex items-center gap-1.5 text-muted"><MapPin className="h-4 w-4" aria-hidden="true" />{formatLocation(p)}</p>
        <p className="mt-5 font-display text-3xl text-accent">{formatPrice(p.price)}</p>
        <dl className="mt-6 grid grid-cols-2 gap-3">
          {facts.map(([Icon, label, v]) => (<div key={label} className="rounded-2xl border border-line bg-surface p-4"><Icon className="h-4 w-4 text-accent" aria-hidden="true" /><dd className="mt-2 font-semibold">{v || "Not provided"}</dd><dt className="text-xs text-muted">{label}</dt></div>))}
        </dl>
        <dl className="mt-4 divide-y divide-line rounded-2xl border border-line bg-surface text-sm">
          {details.map(([k, v]) => (<div key={k} className="flex justify-between px-4 py-3"><dt className="text-muted">{k}</dt><dd className="font-semibold">{v || "Not provided"}</dd></div>))}
        </dl>
        <div className="mt-6 flex flex-wrap gap-3">
          <WhatsAppButton label="WhatsApp inquiry" message={`Hello, I'm interested in "${p.title}" (${window.location.href}).`} />
          {phone && <Button as="a" href={`tel:${phone}`} variant="outline"><Phone className="h-4 w-4" /> Call</Button>}
          {!phone && <Button as={Link} to="/contact" variant="outline">Send inquiry</Button>}
        </div>
        <p className="mt-6 flex items-center gap-2 text-xs text-muted"><Calendar className="h-3.5 w-3.5" />{businessConfig.name} · {phone || "phone not provided yet"} · {businessConfig.email || "email not provided yet"}</p>
      </aside>
    </div>
  );
}
