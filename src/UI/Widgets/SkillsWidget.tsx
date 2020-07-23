import React, { FunctionComponent } from "react";
import { WidgetConstructor, WidgetProps } from "./Widget";
import { Skill, ToDie } from "../../Models/Skill";


export const SkillsWidgetConstructor:WidgetConstructor = (props) => 
({
  header: <WidgetHeader {...props}  />,
  body: <WidgetBody {...props} />,
  className: "skills-widget"
})



const WidgetHeader: FunctionComponent<WidgetProps> = ({appControls, state}) => (
  <div className="header">
    Skills 
    <button className="btn-primary btn-sm btn right"
     onClick={() => {
        appControls.openDialog(() => (
          <WidgetBody {...{ editMode: true, appControls, state }} />
        ));
      }}
    > Edit </button>
  </div>
);

const WidgetBody: FunctionComponent<WidgetProps> = ({state
  }) => (
    <div className="skill-grid">
      <div className="skill-header">
        <div className="skill-name">Skill Name</div>
        <div className="skill-level"> Level </div>
        <div className="skill-attribute"> Attribute </div>
        <div className="skill-dice"> Dice </div>
      </div>
      {state.character.skills.map((skill) => (
        WidgetBodyRow(skill)
      ))}
    </div>
);
function WidgetBodyRow(skill: Skill): JSX.Element {
  return <div className="skill-row">
    <div className={`skill-name`}> {skill.name} </div>
    <div className={`skill-level`}> {skill.level} </div>
    <div className={`skill-attribute`}> {skill.attribute.name} </div>
    <div className={`skill-dice`}> {ToDie(skill).name} </div>
  </div>;
}

