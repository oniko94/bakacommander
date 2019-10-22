from flask import jsonify


def response_success(name, link_back, content):
    response = jsonify(
        name=name,
        link_back=link_back,
        content=content
    )
    response.status_code = 200
    return response

