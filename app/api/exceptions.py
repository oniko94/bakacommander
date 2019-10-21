class APIBaseError(Exception):
    status_code = 500

    def __init__(self, message, payload=None):
        Exception.__init__(self)
        self.message = message
        self.payload = payload

    def serialize(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv


class APINotFoundError(APIBaseError):
    status_code = 404

    def __init__(self, filepath, payload=None):
        msg = 'The system cannot find this path specified: {}'.format(filepath)
        APIBaseError.__init__(self, msg, payload)
