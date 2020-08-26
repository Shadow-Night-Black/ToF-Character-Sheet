import { Attribute, GetDefaultAttributes, GetDiceFromAttributeTotal } from "../../Models/Attribute";
import React, { FunctionComponent, ReactElement, Fragment } from "react";
import { Character, GetAttributeSkillTotal, GetAttributeTotal } from "../../Models/Character";
import { Update } from "../Interfaces/Lenses";
import "./AttributesWidget.css";
import { Widget, WidgetProps } from "./Widget";


type AttributeRowProps = {
  character: Character;
  attribute: Attribute;
  editMode: boolean;
  updateCharacter: Update<Character>;
};

const WidgetHeader: FunctionComponent<{}> = () => (
    <h5 className={"modal-title"}>Attributes</h5>
);

export const className = "attribute-widget";

export const WidgetBody: FunctionComponent<WidgetProps<Character>> = ({ state, appControls: {update}, editMode }) => (
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
          updateCharacter={update}
          editMode={editMode}
          attribute={attribute}
          character={state}
          key={attribute.key}
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

export const AttributeWidgetConstructor: Widget<Character> = {
    header: WidgetHeader ,
    body: WidgetBody,
    className: "attribute-widget",
  };