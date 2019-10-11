import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { masonryFn, tagMenuFn } from 'common';
import { achiveQuery } from 'apollo/achiveQuery';

const Achive = ({ action }) => {
  const achiveList = useRef(null);
  const tagMenu = useRef(null);
  let achiveListFn;
  let menuFnc;

  const { data, loading } = useQuery(achiveQuery, {
    variables: { page: 1, limit: 10 },
  });

  useEffect(() => {
    if (action === 1) {
      if(!loading) {
        menuFnc = tagMenuFn(tagMenu);
        achiveListFn = masonryFn(achiveList);
      }
    }

    return () => {
      if (action === 1) {
        console.log('achiveListFn Masonry destroy');
        achiveListFn.destroy();
      }
    };
  }, [action]);

  if (action === 1 && !loading) {
    return (
      <div className="achiveWrap">
        <div className="tagMenu" ref={tagMenu}>
          <button type="button">
            <em className="blind">태그메뉴</em>
          </button>
          <div className="swiperScrollBox">
            <ul>
              <li>
                <Link to="/">PRINTED MATTERS</Link>
              </li>
              <li>
                <Link to="/">POSTER</Link>
              </li>
              <li>
                <Link to="/">LEAFLET</Link>
              </li>
              <li>
                <Link to="/">BOOKLET</Link>
              </li>
              <li>
                <Link to="/">EDITORIAL</Link>
              </li>
              <li>
                <Link to="/">WEB</Link>
              </li>
              <li>
                <Link to="/">IDENTITY</Link>
              </li>
              <li>
                <Link to="/">DRAFT PROPOSAL</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="achiveListWrap">
          <ul className="grid" ref={achiveList}>
            {data &&
              data.seePortpolios.portpolios.map(portpolioData => (
                <li key={portpolioData._id} className="grid-item">
                  <Link to={`/achiveDetail/${portpolioData._id}`}>
                    <img
                      src={portpolioData.files[0].url}
                      alt={portpolioData.title}
                    />
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
  return '';
};

export default Achive;
