import React, { useState } from "react";

 const Dropdown = ({ label, options, value, onChange, placeholder }: any) => {
  const [open, setOpen] = useState(false);

  const selected = options.find((opt: any) => opt.value === value)?.label || placeholder;

  return (
    <div>
      {label && <div>{label}</div>}
      <button className="ls-dropdown-toggle" onClick={() => setOpen(!open)} type="button">
        <span>{selected}</span>
        <span>▼</span>
      </button>
      {open && (
        <ul className="ls-dropdown-list">
          {options.map((opt: any) => (
            <li
              className="ls-dropdown-item"
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default React.memo(Dropdown);