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
import { Dialog } from "./UI/Dialogs/Dialog";
import { CreateTestCharacter, Character } from "./Models/Character";
import { AttributeWidget } from "./UI/Widgets/AttributesWidget";

export interface AppState {
  ui: UiState;
  character: Character;
}

interface UiState {
  dialog: {
    showDialog: boolean;
    onClose: () => void;
    node?: ReactNode;
  };
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      character: CreateTestCharacter(),
      ui: {
        dialog: {
          showDialog: false,
          onClose: () => {},
          node: null,
        },
      },
    };

    this.updateUI = this.updateUI.bind(this);
    this.openDialog = this.openDialog.bind(this);
  }

  updateUI(map: (newUi: UiState) => UiState) {
    this.setState((state) => ({ ...state, ui: map(state.ui) }));
  }

  openDialog(node: ReactNode, onclose?: () => void) {
    this.updateUI((uiState) => ({
      ...uiState,
      dialog: {
        showDialog: true,
        node: node,
        onClose: () => {
          if (onclose) onclose();
          this.updateUI((uiState) => ({
            ...uiState,
            dialog: { showDialog: false, node: null, onClose: () => {} },
          }));
        },
      },
    }));
  }

  render() {
    return (
      <div className="App card-columns">
        <Widget
          header={AttributeWidget(this.state, this.openDialog).header}
          className="attribute-widget"
          body={AttributeWidget(this.state, this.openDialog).body}
        ></Widget>
        <Widget
          header={() => <SkillsWidgetHeader />}
          className="skill-widget"
          body={() => (
            <SkillsWidgetBody
              character={this.state.character}
            ></SkillsWidgetBody>
          )}
        ></Widget>
        <Widget
          className="blessing-widget"
          header={() => (
            <BlessingsWidgetHeader character={this.state.character} />
          )}
          body={() => <BlessingsWidgetBody character={this.state.character} />}
        ></Widget>
        <Dialog
          onClose={this.state.ui.dialog.onClose}
          isOpen={this.state.ui.dialog.showDialog}
        >
          {this.state.ui.dialog.node}
        </Dialog>
      </div>
    );
  }
}

export default App;
