import React from 'react';

const Contact = function({action}) {
	if(action === 3) {
		return (
			<div className="contactWrap">
				<div className="contactInfoBox">
					<span className="img"><img src="resources/images/img_contact.jpg" alt="" /></span>
					<div className="infoBox">
						<ul className="contcInfo">
							<li>
								<strong>E-Mail</strong>
								<span>
									&lt;the-gn@the-gn.com&gt;
								</span>
							</li>
							<li>
								<strong>Phone</strong>
								<span>
									&lt;02-455-9199&gt;
								</span>
							</li>
							<li>
								<strong>FAX</strong>
								<span>
									&lt;02-455-9199&gt;
								</span>
							</li>
						</ul>

						<div className="corp">
							<p>디자인 스튜디오 | 더그래픽노블스</p>
							<p>The Graphic Novels</p>
						</div>
						<address>
							A. 서울시 광진구 자양로 214 4F 04976  |   214, Jayang-ro, Gwangjin-gu, Seoul, Republic of Korea
						</address>
					</div>
				</div>
			</div>
		)
	}else{
		return '';
	}
}

export default Contact;
