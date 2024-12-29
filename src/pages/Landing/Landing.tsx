import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleCardClick = (index: number) => {
    setActiveCard(index === activeCard ? null : index);
  };

  // Define button actions
  const navigateToPage = (path: string) => {
    navigate(path);
  };

  const handleSupportClick = () => {
    alert("Support button clicked!");
  };

  const handleChatClick = () => {
    alert("Chat button clicked!");
  };

  const handleDepthClick = () => {
    alert("Depth button clicked!");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Container>
        {[
          {
            backgroundColor: "#132029",
            text: "VOICE",
            opacity: 0.25,
            buttonText: "Go to Voice",
            buttonClickHandler: () => navigateToPage("/voice"),
            cardText:
              "Artificial Intelligence has made significant strides in understanding and analyzing human speech. AI-powered voice detection technology is revolutionizing the way we interact with devices, providing solutions for various industries, from security to entertainment. These systems rely on sophisticated algorithms that analyze speech patterns, tone, pitch, and even emotion in a voice.",
          },
          {
            backgroundColor: "#15515E",
            text: "SUPPORT",
            opacity: 0.3,
            buttonText: "Get Help",
            buttonClickHandler: () => navigateToPage("/support"),
            cardText:
              "Customer support is at the core of any successful business, and in the digital age, it’s no longer limited to phone calls or face-to-face interactions. AI and automation have transformed traditional customer support models by enabling businesses to provide instant responses to customer queries, improve problem-solving efficiency, and offer 24/7 support. Chatbots powered by AI can assist with frequently asked questions, troubleshoot common issues, and even guide users through complex processes.",
          },
          {
            backgroundColor: "#2AA2BB",
            text: "CHAT",
            opacity: 0.4,
            buttonText: "Start Chat",
            buttonClickHandler: () => navigateToPage("/chat"),
            cardText:
              "Chat technology has become the cornerstone of modern communication, providing users with a fast, interactive way to connect and collaborate. Whether in customer service, social media, or internal business operations, chat platforms facilitate instant communication. AI-enhanced chatbots, for example, are revolutionizing online interactions by offering users immediate responses without the need for human intervention.",
          },
          {
            backgroundColor: "#7BC1D0",
            text: "DEPTH",
            opacity: 0.5,
            buttonText: "Explore Depth",
            buttonClickHandler: () => navigateToPage("/depth"),
            cardText:
              " Depth detection in images refers to the ability of AI systems to understand the spatial relationship between objects within an image. This is particularly valuable in applications like computer vision, autonomous vehicles, and augmented reality.",
          },
        ].map((card, index) => (
          <Card
            key={index}
            backgroundColor={card.backgroundColor}
            text={card.text}
            opacity={card.opacity}
            hasLeftShadow={index > 0}
            isActive={activeCard === index}
            onClick={() => handleCardClick(index)}
            buttonText={card.buttonText}
            buttonClickHandler={card.buttonClickHandler}
            cardText={card.cardText}
          />
        ))}
      </Container>
      <h1 style={{ color: "white", paddingLeft: "15%" }}>About us</h1>
      <p style={{ color: "white", padding: "0 18%", lineHeight: "30px" }}>
        No one shall be subjected to arbitrary arrest, detention or exile.
        Everyone is entitled in full equality to a fair and public hearing by an
        independent and impartial tribunal, in the determination of his rights
        and obligations and of any criminal charge against him. No one shall be
        subjected to arbitrary interference with his privacy, family, home or
        correspondence, nor to attacks upon his honour and reputation. Everyone
        has the right to the protection of the law against such interference or
        attacks.
      </p>
    </div>
  );
};

export default Landing;
