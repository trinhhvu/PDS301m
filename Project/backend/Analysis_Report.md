# Analytical Insights on Vietnam Silver Price (2023-2025)
**Project: Analysis and Forecast of Vietnam Silver Trend**

## 1. Methodology and Data
The project utilized:
*   **Web Scraping (`BeautifulSoup`):** Extracted real-world Premium margins between Vietnam physical markets and global markets from open sources (e.g., investing.vn).
*   **REST API (`yfinance`):** Collected comprehensive 2-year history of Global Silver Spot Prices (`SI=F`) and `USD/VND=X` exchange rates. This provided a total of 502 records (after dropping N/A values).
*   **Data Simulation:** Interpolated the actual Vietnam Silver price time series based on the `Ounce -> Tael` conversion combined with exchange rates and daily premiums.

## 2. Conducted Analysis (Jupyter Notebook)
All source code for the analysis is available in `Analysis_Notebook.ipynb`. We achieved the following:
1.  **Data Cleaning & ETL** using Pandas DataFrames to effectively handle missing data.
2.  **Daily Returns Calculation** to accurately measure standard deviation (`std()`) and assess investment risk.
3.  **Seasonality Analysis** using `.groupby('Month')` to find optimal buying/selling windows. (For example, trading frequency surges near the Lunar New Year/God of Wealth Day causing major price fluctuations).

## 3. Top 5 Key Insights
Based on data visualization, the following conclusions were drawn:
*   **Insight 1 (High Correlation):** The Line Chart demonstrates that Vietnam prices and Global Prices share an almost perfect correlation (Correlation Heatmap ~1.0). The USD/VND exchange rate acts as the secondary variable influencing profitability.
*   **Insight 2 (Low Stability/High Volatility):** The histogram distribution of daily percent changes is relatively wide. This implies that silver is not an ideal safe-haven asset for highly risk-averse investors, as the swing margin is very large.
*   **Insight 3 (Seasonality - Cyclical Nature):** Bar chart analysis by month shows a clear sell-off cycle around summer (May, June) where prices bottom out, while Q1 and Q4 generally maintain high price levels—indicating golden moments for closing trades.
*   **Insight 4 (Real-world Premium):** Despite immense global price volatility, domestic brands (like DOJI/SJC) maintain a fixed price anchor to ensure liquidity (usually an excess of 500,000 VND - 800,000 VND per tael over the converted global price).
*   **Insight 5 (Investment Recommendation):** Avoid buying during US inflation news announcements (which boost the USD), because compound volatility (silver price crashes while the exchange rate spikes) can cause double unhedged losses when holding physical taels.

**Reporting Complete.** Data and Notebooks are ready for further evaluation.
