import { forwardRef } from "react";

// Labeled input/textarea/select wrapper that shows its own validation error.
const Field = forwardRef(function Field({ label, error, as: Tag = "input", id, children, className = "", ...props }, ref) {
  const fid = id || props.name;
  return (
    <div className={className}>
      <label htmlFor={fid} className="label">{label}</label>
      <Tag id={fid} ref={ref} aria-invalid={!!error} aria-describedby={error ? `${fid}-err` : undefined} className="input" {...props}>{children}</Tag>
      {error && <p id={`${fid}-err`} className="field-error">{error}</p>}
    </div>
  );
});
export default Field;
