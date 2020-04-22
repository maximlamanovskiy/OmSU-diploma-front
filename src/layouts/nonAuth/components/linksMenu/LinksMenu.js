import React from 'react';

import { NavLink } from 'react-router-dom';
import { I18n } from 'react-redux-i18n';

import paths from 'src/constants/paths';

import './style.scss';

export default function LinksMenu() {
  return (
    <nav className="links-menu">
      <NavLink
        to={paths.login}
        className="links-menu__link"
        activeClassName="links-menu__link_active"
      >
        {I18n.t('layouts.nonAuth.links.login')}
      </NavLink>
      <NavLink
        to={paths.register}
        className="links-menu__link"
        activeClassName="links-menu__link_active"
      >
        {I18n.t('layouts.nonAuth.links.register')}
      </NavLink>
    </nav>
  );
}
