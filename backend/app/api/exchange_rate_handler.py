import requests, os
from requests_cache import SQLiteCache, CachedSession , NEVER_EXPIRE
from config import Config

convert_backend = SQLiteCache('cache/exchange_rate_convert_cache')
convert_session = CachedSession(backend=convert_backend, timeout=3600)

def fetch_exchange_rate(base_currency, target_currency) :
  url = Config.EXCHANGE_RATE_URL + f"latest?access_key={os.environ.get('EXCHANGE_RATE_API_KEY')}"

  try:
    response = convert_session.get(url)

    data = response.json()
    data['rates']['EUR'] = 1

    base_rate = data['rates'][base_currency]
    target_rate = data['rates'][target_currency] 
    return target_rate / base_rate
  except RequestException as e:
    print(f"Request Exception: {e}")
    return None

  return None

trend_backend = SQLiteCache('cache/exchange_rate_trend_cache')
trend_database = CachedSession(backend=trend_backend, timeout=NEVER_EXPIRE)

def fetch_historical_rate(date, currency) :
  url = Config.EXCHANGE_RATE_URL + f"{date}?access_key={os.environ.get('EXCHANGE_RATE_API_KEY')}"

  try:
    response = trend_database.get(url)

    data = response.json()

    return data['rates']['VND'] / data['rates'][currency]
    
  except RequestException as e:
    print(f"Request Exception: {e}")
    return None

  return None

def fetch_symbol_list() :
  url = Config.EXCHANGE_RATE_URL + f"symbols?access_key={os.environ.get('EXCHANGE_RATE_API_KEY')}"

  try:
    response = convert_session.get(url)

    data = response.json()

    return list(data['symbols'].keys())
  except RequestException as e:
    print(f"Request Exception: {e}")
    return None
  
  return None