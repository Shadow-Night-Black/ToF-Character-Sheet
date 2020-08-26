import * as Dice from "./Dice";
import { Attribute, GetDefaultAttributes } from "./Attribute";
import { Character } from "./Character";
import { Identable, nextId } from "../Helpers/Collections";


export type Skill = Identable & SkillData;

export function ToDie(model: Skill) {
  return Dice.CreateDie(model.level * 2);
}

export const MaxSkillLevel = 6
export const MinSkillLevel = 2

export function NewSkill(character: Character, skill?:Partial<SkillData>): Skill {
  return {
    name: skill?.name ?? "New Skill",
    level: skill?.level ?? 2,
    attribute: skill?.attribute ?? GetDefaultAttributes()[0],
    key: nextId(character.skills),
  };
}

interface SkillData{
  name: string;
  level: number;
  attribute: Attribute;
}