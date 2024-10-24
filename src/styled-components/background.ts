import styled from "styled-components";

export const BackgroundDiv = styled.div`
  background-image: url("/designed_background.png");
  background-color: black;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  min-width: 100vw;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

export const DashboardContentTransparent = styled.div`
  justify-content: center;
  width: 100%;
  height: 100%;
  color: white;
  overflow-y: auto;
`
