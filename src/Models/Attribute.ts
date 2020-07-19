import * as Dice from "./Dice";

export interface Model {
  name: string;
  shortName: string;
  isPhysical: boolean;
  isMental: boolean;
}

export function GetDiceFromAttributeTotal(value: number): Dice.Model[] {
  if (value <= 0) return [Dice.CreateDie(2)];
  if (value >= 36) return [Dice.CreateDie(20)];
  return [Dice.CreateDie(Math.ceil(value / 6) * 2)];
}

export function GetDefaultAttributes(): Model[] {
  return defaults;
}

  const defaults = [
    {
      name: "Power",
      shortName: "Pow",
      isMental: false,
      isPhysical: true,
    },
    {
      name: "Finesse",
      shortName: "Fin",
      isMental: false,
      isPhysical: true,
    },
    {
      name: "Resilience",
      shortName: "Res",
      isMental: false,
      isPhysical: true,
    },
    {
      name: "Intellect",
      shortName: "Int",
      isMental: false,
      isPhysical: true,
    },
    {
      name: "Wits",
      shortName: "Wit",
      isMental: false,
      isPhysical: true,
    },
    {
      name: "Presence",
      shortName: "Pre",
      isMental: false,
      isPhysical: true,
    },
  ];
