import React from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { NavLink } from 'react-router-dom';

import * as paths from 'src/constants/paths';

import './style.scss';

export default function NavigationOptions(props) {
  const { onClick } = props;

  return (
    <nav className="navigation-options">
      <NavLink
        className="navigation-options__nav-link"
        activeClassName="navigation-options__nav-link_active"
        to={paths.classrooms}
        onClick={onClick}
      >
        {I18n.t('layouts.base.sideBar.classrooms')}
      </NavLink>
      <NavLink
        className="navigation-options__nav-link"
        activeClassName="navigation-options__nav-link_active"
        to={paths.schedule}
        onClick={onClick}
      >
        {I18n.t('layouts.base.sideBar.schedule')}
      </NavLink>
      <NavLink
        className="navigation-options__nav-link"
        activeClassName="navigation-options__nav-link_active"
        to={paths.scheduleEditor}
        onClick={onClick}
      >
        {I18n.t('layouts.base.sideBar.schedule-editor')}
      </NavLink>
    </nav>
  );
}

NavigationOptions.propTypes = {
  onClick: PropTypes.func,
};

NavigationOptions.defaultProps = {
  onClick: () => {},
};
