from flask import Blueprint, request, jsonify
from config import Config
from ..api import api_handler

convert_bp = Blueprint('convert', __name__)

@convert_bp.route('/convert', methods=['POST'])
def convert():
    if request.method == 'POST':
        data = request.json

        from_currency = data.get('fromCurrency')
        to_currency = data.get('toCurrency')
        amount = data.get('amount')
        selected_api = data.get('selectedAPI')

        rate = api_handler.fetch_exchange_rate(from_currency, to_currency, selected_api)

        result = float(amount) * float(rate)

        return jsonify({'result': result}), 200
    else:
        return 'Method not allowed', 405

@convert_bp.route('/convert/VND', methods=['POST'])
def get_trade_rate_list():
    if request.method == 'POST':
        data = request.json

        currency = data.get('currency')

        result = {api:api_handler.fetch_exchange_rate(currency, 'VND', api) for api in Config.TRADE_API}

        result['Baseline'] = api_handler.fetch_exchange_rate(currency, 'VND', 'Exchange')

        return jsonify({'result': result}), 200
    else:
        return 'Method not allowed', 405