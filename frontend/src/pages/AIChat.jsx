import { useState } from "react";
import ReactMarkdown from "react-markdown";
import api from "../services/api";
import DashboardLayout from "../components/layout/DashboardLayout";

const AIChat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: "user", content: message };
    setChat((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const res = await api.post("/ai/chat", {
        message: userMessage.content,
      });

      const aiMessage = {
        role: "ai",
        content: res.data.reply,
      };

      setChat((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Error sending message:", err);
      setChat((prev) => [
        ...prev,
        { role: "ai", content: "AI service unavailable. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">AI Fitness Assistant 🤖</h2>

      <div className="bg-white rounded-xl shadow p-4 h-[70vh] flex flex-col">
        {/* Chat window */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {chat.length === 0 && (
            <p className="text-gray-500 text-center mt-10">
              Ask me about workouts, diet, or calories 💪
            </p>
          )}

          {chat.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.role === "user"
                  ? "bg-purple-600 text-white ml-auto"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {msg.role === "ai" ? (
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                msg.content
              )}
            </div>
          ))}

          {loading && (
            <div className="bg-gray-100 p-3 rounded-lg w-fit">
              AI is thinking...
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask something..."
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIChat;
