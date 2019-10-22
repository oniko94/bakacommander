import os

from flask import Flask, jsonify, render_template
from pathlib import Path

from commander.api import views as api_views
from commander.api.exceptions import APINotFoundError


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(HOME_DIR=Path.home())

    app.register_blueprint(api_views.bp)

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.errorhandler(APINotFoundError)
    def handle_not_found(error):
        response = jsonify(error.serialize())
        response.status_code = error.status_code
        return response

    @app.route('/', methods=['GET'])
    def index():
        return render_template('index.html')

    return app
