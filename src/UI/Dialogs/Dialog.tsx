import React, { ReactNode } from "react";
import "./Dialog.css";
import { Character } from "../../Models/Character";
import { Update, UIState } from "../../App";

type DialogProps = {
  dialogState: DialogParams;
  character: Character;
  saveChanges: Update<Character>;
  updateUI: Update<UIState>;
};

export type DialogBody = (character: Character, update: Update<Character>) => ReactNode;

export type DialogParams = {
  isOpen: boolean;
  onClose?: () => void;
  node: DialogBody;
};

type DialogState = {
  character?: Character;
};

export class Dialog extends React.Component<DialogProps, DialogState> {
  constructor(props: DialogProps) {
    super(props);

    this.state = { character: props.character };
  }

  updateUICharacter: Update<Character> = (map) => {
    this.setState((oldState) => ({ ...oldState, character: map(oldState.character ?? this.props.character) }));
  };

  saveChanges = () => {
    if (this.state.character) {
      const c = this.state.character;
      this.props.saveChanges(() => c);
      this.close();
    }
  };

  close = () => {
    if (this.props.dialogState.onClose) this.props.dialogState.onClose();
    this.props.updateUI((uiState) => ({
      ...uiState,
      dialog: { isOpen: false, node: () => null, close: () => {} },
    }));
    this.setState((oldState) => ({ ...oldState, character: undefined}));
  };

  render() {
    const { dialogState } = this.props;
    if (!this.state.character) this.updateUICharacter(() => this.props.character)
    const  character  = this.state.character!;

    if (!dialogState.isOpen) return null;
    return (
      <div className='dialog-backdrop'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Modal title</h5>
              <button type='button' className='close' aria-label='Close' onClick={this.close}>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>{dialogState.node(character, this.updateUICharacter)}</div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-primary' onClick={this.saveChanges}>
                Save changes
              </button>
              <button type='button' className='btn btn-secondary' data-dismiss='modal' onClick={this.close}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
