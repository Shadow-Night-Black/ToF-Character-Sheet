import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCloudDownloadAlt, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.scss';
import { AppControls } from '../../App';
import { Character, CreateTestCharacter } from '../../Models/Character';

export const Sidebar: FunctionComponent<{}> = () => {
  return (
    <nav className={`sidebar navbar-dark bg-dark`}>
      <FontAwesomeIcon icon={faBars} size="lg" color={'white'} className="menu-icon"></FontAwesomeIcon>
      <ul>
        <li>
          <Link to="/character">Character</Link>
          <ul>
            <li>
              <FontAwesomeIcon icon={faCloudUploadAlt} size="lg" color={'white'}></FontAwesomeIcon>
              Load
            </li>
            <li>
              <FontAwesomeIcon icon={faCloudDownloadAlt} size="lg" color={'white'}></FontAwesomeIcon>
              Save
            </li>

            {/* <li className="nav-item" onClick={() => appControls.update(() => CreateTestCharacter())}>
              <FontAwesomeIcon icon={faCloudDownloadAlt} size="lg" color={'white'}></FontAwesomeIcon>
              Reset
            </li> */}
          </ul>
        </li>
        <li>
          Charts
          <ul>
            <Link to="/dice">
              <li>Dice</li>
            </Link>
          </ul>
        </li>
      </ul>
    </nav>
  );
};
