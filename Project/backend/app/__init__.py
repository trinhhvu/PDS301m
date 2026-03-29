from flask import Flask
from flask_cors import CORS
from flasgger import Swagger

def create_app():
    app = Flask(__name__)
    CORS(app)
    Swagger(app)
    
    from .routes import register_routes
    register_routes(app)
    
    return app
