import requests, os
from . import exchange_rate_handler
from . import vietcombank_handler
from config import Config

def fetch_exchange_rate(base_currency, target_currency, api_endpoint):
  if api_endpoint == "Exchange":
    return exchange_rate_handler.fetch_exchange_rate(base_currency, target_currency)
  elif api_endpoint == "Vietcombank":
    return vietcombank_handler.fetch_exchange_rate(base_currency, target_currency)
  elif api_endpoint == "Techcombank":
    pass

  return None
