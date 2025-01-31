import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { CardProps } from "./types";

const StyledCard = styled(motion.div)<{ color: string; shadow?: boolean }>`
  width: 295px;
  height: 480px;
  background-color: ${(props) => props.color || "#132029"};
  border-top-left-radius: 45px;
  border-bottom-left-radius: 45px;
  margin-right: -40px;
  box-shadow: ${(props) =>
    props.shadow ? "-4px 0px 30px rgba(0, 0, 0, 0.2)" : "none"};
  position: relative;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
  transition: width 0.6s ease-in-out;
`;

const StyledTitle = styled(motion.p)<{ opacity?: number }>`
  margin: 0;
  color: white;
  font-weight: 900;
  font-size: 70px;
  text-align: center;
  opacity: ${(props) => props.opacity || 1};
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%) rotate(-90deg);
  margin-left: 70px;
  white-space: nowrap;
  transition: margin-left 0.6s ease-in-out;
`;

const Description = styled(motion.div)`
  position: absolute;
  top: 45%;
  left: 200px;
  transform: translateY(-50%);
  opacity: 0;
  color: white;
  width: 300px;
`;

const Button = styled(motion.button)`
  position: absolute;
  top: 70%;
  left: 200px;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: white;
  color: #132029;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7bc1d0;
  }
`;

const Card: React.FC<CardProps> = ({
  backgroundColor,
  hasLeftShadow,
  text,
  opacity,
  isActive,
  onClick,
  cardText,
  buttonText,
  buttonClickHandler,
}) => {
  return (
    <StyledCard
      color={backgroundColor}
      shadow={hasLeftShadow}
      onClick={onClick}
      initial={{ flex: 1 }}
      animate={{
        flex: isActive ? 3 : 1,
        width: isActive ? 545 : 295,
      }}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
      }}
    >
      <StyledTitle opacity={opacity}>{text}</StyledTitle>

      <Description
        initial={{ opacity: 0 }}
        animate={{
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.6 }}
      >
        <p style={{ width: "80%", wordWrap: "break-word", margin: 0 }}>
          {cardText}
        </p>
      </Description>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.6 }}
      >
        <Button onClick={buttonClickHandler}>{buttonText}</Button>
      </motion.div>
    </StyledCard>
  );
};

export default Card;
