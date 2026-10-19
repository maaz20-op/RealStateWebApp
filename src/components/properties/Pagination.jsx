import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, pages, onPage }) {
  if (pages <= 1) return null;
  const btn = "flex h-10 min-w-10 items-center justify-center rounded-full border border-line px-3 text-sm font-semibold disabled:opacity-40";
  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
      <button className={btn} disabled={page <= 1} onClick={() => onPage(page - 1)} aria-label="Previous page"><ChevronLeft className="h-4 w-4" /></button>
      {Array.from({ length: pages }, (_, i) => i + 1).slice(Math.max(0, page - 3), page + 2).map((n) => (
        <button key={n} onClick={() => onPage(n)} aria-current={n === page ? "page" : undefined} className={`${btn} ${n === page ? "!border-accent bg-accent text-accent-ink" : ""}`}>{n}</button>
      ))}
      <button className={btn} disabled={page >= pages} onClick={() => onPage(page + 1)} aria-label="Next page"><ChevronRight className="h-4 w-4" /></button>
    </nav>
  );
}
