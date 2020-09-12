import { FunctionComponent, useState } from 'react';
import { Scatter, ChartData } from 'react-chartjs-2';
import React from 'react';
import { ProbabilitySimulation } from '../Simulations';
import { RollPool, CreateDie,  ToString } from '../../../Models/Dice';
import { ChartOptions } from 'chart.js';
import { Dataset } from '../Chart';
import { DicePoolSelector } from './DicePoolSelector';
import Color from 'color';
import './ChartSelector.scss';

export const DiceDashboard: FunctionComponent<{}> = () => {
  const [pools, updatePools] = useState([[CreateDie(4)], [CreateDie(8)], [CreateDie(12)]])

  const data: ChartData<Chart.ChartData> = {
    labels: ['Scatter'],

    datasets: pools.map((pool, i) =>
      Dataset(
        ProbabilitySimulation(() => RollPool(...pool)),
        {
          label: ToString(pool),
          colour: Color('red').rotate((i * 360) / pools.length)
        }
      )
    )
  };

  const options: ChartOptions = {
    scales: {
      xAxes: [
        {
          scaleLabel: {
            labelString:"Roll Result",
            display:true
          },
          ticks: {
            stepSize: 3
          }
        }
      ],
      yAxes: [
        {
          scaleLabel: {
            labelString:"P(Result >= X)",
            display:true
          },
          ticks: {
            max: 100,
            min: 0,
            stepSize: 10
          }
        }
      ]
    }
  };

  return (
    <div>
      <div className="ChartSelector">
        {pools.map((pool) => (
          <DicePoolSelector
            updateDicePool={(newValue) => {
              updatePools(pools.map((x) => (x === pool ? newValue : x)));
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
