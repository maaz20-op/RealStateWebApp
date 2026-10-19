import { Quote } from "lucide-react";
import businessConfig from "../../config/businessConfig";

export default function Testimonials() {
  return (
    <section className="section container-x">
      <h2 className="text-3xl sm:text-4xl">What clients say</h2>
      <p className="mt-2 text-sm text-muted">Demo content for layout purposes only.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {businessConfig.testimonials.map((t) => (
          <figure key={t.name} className="rounded-3xl border border-line bg-surface p-7">
            <Quote className="h-5 w-5 text-accent" aria-hidden="true" />
            <blockquote className="mt-4 text-sm leading-relaxed">{t.text}</blockquote>
            <figcaption className="mt-6 text-sm"><span className="font-semibold">{t.name}</span> <span className="text-muted">{t.role}</span></figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
