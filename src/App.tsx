import * as Character from "./Models/Character";
import { Widget } from "./UI/Widget";
import {
  AttributesWidgetBody,
  AttributeWidgetHeader,
} from "./UI/AttributesWidget";
import { SkillsWidgetBody, SkillsWidgetHeader } from "./UI/SkillsWidget";
import {
  BlessingsWidgetBody,
  BlessingsWidgetHeader,
} from "./UI/TotemWidget";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const state = {
  character: Character.CreateTestCharacter(),
};

function App() {
  return (
    <div className="App card-deck">
      <Widget
        header={() => <AttributeWidgetHeader />}
        className="attribute-widget"
        body={() => (
          <AttributesWidgetBody
            character={state.character}
          ></AttributesWidgetBody>
        )}
      ></Widget>
      <Widget
        header={() => <SkillsWidgetHeader />}
        body={() => (
          <SkillsWidgetBody character={state.character}></SkillsWidgetBody>
        )}
      ></Widget>
      <Widget
        className= "blessing-widget"
        header={() => <BlessingsWidgetHeader character={state.character}/>}
        body={() => <BlessingsWidgetBody character={state.character} />}
      ></Widget>
    </div>
  );
}

export default App;
