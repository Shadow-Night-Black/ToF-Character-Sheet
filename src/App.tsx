import { Widget, WidgetProps } from "./UI/Widgets/Widget";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Dialog, DialogParams, DialogBody } from "./UI/Dialogs/Dialog";
import { CreateTestCharacter, Character } from "./Models/Character";
import { AttributeWidgetConstructor } from "./UI/Widgets/AttributesWidget";
import { SkillsWidgetConstructor } from "./UI/Widgets/SkillsWidget";
import { BlessingsWidgetConstructor } from "./UI/Widgets/TotemWidget";

export interface AppState {
  ui: UIState;
  character: Character;
}

export interface AppControls {
  openDialog: openDialog;
  updateCharacter: Update<Character>;
}

export type openDialog = (node: DialogBody, oncloseCallback?: () => void) => void;
export type Update<T> = (update: (old: T) => T) => void;

export interface UIState {
  dialog: DialogParams;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      character: CreateTestCharacter(),
      ui: {
        dialog: {
          isOpen: false,
          onClose: () => {},
          node: () => null,
        },
      },
    };
  }

  updateUI = (map: (newUi: UIState) => UIState) => {
    this.setState((state) => ({ ...state, ui: map(state.ui) }));
  };

  updateCharacter = (map: (newCharacter: Character) => Character) => {
    this.setState((state) => ({ ...state, character: map(state.character) }));
  };

  openDialog: openDialog = (node, oncloseCallback?) => {
    this.updateUI((uiState) => ({
      ...uiState,
      dialog: {
        isOpen: true,
        node: node,
        onClose: oncloseCallback,
      },
    }));
  };

  AppControls: AppControls = {
    openDialog: this.openDialog,
    updateCharacter: this.updateCharacter,
  };

  WidgetProps: ()=> WidgetProps  = () => ({
    appControls: this.AppControls,
    state: this.state,
    editMode: false,
  })

  render() {
    return (
      <div className='App card-columns'>
        <Widget {...AttributeWidgetConstructor(this.WidgetProps())}></Widget>
        <Widget {...SkillsWidgetConstructor(this.WidgetProps())}></Widget>
        <Widget {...BlessingsWidgetConstructor(this.WidgetProps())}></Widget>
        <Dialog
          updateUI={this.updateUI}
          saveChanges={this.updateCharacter}
          character={this.state.character}
          dialogState={this.state.ui.dialog}
        />
      </div>
    );
  }
}

export default App;
