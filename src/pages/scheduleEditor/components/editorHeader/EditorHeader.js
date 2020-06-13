import React from 'react';
import PropTypes from 'prop-types';

import Header from 'src/components/atoms/header/Header';

import './style.scss';

export default function EditorHeader(props) {
  const { style, groups } = props;

  const renderGroups = () =>
    groups.map(group => (
      <div key={group.name} className="editor-header__element">
        <Header className="editor-header__group-header" value={group.name} />
      </div>
    ));

  return (
    <div className="editor-header" style={style}>
      {renderGroups()}
    </div>
  );
}

EditorHeader.propTypes = {
  style: PropTypes.shape({}),
  groups: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

EditorHeader.defaultProps = {
  style: {},
};
