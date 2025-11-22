export const Button = ({ children, onClick, disabled, variant, ...rest }: any) => {
  const className = ["ls-button", variant, rest.className].filter(Boolean).join(" ");
  return (
    <button className={className} onClick={onClick} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
