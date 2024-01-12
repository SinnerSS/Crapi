import requests, os
from requests_cache import SQLiteCache, CachedSession , NEVER_EXPIRE
from config import Config

convert_backend = SQLiteCache('cache/fixer_convert_cache')
convert_session = CachedSession(backend=convert_backend, timeout=3600)

def fetch_exchange_rate(base_currency, target_currency) :
  url = Config.FIXER_URL + f"latest?access_key={os.environ.get('FIXER_API_KEY')}"

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

fluctuation_backend = SQLiteCache('cache/fixer_fluctuation_cache')
fluctuation_database = CachedSession(backend=fluctuation_backend, timeout=NEVER_EXPIRE)

def fetch_historical_rate(date, currency) :
  url = Config.FIXER_URL + f"{date}?access_key={os.environ.get('FIXER_API_KEY')}"

  try:
    response = fluctuation_database.get(url)

    data = response.json()

    return data['rates'][currency] / data['rates']['USD']
    
  except RequestException as e:
    print(f"Request Exception: {e}")
    return None

  return None

def fetch_symbol_list() :
  url = Config.FIXER_URL + f"symbols?access_key={os.environ.get('FIXER_API_KEY')}"

  try:
    response = requests.get(url)

    data = response.json()

    return list(data['symbols'].keys())
  except RequestException as e:
    print(f"Request Exception: {e}")
    return None
  
  return None