import { Widget, WidgetProps } from "./UI/Widgets/Widget";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { Dialog, DialogParams, DialogSection } from "./UI/Dialogs/Dialog";
import { CreateTestCharacter, Character } from "./Models/Character";
import { AttributeWidgetConstructor } from "./UI/Widgets/AttributesWidget";
import { SkillsWidget } from "./UI/Widgets/SkillsWidget";
import { BlessingsWidgetConstructor as BlessingsWidget } from "./UI/Widgets/TotemWidget";

type AppState= {
  ui: UIState,
  ui: UIState<Character>,
  model: ModelState
}

export interface ModelState {
  character: Character;
}

export interface AppControls<T> {
  openDialog: openDialog<T>;
  update: Update<T>;
  remove: Delete<T> ;
}

export type openDialog<T> = (header:DialogSection<T>, body: DialogSection<T>) => void;
export type Update<T> = (update: (old: T) => T) => void;
export type Delete<T> = (update: (old: T) => boolean) => void;

export interface UIState<T> {
  dialog: DialogParams<T>;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    
    const char = CreateTestCharacter()

    this.state = {
      model: { character: char},
      ui: {
        dialog: {
          isOpen: false,
          body: () => null,
          header: () => null,
          model: char
        },
      },
    };
  }

  updateUI:Update<UIState<Character>> = (map) => {
    this.setState((state) => ({ ...state, ui: map(state.ui) }));
  };

  updateCharacter:Update<Character> = (map) => {
    this.updateModel((model) => ({ ...model, character: map(model.character) }));
  };

  updateModel:Update<ModelState> = (map) => {
    this.setState((state) => ({ ...state, model: map(state.model) }));
  };

  openDialog: openDialog<Character> = (header, body) => {
    this.updateUI((uiState) => ({
      ...uiState,
      dialog: {
        isOpen: true,
        header: header,
        body: body,
        model: this.state.model.character
      },
    }));
  };

  AppControls: AppControls<Character> = {
    openDialog: this.openDialog,
    update: this.updateCharacter,
    remove: () => {}
  };

  WidgetProps: ()=> WidgetProps<Character>  = () => ({
    appControls: this.AppControls,
    state: this.state.model.character,
    editMode: false,
  })

  render() {
    return (
      <div className='App card-columns'>
        {Widget(this.WidgetProps(), AttributeWidgetConstructor)}
        {Widget(this.WidgetProps(), SkillsWidget)}
        {Widget(this.WidgetProps(), BlessingsWidget)}
        <Dialog
          updateUI={this.updateUI}
          appControls={this.AppControls}
          dialogState={this.state.ui.dialog}
        />
      </div>
    );
  }
}

export default App;
