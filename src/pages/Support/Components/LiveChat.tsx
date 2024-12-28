import React, { useState, useEffect } from "react";

const LiveChat: React.FC = () => {
  const [messages, setMessages] = useState<{ message: string; sender: string; timestamp: string }[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");

  // Fetch messages when the component mounts
  useEffect(() => {
    // Fetch chat messages
    const fetchMessages = async () => {
      try {
        const response = await fetch("https://support.infinitai.ir/get_messages");
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, []);

  // Send user message to the backend
  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;

    try {
      // Send message
      const response = await fetch("https://support.infinitai.ir/send_message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();

      if (data.success) {
        // Add the user's message to the chat
        setMessages((prevMessages) => [
          ...prevMessages,
          { message: inputMessage, sender: "user", timestamp: new Date().toISOString() },
        ]);

        // Clear the input field
        setInputMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "500px", margin: "0 auto", padding: "20px", backgroundColor: "#f5f5f5" }}>
      {/* Display messages */}
      <div style={{ maxHeight: "400px", overflowY: "auto", marginBottom: "20px" }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: "15px",
              textAlign: msg.sender === "user" ? "right" : "left",
              color: msg.sender === "user" ? "#1a3848" : "#007BFF",
            }}
          >
            <p
              style={{
                display: "inline-block",
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: msg.sender === "user" ? "#ccdfd5" : "#7bc1d0",
                maxWidth: "70%",
                wordBreak: "break-word",
              }}
            >
              {msg.message}
            </p>
            <small style={{ display: "block", fontSize: "0.8rem", color: "#999", marginTop: "5px" }}>
              {new Date(msg.timestamp).toLocaleString()}
            </small>
          </div>
        ))}
      </div>

      {/* Input field and send button */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          style={{
            width: "70%",
            padding: "10px",
            border: "solid 1px #CCDFE5",
            borderRadius: "5px",
            backgroundColor: "#ccdfd5",
            color: "#0C0A17",
            fontSize: "17px",
            marginBottom: "10px",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            width: "70%",
            padding: "10px",
            backgroundColor: "#7bc1d0",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
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