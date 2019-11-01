import React, { useEffect, useState, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { archiveListQuery } from 'apollo/archiveQuery';
import TagMenu from 'components/tag_menu';
import NaviList from 'components/naviList';
import { Store } from 'store';

const ArchiveSearch = ({ history, location: { search } }) => {
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
    window.onpopstate = e => {
      setAction(1);
      history.push('/');
    };
  }, [history, setAction]);

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

        <div className="registBox">
          <h2>
            {data && data.seePortpoliosList.length} SEARCH RESULTS FOR:{' '}
            {keyword} {keyword && tag !== '' ? ` & TAG: ${tag}` : tag}
          </h2>
        </div>

        <div
          className="pageWrap active"
          style={{ display: 'block', width: '100%', height: 'auto' }}
        >
          <div className="archiveWrap">
            <TagMenu refetch={refetch} setTag={setTag} />

            <div className="archiveListWrap">
              <ul className="grid">
                {data &&
                  data.seePortpoliosList.map(portpolioData => (
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
