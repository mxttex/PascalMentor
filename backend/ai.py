from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
import google.generativeai as genai

app = Flask(__name__)

load_dotenv()

api_key = os.getenv('API_KEY')

if not api_key:
    print("Errore: La chiave API non è stata caricata. Assicurati che 'API_KEY' sia impostata nel tuo file .env")
    exit(1)

genai.configure(api_key=api_key)

model = genai.GenerativeModel('gemini-1.5-flash')

def askAi(question):
    try:
        response = model.generate_content(question)
        print(response.text)
        return response.text
    except Exception as e:
        print(f"Errore durante la generazione del contenuto dall'IA: {e}")
        return "Si è verificato un errore durante l'elaborazione della tua richiesta."

@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    if not data or 'message' not in data:
        return jsonify({'error': 'Richiesta non valida: il corpo deve essere JSON e contenere la chiave "message".'}), 400

    question = data.get('message')
    print(question)
    reply = askAi(question)
    return jsonify({'reply': reply})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
