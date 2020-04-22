import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Spinner from 'src/components/atoms/spinner/Spinner';
import LinksMenu from './components/linksMenu/LinksMenu';

import './style.scss';

function NonAuth(props) {
  const { isLoading, children } = props;

  return (
    <React.Fragment>
      <main className="non-auth">
        <LinksMenu />
        {children}
        <Spinner disable={!isLoading} />
      </main>
    </React.Fragment>
  );
}

NonAuth.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
};

NonAuth.defaultProps = {
  isLoading: false,
};

const mapStateToProps = state => ({
  isLoading: state.userReducer.isLoading,
});

export default connect(
  mapStateToProps,
  null
)(NonAuth);
