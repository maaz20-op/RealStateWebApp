import { useEffect, useMemo, useRef } from "react";
import { ImagePlus, X } from "lucide-react";

export const MAX_IMAGES = 5;
const MAX_MB = 5;
const TYPES = ["image/jpeg", "image/png", "image/webp"];

// Returns an error string, or "" when the file is acceptable.
export const validateImage = (f) =>
  !TYPES.includes(f.type) ? `${f.name}: use JPG, PNG or WebP.` : f.size > MAX_MB * 1024 * 1024 ? `${f.name}: larger than ${MAX_MB} MB.` : "";

export default function ImageUploader({ files, onChange, error, onError }) {
  const input = useRef(null);
  const previews = useMemo(() => files.map((f) => URL.createObjectURL(f)), [files]);
  useEffect(() => () => previews.forEach(URL.revokeObjectURL), [previews]);

  const add = (list) => {
    const incoming = Array.from(list);
    const problem = incoming.map(validateImage).find(Boolean);
    if (problem) return onError(problem);
    if (files.length + incoming.length > MAX_IMAGES) return onError(`You can upload up to ${MAX_IMAGES} images.`);
    onError(""); onChange([...files, ...incoming]);
  };
  return (
    <div>
      <span className="label">Images (1 to {MAX_IMAGES})</span>
      <button type="button" onClick={() => input.current.click()} className="flex w-full flex-col items-center gap-2 rounded-2xl border border-dashed border-line px-4 py-8 text-sm text-muted hover:border-accent">
        <ImagePlus className="h-6 w-6" aria-hidden="true" /> Choose images (JPG, PNG or WebP, up to {MAX_MB} MB each)
      </button>
      <input ref={input} type="file" accept={TYPES.join(",")} multiple hidden onChange={(e) => { add(e.target.files); e.target.value = ""; }} />
      {error && <p role="alert" className="field-error">{error}</p>}
      {!!files.length && (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {previews.map((src, i) => (
            <li key={src} className="relative">
              <img src={src} alt={`Selected image ${i + 1}`} className="aspect-square w-full rounded-xl object-cover" />
              <button type="button" onClick={() => onChange(files.filter((_, idx) => idx !== i))} aria-label={`Remove image ${i + 1}`} className="absolute right-1.5 top-1.5 rounded-full bg-bg p-1 shadow"><X className="h-3.5 w-3.5" /></button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
