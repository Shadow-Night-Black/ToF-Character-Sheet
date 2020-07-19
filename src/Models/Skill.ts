import * as Attribute from "./Attribute";
import * as Dice from "./Dice";

export interface Model {
  name: string;
  level: number;
  attribute: Attribute.Model;
}

export function ToDie(model: Model) {
  return Dice.CreateDie(model.level * 2);
}
