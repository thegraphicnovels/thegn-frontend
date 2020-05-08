import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { swiperFn } from 'common';

const RelatedList = ({ related, portpolioId }) => {
  const relatedEl = useRef(null);

  useEffect(() => {
    const swipeFnc = swiperFn(relatedEl.current);
    return () => {
      if (swipeFnc) {
        swipeFnc.destroy();
      }
    };
  });

  return (
    <div className="archiveMoreBox">
      <h3>MORE PROJECT</h3>

      <div className="moreListWrap" ref={relatedEl}>
        <button type="button" className="btnPrev">
          <em className="blind">이전</em>
        </button>
        <ul className="swiper-wrapper">
          {related.map((relatedData) => {
            if (portpolioId !== relatedData._id) {
              return (
                <li key={relatedData._id} className="swiper-slide">
                  <Link to={`/archiveDetail/${relatedData._id}`}>
                    <div className="relateItem">
                      <img src={relatedData.thumbImg} alt={relatedData.title} />
                      <div className="guideFrame">
                        <div className="guideInner">
                          <span className="tits">{relatedData.title}</span>
                          <span className="tags">
                            {relatedData.tags.length > 0 &&
                              relatedData.tags.map((item, i) => {
                                if (i === 0) {
                                  return item.value;
                                }
                                return `, ${item.value}`;
                              })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            }
            return '';
          })}
        </ul>
        <button type="button" className="btnNext">
          <em className="blind">다음</em>
        </button>
      </div>
    </div>
  );
};

RelatedList.propTypes = {
  related: PropTypes.array.isRequired,
  portpolioId: PropTypes.string.isRequired,
};

export default RelatedList;
