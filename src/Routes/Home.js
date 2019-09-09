import React from "react";
import styled from "styled-components";

const Title = styled.div`
  font-family: "Work Sans", sans-serif;
  font-weight: bold;
  font-size: 2vmin;
  color: #99ff8d;
  padding-left: 5%;
  padding-top: 3%;
`;

const Wedream = styled.div`
  width: 50%;
  font-family: "Work Sans", sans-serif;
  font-weight: bold;
  font-size: 8vmin;
  line-height: 115%;
  color: #ffffff;
  padding-left: 5%;
  padding-right: 1%;
  padding-top: 5%;
`;

const Footer = styled.div`
  font-family: "Work Sans", sans-serif;
  font-weight: bold;
  font-size: 8vmin;
  line-height: 125%;
  color: #99ff8d;
  padding-left: 5%;
  padding-top: 5%;
`;

const Home = () => {
  return (
    <>
      <Title class="title">
        The Graphic Novels <font color={"ffffff"}>Now Renewal</font>
      </Title>

      <Wedream>
        We dream,
        <br />
        explore and create progressive
        <br />
        design
      </Wedream>

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
        ⓒ The Graphic Novels All rights reserved
      </Footer>
    </>
  );
};

export default Home;
