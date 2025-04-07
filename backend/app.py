from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/api/hello', methods=['GET'])
def hello_world():
    return jsonify(message="Hello, World!")

@app.route('/api/blog', methods=['POST'])
def receive_data():
    data = request.form.get('blog content') # Process the data as needed
    if not data:
        return jsonify(error="No data received"), 400
    return jsonify(message="Data received", data=data)

if __name__ == '__main__':
    app.run(debug=True)