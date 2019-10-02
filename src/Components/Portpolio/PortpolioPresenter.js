import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { formatDate } from "utils";
import Loader from "Components/Loader";

const Wrapper = styled.div`
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const PortpolioPresenter = ({ data, loading, logged }) => {
  if (loading === true) {
    return (
      <Wrapper>
        <Loader />;
      </Wrapper>
    );
  } else if (!loading && data) {
    const updateAt = data.detailPortpolio.updateAt;
    const date = new Date(Number(updateAt));
    return (
      <Wrapper>
        <div style={{ display: "flex", flexdirection: "row" }}>
          {data.detailPortpolio.files.map(file => (
            <img
              src={file.url}
              alt={data.detailPortpolio.title}
              key={file._id}
              style={{ width: "500px", height: "500px", padding: "10px" }}
            />
          ))}
        </div>
        <div>{data.detailPortpolio.title}</div>
        <div>{data.detailPortpolio.description}</div>
        <div>{formatDate(date)}</div>
        {logged && (
          <div style={{ display: "flex", flexdirection: "row" }}>
            <Link to={`/portpolioManage/edit/${data.detailPortpolio._id}`}>
              <button>수정</button>
            </Link>
          </div>
        )}
      </Wrapper>
    );
  }
};

export default PortpolioPresenter;
