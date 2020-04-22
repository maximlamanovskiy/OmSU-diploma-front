import React from 'react';
import PropTypes from 'prop-types';

import Button from 'src/components/atoms/button/Button';

import './style.scss';

export default function ClassroomsFooter(props) {
  const {
    footerClassName,
    firstButtonValue,
    firstButtonEnable,
    firstButtonFunc,
    secondButtonValue,
    secondButtonEnable,
    secondButtonFunc,
  } = props;

  return (
    <footer className={`classrooms-footer ${footerClassName}`}>
      <Button
        className="classrooms-footer__button action-button"
        value={firstButtonValue}
        disabled={!firstButtonEnable}
        onClick={firstButtonFunc}
      />
      <Button
        className="classrooms-footer__button action-button"
        value={secondButtonValue}
        disabled={!secondButtonEnable}
        onClick={secondButtonFunc}
      />
    </footer>
  );
}

ClassroomsFooter.propTypes = {
  footerClassName: PropTypes.string,
  firstButtonValue: PropTypes.string.isRequired,
  firstButtonEnable: PropTypes.bool,
  firstButtonFunc: PropTypes.func.isRequired,
  secondButtonValue: PropTypes.string.isRequired,
  secondButtonEnable: PropTypes.bool,
  secondButtonFunc: PropTypes.func.isRequired,
};

ClassroomsFooter.defaultProps = {
  footerClassName: '',
  firstButtonEnable: true,
  secondButtonEnable: true,
};
