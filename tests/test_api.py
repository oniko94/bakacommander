import json
from pathlib import Path
from pyfakefs.fake_filesystem_unittest import TestCase
from commander import app


class APITestCase(TestCase):
    def setUp(self):
        self.setUpPyfakefs()
        self.fs.create_dir('/test')
        test_app = app.create_app({
            'TESTING': True,
            'HOME_DIR': Path('/test')
        })
        self.app = test_app.test_client()

    def tearDown(self):
        pass

    def test_home_view(self):
        self.fs.create_file('/test/dummy.txt')
        self.fs.create_file('/test/otherdummy.txt')
        response = self.app.get('/api/')
        self.assertEqual(200, response.status_code)
        data = json.loads(response.data)
        self.assertEqual('/test', data['name'])
        self.assertEqual('', data['link_back'])
        expected_filenames = ['dummy.txt', 'otherdummy.txt']
        response_filenames = [item['name'] for item in data['content']]
        self.assertListEqual(expected_filenames, response_filenames)

    def test_home_subdir_view(self):
        self.fs.create_dir('/test/subdir')
        self.fs.create_file('/test/subdir/dummy.txt')
        response = self.app.get('/api/subdir')
        self.assertEqual(200, response.status_code)
        data = json.loads(response.data)
        self.assertEqual('/test/subdir', data['name'])
        self.assertEqual('/test', data['link_back'])
        dummy_file = data['content'][0]
        self.assertEqual('dummy.txt', dummy_file['name'])

    def test_read_file(self):
        self.fs.create_file('/test/dummy.txt', contents='Lorem ipsum')
        response = self.app.get('/api/dummy.txt')
        self.assertEqual(200, response.status_code)
        data = json.loads(response.data)
        self.assertEqual('/test/dummy.txt', data['name'])
        self.assertEqual('Lorem ipsum', data['content'])

    def test_not_found_error(self):
        response = self.app.get('/api/abdabdablua')
        self.assertEqual(404, response.status_code)
        error_message = json.loads(response.data)['message']
        self.assertEqual(
            'The system cannot find this path specified: \\test\\abdabdablua',
            error_message
        )
