import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from 'src/components/atoms/button/Button';

import { logoutFetch } from 'src/actions/user/logout';

import './style.scss';

function Header(props) {
  const { toggleMenuEvent, logout } = props;

  return (
    <header className="base-header">
      <Button className="icon-button base-header__hamburger-menu" onClick={toggleMenuEvent} />
      <Button className="icon-button base-header__user-button" onClick={logout} />
    </header>
  );
}

Header.propTypes = {
  toggleMenuEvent: PropTypes.func,
  logout: PropTypes.func,
};

Header.defaultProps = {
  toggleMenuEvent: () => {},
  logout: () => {},
};

const mapDispatchToProps = dispatch => ({
  logout: bindActionCreators(logoutFetch, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(Header);
