import React, { FunctionComponent } from "react";
import "./Dialog.css"

type DialogProps = {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
};

export const Dialog: FunctionComponent<DialogProps> = ({
  className,
  isOpen,
  children,
}) => {
  if (!isOpen) return null;
  return (
    <div className="dialog-backdrop">
    <div className={`dialog ${className || ""}`}>{children}</div>
</div>
  );
};
