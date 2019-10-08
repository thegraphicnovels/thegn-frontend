import React from "react";
import styled from "styled-components";
import Select from "@atlaskit/select";
import Group from "@atlaskit/tag-group";
import Tag from "@atlaskit/tag";
import { gridSize, fontSize } from "@atlaskit/theme";

import InlineEdit from "@atlaskit/inline-edit";

const ReadViewContainer = styled.div`
  display: flex;
  font-size: ${fontSize()}px;
  height: ${(gridSize() * 2.5) / fontSize()}em;
  line-height: ${(gridSize() * 2.5) / fontSize()};
  max-width: 100%;
  padding: ${gridSize()}px ${gridSize() - 2}px;
`;

const EditViewContainer = styled.div`
  z-index: 300;
  position: relative;
`;

const CheckboxSelect = ({ defaultValue, options, onConfirm }) => {
  return (
    <div
      style={{
        padding: `${gridSize()}px ${gridSize()}px ${gridSize() * 6}px`
      }}
    >
      <InlineEdit
        defaultValue={defaultValue}
        label="Inline edit select"
        editView={fieldProps => (
          <EditViewContainer>
            <Select
              {...fieldProps}
              options={options}
              isMulti
              autoFocus
              openMenuOnFocus
            />
          </EditViewContainer>
        )}
        readView={() =>
          defaultValue.length === 0 ? (
            <ReadViewContainer>Click to choose options</ReadViewContainer>
          ) : (
            <div style={{ padding: `${gridSize() / 2}px` }}>
              <Group>
                {defaultValue.map(option => (
                  <Tag text={option.label} key={option.label} />
                ))}
              </Group>
            </div>
          )
        }
        onConfirm={onConfirm}
      />
    </div>
  );
};

export default CheckboxSelect;
