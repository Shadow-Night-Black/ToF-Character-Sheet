import { Attribute, GetDefaultAttributes, GetDiceFromAttributeTotal } from "../../Models/Attribute";
import React, { FunctionComponent, ReactElement, Fragment } from "react";
import { Character, GetAttributeSkillTotal, GetAttributeTotal } from "../../Models/Character";
import { Update, openDialog } from "../../App";

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

export const AttributeWidgetHeader: FunctionComponent<AttributeHeaderProps> = ({ openDialog }) => (
  <div className='header'>
    Attributes
    <button
      className='btn-primary btn-sm btn right'
      onClick={() => {
        openDialog((char, update: Update<Character>) => (
          <AttributesWidgetBody {...{ editMode: true, character: char, updateCharacter: update }} />
        ));
      }}
    >
      Edit
    </button>
  </div>
);

export const AttributesWidgetBody: FunctionComponent<AttributeBodyProps> = ({
  character,
  editMode,
  updateCharacter,
}) => (
  <div className='attribute-grid'>
    <div className='attribute-header'>
      <div className='attribute-title'> Name </div>
      <div className='attribute-base'> Base </div>
      <div className='attribute-skills'> Skills </div>
      <div className='attribute-total'> Total </div>
      <div className='attribute-dice'> Dice </div>
    </div>
    {GetDefaultAttributes().map((attribute) => (
      <AttributeWidgetRow
        updateCharacter={updateCharacter}
        editMode={editMode}
        attribute={attribute}
        character={character}
      />
    ))}
  </div>
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
    <div className='attribute-row'>
      <div className={`attribute-title ${attribute.name}-Header`}>{attribute.name}</div>
      <div className={`attribute-base ${attribute.name}`}> {baseAttributeElement} </div>
      <div className={`attribute-skills ${attribute.name}`}>{GetAttributeSkillTotal(character, attribute)}</div>
      <div className={`attribute-total ${attribute.name}`}>{GetAttributeTotal(character, attribute, true)}</div>
      <div className={`attribute-dice ${attribute.name}`}>
        {GetDiceFromAttributeTotal(GetAttributeTotal(character, attribute, true)).map((d) => d.name)} (
        {GetDiceFromAttributeTotal(GetAttributeTotal(character, attribute, false)).map((d) => d.name)})
      </div>
    </div>
  );
};
