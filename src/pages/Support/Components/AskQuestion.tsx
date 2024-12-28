import React, { useState } from "react";
import styled from "styled-components";

const StyledTextArea = styled.textarea`
  width: 94%;
  background-color: #CCDFE5;
  border: solid 1px #ccdfd5;
  border-radius: 5px;
  padding-left: 10px;
  padding-top: 20px;
  color: #0c0a17;
  font-size: 17px;
`;

const AskQuestion: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = {
      name,
      email,
      question,
    };

    try {
      const response = await fetch(
        "https://support.infinitai.ir/submit_question",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (result.success) {
        setResponseMessage(result.message);
        setName("");
        setEmail("");
        setQuestion("");
      } else {
        setResponseMessage("Something went wrong, please try again.");
      }
    } catch (error) {
      setResponseMessage("An error occurred, please try again.");
    }
  };

  return (
    <div style={{ paddingLeft: "40px" }}>
      <form onSubmit={handleSubmit}>
        <div style={{ margin: "20px 0" }}>
          <input
            type="text"
            value={name}
            required={true}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            style={{
              width: "94%",
              height: "45px",
              backgroundColor: "#CCDFE5",
              border: "solid 1px #CCDFE5",
              borderRadius: "5px",
              paddingLeft: "10px",
              color: "#0C0A17",
              fontSize: "17px",
            }}
          />
        </div>

        <div style={{ margin: "20px 0" }}>
          <input
            type="email"
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            style={{
              width: "94%",
              height: "45px",
              backgroundColor: "#CCDFE5",
              border: "solid 1px #CCDFE5",
              borderRadius: "5px",
              paddingLeft: "10px",
              color: "#0C0A17",
              fontSize: "17px",
            }}
          />
        </div>

        <div style={{ margin: "20px 0" }}>
          <StyledTextArea
            value={question}
            required={true}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Your Question"
            rows={4}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#7BC1D0",
            color: "#0C0A17",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "17px",
          }}
        >
          Submit Question
        </button>
      </form>

      {responseMessage && (
        <div style={{ marginTop: "20px", color: "#CCDFE5" }}>
          {responseMessage}
        </div>
      )}
    </div>
  );
};

export default AskQuestion;
