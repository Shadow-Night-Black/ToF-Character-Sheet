import React, { FunctionComponent } from "react";
import "./Dialog.scss";
import { Update, UIState, AppControls } from "../../App";
import { WidgetProps } from "../Widgets/Widget";

type DialogProps<T> = {
  dialogState: DialogParams<T>;
  appControls: AppControls<T>;
  updateUI: Update<UIState<T>>;
};

export type DialogSection<T> = FunctionComponent<WidgetProps<T>>

export type DialogParams<T> = {
  isOpen: boolean;
  body: DialogSection<T>
  header: DialogSection<T>
  model: T;
};

export function EditInDialogButton<T>(appControls:AppControls<T>, header:DialogSection<T>, body:DialogSection<T> ) {
return <button
      className='btn-primary btn-sm btn '
      onClick={() => {
        appControls.openDialog(header, body);
      }}
    >
      Edit
    </button>
}


export class Dialog<T> extends React.Component<DialogProps<T>, {}> {

  updateUI: Update<T> = (map) => {
    this.props.updateUI(old => ({...old, dialog:{...old.dialog, model:map(old.dialog.model)}}))
  };

  saveChanges = () => {
      this.props.appControls.update(() => this.props.dialogState.model);
      this.close();
  };

  close = () => {
    this.props.updateUI((uiState) => ({
      ...uiState,
      dialog: {...this.props.dialogState, isOpen: false, body: () => null, header: () => null},
    }));

    this.setState((oldState) => ({...oldState, closed: true}));
  };

  render() {
    const { dialogState } = this.props;
    if (!dialogState.isOpen) return null;

    const state = this.props.dialogState.model;
    const appControls  = {...this.props.appControls, update: this.updateUI};

    return (
      <div className='dialog-backdrop'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header modal-title'>
              <dialogState.header appControls={appControls} state={state} editMode={true} />
              <button type='button' className='close' aria-label='Close' onClick={this.close}>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>

              <dialogState.body appControls={appControls} state={state} editMode={true} /> </div>
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
