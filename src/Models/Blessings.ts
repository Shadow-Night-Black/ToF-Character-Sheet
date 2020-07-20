import { Fated, GetDefaultFated } from "./Fated";

export interface Blessing {
  name: string;
  fated: Fated;
  level: number;
  effect: string;
}

export function GetDefaultBlessings() {
    return defaultBlessings;
}

const defaultBlessings: Blessing[] = [
  {
    name: "Strengthen",
    effect:
      "Add an additional Power attribute die to a Power action's roll total.",
    level: 1,
    fated: GetDefaultFated().find((x) => x.attribute.shortName === "Pow")!,
  },
  {
    name: "Flex",
    effect:
      "Increase one adjacent entity’s Power attribute die size by two pips until the next rest.",
    level: 1,
    fated: GetDefaultFated().find((x) => x.attribute.shortName === "Pow")!,
  },
  {
    name: "Bulk",
    effect:
      "You or one adjacent entity can use the sum of two Power dice you roll as the roll total for any one physical action.",
    level: 1,
    fated: GetDefaultFated().find((x) => x.attribute.shortName === "Pow")!,
  },
  {
    name: "Punish",
    effect:
      "Double the roll total of the next physical action against one selected entity.",
    level: 1,
    fated: GetDefaultFated().find((x) => x.attribute.shortName === "Pow")!,
  },
  {
    name: "Overpower",
    effect:
      "One selected entity takes their lowest die value for their next three Power actions.",
    level: 1,
    fated: GetDefaultFated().find((x) => x.attribute.shortName === "Pow")!,
  },
  {
    name: "Retaliate",
    effect:
      "Inflict degrees of a physical status condition you have on up to three selected targets within an encounter - 1 degree on three entities, 2 degrees on 2 entities, three degrees on 1 entity. These do not affect spirit or adrenaline",
    level: 1,
    fated: GetDefaultFated().find((x) => x.attribute.shortName === "Pow")!,
  },
];
