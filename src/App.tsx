import { Widget } from "./UI/Widgets/Widget";
import {
  AttributesWidgetBody,
  AttributeWidgetHeader,
} from "./UI/Widgets/AttributesWidget";
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

interface state {
  ui: uiState;
  character: Character;
}

interface uiState {
  dialog: {
    showDialog: boolean;
    onClose: () => void;
    node?: ReactNode;
  };
}

class App extends React.Component<{}, state> {
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
    this.showDialog = this.showDialog.bind(this);
  }

  updateUI(map: (newUi: uiState) => uiState) {
    this.setState((state) => ({ ...state, ui: map(state.ui) }));
  }

  showDialog(node: ReactNode, onclose?: () => void) {
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
          header={() => (
            <AttributeWidgetHeader
              openDialog={this.showDialog}
              character={this.state.character}
            />
          )}
          className="attribute-widget"
          body={() => (
            <AttributesWidgetBody
              character={this.state.character}
            ></AttributesWidgetBody>
          )}
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
          <div>
            <h3>Test!</h3>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default App;
