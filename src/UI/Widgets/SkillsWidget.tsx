import React, { FunctionComponent } from "react";
import { WidgetConstructor, WidgetProps } from "./Widget";
import { Skill, ToDie, NewSkill } from "../../Models/Skill";
import { AppControls } from "../../App";
import "./SkillsWidget.css";

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
            appControls={{ ...appControls, update: updateCharacter }}
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
        <div className={"skill-delete"}> </div>
      </div>
      {state.character.skills.map((skill) =>
        editMode
          ? EditBodyRow(skill, {
              ...appControls,
              remove: (pred) => appControls.update((old) => ({ ...old, skills: old.skills.filter((s) => !pred(s)) })),
              update: (map) =>
                appControls.update((old) => ({ ...old, skills: old.skills.map((s) => (s !== skill ? s : map(s))) })),
            })
          : WidgetBodyRow(skill)
      )}
      <div className='skill-add'>
        {editMode ? (
          <button
            className='btn btn-sm btn-success'
            onClick={() => {
              appControls.update((old) => ({ ...old, skills: old.skills.concat(NewSkill(state.character)) }));
            }}
          >
            Add new skill
          </button>
        ) : (
          null
        )}
      </div>
    </div>
  );
};

function EditBodyRow(skill: Skill, { update, remove }: AppControls<Skill>): JSX.Element {
  return (
    <div className='skill-row' key={skill.key}>
      <div className={`skill-name`}>
        {" "}
        <input
          className='skill-name-input'
          defaultValue={skill.name}
          onBlur={(e) => {
            const val = e.target.value;
            return update((old) => ({ ...old, name: val }));
          }}
        ></input>{" "}
      </div>
      <div className='skill-level'>
        <input
          type='number'
          max={6}
          min={2}
          defaultValue={skill.level}
          className={`skill-level`}
          onChange={(event) => {
            const newVal = event.target.valueAsNumber;
            if (!isNaN(newVal))
              update((old) => {
                return { ...old, level: newVal };
              });
          }}
        />
      </div>
      <div className={`skill-attribute`}> {skill.attribute.name} </div>
      <div className={`skill-dice`}> {ToDie(skill).name} </div>
      <div className={"skill-delete"}>
        <button
          type='button'
          className='btn btn-outline-danger btn-sm btn right'
          onClick={() => remove((old) =>{return old === skill})}
        >
          x
        </button>
      </div>
    </div>
  );
}
function WidgetBodyRow(skill: Skill): JSX.Element {
  return (
    <div className='skill-row' key={skill.key}>
      <div className={`skill-name`}> {skill.name} </div>
      <div className={`skill-level`}> {skill.level} </div>
      <div className={`skill-attribute`}> {skill.attribute.name} </div>
      <div className={`skill-dice`}> {ToDie(skill).name} </div>
      <div className={"skill-delete"}> </div>
    </div>
  );
}
