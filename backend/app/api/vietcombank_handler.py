import requests, requests_cache
import xml.etree.ElementTree as ET
from config import Config

requests_cache.install_cache('vietcombank_data', backend='sqlite', expire_after=86400)

def fetch_exchange_rate(base_currency, target_currency) :
  url = Config.VIETCOMBANK_RATE_URL

  try:
    response = requests.get(url);
    
    root = ET.fromstring(response.content)
    root.append(ET.Element('Exrate', CurrencyCode='VND', CurrencyName='VIETNAMESE DONG', Buy='1', Transfer='1', Sell='1'))
        
    for exrate in root.findall('Exrate'):
      if exrate.attrib['CurrencyCode'] == base_currency:
        base_rate = float(exrate.attrib['Transfer'].replace(',', ''))
        print('Found base')
      elif exrate.attrib['CurrencyCode'] == target_currency:
        target_rate = float(exrate.attrib['Transfer'].replace(',', ''))

    if base_rate and target_rate:
      return base_rate / target_rate # FIX: base_rate and target_rate are in reversed
  except requests.RequestException as e:
    print(f"Request Exception: {e}")
    return None

  return None
