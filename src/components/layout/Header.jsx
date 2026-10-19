import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, Moon, Sun, X, UserRound, LogOut, Plus } from "lucide-react";
import businessConfig from "../../config/businessConfig";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../common/Toast";
import WhatsAppButton from "../common/WhatsAppButton";

const links = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, isAdmin, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  const onLogout = async () => {
    try {
      await logout();
      toast.success("Signed out");
      navigate("/");
    } catch {
      toast.error("Could not sign out. Please try again.");
    }
  };
  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${isActive ? "bg-accent/10 text-accent" : "text-muted hover:text-ink"}`;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link to="/" className="font-display text-xl font-semibold">
          {businessConfig.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={linkClass}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppButton
            label="Chat"
            className="hidden !px-4 !py-2 lg:inline-flex"
          />
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            className="rounded-full p-2.5 hover:bg-line/60"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          <div className="hidden items-center gap-1 md:flex">
            {isAdmin && (
              <Link
                to="/create"
                className="rounded-full p-2.5 hover:bg-line/60"
                aria-label="Add property"
              >
                <Plus className="h-5 w-5" />
              </Link>
            )}
            {user ? (
              <button
                onClick={onLogout}
                className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold hover:border-accent"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold hover:border-accent"
              >
                <UserRound className="h-4 w-4" /> Log in
              </Link>
            )}
          </div>
          <button
            className="rounded-full p-2.5 hover:bg-line/60 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-line bg-bg md:hidden"
        >
          <div className="container-x flex flex-col gap-1 py-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={linkClass}
              >
                {l.label}
              </NavLink>
            ))}
            {isAdmin && (
              <NavLink to="/create" className={linkClass}>
                Add property
              </NavLink>
            )}
            {user ? (
              <button
                onClick={onLogout}
                className="rounded-full px-4 py-2 text-left text-sm font-semibold text-muted"
              >
                Sign out
              </button>
            ) : (
              <NavLink to="/login" className={linkClass}>
                Log in
              </NavLink>
            )}
            <WhatsAppButton className="mt-2" />
          </div>
        </nav>
      )}
    </header>
  );
}
