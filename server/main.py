from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return jsonify(message="Hello, World!")

@app.route('/location', methods=['POST'])
def location():
    data = request.json
    print(f"Device location: {data}")
    return jsonify(status="success", data=data)

if __name__ == '__main__':
    app.run(debug=True)
