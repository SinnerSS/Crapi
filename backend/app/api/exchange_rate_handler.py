import requests, os
from requests_cache import SQLiteCache, CachedSession 
from config import Config

backend = SQLiteCache('cache/exchange_rate_cache')
session = CachedSession(backend=backend, timeout=3600)

def fetch_exchange_rate(base_currency, target_currency) :
  url = Config.EXCHANGE_RATE_URL + f"latest?access_key={os.environ.get('EXCHANGE_RATE_API_KEY')}"

  try:
    response = session.get(url)

    data = response.json()
    data['rates']['EUR'] = 1

    base_rate = data['rates'][base_currency]
    target_rate = data['rates'][target_currency] 
    return target_rate / base_rate
  except RequestException as e:
    print(f"Request Exception: {e}")
    return None

  return None

def fetch_symbol_list() :
  url = Config.EXCHANGE_RATE_URL + f"symbols?access_key={os.environ.get('EXCHANGE_RATE_API_KEY')}"

  try:
    response = session.get(url)

    data = response.json()

    return list(data['symbols'].keys())
  except RequestException as e:
    print(f"Request Exception: {e}")
    return None
  
  return None