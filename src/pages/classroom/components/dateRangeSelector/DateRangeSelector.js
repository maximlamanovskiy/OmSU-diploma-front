import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FieldWithLabel from 'src/components/atoms/fieldWithLabel/FieldWithLabel';

import { updateEvent } from 'src/actions/event/eventUtility';

import './style.scss';

function DateRangeSelector(props) {
  const { dateFrom, dateTo, date, updateEvent: updateEventAction, disabled } = props;

  useEffect(() => {
    updateEventAction({ dateFrom: date, dateTo: date });
  }, [date, updateEventAction]);

  const handleChangeInStartDate = event => {
    const newDate = event.target.value;
    updateEventAction({ dateFrom: newDate });
    if (dateTo < newDate) {
      updateEventAction({ dateTo: newDate });
    }
  };
  const handleChangeInEndDate = event => {
    const newDate = event.target.value;
    updateEventAction({ dateTo: newDate });
    if (dateFrom > newDate) {
      updateEventAction({ dateFrom: newDate });
    }
  };

  return (
    <div className="date-range">
      <FieldWithLabel
        labelValue={I18n.t('components.date-range-selector.start-date')}
        classNameLabel="simple-label"
        classNameField="date-range__date-picker base-field simple-label__input"
        classNameText="simple-label__text"
        type="date"
        value={dateFrom}
        onChange={handleChangeInStartDate}
        disabled={disabled}
      />
      <FieldWithLabel
        labelValue={I18n.t('components.date-range-selector.end-date')}
        classNameLabel="simple-label"
        classNameField="date-range__date-picker base-field simple-label__input"
        classNameText="simple-label__text"
        type="date"
        value={dateTo}
        onChange={handleChangeInEndDate}
        disabled={disabled}
      />
    </div>
  );
}

DateRangeSelector.propTypes = {
  date: PropTypes.string.isRequired,
  dateFrom: PropTypes.string.isRequired,
  dateTo: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  updateEvent: PropTypes.func,
};

DateRangeSelector.defaultProps = {
  disabled: false,
  updateEvent: () => {},
};

const mapStateToProps = state => ({
  dateFrom: state.eventReducer.event.dateFrom,
  dateTo: state.eventReducer.event.dateTo,
});

const mapDispatchToProps = dispatch => ({
  updateEvent: bindActionCreators(updateEvent, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateRangeSelector);
