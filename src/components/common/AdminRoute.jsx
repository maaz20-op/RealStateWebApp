import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import Button from "./Button";

// UX only. The backend must also reject non-admin requests.
export default function AdminRoute({ children }) {
  const { isAdmin } = useAuth();
  if (isAdmin) return children;
  return (
    <div className="container-x section text-center">
      <ShieldAlert className="mx-auto mb-4 h-10 w-10 text-muted" />
      <h1 className="text-3xl">Access denied</h1>
      <p className="mx-auto mt-3 max-w-md text-muted">This page is only available to administrators.</p>
      <Button as={Link} to="/" className="mt-8">Back to home</Button>
    </div>
  );
}
