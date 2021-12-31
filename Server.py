from flask import Flask
from flask_restful import Resource, Api
import socket

app = Flask(__name__)
api = Api(app)

class IP(Resource):
    # methods go here
    def get(self, domain, TLD):
        ip = socket.gethostbyname(f'{domain}.{TLD}')
        return {'data' : ip}

api.add_resource(IP, '/IP/<string:domain>/<string:TLD>')

if __name__ == '__main__':
    app.run()
