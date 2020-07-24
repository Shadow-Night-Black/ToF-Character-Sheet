import { Widget, WidgetProps } from "./UI/Widgets/Widget";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Dialog, DialogParams, DialogBody } from "./UI/Dialogs/Dialog";
import { CreateTestCharacter, Character } from "./Models/Character";
import { AttributeWidgetConstructor } from "./UI/Widgets/AttributesWidget";
import { SkillsWidgetConstructor } from "./UI/Widgets/SkillsWidget";
import { BlessingsWidgetConstructor } from "./UI/Widgets/TotemWidget";

type AppState= {
  ui: UIState,
  model: ModelState
}

export interface ModelState {
  character: Character;
}

export interface AppControls<T> {
  openDialog: openDialog;
  update: Update<T>;
  remove: Delete<T> ;
}

export type openDialog = (node: DialogBody, oncloseCallback?: () => void) => void;
export type Update<T> = (update: (old: T) => T) => void;
export type Delete<T> = (update: (old: T) => boolean) => void;

export interface UIState {
  dialog: DialogParams;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      model: { character: CreateTestCharacter()},
      ui: {
        dialog: {
          isOpen: false,
          onClose: () => {},
          node: () => null,
        },
      },
    };
  }

  updateUI:Update<UIState> = (map) => {
    this.setState((state) => ({ ...state, ui: map(state.ui) }));
  };

  updateCharacter:Update<Character> = (map) => {
    this.updateModel((model) => ({ ...model, character: map(model.character) }));
  };

  updateModel:Update<ModelState> = (map) => {
    this.setState((state) => ({ ...state, model: map(state.model) }));
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

  AppControls: AppControls<Character> = {
    openDialog: this.openDialog,
    update: this.updateCharacter,
    remove: () => {}
  };

  WidgetProps: ()=> WidgetProps  = () => ({
    appControls: this.AppControls,
    state: this.state.model,
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
          model={this.state.model}
          dialogState={this.state.ui.dialog}
        />
      </div>
    );
  }
}

export default App;
