import requests, os
from . import exchange_rate_handler
from . import techcombank_handler
from . import vietcombank_handler
from . import fixer_handler
from config import Config

def fetch_exchange_rate(base_currency, target_currency, api_endpoint):
  if api_endpoint == "Exchange":
    return exchange_rate_handler.fetch_exchange_rate(base_currency, target_currency)
  elif api_endpoint == "Vietcombank":
    return vietcombank_handler.fetch_exchange_rate(base_currency, target_currency)
  elif api_endpoint == "Techcombank":
    return techcombank_handler.fetch_exchange_rate(base_currency, target_currency)
  elif api_endpoint == "Fixer":
    return fixer_handler.fetch_exchange_rate(base_currency, target_currency)

  return None

def fetch_historical_rate(date, currency): 
  return exchange_rate_handler.fetch_historical_rate(date, currency) # TODO: Fetch through api list till success

def fetch_symbol_list(api):
  match api:
    case "Exchange":
      return exchange_rate_handler.fetch_symbol_list()
    case "Vietcombank":
      return vietcombank_handler.fetch_symbol_list()
    case "Techcombank":
      return techcombank_handler.fetch_symbol_list()
    case "Fixer":
      return fixer_handler.fetch_symbol_list()