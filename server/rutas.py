from pymongo import MongoClient, GEOSPHERE
from datetime import datetime

# Conexión a MongoDB (ajusta la URL según tu configuración)
client = MongoClient("mongodb://localhost:27017/")

# Selecciona la base de datos
db = client.recorrido_fluvial

# Selecciona la colección
rutas = db.rutas

rutas.create_index([("Puntos.coordinates", GEOSPHERE)])
'''
recorridos = [
    {
        "Nombre": "Recorrido Parque Central",
        "descripcion": "Ruta desde el punto A hasta el punto B pasando por varios puntos de interés.",
        "Distancia": 5.3,
        "Estimado": 45,
        "Puntos": [
            {"type": "Point", "coordinates": [-73.97, 40.77]},
            {"type": "Point", "coordinates": [-73.98, 40.76]},
            {"type": "Point", "coordinates": [-73.99, 40.75]}
        ],
        "createdAt": datetime.now(),
        "updatedAt": datetime.now(),
        "status": "Activo",
        "deletedAt": None
    },
    {
        "Nombre": "Recorrido Montaña",
        "descripcion": "Ruta de senderismo desde el punto C hasta el punto D.",
        "Distancia": 8.5,
        "Estimado": 120,
        "Puntos": [
            {"type": "Point", "coordinates": [-74.01, 40.70]},
            {"type": "Point", "coordinates": [-74.02, 40.71]},
            {"type": "Point", "coordinates": [-74.03, 40.72]}
        ],
        "createdAt": datetime.now(),
        "updatedAt": datetime.now(),
        "status": "Inactivo",
        "deletedAt": None
    }
]

rutas.insert_many(recorridos)
'''

def agregarRuta(nombre, descripcion, distancia, estimado, puntos):
    puntos_separados = [{"type": "Point", "coordinates": [punto["longitud"], punto["latitud"]]} for punto in puntos]
    documento = {
        "Nombre": nombre,
        "descripcion": descripcion,
        "Distancia": distancia,
        "Estimado": estimado,
        "Puntos": puntos_separados,
        "createdAt": datetime.now(),
        "updatedAt": datetime.now(),
        "status": "Activo",
        "deletedAt": None
    }
    try:
        result = rutas.insert_one(documento)
        print(f"Documento insertado con ID: {result.inserted_id}")
    except Exception as e:
        print(f"Error al insertar documento: {e}")

def obtenerRuta(nombre):
    try:
        result = rutas.find_one({"Nombre": nombre})
        if result:
            print(f"Documento encontrado: {result}")
        else:
            print("No se encontró el documento")
    except Exception as e:
        print(f"Error al obtener documento: {e}")

def eliminarRuta(nombre):
    try:
        result = rutas.update_one(
            {"Nombre": nombre},
            {"$set": {"status": "Inactivo", "deletedAt": datetime.now()}}
        )
        print(f"Documento eliminado: {result.modified_count}")
    except Exception as e:
        print(f"Error al eliminar documento: {e}")

def obtenerRutas():
    try:
        result = rutas.find()
        for ruta in result:
            print(ruta)
    except Exception as e:
        print(f"Error al obtener documentos: {e}")

def obtenerRutasActivas():
    try:
        result = rutas.find({"status": "Activo"})
        for ruta in result:
            print(ruta)
    except Exception as e:
        print(f"Error al obtener documentos: {e}")

def actualizarRuta(nombre, descripcion, distancia, estimado, puntos):
    puntos_separados = [{"type": "Point", "coordinates": [punto["longitud"], punto["latitud"]]} for punto in puntos]
    try:
        result = rutas.update_one(
            {"Nombre": nombre},
            {"$set": {
                "descripcion": descripcion,
                "Distancia": distancia,
                "Estimado": estimado,
                "Puntos": puntos_separados,
                "updatedAt": datetime.now()
            }}
        )
        print(f"Documento actualizado: {result.modified_count}")
    except Exception as e:
        print(f"Error al actualizar documento: {e}")
