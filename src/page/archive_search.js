import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { archiveQuery } from 'apollo/archiveQuery';
import { masonryFn } from 'common';
import Paging from 'components/paging';
import TagMenu from 'components/tag_menu';

const ArchiveSearch = ({
  history,
  match: {
    params: { keyword },
  },
}) => {
  const limit = 10;
  const archiveList = useRef(null);
  const [nowPageNum, setPageNum] = useState(1);
  const [imgLoadComplate, setLoadComplate] = useState(0);
  let archiveListFn;

  const { data, loading, refetch } = useQuery(archiveQuery, {
    variables: { page: nowPageNum, limit, keyword },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    window.onpopstate = e => {
      console.log(history);
      history.push('/');
      //   history.replace({ url: '/', state: { menuId: 1 } });
    };
  }, []);

  useEffect(() => {
    return () => {
      // console.log('archiveListFn destroy');
      if (archiveListFn) archiveListFn.destroy();
      setPageNum(1);
      setLoadComplate(0);
    };
  }, []);

  useEffect(() => {
    // 이미지 로드 완료시 useEffect 실행
    // console.log('imgLoadComplate', imgLoadComplate);
    // console.log('limit', limit);
    // console.log('action', action);
    if (data && imgLoadComplate === data.seePortpolios.portpolios.length) {
      archiveListFn = masonryFn(archiveList);
    }

    return () => {
      // console.log('useEffect 02 return');
      if (archiveListFn) {
        archiveListFn.destroy();
      }
    };
  }, [imgLoadComplate]);

  if (!loading) {
    return (
      <div className="contents archiveDetail">
        <span id="jumpConts" className="blind">
          상세 본문영역
        </span>

        <Link
          to={{ pathname: '/', state: { menuId: 1 } }}
          className="subMenu01"
        >
          <em>&lt;Archive&gt;</em>
        </Link>

        <div className="archiveWrap">
          <TagMenu refetch={refetch} />

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

        <Link
          to={{ pathname: '/', state: { menuId: 2 } }}
          className="subMenu02"
        >
          <em>&lt;About&gt;</em>
        </Link>
        <Link
          to={{ pathname: '/', state: { menuId: 3 } }}
          className="subMenu03"
        >
          <em>&lt;Contact&gt;</em>
        </Link>
      </div>
    );
  }
  return '';
};

export default ArchiveSearch;
