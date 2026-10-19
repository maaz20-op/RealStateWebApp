import PropertyCard from "./PropertyCard";
import { PropertyCardSkeleton, ErrorState, EmptyState } from "../common/States";
import { getErrorMessage } from "../../utils/format";

export const dummyProperties = [
  {
    id: "prop-001",
    title: "Modern Luxury Villa with Ocean View",
    propertyType: "Villa",
    price: 850000,
    address: "124 Ocean Drive",
    city: "Miami",
    state: "FL",
    bedrooms: 5,
    bathrooms: 6,
    coveredArea: 4200,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=640&q=80",
    ],
  },
  {
    id: "prop-002",
    title: "Downtown Chic Penthouse Apartment",
    propertyType: "Penthouse",
    price: 620000,
    address: "450 Skyline Avenue, Apt 14B",
    city: "New York",
    state: "NY",
    bedrooms: 3,
    bathrooms: 3,
    coveredArea: 2100,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=640&q=80",
    ],
  },
  {
    id: "prop-003",
    title: "Cozy Suburb Family Home",
    propertyType: "House",
    price: 345000,
    address: "78 Elmwood Lane",
    city: "Austin",
    state: "TX",
    bedrooms: 4,
    bathrooms: 2,
    coveredArea: 2500,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=640&q=80",
    ],
  },
  {
    id: "prop-004",
    title: "Minimalist Industrial Loft",
    propertyType: "Loft",
    price: 410000,
    address: "920 Warehouse District",
    city: "Chicago",
    state: "IL",
    bedrooms: 2,
    bathrooms: 2,
    coveredArea: 1650,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=640&q=80",
    ],
  },
  {
    id: "prop-005",
    title: "Spacious Countryside Ranch",
    propertyType: "Ranch",
    price: 495000,
    address: "14 Green Pastures Road",
    city: "Nashville",
    state: "TN",
    bedrooms: 4,
    bathrooms: 3,
    coveredArea: 3100,
    images: [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=640&q=80",
    ],
  },
  {
    id: "prop-006",
    title: "Sunset Ridge Modern Townhouse",
    propertyType: "Townhouse",
    price: 380000,
    address: "312 Sunset Boulevard",
    city: "Denver",
    state: "CO",
    bedrooms: 3,
    bathrooms: 3,
    coveredArea: 1900,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=640&q=80",
    ],
  },
  {
    id: "prop-007",
    title: "Secluded Alpine Cabin Retreat",
    propertyType: "Cabin",
    price: 290000,
    address: "8 Pine Tree Trail",
    city: "Aspen",
    state: "CO",
    bedrooms: 2,
    bathrooms: 1,
    coveredArea: 1250,
    images: [
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=640&q=80",
    ],
  },
  {
    id: "prop-008",
    title: "Luxury Beachfront Condo",
    propertyType: "Condo",
    price: 550000,
    address: "500 Shoreline Drive, Unit 401",
    city: "San Diego",
    state: "CA",
    bedrooms: 2,
    bathrooms: 2,
    coveredArea: 1400,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=640&q=80",
    ],
  },
  {
    id: "prop-009",
    title: "Historic Victorian Estate",
    propertyType: "Estate",
    price: 950000,
    address: "67 Heritage Way",
    city: "Savannah",
    state: "GA",
    bedrooms: 6,
    bathrooms: 5,
    coveredArea: 5200,
    images: [
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=640&q=80",
    ],
  },
  {
    id: "prop-010",
    title: "Eco-Friendly Smart Home",
    propertyType: "House",
    price: 475000,
    address: "220 Innovation Parkway",
    city: "Seattle",
    state: "WA",
    bedrooms: 3,
    bathrooms: 2,
    coveredArea: 2050,
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=640&q=80",
    ],
  },
  {
    id: "prop-011",
    title: "Urban Studio Apartment",
    propertyType: "Studio",
    price: 210000,
    address: "15 Market Street, #3C",
    city: "Boston",
    state: "MA",
    bedrooms: 1,
    bathrooms: 1,
    coveredArea: 680,
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=640&q=80",
    ],
  },
  {
    id: "prop-012",
    title: "Sunny Suburban Duplex",
    propertyType: "Duplex",
    price: 320000,
    address: "88 Maple Leaf Drive",
    city: "Atlanta",
    state: "GA",
    bedrooms: 3,
    bathrooms: 2.5,
    coveredArea: 1750,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=640&q=80",
    ],
  },
];
// Shared by the homepage sections and the listing page.
export default function PropertyGrid({ query, count = 3, emptyAction }) {
  console.log(query);
  // const { data, isLoading, isError, error, refetch } = query;
  // if (isLoading) return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: count }, (_, i) => <PropertyCardSkeleton key={i} />)}</div>;
  // if (isError) return <ErrorState text={getErrorMessage(error)} onRetry={refetch} />;
  // if (!data?.items?.length) return <EmptyState title="No properties found" text="Try changing your search or filters." action={emptyAction} />;
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {dummyProperties.map((p) => (
        <PropertyCard key={p._id || p.id} property={p} />
      ))}
    </div>
  );
}
