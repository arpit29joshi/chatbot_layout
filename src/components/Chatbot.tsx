"use client";
import React, { useState, useEffect, useRef } from "react";

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ user: boolean; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");

  const shouldUpdateLocalStorage = useRef(true);

  useEffect(() => {
    const savedMessages = localStorage.getItem("messages");
    console.log(savedMessages, shouldUpdateLocalStorage);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      const welcomeMessage = { user: false, text: "Welcome to the Chatbot!" };
      setMessages([welcomeMessage]);
    }
  }, []);

  useEffect(() => {
    if (shouldUpdateLocalStorage.current) {
      localStorage.setItem("messages", JSON.stringify(messages));
    }
    shouldUpdateLocalStorage.current = true;
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const userMessage = { user: true, text: input };
    const botMessage = { user: false, text: generateRandomMessage() };

    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  const generateRandomMessage = () => {
    const responses = [
      "Lorem ipsum dolor sit amet.",
      "Consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore.",
      "Dolore magna aliqua.",
      "Ut enim ad minim veniam.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleDeleteChat = () => {
    shouldUpdateLocalStorage.current = false;
    setMessages([]);
    localStorage.removeItem("messages");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${
              msg.user
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-300 text-black self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="p-4 bg-white shadow-md flex">
        <input
          type="text"
          className="flex-1 border-2 rounded-lg p-2 mr-2 text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? handleSendMessage() : null)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-lg"
          onClick={handleSendMessage}
        >
          Send
        </button>
        <button
          className="bg-red-500 text-white p-2 rounded-lg"
          onClick={handleDeleteChat}
        >
          Delete Chat
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
