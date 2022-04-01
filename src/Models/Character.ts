import { Totem } from './Totem';
import { Skill, NewSkill } from './Skill';
import { Attribute, GetDefaultAttributes, CharacterAttribute } from './Attribute';
import { GetDefaultFated } from './Fated';
import { GetDefaultBlessings as GetBlessingsList } from './Blessings';
import { UpdateMember } from './Interfaces/Lenses';

export interface Character {
    name: string;
    player: string;
    age: number;
    gender: string;
    bio: string;
    attributes: CharacterAttribute[];
    skills: Skill[];
    totem: Totem;
}

export function GetAttributeTotal(character: Character, attribute: Attribute, inCity: boolean): number {
    return (
        GetAttributeBaseValue(character, attribute) +
        GetAttributeSkillTotal(character, attribute) +
        (!inCity && character.totem.fated.some((f) => f.nexusBonus && f.attribute.key === attribute.key) ? 6 : 0)
    );
}

export function GetAttributeSkillTotal(character: Character, attribute: Attribute): number {
    return character.skills.reduce(
        (total, skill) => total + (skill.attribute.key === attribute.key ? skill.level : 0),
        0
    );
}

export function GetAttributeBaseValue(character: Character, attribute: Attribute): number {
    var item = character.attributes.find((a) => a === attribute);
    if (item) return item.baseValue;
    throw new Error('Invalid Attribute!');
}

export function GetAttributes(character: Character): CharacterAttribute[] {
    return character.attributes;
}

const defaultSkillsInfo = [
    {
        level: 6,
        name: 'Jumping',
    },
    {
        level: 4,
        name: 'Climbing',
    },
    {
        level: 3,
        name: 'Parkour',
    },
];

export function CreateTestCharacter(): Character {
    const char: Character = {
        name: 'test',
        player: 'test',
        age: 3,
        gender: 'test',
        bio: 'test',
        attributes: GetDefaultAttributes().map((a) => ({ ...a, baseValue: 6 })),
        skills: [],
        totem: {
            blessings: [],
            fated: [...GetDefaultFated().map((f) => ({ ...f, nexusBonus: false, selected: false }))],
        },
    };
    defaultSkillsInfo.forEach((x) => char.skills.push(NewSkill(char, x)));
    char.totem.blessings = GetBlessingsList()
        .filter((b) => char.totem.fated.map((fated) => fated.key).includes(b.fated.key))
        .slice(0, 5);

    return char;
}

export const UpdateSkillList: UpdateMember<Skill[], Character> = (map) => (old) => ({
    ...old,
    skills: map(old.skills),
});

export const UpdateAttributeList: UpdateMember<CharacterAttribute[], Character> = (map) => (old) => ({
    ...old,
    attributes: map(old.attributes),
});
