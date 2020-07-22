import React, { FunctionComponent, ReactNode } from "react";
import "./Dialog.css";

type DialogProps = {
  dialogState: DialogState
};

export type DialogState = {
    isOpen: boolean;
    onClose: () => void;
    node?: ReactNode;
}

export const Dialog: FunctionComponent<DialogProps> = ({
  dialogState,
  children,
}) => {
  if (!dialogState.isOpen) return null;
  return (
    <div className="dialog-backdrop">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal title</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{dialogState.node}</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={dialogState.onClose}>
              Save changes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
