/* global kakao */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Contact = ({ action }) => {
  //   useEffect(() => {

  //   }, []);
  if (action === 3) {
    kakao.maps.load(() => {
      const option = {
        center: new kakao.maps.LatLng(37.5460744, 127.086625),
        level: 3,
      };
      const el = document.getElementById('map');

      // 지도생성
      const map = new kakao.maps.Map(el, option);

      // geocoder라이브러리
      const geocoder = new kakao.maps.services.Geocoder();
      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(
        '서울시 광진구 자양로 214 4F 04976',
        (result, status) => {
          // 정상적으로 검색이 완료됐으면
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            const marker = new kakao.maps.Marker({
              map,
              position: coords,
            });

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            const infowindow = new kakao.maps.InfoWindow({
              content:
                '<div style="width:150px;text-align:center;padding:6px 0;">The Graphic Novels</div>',
            });
            infowindow.open(map, marker);

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
          }
        },
      );
      window.addEventListener('resize', () => {
        const moveLatLon = new kakao.maps.LatLng(37.5460744, 127.086625);
        map.setCenter(moveLatLon);
      });
    });
  }
  return (
    <div className="contactWrap">
      <div className="contactInfoBox">
        <div className="infoInner">
          <strong>
            디자인 스튜디오 <span>더그래픽노블스 The Graphic Novels</span>
          </strong>
          <div className="infoBox">
            <ul className="contcInfo">
              <li>
                <strong>E-Mail</strong>
                <span>&lt;the-gn@the-gn.com&gt;</span>
              </li>
              <li>
                <strong>Phone</strong>
                <span>&lt;02-455-9199&gt;</span>
              </li>
              {/* <li>
									<strong>FAX</strong>
									<span>&lt;02-455-9199&gt;</span>
								</li> */}
            </ul>

            {/* <div className="corp">
								<p>디자인 스튜디오 | 더그래픽노블스</p>
								<p>The Graphic Novels</p>
							</div> */}
            <address>
              서울시 광진구 자양로 214 4F 04976
              <span className="addrEn">
                214, Jayang-ro, Gwangjin-gu, Seoul, Republic of Korea
              </span>
            </address>
          </div>
        </div>
      </div>

      <div className="mapWrap" id="map" />
    </div>
  );
};

Contact.propTypes = {
  action: PropTypes.number.isRequired,
};

export default Contact;
