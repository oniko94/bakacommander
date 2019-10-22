import os
import platform
from pathlib import Path


def split_path(path):
    if platform.system() == 'Windows':
        return path.split('\\')
    else:
        return path.split('/')


def get_link_back(path):
    url_parts = split_path(path)
    if len(url_parts) > 1:
        url_parts.pop()
        return '/'.join(url_parts)
    return ''


def get_name(path):
    url_parts = split_path(path)
    return '/'.join(url_parts)


def get_item_type(item):
    if item.suffix and item.is_file():
        return '{} File'.format(item.suffix.upper())
    elif os.path.isdir(item):
        return 'Directory'
    return 'Raw Data'


def get_current_dir_index(dir_path, subdir_path=''):
    dir_index = []
    try:
        dir_list = os.listdir(dir_path)
    except FileNotFoundError as err:
        raise err

    for record in dir_list:
        item = Path(dir_path / record)
        link = '{}'.format(item.name)

        if subdir_path:
            link = '{}/{}'.format(str(subdir_path), record)

        if item.is_symlink():
            continue

        dir_index.append({
            'name': item.name,
            'link': link,
            'type': get_item_type(item),
            'created_at': get_creation_date(item),
            'modified_at': os.path.getmtime(item)
        })

    return dir_index


def get_creation_date(path):
    """
    Get the file or directory creation date
    Falls back to last modified date if not possible
    All credit to https://github.com/ExplodingCabbage
    https://stackoverflow.com/a/39501288
    :param path:
    :return: UNIX timestamp of creation or last modification date
    """
    if platform.system() == 'Windows':
        return os.path.getctime(path)
    else:
        stat = os.stat(path)
        try:
            return stat.st_birthtime
        except AttributeError:
            # For Linux
            return stat.st_mtime
