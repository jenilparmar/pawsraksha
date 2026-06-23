import { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "https://pawsraksha-1.onrender.com";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I am the PawsRaksha assistant. How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    const updated = [...messages, { role: "user", content: userMsg }];
    setMessages(updated);
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/chat`, { message: userMsg });
      setMessages([...updated, { role: "assistant", content: res.data.reply }]);
    } catch {
      setMessages([
        ...updated,
        { role: "assistant", content: "Sorry, I could not respond. Try again later." },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <div className="mb-2 w-80 h-96 bg-white border rounded-lg shadow-lg flex flex-col">
          <div className="bg-blue-400 text-white p-3 rounded-t-lg font-semibold">
            PawsRaksha Chat
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded text-sm ${
                  msg.role === "user" ? "bg-blue-100 ml-4" : "bg-gray-100 mr-4"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {loading && <div className="text-gray-500 text-sm">Thinking...</div>}
          </div>
          <div className="p-2 border-t flex gap-2">
            <input
              className="flex-1 border rounded px-2 py-1 text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
            />
            <button
              className="bg-blue-400 text-white px-3 py-1 rounded text-sm"
              onClick={sendMessage}
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      )}
      <button
        className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close" : "Chat"}
      </button>
    </div>
  );
}
