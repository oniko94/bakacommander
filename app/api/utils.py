import os


def get_item_type(item):
    if item.suffix and os.path.isfile(item):
        return '{} File'.format(item.suffix.upper())
    elif os.path.isdir(item):
        return 'Directory'
    return 'Text Data'
