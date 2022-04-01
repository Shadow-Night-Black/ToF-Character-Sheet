export interface Dice {
    name: string;
    size: number;
}

export type DicePool = Dice[];

export function CreateDie(size: number): Dice {
    return { name: `d${size}`, size: size };
}

export function Roll(dice: Dice): number {
    return Math.ceil(Math.random() * dice.size);
}

export function DicePoolToString(pool: DicePool) {
    const combined = pool.reduce((acc, value) => {
        acc.set(value.size, (acc.get(value.size) || 0) + 1);
        return acc;
    }, new Map<number, number>());

    return [...combined].map(([size, number]) => `${number}d${size}`).join(', ');
}

const poolFormat = /(\d*)?d(\d*)/gi;
export function DicePoolFromString(s: string): DicePool[] {
    return s
        .split('+')
        .map((x) =>
            [...x.matchAll(poolFormat)].reduce(
                (acc, [_, size, value]) =>
                    acc.concat(Array<Dice>(parseInt(size ?? 1)).fill(CreateDie(parseInt(value)))),
                [] as DicePool
            )
        );
}

export function RollPool(...dice: DicePool): number {
    return [
        ...dice
            .map(Roll)
            .reduce((acc, value) => {
                acc.set(value, (acc.get(value) || 0) + 1);
                return acc;
            }, new Map<number, number>())
            .entries(),
    ].reduce((total, [roll, amount]) => Math.max(total, roll * amount), 0);
}
