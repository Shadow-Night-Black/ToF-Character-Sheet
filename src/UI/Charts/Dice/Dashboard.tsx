import { FunctionComponent, useState } from 'react';
import { Scatter, ChartData } from 'react-chartjs-2';
import React from 'react';
import { ProbabilitySimulation } from '../Simulations';
import { RollPool, CreateDie, Dice, ToString } from '../../../Models/Dice';
import { ChartOptions } from 'chart.js';
import { Colour } from '../Colours';
import { Dataset } from '../Chart';
import { DicePoolSelector } from './DicePoolSelector';
import './ChartSelector.scss';

export const DiceDashboard: FunctionComponent<{}> = () => {
  const redPool = useState([CreateDie(12), CreateDie(12)]);
  const greenPool = useState(Array<Dice>(3).fill(CreateDie(8)));
  const bluePool = useState(Array<Dice>(5).fill(CreateDie(6)));

  const pools = [redPool, greenPool, bluePool];

  const data: ChartData<Chart.ChartData> = {
    labels: ['Scatter'],

    datasets: pools.map(([pool], i) =>
      Dataset(
        ProbabilitySimulation(() => RollPool(...pool)),
        {
          label: ToString(pool),
          colour: Object.values(Colour)[i]
        }
      )
    )
  };

  const options: ChartOptions = {
    scales: {
      xAxes: [
        {
          ticks: {
            stepSize: 3
          }
        }
      ],
      yAxes: [
        {
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
        {pools.map(([pool, update]) => (
          <DicePoolSelector updateDicePool={update} pool={pool} />
        ))}
      </div>
      <div style={{height:"calc(100vh - 300px)", width:"80vw"}}>
        <Scatter options={options} data={data} />
      </div>
    </div>
  );
};
