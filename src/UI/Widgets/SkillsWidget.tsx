import React, { FunctionComponent, Fragment } from 'react';
import { WidgetProps, Widget } from './Widget';
import { Skill, ToDie, NewSkill } from '../../Models/Skill';
import { AppControls } from '../../App';
import './SkillsWidget.css';
import { GetDefaultAttributes } from '../../Models/Attribute';
import { Character } from '../../Models/Character';

const WidgetHeader: FunctionComponent<WidgetProps<Character>> = () => {
  return (
    <div className="header">
      <h5 className={'modal-title'}>Skills</h5>
    </div>
  );
};

const WidgetBody: FunctionComponent<WidgetProps<Character>> = ({ state, editMode, appControls }) => {
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
            editMode
              ? EditBodyRow(skill, {
                  ...appControls,
                  openDialog: () => null,
                  remove: (pred) =>
                    appControls.update((old) => ({ ...old, skills: old.skills.filter((s) => !pred(s)) })),
                  update: (map) =>
                    appControls.update((old) => ({
                      ...old,
                      skills: old.skills.map((s) => (s !== skill ? s : map(s)))
                    }))
                })
              : WidgetBodyRow(skill)
          )}
        </tbody>
      </table>
      <div className="skill-add">
        {editMode ? (
          <button
            className="btn btn-sm btn-success"
            onClick={() => {
              appControls.update((old) => ({ ...old, skills: old.skills.concat(NewSkill(state)) }));
            }}
          >
            Add new skill
          </button>
        ) : null}
      </div>
    </Fragment>
  );
};

function EditBodyRow(skill: Skill, { update, remove }: AppControls<Skill>): JSX.Element {
  return (
    <tr className={`skill-row ${skill.attribute.name}`} key={skill.key}>
      <td className={`skill-name`}>
        <input
          className="skill-name-input"
          defaultValue={skill.name}
          onBlur={(e) => {
            const val = e.target.value;
            return update((old) => ({ ...old, name: val }));
          }}
        ></input>{' '}
      </td>
      <td className="skill-level">
        <input
          type="number"
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
      </td>
      <td className={`skill-attribute`}>
        <select
          className="btn"
          defaultValue={skill.attribute.key}
          onChange={(e) => {
            const newval = GetDefaultAttributes().find((a) => a.key === Number(e.target.value));
            if (newval) update((old) => ({ ...old, attribute: newval }));
          }}
        >
          {GetDefaultAttributes().map((a) => (
            <option value={a.key} key={a.key}>
              {a.name}
            </option>
          ))}
        </select>
      </td>
      <td className={`skill-dice`}> {ToDie(skill).name} </td>
      <td className={'skill-delete'}>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm btn"
          onClick={() =>
            remove((old) => {
              return old === skill;
            })
          }
        >
          x
        </button>
      </td>
    </tr>
  );
}
function WidgetBodyRow(skill: Skill): JSX.Element {
  return (
    <tr className={`skill-row ${skill.attribute.name}`} key={skill.key}>
      <td className={`skill-name`}> {skill.name} </td>
      <td className={`skill-level`}> {skill.level} </td>
      <td className={`skill-attribute`}> {skill.attribute.name} </td>
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
