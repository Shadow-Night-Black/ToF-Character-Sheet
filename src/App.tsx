import { Widget } from "./UI/Widgets/Widget";
import { SkillsWidgetBody, SkillsWidgetHeader } from "./UI/Widgets/SkillsWidget";
import { BlessingsWidgetBody, BlessingsWidgetHeader } from "./UI/Widgets/TotemWidget";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Dialog, DialogParams, DialogBody } from "./UI/Dialogs/Dialog";
import { CreateTestCharacter, Character } from "./Models/Character";
import { AttributeWidgetHeader, AttributesWidgetBody } from "./UI/Widgets/AttributesWidget";

export interface AppState {
  ui: UIState;
  character: Character;
}

export type Update<T> = (update: (old: T) => T) => void;

export type openDialog = (node: DialogBody, oncloseCallback?: () => void) => void;

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

  render() {
    return (
      <div className='App card-columns'>
        <Widget
          header={<AttributeWidgetHeader character={this.state.character} openDialog={this.openDialog} />}
          className='attribute-widget'
          body={
            <AttributesWidgetBody
              updateCharacter={this.updateCharacter}
              editMode={false}
              character={this.state.character}
            />
          }
        ></Widget>
        <Widget
          header={<SkillsWidgetHeader />}
          className='skill-widget'
          body={<SkillsWidgetBody character={this.state.character}></SkillsWidgetBody>}
        ></Widget>
        <Widget
          className='blessing-widget'
          header={<BlessingsWidgetHeader character={this.state.character} />}
          body={<BlessingsWidgetBody character={this.state.character} />}
        ></Widget>
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
