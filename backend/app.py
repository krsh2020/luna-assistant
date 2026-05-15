from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():

    user_message = request.json.get("message")

    message = user_message.lower()

    # Default reply
    reply = "I'm Luna Assistant 🌙 How can I help you today?"

    if "hello" in message or "hi" in message:
        reply = "Hello 👋 I'm Luna Assistant. How can I help you today?"

    elif "how are you" in message:
        reply = "I'm doing great 😊 Thanks for asking!"

    elif "your name" in message or "what is your name" in message:
        reply = "My name is Luna Assistant 🌙"

    elif "services" in message:
        reply = "We provide AI and web development services."

    elif "react" in message:
        reply = "React is a frontend JavaScript library used for building UI."

    elif "flask" in message:
        reply = "Flask is a lightweight Python backend framework."

    elif "thank you" in message or "thanks" in message:
        reply = "You're welcome 😊"

    else:
        reply = "Sorry, I am still learning. Please try asking another question 😊"

    return jsonify({
        "reply": reply
    })

if __name__ == "__main__":
    app.run(debug=True)