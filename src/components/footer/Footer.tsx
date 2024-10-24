import React from "react";
import styled from "styled-components";

const StyledFooter = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  color: #15515E;
  bottom: 20px;
`;


const Footer: React.FC = () => {
  return <StyledFooter>© 2024 INFINIT AI. All rights reserved.</StyledFooter>;
};

export default Footer;
