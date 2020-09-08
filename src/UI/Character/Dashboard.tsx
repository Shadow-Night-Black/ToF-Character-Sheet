import { Widget, WidgetProps } from './Widgets/Widget';
import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dialog, DialogParams, DialogSection } from './Dialogs/Dialog';
import { CreateTestCharacter, Character } from '../../Models/Character';
import { JsonToCharacter, CharacterToJson } from "../../Models/Helpers/JsonConverter";
import { AttributeWidgetConstructor } from './Widgets/AttributesWidget';
import { SkillsWidget } from './Widgets/SkillsWidget';
import { BlessingsWidget } from './Widgets/TotemWidget';
import { Update } from '../../Models/Interfaces/Lenses';

type AppState = {
  ui: UIState<Character>;
  model: ModelState;
};

export interface ModelState {
  character: Character;
}

export interface AppControls<T> {
  openDialog: openDialog<T>;
  update: Update<T>;
}

export type openDialog<T> = (header: DialogSection<T>, body: DialogSection<T>) => void;
export type SidebarParams = {};

export interface UIState<T> {
  sidebar: SidebarParams;
  dialog: DialogParams<T>;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    const savedData = localStorage.getItem('ToF-Model');
    let model = null;

    try {
      model = savedData ? { character: JsonToCharacter(savedData) } : { character: CreateTestCharacter() };
    } catch (e){
      model = { character: CreateTestCharacter() };
    }

    this.state = {
      model: model,
      ui: {
        sidebar: {},
        dialog: {
          isOpen: false,
          body: () => null,
          header: () => null,
          model: model.character
        }
      }
    };
  }

  updateUI: Update<UIState<Character>> = (map) => {
    this.setState((state) => ({ ...state, ui: map(state.ui) }));
  };

  updateCharacter: Update<Character> = (map) => {
    this.updateModel((model) => ({ ...model, character: map(model.character) }));
  };

  updateModel: Update<ModelState> = (map) => {
    this.setState((state) => {
      const newState: AppState = { ...state, model: map(state.model) };
      localStorage.setItem('ToF-Model', CharacterToJson(newState.model.character));
      return newState;
    });
  };

  openDialog: openDialog<Character> = (header, body) => {
    this.updateUI((uiState) => ({
      ...uiState,
      dialog: {
        isOpen: true,
        header: header,
        body: body,
        model: this.state.model.character
      }
    }));
  };

  AppControls: AppControls<Character> = {
    openDialog: this.openDialog,
    update: this.updateCharacter
  };

  WidgetProps: () => WidgetProps<Character> = () => ({
    appControls: this.AppControls,
    state: this.state.model.character,
    editMode: false
  });

  render() {
    return (
      <Fragment>
        <div className="App card-columns">
          {Widget(this.WidgetProps(), AttributeWidgetConstructor)}
          {Widget(this.WidgetProps(), SkillsWidget)}
          {Widget(this.WidgetProps(), BlessingsWidget)}
          <Dialog updateUI={this.updateUI} appControls={this.AppControls} dialogState={this.state.ui.dialog} />
        </div>
      </Fragment>
    );
  }
}

export default App;
