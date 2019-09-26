import React from "react";
import styled from "styled-components";
import Input from "../Input";
import Button from "../Button";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { RIEInput } from "riek";
import { formatDate } from "utils";
import { Popconfirm } from "antd";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  /* min-height: 20vh; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 600px;
  margin-bottom: 10px;
`;

const Box = styled.div`
  ${props => props.theme.whiteBox}
  border-radius: 0px;
  width: 100%;
  max-width: 600px;
`;

const Form = styled(Box)`
  display: flex;
  padding: 40px;
  padding-bottom: 30px;
  width: 100%;
  * {
    width: 100%;
    &:not(:last-child) {
      margin-bottom: 7px;
      margin-right: 5px;
    }
  }
`;

const TagPresenter = ({
  tag,
  loading,
  data,
  handleTagCreate,
  handleTagModify,
  handleTagDelete
}) => {
  return (
    <Wrapper>
      <Container>
        <Form>
          <Input
            placeholder={"Tag"}
            {...tag}
            autoFocus={true}
            isRequired={true}
            style={{ width: "200%" }}
          />
          <Button text={"Add"} onClick={handleTagCreate} />
        </Form>
      </Container>
      {/* {!loading && data && <EditableTable data={data.seeTags} />} */}
      {!loading && data && (
        <ReactTable
          noDataText="No Tags"
          data={data.seeTags}
          columns={[
            {
              Header: "Id",
              accessor: "_id",
              show: false
            },
            {
              Header: "Tag",
              accessor: "value",
              width: 150,
              Cell: row => (
                <RIEInput
                  value={row.value}
                  change={handleTagModify}
                  propName={row.row._id}
                />
              )
            },
            {
              Header: "Creator",
              accessor: "user.name",
              width: 150
            },
            {
              Header: "Create Date",
              id: "updateAt",
              accessor: d => {
                const updateAt = d.updateAt;
                const date = new Date(Number(updateAt));
                return formatDate(date);
              },
              width: 160
            },
            {
              Header: "Action",
              width: 100,
              Cell: row => (
                <Popconfirm
                  title={`Are you delete this Tag [${row.row.value}]?`}
                  onConfirm={() => handleTagDelete(row.row._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Link to="#">Delete</Link>
                </Popconfirm>
              )
            }
          ]}
          // defaultPageSize={10}
          className="-striped -highlight"
          // showPagination={false}
          minRows={1}
          defaultSorted={[
            {
              id: "updateAt",
              desc: true
            }
          ]}
        />
      )}
    </Wrapper>
  );
};

export default TagPresenter;
