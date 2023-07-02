from flask import Flask, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/hello', methods=['POST'])
def hello():
    # Get the data sent by client
    data = request.json
    print(data)

    # Process the data and send response
    return {'express': 'Hello From Flask'}

if __name__ == '__main__':
    app.run(port=5000)