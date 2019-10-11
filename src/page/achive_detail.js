import React from 'react';
import { Link } from 'react-router-dom';

const AchiveDetail = ({
  action,
  match: {
    params: { portpolioId },
  },
}) => {
  console.log(portpolioId);
  if (action === 1) {
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
              <button type="button" className="btnPrev">
                <em className="blind">이전</em>
              </button>
              <ul className="swiper-wrapper">
                <li className="swiper-slide">
                  <img
                    src="resources/images/temp/temp_deatil01_01.jpg"
                    alt=""
                  />
                </li>
                <li className="swiper-slide">
                  <img
                    src="resources/images/temp/temp_deatil01_02.jpg"
                    alt=""
                  />
                </li>
                <li className="swiper-slide">
                  <img
                    src="resources/images/temp/temp_deatil01_03.jpg"
                    alt=""
                  />
                </li>
              </ul>
              <button type="button" className="btnNext">
                <em className="blind">다음</em>
              </button>
            </div>

            <div className="descriptBox">
              <strong className="tit">
                MAKE SOME NOISE COMMON GROUND 3RD ANNIVERSARY
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

          <div className="achiveMoreBox">
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
          </div>
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
