import { ChartPoint } from 'chart.js';

export function Simulation(method: () => number, numberOfSimulation = 10000): ChartPoint[] {
  const results = simulate(numberOfSimulation, method);
  return ToChartData(results).map((p) => ({ x: p.x, y: (100 * p.y) / numberOfSimulation }));
}

export function ProbabilitySimulation(method: () => number, numberOfSimulation = 10000): ChartPoint[] {
  const results = simulate(numberOfSimulation, method);
  return ToChartData(results)
    .reduce(
      (acc, value, index) => {
        acc.push({ x: value.x, y: value.y + acc[index].y });
        return acc;
      },
      [{ x: 0, y: 1 }]
    )
    .map((p) => ({ x: p.x, y:100 - (100 * p.y) / numberOfSimulation }));
}

function simulate(numberOfSimulation: number, method: () => number) {
  const results = new Map<number, number>();
  for (let index = 0; index < numberOfSimulation; index++) {
    const r = method();
    results.set(r, (results.get(r) || 0) + 1);
  }
  return results;
}

// function ToFrequency(results: number[]) {
//   return results.reduce((acc, value) => {
//     acc.set(value, (acc.get(value) || 0) + 1);
//     return acc;
//   }, new Map<number, number>());
// }

function ToChartData(results: Map<number, number>) {
  return [...results.entries()].map(([value, freq]) => ({ x: value, y: freq })).sort((a, b) => a.x - b.x);
}
