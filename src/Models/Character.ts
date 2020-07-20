import { Totem } from "./Totem";
import { Dice } from "./Dice";
import { Skill } from "./Skill";
import { Attribute, GetDefaultAttributes } from "./Attribute";
import { GetDefaultFated } from "./Fated";
import { GetDefaultBlessings } from "./Blessings";

export interface Model {
  name: string;
  player: string;
  age: number;
  gender: string;
  bio: string;
  attributes: Map<Attribute, number>;
  skills: Skill[];
  totem:Totem
}

export function GetAttributeTotal(
  character: Model,
  attribute: Attribute
): number {
  return (
    (character.attributes.get(attribute) ?? 0) + GetAttributeSkillTotal(character, attribute)
  );
}

export function GetAttributeSkillTotal(
  character: Model,
  attribute: Attribute
): number {
  return character.skills.reduce(
    (total, skill) => total + (skill.attribute === attribute ? skill.level : 0),
    0
  );
}

export function CreateTestCharacter(): Model {
  return {
    name: "test",
    player: "test",
    age: 3,
    gender: "test",
    bio: "test",
    attributes: new Map(GetDefaultAttributes().map((a) => [a, 6])),
    skills: [
      {
        attribute: GetDefaultAttributes()[0],
        level: 6,
        name: "Jumping",
      },
      {
        attribute: GetDefaultAttributes()[0],
        level: 4,
        name: "Climbing",
      },
      {
        attribute: GetDefaultAttributes()[0],
        level: 3,
        name: "Parkour",
      },
    ],
    totem: { blessings: GetDefaultBlessings()
    , fated:GetDefaultFated()[0]}
    
  };
}
