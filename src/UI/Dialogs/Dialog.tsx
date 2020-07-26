import React, { FunctionComponent } from "react";
import "./Dialog.css";
import { Update, UIState, AppControls } from "../../App";
import { WidgetProps } from "../Widgets/Widget";

type DialogProps<T> = {
  dialogState: DialogParams<T>;
  model: T;
  appControls: AppControls<T>;
  updateUI: Update<UIState>;
};

export type DialogSection<T> = FunctionComponent<WidgetProps<T>>

export type DialogParams<T> = {
  isOpen: boolean;
  body: DialogSection<T>
  header: DialogSection<T>
};

type DialogState<T> = T & {
  closed:boolean
}

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


export class Dialog<T> extends React.Component<DialogProps<T>, DialogState<T>> {
  constructor(props: DialogProps<T>) {
    super(props);

    this.state = {...props.model, closed: true };
  }

  updateUI: Update<T> = (map) => {
    this.setState(map);
  };

  saveChanges = () => {
      this.props.appControls.update(() => this.state);
      this.close();
  };

  close = () => {
    this.props.updateUI((uiState) => ({
      ...uiState,
      dialog: { isOpen: false, body: () => null, header: () => null, close: () => {} },
    }));

    this.setState((oldState) => ({...oldState, closed: true}));
  };

  render() {
    const { appControls, dialogState } = this.props;
    if (!dialogState.isOpen) return null;

    const { closed }  = this.state;
    let state:T = this.state;

    if (closed) {
      state = this.props.model;
      this.setState((old) => ({...old, closed:false}))
    }

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
