import React, { useRef, useEffect, useState, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { archiveQuery } from 'apollo/archiveQuery';
import { masonryFn } from 'common';
import Paging from 'components/paging';
import TagMenu from 'components/tag_menu';
import NaviList from 'components/naviList';
import { Store } from 'store';

const ArchiveSearch = ({ history, location: { search } }) => {
  const limit = 10;
  const archiveList = useRef(null);
  const [nowPageNum, setPageNum] = useState(1);
  const [imgLoadComplate, setLoadComplate] = useState(0);
  const keyword = new URLSearchParams(search).get('keyword');
  const [oldKeyword, setOldKeyword] = useState('');

  const { data, loading, refetch } = useQuery(archiveQuery, {
    variables: { page: nowPageNum, limit, keyword },
    fetchPolicy: 'network-only',
    onCompleted: () => {
      if (oldKeyword !== keyword) {
        setOldKeyword(keyword);
        setPageNum(1);
      }
    },
  });

  const { setAction } = useContext(Store); // Context Api Store 에 주입된 value 사용

  useEffect(() => {
    window.onpopstate = e => {
      setAction(1);
      history.push('/');
    };
  }, [history, setAction]);

  let archiveListFn;
  useEffect(() => {
    return () => {
      // console.log('archiveListFn destroy');
      if (archiveListFn) archiveListFn.destroy();
      setPageNum(1);
      setLoadComplate(0);
    };
  }, [archiveListFn]);

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
      <div className="contents searchResultWrap">
        <span id="jumpConts" className="blind">
          상세 본문영역
        </span>

        <NaviList />

        <Link to="/" onClick={() => setAction(1)} className="subMenu01">
          <em>Archive</em>
        </Link>

        <div
          className="pageWrap active"
          style={{ display: 'block', width: '100%', height: 'auto' }}
        >
          <h2 className="blind">Search result</h2>
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
            {data && data.seePortpolios.totalPages > 1 && (
              <Paging
                nowPageNum={nowPageNum}
                totalPage={data.seePortpolios.totalPages}
                setPageNum={setPageNum}
                setLoadComplate={setLoadComplate}
              />
            )}
          </div>
        </div>

        <Link to="/" onClick={() => setAction(2)} className="subMenu02">
          <em>About</em>
        </Link>
        <Link to="/" onClick={() => setAction(3)} className="subMenu03">
          <em>Contact</em>
        </Link>
      </div>
    );
  }
  return '';
};

export default withRouter(ArchiveSearch);
