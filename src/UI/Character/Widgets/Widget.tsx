import React, { FunctionComponent } from "react";
import { AppControls } from "../../../App";
import { EditInDialogButton } from "../Dialogs/Dialog";

export interface Widget<T> {
  header: FunctionComponent<WidgetProps<T>>;
  body: FunctionComponent<WidgetProps<T>>;
  className: string;
}

export interface WidgetProps<T> {
  appControls: AppControls<T>;
  state: T;
  editMode: boolean;
}

export function Widget<T> (props:WidgetProps<T> , { header, body, className }:Widget<T>) {return (
  <div className={`card ${className ? className : ""}`}>
    <div className='card-header'>{header(props)} {EditInDialogButton(props.appControls, header, body)} </div>
    <div className='card-body'>{body(props)}</div>
  </div>
);}
