import { Link } from "react-router-dom";
import Button from "../components/common/Button";

export default function NotFound() {
  return (
    <div className="container-x py-24 text-center">
      <p className="font-display text-8xl text-accent">404</p>
      <h1 className="mt-4 text-3xl">We can't find that page</h1>
      <p className="mx-auto mt-3 max-w-md text-muted">The link may be broken or the page may have moved.</p>
      <Button as={Link} to="/" className="mt-8">Back to home</Button>
    </div>
  );
}
