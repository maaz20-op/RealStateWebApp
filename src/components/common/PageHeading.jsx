export default function PageHeading({ title, text }) {
  return (
    <div className="container-x pb-8 pt-14 sm:pt-20">
      <h1 className="text-4xl sm:text-5xl">{title}</h1>
      {text && <p className="mt-4 max-w-2xl text-muted">{text}</p>}
    </div>
  );
}
