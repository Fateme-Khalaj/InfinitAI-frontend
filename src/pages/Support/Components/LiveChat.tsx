import React, { useState, useEffect } from "react";

const LiveChat: React.FC = () => {
  const [messages, setMessages] = useState<
    { message: string; sender: string; timestamp: string }[]
  >([]);
  const [inputMessage, setInputMessage] = useState<string>("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          "https://support.infinitai.ir/get_messages"
        );
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, []);

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;

    try {
      const response = await fetch(
        "https://support.infinitai.ir/send_message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: inputMessage }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: inputMessage,
            sender: "user",
            timestamp: new Date().toISOString(),
          },
        ]);

        setInputMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div
      style={{
        width: "90%",
        margin: "0 auto",
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "20px",
        backgroundColor: "#1a3848",
        border: "solid 1px #CCDFE5",
        borderRadius: "1%",
      }}
    >
      <div
        style={{ maxHeight: "400px", overflowY: "auto", marginBottom: "20px" }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: "15px",
              textAlign: msg.sender === "user" ? "right" : "left",
              color: "#0C0A17",
            }}
          >
            <p
              style={{
                display: "inline-block",
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: msg.sender === "user" ? "#CCDFE5" : "#7BC1D0",
                maxWidth: "70%",
                wordBreak: "break-word",
              }}
            >
              {msg.message}
            </p>
            <small
              style={{
                display: "block",
                fontSize: "0.8rem",
                color: "#999",
                marginTop: "5px",
              }}
            >
              {new Date(msg.timestamp).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
      <hr style={{ width: "100%" }} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          margin: "20px",
        }}
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          style={{
            width: "80%",
            height: "38px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#CCDFE5",
            color: "#0C0A17",
            fontSize: "17px",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            width: "15%",
            height: "38px",
            margin: "0 10px",
            backgroundColor: "#2AA2BB",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "17px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default LiveChat;
