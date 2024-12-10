import React from "react";
import {
  HeaderContainer,
  HeaderItemContainer,
  HeaderItems,
  HeaderTitle,
  StyledLogoImg,
} from "./styles";
import icon from "src/assets/icons";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const navigate = useNavigate();

  function handleNavigate(path: string) {
    navigate(path);
  }

  return (
    <HeaderContainer>
      <StyledLogoImg src={icon.Logo} alt="Logo" />
      <HeaderTitle onClick={() => handleNavigate("/")}>INFINIT AI</HeaderTitle>
      <HeaderItemContainer>
        <HeaderItems onClick={() => handleNavigate("/categories")}>Categories</HeaderItems>
        <HeaderItems onClick={() => handleNavigate("/popular-downloads")}>Popular Downloads</HeaderItems>
        <HeaderItems onClick={() => handleNavigate("/new-downloads")}>New Downloads</HeaderItems>
      </HeaderItemContainer>
    </HeaderContainer>
  );
};

export default Header;
