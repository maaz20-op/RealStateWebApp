import { useState } from "react";
import PageHeading from "../components/common/PageHeading";
import PropertyForm from "../components/admin/PropertyForm";
import { useCreatePropertyMutation } from "../services/propertyApi";
import { useToast } from "../components/common/Toast";
import { getErrorMessage } from "../utils/format";

export default function CreateProperty() {
  const [create, { isLoading }] = useCreatePropertyMutation();
  const [error, setError] = useState("");
  const toast = useToast();

  const onSubmit = async (formData, afterSuccess) => {
    setError("");
    try { await create(formData).unwrap(); toast.success("Property created"); afterSuccess(); }
    catch (e) { const m = getErrorMessage(e, "The property was not saved."); setError(m); toast.error(m); }
  };
  return (
    <>
      <PageHeading title="Create property" text="Add a new listing. The server must confirm the save before it appears." />
      <div className="container-x max-w-4xl pb-20">
        {error && <p role="alert" className="mb-6 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">{error}</p>}
        <PropertyForm onSubmit={onSubmit} isLoading={isLoading} />
      </div>
    </>
  );
}
