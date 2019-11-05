import React, { useRef, useEffect, useContext, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import {
  archiveDetailQuery,
  archiveViewsQuery,
  archiveListQuery,
} from 'apollo/archiveQuery';
import { swiperFn, formatDate } from 'common';
import NaviList from 'components/naviList';
import RelatedList from 'components/related_list';
import { Store } from 'store';

const ArchiveDetail = ({
  history,
  match: {
    params: { portpolioId },
  },
}) => {
  //   console.log('archiveDetail ID', portpolioId);
  const { logged, setAction } = useContext(Store);
  const topSwiperEl = useRef(null);

  const [related, setRelated] = useState([]);

  // 조회수 update
  const [archiveViewsMutation] = useMutation(archiveViewsQuery);

  // 연관 tag Archive
  const [relatedArchiveFn] = useLazyQuery(archiveListQuery, {
    fetchPolicy: 'network-only',
    onCompleted: async ({ seePortpoliosList }) => {
      setRelated(seePortpoliosList);
    },
  });

  const { data, loading } = useQuery(archiveDetailQuery, {
    variables: { id: portpolioId },
    fetchPolicy: 'network-only',
    onCompleted: ({ detailPortpolio }) => {
      archiveViewsMutation({ variables: { id: portpolioId } });
      const { tags } = detailPortpolio;
      if (tags.length > 0) {
        const tagIds = [];
        for (let i = 0; i < tags.length; i++) {
          tagIds.push(tags[i]._id);
        }
        relatedArchiveFn({ variables: { tags: tagIds } });
      }
    },
  });

  // 뒤로가기 클릭시
  useEffect(() => {
    window.onpopstate = e => {
      setAction(1);
      history.push({ pathname: '/' });
    };
  }, [history, setAction]);

  useEffect(() => {
    if (!loading) {
      swiperFn(topSwiperEl.current);
    }
  }, [loading]);

  if (!loading) {
    return (
      <div className="contents archiveDetail">
        <span id="jumpConts" className="blind">
          상세 본문영역
        </span>

        <NaviList />

        <Link to="/" onClick={() => setAction(1)} className="subMenu01">
          <em>Archive</em>
        </Link>

        <div style={{ display: 'block', width: '100%', height: 'auto' }}>
          <h2 className="blind">Archive</h2>
          <div className="archiveDescriptWrap">
            <div className="descriptThum" ref={topSwiperEl}>
              <button type="button" className="btnPrev">
                <em className="blind">이전</em>
              </button>
              <ul className="swiper-wrapper">
                {data &&
                  data.detailPortpolio.files.map(imgUrl => (
                    <li key={imgUrl._id} className="swiper-slide">
                      <span>
                        <img src={imgUrl.url} alt="" />
                      </span>
                    </li>
                  ))}
              </ul>
              <button type="button" className="btnNext">
                <em className="blind">다음</em>
              </button>
            </div>

            <div className="descriptBox">
              {logged && (
                <div className="btnDescriptBox">
                  <Link
                    to={`/manage/edit/archive/${data.detailPortpolio._id}`}
                    className="btnCustm02"
                  >
                    <span>수정</span>
                  </Link>
                </div>
              )}
              <strong className="tit">{data.detailPortpolio.title}</strong>

              <p className="date">
                {formatDate(data.detailPortpolio.updateAt)}
              </p>
              <p className="tag">
                {data.detailPortpolio.tags &&
                  data.detailPortpolio.tags.map((tag, i) => {
                    if (i === 0) {
                      return `${tag.value}`;
                    }
                    return `, ${tag.value}`;
                  })}
              </p>

              <div className="txt">{data.detailPortpolio.description}</div>
            </div>
          </div>
          {related.length > 0 &&
            (related.length === 1 ? (
              portpolioId !== related[0]._id && (
                <RelatedList related={related} portpolioId={portpolioId} />
              )
            ) : (
              <RelatedList related={related} portpolioId={portpolioId} />
            ))}
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

export default withRouter(ArchiveDetail);
