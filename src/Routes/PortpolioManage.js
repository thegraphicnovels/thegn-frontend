import React, { useState } from "react";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Tag from "Components/Tag";
import PortpolioUpload from "Components/PortpolioUpload";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Content = styled.div`
  padding: 20px;
  width: 600px;
`;

const PortpolioManage = ({
  history,
  match: {
    params: { portpolioId }
  }
}) => {
  const [active, setActive] = useState(0);

  return (
    <Wrapper>
      <Content>
        <Tabs defaultIndex={active}>
          <TabList>
            <Tab>Portpolio Upload</Tab>
            <Tab>Tag Edit</Tab>
          </TabList>

          <TabPanel>
            <PortpolioUpload
              history={history}
              setActive={setActive}
              portpolioId={portpolioId}
            />
          </TabPanel>
          <TabPanel>
            <Tag setActive={setActive} />
          </TabPanel>
        </Tabs>
      </Content>
    </Wrapper>
  );
};

export default PortpolioManage;
