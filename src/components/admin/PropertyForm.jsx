import { useState } from "react";
import { useForm } from "react-hook-form";
import Field from "../common/Field";
import Button from "../common/Button";
import ImageUploader from "./ImageUploader";
import { PROPERTY_TYPES } from "../../utils/format";

const req = (m) => ({ required: m });
const num = (m) => ({ required: m, min: { value: 0, message: "Must be 0 or more" } });

export default function PropertyForm({ onSubmit, isLoading }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { status: "Available", propertyType: "House" } });
  const [files, setFiles] = useState([]);
  const [imgError, setImgError] = useState("");

  const submit = (values) => {
    if (!files.length) return setImgError("Add at least one image.");
    // Multipart body. The browser sets the Content-Type boundary.
    const fd = new FormData();
    const { amenities, ...rest } = values;
    Object.entries(rest).forEach(([k, v]) => v !== "" && fd.append(k, v));
    amenities.split(",").map((a) => a.trim()).filter(Boolean).forEach((a) => fd.append("amenities", a));
    files.forEach((f) => fd.append("images", f));
    onSubmit(fd, () => setFiles([]));
  };
  const f = (name, opts) => ({ error: errors[name]?.message, ...register(name, opts) });

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="space-y-8 rounded-3xl border border-line bg-surface p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Title" className="sm:col-span-2" {...f("title", req("Enter a title"))} />
        <Field as="textarea" rows={5} label="Description" className="sm:col-span-2" {...f("description", req("Enter a description"))} />
        <Field label="Price" type="number" min="0" {...f("price", num("Enter a price"))} />
        <Field as="select" label="Property type" {...f("propertyType")}>{PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}</Field>
        <Field label="Address" className="sm:col-span-2" {...f("address[street]", req("Enter an address"))} />
        <Field label="Area" {...f("address[area]")} />
        <Field label="City" {...f("address[city]", req("Enter a city"))} />
        <Field label="State" {...f("address[state]")} />
        <Field label="Country" {...f("address[country]", req("Enter a country"))} />
        <Field label="Bedrooms" type="number" min="0" {...f("bedrooms", num("Enter bedrooms"))} />
        <Field label="Bathrooms" type="number" min="0" {...f("bathrooms", num("Enter bathrooms"))} />
        <Field label="Covered area (sq ft)" type="number" min="0" {...f("coveredArea", num("Enter covered area"))} />
        <Field label="Land area (sq ft)" type="number" min="0" {...f("landArea", { min: { value: 0, message: "Must be 0 or more" } })} />
        <Field label="Amenities (comma separated)" className="sm:col-span-2" placeholder="Parking, Garden, Security" {...f("amenities")} />
        <Field as="select" label="Availability" {...f("status")}>{["Available", "Sold", "Rented", "Pending"].map((s) => <option key={s}>{s}</option>)}</Field>
      </div>
      <ImageUploader files={files} onChange={setFiles} error={imgError} onError={setImgError} />
      <Button type="submit" disabled={isLoading}>{isLoading ? "Saving property…" : "Create property"}</Button>
    </form>
  );
}
