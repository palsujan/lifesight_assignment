const InputData = ({ label, error, value, onChange, ...rest }: any) => {
  return (
    <div className="ls-input-wrapper">
      {label && <label className="ls-label">{label}</label>}
      <input className="ls-input" value={value} onChange={onChange} {...rest} />
      {error && <div className="ls-error">{error}</div>}
    </div>
  );
};

export const Input = InputData;
export default InputData;
