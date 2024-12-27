import React, { useState } from "react";
import icons from "src/assets/icons";

const FAQ: React.FC = () => {
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  const faqItems = [
    { question: "How do I reset my password?", answer: "To reset your password, click on the 'Forgot Password' link on the login page. You will receive an email with instructions to create a new password." },
    { question: "Can I change my username?", answer: "Yes, you can change your username in your account settings. Go to your profile and look for the 'Edit Username' option." },
    { question: "How do I cancel my subscription?", answer: "To cancel your subscription, go to your account settings and find the 'Subscription' tab. Click on 'Cancel Subscription' and follow the prompts." }
  ];

  const handleItemClick = (index: number) => {
    setActiveIndices(prevState =>
      prevState.includes(index) 
        ? prevState.filter(item => item !== index)
        : [...prevState, index]
    );
  };

  return (
    <>
      {faqItems.map((item, index) => (
        <div key={index} style={{ margin: "40px", color: "#CCDFE5" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onClick={() => handleItemClick(index)}
          >
            <img
              src={activeIndices.includes(index) ? icons.arrowDown : icons.arrowRight}
              alt="arrow"
              style={{ transition: "transform 0.3s" }}
            />
            <span style={{ marginLeft: "5px", fontWeight: "bold" }}>{item.question}</span>
          </div>
          {activeIndices.includes(index) && (
            <div style={{ marginTop: "10px", paddingLeft: "45px", marginRight: "45px", lineHeight: "30px" }}>
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default FAQ;
