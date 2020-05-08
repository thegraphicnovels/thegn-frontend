import React from 'react';
import PropTypes from 'prop-types';
import MapComponent from './map';

const Contact = ({ action }) => {
	if (action === 3) {
		return (
			<div className="contactWrap">
				<div className="contactInfoBox">
					<div className="infoInner">
						<strong>
							디자인 스튜디오<br></br>
							<span>더그래픽노블스</span> 
						</strong>
						<h1>The Graphic Novels</h1>
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
							</ul>

							<address>서울시 광진구 자양로 214 4F 04976
								<span className="addrEn">214, Jayang-ro, Gwangjin-gu, Seoul, Republic of Korea</span>
							</address>
						</div>
					</div>
				</div>
				<MapComponent />
			</div>
		);
	}
	return '';
};

Contact.propTypes = {
	action: PropTypes.number.isRequired,
};

export default Contact;
