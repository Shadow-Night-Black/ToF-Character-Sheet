import React, {  FunctionComponent } from "react";

export interface DropdownProps {
    collection: selectOption[]
}

type selectOption = {
    name:string,
    value:number
}

export const Dropdown: FunctionComponent<DropdownProps> = ({collection}) => {
    return (<select>
        {collection.map(BuildOption)}
    </select>)
}

function BuildOption(element:selectOption) { 
return (<option value={element.value} >{element.name}</option>)}