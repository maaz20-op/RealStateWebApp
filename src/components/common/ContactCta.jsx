import { Link } from "react-router-dom";
import Button from "./Button";
import WhatsAppButton from "./WhatsAppButton";

export default function ContactCta() {
  return (
    <section className="container-x pb-16 sm:pb-24">
      <div className="rounded-[2rem] bg-accent px-6 py-14 text-center text-accent-ink sm:px-12">
        <h2 className="text-3xl sm:text-4xl">Tell us what you're looking for</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm opacity-90">Share your budget, preferred area and timeline, and our team will reply with matching properties.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button as={Link} to="/contact" className="!bg-accent-ink !text-accent">Contact us</Button>
          <WhatsAppButton variant="outline" className="!border-accent-ink/40 !bg-transparent !text-accent-ink" />
        </div>
      </div>
    </section>
  );
}
