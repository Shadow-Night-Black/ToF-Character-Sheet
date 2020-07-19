
import React, { FunctionComponent, ReactNode} from "react";


type WidgetProps = {
    header:() => ReactNode,
    body:() => ReactNode
    className?:string
};

export const Widget: FunctionComponent<WidgetProps> =  ({header, body, className, children}) => 
  <div className={"card " + className}> 
  <div className="card-header">{header()} </div>
  <div className="card-body">
    {body()}
    </div>
  </div>

