# -> check stock price 
#pip install polygon-api-client
# polygon-api-client-1.7.1
import yfinance as yf
import pandas as pd

def get_all_stocks():
    all_stock_info = {

    }
    return all_stock_info

def get_stock_price(stock_name):
    price = 0 #get stock price
    return {
        stock_name: price
    }

# FUNCTION BEFORE MIDTERM 


# View My Positions

# Select Stock

# View Stock Details
def view_stock_details(ticker, period, interval):
    # Fetch the stock data
    # interval = [1m, 2m, 5m, 15m, 30m, 60m, 90m, 1h, 1d, 5d, 1wk, 1mo, 3mo]

    stock = yf.Ticker(ticker)
    hist_data = stock.history(period=period, interval=interval)
    return hist_data.to_dict('dict')
# Create Watch List

# Update Watch List

# Select Watch List

# Update Watch List (Add or Remove)

# View Dollar Cost Average - interval is period of time 
def view_dollar_cost_average(ticker, period, investment, interval="1mo"): 
    # Fetch the stock data
    stock = yf.Ticker(ticker)

    # Get the stock's historical data
    hist_data = stock.history(period=period, interval=interval)

    # Remove rows with missing data
    hist_data = hist_data.dropna()

    # Calculate the Dollar Cost Averaging
    dca = pd.DataFrame()
    dca["Invested"] = [investment] * len(hist_data)
    dca["Shares"] = dca["Invested"] / list(hist_data["Close"])
    dca["Total Shares"] = dca["Shares"].cumsum()
    dca["Total Invested"] = dca["Invested"].cumsum()

    # Calculate the final value
    total_shares = dca["Total Shares"].iloc[-1]
    total_invested = dca["Total Invested"].iloc[-1]
    final_value = total_shares * hist_data["Close"].iloc[-1]

    # Calculate the Dollar Cost Average Price
    dca_price = total_invested / total_shares

    return {
        "ticker": ticker,
        "total_shares": total_shares,
        "total_invested": total_invested,
        "final_value": final_value,
        "dca_price": dca_price
    }

