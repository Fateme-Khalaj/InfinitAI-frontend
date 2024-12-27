import React from "react";
import icons from "src/assets/icons";

const FAQ: React.FC = () => (
  <>
    <div
      style={{
        color: "#CCDFE5",
        margin: "40px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <img src={icons.arrowRight} /> How do I reset my password?
    </div>
    <div
      style={{
        color: "#CCDFE5",
        margin: "40px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <img src={icons.arrowRight} />Can I change my username?
    </div>
    <div
      style={{
        color: "#CCDFE5",
        margin: "40px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <img src={icons.arrowRight} />How do I cancel my subscription?
    </div>
  </>
);

export default FAQ;
