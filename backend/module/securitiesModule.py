# -> check stock price 
#pip install polygon-api-client
# polygon-api-client-1.7.1
import yfinance as yf
import pandas as pd
from module.databaseConnection import create_engine
from module.classes.market_data import Market_Data
from module.classes.securities import Securities
from module.classes.watchlist import Watchlist
from module.classes.watchlist_securities import Watchlist_Securities

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

"""
Code based on the database 
"""
def get_watchlist_by_user_id(userID):
    engine = create_engine()
    sql = f"SELECT * FROM watchlist WHERE userID='{userID}'"
    result = engine.execute(sql)
    if result.rowcount>0:
        info = result.fetchone()
        watchlist = Watchlist(info[0], info[1])
        return {
            "code": 200,
            "data": watchlist.to_dict()
        }
    return{
        "code": 404,
        "data": None 
    }

def get_watchlist_securities_by_watchlist_id(watchlistID):
    engine = create_engine()
    sql = f"SELECT * FROM watchlist_securities WHERE watchlistID='{watchlistID}'"
    result = engine.execute(sql)
    if result.rowcount>0:
        info = result.fetchone()
        watchlistSecurities = Watchlist_Securities(info[0], info[1], info[2])
        return {
            "code": 200,
            "data": watchlistSecurities.to_dict()
        }
    return{
        "code": 404,
        "data": None 
    }

def get_market_data_by_ticker(ticker):
    engine = create_engine()
    sql = f"SELECT * FROM market_data WHERE ticker='{ticker}'"
    result = engine.execute(sql)
    if result.rowcount>0:
        info = result.fetchone()
        marketdata = Market_Data(info[0], info[1], info[2],info[3], info[4], info[5],info[6], info[7], info[8])
        return {
            "code": 200,
            "data": marketdata.to_dict()
        }
    return{
        "code": 404,
        "data": None 
    }
def get_all_ticker():
    engine = create_engine()
    sql = f"SELECT * FROM securities"
    result = engine.execute(sql)
    if result.rowcount>0:
        tickers = []
        for info in result.fetchall():
            securities = Securities(info[0])
            tickers.append(securities.get_ticker())
        return {
            "code": 200,
            "data": tickers
        }
    return{
        "code": 404,
        "data": [] 
    }
def update_market_data_for_recent_30_days_data():
    engine = create_engine()
    try: 
        tickers = get_all_ticker()["data"]
        sql = "DELETE FROM market_data;"
        engine.execute(sql)
        for ticker in tickers:
            try: 
                ticker_info = yf.Ticker(ticker)
                print(ticker)
                data = ticker_info.history(period="1mo").reset_index()
                for index, row in data.iterrows():
                    date = row["Date"].date()
                    openPrice = row["Open"]
                    highPrice = row["High"]
                    lowPrice = row["Low"]
                    closingPrice = row["Close"]
                    volume = row["Volume"]
                    dividends = row["Dividends"]
                    stockSplit = row["Stock Splits"]
                    # market_data = Market_Data(ticker, date, openPrice, highPrice, lowPrice, closingPrice, volume, dividends, stockSplit)
                    sql = """
                    INSERT INTO market_data
                    (ticker,
                    date,
                    openPrice,
                    highPrice,
                    lowPrice,
                    closingPrice,
                    volume,
                    dividends,
                    stockSplit)
                    VALUES
                    ('%s','%s','%s','%s','%s','%s','%s','%s','%s');
                    """%(ticker, date, openPrice, highPrice, lowPrice, closingPrice, volume, dividends, stockSplit)
                    # print(sql)
                    engine.execute(sql)
            except:
                print("{ticker} does not generate successfully")
        return {
            "code": 200,
            "message": "Updata market data for recent 30 days data successfully"
        }
    except Exception as e:
        return {
            "code": 503,
            "message": str(e)
        }
    