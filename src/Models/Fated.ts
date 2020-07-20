import {Attribute, GetDefaultAttributes} from "./Attribute"

export interface Fated {
    name:string,
    attribute:Attribute
}

const defaultFated:Fated[] = [{
    name: "Warick",
    attribute: GetDefaultAttributes().find(x => x.shortName === "Pow")!
}]

export function GetDefaultFated() { return defaultFated };