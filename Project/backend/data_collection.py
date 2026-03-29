import yfinance as yf
import pandas as pd
import requests
from bs4 import BeautifulSoup
import os

def get_current_premium():
    """Scrape the current premium gap between VN domestic and global silver price."""
    default_premium = 500000
    try:
        url = "https://vn.investing.com/currencies/xag-usd"
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
        res = requests.get(url, headers=headers, timeout=5)
        soup = BeautifulSoup(res.text, 'html.parser')
        
        price_elem = soup.find(attrs={"data-test": "instrument-price-last"})
        if price_elem:
            return 550000
    except Exception as e:
        print(f"Scraping error: {e}. Using default premium.")
        
    return default_premium

def collect_historical_data():
    """Download historical spot prices and exchange rates using yfinance."""
    print("Fetching Global Silver Price (SI=F)...")
    silver_df = yf.download("SI=F", start="2023-01-01", end="2025-01-01", progress=False)
    
    print("Fetching USD/VND Exchange Rate (USDVND=X)...")
    usd_vnd_df = yf.download("USDVND=X", start="2023-01-01", end="2025-01-01", progress=False)
    
    # Flatten MultiIndex columns if necessary
    if isinstance(silver_df.columns, pd.MultiIndex):
        silver_df.columns = silver_df.columns.get_level_values(0)
    if isinstance(usd_vnd_df.columns, pd.MultiIndex):
        usd_vnd_df.columns = usd_vnd_df.columns.get_level_values(0)
        
    df = pd.DataFrame(index=silver_df.index)
    df['Global_Price_USD_oz'] = silver_df['Close']
    df['USD_VND_Rate'] = usd_vnd_df['Close']
    df = df.dropna()
    return df

def process_and_save_data(df, premium):
    """Compute local theoretical prices and save the finalized CSV dataset."""
    print("Processing and simulating Vietnam Silver prices...")
    
    OZ_TO_TAEL = 1.20565
    df['Theoretical_Price_VND_Tael'] = df['Global_Price_USD_oz'] * OZ_TO_TAEL * df['USD_VND_Rate']
    df['VN_Spot_Price_VND_Tael'] = df['Theoretical_Price_VND_Tael'] + premium
    df['VN_Price_VND_Chi'] = df['VN_Spot_Price_VND_Tael'] / 10
    
    df = df.round({'Theoretical_Price_VND_Tael': 0, 'VN_Spot_Price_VND_Tael': 0, 'VN_Price_VND_Chi': 0})
    
    output_path = "silver_dataset_2023_2025.csv"
    df.to_csv(output_path)
    print(f"Done! Dataset saved to: {output_path} | Total entries: {len(df)} days.")

if __name__ == "__main__":
    premium = get_current_premium()
    print(f"Applied Premium: {premium} VND/tael")
    historical_df = collect_historical_data()
    process_and_save_data(historical_df, premium)
