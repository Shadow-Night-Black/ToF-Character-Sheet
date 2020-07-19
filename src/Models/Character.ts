import * as Attributes from "./Attribute"
import * as Skills from "./Skill";

export interface Model {
    name : string,
    player : string,
    age : number,
    gender: string,
    bio: string,
    attributes: Map<Attributes.Model, number>
    skills: Skills.Model[]

}