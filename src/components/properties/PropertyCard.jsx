import { memo } from "react";
import { Link } from "react-router-dom";
import { BedDouble, Bath, Ruler, MapPin } from "lucide-react";
import { formatLocation, formatPrice, getId, getImageUrls } from "../../utils/format";

function PropertyCard({ property: p }) {
  const [img] = getImageUrls(p);
  return (
    <Link to={`/property/details/${getId(p)}`} className="group block overflow-hidden rounded-3xl border border-line bg-surface transition hover:shadow-lift">
      <div className="aspect-[4/3] overflow-hidden bg-line">
        {img ? <img src={img} alt={p.title} loading="lazy" decoding="async" width="640" height="480" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          : <div className="flex h-full items-center justify-center text-sm text-muted">No image</div>}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 text-lg font-semibold">{p.title}</h3>
          {p.propertyType && <span className="shrink-0 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">{p.propertyType}</span>}
        </div>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted"><MapPin className="h-3.5 w-3.5" aria-hidden="true" />{formatLocation(p)}</p>
        <p className="mt-4 font-display text-xl">{formatPrice(p.price)}</p>
        <div className="mt-4 flex gap-5 border-t border-line pt-4 text-sm text-muted">
          <span className="flex items-center gap-1.5"><BedDouble className="h-4 w-4" aria-label="Bedrooms" />{p.bedrooms ?? "-"}</span>
          <span className="flex items-center gap-1.5"><Bath className="h-4 w-4" aria-label="Bathrooms" />{p.bathrooms ?? "-"}</span>
          <span className="flex items-center gap-1.5"><Ruler className="h-4 w-4" aria-label="Area" />{p.coveredArea ? `${p.coveredArea} sq ft` : "-"}</span>
        </div>
      </div>
    </Link>
  );
}
export default memo(PropertyCard);
