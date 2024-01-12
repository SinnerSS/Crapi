import requests
from requests_cache import SQLiteCache, CachedSession
from datetime import date
from config import Config

backend = SQLiteCache('cache/techcombank_cache')
session = CachedSession(backend=backend, timeout=86400)

def fetch_exchange_rate(base_currency, target_currency) :
  current_date = date.today()

  url = Config.TECHCOMBANK_RATE_URL

  try:
    headers = {'User-Agent': 'Mozilla/5.0'}
    response = session.get(url, headers=headers)
    
    data = response.json()

    data[0]['spotRate'].append({'sourceCurrency': 'VND', 'bidRateCK': 1})
    for spot_rate in data[0]['spotRate'] :
      if spot_rate['sourceCurrency'] == base_currency:
        base_rate = spot_rate['bidRateCK']
      elif spot_rate['sourceCurrency'] == target_currency:
        target_rate = spot_rate['bidRateCK']

    return base_rate / target_rate
  except requests.RequestException as e:
    print(f"Request Exception: {e}" + response)
    return None

  return None

def fetch_symbol_list() :
  url = Config.TECHCOMBANK_RATE_URL

  try:
    headers = {'User-Agent': 'Mozilla/5.0'}
    response = session.get(url, headers=headers)
    
    data = response.json()

    data[0]['spotRate'].append({'sourceCurrency': 'VND', 'bidRateCK': 1})
    
    symbols = [spot_rate['sourceCurrency'] for spot_rate in data[0]['spotRate']]

    return symbols
  except requests.RequestException as e:
    print(f"Request Exception: {e}" + response)
    return None

  return None
