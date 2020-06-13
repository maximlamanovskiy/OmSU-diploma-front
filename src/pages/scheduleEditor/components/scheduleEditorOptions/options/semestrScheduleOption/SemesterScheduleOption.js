import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';

import DropdownOption from 'src/components/molecules/dropdownOption/DropdownOption';

import { semesters } from 'src/constants/semesters';

export default function SemesterScheduleOption(props) {
  const { changeSemester, error } = props;

  const [wasSelected, setSelect] = useState(false);

  const handleChangeInSemester = obj => {
    changeSemester(obj ? obj.value : 0);
    setSelect(!!obj);
  };

  return (
    <DropdownOption
      name="semester"
      options={semesters}
      textClassName="simple-label__text"
      message={I18n.t('components.schedule-editor-options.labels.semester')}
      wrapperClassName="schedule-editor-options__field"
      onChange={handleChangeInSemester}
      error={error && !wasSelected}
    />
  );
}

SemesterScheduleOption.propTypes = {
  error: PropTypes.bool.isRequired,
  changeSemester: PropTypes.func.isRequired,
};
