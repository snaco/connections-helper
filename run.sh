SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"
(cd $SCRIPT_DIR && pipenv run python app.py)