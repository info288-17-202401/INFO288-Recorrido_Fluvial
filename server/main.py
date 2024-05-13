from flask import Flask, request
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# Conectar a MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['test']
collection = db['ubicacion']

@app.route('/ruta', methods=['POST'])
def manejar_ubicacion():
    datos = request.json
    latitud = datos.get('latitud')
    longitud = datos.get('longitud')

    if latitud is not None and longitud is not None:
        # Insertar datos en MongoDB
        collection.insert_one({'latitud': latitud, 'longitud': longitud})
        
        print(f'Ubicación recibida - Latitud: {latitud}, Longitud: {longitud}')
        return 'Ubicación recibida correctamente', 200
    else:
        return 'Error: Datos de ubicación faltantes', 400

if __name__ == '__main__':
    app.run(host="0.0.0.0" , port= 5000, debug=True)