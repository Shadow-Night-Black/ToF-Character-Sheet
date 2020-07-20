import * as Character from "../Models/Character";
import React, { FunctionComponent } from "react";

type BlessingsBodyProps = {
  character: Character.Model;
};
type BlessingsHeaderProps = {
  character: Character.Model;
};

export const BlessingsWidgetHeader: FunctionComponent<BlessingsHeaderProps> = ({
  character,
}) => (
  <div className={`header ${character.totem.fated.attribute.name}`}>
    Totem - {character.totem.fated.name}
    <button className="btn-primary btn-sm btn right"> Edit </button>
  </div>
);

export const BlessingsWidgetBody: FunctionComponent<BlessingsBodyProps> = ({
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
      <div className="blessing-row">
        <div className="blessing-name"> {b.name} </div>
        <div className="blessing-fated"> {b.fated.name} </div>
        <div className="blessing-level"> {b.level} </div>
        <div className="blessing-effect"> {b.effect} </div>
      </div>
    ))}
  </div>
);
