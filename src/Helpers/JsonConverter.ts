import { Skill } from '../Models/Skill';
import { GetDefaultAttributes, CharacterAttribute } from '../Models/Attribute';
import { GetDefaultFated, Fated } from '../Models/Fated';
import { Blessing } from '../Models/Blessings';
import { Character } from '../Models/Character';

type VersionSaveData = {
  version: 1;
  data: CharacterSaveDataV1;
} |
{
  version: 2;
  character: CharacterSaveDataV2;
};

interface CharacterSaveDataV1 {
  name: string;
  player: string;
  age: number;
  gender: string;
  bio: string;
  attributes: number[];
  skills: Skill[];
  totem: {
    fated: Fated[];
    blessings: Blessing[];
  };
}
interface CharacterSaveDataV2 {
  name: string;
  player: string;
  age: number;
  gender: string;
  bio: string;
  attributes: CharacterAttribute[];
  skills: Skill[];
  totem: { fated: (Fated & { nexusBonus: boolean; selected: boolean; })[]; blessings: Blessing[]; };
}

export function CharacterToJson(character: Character): string {
  const saveData: VersionSaveData = {
    version: 2,
    character: character
  };
  return JSON.stringify(saveData);
}

export function JsonToCharacter(json: string): Character {
  const saveData: VersionSaveData = JSON.parse(json);
  if (saveData.version === 1)
    return {
      ...saveData.data,
      attributes: GetDefaultAttributes().map((a, i) => ({ ...a, baseValue: saveData.data.attributes[i] })),
      totem: {
        ...saveData.data.totem,
        fated: GetDefaultFated().map((f) => ({
          ...f,
          selected: saveData.data.totem.fated.some((saved) => saved.key === f.key),
          nexusBonus: saveData.data.totem.fated[0].key === f.key
        }))
      }
    };
  if (saveData.version === 2)
    return { ...saveData.character, totem: { ...saveData.character.totem } };

  throw new Error('Invalid save data!');
}
