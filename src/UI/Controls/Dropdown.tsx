import React from "react";

export interface DropdownProps {
    collection: selectOption[]
}

type selectOption = {
    name:string,
    key:number
}


export function BuildOption(element:selectOption) { 
return (<option value={element.key} key={element.key}>{element.name}</option>)}


export const RemoveOption = <option value={-1} key={-1}> Remove </option>