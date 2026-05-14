from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():

    user_message = request.json.get("message")

    message = user_message.lower()

    if "hello" in message or "hi" in message:
        reply = "Hello 👋 I'm Nova Assistant. How can I help you today?"

    elif "how are you" in message:
        reply = "I'm doing great 😊 Thanks for asking!"

    elif "your name" in message:
        reply = "My name is Nova Assistant 🤖"

    elif "services" in message:
        reply = "We provide AI chatbot and web development services."

    elif "website" in message:
        reply = "Our website is currently under development 🚀"

    elif "price" in message or "cost" in message:
        reply = "Pricing depends on the features and requirements."

    elif "contact" in message:
        reply = "You can contact us at support@example.com"

    elif "thanks" in message or "thank you" in message:
        reply = "You're welcome 😊"

    elif "bye" in message:
        reply = "Goodbye 👋 Have a wonderful day!"

    elif "ai" in message:
        reply = "AI stands for Artificial Intelligence 🤖"

    elif "python" in message:
        reply = "Python is a popular programming language used in AI and web development."

    elif "react" in message:
        reply = "React is a frontend JavaScript library used for building user interfaces."

    elif "flask" in message:
        reply = "Flask is a lightweight Python backend framework."

    else:
        reply = "Sorry, I am still learning. Please try asking another question 😊"

    return jsonify({
        "reply": reply
    })

if __name__ == "__main__":
    app.run(debug=True)