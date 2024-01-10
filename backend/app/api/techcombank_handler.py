import requests, requests_cache
from datetime import date
from config import Config

#requests_cache.install_cache('techcombank_data', backend='sqlite', expire_after=86400)

def fetch_exchange_rate(base_currency, target_currency) :
  current_date = date.today()

  url = Config.TECHCOMBANK_RATE_URL

  try:
    headers = {'User-Agent': 'Mozilla/5.0'}
    response = requests.get(url, headers=headers)
    
    data = response.json()

    data[0]['spotRate'].append({'sourceCurrency': 'VND', 'bidRateCK': 1})
    for spot_rate in data[0]['spotRate'] :
      print(spot_rate)
      if spot_rate['sourceCurrency'] == base_currency:
        print('Found base')
        base_rate = spot_rate['bidRateCK']
      elif spot_rate['sourceCurrency'] == target_currency:
        target_rate = spot_rate['bidRateCK']

    return base_rate / target_rate
  except requests.RequestException as e:
    print(f"Request Exception: {e}" + response)
    return None

  return None
