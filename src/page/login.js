import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { placeholderFn } from 'common';

const Login = ({isPopOpen, setPopOpen})=> {
	const placeEl01 = useRef(null);
	const placeEl02= useRef(null);

	useEffect(()=> {
		placeholderFn(placeEl01.current);
		placeholderFn(placeEl02.current);
	});

	return(
		<article className="layerWrap" id="loginLayer" style={{display:isPopOpen}}>
			<div className="layerpop" style={{width:'400px'}}>
				<header>
					<h1>Login</h1>
				</header>

				<div className="layerConts">
					<ul className="loginWrap">
						<li>
							<label htmlFor="loginID" ref={placeEl01}>
								<span className="placeholder">아이디를 입력하세요.</span>
								<input type="text" id="loginID" />
							</label>
						</li>
						<li>
							<label htmlFor="loginPW" ref={placeEl02}>
								<span className="placeholder">비밀번호를 입력하세요.</span>
								<input type="password" id="loginPW" />
							</label>
						</li>
					</ul>
				</div>

				<div className="layerBtn">
					<button type="button">확인</button>
				</div>

				<button type="button" className="btnClose" onClick={()=> setPopOpen('none')}><em>닫기</em></button>
			</div>
		</article>
	);
}

Login.propTypes = {
	isPopOpen : PropTypes.string.isRequired,
	setPopOpen : PropTypes.func.isRequired,
}

export default Login;