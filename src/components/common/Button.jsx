const styles = {
  primary: "bg-accent text-accent-ink hover:opacity-90",
  outline: "border border-line bg-surface text-ink hover:border-accent",
  ghost: "text-ink hover:bg-line/50",
};

// `as` lets the same styles apply to <button>, <Link> or <a>.
export default function Button({ as: Tag = "button", variant = "primary", className = "", ...props }) {
  return (
    <Tag
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`}
      {...props}
    />
  );
}
