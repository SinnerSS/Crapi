from flask import Blueprint, request, jsonify
from ..api import api_handler

fluctuation_bp = Blueprint('fluctuation', __name__)

@fluctuation_bp.route('/fluctuation', methods=['POST'])
def fluctuation():
    if request.method == 'POST':
        data = request.json

        date = data.get("date")
        currency = data.get("currency")

        result = api_handler.fetch_historical_rate(date, currency)

        return jsonify({'result': result}), 200
    else:
        return 'Method not allowed', 405
