import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCloudDownloadAlt, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.scss';
import { AppControls } from '../../App';
import { Character, CreateTestCharacter } from '../../Models/Character';

export type SidebarProps = {appControls:AppControls<Character>};

export const Sidebar: FunctionComponent<SidebarProps> = ({appControls}) => {

  return (
    <nav
      className={`sidebar navbar-dark bg-dark`}
    >
      <div>
        <FontAwesomeIcon icon={faBars} color={"white"}></FontAwesomeIcon>
      </div>
      <div className="seperator"></div>
      <div className="nav-item">
       <span className="nav-title">Load </span> <FontAwesomeIcon icon={faCloudUploadAlt} color={"white"}></FontAwesomeIcon>
      </div>
      <div className = "nav-item">
        <span className="nav-title"> Save </span> <FontAwesomeIcon icon={faCloudDownloadAlt} color={"white"}></FontAwesomeIcon>
      </div>
      <div className="seperator"></div>
      <div className = "nav-item" onClick={() => appControls.update(() => CreateTestCharacter())}>
        <span className="nav-title"> Reset </span> <FontAwesomeIcon icon={faCloudDownloadAlt} color={"white"}></FontAwesomeIcon>
      </div>
    </nav>
  );
};
