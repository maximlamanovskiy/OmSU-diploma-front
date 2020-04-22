import React from 'react';
import PropTypes from 'prop-types';

import Message from 'src/components/atoms/message/Message';

import './style.scss';

export default function ClassroomTags(props) {
  const { tags, sectionClassName } = props;

  const renderTags = () => {
    const tagList = tags.map(tag => (
      <li key={tag.id} className="tag-list__tag">
        <Message className="tag__text" value={`#${tag.tag}`} />
      </li>
    ));
    return <ul className="classroom-tags__tag-list list">{tagList}</ul>;
  };

  return tags && tags.length > 0 ? (
    <section className={`classroom-tags ${sectionClassName}`}>{renderTags(tags)}</section>
  ) : null;
}

ClassroomTags.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any,
      tag: PropTypes.string,
    })
  ),
  sectionClassName: PropTypes.string,
};

ClassroomTags.defaultProps = {
  tags: [],
  sectionClassName: '',
};
