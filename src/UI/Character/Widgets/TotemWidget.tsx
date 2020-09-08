import React, { FunctionComponent, Fragment } from 'react';
import { Widget, WidgetProps } from './Widget';
import { Character } from '../../../Models/Character';
import { Blessing, GetDefaultBlessings } from '../../../Models/Blessings';
import { Update, GetCollectionLens } from '../../../Models/Interfaces/Lenses';
import { Totem, UpdateFatedList } from '../../../Models/Totem';
import { RemoveOption, BuildOption } from '../../Controls/Dropdown';

import './TotemWidget.scss'

const WidgetHeader: FunctionComponent<WidgetProps<Character>> = ({
  state: { totem },
  editMode,
  appControls: { update }
}) => {
  const updateTotem: Update<Totem> = (t) => update((old) => ({ ...old, totem: t(old.totem) }));
  const fatedLens = GetCollectionLens(UpdateFatedList, updateTotem);
  const fatedDisplay = editMode
    ? totem.fated
        .filter((f) => f.selected)
        .map((fated) => {
          return (
            <select
              className="btn"
              key={fated.key}
              defaultValue={fated.key}
              onChange={({ target: { value } }) => {
                const newKey = Number.parseInt(value);
                const newFated = totem.fated.find((fated) => fated.key === newKey);
                fatedLens.update(fated, { ...fated, nexusBonus: false, selected: false });
                if (newFated) fatedLens.update(newFated, { ...newFated, selected: true });
              }}
            >
              {totem.fated
                .filter((f) => !f.selected || f === fated)
                .map(BuildOption)
                .concat(RemoveOption)}
            </select>
          );
        })
    : totem.fated
        .filter((f) => f.selected)
        .map((fated) => fated.name)
        .join('/');

  const addButton =
    editMode && totem.fated.filter((f) => f.selected).length < 3 ? (
      <button
        className="btn btn-sm btn-success"
        onClick={() => {
          const newFated = totem.fated.filter((x) => !x.selected)[0];
          fatedLens.update(newFated, { ...newFated, selected: true });
        }}
      >
        +
      </button>
    ) : null;

  return (
    <div className={`header`}>
      <h5 className={'modal-title'}>
        {`Totem ${totem.fated.length > 0 ? ` - ` : ''}`}
        {fatedDisplay}
        {addButton}
      </h5>
    </div>
  );
};

const WidgetBody: FunctionComponent<WidgetProps<Character>> = ({ state, editMode, appControls: { update } }) => {
  const updateTotem: Update<Totem> = (t) => update((old) => ({ ...old, totem: t(old.totem) }));
  return (
    <Fragment>
      <table className="blessing-grid">
        <thead className="blessing-header">
          <tr>
            <th className="blessing-name"> Name </th>
            <th className="blessing-fated"> Fated </th>
            <th className="blessing-level"> Level </th>
            <th className="blessing-effect"> Effect </th>
          </tr>
        </thead>
        <tbody>
          {state.totem.blessings.map((b) =>
            editMode ? EditBlessingsRow(b, state, updateTotem) : DisplayBlessingsRow(b)
          )}
        </tbody>
      </table>
      <div className="blessing-add">
        {editMode ? (
          <button
            className="btn btn-sm btn-success"
            onClick={() => {
              updateTotem((old) => ({
                ...old,
                blessings: old.blessings.concat(
                  GetDefaultBlessings().filter(
                    (x) =>
                      state.totem.fated.map((x) => x.key).includes(x.fated.key) &&
                      !state.totem.blessings.map((x) => x.key).includes(x.key)
                  )[0]
                )
              }));
            }}
          >
            Add new blessing
          </button>
        ) : null}
      </div>
    </Fragment>
  );
};

function EditBlessingsRow(blessing: Blessing, char: Character, updateTotem: Update<Totem>): JSX.Element {
  const updateBlessings: Update<Blessing> = (b) =>
    updateTotem((old) => ({ ...old, blessings: old.blessings.map((x) => (blessing.key === x.key ? b(x) : x)) }));
  const removeBlessing = () =>
    updateTotem((old) => ({ ...old, blessings: old.blessings.filter((x) => x.key !== blessing.key) }));
  return (
    <tr key={blessing.key} className={`blessing-row ${blessing.fated.attribute.name}`}>
      <td className="blessing-name">
        <select
          defaultValue={blessing.key}
          className="btn"
          onChange={(e) => {
            const newKey = Number.parseInt(e.target.value);
            console.log(newKey);
            updateBlessings(() => {
              return GetDefaultBlessings().find((x) => x.key === newKey)!;
            });
          }}
        >
          {GetDefaultBlessings()
            .filter(
              (x) =>
                (char.totem.fated.map((x) => x.key).includes(x.fated.key) &&
                  !char.totem.blessings.map((x) => x.key).includes(x.key)) ||
                x.key === blessing.key
            )
            .map((b) => (
              <option value={b.key} key={b.key}>
                {b.name}
              </option>
            ))}{' '}
        </select>{' '}
      </td>
      <td className="blessing-fated"> {blessing.fated.name} </td>
      <td className="blessing-level"> {blessing.level} </td>
      <td className="blessing-effect"> {blessing.effect} </td>
      <td className={'blessing-delete'}>
        <button type="button" className="btn btn-outline-danger btn-sm btn" onClick={removeBlessing}>
          x
        </button>
      </td>
    </tr>
  );
}

function DisplayBlessingsRow(b: Blessing): JSX.Element {
  return (
    <tr key={b.key} className={`blessing-row ${b.fated.attribute.name}`}>
      <td className="blessing-name"> {b.name} </td>
      <td className="blessing-fated"> {b.fated.name} </td>
      <td className="blessing-level"> {b.level} </td>
      <td className="blessing-effect"> {b.effect} </td>
    </tr>
  );
}

export const BlessingsWidget: Widget<Character> = {
  header: WidgetHeader,
  body: WidgetBody,
  className: 'blessing-widget'
};
