import React from "react";
import styled from "styled-components";

const StyledFooter = styled.div`
  display: flex;
  justify-content: center;
  color: #15515e;
  padding: 10px 0;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
`;

const Footer: React.FC = () => {
  return <StyledFooter>© 2024 INFINIT AI. All rights reserved.</StyledFooter>;
};

export default Footer;
