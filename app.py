from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse

app = Flask(__name__, static_url_path='', static_folder='covid19-map/build')
CORS(app)
#api = API(app)

@app.route('/', defaults={'path':''}, methods=["GET", "POST"])
def mainPage(path):
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == "__main__":
    app.run(debug=True)