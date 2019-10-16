import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import useInput from 'hook/useInput';

const LOGIN_USER = gql`
  mutation loginUser($id: String!, $password: String!) {
    loginUser(id: $id, password: $password)
  }
`;

const LOCAL_LOG_IN = gql`
  mutation onLogin($token: String!) {
    onLogin(token: $token) @client
  }
`;

const Contact = ({ action }) => {
  // useInput validation
  const validation = value => {
    if (value.length > 10) {
      return false;
    }
    return true;
  };

  // react hook 용 input 제어
  const id = useInput('admin', validation);
  const password = useInput('1234');

  // apollo Login Mutation, variables 는 따로 뺄 수 있다.
  const [loginUserMutation] = useMutation(LOGIN_USER, {
    variables: { id: id.value, password: password.value },
  });
  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

  // Login Function
  const loginFn = async () => {
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

  if (action === 3) {
    return (
      <div className="contactWrap">
        <div className="contactInfoBox">
          <span className="img">
            <img src="resources/images/img_contact.jpg" alt="" />
          </span>
          <div className="infoBox">
            <input
              value={id.value}
              onChange={id.onChange}
              placeholder="id"
              type="text"
            />
            <input
              value={password.value}
              onChange={password.onChange}
              placeholder="password"
              type="password"
            />
            <button type="button" onClick={() => loginFn()}>
              로그인
            </button>
            <ul className="contcInfo">
              <li>
                <strong>E-Mail</strong>

                <span>&lt;the-gn@the-gn.com&gt;</span>
              </li>
              <li>
                <strong>Phone</strong>
                <span>&lt;02-455-9199&gt;</span>
              </li>
              <li>
                <strong>FAX</strong>
                <span>&lt;02-455-9199&gt;</span>
              </li>
            </ul>

            <div className="corp">
              <p>디자인 스튜디오 | 더그래픽노블스</p>
              <p>The Graphic Novels</p>
            </div>
            <address>
              A. 서울시 광진구 자양로 214 4F 04976 | 214, Jayang-ro,
              Gwangjin-gu, Seoul, Republic of Korea
            </address>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

Contact.propTypes = {
  action: PropTypes.number.isRequired,
};

export default Contact;
