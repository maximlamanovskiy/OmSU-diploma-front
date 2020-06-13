import React from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';

import DropdownOption from 'src/components/molecules/dropdownOption/DropdownOption';

import './style.scss';

const activities = [
  { label: I18n.t('components.activities.lecture'), value: 'LECTURE' },
  { label: I18n.t('components.activities.practice'), value: 'PRACTICE' },
  { label: I18n.t('components.activities.seminar'), value: 'SEMINAR' },
  { label: I18n.t('components.activities.laboratory'), value: 'LABORATORY' },
];

function DisciplineAndActivityOptions(props) {
  const { disciplines, activityType, disciplineId, changeActivityType, changeDisciplineId } = props;

  const handleChangeInActivityType = obj => changeActivityType(obj ? obj.value : '');
  const handleChangeInDiscipline = obj => changeDisciplineId(obj ? obj.value : -1);

  return (
    <div className="schedule-item-dialog__options discipline-and-activity-options">
      <DropdownOption
        name="discipline"
        options={disciplines}
        message={I18n.t('components.labels.discipline')}
        wrapperClassName="schedule-item-dialog__small-wrapper schedule-item-dialog__drop-down-wrapper"
        textClassName="simple-label__text"
        selectClassName="schedule-item-dialog__drop-down-select"
        onChange={handleChangeInDiscipline}
        curValue={disciplines.find(dis => dis.value === disciplineId)}
      />
      <DropdownOption
        name="activity"
        options={activities}
        message={I18n.t('components.labels.activity')}
        wrapperClassName="schedule-item-dialog__small-wrapper schedule-item-dialog__drop-down-wrapper"
        textClassName="simple-label__text"
        selectClassName="schedule-item-dialog__drop-down-select"
        onChange={handleChangeInActivityType}
        curValue={activities.find(activity => activity.value === activityType)}
      />
    </div>
  );
}

DisciplineAndActivityOptions.propTypes = {
  disciplines: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  activityType: PropTypes.string.isRequired,
  disciplineId: PropTypes.number.isRequired,
  changeActivityType: PropTypes.func.isRequired,
  changeDisciplineId: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  disciplines: state.disciplinesReducer.disciplines,
});

export default connect(
  mapStateToProps,
  null
)(DisciplineAndActivityOptions);
