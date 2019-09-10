import React from "react";
import styled from "styled-components";

const Hr = styled.hr`
  margin-top: 5%;
  width: 90%;
  border: 0;
  height: 1px;
  background: #ffffff;
`;

const Container = styled.div`
  min-height: 100%;
`;

const Title = styled.div`
  font-family: "Work Sans", sans-serif;
  font-weight: bold;
  font-size: 3vmin;
  color: #99ff8d;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 5%;
`;

const Wedream = styled.div`
  width: 50%;
  font-family: "Work Sans", sans-serif;
  font-weight: bold;
  font-size: 9.3vmin;
  line-height: 115%;
  color: #99ff8d;
  padding-left: 5%;
  padding-right: 1%;
  padding-top: 5%;
`;

const Footer = styled.div`
  font-family: "Work Sans", sans-serif;
  font-weight: bold;
  font-size: 5vmin;
  line-height: 130%;
  color: #ffffff;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 5%;
  padding-bottom: 10%;
  word-break: keep-all;
`;

const Copy = styled.div`
  position: relative;
  bottom: 0;
  right: 5%;
  margin-bottom: 2%;
  text-align: right;
  font-family: "Work Sans", sans-serif;
  font-weight: 500;
  font-size: 2.4vmin;
  line-height: 125%;
  color: #ffffff;
`;

const Home = () => {
  return (
    <>
      <Container>
        <Title class="title">
          The Graphic Novels <font color={"ffffff"}>Now Renewal</font>
        </Title>
        <Hr />

        <Wedream>
          We dream,
          <br />
          explore and create progressive
          <br />
          design
        </Wedream>
        <Hr />

        <Footer>
          디자인 스튜디오 | 더그래픽노블스 The Graphic Novels
          <br />
          A. 서울시 광진구 자양로 214 4F 04976 | 214, Jayang-ro, Gwangjin-gu,
          Seoul, Republic of Korea
          <br />
          <font color={"ff5d5d"}>
            T. 02-455-9199
            <br />
            E. the-gn@the-gn.com <br />
          </font>
        </Footer>
      </Container>
      <Copy>ⓒ The Graphic Novels All rights reserved</Copy>
    </>
  );
};

export default Home;
