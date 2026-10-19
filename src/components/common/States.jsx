import { AlertTriangle, SearchX } from "lucide-react";
import Button from "./Button";

export const Skeleton = ({ className = "" }) => <div aria-hidden="true" className={`animate-pulse rounded-xl bg-line ${className}`} />;

export const Spinner = ({ label = "Loading" }) => (
  <div role="status" className="flex justify-center py-24">
    <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-accent" />
    <span className="sr-only">{label}</span>
  </div>
);

export function EmptyState({ title, text, action }) {
  return (
    <div className="mx-auto max-w-md rounded-3xl border border-dashed border-line px-6 py-14 text-center">
      <SearchX className="mx-auto mb-4 h-8 w-8 text-muted" />
      <h3 className="text-xl font-semibold">{title}</h3>
      {text && <p className="mt-2 text-sm text-muted">{text}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function ErrorState({ title = "We couldn't load this", text, onRetry }) {
  return (
    <div role="alert" className="mx-auto max-w-md rounded-3xl border border-line bg-surface px-6 py-14 text-center">
      <AlertTriangle className="mx-auto mb-4 h-8 w-8 text-red-500" />
      <h3 className="text-xl font-semibold">{title}</h3>
      {text && <p className="mt-2 text-sm text-muted">{text}</p>}
      {onRetry && <Button variant="outline" onClick={onRetry} className="mt-6">Try again</Button>}
    </div>
  );
}

export const PropertyCardSkeleton = () => (
  <div className="overflow-hidden rounded-3xl border border-line bg-surface">
    <Skeleton className="aspect-[4/3] rounded-none" />
    <div className="space-y-3 p-5"><Skeleton className="h-5 w-3/4" /><Skeleton className="h-4 w-1/2" /><Skeleton className="h-4 w-full" /></div>
  </div>
);
