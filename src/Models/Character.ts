import { Totem } from "./Totem";
import { Skill, NewSkill } from "./Skill";
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

export function GetAttributeTotal(character: Character, attribute: Attribute, inCity: boolean): number {
  return (
    (character.attributes.get(attribute) || 0) +
    GetAttributeSkillTotal(character, attribute) +
    (!inCity && character.totem.fated[0]?.attribute === attribute ? 6 : 0)
  );
}

export function GetAttributeSkillTotal(character: Character, attribute: Attribute): number {
  return character.skills.reduce((total, skill) => total + (skill.attribute === attribute ? skill.level : 0), 0);
}

const defaultSkillsInfo = [
  {
    level: 6,
    name: "Jumping",
  },
  {
    level: 4,
    name: "Climbing",
  },
  {
    level: 3,
    name: "Parkour",
  },
];

export function CreateTestCharacter(): Character {
  const char: Character = {
    name: "test",
    player: "test",
    age: 3,
    gender: "test",
    bio: "test",
    attributes: new Map(GetDefaultAttributes().map((a) => [a, 6])),
    skills: [],
    totem: { blessings: [], fated: [GetDefaultFated()[0]] },
  };
  defaultSkillsInfo.forEach((x) => char.skills.push(NewSkill(char, x)));
  char.totem.blessings = GetDefaultBlessings().filter(x => char.totem.fated.includes(x.fated)).slice(0,5);

  return char;
}
