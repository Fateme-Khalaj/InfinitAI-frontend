import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const PopupContent = styled.div`
  width: 300px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
`;

export const QRcodeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  word-break: break-word;
`;

export const QRCodeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px;
  flex: 1;
`;

export const VerticalDivider = styled.div`
  width: 1px;
  height: 240px;
  background-color: #ccc;
`;



export const CloseButton = styled.button`
  background-color: #15515e;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: #2aa2bb;
  }
`;

export const CoffeeButtonContainer = styled.div`
  width: fit-content;
  display: flex;
  alignitems: center;
  justifycontent: center;
  position: absolute;
  bottom: 100px;
  right: 20px;
`;
