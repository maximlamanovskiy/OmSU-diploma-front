import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DropdownOption from 'src/components/molecules/dropdownOption/DropdownOption';

import { getGroupsFetch } from 'src/actions/groups/getGroups';
import { updateFilter } from 'src/actions/filter/updateFilter';

import YearFilterOptions from '../yearFilterOptions/YearFilterOptions';

function GroupFilterOptions(props) {
  const { getGroups, updateFilter: updateFilterAction, groups, error } = props;

  const [wasGroupSelect, setGroupSelect] = useState(false);

  useEffect(() => {
    getGroups();
  }, [getGroups]);

  const changeGroup = obj => {
    updateFilterAction({
      id: obj && obj.value,
    });
    setGroupSelect(!!obj);
  };

  return (
    <React.Fragment>
      <DropdownOption
        name="group"
        options={groups}
        message={I18n.t('components.filter.labels.group')}
        onChange={changeGroup}
        error={!wasGroupSelect && error}
        textClassName="simple-label__text"
      />
      <YearFilterOptions error={error} />
    </React.Fragment>
  );
}

GroupFilterOptions.propTypes = {
  error: PropTypes.bool,
  groups: PropTypes.arrayOf(PropTypes.shape({})),
  getGroups: PropTypes.func,
  updateFilter: PropTypes.func,
};

GroupFilterOptions.defaultProps = {
  error: false,
  groups: [],
  getGroups: () => {},
  updateFilter: () => {},
};

const mapStateToProps = state => ({
  groups: state.groupsReducer.groups,
});

const mapDispatchToProps = dispatch => ({
  getGroups: bindActionCreators(getGroupsFetch, dispatch),
  updateFilter: bindActionCreators(updateFilter, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupFilterOptions);
