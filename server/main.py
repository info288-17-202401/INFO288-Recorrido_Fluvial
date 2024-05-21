from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import json_util

app = Flask(__name__)
CORS(app)

# Conexión a la base de datos MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['ubicaciones']
collection = db['datos']
collection_ports = db['puertos']

@app.route('/')
def hello_world():
    return jsonify(message="Hello, World!")

@app.route('/location', methods=['POST'])
def location():
    data = request.json
    print(f"Device location: {data}")

    # Insertar datos en la colección MongoDB
    result = collection.insert_one(data)

    # Obtener el ID del documento insertado y convertirlo a una cadena
    inserted_id = str(result.inserted_id)

    # Devolver la respuesta con el ID como una cadena
    data['_id'] = inserted_id
    return jsonify(status="success", data=data)

@app.route('/ports', methods=['GET'])
def get_ports():
    # Obtener todos los puertos de la colección MongoDB
    ports = list(collection_ports.find({}, {'_id': 0}))  # Excluir el _id en la respuesta JSON
    return jsonify(ports)

if __name__ == '__main__':
    app.run(debug=True)

