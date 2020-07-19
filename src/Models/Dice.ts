export interface Model {
  name: string;
  size: number;
}

export function CreateDie(size: number): Model {
  return { name:`d${size}`, size: size };
}

export function Roll(dice: Model): number {
  return Math.ceil(Math.random() * dice.size);
}

export interface PoolResult {
  [key: number]: number;
}

export function RollPool(dice: Model[]) {
  return dice.map(Roll).reduce((acc, num, _) => {
    acc[num] = ++acc[num] || 1;
    return acc;
  }, {} as PoolResult);
}
