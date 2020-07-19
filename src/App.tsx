import * as Character from "./Models/Character";
import { Widget } from "./UI/Widget";
import { AttributesWidget } from "./UI/AttributesWidget";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const state = {
  character: Character.CreateTestCharacter(),
};

function App() {
  return (
    <div className="App card-deck">
      <Widget header="Attributes" className="attribute-widget">
        <AttributesWidget character={state.character}></AttributesWidget>
      </Widget>
      <Widget header="Attributes">
        <AttributesWidget character={state.character}></AttributesWidget>
      </Widget>
    </div>
  );
}

export default App;
