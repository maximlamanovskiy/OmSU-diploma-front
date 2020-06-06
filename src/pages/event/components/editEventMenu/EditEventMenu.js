import React from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TextArea from 'src/components/atoms/textArea/TextArea';
import DropdownOption from 'src/components/molecules/dropdownOption/DropdownOption';
import Checkbox from 'src/components/atoms/checkbox/Checkbox';

import { closeDialogWindow } from 'src/actions/utility/dialogWindow';
import { updateEventFetch } from 'src/actions/event/updateEvent';

import PeriodCompact from '../periodCompact/PeriodCompact';

import './style.scss';

function EditEventMenu(props) {
  const { handleOnEditClick, lecturers, newEvent, setNewEvent } = props;

  const renderPeriods = () =>
    newEvent.periods &&
    newEvent.periods.map(period => (
      <li className="event-periods__list-element" key={period.id}>
        <PeriodCompact period={period} handleOnEditClick={() => handleOnEditClick(period.id)} />
      </li>
    ));

  const handleChangeInLecturer = obj =>
    setNewEvent({
      ...newEvent,
      lecturerId: obj ? obj.value : -1,
      lecturer: obj || null,
    });

  const handleChangeInComment = event =>
    setNewEvent({
      ...newEvent,
      comment: event.target.value,
    });

  const handleChangeInRequired = () =>
    setNewEvent({
      ...newEvent,
      required: !newEvent.required,
    });

  return (
    <div className="edit-event-menu">
      <DropdownOption
        name="lecturer"
        message={I18n.t('pages.classroom.occupation.lecturer')}
        options={lecturers}
        wrapperClassName="edit-event-menu__drop-down-wrapper"
        textClassName="simple-label__text simple-label__text_small"
        selectClassName="edit-event-menu__drop-down-select"
        onChange={handleChangeInLecturer}
        curValue={lecturers.find(lec => lec.id === newEvent.lecturerId)}
        isClearable={false}
      />
      <TextArea
        wrapperClassName="simple-label simple-label_full text-area_small"
        headerClassName="simple-label__text"
        headerValue={I18n.t('pages.classroom.occupation.comment')}
        textClassName="event-menu__input base-field base-field__text simple-label__input event-menu__textarea"
        textName="comment"
        textValue={newEvent.comment}
        textOnChange={handleChangeInComment}
      />
      <Checkbox
        id="required"
        text={I18n.t('pages.classroom.occupation.require')}
        value={newEvent.required}
        onChange={handleChangeInRequired}
      />
      <div className="edit-event-menu__event-periods">
        <ul className="event-periods__list">{renderPeriods()}</ul>
      </div>
    </div>
  );
}

EditEventMenu.propTypes = {
  lecturers: PropTypes.arrayOf(PropTypes.shape({})),
  defaultEvent: PropTypes.shape({}),
  handleOnEditClick: PropTypes.func.isRequired,
  setNewEvent: PropTypes.func.isRequired,
  newEvent: PropTypes.shape({
    lecturerId: PropTypes.number,
    comment: PropTypes.string,
    required: PropTypes.bool,
    periods: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};

EditEventMenu.defaultProps = {
  lecturers: [],
  defaultEvent: {},
};

const mapStateToProps = state => ({
  lecturers: state.lecturersReducer.lecturers,
});

const mapDispatchToProps = dispatch => ({
  closeDialogWindow: bindActionCreators(closeDialogWindow, dispatch),
  updateEvent: bindActionCreators(updateEventFetch, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEventMenu);
