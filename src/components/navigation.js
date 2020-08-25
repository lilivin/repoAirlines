import React from 'react';
import '../styles/navigation.scss';

const Navigation = () => {

  return (
    <div className="navigationContainer">
        <h1 className="logo">Script Studio Flight</h1>
        <ul className="navigation">
          <li className="navigation__item">Okazje</li>
          <li className="navigation__item">Hotele</li>
          <li className="navigation__item">Loty</li>
          <li className="navigation__item">Ubezpieczenia</li>
        </ul>
    </div>
  );
}

export default Navigation;