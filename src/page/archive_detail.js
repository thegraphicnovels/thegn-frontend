import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { archiveDetailQuery } from 'apollo/archiveQuery';
import { swiperFn, formatDate } from 'common';

const ArchiveDetail = ({
  match: {
    params: { portpolioId },
  },
  logged,
}) => {
  console.log('archiveDetail ID', portpolioId);
  let topSwiper;
  const topSwiperEl = useRef(null);
  const { data, loading } = useQuery(archiveDetailQuery, {
    variables: { id: portpolioId },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (!loading) {
      topSwiper = swiperFn(topSwiperEl.current);
    }
  }, [loading]);

  if (!loading) {
    console.log(data);
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
                      <img src={imgUrl.url} alt="" />
                    </li>
                  ))}
              </ul>
              <button type="button" className="btnNext">
                <em className="blind">다음</em>
              </button>
            </div>

            <div className="descriptBox">
              {logged && (
                <div style={{ display: 'flex', flexdirection: 'row' }}>
                  <Link to={`/manage/archive/${data.detailPortpolio._id}`}>
                    <button type="button">수정</button>
                  </Link>
                </div>
              )}
              <strong className="tit">{data.detailPortpolio.title}</strong>

              <p className="date">
                {formatDate(data.detailPortpolio.updateAt)}
              </p>
              <p className="tag">
                {data.detailPortpolio.tags &&
                  data.detailPortpolio.tags.map(tag => `${tag.value} `)}
              </p>

              <div className="txt">{data.detailPortpolio.description}</div>
            </div>
          </div>

          {/* <div className="archiveMoreBox">
				<h3>MORE PROJECT</h3>

				<button type="button" className="btnPrev">
				<em className="blind">이전</em>
				</button>
				<div className="moreListWrap">
				<div className="swiper-wrapper">
					<div className="swiper-slide">
					<ul>
						<li>
						<Link to="/">
							<img
							src="resources/images/temp/temp_deatil02_01.jpg"
							alt=""
							/>
							<div className="guideFrame">
							<div className="guideInner">
								<strong className="tit">
								MAKE SOME NOISE COMMON GROUND 3RD ANNIVERSARY
								</strong>
								<span className="tag">
								POSTER, IDENTITY, EI, DRAFT
								</span>
							</div>
							</div>
						</Link>
						</li>
						<li>
						<Link to="/">
							<img
							src="resources/images/temp/temp_deatil02_01.jpg"
							alt=""
							/>
							<div className="guideFrame">
							<div className="guideInner">
								<strong className="tit">
								MAKE SOME NOISE COMMON GROUND 3RD ANNIVERSARY
								</strong>
								<span className="tag">
								POSTER, IDENTITY, EI, DRAFT
								</span>
							</div>
							</div>
						</Link>
						</li>
						<li>
						<Link to="/">
							<img
							src="resources/images/temp/temp_deatil02_01.jpg"
							alt=""
							/>
							<div className="guideFrame">
							<div className="guideInner">
								<strong className="tit">
								MAKE SOME NOISE COMMON GROUND 3RD ANNIVERSARY
								</strong>
								<span className="tag">
								POSTER, IDENTITY, EI, DRAFT
								</span>
							</div>
							</div>
						</Link>
						</li>
					</ul>
					</div>
					<div className="swiper-slide">
					<ul>
						<li>
						<Link to="/">
							<img
							src="resources/images/temp/temp_deatil02_02.jpg"
							alt=""
							/>
							<div className="guideFrame">
							<div className="guideInner">
								<strong className="tit">
								MAKE SOME NOISE COMMON GROUND 3RD ANNIVERSARY
								</strong>
								<span className="tag">
								POSTER, IDENTITY, EI, DRAFT
								</span>
							</div>
							</div>
						</Link>
						</li>
						<li>
						<Link to="/">
							<img
							src="resources/images/temp/temp_deatil02_02.jpg"
							alt=""
							/>
							<div className="guideFrame">
							<div className="guideInner">
								<strong className="tit">
								MAKE SOME NOISE COMMON GROUND 3RD ANNIVERSARY
								</strong>
								<span className="tag">
								POSTER, IDENTITY, EI, DRAFT
								</span>
							</div>
							</div>
						</Link>
						</li>
						<li>
						<Link to="/">
							<img
							src="resources/images/temp/temp_deatil02_02.jpg"
							alt=""
							/>
							<div className="guideFrame">
							<div className="guideInner">
								<strong className="tit">
								MAKE SOME NOISE COMMON GROUND 3RD ANNIVERSARY
								</strong>
								<span className="tag">
								POSTER, IDENTITY, EI, DRAFT
								</span>
							</div>
							</div>
						</Link>
						</li>
					</ul>
					</div>
					<div className="swiper-slide">
					<ul>
						<li>
						<Link to="/">
							<img
							src="resources/images/temp/temp_deatil02_03.jpg"
							alt=""
							/>
							<div className="guideFrame">
							<div className="guideInner">
								<strong className="tit">
								MAKE SOME NOISE COMMON GROUND 3RD ANNIVERSARY
								</strong>
								<span className="tag">
								POSTER, IDENTITY, EI, DRAFT
								</span>
							</div>
							</div>
						</Link>
						</li>
						<li>
						<Link to="/">
							<img
							src="resources/images/temp/temp_deatil02_03.jpg"
							alt=""
							/>
							<div className="guideFrame">
							<div className="guideInner">
								<strong className="tit">
								MAKE SOME NOISE COMMON GROUND 3RD ANNIVERSARY
								</strong>
								<span className="tag">
								POSTER, IDENTITY, EI, DRAFT
								</span>
							</div>
							</div>
						</Link>
						</li>
						<li>
						<Link to="/">
							<img
							src="resources/images/temp/temp_deatil02_03.jpg"
							alt=""
							/>
							<div className="guideFrame">
							<div className="guideInner">
								<strong className="tit">
								MAKE SOME NOISE COMMON GROUND 3RD ANNIVERSARY
								</strong>
								<span className="tag">
								POSTER, IDENTITY, EI, DRAFT
								</span>
							</div>
							</div>
						</Link>
						</li>
					</ul>
					</div>
				</div>
				</div>
				<button type="button" className="btnNext">
				<em className="blind">다음</em>
				</button>
			</div> */}
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

export default ArchiveDetail;
