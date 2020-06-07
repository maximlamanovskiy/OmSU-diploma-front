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
  const [lastName, changeLastName] = useState('');
  const [firstName, changeFirstName] = useState('');
  const [patronymic, changePatronymic] = useState('');
  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');

  const [lastNameError, changeLastNameError] = useState(false);
  const [firstNameError, changeFirstNameError] = useState(false);
  const [emailError, changeEmailError] = useState(false);
  const [passwordError, changePasswordError] = useState(false);

  const { checkAuth, clearError: clearErrorAction, signUp } = props;

  useEffect(() => {
    checkAuth();
    return () => {
      clearErrorAction();
    };
  }, [checkAuth, clearErrorAction]);

  const handleChangeInLastName = event => {
    const newLastName = event.target.value.trim();

    if (newLastName !== lastName) {
      changeLastName(newLastName);
      changeLastNameError(false);
    }
  };

  const handleChangeInFirstName = event => {
    const newFirstName = event.target.value.trim();

    if (newFirstName !== firstName) {
      changeFirstName(newFirstName);
      changeFirstNameError(false);
    }
  };

  const handleChangeInPatronymic = event => {
    const newPatronymic = event.target.value.trim();

    if (newPatronymic !== patronymic) {
      changePatronymic(newPatronymic);
    }
  };

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
    signUp(lastName, firstName, patronymic, email, password);
  };

  const checkLastName = () => {
    changeLastNameError(!lastName);
  };

  const checkFirstName = () => {
    changeFirstNameError(!firstName);
  };

  const checkEmail = () => {
    changeEmailError(!email || !email.includes('@') || email.length < 3 || email.includes(' '));
  };

  const checkPassword = () => {
    changePasswordError(!password || password.includes(' '));
  };

  const hasError = () => lastNameError || firstNameError || emailError || passwordError;
  const isEmpty = () => lastName === '' || firstName === '' || email === '' || password === '';
  const isSubmitDisabled = () => isEmpty() || hasError();

  return (
    <Form className="register-page__form" onSubmit={handelSubmit}>
      <FieldWithLabel
        classNameLabel="register-page__label-block"
        classNameField="register-page__field"
        name="lastName"
        value={lastName}
        hasError={lastNameError}
        hasErrorMessage
        onChange={handleChangeInLastName}
        labelValue={I18n.t('pages.sign.labels.lastName')}
        onBlur={checkLastName}
      />
      <Message
        className="register-page__error-message__error"
        value={lastNameError ? I18n.t('pages.sign.errors.invalidLastName') : ''}
      />
      <FieldWithLabel
        classNameLabel="register-page__label-block"
        classNameField="register-page__field"
        name="firstName"
        value={firstName}
        hasError={firstNameError}
        hasErrorMessage
        onChange={handleChangeInFirstName}
        labelValue={I18n.t('pages.sign.labels.firstName')}
        onBlur={checkFirstName}
      />
      <Message
        className="register-page__error-message__error"
        value={firstNameError ? I18n.t('pages.sign.errors.invalidFirstName') : ''}
      />
      <FieldWithLabel
        classNameLabel="register-page__label-block"
        classNameField="register-page__field"
        name="patronymic"
        value={patronymic}
        onChange={handleChangeInPatronymic}
        labelValue={I18n.t('pages.sign.labels.patronymic')}
      />
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
