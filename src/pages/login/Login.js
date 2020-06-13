import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-redux-i18n';

import FieldWithLabel from 'src/components/atoms/fieldWithLabel/FieldWithLabel';
import Form from 'src/components/atoms/form/Form';
import Button from 'src/components/atoms/button/Button';
import Message from 'src/components/atoms/message/Message';

import { clearError } from 'src/actions/user/utility';
import { loginFetch } from 'src/actions/user/login';
import { checkAuthFetch } from 'src/actions/user/whoAmI';

import './style.scss';

function Login(props) {
  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');
  const [error, changeError] = useState(false);

  const { checkAuth, clearError: clearErrorAction, login, error: propsError } = props;

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
      changeError(false);
    }

    if (propsError) {
      clearErrorAction();
    }
  };

  const handleChangeInPassword = event => {
    const newPassword = event.target.value.trim();

    if (newPassword !== password) {
      changePassword(newPassword);
      changeError(false);
    }

    if (propsError) {
      clearErrorAction();
    }
  };

  const handelSubmit = event => {
    event.preventDefault();
    login(email, password);
  };

  const hasError = () => error || propsError;

  const isSendEnable = () => email === '' || password === '' || hasError();

  const checkEmail = () => {
    changeError(!email || !email.includes('@') || email.length < 3 || email.includes(' '));
  };

  const checkPassword = () => {
    changeError(!password || password.includes(' '));
  };

  return (
    <Form className="login-page" onSubmit={handelSubmit}>
      <FieldWithLabel
        classNameLabel="login-page__label-block"
        classNameField="login-page__field"
        name="email"
        value={email}
        hasError={!!hasError()}
        onChange={handleChangeInEmail}
        labelValue={I18n.t('pages.sign.labels.email')}
        onBlur={checkEmail}
      />
      <FieldWithLabel
        classNameLabel="login-page__label-block"
        classNameField="login-page__field"
        name="password"
        type="password"
        value={password}
        hasError={!!hasError()}
        hasErrorMessage
        onChange={handleChangeInPassword}
        labelValue={I18n.t('pages.sign.labels.password')}
        onBlur={checkPassword}
      />
      <Message
        className="login-page__error-message__error"
        value={hasError() ? I18n.t('pages.sign.errors.userNameOrPassword') : ''}
      />
      <Button
        className={classNames(
          `login-page__login-button no-auth-button`,
          { 'no-auth-button_error': hasError() },
          { 'login-page__login-button_error': hasError() }
        )}
        value={I18n.t('pages.sign.buttons.login')}
        disabled={!!isSendEnable()}
      />
    </Form>
  );
}

Login.propTypes = {
  error: PropTypes.shape({}),
  clearError: PropTypes.func,
  checkAuth: PropTypes.func,
  login: PropTypes.func,
};

Login.defaultProps = {
  error: null,
  clearError: () => {},
  checkAuth: () => {},
  login: () => {},
};

const mapDispatchToProps = dispatch => ({
  clearError: bindActionCreators(clearError, dispatch),
  login: bindActionCreators(loginFetch, dispatch),
  checkAuth: bindActionCreators(checkAuthFetch, dispatch),
});

const mapStateToProps = state => ({
  error: state.userReducer.error,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
