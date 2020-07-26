import React, { FunctionComponent } from "react";
import { Widget, WidgetProps } from "./Widget";
import { Character } from "../../Models/Character";


const WidgetHeader: FunctionComponent<WidgetProps<Character>> = ({state}) => (
  <div className={`header`}>
    <h5 className={"modal-title"}>
    Totem - {state.totem.fated.name}
    </h5>
  </div>
);

const WidgetBody: FunctionComponent<WidgetProps<Character>> = ({ state }) => (
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
      {state.totem.blessings.map((b) => (
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

export const BlessingsWidgetConstructor: Widget<Character> = {
  header: WidgetHeader,
  body: WidgetBody,
  className: "blessing-widget",
};
