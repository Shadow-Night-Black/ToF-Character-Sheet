import React, { FunctionComponent, ReactElement, Fragment } from "react";
import { WidgetConstructor, WidgetProps } from "./Widget";
import { Skill, ToDie } from "../../Models/Skill";
import { Character } from "../../Models/Character";
import { AppControls } from "../../App";

export const SkillsWidgetConstructor: WidgetConstructor = (props) => ({
  header: <WidgetHeader {...props} />,
  body: <WidgetBody {...props} />,
  className: "skills-widget",
});

const WidgetHeader: FunctionComponent<WidgetProps> = ({ appControls, state }) => (
  <div className='header'>
    Skills
    <button
      className='btn-primary btn-sm btn right'
      onClick={() => {
        appControls.openDialog((character, updateCharacter) => (
          <WidgetBody
            editMode={true}
            appControls={{ ...appControls, updateCharacter }}
            state={{ ...state, character }}
          />
        ));
      }}
    >
      Edit
    </button>
  </div>
);

const WidgetBody: FunctionComponent<WidgetProps> = ({ state, editMode, appControls }) => {
  return (
    <div className='skill-grid'>
      <div className='skill-header'>
        <div className='skill-name'>Skill Name</div>
        <div className='skill-level'> Level </div>
        <div className='skill-attribute'> Attribute </div>
        <div className='skill-dice'> Dice </div>
      </div>
      {state.character.skills.map((skill) => WidgetBodyRow(skill, editMode, appControls))}
    </div>
  );
};
function WidgetBodyRow(skill: Skill, editMode: boolean, { updateCharacter }: AppControls): JSX.Element {
  const baseValue = skill.level;
  let skillLevelElement: ReactElement;
  if (editMode)
    skillLevelElement = (
      <input
        type='number'
        max={6}
        min={2}
        defaultValue={baseValue}
        className={`skill-level`}
        onChange={(event) => {
          const newVal = event.target.valueAsNumber;
          if (!isNaN(newVal))
            updateCharacter((oldChar: Character) => {
              return { ...oldChar, skills: oldChar.skills.map((s) => (s === skill ? { ...skill, level: newVal } : s)) };
            });
        }}
      />
    );
  else skillLevelElement = <Fragment> {baseValue} </Fragment>;
  return (
    <div className='skill-row'>
      <div className={`skill-name`}> {skill.name} </div>
      <div className={`skill-level`}> {skillLevelElement} </div>
      <div className={`skill-attribute`}> {skill.attribute.name} </div>
      <div className={`skill-dice`}> {ToDie(skill).name} </div>
    </div>
  );
}
