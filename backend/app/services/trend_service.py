from flask import Blueprint, request, jsonify
from ..api import api_handler

trend_bp = Blueprint('trend', __name__)

@trend_bp.route('/trend', methods=['POST'])
def trend():
    if request.method == 'POST':
        data = request.json

        date = data.get("date")
        currency = data.get("currency")

        result = api_handler.fetch_historical_rate(date, currency)

        return jsonify({'result': result}), 200
    else:
        return 'Method not allowed', 405
