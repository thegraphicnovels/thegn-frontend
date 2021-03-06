import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { tagQuery } from '../apollo/tagQuery';
import { tagMenuFn } from '../common';

const TagMenu = ({ setTag, setTags, setPageNum }) => {
  const tagMenuEl = useRef(null);
  const { data: tagData, loading: tagLoading } = useQuery(tagQuery, {
    fetchPolicy: 'network-only',
  });
  const chTagListFn = (tag) => {
    if (tagMenuEl.current.classList.contains('active')) {
      tagMenuEl.current.classList.remove('active');
    }
    if (setPageNum) {
      setPageNum(1);
    }
    if (tag === '') {
      // refetch({ tags: null, page: 1 });
      setTag(tag);
      setTags([]);
    } else {
      // refetch({ tags: [tag._id], page: 1 });
      setTag(tag.value);
      setTags([tag._id]);
    }
  };

  useEffect(() => {
    let menuFn = tagMenuEl.current;
    if (!tagLoading && tagData) {
      //   console.log('tagData', tagData);
      menuFn = tagMenuFn(tagMenuEl);
    }

    return () => {
      if (menuFn) {
        menuFn.destroy();
      }
    };
  });

  if (!tagLoading && tagData) {
    return (
      <div className="tagMenu" ref={tagMenuEl}>
        <button type="button">
          <em className="blind">태그메뉴</em>
        </button>
        <div className="swiperScrollBox">
          <div className="swiper-wrapper">
            <ul className="swiper-slide">
              <li>
                <button type="button" onClick={() => chTagListFn('')}>
                  ALL
                </button>
              </li>
              {tagData.seeTags.map((tag, i) => (
                <li key={tag._id}>
                  <button type="button" onClick={() => chTagListFn(tag)}>
                    {tag.value}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="swiper-scrollbar" />
        </div>
      </div>
    );
  }

  return '';
};

TagMenu.propTypes = {
  setTag: PropTypes.func.isRequired,
  setTags: PropTypes.func.isRequired,
  setPageNum: PropTypes.func,
};

export default TagMenu;
