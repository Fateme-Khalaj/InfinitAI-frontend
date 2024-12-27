import React from "react";

const Support: React.FC = () => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", paddingTop: "10%" }}
    >
      <div
        style={{
          width: "80%",
          height: "600px",
          backgroundColor: "#1a3848",
          borderRadius: "20px",
        }}
      >
        <h1
          style={{
            color: "#CCDFE5",
            // marginInlineStart: "40px",
            margin: "40px",
          }}
        >
          Support Center
        </h1>
        <h3
          style={{
            color: "#CCDFE5",
            // marginInlineStart: "40px",
            margin: "40px",
            fontWeight: "normal",
          }}
        >
          Find answers, ask questions, or chat with our support team
        </h3>
        <div style={{ border: "solid 1px #7BC1D0", width: "300px", height: "45px", margin: "40px" }}></div>
      </div>
    </div>
  );
};

export default Support;
