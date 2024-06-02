from pymongo import MongoClient, GEOSPHERE
from datetime import datetime

from dotenv import load_dotenv
import os
load_dotenv()

client = MongoClient(os.getenv('MONGO_URI'))
db = client[os.getenv('MONGO_DB')]

# Selecciona la base de datos
#db = client.recorrido_fluvial

# Selecciona la colección
puertos = db.puertos

puertos.create_index([("Parada.coordinates", GEOSPHERE)])

# Definir documentos
paradas_list = [
    {
        "Parada": {
            "type": "Point",
            "coordinates": [-73.97, 40.77]
        },
        "createdAt": datetime.now(),
        "updatedAt": datetime.now(),
        "status": "Activo",
        "deletedAt": None
    },
    {
        "Parada": {
            "type": "Point",
            "coordinates": [-74.00, 40.75]
        },
        "createdAt": datetime.now(),
        "updatedAt": datetime.now(),
        "status": "Inactivo",
        "deletedAt": None
    }
]

#puertos.insert_many(paradas_list)

def agregarParada(longitud, latitud):
    documento = {
        "Parada": {
            "type": "Point",
            "coordinates": [longitud, latitud]
        },
        "createdAt": datetime.now(),
        "updatedAt": datetime.now(),
        "status": "Activo",
        "deletedAt": None
    }
    try:
        result = puertos.insert_one(documento)
        print(f"Documento insertado con ID: {result.inserted_id}")
    except Exception as e:
        print(f"Error al insertar documento: {e}")

def obtenerParada(longitud, latitud):
    try:
        result = puertos.find_one({"Parada.coordinates": [longitud, latitud]})
        if result:
            print(f"Documento encontrado: {result}")
        else:
            print("No se encontró el documento")
    except Exception as e:
        print(f"Error al buscar documento: {e}")

def eliminarParada(longitud, latitud):
    try:
        result = puertos.delete_one({"Parada.coordinates": [longitud, latitud]})
        print(f"Documento eliminado: {result.deleted_count}")
    except Exception as e:
        print(f"Error al eliminar documento: {e}")

def obtenerParadas():
    try:
        result = puertos.find()
        for parada in result:
            print(parada)
    except Exception as e:
        print(f"Error al obtener documentos: {e}")

def obtenerParadasActivas():
    try:
        result = puertos.find({"status": "Activo"})
        for parada in result:
            print(parada)
    except Exception as e:
        print(f"Error al obtener documentos: {e}")

def actualizarParada(longitud, latitud, status):

    try:
        result = puertos.update_one(
            {"Parada.coordinates": [longitud, latitud]},
            {"$set": {"status":
                status,
                "updatedAt": datetime.now()}}
        )
        print(f"Documento actualizado: {result.modified_count}")
    except Exception as e:
        print(f"Error al actualizar documento: {e}")

def obtenerParadasCercanas(longitud, latitud, radio):
    try:
        result = puertos.find({
            "Parada": {
                "$near": {
                    "$geometry": {
                        "type": "Point",
                        "coordinates": [longitud, latitud]
                    },
                    "$maxDistance": radio
                }
            }
        })
        for parada in result:
            print(parada)
    except Exception as e:
        print(f"Error al obtener documentos: {e}")

        