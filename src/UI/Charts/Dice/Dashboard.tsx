import { FunctionComponent, useState } from 'react';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    ArcElement,
    LineElement,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import React from 'react';
import { ProbabilitySimulation } from '../Simulations';
import { RollPool, CreateDie, DicePoolToString } from '../../../Models/Dice';
import { Dataset } from '../Chart';
import { DicePoolSelector } from './DicePoolSelector';
import Color from 'color';
import './ChartSelector.scss';
import { ErrorBoundary } from '../../ErrorHandling/ErrorHandling';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, ArcElement)

export const DiceDashboard: FunctionComponent<{}> = () => {
    const [getPools, updatePools] = useState([[[CreateDie(4)]], [[CreateDie(8)]], [[CreateDie(12)]]]);

    const data = {
        labels: ['Scatter'],

        datasets: getPools.map((pools, i) =>
            Dataset(
                ProbabilitySimulation(() => pools.reduce((acc, p) => acc + RollPool(...p), 0)),
                {
                    label: pools.map((p) => DicePoolToString(p)).join(' + '),
                    colour: Color('red').rotate((i * 360) / getPools.length),
                }
            )
        ),
    };

    const options:Parameters<typeof Scatter>[0]["options"] = {
        showLine: true,
        scales: {
            x: {
                title: {
                    text: 'Roll Result',
                    display: true,
                },
                ticks: {
                    stepSize: 3,
                },
            },
            y: {
                title: {
                    text: 'P(Result >= X)',
                    display: true,
                },
                min: 0,
                max: 100,
                ticks: {
                    stepSize: 10,
                },
            },
        },
    };

    return (
        <div>
            <div className="ChartSelector">
                {getPools.map((pool, i) => (
                    <DicePoolSelector
                        key={i}
                        updateDicePool={(newValue) => {
                            updatePools(getPools.map((x) => (x === pool ? newValue : x)));
                        }}
                        pool={pool}
                    />
                ))}
            </div>
            <div style={{ height: 'calc(100vh - 300px)', width: '80vw' }}>
                <ErrorBoundary>
                    <Scatter options={options} data={data} />
                </ErrorBoundary>
            </div>
        </div>
    );
};
