from pymongo import MongoClient
from datetime import datetime

# Conexión a MongoDB (ajusta la URL según tu configuración)
client = MongoClient("mongodb://localhost:27017/")

# Selecciona la base de datos
db = client.recorrido_fluvial

# Selecciona la colección
taxis = db.taxis

#Volver un indice unico
taxis.create_index([("patente")], unique=True)

documento = {
    "conductor": "Juan Perez",
    "ubicacion": {
        "latitud": 19.432608,
        "longitud": -99.133209
    },
    "velocidad": 60,
    "patente": "ABC-1233",
    "createdAt": datetime.now(),
    "eliminado": False,
    "updatedAt": datetime.now(),
    "deletedAt": None,
    "status": "Activo",
    "nombreRuta": ""
}

def agregarTaxi(conductor, patente, longitud, latitud, velocidad):
    documento = {
        "conductor": conductor,
        "ubicacion": {
            "latitud": latitud,
            "longitud": longitud
        },
        "velocidad": velocidad,
        "patente": patente,
        "ruta": "",
        "createdAt": datetime.now(),
        "eliminado": False,
        "updatedAt": datetime.now(),
        "deletedAt": None,
        "status": "Activo",
        "nombreRuta": ""
    }
    try:
        result = taxis.insert_one(documento)
        print(f"Documento insertado con ID: {result.inserted_id}")
    except Exception as e:
        print(f"Error al insertar documento: {e}")

def obtenerTaxi(patente):
    try:
        result = taxis.find_one({"patente": patente, "status": "Activo"})
        if result:
            print(f"Documento encontrado: {result}")
            return result
        else:
            print("No se encontró el documento")
    except Exception as e:
        print(f"Error al obtener documento: {e}")

def eliminarTaxi(patente):
    try:
        result = taxis.update_one(
            {"patente": patente},
            {"$set": {"eliminado": True, "deletedAt": datetime.now()}}
        )
        print(f"Documento eliminado: {result.modified_count}")
    except Exception as e:
        print(f"Error al eliminar documento: {e}")

def activarTaxi(patente, nombreRuta):
    try:
        result = taxis.update_one(
            {"patente": patente},
            {"$set": {"status": "Activo", "nombreRuta": nombreRuta, "updatedAt": datetime.now()}}
        )
        print(f"Documento activado: {result.modified_count}")
    except Exception as e:
        print(f"Error al activar documento: {e}")

def desactivarTaxi(patente):
    try:
        result = taxis.update_one(
            {"patente": patente},
            {"$set": {"status": "Inactivo", "updatedAt": datetime.now()}}
        )
        print(f"Documento desactivado: {result.modified_count}")
    except Exception as e:
        print(f"Error al desactivar documento: {e}")


def obtenerTaxis():
    try:
        result = taxis.find()
        for taxi in result:
            print(taxi)
    except Exception as e:
        print(f"Error al obtener documentos: {e}")

def obtenerTaxisActivos():
    listado = []
    try:
        result = taxis.find({"status": "Activo"})
        for taxi in result:
            listado.append(taxi)
            print(taxi)
        return listado
    except Exception as e:
        print(f"Error al obtener documentos: {e}")


def actualizarTaxiPos(patente, longitud, latitud):
    try:
        result = taxis.update_one(
            {"patente": patente},
            {"$set": {"ubicacion":{
                "latitud": latitud,
                "longitud": longitud
            }, "updatedAt": datetime.now()}}
        )
        print(f"Documento actualizado: {result.modified_count}")
    except Exception as e:
        print(f"Error al actualizar documento: {e}")

def asignarRuta(patente, ruta):
    try:
        result = taxis.update_one(
            {"patente": patente},
            {"$set": {"ruta": ruta, "updatedAt": datetime.now()}}
        )
        print(f"Documento actualizado: {result.modified_count}")
    except Exception as e:
        print(f"Error al actualizar documento: {e}")



#actualizarTaxiPos("ABC-1234", 20.432608, -100.133209)
