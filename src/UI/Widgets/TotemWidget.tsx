import React, { FunctionComponent, Fragment } from 'react';
import { Widget, WidgetProps } from './Widget';
import { Character } from '../../Models/Character';
import { Blessing, GetDefaultBlessings } from '../../Models/Blessings';
import { Update } from '../../App';
import { Totem } from '../../Models/Totem';

const WidgetHeader: FunctionComponent<WidgetProps<Character>> = ({ state }) => (
  <div className={`header`}>
    <h5 className={'modal-title'}>
      {`Totem ${state.totem.fated.length > 0 ? ` - ${state.totem.fated.map((x) => x.name).join('/')}` : ''}`}
    </h5>
  </div>
);

const WidgetBody: FunctionComponent<WidgetProps<Character>> = ({ state, editMode, appControls: { update } }) => {
  const updateTotem:Update<Totem> = (t) => update((old) => ({ ...old, totem: t(old.totem) }));
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
        editMode
          ? EditBlessingsRow(b, state, updateTotem)
          : DisplayBlessingsRow(b)
      )}
    </tbody>
  </table> 
  <div className="blessing-add">
        {editMode ? (
          <button
            className="btn btn-sm btn-success"
            onClick={() => {
              updateTotem((old) => ({...old, blessings:old.blessings.concat(GetDefaultBlessings().filter(x => state.totem.fated.includes(x.fated) && !state.totem.blessings.includes(x))[0])}))
            }}
          >
            Add new blessing
          </button>
        ) : null}
      </div>
     </Fragment>
);}

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
          onChange={(e) => {
            const newKey = Number.parseInt(e.target.value);
            console.log(newKey);
            updateBlessings(() => {
              return GetDefaultBlessings().find((x) => x.key === newKey)!;
            });
          }}
        >
          {GetDefaultBlessings()
            .filter((x) => (char.totem.fated.includes(x.fated) && !char.totem.blessings.includes(x)) || x === blessing)
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
