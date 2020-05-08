import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { archiveQuery } from '../apollo/archiveQuery';
import TagMenu from '../components/tag_menu';
import Paging from '../components/paging';
import { masonryFn } from '../common';

const Archive = ({ action }) => {
  const limit = 10;
  const archiveList = useRef(null);
  const [tag, setTag] = useState('');
  const [nowPageNum, setPageNum] = useState(1);
  const [imgLoadComplate, setLoadComplate] = useState(0);

  const { data, loading, refetch } = useQuery(archiveQuery, {
    variables: { page: nowPageNum, limit },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    // action값 변경시 useEffect 실행
    return () => {
      if (action === 1) {
        // console.log('archiveListFn destroy');
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
    let archiveListFn = null;
    if (
      action === 1 &&
      data &&
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
  }, [imgLoadComplate, data, action]);

  if (action === 1 && !loading) {
    // console.log('loading end');
    return (
      <>
        {tag !== '' && data && (
          <div className="registBox">
            <h2>
              {data.seePortpolios.portpolios.length} SEARCH RESULTS FOR TAG :{' '}
              {tag}
            </h2>
          </div>
        )}
        {/* <div className="registBox">
			<h2>
			{tag !== '' && data
				? `${data.seePortpolios.portpolios.length} SEARCH RESULTS FOR TAG : ${tag}`
				: ''}
			</h2>
		</div> */}
        <div className="archiveWrap">
          <TagMenu refetch={refetch} setTag={setTag} />
          <div className="archiveListWrap">
            <ul className="grid" ref={archiveList}>
              {data &&
                data.seePortpolios.portpolios.map((portpolioData, i) => (
                  <li key={portpolioData._id} className="grid-item">
                    <Link to={`/archiveDetail/${portpolioData._id}`}>
                      <span className="img">
                        <img
                          id={`achiveImg${i}`}
                          src={portpolioData.thumbImg}
                          // onLoad={(e) => loadImagesFn(e, imgLoadComplate + 1)}
                          onLoad={() => setLoadComplate(imgLoadComplate + 1)}
                          alt={portpolioData.title}
                        />
                      </span>

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
          {data && data.seePortpolios.totalPages > 1 && (
            <Paging
              nowPageNum={nowPageNum}
              totalPage={data.seePortpolios.totalPages}
              setPageNum={setPageNum}
              setLoadComplate={setLoadComplate}
            />
          )}
        </div>
      </>
    );
  }
  return '';
};

Archive.propTypes = {
  action: PropTypes.number.isRequired,
};

export default Archive;
