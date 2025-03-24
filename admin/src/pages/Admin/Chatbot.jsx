import React, { useState } from "react";
import { FaRobot } from "react-icons/fa"; // Importing the robot icon
// import { assets } from "../../assets/assets"; // Import assets for the chat icon

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Controls chatbot visibility

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch("http://localhost:5000/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages([...newMessages, { text: data.reply, sender: "bot" }]);
    } catch (error) {
      console.error("Chatbot error:", error);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end">
      <FaRobot
        size={40}
        className="text-blue-600 cursor-pointer hover:scale-110 transition-transform"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="absolute bottom-12 right-0 w-80 bg-white border rounded-lg shadow-lg p-3 z-50">
          <div className="h-60 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`p-2 my-1 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                <span className={`px-3 py-1 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="flex mt-2">
            <input
              className="flex-1 border p-2 rounded-l"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
            />
            <button className="bg-blue-500 text-white px-3 py-2 rounded-r" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
