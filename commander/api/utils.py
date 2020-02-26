from flask import jsonify


def response_success(name, link_back, home_dir, content):
    response = jsonify(
        name=name,
        link_back=link_back,
        home_dir=home_dir,
        content=content
    )
    response.status_code = 200
    return response

