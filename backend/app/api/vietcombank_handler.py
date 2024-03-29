import requests
import xml.etree.ElementTree as ET
from requests_cache import SQLiteCache, CachedSession
from config import Config

backend = SQLiteCache('cache/vietcombank_cache')
session = CachedSession(backend=backend, timeout=86400)

def fetch_exchange_rate(base_currency, target_currency) :
  url = Config.VIETCOMBANK_RATE_URL

  try:
    response = session.get(url);
    
    root = ET.fromstring(response.content)
    root.append(ET.Element('Exrate', CurrencyCode='VND', CurrencyName='VIETNAMESE DONG', Buy='1', Transfer='1', Sell='1'))
        
    for exrate in root.findall('Exrate'):
      if exrate.attrib['CurrencyCode'] == base_currency:
        base_rate = float(exrate.attrib['Transfer'].replace(',', ''))
      elif exrate.attrib['CurrencyCode'] == target_currency:
        target_rate = float(exrate.attrib['Transfer'].replace(',', ''))

    if base_rate and target_rate:
      return base_rate / target_rate # FIX: base_rate and target_rate are in reversed
  except requests.RequestException as e:
    print(f"Request Exception: {e}")
    return None

  return None

def fetch_symbol_list() :
  url = Config.VIETCOMBANK_RATE_URL

  try:
    response = session.get(url);
    
    root = ET.fromstring(response.content)
    root.append(ET.Element('Exrate', CurrencyCode='VND', CurrencyName='VIETNAMESE DONG', Buy='1', Transfer='1', Sell='1'))
        
    symbols = [exrate.attrib['CurrencyCode'] for exrate in root.findall('Exrate')]

    return symbols
  except requests.RequestException as e:
    print(f"Request Exception: {e}")
    return None
  
  return None
