from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import json
from bson import json_util
from bson import ObjectId

from querys import obtenerTaxi, activarTaxi, desactivarTaxi, actualizarTaxiPos, obtenerTaxisActivos 
from rutas import agregarRuta, obtenerRuta, obtenerRutas

app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb://localhost:27017/')
db = client['ubicaciones']
ports_collection = db['puertos']
routes_collection = db['rutas']

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return super().default(o)

@app.route('/')
def hello_world():
    return jsonify(message="Hello, World!")

@app.route('/location', methods=['POST'])
def location():
    data = request.json
    print(f"Device location: {data}")
    return jsonify(status="success", data=data)

@app.route('/ports', methods=['GET'])
def get_ports():
    print("asdas")
    ports = list(ports_collection.find())
    print(ports)
    return JSONEncoder().encode(ports)

@app.route('/route/<route_name>', methods=['GET'])
def get_route(route_name):
    print("\n llego consulta! rutas \n")
    print(route_name)
    route = routes_collection.find_one({"name": route_name}, {"_id": 0, "locations": 1})
    print(route)
    if route and 'locations' in route:
        return JSONEncoder().encode(route['locations'])
    else:
        return jsonify({"error": "Route not found"}), 404


#RUTAS DE TAXIS
@app.route('/getTaxi', methods=['GET'])
def get_taxi():
    patente = request.args.get('patente')
    print(patente)
    taxi = obtenerTaxi(patente)
    print("SOY ALGO MAS QUE UN TAXI")
    print(taxi)
    return json.dumps(taxi, default=json_util.default)

@app.route('/getActiveTaxis', methods=['GET'])
def get_active_taxis():
    taxis = obtenerTaxisActivos()
    if not taxis:
        return jsonify(status="null", data=None)
    else:
        return json.dumps(taxis, default=json_util.default)

@app.route('/activateTaxi', methods=['POST'])
def activate_taxi():
    data = request.json
    activarTaxi(data['patente'], data["nombreRuta"])
    print(data)
    return jsonify(status="success", data=data)

@app.route('/deactivateTaxi', methods=['POST'])
def deactivate_taxi():
    data = request.json
    desactivarTaxi(data['patente'])
    print(data)
    return jsonify(status="success", data=data)

#Actualizar ubicacion
@app.route('/updateLocation', methods=['POST'])
def update_location():
    data = request.json
    actualizarTaxiPos(data['patente'], data['longitud'], data['latitud'])
    print(data)
    return jsonify(status="success", data=data)
    

#RUTAS DE RUTAS.py
@app.route('/addRoute', methods=['POST'])
def add_route1():
    data = request.json
    agregarRuta(data['nombre'], data['descripcion'], data['distancia'], data['estimado'], data['puntos'])
    print(data)
    return jsonify(status="success", data=data)

@app.route('/getRoute', methods=['GET'])
def get_route1():
    nombre = request.args.get('nombre')
    print(nombre)
    ruta = obtenerRuta(nombre)
    print(ruta)
    return json.dumps(ruta, default=json_util.default)

@app.route('/getRoutes', methods=['GET'])
def get_routes1():
    rutas = obtenerRutas()
    if not rutas:
        return jsonify(status="null", data=None)
    else:
        return json.dumps(rutas, default=json_util.default)
    

if __name__ == '__main__':
    
    
    app.run(debug=True)

