import { useState } from "react";
import { useForm } from "react-hook-form";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import businessConfig from "../config/businessConfig";
import PageHeading from "../components/common/PageHeading";
import Field from "../components/common/Field";
import Button from "../components/common/Button";
import WhatsAppButton from "../components/common/WhatsAppButton";
import { useSendContactMutation } from "../services/propertyApi";
import { useToast } from "../components/common/Toast";
import { getErrorMessage } from "../utils/format";

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [send, { isLoading }] = useSendContactMutation();
  const [status, setStatus] = useState(null);
  const toast = useToast();
  const { name, phone, whatsapp, email, address } = businessConfig;

  const onSubmit = async (values) => {
    setStatus(null);
    try { await send(values).unwrap(); setStatus({ ok: true }); toast.success("Message sent"); reset(); }
    catch (e) { const message = getErrorMessage(e, "Your message was not sent."); setStatus({ ok: false, message }); toast.error(message); }
  };
  const info = [[Phone, "Phone", phone], [MessageCircle, "WhatsApp", whatsapp], [Mail, "Email", email], [MapPin, "Office", address]];

  return (
    <>
      <PageHeading title={`Contact ${name}`} text="Send a message or reach us directly." />
      <div className="container-x grid gap-10 pb-20 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-4">
          {info.map(([Icon, label, value]) => (
            <div key={label} className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-5">
              <Icon className="mt-0.5 h-5 w-5 text-accent" aria-hidden="true" />
              <div><p className="text-sm font-semibold">{label}</p><p className="text-sm text-muted">{value || "Not provided yet"}</p></div>
            </div>
          ))}
          <WhatsAppButton label="Message on WhatsApp" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 rounded-3xl border border-line bg-surface p-6 sm:grid-cols-2 sm:p-8">
          {status?.ok && <p role="status" className="rounded-xl bg-accent/10 px-4 py-3 text-sm text-accent sm:col-span-2">Thanks, your message was sent. We'll reply soon.</p>}
          {status?.ok === false && <p role="alert" className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400 sm:col-span-2">{status.message}</p>}
          <Field label="Name" autoComplete="name" error={errors.name?.message} {...register("name", { required: "Enter your name" })} />
          <Field label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email", { required: "Enter your email", pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address" } })} />
          <Field label="Phone" type="tel" autoComplete="tel" error={errors.phone?.message} {...register("phone", { pattern: { value: /^[\d\s\-+()]{7,20}$/, message: "Enter a valid phone number" } })} />
          <Field label="Subject" error={errors.subject?.message} {...register("subject", { required: "Enter a subject" })} />
          <Field as="textarea" rows={5} label="Message" className="sm:col-span-2" error={errors.message?.message} {...register("message", { required: "Write a message", minLength: { value: 10, message: "Use at least 10 characters" } })} />
          <div className="sm:col-span-2"><Button type="submit" disabled={isLoading}>{isLoading ? "Sending…" : "Send message"}</Button></div>
        </form>
      </div>
    </>
  );
}
