from pathlib import Path
from pyfakefs.fake_filesystem_unittest import TestCase
from commander import app, fsutils


class FSUtilsTestCase(TestCase):
    def setUp(self):
        self.setUpPyfakefs()
        self.fs.create_dir('/test')
        test_app = app.create_app({
            'TESTING': True,
            'HOME_DIR': Path('/test')
        })
        self.app = test_app.test_client()

    def test_no_link_back(self):
        result = fsutils.get_link_back('test')
        self.assertEqual('', result)

    def test_link_back_made(self):
        self.fs.create_dir('/test/subtest')
        path = Path('/test/subtest')
        result = fsutils.get_link_back(str(path))
        self.assertEqual('/test', result)

    def test_item_type_with_suffix(self):
        self.fs.create_file('/test/dummy.txt')
        path = Path('/test/dummy.txt')
        result = fsutils.get_item_type(path)
        self.assertEqual('.TXT File', result)

    def test_item_type_directory(self):
        self.fs.create_dir('/test/subtest')
        path = Path('/test/subtest')
        result = fsutils.get_item_type(path)
        self.assertEqual('Directory', result)

    def test_item_type_raw_text(self):
        self.fs.create_file('/test/.testfile')
        path = Path('/test/.testfile')
        result = fsutils.get_item_type(path)
        self.assertEqual('Raw Data', result)

    def test_dir_index_skip_symlink(self):
        self.fs.create_file('/test/verysecret/secret.txt')
        self.fs.create_file('/test/dummy.txt')
        self.fs.create_symlink(
            file_path='/test/Symlink',
            link_target='/test/verysecret/secret.txt'
        )
        path = Path('/test')
        result = fsutils.get_current_dir_index(path)
        dir_index_names = [item['name'] for item in result]
        self.assertNotIn('Symlink', dir_index_names)


