import React, { FunctionComponent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCloudDownloadAlt, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.scss';

export type SidebarProps = {};

export const Sidebar: FunctionComponent<SidebarProps> = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={`sidebar navbar-dark bg-dark ${open ? '' : 'sidebar-closed'}`}
    //   onClick={() => setOpen(!open)}
      onMouseOver={() => setOpen(true)}
      onMouseOut={() => setOpen(false)}
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
    </nav>
  );
};
