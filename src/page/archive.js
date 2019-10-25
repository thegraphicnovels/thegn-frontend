import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { archiveQuery } from 'apollo/archiveQuery';
import { masonryFn } from 'common';
import Paging from 'components/paging';
import TagMenu from 'components/tag_menu';

const Archive = ({ action }) => {
  const limit = 10;
  const archiveList = useRef(null);
  const [nowPageNum, setPageNum] = useState(1);
  const [imgLoadComplate, setLoadComplate] = useState(0);
  let archiveListFn;
  const listNum = 0;

  const { data, loading, refetch } = useQuery(archiveQuery, {
    variables: { page: nowPageNum, limit },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    // action값 변경시 useEffect 실행

    return () => {
      if (action === 1) {
        // console.log('archiveListFn destroy');
        if (archiveListFn) archiveListFn.destroy();
        setPageNum(1);
        setLoadComplate(0);
      }
    };
  }, [action]);

  useEffect(() => {
    // 이미지 로드 완료시 useEffect 실행
    // console.log('imgLoadComplate', imgLoadComplate);
    // console.log('limit', limit);
    // console.log('action', action);
    if (
      action === 1 &&
      imgLoadComplate === data.seePortpolios.portpolios.length
    ) {
      // console.log('masonryFn');
      archiveListFn = masonryFn(archiveList);
    }

    return () => {
      // console.log('useEffect 02 return');
      if (action === 1 && archiveListFn) {
        archiveListFn.destroy();
      }
    };
  }, [imgLoadComplate]);

  if (action === 1 && !loading) {
    // console.log('loading end');
    return (
      <div className="archiveWrap">
        {!loading && <TagMenu refetch={refetch} />}

        <div className="archiveListWrap">
          <ul className="grid" ref={archiveList}>
            {data &&
              data.seePortpolios.portpolios.map(portpolioData => (
                <li key={portpolioData._id} className="grid-item">
                  <Link to={`/archiveDetail/${portpolioData._id}`}>
                    <img
                      src={portpolioData.thumbImg}
                      onLoad={() => setLoadComplate(imgLoadComplate + 1)}
                      alt={portpolioData.title}
                    />

                    <div className="itemFrame">
                      <div className="inner">
                        <span className="tits">{portpolioData.title}</span>
                        <span className="tags">
                          {portpolioData.tags.length > 0 &&
                            portpolioData.tags.map((item, i) => {
                              if (i === 0) {
                                return item.value;
                              }
                              return `, ${item.value}`;
                            })}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        {data.seePortpolios.totalPages > 1 && (
          <Paging
            nowPageNum={nowPageNum}
            totalPage={data.seePortpolios.totalPages}
            setPageNum={setPageNum}
            setLoadComplate={setLoadComplate}
          />
        )}
      </div>
    );
  }
  return '';
};

Archive.propTypes = {
  action: PropTypes.number.isRequired,
};

export default Archive;
