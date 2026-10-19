import { useRef } from "react";
import { Link } from "react-router-dom";
import businessConfig from "../../config/businessConfig";
import useHeroAnimation from "../../hooks/useHeroAnimation";
import Button from "../common/Button";

export default function Hero() {
  const ref = useRef(null);
  useHeroAnimation(ref);
  return (
    <section
      ref={ref}
      className="container-x grid items-center gap-10 py-12 sm:py-20 lg:grid-cols-[1.05fr_1fr]"
    >
      <div>
        <h1
          data-hero="title"
          className="text-5xl leading-[1.05] sm:text-6xl lg:text-7xl"
        >
          {businessConfig.name}
        </h1>
        <p data-hero="text" className="mt-6 max-w-lg text-lg text-muted">
          Find a home that fits how you live. Browse current listings, then talk
          to our team directly.
        </p>
        <div data-hero="cta" className="mt-9 flex flex-wrap gap-3">
          <Button as={Link} to="/properties">
            Explore properties
          </Button>
          <Button as={Link} to="/contact" variant="outline">
            Contact us
          </Button>
        </div>
      </div>
      <div
        data-hero="image"
        className="overflow-hidden rounded-[2rem] shadow-lift lg:rounded-tl-[8rem]"
      >
        <img
          src={businessConfig.heroImage}
          alt="Modern home exterior at dusk"
          width="1400"
          height="1000"
          fetchpriority="high"
          className="aspect-[5/4] w-full object-cover"
        />
      </div>
    </section>
  );
}
