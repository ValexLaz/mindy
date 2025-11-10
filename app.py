from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app) 

try:
    
    print("Cargando el modelo de PLN (nlptown/bert-base-multilingual-uncased-sentiment)...")
        
    sentiment_pipeline = pipeline(
        "sentiment-analysis",
        model="nlptown/bert-base-multilingual-uncased-sentiment"
    )
    print("¡Modelo cargado exitosamente!")
    
except Exception as e:
    print(f"Error al cargar el modelo: {e}")
    sentiment_pipeline = None


@app.route('/analizar', methods=['POST'])
def analizar_texto():
    if not sentiment_pipeline:
        return jsonify({"error": "El modelo de PLN no está disponible."}), 500

    data = request.get_json()
    if not data or 'texto' not in data:
        return jsonify({"error": "El campo 'texto' es requerido."}), 400

    texto = data['texto']

    try:
        resultados = sentiment_pipeline(texto)
        
        return jsonify(resultados[0]) 
        
    except Exception as e:
        return jsonify({"error": f"Error durante el análisis: {e}"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)