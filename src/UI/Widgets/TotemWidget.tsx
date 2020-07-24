import * as Character from "../../Models/Character";
import React, { FunctionComponent } from "react";
import { WidgetConstructor } from "./Widget";

type BlessingsBodyProps = {
  character: Character.Character;
};
type BlessingsHeaderProps = {
  character: Character.Character;
};

export const BlessingsWidgetConstructor:WidgetConstructor = ({state}) => 
({
  header: <WidgetHeader character={state.character} />,
  body: <WidgetBody character={state.character} />,
  className: "blessing-widget"
})


const WidgetHeader: FunctionComponent<BlessingsHeaderProps> = ({
  character,
}) => (
  <div className={`header`}>
    Totem - {character.totem.fated.name}
    <button className="btn-primary btn-sm btn right"> Edit </button>
  </div>
);

const WidgetBody: FunctionComponent<BlessingsBodyProps> = ({
  character,
}) => (
  <div className="blessing-grid">
    <div className="blessing-header">
      <div className="blessing-name"> Name </div>
      <div className="blessing-fated"> Fated </div>
      <div className="blessing-level"> Level </div>
      <div className="blessing-effect"> Effect </div>
    </div>
    {character.totem.blessings.map((b) => (
      <div className={`blessing-row ${b.fated.attribute.name}`}>
        <div className="blessing-name"> {b.name} </div>
        <div className="blessing-fated"> {b.fated.name} </div>
        <div className="blessing-level"> {b.level} </div>
        <div className="blessing-effect"> {b.effect} </div>
      </div>
    ))}
  </div>
);
