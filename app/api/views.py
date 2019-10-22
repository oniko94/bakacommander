from flask import Blueprint, current_app
from pathlib import Path

from app import fsutils
from app.api.exceptions import APINotFoundError
from app.api.utils import response_success


bp = Blueprint('api', __name__, url_prefix='/api')


@bp.route('/', defaults={'subdir_path': ''})
@bp.route('/<path:subdir_path>')
def index(subdir_path):
    home_dir = current_app.config.get('HOME_DIR')
    current_path = Path(home_dir)
    link_back = ''

    if subdir_path:
        current_path = current_path / subdir_path
        link_back = fsutils.get_link_back(subdir_path)

    if current_path.is_file():
        return response_success(
            name=str(current_path),
            link_back=link_back,
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
            name=str(current_path),
            link_back=link_back,
            content=dir_index
        )
