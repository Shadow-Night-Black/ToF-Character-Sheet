import * as Character from "../Models/Character";
import * as Skill from "../Models/Skill";
import React, { FunctionComponent, Fragment } from "react";

type SkillProps = {
  character: Character.Model;
};


export const SkillsWidgetHeader: FunctionComponent<object> = ({}) => (
  <div className="header">
    Skills 
    <button className="btn-primary btn-sm btn right"> Add New </button>
  </div>
);

export const SkillsWidgetBody: FunctionComponent<SkillProps> = ({
  character,
}) => (
  <Fragment>
    <div className="skill-grid">
      <div className="skill-header">
        <div className="skill-name">Skill Name</div>
        <div className="skill-level"> Level </div>
        <div className="skill-attribute"> Attribute </div>
        <div className="skill-dice"> Dice </div>
      </div>
      {character.skills.map((skill) => (
        <div className="skill-row">
          <div className={`skill-name`}> {skill.name} </div>
          <div className={`skill-level`}> {skill.level} </div>
          <div className={`skill-attribute`}> {skill.attribute.name} </div>
          <div className={`skill-dice`}> {Skill.ToDie(skill).name} </div>
        </div>
      ))}
    </div>
  </Fragment>
);
