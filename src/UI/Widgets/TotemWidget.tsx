import * as Character from "../../Models/Character";
import React, { FunctionComponent } from "react";
import { WidgetConstructor } from "./Widget";

type BlessingsBodyProps = {
  character: Character.Character;
};
type BlessingsHeaderProps = {
  character: Character.Character;
};

export const BlessingsWidgetConstructor: WidgetConstructor = ({ state }) => ({
  header: <WidgetHeader character={state.character} />,
  body: <WidgetBody character={state.character} />,
  className: "blessing-widget",
});

const WidgetHeader: FunctionComponent<BlessingsHeaderProps> = ({ character }) => (
  <div className={`header`}>
    Totem - {character.totem.fated.name}
    <button className='btn-primary btn-sm btn right'> Edit </button>
  </div>
);

const WidgetBody: FunctionComponent<BlessingsBodyProps> = ({ character }) => (
  <table className='blessing-grid'>
    <thead className='blessing-header'>
      <tr>
        <th className='blessing-name'> Name </th>
        <th className='blessing-fated'> Fated </th>
        <th className='blessing-level'> Level </th>
        <th className='blessing-effect'> Effect </th>
      </tr>
    </thead>
    <tbody>
      {character.totem.blessings.map((b) => (
        <tr className={`blessing-row ${b.fated.attribute.name}`}>
          <td className='blessing-name'> {b.name} </td>
          <td className='blessing-fated'> {b.fated.name} </td>
          <td className='blessing-level'> {b.level} </td>
          <td className='blessing-effect'> {b.effect} </td>
        </tr>
      ))}
    </tbody>
  </table>
);
