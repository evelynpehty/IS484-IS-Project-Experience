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
from module.classes.all_holdings import All_Holdings
from module.classes.securities_holdings import Securities_Holdings

"""
CONVERT RATE: {1 SGD = 0.75 USD; 1 USD = 1.33 SGD}
USD = SGD * 0.75
SGD = USD / 0.75 
"""
def convert_SGD_to_USD(SGDamount):
    if SGDamount == 0: 
        return 0.0
    return SGDamount*0.75
def convert_USD_to_SGD(USDamount):
    if USDamount == 0: 
        return 0.0
    return USDamount/0.75

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
    # print(sql)
    result = engine.execute(sql)
    # print(result.rowcount)
    data = []
    # print(result.rowcount > 0)
    if result.rowcount>0:
        
        n = 1
        for info in result.fetchall():
            n += 1
            # print("CURRENT ", n)
            marketdata = Market_Data(info[0], info[1], info[2],info[3], info[4], info[5],info[6], info[7], info[8])
            data.append(marketdata.to_dict())
        return {
            "code": 200,
            "data": data
        }
    return{
        "code": 404,
        "data": data 
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
def update_market_data_for_recent_90_days_data():
    engine = create_engine()
    try: 
        tickers = get_all_ticker()["data"]
        sql = "DELETE FROM market_data;"
        engine.execute(sql)
        for ticker in tickers:
            try: 
                ticker_info = yf.Ticker(ticker)
                # print(ticker)
                data = ticker_info.history(period="3mo").reset_index()
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

def get_all_securities_holdings_by_userID(userID):
    engine = create_engine()
    sql = f"SELECT * FROM securities_holdings WHERE userID='{userID}'"
    result = engine.execute(sql)
    if result.rowcount>0:
        securities_holdings = []
        for info in result.fetchall():
            securities_holding = Securities_Holdings(info[0], info[1])
            securities_holdings.append(securities_holding.to_dict())
        return {
            "code": 200,
            "data": securities_holdings
        }
    return{
        "code": 404,
        "data": [] 
    }
def get_all_holdings_by_holdingsID(holdingsID):
    engine = create_engine()
    sql = f"SELECT * FROM all_holdings WHERE holdingsID='{holdingsID}'"
    result = engine.execute(sql)
    if result.rowcount>0:
        all_holdings = []
        for info in result.fetchall():
            holding = All_Holdings(info[0], info[1], info[2], info[3])
            all_holdings.append(holding.to_dict())
        return {
            "code": 200,
            "data": all_holdings
        }
    return{
        "code": 404,
        "data": [] 
    }
def get_today_ticker_info(ticker):
    msft = yf.Ticker(ticker)
    data = msft.history(period="1d").reset_index()
    return float(data["Close"])
def get_holding_detail(holding):
    info = {}
    ticker = holding['ticker']
 
    info['ticker'] = ticker
    qty = holding['qty']
    info['qty'] = qty
    buy_price_USD = holding['buy_price']
    info['buy_price_USD'] = buy_price_USD
    buy_price_SGD = convert_USD_to_SGD(buy_price_USD)
    info['buy_price_SGD'] = buy_price_SGD
    current_price_USD = get_today_ticker_info(ticker)
    info['current_price_USD'] = current_price_USD
    current_price_SGD = convert_USD_to_SGD(current_price_USD)
    info['current_price_SGD'] = current_price_SGD
    if buy_price_USD == 0.0:
        change_rate = 0.0
    else:
        change_rate = (buy_price_USD-current_price_USD)/buy_price_USD
    info['change_rate'] = change_rate
    current_total_price_USD = current_price_USD*float(qty)
    info['current_total_price_USD'] = current_total_price_USD
    current_total_price_SGD = current_price_SGD*float(qty)
    info['current_total_price_SGD'] = current_total_price_SGD
    
    return info 
"""
    Functions for the APIs 
"""

# MAIN PAGE


def get_info_for_all_securities(userID):
    crr_holding_USD = 0.0
    total_invest_USD = 0.0
    overall_return_USD = 0.0 
    result = {"detail": [], "userID":userID}
    securities_holdings = get_all_securities_holdings_by_userID(userID)["data"]
    for holding in securities_holdings:
        holdingsID = holding["holdingsID"]
        crr_holding = []
        all_holdings = get_all_holdings_by_holdingsID(holdingsID)
        for holding in all_holdings["data"]:
            
            info = get_holding_detail(holding)
            info['holdingsID'] = holdingsID
            crr_holding_USD += info["current_total_price_USD"]
            total_invest_USD += (info["buy_price_USD"]*info["qty"])
            result["detail"].append(info)
        
        overall_return_USD = crr_holding_USD - total_invest_USD
        crr_holding_SGD = convert_USD_to_SGD(crr_holding_USD)
        total_invest_SGD = convert_USD_to_SGD(total_invest_USD)
        overall_return_SGD = convert_USD_to_SGD(overall_return_USD)
        if total_invest_SGD == 0:
            overall_change_rate = 0.0 
        else:
            overall_change_rate = overall_return_SGD/total_invest_SGD
        
        result["crr_holding_USD"] = crr_holding_USD
        result["total_invest_USD"] = total_invest_USD
        result["overall_return_USD"] = overall_return_USD
        result["crr_holding_SGD"] = crr_holding_SGD
        result["total_invest_SGD"] = total_invest_SGD
        result["overall_return_SGD"] = overall_return_SGD
        result["overall_change_rate"] = overall_change_rate

        result["code"] = 200
        
    return result

def get_holding_by_userID_and_ticker(holdingsID, ticker):
    engine = create_engine()
    sql = f"SELECT * FROM all_holdings WHERE holdingsID='{holdingsID}' AND ticker='{ticker}'"
    result = engine.execute(sql)
    if result.rowcount>0:
        for info in result.fetchall():
            holding = All_Holdings(info[0], info[1], info[2], info[3])
            return {
                "code": 200,
                "data": holding.to_dict()
            }
    return{
        "code": 404,
        "data": [] 
    }

#View security page 
def view_security(holdingsID, ticker):
    
    result = {}
    holding_data = get_holding_by_userID_and_ticker(holdingsID, ticker)["data"]
    # print(len(holding_data) )
    if len(holding_data) == 0:
        return {
            "code": 404, 
            "data":result
        }
    market_data = get_market_data_by_ticker(ticker)
    # print(market_data)
    get_holding_data_detail = get_holding_detail(holding_data)
    result["market_data"] = market_data
    result["get_holding_data_detail"] = get_holding_data_detail
    return {
        "code": 200,
        "data": result
    }

#View Stock Detail 
def view_stock_detail(ticker):
    market_data = get_market_data_by_ticker(ticker)["data"]
    if market_data:
        return {
            "code": 200,
            "data": market_data
        }
    else:
        return {
            "code": 404,
            "data": market_data
    }
