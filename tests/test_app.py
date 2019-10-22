import tempfile
import unittest

from commander import app


class AppTestCase(unittest.TestCase):
    def setUp(self):
        test_app = app.create_app({
            'TESTING': True,
            'HOME_DIR': tempfile.mkdtemp()
        })
        self.app = test_app.test_client()

    def test_root_is_index(self):
        response = self.app.get('/')
        self.assertEqual(200, response.status_code)
        self.assertIn('BakaCommander', response.data.decode())


if __name__ == '__main__':
    unittest.main()
