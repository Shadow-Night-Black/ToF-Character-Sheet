export interface Dice {
  name: string;
  size: number;
}

export type DicePool = Dice[]

export function CreateDie(size: number): Dice {
  return { name: `d${size}`, size: size };
}

export function Roll(dice: Dice): number {
  return Math.ceil(Math.random() * dice.size);
}

export function ToString(pool:DicePool) {
  return `${pool.length}d${pool[0].size}`
}

export function RollPool(...dice: DicePool):number {
  return [
    ...dice
      .map(Roll)
      .reduce((acc, value) => {
        acc.set(value, (acc.get(value) || 0) + 1);
        return acc;
      }, new Map<number, number>())
      .entries()
  ].reduce((total, [roll, amount]) => Math.max(total, roll * amount), 0);
}
