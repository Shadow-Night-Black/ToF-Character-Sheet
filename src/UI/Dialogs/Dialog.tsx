import React, { FunctionComponent, ReactNode } from "react";
import "./Dialog.css";
import { Character } from "../../Models/Character";

type DialogProps = {
  dialogState: DialogState
  character: Character
};

export type DialogState = {
    isOpen: boolean;
    onClose: () => void;
    node: (character:Character) => ReactNode;
}

export const Dialog: FunctionComponent<DialogProps> = ({
  dialogState,
  character,
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
          <div className="modal-body">{dialogState.node(character)}</div>
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
