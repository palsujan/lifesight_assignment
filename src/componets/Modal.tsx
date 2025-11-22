import { Button } from "./Button";

const Modal = ({ isOpen, onClose, title, children }: any) => {
  if (!isOpen) return null;

  return (
    <div className="ls-modal-backdrop" onClick={onClose}>
      <div className="ls-modal" onClick={(e) => e.stopPropagation()} role="dialog">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>{title}</h2>
          <Button variant="secondary" onClick={onClose} disabled={false}>
            Close
          </Button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
