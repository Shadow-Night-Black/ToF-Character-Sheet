import * as Dice from './Dice';
import { Attribute, GetDefaultAttributes } from './Attribute';
import { Character, GetAttributes } from './Character';
import { z } from 'zod';

export const SkillValidator = (s: unknown): s is Skill => {
    const result =   SkillData.safeParse(s)
    return result.success
};

export function ToDie(model: Skill) {
    return Dice.CreateDie(model.level * 2);
}

export const MaxSkillLevel = 6;
export const MinSkillLevel = 2;

export function NewSkill(character: Character, skill?: Partial<SkillData>): Skill {
    return new Skill({
        name: skill?.name ?? 'New Skill',
        level: skill?.level ?? 2,
        attributeId: skill?.attributeId ?? character.attributes[0].id,
        id: crypto.randomUUID(),

    });
}

export const SkillData = z.object({
    name: z.string(),
    level: z.number(),
    attributeId: z.string().uuid(),
    id: z.string().uuid(),
})

export type SkillData = z.TypeOf<typeof SkillData>

export class Skill implements SkillData {
    level: number;
    name: string;
    attributeId: string;
    id: string;
    constructor(data: SkillData) {
        SkillData.parse(data)
        this.name = data.name;
        this.level = data.level;
        this.attributeId = data.attributeId
        this.id = data.id
    }

    get attribute(): Attribute {
        return GetDefaultAttributes().find(a => a.id === this.attributeId)!
    }
    set attribute(attribute: Attribute) {
        this.attributeId = attribute.id
    }
}
