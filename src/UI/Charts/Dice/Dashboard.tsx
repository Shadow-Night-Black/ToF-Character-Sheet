import { FunctionComponent, useState } from 'react';
import { Scatter, } from 'react-chartjs-2';
import React from 'react';
import { ProbabilitySimulation } from '../Simulations';
import { RollPool, CreateDie, DicePoolToString } from '../../../Models/Dice';
import { ChartOptions, ChartData } from 'chart.js';
//TODO: move to tree shakeable version
import { Chart } from 'chart.js/auto';
import { Dataset } from '../Chart';
import { DicePoolSelector } from './DicePoolSelector';
import Color from 'color';
import './ChartSelector.scss';

export const DiceDashboard: FunctionComponent<{}> = () => {
  const [getPools, updatePools] = useState([[[CreateDie(4)]], [[CreateDie(8)]], [[CreateDie(12)]]])

  const data: ChartData = {
    labels: ['Scatter'],

    datasets: getPools.map((pools, i) =>
      Dataset(
        ProbabilitySimulation(() => pools.reduce((acc, p) => acc + RollPool(...p), 0)),
        {
          label: pools.map(p => DicePoolToString(p)).join(" + "),
          colour: Color('red').rotate((i * 360) / getPools.length)
        }
      )
    )
  };

  const options: ChartOptions = {
    scales: {
      x:
      {
        title: {
          text: "Roll Result",
          display: true
        },
        ticks: {
          stepSize: 3
        },
      },
      y:
      {
        title: {
          text: "P(Result >= X)",
          display: true
        },
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10
        }
      }
    }
  };

  return (
    <div>
      <div className="ChartSelector">
        {getPools.map((pool) => (
          <DicePoolSelector
            updateDicePool={(newValue) => {
              updatePools(getPools.map((x) => (x === pool ? newValue : x)));
            }}
            pool={pool}
          />
        ))}
      </div>
      <div style={{ height: 'calc(100vh - 300px)', width: '80vw' }}>
        <Scatter options={options} data={data} />
      </div>
    </div>
  );
};
