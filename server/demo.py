from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import json
from bson import json_util
from bson import ObjectId

from querys import obtenerTaxi, activarTaxi, desactivarTaxi, actualizarTaxiPos, obtenerTaxisActivos 
from rutas import agregarRuta, obtenerRuta, obtenerRutas

from dotenv import load_dotenv
import os

import time

load_dotenv()

app = Flask(__name__)
CORS(app)

client = MongoClient(os.getenv('MONGO_URI'))
db = client[os.getenv('MONGO_DB')]
ports_collection = db['puertos']
routes_collection = db['rutas']


# Leer el archivo

file_path = r'C:\Users\leonardo\Desktop\s1 2024\Distribuidos\pj\INFO288-Recorrido_Fluvial\server\demo\rutaC.txt'
# Cambiar archivo para ver diferetes taxis y la patente
patente = "ABC-5678"
# Listas para almacenar las latitudes y longitudes
latitudes = []
longitudes = []
contador = 0
# Abrir y leer el archivo línea por línea
with open(file_path, 'r') as file:
    lines = file.readlines()
    # Saltar las dos primeras líneas (encabezados)
    for line in lines[2:]:
        # Eliminar espacios en blanco y saltos de línea
        line = line.strip()
        if line:  # Si la línea no está vacía
            # Dividir la línea en latitud y longitud
            lat, lon = line.split(',')
            # Añadir a las listas correspondientes
            latitudes.append(float(lat))
            longitudes.append(float(lon))

# ida y vuelta    
while True:
    # Iterar hacia adelante en las listas
    for i in range(len(latitudes)):
        contador += 1
        print(f"En espera...{contador}")
        time.sleep(1)
        actualizarTaxiPos(patente, longitudes[i], latitudes[i])
    
    # Iterar hacia atrás en las listas
    for i in range(len(latitudes) - 1, -1, -1):
        contador += 1
        print(f"En espera...{contador}")
        time.sleep(1)
        actualizarTaxiPos(patente, longitudes[i], latitudes[i])
