import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FieldWithLabel from 'src/components/atoms/fieldWithLabel/FieldWithLabel';
import Button from 'src/components/atoms/button/Button';
import Message from 'src/components/atoms/message/Message';
import Form from 'src/components/atoms/form/Form';

import { registerFetch } from 'src/actions/user/registration';
import { clearError } from 'src/actions/user/utility';
import { checkAuthFetch } from 'src/actions/user/whoAmI';

import './style.scss';

function Register(props) {
  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');
  const [emailError, changeEmailError] = useState(false);
  const [passwordError, changePasswordError] = useState(false);

  const { checkAuth, clearError: clearErrorAction, signUp } = props;

  useEffect(() => {
    checkAuth();
    return () => {
      clearErrorAction();
    };
  }, [checkAuth, clearErrorAction]);

  const handleChangeInEmail = event => {
    const newEmail = event.target.value.trim();

    if (newEmail !== email) {
      changeEmail(newEmail);
      changeEmailError(false);
    }
  };

  const handleChangeInPassword = event => {
    const newPassword = event.target.value.trim();

    if (newPassword !== password) {
      changePassword(newPassword);
      changePasswordError(false);
    }
  };

  const handelSubmit = event => {
    event.preventDefault();
    signUp(email, password);
  };

  const checkEmail = () => {
    changeEmailError(!email || !email.includes('@') || email.length < 3 || email.includes(' '));
  };

  const checkPassword = () => {
    changePasswordError(!password || password.length <= 5 || password.includes(' '));
  };

  const isSubmitDisabled = () => email === '' || password === '' || emailError || passwordError;
  const hasError = () => emailError || passwordError;

  return (
    <Form className="register-page__form" onSubmit={handelSubmit}>
      <FieldWithLabel
        classNameLabel="register-page__label-block"
        classNameField="register-page__field"
        name="email"
        value={email}
        hasError={emailError}
        hasErrorMessage
        onChange={handleChangeInEmail}
        labelValue={I18n.t('pages.sign.labels.email')}
        onBlur={checkEmail}
      />
      <Message
        className="register-page__error-message__error"
        value={emailError ? I18n.t('pages.sign.errors.invalidEmail') : ''}
      />
      <FieldWithLabel
        classNameLabel="register-page__label-block"
        classNameField="register-page__field"
        name="password"
        type="password"
        value={password}
        hasError={passwordError}
        hasErrorMessage
        onChange={handleChangeInPassword}
        labelValue={I18n.t('pages.sign.labels.password')}
        onBlur={checkPassword}
      />
      <Message
        className="register-page__error-message__error"
        value={passwordError ? I18n.t('pages.sign.errors.invalidPassword') : ''}
      />
      <Button
        className={classNames(
          'register-page__register-button no-auth-button',
          { 'no-auth-button_error': hasError() },
          { 'register-page__register-button_error': hasError() }
        )}
        value={I18n.t('pages.sign.buttons.registration')}
        disabled={isSubmitDisabled()}
      />
    </Form>
  );
}

Register.propTypes = {
  clearError: PropTypes.func,
  checkAuth: PropTypes.func,
  signUp: PropTypes.func,
};

Register.defaultProps = {
  signUp: () => {},
  clearError: () => {},
  checkAuth: () => {},
};

const mapDispatchToProps = dispatch => ({
  signUp: bindActionCreators(registerFetch, dispatch),
  clearError: bindActionCreators(clearError, dispatch),
  checkAuth: bindActionCreators(checkAuthFetch, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(Register);
