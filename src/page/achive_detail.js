import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { achiveDetailQuery } from 'apollo/achiveQuery';
import { swiperFn } from 'common';

const AchiveDetail = ({
  match: {
    params: { portpolioId },
  },
}) => {
  console.log('achiveDetail ID', portpolioId);
//   const topSwiperEl  = useRef(null);
  const { data, loading } = useQuery(achiveDetailQuery, {
    variables: { id : portpolioId },
  });
//   let topSwiper;

//   useEffect(()=>{
//     topSwiper = swiperFn(topSwiperEl.current);
//   });

  if (!loading) {
    return (
      <div className="contents achiveDetail">
        <span id="jumpConts" className="blind" tabIndex="achiveDetail">
          상세 본문영역
        </span>

        <Link to="/" className="subMenu01">
          <em>&lt;Archive&gt;</em>
        </Link>

        <div style={{ display: 'block', width: '100%', height: 'auto' }}>
          <h2 className="blind">Archive</h2>

          <div className="achiveDescriptWrap">
            <div className="descriptThum">
              <button type="button" className="btnPrev"><em className="blind">이전</em></button>
              <ul className="swiper-wrapper">
                {data && data.detailPortpolio.files.map(imgUrl =>(
                  <li className="swiper-slide">
                    <img
                      src={imgUrl.url}
                      alt=""
                    />
                  </li>
                ))}
              </ul>
              <button type="button" className="btnNext"><em className="blind">다음</em></button>
            </div>

            <div className="descriptBox">
              <strong className="tit">
                {}
              </strong>

              <p className="date">Date : 2018/7/23</p>
              <p className="tag">IDENTITY, LOGO</p>

              <div className="txt">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                congue velit pellentesque nisl eleifend, quis aliquet felis
                lobortis. Etiam venenatis ex ac tristique lobortis. Sed
                sollicitudin lobortis nisi, aliquet pretium augue feugiat non.
              </div>
            </div>
          </div>

          {/* <div className="achiveMoreBox">
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

        <Link to="/" className="subMenu02">
          <em>&lt;About&gt;</em>
        </Link>
        <Link to="/" className="subMenu03">
          <em>&lt;Contact&gt;</em>
        </Link>
      </div>
    );
  }
  return '';
};

export default AchiveDetail;
