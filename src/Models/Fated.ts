import {Attribute, GetDefaultAttributes} from "./Attribute"
import Fateds from "../Data/Fated.json"
import { Identable } from "../Helpers/Collections";

export type Fated = FatedData & Identable;
interface FatedData  {
    name:string,
    attribute:Attribute
}

const fatedData = Fateds;
const defaultFated = fatedData.map((x, i) => ({...x, attribute:GetDefaultAttributes()[x.attribute - 1], key:i}));

export function GetDefaultFated():Fated[] { return defaultFated };