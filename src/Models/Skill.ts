import * as Dice from "./Dice";
import { Attribute } from "./Attribute";

export interface Skill {
  name: string;
  level: number;
  attribute: Attribute;
}

export function ToDie(model: Skill) {
  return Dice.CreateDie(model.level * 2);
}
