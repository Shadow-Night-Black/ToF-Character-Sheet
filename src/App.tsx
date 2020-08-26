import { Widget, WidgetProps } from './UI/Widgets/Widget';
import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { Dialog, DialogParams, DialogSection } from './UI/Dialogs/Dialog';
import { CreateTestCharacter, Character, JsonToCharacter, CharacterToJson } from './Models/Character';
import { AttributeWidgetConstructor } from './UI/Widgets/AttributesWidget';
import { SkillsWidget } from './UI/Widgets/SkillsWidget';
import { BlessingsWidget } from './UI/Widgets/TotemWidget';
import { Sidebar } from './UI/Controls/Sidebar';
import { Update } from './UI/Interfaces/Lenses';

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
    } catch {
      if (!model) model = { character: CreateTestCharacter() };
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
        <Sidebar {...this.state.ui.sidebar}></Sidebar>
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
