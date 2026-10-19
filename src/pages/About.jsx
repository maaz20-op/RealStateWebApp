import businessConfig from "../config/businessConfig";
import { WhyChooseUs } from "../components/home/Sections";
import Testimonials from "../components/common/Testimonials";
import ContactCta from "../components/common/ContactCta";

export default function About() {
  const { name, description, mission, vision, values } = businessConfig;
  return (
    <>
      <section className="container-x py-16 sm:py-24">
        <h1 className="max-w-3xl text-5xl sm:text-6xl">About {name}</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">{description}</p>
      </section>
      <section className="container-x grid gap-6 pb-16 md:grid-cols-2">
        {[["Our mission", mission], ["Our vision", vision]].map(([t, text]) => (
          <div key={t} className="rounded-3xl border border-line bg-surface p-8"><h2 className="text-2xl">{t}</h2><p className="mt-3 text-muted">{text}</p></div>
        ))}
      </section>
      <section className="container-x pb-16">
        <h2 className="mb-8 text-3xl">Our values</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v) => (<div key={v.title}><h3 className="text-xl font-semibold">{v.title}</h3><p className="mt-2 text-sm text-muted">{v.text}</p></div>))}
        </div>
      </section>
      <WhyChooseUs /><Testimonials /><ContactCta />
    </>
  );
}
