"use client";
import React, { useState } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetchMessage([...messages, userMessage]);
      const botMessage = { role: "assistant", content: response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "Error fetching response." }]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessage = async (chatHistory) => {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: chatHistory,
          max_tokens: 150,
        }),
      });

      const data = await response.json();
      return data.choices?.[0]?.message?.content?.trim() || "No response.";
    } catch (error) {
      console.error("API request failed:", error);
      return "Failed to connect to AI.";
    }
  };

  return (
    <div className="flex flex-col max-w-md mx-auto p-4 border rounded-lg shadow-lg bg-white">
      <div className="flex flex-col space-y-2 mb-4 overflow-auto max-h-60 p-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-xs ${
              message.role === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-200 self-start"
            }`}
          >
            {message.content}
          </div>
        ))}
        {loading && <div className="text-gray-500">Typing...</div>}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-md focus:outline-none"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="p-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
