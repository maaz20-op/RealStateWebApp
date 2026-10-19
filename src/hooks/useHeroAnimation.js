import { useLayoutEffect } from "react";
import { gsap } from "gsap";

// One staged entrance for the hero. Skipped for reduced-motion; reverted on unmount.
export default function useHeroAnimation(scope) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from("[data-hero='title']", { y: 36, opacity: 0, duration: 1.3 })
          .from(
            "[data-hero='text']",
            { y: 20, opacity: 0, duration: 1.2 },
            "-=0.5",
          )
          .from(
            "[data-hero='cta'] > *",
            { y: 16, opacity: 0, stagger: 0.1, duration: 0.5 },
            "-=0.4",
          );

        const tl2 = gsap.timeline({ defaults: { ease: "power1.inOut" } });

        tl2.from("[data-hero='image']", { x: 76, opacity: 0, duration: 1.3 });
      });
    }, scope);
    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [scope]);
}
