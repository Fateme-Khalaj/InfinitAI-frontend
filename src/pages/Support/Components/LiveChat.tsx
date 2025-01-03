import React, { useState, useEffect, useRef } from "react";

interface Message {
  text: string;
  sender: "user" | "app";
}

const LiveChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const userMessage: Message = { text: inputMessage.trim(), sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setInputMessage("");

    try {
      const response = await fetch("https://api.infinitai.ir/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputMessage.trim(), sender: "user" }),
      });

      const data = await response.json();
      if (response.status === 200) {
        const appMessage: Message = { text: data.text, sender: "app" };
        setMessages((prevMessages) => [...prevMessages, appMessage]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        text: "Sorry, something went wrong.",
        sender: "app",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div
      style={{
        width: "90%",
        margin: "0 auto",
        height: "500px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#1a3848",
        border: "solid 1px #CCDFE5",
        borderRadius: "3px",
      }}
    >
      <div
        ref={messagesContainerRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: "15px",
              textAlign: msg.sender === "user" ? "right" : "left",
            }}
          >
            <p
              style={{
                display: "inline-block",
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: msg.sender === "user" ? "#7BC1D0" : "#2AA2BB",
                color: msg.sender === "user" ? "#0C0A17" : "#fff",
                maxWidth: "70%",
                wordBreak: "break-word",
              }}
            >
              {msg.text}
            </p>
          </div>
        ))}
      </div>
      <hr style={{ margin: 0, border: "1px solid #CCDFE5" }} />
      <div
        style={{
          padding: "10px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#1a3848",
        }}
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          style={{
            flex: 1,
            height: "38px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#CCDFE5",
            color: "#0C0A17",
            fontSize: "17px",
            padding: "0 10px",
            marginRight: "10px",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            height: "38px",
            padding: "0 20px",
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
