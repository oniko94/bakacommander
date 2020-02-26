from flask import Blueprint, current_app
from flask_cors import cross_origin
from pathlib import Path

from commander import fsutils
from commander.api.exceptions import APINotFoundError
from commander.api.utils import response_success


bp = Blueprint('api', __name__, url_prefix='/api')


@bp.route('/', defaults={'subdir_path': ''})
@bp.route('/<path:subdir_path>')
@cross_origin()
def index(subdir_path):
    home_dir = current_app.config.get('HOME_DIR')
    current_path = Path(home_dir)
    link_back = ''

    if subdir_path:
        current_path = current_path / subdir_path
        link_back = fsutils.get_link_back(str(current_path))

    current_name = fsutils.get_name(str(current_path))
    homepath = '/'.join(fsutils.split_path(str(home_dir)))

    if current_path.is_file():
        return response_success(
            name=current_name,
            link_back=link_back,
            home_dir=homepath,
            content=current_path.read_text()
        )

    try:
        dir_index = fsutils.get_current_dir_index(
            dir_path=current_path,
            subdir_path=subdir_path
        )
    except FileNotFoundError:
        raise APINotFoundError(str(current_path))
    else:
        return response_success(
            name=current_name,
            link_back=link_back,
            home_dir=homepath,
            content=dir_index
        )
