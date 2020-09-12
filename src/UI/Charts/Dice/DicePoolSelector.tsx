import { FunctionComponent } from 'react';
import React from 'react';
import './DicePoolSelector.scss';
import { Dice, CreateDie } from '../../../Models/Dice';

export interface DicePoolSelectorProps {
  updateDicePool: (pool: Dice[]) => void;
  pool: Dice[];
}

export const DicePoolSelector: FunctionComponent<DicePoolSelectorProps> = ({ updateDicePool, pool }) => {
  const update = ({ value = pool[0].size, number = pool.length }) =>
    updateDicePool(Array<Dice>(number).fill(CreateDie(value)));
  return (
    <div className="DicePoolSelector">
      <h5>Line 1</h5>
      <label>Number of Dice</label>
      <input
        type="number"
        max="10"
        defaultValue={pool.length}
        onInput={(e) => {
          if (e.target instanceof HTMLInputElement) update({ number: e.target.valueAsNumber });
        }}
      ></input>
      <label>Dice Size</label>
      <input
        type="number"
        max="20"
        defaultValue={pool[0].size}
        min="2"
        step="2"
        onInput={(e) => {
          if (e.target instanceof HTMLInputElement) update({ value: e.target.valueAsNumber });
        }}
      ></input>
    </div>
  );
};
