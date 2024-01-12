import requests, os
from . import exchange_rate_handler
from . import techcombank_handler
from . import vietcombank_handler
from config import Config

def fetch_exchange_rate(base_currency, target_currency, api_endpoint):
  if api_endpoint == "Exchange":
    return exchange_rate_handler.fetch_exchange_rate(base_currency, target_currency)
  elif api_endpoint == "Vietcombank":
    return vietcombank_handler.fetch_exchange_rate(base_currency, target_currency)
  elif api_endpoint == "Techcombank":
    return techcombank_handler.fetch_exchange_rate(base_currency, target_currency)

  return None

def fetch_historical_rate(date, currency): 
  url = Config.FIXER_URL + f"{date}?access_key={os.environ.get('FIXER_API_KEY')}"

  try:
    response = requests.get(url)

    data = response.json()

    return data['rates'][currency]
    
  except RequestException as e:
    print(f"Request Exception: {e}")
    return None

  return None
