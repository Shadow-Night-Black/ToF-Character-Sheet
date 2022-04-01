import { ChartPoint } from 'chart.js';

export function Simulation(method: () => number, numberOfSimulation = 10000): ChartPoint[] {
    const results = simulate(numberOfSimulation, method);
    return ToChartData(results).map((p) => ({ x: p.x, y: (100 * p.y) / numberOfSimulation }));
}

export function ProbabilitySimulation(method: () => number, numberOfSimulation = 10000): ChartPoint[] {
    const results = simulate(numberOfSimulation, method);
    return ToChartData(results)
        .reduceRight(
            (acc, value) => {
                acc.push({ x: value.x, y: value.y + acc[acc.length - 1].y });
                return acc;
            },
            [{ x: 0, y: 0 }]
        )
        .map((p) => ({ x: p.x, y: (100 * p.y) / numberOfSimulation }))
        .slice(1);
}

function simulate(numberOfSimulation: number, method: () => number) {
    const results = new Map<number, number>();
    for (let index = 0; index < numberOfSimulation; index++) {
        const result = method();
        results.set(result, (results.get(result) ?? 0) + 1);
    }
    return results;
}

function ToChartData(results: Map<number, number>) {
    return [...results.entries()].map(([value, freq]) => ({ x: value, y: freq })).sort((a, b) => a.x - b.x);
}
