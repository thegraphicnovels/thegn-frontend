import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import FatText from "./FatText";
import { Link } from "react-router-dom";

const Card = styled.div`
  ${props => props.theme.whiteBox}
  display:flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const EAvatar = styled(Avatar)`
  margin-bottom: 10px;
`;

const ELink = styled(Link)`
  margin-bottom: 10px;
  color: inherit;
`;

const UserCard = ({ id, name, url }) => (
  <Card>
    <EAvatar url={url} size="md" />
    <ELink to={`/${name}`}>
      <FatText text={name} />
    </ELink>
  </Card>
);

UserCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default UserCard;
