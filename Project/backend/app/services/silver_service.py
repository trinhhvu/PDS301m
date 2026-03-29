import yfinance as yf
import pandas as pd
import os
from datetime import datetime

class SilverService:
    @staticmethod
    def get_weekly_price():
        """Fetch the last 7 days of silver prices from Yahoo Finance."""
        ticker = "SI=F"
        data = yf.Ticker(ticker).history(period="7d")
        return [
            {"date": d.strftime("%d/%m"), "price": round(r['Close'], 2)}
            for d, r in data.iterrows()
        ]

    @staticmethod
    def get_historical_data():
        """Retrieve historical data from the local CSV dataset."""
        try:
            base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
            csv_path = os.path.join(base_dir, "silver_dataset_2023_2025.csv")
            if not os.path.exists(csv_path):
                return None
            
            df = pd.read_csv(csv_path)
            # Sample data every 5 days for smoother charting visualization
            df = df.iloc[::5, :]
            
            return [
                {
                    "date": str(row['Date'])[:10],
                    "global_price": round(row['Global_Price_USD_oz'], 2),
                    "vn_price": round(row['VN_Spot_Price_VND_Tael'], 0)
                }
                for _, row in df.iterrows()
            ]
        except Exception as e:
            print(f"Error reading historical CSV: {e}")
            return None

    @staticmethod
    def get_live_data():
        """Fetch live spot price and USD/VND exchange rate."""
        tickers = yf.Tickers('XAGUSD=X USDVND=X')
        try:
            spot = tickers.tickers['XAGUSD=X'].fast_info['last_price']
            usdvnd = tickers.tickers['USDVND=X'].fast_info['last_price']
        except Exception as e:
            # Fallback mock values in case of API failure
            spot, usdvnd = 31.0, 25450.0
            
        local_est_chi = round(spot * 1.20565 * usdvnd / 10, 0)
        return {
            "spot": round(spot, 2),
            "usd_vnd": round(usdvnd, 0),
            "local_price": local_est_chi
        }
