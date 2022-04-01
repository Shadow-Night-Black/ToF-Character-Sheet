import { Fated } from './Fated';
import { Blessing } from './Blessings';
import { UpdateMember } from './Interfaces/Lenses';

interface TotemFated extends Fated {
    nexusBonus: boolean;
    selected: boolean;
}

export interface Totem {
    fated: TotemFated[];
    blessings: Blessing[];
}

export const UpdateFatedList: UpdateMember<TotemFated[], Totem> = (map) => (old) => ({
    ...old,
    fated: map(old.fated),
});
