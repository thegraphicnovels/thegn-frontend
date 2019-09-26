import React, { useState } from "react";
import { Tabs } from "antd";
import styled from "styled-components";
import UploadTest from "./UploadTest";
import Tag from "Components/Tag";

const { TabPane } = Tabs;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Content = styled.div`
  padding: 20px;
`;

const Tab = () => {
  const [active, setActive] = useState("1");

  const onTabClick = key => {
    setActive(key);
  };

  return (
    <Wrapper>
      <Content>
        <Tabs tabPosition={"left"} activeKey={active} onTabClick={onTabClick}>
          <TabPane tab="Portpolio Upload" key="1">
            <UploadTest setActive={setActive} />
          </TabPane>
          <TabPane tab="Tag Edit" key="2">
            <Tag setActive={setActive} />
          </TabPane>
        </Tabs>
      </Content>
    </Wrapper>
  );
};

export default Tab;
