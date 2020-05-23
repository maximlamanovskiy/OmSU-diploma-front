import React from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';

import Header from 'src/components/atoms/header/Header';
import Message from 'src/components/atoms/message/Message';
import Footer from 'src/components/molecules/footer/Footer';

import EventPeriods from './components/eventPeriods/EventPeriods';

import './style.scss';

function Event(props) {
  const { historyGoBack, fullEvent } = props;

  const lecturer = fullEvent
    ? `${fullEvent.lecturer.lastName} ${fullEvent.lecturer.firstName} ${fullEvent.lecturer.patronymic}`
    : '';

  return (
    <React.Fragment>
      <Header value={lecturer} />
      <Message value={fullEvent ? fullEvent.comment : ''} />
      <EventPeriods />
      <Footer
        footerClassName="classroom-footer"
        functions={[historyGoBack, () => {}]}
        values={[
          I18n.t('pages.classroom.footer.buttons.back'),
          I18n.t(`pages.classroom.footer.buttons.details`),
        ]}
      />
    </React.Fragment>
  );
}

Event.propTypes = {
  historyGoBack: PropTypes.func,
  fullEvent: PropTypes.shape({
    comment: PropTypes.string,
    lecturer: PropTypes.shape({
      lastName: PropTypes.string,
      firstName: PropTypes.string,
      patronymic: PropTypes.string,
    }),
  }),
};

Event.defaultProps = {
  historyGoBack: () => {},
  fullEvent: null,
};

const mapStateToProps = state => ({
  fullEvent: state.eventReducer.fullEvent,
});

const mapDispatchToProps = dispatch => ({
  historyGoBack: bindActionCreators(goBack, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Event);
