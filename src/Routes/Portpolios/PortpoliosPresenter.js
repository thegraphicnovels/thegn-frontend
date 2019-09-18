import React from "react";
import styled from "styled-components";
import Loader from "Components/Loader";
import SquarePost from "Components/SquarePost";
import Pagination from "../../Components/Pagination";

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

const PortpoliosPresenter = ({ logged, loading, data, handlePageClick }) => {
  if (loading === true) {
    return (
      <Wrapper>
        <Loader />;
      </Wrapper>
    );
  } else if (!loading && data) {
    console.log(data.seePortpolios.totalPages);
    return (
      <Wrapper>
        <PostSection>
          {data.seePortpolios.portpolios.length === 0 ? (
            // <FatText text={"No Portpolios found"} />
            <Loader />
          ) : (
            data.seePortpolios.portpolios.map(portpolio => (
              <SquarePost
                key={portpolio._id}
                // likeCount={post.likeCount}
                // commentCount={post.commentCount}
                file={portpolio.files[0]}
              />
            ))
          )}
        </PostSection>
        <Pagination
          handlePageClick={handlePageClick}
          pageCount={data.seePortpolios.totalPages}
        />
      </Wrapper>
    );
  }
};

export default PortpoliosPresenter;
