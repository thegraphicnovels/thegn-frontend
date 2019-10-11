import React, { useRef, useEffect } from 'react';
import { swiperFn } from 'common';

const Mainswiper = ({ action }) => {
  const swiperEl = useRef(null);
  let mainSwiper;

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
          <li
            className="swiper-slide"
            style={{
              backgroundImage: "url('resources/images/temp/temp_main01.jpg')",
            }}
          >
            <span className="imgTxt">
              <img
                src="resources/images/temp/img_main_swipe_txt01.png"
                alt="MAKE SOME NOISE COMMON GROUND 3RD ANNIVERSARY POSTER, IDENTITY, EI, DRAFT"
              />
            </span>
          </li>
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
          <li
            className="swiper-slide"
            style={{
              backgroundImage: "url('resources/images/temp/temp_main03.jpg')",
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

export default Mainswiper;
