import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";

const Menu = styled.div``;

const MenuItem = styled.div`
  color: black;
  border-bottom: 1px solid #ddd;
  a:focus {
    text-decoration: none;
  }
  a:hover {
    color: inherit;
    text-decoration: none;
    background-color: #eee;
  }
  a {
    display: block;
    padding: 0.7rem 15px;
    color: inherit;
    text-decoration: none;
  }

  .active-menu-item {
    background-color: #e8e8f9;
  }
`;

export const LOCAL_LOG_OUT = gql`
  mutation onLogout {
    onLogout @client
  }
`;

const Sidebar = ({ setOpen }) => {
  const [localLogOutMutation] = useMutation(LOCAL_LOG_OUT);

  return (
    <Menu>
      <MenuItem>
        <Link onClick={() => setOpen(false)} to="/admin">
          Admin
        </Link>
      </MenuItem>
      <MenuItem>
        <Link onClick={() => setOpen(false)} to="/admin/portpolioUpload">
          Portpolio Upload
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to="#" onClick={() => localLogOutMutation()}>
          Log Out
        </Link>
      </MenuItem>
    </Menu>
  );
};

export default Sidebar;
