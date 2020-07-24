import * as Dice from "./Dice";
import { Identable } from "../Helpers/Collections";

export type Attribute = Identable & AttributeData

interface AttributeData {
  name: string;
  shortName: string;
  isPhysical: boolean;
  isMental: boolean;
}

export function GetDiceFromAttributeTotal(value: number): Dice.Dice[] {
  if (value <= 0) return [Dice.CreateDie(2)];
  if (value >= 36) return [Dice.CreateDie(20)];
  return [Dice.CreateDie(2 + Math.floor(value/ 6) * 2)];
}

export function GetDefaultAttributes(): Attribute[] {
  return defaults;
}

  const defaults:Attribute[] = [
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
  ].reduce((acc, a) => acc.concat({...a, key:acc.length + 1}), [] as Attribute[]);
