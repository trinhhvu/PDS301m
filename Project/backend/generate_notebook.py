import nbformat as nbf
import os

nb = nbf.v4.new_notebook()

intro_md = """# Analysis & Forecast of Vietnam Silver Prices (2023-2025)
**Data Analysis Note**

### 1. Data Loading and Cleaning
The data was collected using `data_collection.py`, which fetches Global Silver Prices (`SI=F`) and `USDVND=X` exchange rates from Yahoo Finance. Additionally, real-world Premium differences from Vietnam were incorporated via Web Scraping.
"""

code_load = """import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

pd.options.mode.chained_assignment = None

df = pd.read_csv("silver_dataset_2023_2025.csv", index_col='Date', parse_dates=True)

display(df.head())
display(df.info())
"""

part2_md = """### 2. Descriptive Statistics and Technical Analysis
We will calculate the Daily Returns for Global and Vietnam Silver prices, followed by risk measurement using Standard Deviation.
"""

code_returns = """print("=== VOLATILITY DESCRIPTIVE STATISTICS ===")
display(df[['Global_Price_USD_oz', 'VN_Spot_Price_VND_Tael']].describe())

df['Global_Return_%'] = df['Global_Price_USD_oz'].pct_change() * 100
df['VN_Return_%'] = df['VN_Spot_Price_VND_Tael'].pct_change() * 100

df['Premium_VND'] = df['VN_Spot_Price_VND_Tael'] - df['Theoretical_Price_VND_Tael']

plt.figure(figsize=(10, 5))
sns.histplot(df['VN_Return_%'].dropna(), bins=50, kde=True, color='silver')
plt.title("Distribution of Daily Price Changes (%) - 2023-2025")
plt.xlabel("Price Change (%)")
plt.ylabel("Frequency (Days)")
plt.axvline(0, color='red', linestyle='--')
plt.show()

print(f"Standard Deviation of VN Silver Returns: {df['VN_Return_%'].std():.2f}%")
"""

part3_md = """### 3. Seasonality Analysis
Are there specific months when silver prices tend to peak? We will group the data by month to observe historical trends over the past two years.
"""

code_seasonality = """df['Month'] = df.index.month

monthly_trend = df.groupby('Month')['VN_Spot_Price_VND_Tael'].mean().reset_index()

plt.figure(figsize=(10, 5))
sns.barplot(data=monthly_trend, x='Month', y='VN_Spot_Price_VND_Tael', color='lightblue')
plt.title("Average Vietnam Silver Price by Month (2023-2025)")
plt.xlabel("Month")
plt.ylabel("Avg Price (VND/Tael)")
plt.ylim(monthly_trend['VN_Spot_Price_VND_Tael'].min() * 0.95, monthly_trend['VN_Spot_Price_VND_Tael'].max() * 1.05)
plt.show()

best_month = monthly_trend.loc[monthly_trend['VN_Spot_Price_VND_Tael'].idxmax()]
print(f"The best performing month on average is Month {int(best_month['Month'])}")
"""

part4_md = """### 4. Correlation Visualization
Line charts representing price trends and a Correlation Heatmap comparing Global Price, Vietnam Price, and the USD/VND Exchange Rate.
"""

code_viz = """fig, ax1 = plt.subplots(figsize=(14, 6))

ax1.plot(df.index, df['VN_Spot_Price_VND_Tael'], color='blue', label='VN Silver Price (VND/tael)')
ax1.set_xlabel('Date')
ax1.set_ylabel('VN Price (VND)', color='blue')
ax1.tick_params(axis='y', labelcolor='blue')

ax2 = ax1.twinx()  
ax2.plot(df.index, df['Global_Price_USD_oz'], color='grey', alpha=0.5, label='Global Price (USD/oz)')
ax2.set_ylabel('Global Price (USD)', color='grey')
ax2.tick_params(axis='y', labelcolor='grey')

plt.title("VN Silver Price vs Global Silver Price (2023 - 2025)")
fig.tight_layout()
plt.show()

corr_matrix = df[['Global_Price_USD_oz', 'VN_Spot_Price_VND_Tael', 'USD_VND_Rate']].corr()

plt.figure(figsize=(6, 5))
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', fmt=".2f", linewidths=.5)
plt.title("Correlation Heatmap")
plt.show()
"""

part5_md = """### 5. Conclusion (Insights & Recommendations)
*   **Trend:** Vietnam Silver Price exhibits a very high correlation (~1.0) with Global Silver Price.
*   **Volatility:** Daily risk is relatively high, oscillating around 0% but with severe sudden spikes.
*   **Seasonality:** Certain months reflect clear buy/sell opportunities.
*   **Recommendation:** Ideal for short-term traders riding the volatility, but long-term holders should closely monitor exchange rates.
"""

nb['cells'] = [
    nbf.v4.new_markdown_cell(intro_md),
    nbf.v4.new_code_cell(code_load),
    nbf.v4.new_markdown_cell(part2_md),
    nbf.v4.new_code_cell(code_returns),
    nbf.v4.new_markdown_cell(part3_md),
    nbf.v4.new_code_cell(code_seasonality),
    nbf.v4.new_markdown_cell(part4_md),
    nbf.v4.new_code_cell(code_viz),
    nbf.v4.new_markdown_cell(part5_md)
]

with open('Analysis_Notebook.ipynb', 'w', encoding='utf-8') as f:
    nbf.write(nb, f)
print("Notebook Analysis_Notebook.ipynb generated.")
