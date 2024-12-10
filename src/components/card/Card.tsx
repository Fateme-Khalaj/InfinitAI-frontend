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
  padding-left: ${(props) => (props.shadow ? "40px" : "20px")};
`;


const StyledTitle = styled(motion.p)<{ opacity?: number }>`
  margin: 0;
  position: absolute;
  left: 35%;
  top: 50%; /* Align to the vertical center of the card */
  transform: translate(-50%, -50%) rotate(-90deg);
  color: white;
  font-weight: 900;
  font-size: 70px;
  text-align: center;
  opacity: ${(props) => props.opacity || 1};
  white-space: nowrap;
`;

const Card: React.FC<CardProps> = ({
  backgroundColor,
  hasLeftShadow,
  text,
  opacity,
  isActive,
  onClick,
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
    </StyledCard>
  );
};

export default Card;