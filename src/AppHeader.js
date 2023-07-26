import React from 'react';
import { NavLink } from 'react-router-dom';
import './AppHeader.css';

const AppHeader = () => (
  <header>
    <div className="center-column">
      <h1 style={{paddingLeft:'35%'}}>MotherShip</h1>
    </div>
    {/* <nav>
      <ol className="center-column">
        <li>
          <NavLink to="/fcuPortal">FCU Portal</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
      </ol>
    </nav> */}
  </header>
);

export default AppHeader;