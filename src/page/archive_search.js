import React, { useEffect, useRef, useState, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { archiveListQuery } from '../apollo/archiveQuery';
import naviList from '../components/naviList';
import TagMenu from '../components/tag_menu';
import { Store } from '../store';
import { masonryFn } from '../common';

const ArchiveSearch = ({ history, location: { search } }) => {
  const archiveList = useRef(null);
  const [imgLoadComplate, setLoadComplate] = useState(0);
  const [tag, setTag] = useState('');
  const keyword = new URLSearchParams(search).get('keyword');

  useEffect(() => {
    setTag('');
  }, [keyword]);

  const { data, loading, refetch } = useQuery(archiveListQuery, {
    variables: { keyword },
    fetchPolicy: 'network-only',
  });

  const { setAction } = useContext(Store);

  useEffect(() => {
    setLoadComplate(0);
    window.onpopstate = (e) => {
      setAction(1);
      history.push('/');
    };
  }, [history, setAction]);

  useEffect(() => {
    let archiveListFn;
    if (imgLoadComplate) {
      // console.log('masonryFn');
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

        <naviList />

        <Link to="/" onClick={() => setAction(1)} className="subMenu01">
          <em>Archive</em>
        </Link>

        <div className="registBox">
          <h2>
            {data && data.seePortpoliosList.length} SEARCH RESULTS FOR:
            {keyword && tag !== '' ? ` ${keyword} & ${tag}` : ` ${keyword}`}
            <br />
          </h2>
        </div>

        <div
          className="pageWrap active"
          style={{ display: 'block', width: '100%', height: 'auto' }}
        >
          <div className="archiveWrap">
            <TagMenu refetch={refetch} setTag={setTag} />

            <div className="archiveListWrap">
              <ul className="grid" ref={archiveList}>
                {data &&
                  data.seePortpoliosList.map((portpolioData, i) => (
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
            {/* {data && data.seePortpolios.totalPages > 1 && (
							<Paging
								nowPageNum={nowPageNum}
								totalPage={data.seePortpolios.totalPages}
								setPageNum={setPageNum}
								setLoadComplate={setLoadComplate}
							/>
						)} */}
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
