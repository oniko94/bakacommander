from flask import jsonify


def response_success(name, link_back, content):
    data = {
        'name': name,
        'link_back': link_back,
        'content': content
    }
    response = jsonify(data)
    response.status_code = 200
    return response

