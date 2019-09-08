import React from "react";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 40px;
  margin-bottom: 10px;
`;

const Box = styled.div`
  ${props => props.theme.whiteBox}
  border-radius: 0px;
  width: 100%;
  max-width: 350px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color: blue;
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

export default ({
  action,
  name,
  id,
  password,
  password2,
  setAction,
  onSubmit
}) => (
  <Wrapper>
    <Title>The GN ADMIN</Title>
    <Form>
      {action === "logIn" && (
        <>
          <form onSubmit={onSubmit}>
            <Input placeholder={"id"} {...id} />
            <Input placeholder={"password"} {...password} type="password" />
            <Button text={"Log in"} />
          </form>
        </>
      )}
      {action === "signUp" && (
        <>
          <form onSubmit={onSubmit}>
            <Input placeholder={"id"} {...id} />
            <Input placeholder={"name"} {...name} />
            <Input placeholder={"Password"} {...password} type="password" />
            <Input
              placeholder={"Confirm Password"}
              {...password2}
              type="password"
            />
            <Button text={"Sign up"} />
          </form>
        </>
      )}
    </Form>
    {action !== "confirm" && (
      <StateChanger>
        {action === "logIn" ? (
          <>
            Don't have an account?{" "}
            <Link onClick={() => setAction("signUp")}>Sign up</Link>
          </>
        ) : (
          <>
            Have an account?{" "}
            <Link onClick={() => setAction("logIn")}>Log in</Link>
          </>
        )}
      </StateChanger>
    )}
  </Wrapper>
);
