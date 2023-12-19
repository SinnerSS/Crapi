from flask import Blueprint, request, jsonify
from ..api import currency_handler

currency_bp = Blueprint('currency', __name__)

@currency_bp.route('/convert', methods=['POST'])
def convert():
    if request.method == 'POST':
        data = request.json

        from_currency = data.get('fromCurrency')
        to_currency = data.get('toCurrency')
        amount = data.get('amount')
        selected_api = data.get('selectedAPI')

        rate = currency_handler.fetch_exchange_rate(from_currency, to_currency, selected_api)

        result = float(amount) * float(rate)

        return jsonify({'result': result}), 200
    else:
        return 'Method not allowed', 405
