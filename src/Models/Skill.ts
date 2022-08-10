import * as Dice from './Dice';
import { Attribute, GetDefaultAttributes } from './Attribute';
import { Character, GetAttributes } from './Character';
import { z } from 'zod';
import { InterfaceType } from 'typescript';

export const SkillValidator = (s: unknown): s is Skill=> {
    const result =   SkillData.safeParse(s)
    return result.success
};

export function ToDie(model: Skill) {
    return Dice.CreateDie(model.totalLevel * 2);
}

export const MaxSkillLevel = 6;
export const MinSkillLevel = 2;

export function NewSkill(character: Character, skill?: Partial<SkillData>): Skill{
    return new Skill({
        name: skill?.name ?? 'New Skill',
        levels: skill?.levels ?? new Map(),
        id: crypto.randomUUID(),
    });
}

export const SkillData = z.object({
    name: z.string(),
    levels: z.map(z.string().uuid(), z.number()),
    id: z.string().uuid(),
})

export type SkillData = z.TypeOf<typeof SkillData>

class Skill implements SkillData {
    levels: Map<string, number>;
    name: string;
    id: string;
    constructor(data: SkillData) {
        SkillData.parse(data)
        this.name = data.name;
        this.levels = data.levels;
        this.id = data.id
    }

    get totalLevel() {
        let total = 0
        for (const level of this.levels.values()) {
            total += level
        }
        return total;
    }

    attributeLevel(attribute: Attribute) {
        return this.levels.get(attribute.id) ?? 0;
    }
}

export type { Skill };
