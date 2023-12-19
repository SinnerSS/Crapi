import requests, os
import xml.etree.ElementTree as ET
from config import Config

def fetch_exchange_rate(base_currency, target_currency, api_endpoint):
  if api_endpoint == "Exchange":
    url = Config.EXCHANGE_RATE_URL + f"?access_key={os.environ.get('EXCHANGE_RATE_API_KEY')}"
  elif api_endpoint == "Vietcombank":
    url = Config.VIETCOMBANK_RATE_URL
  elif api_endpoint == "Techcombank":
    url = Config.TECHCOMBANK_RATE_URL

  try:
    response = requests.get(url);
    if response.status_code == 200:
      if api_endpoint == "Exchange":
        data = response.json()
        data['rates']['EUR'] = 1

        base_rate = data['rates'][base_currency]
        target_rate = data['rates'][target_currency] 
        return target_rate / base_rate
      elif api_endpoint == "Vietcombank":
        root = ET.fromstring(response.content)
        root.append(ET.Element('Exrate', CurrencyCode='VND', CurrencyName='VIETNAMESE DONG', Buy='1', Transfer='1', Sell='1'))
        
        for exrate in root.findall('Exrate'):
          if exrate.attrib['CurrencyCode'] == base_currency:
            base_rate = float(exrate.attrib['Transfer'].replace(',', ''))
          elif exrate.attrib['CurrencyCode'] == target_currency:
            target_rate = float(exrate.attrib['Transfer'].replace(',', ''))

        if base_rate and target_rate:
          return base_rate / target_rate # FIX: base_rate and target_rate are in reversed
  
  except RequestException as e:
    print(f"Request Exception: {e}")
    return None


  return None
