import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FieldWithLabel from 'src/components/atoms/fieldWithLabel/FieldWithLabel';
import DropdownOption from 'src/components/molecules/dropdownOption/DropdownOption';

import { updateEvent } from 'src/actions/event/eventUtility';
import { intervalsValue } from 'src/utils/date';

import './style.scss';

const intervals = intervalsValue.map(value => ({
  value,
  label: I18n.t(`pages.classroom.occupation.intervals.${value.toLowerCase()}`),
}));

function TimeAndIntervalSelector(props) {
  const { timeBlocks, timeIndex, updateEvent: updateEventAction, interval, isFree, error } = props;

  const [times, setTimes] = useState(null);

  useEffect(() => {
    setTimes(timeBlocks[timeIndex]);
  }, [timeBlocks, timeIndex]);

  const onChangeInterval = obj =>
    updateEventAction({ interval: obj ? obj.value : intervalsValue[0] });

  return (
    <div className="time-and-interval">
      <FieldWithLabel
        labelValue={I18n.t('pages.classroom.occupation.time')}
        classNameLabel="simple-label"
        classNameField="event-menu__input base-field simple-label__input time-and-interval__time"
        classNameText="simple-label__text"
        value={`${times ? times.timeFrom : ''} - ${times ? times.timeTo : ''}`}
        disabled
        hasError={!times && error}
      />
      <DropdownOption
        name="interval"
        message={I18n.t('pages.classroom.occupation.interval')}
        options={intervals}
        wrapperClassName="event-menu__small-wrapper"
        textClassName="simple-label__text"
        selectClassName="event-menu__drop-down-select"
        onChange={onChangeInterval}
        curValue={intervals.find(item => item.value === interval)}
        disabled={!isFree}
        isClearable={false}
      />
    </div>
  );
}

TimeAndIntervalSelector.propTypes = {
  timeIndex: PropTypes.number,
  interval: PropTypes.string,
  timeBlocks: PropTypes.arrayOf(
    PropTypes.shape({
      timeFrom: PropTypes.string,
      timeTo: PropTypes.string,
    })
  ),
  updateEvent: PropTypes.func,
  isFree: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

TimeAndIntervalSelector.defaultProps = {
  timeIndex: -1,
  interval: '',
  timeBlocks: [],
  updateEvent: () => {},
};

const mapStateToProps = state => ({
  timeBlocks: state.timeblocksReducer.timeBlocks,
  isFree: state.eventReducer.isFree,
});

const mapDispatchToProps = dispatch => ({
  updateEvent: bindActionCreators(updateEvent, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeAndIntervalSelector);
