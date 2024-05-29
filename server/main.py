from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import json
from bson import ObjectId

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
    route = routes_collection.find_one({"route_name": route_name}, {"_id": 0, "locations": 1})
    if route and 'locations' in route:
        return JSONEncoder().encode(route['locations'])
    else:
        return jsonify({"error": "Route not found"}), 404



if __name__ == '__main__':
    
    
    app.run(debug=True)

