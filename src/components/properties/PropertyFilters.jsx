import { Search } from "lucide-react";
import { PROPERTY_TYPES } from "../../utils/format";

export default function PropertyFilters({ values, onChange, onSubmit, onReset }) {
  const set = (k) => (e) => onChange({ ...values, [k]: e.target.value });
  return (
    <form onSubmit={onSubmit} className="grid gap-3 rounded-3xl border border-line bg-surface p-4 sm:grid-cols-2 lg:grid-cols-6" role="search">
      <div className="lg:col-span-2">
        <label className="sr-only" htmlFor="q">Keyword</label>
        <input id="q" className="input" placeholder="Keyword" value={values.q} onChange={set("q")} />
      </div>
      <div>
        <label className="sr-only" htmlFor="location">Location</label>
        <input id="location" className="input" placeholder="City or area" value={values.location} onChange={set("location")} />
      </div>
      <div>
        <label className="sr-only" htmlFor="type">Property type</label>
        <select id="type" className="input" value={values.type} onChange={set("type")}>
          <option value="">All types</option>
          {PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:col-span-2">
        <div><label className="sr-only" htmlFor="minPrice">Minimum price</label><input id="minPrice" type="number" min="0" className="input" placeholder="Min price" value={values.minPrice} onChange={set("minPrice")} /></div>
        <div><label className="sr-only" htmlFor="maxPrice">Maximum price</label><input id="maxPrice" type="number" min="0" className="input" placeholder="Max price" value={values.maxPrice} onChange={set("maxPrice")} /></div>
      </div>
      <div className="flex items-center gap-3 sm:col-span-2 lg:col-span-6">
        <label className="text-sm font-semibold" htmlFor="sort">Sort by</label>
        <select id="sort" className="input !w-auto" value={values.sort} onChange={set("sort")}>
          <option value="newest">Newest listings</option>
          <option value="price_asc">Price: low to high</option>
          <option value="price_desc">Price: high to low</option>
        </select>
        <div className="ml-auto flex gap-2">
          <button type="button" onClick={onReset} className="rounded-full px-4 py-2 text-sm font-semibold text-muted hover:text-ink">Reset</button>
          <button type="submit" className="flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-ink"><Search className="h-4 w-4" /> Search</button>
        </div>
      </div>
    </form>
  );
}
