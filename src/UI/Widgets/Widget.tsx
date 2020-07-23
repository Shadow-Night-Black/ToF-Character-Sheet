import React, { FunctionComponent, ReactNode } from "react";
import { AppControls, AppState } from "../../App";

export type WidgetConstructor = (props:WidgetProps) => Widget

export interface Widget {
  header: ReactNode;
  body: ReactNode;
  className: string;
}

export interface WidgetProps {
  appControls: AppControls,
  state: AppState,
  editMode?:boolean
}

export const Widget: FunctionComponent<Widget> = ({
  header,
  body,
  className,
}) => (
  <div className={`card ${className ? className : ""}`}>
    <div className="card-header">{header} </div>
    <div className="card-body">{body}</div>
  </div>
);
