file_path = '../demo/'

puntos = []
#leer todos los archivos de la carpeta
import os
import requests

for file_name in os.listdir(file_path):
    puntos = []
    if file_name.endswith(".txt"):
        with open(file_path + file_name, 'r') as file:
            lines = file.readlines()
            # Saltar las dos primeras líneas (encabezados)
            for line in lines[2:]:
                # Eliminar espacios en blanco y saltos de línea
                line = line.strip()
                if line:  # Si la línea no está vacía
                    # Dividir la línea en latitud y longitud
                    lat, lon = line.split(',')
                    # Añadir a las listas correspondientes
                    puntos.append({"latitud": float(lat), "longitud": float(lon)})
    data = {
        "nombre": f"{file_name[:-4]}",
        "descripcion": "Ruta de prueba para el sistema de taxis.",
        "distancia": 5.3,
        "estimado": 45,
        "puntos": puntos
    }
    response = requests.post('http://localhost:5000/addRoute', json=data)