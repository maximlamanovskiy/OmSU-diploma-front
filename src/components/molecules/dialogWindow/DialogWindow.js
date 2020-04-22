import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import OutsideArea from 'src/components/atoms/outsideArea/OutsideArea';

import { closeDialogWindow } from 'src/actions/utility/dialogWindow';

import './style.scss';

function DialogWindow(props) {
  const { className, isOpen, closeDialogWindow: closeDialogWindowAction, children } = props;

  useEffect(() => {
    window.onpopstate = closeDialogWindowAction;
    return () => {
      closeDialogWindowAction();
    };
  }, [closeDialogWindowAction]);

  return (
    <React.Fragment>
      <OutsideArea onClick={closeDialogWindowAction} isOpen={isOpen} />
      <div
        className={classNames(`dialog-window ${className}`, {
          'dialog-window_hidden': !isOpen,
        })}
      >
        {children}
      </div>
    </React.Fragment>
  );
}

DialogWindow.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  closeDialogWindow: PropTypes.func,
};

DialogWindow.defaultProps = {
  className: '',
  closeDialogWindow: () => {},
};

const mapStateToProps = state => ({
  isOpen: state.utilityReducer.isOpen,
});

const mapDispatchToProps = dispatch => ({
  closeDialogWindow: bindActionCreators(closeDialogWindow, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogWindow);
