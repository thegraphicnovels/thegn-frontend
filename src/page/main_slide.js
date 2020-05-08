import React, { useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { swiperFn } from 'common';
import { useQuery } from '@apollo/react-hooks';
import { Store } from 'store';
import { mainBannerQuery } from '../Apollo/mainBannerQuery';

const Mainswiper = ({ action }) => {
  const swiperEl = useRef(null);
  // const swipeitemEl = useRef(null);
  const { headerEl, footEl, isDevice } = useContext(Store);

  const { data: mainBannerData, loading } = useQuery(mainBannerQuery);

  useEffect(() => {
    let mainSwiper;
    if (action === 0 && !loading) {
      mainSwiper = swiperFn(swiperEl.current);

      swiperEl.current.addEventListener('mouseover', () => {
        mainSwiper.autoStop();
      });
      swiperEl.current.addEventListener('mouseout', () => {
        mainSwiper.autoStart();
      });

      console.log('isDevice = ', isDevice);

      if (isDevice === 'MO') {
        const swipeitemEl = swiperEl.current.children[1].children;
        const winH = window.innerHeight;
        const headH = headerEl.current.clientHeight;
        const footH = footEl.current.clientHeight;
        for (let i = 0; i < swipeitemEl.length; i++) {
          swipeitemEl[i].style.height = `${winH - (headH + footH)}px`;
        }
      }
    }

    return () => {
      if (action === 0 && mainSwiper) {
        // console.log('main swiper destroy');
        mainSwiper.destroy();
      }
    };
  }, [action, loading]);

  // if(!loading) console.log(mainBannerData);

  if (action === 0 && !loading) {
    return (
      <div className="mainSwipeWrap" ref={swiperEl}>
        <button type="button" className="btnPrev">
          <em className="blind">이전</em>
        </button>
        <ul className="swiper-wrapper">
          {mainBannerData &&
            mainBannerData.seeBanners.map((banner) =>
              banner.files.map(
                (file, index) =>
                  banner.portpolio && (
                    <li
                      // ref={swipeitemEl}
                      key={index}
                      className="swiper-slide"
                      style={{
                        backgroundImage: `url(${file.url})`,
                      }}
                    >
                      <Link
                        to={`/archiveDetail/${banner.portpolio._id}`}
                        className="imgTxt"
                      >
                        <div className="imgTxtIn">
                          <strong className="tits">
                            {banner.portpolio.title}
                          </strong>
                          {/* {banner.portpolio.tags.length > 0 && (
									<span className="tags">
									{banner.portpolio.tags.map((tag, i) => {
										if (i === 0) {
										return tag.value;
										}
										return `, ${tag.value}`;
									})}
									</span>
								)} */}
                        </div>
                      </Link>
                    </li>
                  ),
              ),
            )}
        </ul>
        <button type="button" className="btnNext">
          <em className="blind">다음</em>
        </button>
      </div>
    );
  }
  return '';
};

Mainswiper.propTypes = {
  action: PropTypes.number.isRequired,
};

export default Mainswiper;
