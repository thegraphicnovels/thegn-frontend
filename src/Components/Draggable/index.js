import React from "react";
import { DraggableAreasGroup } from "react-draggable-tags";
import styled from "styled-components";

const group = new DraggableAreasGroup();
const DraggableArea1 = group.addArea();
const DraggableArea2 = group.addArea();

const CrossArea = styled.div`
  &::after {
    content: "";
    display: block;
    clear: both;
  }
`;

const Square = styled.div`
  border: 1px solid #e9e9e9;
  border-radius: 4px;
  width: 233px;
  height: 220px;
  padding: 5px;
`;

const Left = styled(Square)`
  float: left;
  margin-right: 10px;
`;

const LeftTagDiv = styled.div`
  position: relative;
  margin: 3px;
  font-size: 13px;
  border: 1px dashed #cccccc;
  border-radius: 4px;
  padding: 0 8px;
  line-height: 30px;
  color: #666666;
  background: rgba(255, 255, 255, 0.7);
`;

const Right = styled(Square)`
  float: left;
`;

const RightTagDiv = styled.div`
  position: relative;
  margin: 3px;
  font-size: 13px;
  border: 1px dashed #9cc6f3;
  border-radius: 4px;
  padding: 0 8px;
  line-height: 30px;
  color: #666666;
  background: rgba(255, 255, 255, 0.7);
`;

export default ({ leftTags, rightTags }) => {
  const duplicateRemove = (left, right) => {
    return left.reduce((unique, o) => {
      let isFound = right.some(b => {
        return b.id === o.id;
      });
      if (!isFound) unique.push(o);
      return unique;
    }, []);
  };

  return (
    <CrossArea>
      <Left>
        <DraggableArea1
          tags={duplicateRemove(leftTags, rightTags)}
          render={({ tag }) => <LeftTagDiv>{tag.content}</LeftTagDiv>}
          onChange={leftTags => {
            console.log(leftTags);
          }}
        />
      </Left>
      <Right>
        <DraggableArea2
          tags={rightTags}
          render={({ tag }) => <RightTagDiv>{tag.content}</RightTagDiv>}
          onChange={rightTags => {
            console.log(rightTags);
          }}
        />
      </Right>
    </CrossArea>
  );
};
