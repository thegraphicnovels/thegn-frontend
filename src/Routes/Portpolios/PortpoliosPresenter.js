import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Loader from "Components/Loader";
import Paging from "../../Components/Paging";

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
  flex-direction: column;
`;

const PortpoliosPresenter = ({
  logged,
  loading,
  limit,
  page,
  data,
  handlePageChange
}) => {
  if (loading === true) {
    return (
      <Wrapper>
        <Loader />;
      </Wrapper>
    );
  } else if (!loading && data) {
    return (
      <Wrapper>
        {logged && <Link to={`/portpolio/upload`}>올리기</Link>}
        {logged && <Link to={`/uploadtest`}>테스트</Link>}
        {/* {logged && <Link to={`/filepond`}>Filepond</Link>} */}
        {/* {logged && <Link to={`/cloudinary`}>Cloudinary</Link>} */}
        <PostSection>
          {data.seePortpolios.portpolios.length === 0 ? (
            // <FatText text={"No Portpolios found"} />
            <Loader />
          ) : (
            data.seePortpolios.portpolios.map(portpolio => {
              return (
                <Link to={`/portpolios/${portpolio._id}`} key={portpolio._id}>
                  <img
                    src={portpolio.files[0].url}
                    style={{ width: "200px", height: "200px" }}
                    alt={""}
                  />
                </Link>
              );
            })
          )}
        </PostSection>
        <Paging
          limit={limit}
          page={page}
          totalItemsCount={data.seePortpolios.totalPortpolios}
          handlePageChange={handlePageChange}
        />
      </Wrapper>
    );
  }
};

export default PortpoliosPresenter;
