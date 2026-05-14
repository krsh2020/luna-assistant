import { useState, useEffect, useRef } from "react"

function App() {

  const [message, setMessage] = useState("")

  const [chat, setChat] = useState(() => {

    const savedChat = localStorage.getItem("chat")

    return savedChat
      ? JSON.parse(savedChat)
      : [
          {
            text: "Hello 👋 How can I help you today?",
            sender: "bot",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          }
        ]
  })

  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth"
    })
  }, [chat])

  useEffect(() => {
    localStorage.setItem("chat", JSON.stringify(chat))
  }, [chat])

  const sendMessage = () => {

    if (message.trim() === "") return

    const userMessage = {
      text: message,
      sender: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    }

    const loadingMessage = {
      text: "Typing...",
      sender: "bot",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    }

    setChat((prev) => [...prev, userMessage, loadingMessage])

    fetch("https://nova-assistant-vdrh.onrender.com/chat",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {

        const botReply = {
          text: data.reply,
          sender: "bot",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        }

        setChat((prev) => {
          const updatedChat = prev.slice(0, -1)
          return [...updatedChat, botReply]
        })
      })

    setMessage("")
  }

  const clearChat = () => {

    setChat([
      {
        text: "Hello 👋 How can I help you today?",
        sender: "bot",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      }
    ])

    localStorage.removeItem("chat")

  }

  return (
    <div style={styles.container}>

      <div style={styles.chatContainer}>

        <div style={styles.header}>

          <div style={styles.headerLeft}>

            <div style={styles.botIcon}>
              🤖
            </div>

            <div>

              <div style={styles.botName}>
                Nova Assistant
              </div>

              <div style={styles.status}>
                Online
              </div>

            </div>

          </div>

        </div>

        <div style={styles.chatBox}>

          {chat.map((msg, index) => (

            <div
              key={index}
              style={
                msg.sender === "bot"
                  ? styles.botRow
                  : styles.userRow
              }
            >

              {msg.sender === "bot" && (
                <div style={styles.avatar}>
                  🤖
                </div>
              )}

              <div
                style={
                  msg.sender === "bot"
                    ? styles.botMessage
                    : styles.userMessage
                }
              >
                <div>{msg.text}</div>

                <div style={styles.time}>
                  {msg.time}
                </div>
              </div>

              {msg.sender === "user" && (
                <div style={styles.avatar}>
                  👤
                </div>
              )}

            </div>

          ))}

          <div ref={chatEndRef}></div>

        </div>

        <div style={styles.inputArea}>

          <input
            type="text"
            placeholder="Type your message..."
            style={styles.input}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage()
              }
            }}
          />

          <button style={styles.button} onClick={sendMessage}>
            Send
          </button>

          <button style={styles.clearButton} onClick={clearChat}>
            Clear
          </button>

        </div>

        <div style={styles.footer}>
          Built using React & Flask 🚀
        </div>

      </div>

    </div>
  )
}

const styles = {

  container: {
    backgroundColor: "#0f172a",
    minHeight: "100vh",
    padding: "20px",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial",
  },

  chatContainer: {
    width: "400px",
    backgroundColor: "#111827",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0px 0px 20px rgba(0,0,0,0.3)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  botIcon: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    backgroundColor: "#2563eb",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "22px",
  },

  botName: {
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
  },

  status: {
    color: "#22c55e",
    fontSize: "12px",
  },

  chatBox: {
    backgroundColor: "#1e293b",
    height: "400px",
    borderRadius: "10px",
    padding: "15px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  botRow: {
    display: "flex",
    alignItems: "flex-end",
    gap: "8px",
  },

  userRow: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    gap: "8px",
  },

  avatar: {
    fontSize: "22px",
  },

  botMessage: {
    backgroundColor: "#334155",
    padding: "12px",
    borderRadius: "12px",
    width: "fit-content",
    maxWidth: "75%",
    color: "white",
    lineHeight: "1.5",
  },

  userMessage: {
    backgroundColor: "#2563eb",
    padding: "12px",
    borderRadius: "12px",
    width: "fit-content",
    maxWidth: "75%",
    color: "white",
    lineHeight: "1.5",
  },

  inputArea: {
    display: "flex",
    marginTop: "15px",
    gap: "10px",
  },

  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
  },

  button: {
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  clearButton: {
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "12px 16px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  time: {
    fontSize: "11px",
    marginTop: "5px",
    opacity: 0.7,
    textAlign: "right",
  },

  footer: {
    textAlign: "center",
    color: "#94a3b8",
    fontSize: "12px",
    marginTop: "15px",
  },
}

export default AppS
