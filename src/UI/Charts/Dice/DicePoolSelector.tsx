import { FunctionComponent } from 'react';
import React from 'react';
import './DicePoolSelector.scss';
import { DicePoolToString, DicePoolFromString, DicePool } from '../../../Models/Dice';

export interface DicePoolSelectorProps {
  updateDicePool: (pool: DicePool[]) => void;
  pool: DicePool[];
}

export const DicePoolSelector: FunctionComponent<DicePoolSelectorProps> = ({ updateDicePool, pool }) => {
  return (
    <div className="DicePoolSelector">
      <h5>Line 1</h5>
      <label>Dice Pool</label>
      <input
        defaultValue={pool.map(p => DicePoolToString(p)).join(" + ")}
        onInput={(e) => {
          if (e.target instanceof HTMLInputElement) updateDicePool(DicePoolFromString(e.target.value));
        }}
      ></input>
    </div>
  );
};
