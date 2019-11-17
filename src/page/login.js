import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { useInput } from 'rooks';
import { LOGIN_USER, LOCAL_LOG_IN } from 'apollo/loginQuery';
import { placeholderFn } from 'common';

const Login = ({ isPopOpen, setPopOpen }) => {
  // useInput validation
  const validation = value => {
    if (value.length > 10) {
      return false;
    }
    return true;
  };

  // react hook 용 input 제어
  const id = useInput('admin', { validate: validation });
  const password = useInput('1234');

  // apollo Login Mutation, variables 는 따로 뺄 수 있다.
  const [loginUserMutation] = useMutation(LOGIN_USER, {
    variables: { id: id.value, password: password.value },
  });
  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

  const placeEl01 = useRef(null);
  const placeEl02 = useRef(null);

  useEffect(() => {
    if (isPopOpen === 'block') {
      placeholderFn(placeEl01.current);
      placeholderFn(placeEl02.current);
    }
  });

  // Login Function
  const loginFn = async e => {
    e.preventDefault();
    if (id.value !== '' && password.value !== '') {
      try {
        const {
          data: { loginUser: token },
        } = await loginUserMutation(); // Backend 를 타고 와야하기때문에 async / await 사용
        if (!token) {
          // 받아온 토큰이 없으면 계정을 만들라는 메시지
          console.log('You dont have an account yet, create one');
        } else {
          // 받아온 토큰이 있으면 LOCAL_LOG_IN mutation으로 localState의  onLogin 으로 logged를 true로 변경
          localLogInMutation({ variables: { token } });
        }
      } catch {
        // graphql 에러 => ID 또는 PW 가 틀릴때
        console.log("Can't request secret, try again");
      }
    }
  };

  return (
    <article
      className="layerWrap"
      id="loginLayer"
      style={{ display: isPopOpen }}
    >
      <div className="layerpop">
        <form onSubmit={loginFn}>
          <header>
            <h1>Login</h1>
          </header>

          <div className="layerConts">
            <ul className="loginWrap">
              <li>
                <label htmlFor="loginID" ref={placeEl01}>
                  <span className="placeholder">아이디를 입력하세요.</span>
                  <input
                    id="loginID"
                    value={id.value}
                    onChange={id.onChange}
                    type="text"
                  />
                  {/* <input type="text" id="loginID" /> */}
                </label>
              </li>
              <li>
                <label htmlFor="loginPW" ref={placeEl02}>
                  <span className="placeholder">비밀번호를 입력하세요.</span>
                  {/* <input type="password" id="loginPW" /> */}
                  <input
                    id="loginPW"
                    value={password.value}
                    onChange={password.onChange}
                    type="password"
                  />
                </label>
              </li>
            </ul>
          </div>

          <div className="layerBtn">
            <button type="submit">확인</button>
          </div>

          <button
            type="button"
            className="btnClose"
            onClick={() => setPopOpen('none')}
          >
            <em>닫기</em>
          </button>
        </form>
      </div>
    </article>
  );
};

Login.propTypes = {
  isPopOpen: PropTypes.string.isRequired,
  setPopOpen: PropTypes.func.isRequired,
};

export default Login;
