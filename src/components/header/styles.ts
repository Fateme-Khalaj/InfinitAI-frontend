import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  // background-color: black;
  align-items: center;
`;

export const StyledLogoImg = styled.img`
  height: 100%;
  max-width: 100%;
  position: relative;
  z-index: 20;
`;

export const HeaderTitle = styled.h2`
  cursor: pointer;
  color: #2aa2bb;
  margin: 0;
  margin-inline-start: 20px;
`;

export const HeaderItemContainer = styled.div`
  display: flex;
  position: absolute;
  right: 10px;
`;

export const HeaderItems = styled.li`
  width: fit-content;
  // height: 100px;
  padding: 15px;
  color: #2aa2bb;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
`;
