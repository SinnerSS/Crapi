from flask import Blueprint, request, jsonify
from ..api import api_handler

info_bp = Blueprint('info', __name__)

@info_bp.route('/info', methods=['GET'])
def get_api_list():
    if request.method == 'GET':
        pass
    else:
        return 'Method not allowed', 405

@info_bp.route('/info/symbols', methods=['POST'])
def get_symbol_list():
    if request.method == 'POST':
        data = request.json

        api = data.get("api")

        result = api_handler.fetch_symbol_list(api)

        return jsonify({'result': result}), 200
    else:
        return 'Method not allowed', 405