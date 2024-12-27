import React, { useState } from "react";
import { ItemContainer, ItemSelectContainer, SupportCenterContainer } from "./style";
import { FAQ } from "./Components/FAQ";
import { AskQuestion } from "./Components/AskQuestion";
import { LiveChat } from "./Components/LiveChat";


const Support: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

  const renderActiveComponent = () => {
    switch (activeIndex) {
      case 0:
        return <FAQ />;
      case 1:
        return <AskQuestion />;
      case 2:
        return <LiveChat />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", paddingTop: "10%" }}
    >
      <SupportCenterContainer>
        <h1
          style={{
            color: "#CCDFE5",
            margin: "40px",
          }}
        >
          Support Center
        </h1>
        <h3
          style={{
            color: "#CCDFE5",
            margin: "40px",
            fontWeight: "normal",
          }}
        >
          Find answers, ask questions, or chat with our support team
        </h3>
        <ItemSelectContainer>
          {[
            { text: "FAQ" },
            { text: "Ask a Question" },
            { text: "Live Chat" },
          ].map((items, index) => (
            <ItemContainer
              key={index}
              isactive={activeIndex === index}
              onClick={() => handleItemClick(index)}
            >
              {items.text}
            </ItemContainer>
          ))}
        </ItemSelectContainer>
        {renderActiveComponent()}
      </SupportCenterContainer>
    </div>
  );
};

export default Support;
