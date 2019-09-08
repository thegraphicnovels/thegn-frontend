import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useTitle } from "Hooks/useTitle";
import { useQuery } from "react-apollo-hooks";
import Loader from "Components/Loader";
import FatText from "Components/FatText";
import SquarePost from "Components/SquarePost";

const POST_QUERY = gql`
  {
    seePosts {
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
  useTitle("Portpolios | The GN");

  const { data, loading } = useQuery(POST_QUERY);
  console.log(data);

  if (loading === true) {
    return (
      <Wrapper>
        <Loader />;
      </Wrapper>
    );
  } else if (data) {
    return (
      <Wrapper>
        <PostSection>
          {data.seePosts.length === 0 ? (
            <FatText text={"No Portpolios found"} />
          ) : (
            data.seePosts.map(post => (
              <SquarePost
                key={post._id}
                // likeCount={post.likeCount}
                // commentCount={post.commentCount}
                file={post.files[0]}
              />
            ))
          )}
        </PostSection>
      </Wrapper>
    );
  }
};

export default Portpolios;
