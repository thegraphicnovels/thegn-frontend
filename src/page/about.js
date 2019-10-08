import React from 'react';

const About = function({action}) {
	if(action === 2) {
		return (
			<div className="aboutWrap">
				<div className="aboutIntro">
					<span className="aboutLogo"><img src="resources/images/about_logo.png" alt="" /></span>
					<div className="intro">
						We describe ourselves as creative consultants.
						Not designers, or writers, or advertisers, or brand strategists but all of these and more. 
						While our design roots were established with print associated work, 
						the growth of our business has branched out to include branding, packaging and signage. 
						More recently, we have made the transition to include web design as an extension of our design services, 
						however design for print remains our first love and is the core of our business – manifested mostly 
						into design for branding, packaging and associated collateral.
					</div>
				</div>
				<div className="aboutLogo02"><em className="blind">We dream, explore and create progressive design</em></div>
			</div>
		)
	}else{
		return '';
	}
}

export default About;
