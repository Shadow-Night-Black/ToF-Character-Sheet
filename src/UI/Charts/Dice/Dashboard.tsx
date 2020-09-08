import { FunctionComponent } from 'react';
import { Scatter, ChartData } from 'react-chartjs-2';
import React from 'react';
import { Simulation, ProbabilitySimulation } from '../Simulations';
import { RollPool, CreateDie } from '../../../Models/Dice';

export const DiceDashboard: FunctionComponent<{}> = () => {
  const data: ChartData<Chart.ChartData> = {
    labels: ['Scatter'],
    datasets: [
      {
        label: '2d12',
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        cubicInterpolationMode: "monotone",
        showLine:true,

        data: ProbabilitySimulation(() => RollPool([CreateDie(12), CreateDie(12)]))
      }
    ]
  };

  return (
    <div>
      <Scatter  data={data} />
    </div>
  );
};
