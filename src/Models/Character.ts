import { Totem } from "./Totem";
import { Skill } from "./Skill";
import { Attribute, GetDefaultAttributes } from "./Attribute";
import { GetDefaultFated } from "./Fated";
import { GetDefaultBlessings } from "./Blessings";

export interface Character {
  name: string;
  player: string;
  age: number;
  gender: string;
  bio: string;
  attributes: Map<Attribute, number>;
  skills: Skill[];
  totem: Totem;
}

export function GetAttributeTotal(
  character: Character,
  attribute: Attribute,
  inCity:boolean
): number {
  return (
    (character.attributes.get(attribute) || 0) +
    GetAttributeSkillTotal(character, attribute)
    + (!inCity && character.totem.fated.attribute === attribute ? 6 : 0)
  );
}

export function GetAttributeSkillTotal(
  character: Character,
  attribute: Attribute
): number {
  return character.skills.reduce(
    (total, skill) => total + (skill.attribute === attribute ? skill.level : 0),
    0
  );
}

export function CreateTestCharacter(): Character {
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
    totem: { blessings: GetDefaultBlessings(), fated: GetDefaultFated()[0] },
  };
}
