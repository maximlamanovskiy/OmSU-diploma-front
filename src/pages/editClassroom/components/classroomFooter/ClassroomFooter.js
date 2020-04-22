import React from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import { bindActionCreators } from 'redux';

import Button from 'src/components/atoms/button/Button';

import './style.scss';

function ClassroomFooter(props) {
  const {
    middleButtonValue,
    rightButtonValue,
    middleButtonFunction,
    rightButtonFunction,
    historyGoBack,
  } = props;

  return (
    <footer className="classroom-footer">
      <Button
        className="classrooms-footer__button action-button"
        value={I18n.t('pages.classroom.footer.buttons.back')}
        onClick={historyGoBack}
      />
      <Button
        className="classrooms-footer__button action-button"
        value={middleButtonValue}
        onClick={middleButtonFunction}
      />
      <Button
        className="classrooms-footer__button action-button"
        value={rightButtonValue}
        onClick={rightButtonFunction}
      />
    </footer>
  );
}

ClassroomFooter.propTypes = {
  historyGoBack: PropTypes.func,
  middleButtonValue: PropTypes.string.isRequired,
  rightButtonValue: PropTypes.string.isRequired,
  middleButtonFunction: PropTypes.func.isRequired,
  rightButtonFunction: PropTypes.func.isRequired,
};

ClassroomFooter.defaultProps = {
  historyGoBack: () => {},
};

const mapDispatchToProps = dispatch => ({
  historyGoBack: bindActionCreators(goBack, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(ClassroomFooter);
