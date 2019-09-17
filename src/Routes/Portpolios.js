import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "Components/Loader";
// import FatText from "Components/FatText";
import SquarePost from "Components/SquarePost";

const POST_QUERY = gql`
  {
    seePortpolios {
      _id
      title
      description
      user {
        _id
        name
      }
      files {
        _id
        url
      }
    }
  }
`;

const PostSection = styled.div`
  margin: 100px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: 160px;
  grid-auto-rows: 160px;
`;

const Wrapper = styled.div`
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Portpolios = () => {
  const { data, loading } = useQuery(POST_QUERY);

  if (loading === true) {
    return (
      <Wrapper>
        <Loader />;
      </Wrapper>
    );
  } else if (!loading && data) {
    return (
      <Wrapper>
        <PostSection>
          <Loader />
        </PostSection>
      </Wrapper>
    );
  }
};

export default Portpolios;
