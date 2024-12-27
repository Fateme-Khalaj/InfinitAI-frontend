import styled from "styled-components";

export const SupportCenterContainer = styled.div`
  width: 80%;
  height: fit-content;
  background-color: #1a3848;
  border-radius: 20px;
`;

export const ItemSelectContainer = styled.div`
  border: solid 1px #7bc1d0;
  border-radius: 5px;
  width: fit-content;
  height: 45px;
  margin: 40px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: row;
`;

export const ItemContainer = styled.div<{ isactive: boolean }>`
  border-right: solid 1px #7bc1d0;
  cursor: pointer;
  width: fit-content;
  min-width: 130px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isactive ? "#7BC1D0" : "#ccdfd5")};
`;
