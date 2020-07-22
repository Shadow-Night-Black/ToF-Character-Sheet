import React, { FunctionComponent, ReactNode } from "react";

export interface Widget {
  header: ReactNode;
  body: ReactNode;
  className: string;
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
