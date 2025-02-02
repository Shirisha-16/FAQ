from flask_cors import CORS
from flask import Flask, request, jsonify
from googletrans import Translator

app = Flask(__name__)
CORS(app)
translator = Translator()


@app.route("/translate", methods=["POST"])
def translate_text():
    data = request.get_json()
    text = data.get("text", "")
    target_languages = data.get("languages", ["hi", "bn", "fr"])

    if not text:
        return jsonify({"error": "Text is required"}), 400

    translations = {}
    for lang in target_languages:
        try:
            translated = translator.translate(text, dest=lang)
            translations[lang] = translated.text
        except Exception as e:
            translations[lang] = text  # Fallback to English
            print(f"Translation to {lang} failed: {e}")

    return jsonify(translations)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
