
import React, { FunctionComponent} from "react";


type WidgetProps = {
    header:string,
    className?:string
};

export const Widget: FunctionComponent<WidgetProps> =  ({header, className, children}) => 
  <div className={"card " + className}> 
  <div className="card-header">{header} </div>
  <div className="card-body">
    {children}
    </div>
  </div>

