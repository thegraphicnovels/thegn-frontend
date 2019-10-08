import React from "react";
import styled from "styled-components";
import { Container, Draggable } from "react-smooth-dnd";

const DragItem = styled.div`
  height: 50px;
  line-height: 50px;
  text-align: center;
  display: block;
  background-color: #fff;
  outline: 0;
  border: 1px solid rgba(0, 0, 0, 0.125);
  margin-bottom: 2px;
  margin-top: 2px;
`;

const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }
  console.log(result);

  return result;
};

const TagDraggable = ({ tags, onDrop }) => {
  return (
    <Container
      groupName="1"
      getChildPayload={i => tags[i]}
      onDrop={e => onDrop(applyDrag(tags, e))}
    >
      {tags.map(p => {
        return (
          <Draggable key={p.id}>
            <DragItem>{p.data}</DragItem>
          </Draggable>
        );
      })}
    </Container>
  );
};

export default TagDraggable;
