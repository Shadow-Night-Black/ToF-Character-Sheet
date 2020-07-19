import * as Attributes from "./Attribute";
import * as Skills from "./Skill";

export interface Model {
  name: string;
  player: string;
  age: number;
  gender: string;
  bio: string;
  attributes: Map<Attributes.Model, number>;
  skills: Skills.Model[];
}

export function GetAttributeTotal(
  character: Model,
  attribute: Attributes.Model
): number {
  return (
    (character.attributes.get(attribute) ?? 0) + GetAttributeSkillTotal(character, attribute)
  );
}

export function GetAttributeSkillTotal(
  character: Model,
  attribute: Attributes.Model
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
    attributes: new Map(Attributes.GetDefaultAttributes().map((a) => [a, 6])),
    skills: [
      {
        attribute: Attributes.GetDefaultAttributes()[0],
        level: 6,
        name: "Jumping",
      },
      {
        attribute: Attributes.GetDefaultAttributes()[0],
        level: 4,
        name: "Climbing",
      },
      {
        attribute: Attributes.GetDefaultAttributes()[0],
        level: 3,
        name: "Parkour",
      },
    ],
  };
}
