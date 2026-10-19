import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery({ images, title }) {
  const [i, setI] = useState(0);
  if (!images.length) return <div className="flex aspect-[16/10] items-center justify-center rounded-3xl bg-line text-sm text-muted">No images available</div>;
  const n = images.length;
  const go = (d) => setI((c) => (c + d + n) % n);
  const nav = "absolute top-1/2 -translate-y-1/2 rounded-full bg-bg/90 p-2.5 shadow hover:bg-bg";
  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl bg-line">
        <img src={images[i]} alt={`${title}, image ${i + 1} of ${n}`} className="aspect-[16/10] w-full object-cover" />
        {n > 1 && (<>
          <button onClick={() => go(-1)} className={`${nav} left-3`} aria-label="Previous image"><ChevronLeft className="h-5 w-5" /></button>
          <button onClick={() => go(1)} className={`${nav} right-3`} aria-label="Next image"><ChevronRight className="h-5 w-5" /></button>
        </>)}
        <span className="absolute bottom-3 right-3 rounded-full bg-bg/90 px-3 py-1 text-xs font-semibold" aria-live="polite">{i + 1} / {n}</span>
      </div>
      {n > 1 && (
        <ul className="mt-3 grid grid-cols-5 gap-2">
          {images.map((src, idx) => (
            <li key={src + idx}>
              <button onClick={() => setI(idx)} aria-label={`Show image ${idx + 1}`} aria-current={idx === i} className={`block w-full overflow-hidden rounded-xl border-2 ${idx === i ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"}`}>
                <img src={src} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
