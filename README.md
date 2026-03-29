# 🥈 SILVER PROJECT: Vietnam Silver Price Analysis & Prediction (2023-2025)

[![Python](https://img.shields.io/badge/Python-3.12+-blue.svg?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Flask](https://img.shields.io/badge/Flask-Web_API-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Pandas](https://img.shields.io/badge/Pandas-Data_Analysis-150458?style=for-the-badge&logo=pandas&logoColor=white)](https://pandas.pydata.org/)

## 📖 Project Overview
Silver Project is a comprehensive solution designed to track, analyze, and forecast silver price trends in the Vietnamese market from 2023 to 2025. It combines the power of **Web Scraping**, **Data Analysis (Jupyter/Pandas)**, and a **Web Application (React/Flask)** to provide valuable insights for investors.

---

## 📂 Directory Structure
```text
PDS301m/
├── Project/
│   ├── backend/                # Flask API & Data Processing
│   │   ├── app/                # Core Logic (Routes, Services)
│   │   ├── Analysis_Notebook.ipynb # Jupyter Notebook (Detailed Analysis)
│   │   ├── Analysis_Report.md  # Final Analytical Insights Report
│   │   └── data_collection.py  # Data scraping and processing script
│   └── frontend/               # React Vite Application
│       ├── src/                # Modern User Interface (React)
│       └── ...
├── START_PDS.py                # System automation launcher script
└── README.md                   # Documentation
```

---

## 🛠️ Technology Stack

### 🔹 Backend & Data Analysis
- **Language:** Python 3.12+
- **Key Libraries:** 
  - `yfinance`: Collect historical data from Yahoo Finance.
  - `BeautifulSoup4`: Scrape real-time premium data in Vietnam.
  - `Pandas/NumPy`: Data cleaning, formatting, and time-series analysis.
  - `Flask`: Serve REST API for the Frontend.
  - `Jupyter Notebook`: Data science and exploratory data analysis.

### 🔹 Frontend
- **Framework:** React 19 (Vite)
- **Styling:** Modern CSS (Glassmorphism & Silver/Dark Mode).
- **Visualization:** `Recharts` - Interactive Double Line Charts.

---

## 🚀 Quick Start Guide

The easiest way to start both the Backend and Frontend is by using the automated script:

```bash
# In the root directory
python START_PDS.py
```

### Manual run instructions:

1. **Start the Backend:**
   ```bash
   cd Project/backend
   pip install -r requirements.txt
   python run.py
   ```

2. **Start the Frontend:**
   ```bash
   cd Project/frontend
   npm install
   npm run dev
   ```

3. **View the Analysis Report:**
   Open `Project/backend/Analysis_Notebook.ipynb` using VS Code or Jupyter Lab.

---

## 🌐 API Endpoints
The backend system serves APIs securely on `http://localhost:5000`:

| Endpoint | Method | Description |
| :--- | :---: | :--- |
| `/api/silver-price` | `GET` | Get the last 7 days prices and the current live price. |
| `/api/silver-history` | `GET` | Get 2-year historical data from CSV for charting. |

---

## 💡 Key Insights
Based on the data analysis from 2023 to 2025, we discovered 5 major insights:

1.  **High Correlation:** Vietnam and Global Silver prices share an almost perfect correlation (~1.0).
2.  **Investment Risk:** High standard deviation (volatility) indicates silver isn't ideal for highly risk-averse investors due to large daily margins.
3.  **Seasonality:** Prices historically bottom out around May-June and peak during Q1 & Q4.
4.  **Local Premium:** Domestic brands maintain a steady premium gap of 500k - 800k VND/tael to ensure liquidity.
5.  **Caution:** Buying physical silver during strong USD spikes (e.g., inflation news in the US) can cause double unhedged losses.

---

## 👥 Contributors
- **Trinh Vu** - [trinhhvu](https://github.com/trinhhvu)
- **Tuan Anh** - [Tani2409](https://github.com/Tani2409)

---
*Developed as a Data Analysis and Web Application tracking system.*
