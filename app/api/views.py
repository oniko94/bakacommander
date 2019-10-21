import os
from flask import Blueprint, current_app, jsonify
from pathlib import Path

from app.api import utils
from app.api.exceptions import APINotFoundError

bp = Blueprint('api', __name__, url_prefix='/api')


@bp.route('/', defaults={'subdir_path': ''})
@bp.route('/<path:subdir_path>')
def index(subdir_path):
    home_dir = current_app.config.get('HOME_DIR')
    current_path = Path(home_dir)
    current_dir_index = []

    if subdir_path:
        current_path = current_path / subdir_path

    try:
        dir_list = os.listdir(current_path)
    except FileNotFoundError:
        raise APINotFoundError(current_path)
    else:
        for record in dir_list:
            item = Path(current_path / record)
            current_dir_index.append({
                'name': item.name,
                'type': utils.get_item_type(item)
            })

        return jsonify(current_dir_index)
