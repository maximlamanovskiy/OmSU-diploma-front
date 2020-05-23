import React from 'react';
import PropTypes from 'prop-types';

import Button from 'src/components/atoms/button/Button';

import './style.scss';

export default function Footer(props) {
  const { footerClassName, buttonClassName, values, classNames, disables, keys, functions } = props;

  const renderButtons = () =>
    functions.map((func, index) => (
      <Button
        className={`footer__button action-button ${buttonClassName} ${
          classNames && classNames[index] ? classNames[index] : ''
        }`}
        value={values[index]}
        onClick={func}
        disabled={!!disables[index]}
        key={keys[index]}
      />
    ));

  return <footer className={`footer ${footerClassName}`}>{renderButtons()}</footer>;
}

Footer.propTypes = {
  footerClassName: PropTypes.string,
  buttonClassName: PropTypes.string,
  keys: PropTypes.arrayOf(PropTypes.any),
  disables: PropTypes.arrayOf(PropTypes.bool),
  classNames: PropTypes.arrayOf(PropTypes.string),
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  functions: PropTypes.arrayOf(PropTypes.func).isRequired,
};

Footer.defaultProps = {
  footerClassName: '',
  buttonClassName: '',
  classNames: [],
  disables: [],
  keys: [],
};
