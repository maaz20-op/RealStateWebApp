import Hero from "../components/home/Hero";
import { FeaturedProperties, LatestProperties, Categories, WhyChooseUs, Stats } from "../components/home/Sections";
import Testimonials from "../components/common/Testimonials";
import ContactCta from "../components/common/ContactCta";

export default function Home() {
  return (<><Hero /><FeaturedProperties /><Categories /><LatestProperties /><WhyChooseUs /><Stats /><Testimonials /><ContactCta /></>);
}
