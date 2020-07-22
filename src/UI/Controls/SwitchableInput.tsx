
import React, { FunctionComponent, ReactNode, ReactElement} from "react";

type SwitchableTextProps= {
    switchElements:boolean,
    trueElement:ReactElement,
    falseElement:ReactElement,

}

export const SwitchableText:FunctionComponent<SwitchableTextProps> = ({switchElements, trueElement, falseElement}) => {
    if (switchElements) return trueElement;
    else return falseElement;
}