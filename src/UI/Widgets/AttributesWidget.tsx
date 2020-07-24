import { Attribute, GetDefaultAttributes, GetDiceFromAttributeTotal } from "../../Models/Attribute";
import React, { FunctionComponent, ReactElement, Fragment } from "react";
import { Character, GetAttributeSkillTotal, GetAttributeTotal } from "../../Models/Character";
import { Update, openDialog } from "../../App";
import { WidgetConstructor } from "./Widget";
import "./AttributesWidget.css";

type AttributeBodyProps = {
  character: Character;
  editMode: boolean;
  updateCharacter: Update<Character>;
};

type AttributeRowProps = {
  character: Character;
  attribute: Attribute;
  editMode: boolean;
  updateCharacter: Update<Character>;
};

type AttributeHeaderProps = {
  character: Character;
  openDialog: openDialog;
};

export const AttributeWidgetConstructor: WidgetConstructor = ({ appControls, state }) => {
  return {
    header: <WidgetHeader character={state.character} openDialog={appControls.openDialog} />,
    body: <WidgetBody character={state.character} updateCharacter={appControls.update} editMode={false} />,
    className: "attribute-widget",
  };
};

const WidgetHeader: FunctionComponent<AttributeHeaderProps> = ({ openDialog }) => (
  <div className='header'>
    Attributes
    <button
      className='btn-primary btn-sm btn right'
      onClick={() => {
        openDialog((char, update: Update<Character>) => (
          <WidgetBody {...{ editMode: true, character: char, updateCharacter: update }} />
        ));
      }}
    >
      Edit
    </button>
  </div>
);

export const className = "attribute-widget";

export const WidgetBody: FunctionComponent<AttributeBodyProps> = ({ character, editMode, updateCharacter }) => (
  <table className='attribute-grid'>
    <thead className='attribute-header'>
      <tr>
        <th className='attribute-title'> Name </th>
        <th className='attribute-base'> Base </th>
        <th className='attribute-skills'> Skills </th>
        <th className='attribute-total'> Total </th>
        <th className='attribute-dice'> Dice </th>
      </tr>
    </thead>
    <tbody>
      {GetDefaultAttributes().map((attribute) => (
        <AttributeWidgetRow
          updateCharacter={updateCharacter}
          editMode={editMode}
          attribute={attribute}
          character={character}
        />
      ))}
    </tbody>
  </table>
);

const AttributeWidgetRow: FunctionComponent<AttributeRowProps> = ({
  attribute,
  character,
  editMode,
  updateCharacter,
}) => {
  const baseValue = character.attributes.get(attribute);
  let baseAttributeElement: ReactElement;
  if (editMode)
    baseAttributeElement = (
      <input
        type='number'
        defaultValue={baseValue}
        className={`attribute-base`}
        onChange={(event) => {
          const newVal = event.target.valueAsNumber;
          if (!isNaN(newVal))
            updateCharacter((oldChar: Character) => {
              const newAttributes = new Map(oldChar.attributes);
              newAttributes.set(attribute, newVal);
              return { ...oldChar, attributes: newAttributes };
            });
        }}
      />
    );
  else baseAttributeElement = <Fragment> {baseValue} </Fragment>;

  return (
    <tr className='attribute-row'>
      <td className={`attribute-title ${attribute.name}`}>{attribute.name}</td>
      <td className={`attribute-base ${attribute.name}`}> {baseAttributeElement} </td>
      <td className={`attribute-skills ${attribute.name}`}>{GetAttributeSkillTotal(character, attribute)}</td>
      <td className={`attribute-total ${attribute.name}`}>{GetAttributeTotal(character, attribute, true)}</td>
      <td className={`attribute-dice ${attribute.name}`}>
        {GetDiceFromAttributeTotal(GetAttributeTotal(character, attribute, true)).map((d) => d.name)} (
        {GetDiceFromAttributeTotal(GetAttributeTotal(character, attribute, false)).map((d) => d.name)})
      </td>
    </tr>
  );
};
