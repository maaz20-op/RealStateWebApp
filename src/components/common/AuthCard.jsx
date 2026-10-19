export default function AuthCard({ title, text, children, footer }) {
  return (
    <div className="container-x flex justify-center py-14 sm:py-20">
      <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-8 shadow-lift">
        <h1 className="text-3xl">{title}</h1>
        <p className="mt-2 text-sm text-muted">{text}</p>
        <div className="mt-8">{children}</div>
        <p className="mt-6 text-center text-sm text-muted">{footer}</p>
      </div>
    </div>
  );
}
