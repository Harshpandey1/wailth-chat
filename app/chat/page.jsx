"use client"
import { useState } from "react"

export default function ChatPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMsg = { role: "user", content: input }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setLoading(true)

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [...messages, userMsg] })
    })

    const data = await res.json()
    setMessages(prev => [
      ...prev,
      { role: "assistant", content: data.reply }
    ])
    setLoading(false)
  }

  return (
    <div style={{
      height: "100vh",
      background: "#0e0e0e",
      display: "flex",
      flexDirection: "column",
      fontFamily: "sans-serif",
      margin: 0
    }}>
      <div style={{
        padding: "16px 20px",
        background: "#161616",
        borderBottom: "1px solid #2a2a2a",
        color: "#fff",
        fontWeight: 700,
        fontSize: 15
      }}>
        💬 WaiLTH Finance Assistant
      </div>

      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 10
      }}>
        {messages.length === 0 && (
          <div style={{
            color: "#444",
            fontSize: 13,
            textAlign: "center",
            marginTop: 60,
            lineHeight: 2
          }}>
            👋 Hi! I am your WaiLTH Finance Assistant<br />
            Ask me anything about budgeting,<br />
            investing, or spending 💰
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.role === "user" ? "flex-end" : "flex-start",
            background: m.role === "user" ? "#4f46e5" : "#1e1e1e",
            color: "#fff",
            borderRadius: 12,
            padding: "10px 14px",
            maxWidth: "80%",
            fontSize: 13,
            lineHeight: 1.6
          }}>
            {m.content}
          </div>
        ))}
        {loading && (
          <div style={{ color: "#555", fontSize: 12 }}>
            Thinking...
          </div>
        )}
      </div>

      <div style={{
        display: "flex",
        padding: 12,
        gap: 8,
        borderTop: "1px solid #2a2a2a",
        background: "#0e0e0e"
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Ask about money, budgets, investing..."
          style={{
            flex: 1,
            background: "#1a1a1a",
            border: "1px solid #333",
            color: "#fff",
            borderRadius: 10,
            padding: "10px 14px",
            fontSize: 13,
            outline: "none"
          }}
        />
        <button onClick={sendMessage} style={{
          background: "#4f46e5",
          color: "#fff",
          border: "none",
          borderRadius: 10,
          padding: "0 16px",
          cursor: "pointer",
          fontWeight: 700,
          fontSize: 18
        }}>↑</button>
      </div>
    </div>
  )
}
