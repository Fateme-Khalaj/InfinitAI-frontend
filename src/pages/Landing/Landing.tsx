import React, { useState } from "react";
import Card from "src/components/card/Card";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; 
  width: 70%;
  padding-left: 15%; 
  padding-right: 15%; 
  height: 100vh; 
  overflow: hidden;
`;

const Landing: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setActiveCard(index === activeCard ? null : index);
  };

  return (
    <Container>
      {[
        { backgroundColor: "#132029", text: "VOICE", opacity: 0.25 },
        { backgroundColor: "#15515E", text: "SUPPORT", opacity: 0.3 },
        { backgroundColor: "#2AA2BB", text: "CHAT", opacity: 0.4 },
        { backgroundColor: "#7BC1D0", text: "DEPTH", opacity: 0.5 },
      ].map((card, index) => (
        <Card
          key={index}
          backgroundColor={card.backgroundColor}
          text={card.text}
          opacity={card.opacity}
          hasLeftShadow={index > 0}
          isActive={activeCard === index}
          onClick={() => handleCardClick(index)}
        />
      ))}
    </Container>
  );
};

export default Landing;
