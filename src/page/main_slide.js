import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { swiperFn } from 'common';
import { useQuery } from '@apollo/react-hooks';
import { mainBannerQuery } from 'apollo/mainBannerQuery';

const Mainswiper = ({ action }) => {
  const swiperEl = useRef(null);
  let mainSwiper;

  const { data: mainBannerData, loading } = useQuery(mainBannerQuery);

  useEffect(() => {
    if (action === 0) {
      mainSwiper = swiperFn(swiperEl.current);
    }

    return () => {
      if (action === 0) {
        console.log('main swiper destroy');
        mainSwiper.destroy();
      }
    };
  }, [action]);

  if (action === 0) {
    return (
      <div className="mainSwipeWrap" ref={swiperEl}>
        <button type="button" className="btnPrev">
          <em className="blind">이전</em>
        </button>
        <ul className="swiper-wrapper">
          {/* {mainBannerData &&
            mainBannerData.seeBanners.map(banner =>
              banner.files.map((file, index) => (
                <li
                  key={index}
                  className="swiper-slide"
                  style={{
                    backgroundImage: `url(${file.url})`,
                  }}
                >
                  <span className="imgTxt">
                    <img
                      src="resources/images/temp/img_main_swipe_txt01.png"
                      alt={banner.portpolio.tags.map(tag => tag.value)}
                    />
                  </span>
                </li>
              )),
            )} */}
          <li
            className="swiper-slide"
            style={{
              backgroundImage: "url('resources/images/temp/temp_main02.jpg')",
            }}
          >
            <span className="imgTxt">
              <img
                src="resources/images/temp/img_main_swipe_txt01.png"
                alt="MAKE SOME NOISE COMMON GROUND 3RD ANNIVERSARY POSTER, IDENTITY, EI, DRAFT"
              />
            </span>
          </li>
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
