import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const RelatedList = ({ related, portpolioId }) => {
  console.log(related);

  return (
    <div className="archiveMoreBox">
      <h3>MORE PROJECT</h3>

      <button type="button" className="btnPrev">
        <em className="blind">이전</em>
      </button>
      <div className="moreListWrap">
        <ul className="swiper-wrapper">
          {related.map(relatedData => {
            if (portpolioId !== relatedData._id) {
              return (
                <li key={relatedData._id} className="swiper-slide">
                  <Link to={`/archiveDetail/${relatedData._id}`}>
                    <img src={relatedData.thumbImg} alt={relatedData.title} />

                    <div className="itemFrame">
                      <div className="inner">
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
                  </Link>
                </li>
              );
            }
            return '';
          })}
        </ul>
      </div>
    </div>
  );
};

RelatedList.propTypes = {
  related: PropTypes.array.isRequired,
  portpolioId: PropTypes.string.isRequired,
};

export default RelatedList;
