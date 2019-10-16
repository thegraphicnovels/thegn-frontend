import React from 'react';

const Login = ()=> {

	return(
		<article className="layerWrap" id="loginLayer">
			<div className="layerpop" style={{width:'400px'}}>
				<header>
					<h1>Login</h1>
				</header>

				<div className="layerConts">
					<ul className="loginWrap">
						<li>
							<label htmlFor="loginID">
								<span className="placeholder">아이디를 입력하세요.</span>
								<input type="text" id="loginID" />
							</label>
						</li>
						<li>
							<label htmlFor="loginPW">
								<span className="placeholder">비밀번호를 입력하세요.</span>
								<input type="password" id="loginPW" />
							</label>
						</li>
					</ul>
				</div>

				<div className="layerBtn">
					<button type="button">확인</button>
				</div>
			</div>
		</article>
	);
}

export default Login;