import React, { FunctionComponent, Fragment } from 'react';
import { WidgetProps, Widget } from './Widget';
import { Skill, ToDie, NewSkill, MaxSkillLevel, MinSkillLevel, SkillValidator } from '../../../Models/Skill';
import './SkillsWidget.css';
import { Attribute } from '../../../Models/Attribute';
import { Character, UpdateSkillList, GetAttributes } from '../../../Models/Character';
import { ListAccessors, GetCollectionLens } from '../../../Models/Interfaces/Lenses';

const WidgetHeader: FunctionComponent<WidgetProps<Character>> = () => {
  return (
    <div className="header">
      <h5 className={'modal-title'}>Skills</h5>
    </div>
  );
};

const WidgetBody: FunctionComponent<WidgetProps<Character>> = ({ state, editMode, appControls: { update } }) => {
  const skillLens = GetCollectionLens(UpdateSkillList, update);
  return (
    <Fragment>
      <table className="skill-grid table-condensed">
        <thead className="skill-header">
          <tr>
            <th className="skill-name">Skill Name</th>
            <th className="skill-level"> Level </th>
            <th className="skill-attribute"> Attribute </th>
            <th className="skill-dice"> Dice </th>
            <th className={'skill-delete'}> </th>
          </tr>
        </thead>
        <tbody>
          {state.skills.map((skill) =>
            editMode ? EditBodyRow(skill, skillLens, GetAttributes(state)) : WidgetBodyRow(skill)
          )}
        </tbody>
      </table>
        {editMode ? (
      <div className="skill-add">
          <button className="btn btn-sm btn-success" onClick={() => skillLens.add(NewSkill(state))}>
            Add new skill
          </button>
      </div>
        ) : null}
    </Fragment>
  );
};

function EditBodyRow(skill: Skill, { update, remove }: ListAccessors<Skill>, attributes: Attribute[]): JSX.Element {
  const updateSkill = (newValues: Partial<Skill>) => {
    const newSkill = { ...skill, ...newValues }
    if (SkillValidator(newSkill))
      update(skill, newSkill)
  }

  return (
    <tr className={`skill-row`} key={skill.id}>
      <td className={`skill-name`}>
        <input
          className="skill-name-input"
          defaultValue={skill.name}
          onBlur={(e) => {
            const val = e.target.value;
            return updateSkill({ name: val });
          }}
        ></input>{' '}
      </td>
      {attributes.map(a => {
        return <td className="skill-level">
          <input
            type="number"
            max={MaxSkillLevel}
            min={MinSkillLevel}
            defaultValue={skill.attributeLevel(a)}
            className={`skill-level`}
            onChange={(event) => {
              const newVal = event.target.valueAsNumber;
              const newLevels = new Map(skill.levels)
              newLevels.set(a.id, newVal)
              updateSkill({ levels: newLevels});
            }}
          />
        </td>
      })}
      <td className={`skill-dice`}> {ToDie(skill).name} </td>
      <td className={'skill-delete'}>
        <button type="button" className="btn btn-outline-danger btn-sm btn" onClick={() => remove(skill)}>
          x
        </button>
      </td>
    </tr>
  );
}
function WidgetBodyRow(skill: Skill): JSX.Element {
  return (
    <tr className={`skill-row `} key={skill.id}>
      <td className={`skill-name`}> {skill.name} </td>
      <td className={`skill-level`}> {skill.totalLevel} </td>
      <td className={`skill-dice`}> {ToDie(skill).name} </td>
      <td className={'skill-delete'}> </td>
    </tr>
  );
}

export const SkillsWidget: Widget<Character> = {
  header: WidgetHeader,
  body: WidgetBody,
  className: 'skill-widget'
};
