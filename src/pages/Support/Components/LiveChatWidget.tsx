import React, { useState, useRef, useEffect } from "react";
import LiveChat from "./LiveChat";
import icons from "src/assets/icons";

const LiveChatWidget: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleChat = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      overlayRef.current &&
      !overlayRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsChatOpen(false);
    }
  };

  useEffect(() => {
    if (isChatOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isChatOpen]);

  return (
    <>
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          bottom: isChatOpen ? "15%" : "-100%",
          right: "20px",
          width: "360px",
          height: "502px",
          backgroundColor: "#1a3848",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
          overflow: "hidden",
          zIndex: 1000,
          transition: "bottom 0.3s ease-in-out",
        }}
      >
        <LiveChat />
      </div>
      <button
        ref={buttonRef}
        onClick={toggleChat}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#2AA2BB",
          border: "none",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          zIndex: 1001,
        }}
      >
        <img src={icons.liveChatIcon} style={{ width: "30px" }} />
      </button>
    </>
  );
};

export default LiveChatWidget;
