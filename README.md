## Setup
1. Install Python 3 and pip
2. `python -m venv env`
3. `source env/bin/activate` for *nix or `source env\Scripts\Activate` on Windows
4. `pip install -r requirements.txt`
5. `export FLASK_APP=commander.app`
6. `export FLASK_ENV=development`
7. `export COMMANDER_SETTINGS=setup.cfg`
8. `flask run`

## Tests
1. `coverage run -m pytest`
2. `coverage html`
3. Go to `htmlcov` directory and open `index.html` to see the test coverage.
