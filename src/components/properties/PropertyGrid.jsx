import PropertyCard from "./PropertyCard";
import { PropertyCardSkeleton, ErrorState, EmptyState } from "../common/States";
import { getErrorMessage } from "../../utils/format";

// Shared by the homepage sections and the listing page.
export default function PropertyGrid({ query, count = 3, emptyAction }) {
  const { data, isLoading, isError, error, refetch } = query;
  if (isLoading) return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: count }, (_, i) => <PropertyCardSkeleton key={i} />)}</div>;
  if (isError) return <ErrorState text={getErrorMessage(error)} onRetry={refetch} />;
  if (!data?.items?.length) return <EmptyState title="No properties found" text="Try changing your search or filters." action={emptyAction} />;
  return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{data.items.map((p) => <PropertyCard key={p._id || p.id} property={p} />)}</div>;
}
