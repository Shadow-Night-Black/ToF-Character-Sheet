import { Widget } from "./UI/Widgets/Widget";
import {
  SkillsWidgetBody,
  SkillsWidgetHeader,
} from "./UI/Widgets/SkillsWidget";
import {
  BlessingsWidgetBody,
  BlessingsWidgetHeader,
} from "./UI/Widgets/TotemWidget";
import React, { ReactNode } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Dialog, DialogState } from "./UI/Dialogs/Dialog";
import { CreateTestCharacter, Character } from "./Models/Character";
import { AttributeWidgetHeader, AttributesWidgetBody } from "./UI/Widgets/AttributesWidget";

export interface AppState {
  ui: UiState;
  character: Character;
}

export type Update<T> = (update:(old: T) => T) => void;

interface UiState {
  dialog: DialogState
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      character: CreateTestCharacter(),
      ui: {
        dialog: {
          isOpen: false,
          close: () => {},
          node: () => null,
        },
      },
    };

    this.updateUI = this.updateUI.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.updateCharacter = this.updateCharacter.bind(this)
  }

  updateUI(map: (newUi: UiState) => UiState) {
    this.setState((state) => ({ ...state, ui: map(state.ui) }));
  }

  updateCharacter(map: (newCharacter: Character) => Character) {
    this.setState((state) => ({ ...state, character: map(state.character) }));
  }

  openDialog(node: (char:Character) => ReactNode, oncloseCallback?: () => void) {
    this.updateUI((uiState) => ({
      ...uiState,
      dialog: {
        isOpen: true,
        node: node,
        close: () => {
          if (oncloseCallback) oncloseCallback();
          this.updateUI((uiState) => ({
            ...uiState,
            dialog: { isOpen: false, node: () => null, close: () => {} },
          }));
        },
      },
    }));
  }

  render() {
    return (
      <div className="App card-columns">
        <Widget
          header={
            <AttributeWidgetHeader
              character={this.state.character}
              openDialog={this.openDialog}
              updateCharacter={this.updateCharacter}
            />
          }
          className="attribute-widget"
          body={<AttributesWidgetBody updateCharacter={this.updateCharacter} editMode={false} character={this.state.character} />}
        ></Widget>
        <Widget
          header={<SkillsWidgetHeader />}
          className="skill-widget"
          body={
            <SkillsWidgetBody
              character={this.state.character}
            ></SkillsWidgetBody>
          }
        ></Widget>
        <Widget
          className="blessing-widget"
          header={<BlessingsWidgetHeader character={this.state.character} />}
          body={<BlessingsWidgetBody character={this.state.character} />}
        ></Widget>
        <Dialog
        character={this.state.character}
        dialogState={this.state.ui.dialog}
        />
      </div>
    );
  }
}

export default App;
