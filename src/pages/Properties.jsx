import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageHeading from "../components/common/PageHeading";
import Button from "../components/common/Button";
import PropertyFilters from "../components/properties/PropertyFilters";
import PropertyGrid from "../components/properties/PropertyGrid";
import Pagination from "../components/properties/Pagination";
import { useGetPropertiesQuery } from "../services/propertyApi";

const LIMIT = 9;
const EMPTY = { q: "", location: "", type: "", minPrice: "", maxPrice: "", sort: "newest" };

export default function Properties() {
  const [params, setParams] = useSearchParams();
  const fromUrl = { ...EMPTY, ...Object.fromEntries(params) };
  const page = Math.max(1, Number(params.get("page")) || 1);
  const [form, setForm] = useState(fromUrl);
  useEffect(() => { setForm({ ...EMPTY, ...Object.fromEntries(params) }); }, [params]);

  const apply = (values, nextPage = 1) => {
    const next = Object.fromEntries(Object.entries(values).filter(([, v]) => v));
    if (nextPage > 1) next.page = String(nextPage);
    setParams(next);
  };
  const query = useGetPropertiesQuery({ q: fromUrl.q, location: fromUrl.location, type: fromUrl.type, minPrice: fromUrl.minPrice, maxPrice: fromUrl.maxPrice, sort: fromUrl.sort, page, limit: LIMIT });

  return (
    <>
      <PageHeading title="Properties" text="Search by keyword and location, then narrow by type and price." />
      <div className="container-x pb-20">
        <PropertyFilters values={form} onChange={setForm} onSubmit={(e) => { e.preventDefault(); apply(form); }} onReset={() => setParams({})} />
        <p className="my-6 text-sm text-muted" aria-live="polite">{query.data ? `${query.data.total} propert${query.data.total === 1 ? "y" : "ies"} found` : "\u00A0"}</p>
        <PropertyGrid query={query} count={LIMIT} emptyAction={<Button as={Link} to="/properties" variant="outline">Clear filters</Button>} />
        <Pagination page={page} pages={query.data?.pages || 1} onPage={(n) => apply(fromUrl, n)} />
      </div>
    </>
  );
}
