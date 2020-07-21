import * as Character from "../../Models/Character";
import * as Attribute from "../../Models/Attribute";
import React, { FunctionComponent, ReactNode } from "react";
import { Widget } from "./Widget";
import { AppState } from "../../App";

type AttributeProps = {
  character: Character.Character;

};

type AttributeHeaderProps = {
  character: Character.Character;
  openDialog: (node:ReactNode) => void;
}

export function AttributeWidget(state:AppState, openDialog:(node:ReactNode) => void):Widget {
  return { body: () => (<AttributesWidgetBody character={state.character}/>),
  header: () => (<AttributeWidgetHeader character={state.character} openDialog={openDialog}/>),
  className: "attributes-widget"

  }
}

const AttributeWidgetHeader: FunctionComponent<AttributeHeaderProps> = ({openDialog, character}) => (
  <div className="header">
    Attributes
    <button className="btn-primary btn-sm btn right" onClick={() => {openDialog(<AttributesWidgetBody character={character} />)}}> Edit </button>
  </div>
);

const AttributesWidgetBody: FunctionComponent<AttributeProps> = ({
  character,
}) => (
  <div className="attribute-grid">
    <div className="attribute-header">
      <div className="attribute-title"> Name </div>
      <div className="attribute-base"> Base </div>
      <div className="attribute-skills"> Skills </div>
      <div className="attribute-total"> Total </div>
      <div className="attribute-dice"> Dice </div>
    </div>
    {[...character.attributes].map(([attribute, base]) => (
      <div className="attribute-row">
        <div className={`attribute-title ${attribute.name}-Header`}>
          {attribute.name}
        </div>
        <div className={`attribute-base ${attribute.name}`}> {base} </div>
        <div className={`attribute-skills ${attribute.name}`}>
          {Character.GetAttributeSkillTotal(character, attribute)}
        </div>
        <div className={`attribute-total ${attribute.name}`}>
          {Character.GetAttributeTotal(character, attribute, true)}
        </div>
        <div className={`attribute-dice ${attribute.name}`}>
          {Attribute.GetDiceFromAttributeTotal(
            Character.GetAttributeTotal(character, attribute, true)
          ).map((d) => d.name)}{" "}
          (
          {Attribute.GetDiceFromAttributeTotal(
            Character.GetAttributeTotal(character, attribute, false)
          ).map((d) => d.name)}
          )
        </div>
      </div>
    ))}
  </div>
);
