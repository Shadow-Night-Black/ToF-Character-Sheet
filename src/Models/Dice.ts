export interface Dice {
  name: string;
  size: number;
}

export function CreateDie(size: number): Dice {
  return { name:`d${size}`, size: size };
}

export function Roll(dice: Dice): number {
  return Math.ceil(Math.random() * dice.size);
}

export interface PoolResult {
  [key: number]: number;
}

export function RollPool(dice: Dice[]) {
  return dice.map(Roll).reduce((acc, num, _) => {
    acc[num] = ++acc[num] || 1;
    return acc;
  }, {} as PoolResult);
}
