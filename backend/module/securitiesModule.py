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
from module.classes.stock_data_LR import StockData_LR
#from module.classes.stock_predictor_LSTM import StockPredictorLSTM
import datetime

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
# def get_watchlist_by_user_id(userID):
#     engine = create_engine()
#     sql = f"SELECT * FROM watchlist WHERE userID='{userID}'"
#     result = engine.execute(sql)
#     if result.rowcount>0:
#         info = result.fetchone()
#         watchlist = Watchlist(info[0], info[1], info[2])
#         return {
#             "code": 200,
#             "data": watchlist.to_dict()
#         }
#     return{
#         "code": 404,
#         "data": None 
#     }

def get_watchlist_securities_by_watchlist_id(watchlistID):
    engine = create_engine()
    sql = f"SELECT * FROM watchlist_securities WHERE watchlistID='{watchlistID}'"
    result = engine.execute(sql)
    watchlistSecurities_list = []
    if result.rowcount>0:
        
        for info in result.fetchall():
            watchlistSecurities = Watchlist_Securities(info[0], info[1], info[2])
            watchlistSecurities_list.append(watchlistSecurities.to_dict())
        # info = result.fetchone()
            
        return {
            "code": 200,
            "data": watchlistSecurities_list
        }
    return{
        "code": 404,
        "data": watchlistSecurities_list 
    }

def get_market_data_by_ticker(ticker):
    engine = create_engine()
    sql = f"SELECT * FROM market_data WHERE ticker='{ticker}' ORDER BY date DESC "
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
            securities = Securities(info[0], info[1])
            tickers.append(securities.get_ticker())
        return {
            "code": 200,
            "data": tickers
        }
    return{
        "code": 404,
        "data": [] 
    }
def update_market_data_for_recent_1_year_data():
    engine = create_engine()
    try: 
        tickers = get_all_ticker()["data"]
        print(tickers)
        sql = "DELETE FROM market_data;"
        engine.execute(sql)
        for ticker in tickers:
            print(ticker)
            try: 
                ticker_info = yf.Ticker(ticker)
                print(ticker)
                data = ticker_info.history(period="1y").reset_index()
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
            "message": "Updata market data for recent 1 year data successfully"
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

def get_holding_detail(holding, userID):
    info = {}
    ticker = holding['ticker']
    
    info['ticker'] = ticker
    # watchlist_name = get_watchlist_name(userID, ticker)

    # info['watchlist_name'] = watchlist_name
    securities_name = get_securities_name(ticker)
    qty = holding['qty']
    info['stock_name'] = securities_name
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
    info['1_day_change_per_each'] = get_1_day_change(ticker)["data"] * float(qty)
    market_data = get_market_data_by_ticker(ticker)
    info["market_data"] = market_data
    record_for_past_24_hrs = past_24_hours_record(ticker)
    info["record_for_past_24_hrs"] = record_for_past_24_hrs
    return info 

def past_24_hours_record(ticker, interval='1h'):
    result = []
    data = yf.download(tickers=ticker, period='1d', interval=interval)
    data = data.reset_index()
    for index, row in data.iterrows():
        ts = pd.Timestamp(row['Datetime'])
        time_only = ts.strftime('%H:%M:%S')
        row["time_only"] = time_only
        result.append(row.to_dict())
    return result
"""
    Functions for the APIs 
"""

# MAIN PAGE


def get_info_for_all_securities(userID):
    
    crr_holding_USD = 0.0
    total_invest_USD = 0.0
    overall_return_USD = 0.0 
    total_in_one_day_change = 0.0
    result = {"detail": [], "userID":userID}
    securities_holdings = get_all_securities_holdings_by_userID(userID)["data"]
    for holding in securities_holdings:
        holdingsID = holding["holdingsID"]
        # crr_holding = []
        # ticker = holding['ticker']
        print(holding)
        # watchlist_name = get_watchlist_name(userID, ticker)
        all_holdings = get_all_holdings_by_holdingsID(holdingsID)
        for holding in all_holdings["data"]:
            ticker = holding['ticker']
            # watchlist_name = get_watchlist_name(userID, ticker)
            info = get_holding_detail(holding, userID)
            info['holdingsID'] = holdingsID
            # info["watchlist_name"] = watchlist_name
            crr_holding_USD += info["current_total_price_USD"]
            total_invest_USD += (info["buy_price_USD"]*info["qty"])
            result["detail"].append(info)
            total_in_one_day_change+=info['1_day_change_per_each']

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
        result["1_day_change"] = total_in_one_day_change
        
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
def view_security(userID, holdingsID, ticker):
    
    result = {}
    # print(3, 3)
    holding_data = get_holding_by_userID_and_ticker(holdingsID, ticker)["data"]
    # print(3)
    # print(len(holding_data) )
    if len(holding_data) == 0:
        return {
            "code": 404, 
            "data":result
        }
    # print(4)
    market_data = get_market_data_by_ticker(ticker)
    # print(market_data)
    get_holding_data_detail = get_holding_detail(holding_data, userID)
    print()
    result["market_data"] = market_data
    result["get_holding_data_detail"] = get_holding_data_detail
    return {
        "code": 200,
        "data": result
    }

#View Stock Detail 
def view_stock_detail(ticker):
    market_data = get_market_data_by_ticker(ticker)["data"]
    summarize = get_summary_by_ticker(ticker)
    if market_data:
        return {
            "code": 200,
            "data": {
                "market_data": market_data,
                "summarize": summarize["data"]
            }
        }
    else:
        return {
            "code": 404,
            "data": {
                "market_data": market_data,
                "summarize": summarize["data"]
            }
    }
def get_1_day_change(ticker):
    engine = create_engine()
    sql = f"SELECT * FROM market_data WHERE ticker='{ticker}' ORDER BY date DESC LIMIT 2"
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
            data.append(marketdata)
        yesterday_closing_price = data[1].get_closing_price()
        today_closing_price = data[0].get_closing_price()
        price_change_within_1_day = today_closing_price - yesterday_closing_price
        return {
            "code": 200,
            "data": price_change_within_1_day
        }
    return{
        "code": 404,
        "data": 0.0
    }
def get_1_day_change_in_percent(ticker):
    engine = create_engine()
    sql = f"SELECT * FROM market_data WHERE ticker='{ticker}' ORDER BY date DESC LIMIT 2"
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
            data.append(marketdata)
        yesterday_closing_price = data[1].get_closing_price()
        today_closing_price = data[0].get_closing_price()
        price_change_within_1_day = (today_closing_price - yesterday_closing_price)/today_closing_price*100
        return {
            "code": 200,
            "data": price_change_within_1_day
        }
    return{
        "code": 404,
        "data": 0.0
    }
def get_watchlist_name(userID, ticker):
    engine = create_engine()
    sql = f"""
    SELECT * FROM watchlist_securities 
    WHERE ticker='{ticker}'
    AND watchlistID IN(
    SELECT watchlistID from watchlist
    WHERE userID='{userID}')
    """
    
    result = engine.execute(sql)
    # print(sql, result.rowcount)
    if result.rowcount>0:
        # print(1)
        info = result.fetchone()
        # print(1)
        watchlist_securities = Watchlist_Securities(info[0], info[1], info[2])
        # print(2)
        return watchlist_securities.get_watchlistName()
    return ""

def get_securities_name(ticker):
    engine = create_engine()
    sql = f"SELECT * FROM securities WHERE ticker='{ticker}'"
    result = engine.execute(sql)
    if result.rowcount>0:
        info = result.fetchone()
        securities = Securities(info[0], info[1])
        return securities.get_tickerName()
    return ""

def get_data_model_LR(ticker):
    from datetime import timedelta
    today = datetime.date.today().strftime('%Y-%m-%d')
    five_years_ago = (datetime.date.today() - timedelta(days=365*5)).strftime('%Y-%m-%d')
    stockdata_LR = StockData_LR(ticker, five_years_ago, today)
    stockdata_LR.linear_regression()
    stockdata_LR.calculate_std()
    stockdata_LR.calculate_channels()
    return stockdata_LR

#also use this function to get the yesterday recent information 
def get_last_day_exit_enter_price(ticker):
    stockdata_LR = get_data_model_LR(ticker)
    last_day_record = stockdata_LR.get_last_day_record()
    # print(last_day_record.keys())
    # ['Date', 'Open', 'High', 'Low', 'Close', 'Adj Close', 'Volume', '_channel_upper', '_channel_lower', '_outer_upper', '_outer_lower']
    # will suggest to use _channel_upper to exit price, and _channel_lower for enter price 
    return last_day_record
def get_recent_1_year_record_info(ticker):
    stockdata_LR = get_data_model_LR(ticker)
    return stockdata_LR.get_recent_1_year_data_info()
def get_recent_7_days_record_info(ticker):
    stockdata_LR = get_data_model_LR(ticker)
    return stockdata_LR.get_recent_7_days_data_info()
def get_recent_1_month_record_info(ticker):
    stockdata_LR = get_data_model_LR(ticker)
    return stockdata_LR.get_recent_1_month_data_info()


def view_all_watchList(userID):
    engine = create_engine()
    sql = f"SELECT * FROM watchlist_securities WHERE watchlistID in (SELECT watchlistID FROM watchlist WHERE userID = '{userID}')"
    result = engine.execute(sql)
    watchlist_securities_list = []
    if result.rowcount>0:
        for info in result.fetchall():
            row_dict = {}
            watchlist_securities = Watchlist_Securities(info[0], info[1], info[2])
            recent_1_day_record = get_last_day_exit_enter_price(watchlist_securities.get_ticker())
            print(recent_1_day_record)
            row_dict = watchlist_securities.to_dict()
            row_dict["entry"] = recent_1_day_record["_channel_lower"]
            row_dict["exit"] = recent_1_day_record["_channel_upper"]
            row_dict["securities_name"] = get_securities_name(watchlist_securities.get_ticker())
            row_dict["1_day_change_in_percent"] = get_1_day_change_in_percent(watchlist_securities.get_ticker())["data"]
            watchlist_securities_list.append(row_dict)
            print(row_dict)
        return {
            "code": 200,
            "data": watchlist_securities_list
        }
    return {
        "code": 404,
        "data": watchlist_securities_list
    }

def view_ticker_for_graph(ticker):
    return{
        "code": 200,
        "data":{
            "past_24_hours_record": past_24_hours_record(ticker),
            "past_1_week_record": get_recent_7_days_record_info(ticker)["past_1_week_data"],
            "past_1_month_record": get_recent_1_month_record_info(ticker)["past_1_month_data"],
            "past_1_year_record": get_recent_1_year_record_info(ticker)["recent_1_year_data"]
        }
    }
def browse_securities_holding_by_watchlist(userID):
    engine = create_engine()
    sql = f"SELECT * FROM all_holdings WHERE holdingsID IN (SELECT holdingsID FROM securities_holdings WHERE userID = '{userID}')"
    result = engine.execute(sql)
    holding_list = []
    if result.rowcount>0:
        for info in result.fetchall():
            row_dict = {}
            holding = All_Holdings(info[0], info[1], info[2], info[3])
            recent_1_day_record = get_last_day_exit_enter_price(holding.get_ticker())
            row_dict = holding.to_dict()
            row_dict["entry"] = recent_1_day_record["_channel_lower"]
            row_dict["exit"] = recent_1_day_record["_channel_upper"]
            row_dict["get_securities_name"] = get_securities_name(holding.get_ticker())
            row_dict["1_day_change_in_percent"] = get_1_day_change_in_percent(holding.get_ticker())["data"]
            holding_list.append(row_dict)
        return {
            "code": 200,
            "data": holding_list
        }
    return {
            "code": 404,
            "data": holding_list
    }



def insert_new_watchlist(userID, watchlistID, watchlistName):
    engine = create_engine()
    sql = f"INSERT INTO watchlist (watchlistID, userID, watchlistGroupName) VALUES ('{watchlistID}', '{userID}', '{watchlistName}')"
    print(sql)
    engine.execute(sql)
    return {
        "code": 200,
        "message": "New watchlist insert successfully!"
    }

def get_auto_watchlistID():
    engine = create_engine()
    sql = "SELECT watchlistID FROM watchlist ORDER BY watchlistID DESC"
    result = engine.execute(sql)
    return result.fetchone()[0]+ 1


def create_watchlist(watchlistID, userID, watchlistName):
    engine = create_engine()
    sql = "SELECT * FROM watchlist WHERE watchlistID='{watchlistID}' AND userID='{userID}'"
    result = engine.execute(sql)
    print(result.rowcount)
    if result.rowcount == 0:
        watchlistID = get_auto_watchlistID()
        insert_new_watchlist(userID, watchlistID)
    sql = f"INSERT INTO watchlist (watchlistID, userID, watchlistGroupName) VALUES ('{watchlistID}', '{userID}', '{watchlistName}')"
    print(sql)
    engine.execute(sql)
    return {
        "code": 200,
        "message": "New watchlist name insert successfully!"
    }

def get_all_watchlist_names_by_userID(userID):
    engine = create_engine()
    sql = f"SELECT DISTINCT(watchlistName) FROM watchlist_securities WHERE watchlistID IN (SELECT watchlistID FROM watchlist WHERE userID='{userID}')"
    result = engine.execute(sql)
    groupName = []
    if result.rowcount > 0:
        for info in result.fetchall():
            groupName.append(info[0])
        return {
            'code': 200,
            'data': groupName
        }
    return {
        'code': 404,
        'data': groupName
    }

def get_watchlist_by_userID(userID):
    engine = create_engine()
    sql = f"SELECT * FROM watchlist WHERE userID='{userID}'"
    data = []
    result = engine.execute(sql)
    if result.rowcount > 0:
        
        for info in result.fetchall():
            number_of_stock = 0
            each_watchlist_info = {}
            print(info)
            watchlist = Watchlist(info[0], info[1], info[2])
            each_watchlist_info = watchlist.to_dict()
            watchlistSecurities = get_watchlist_securities_by_watchlist_id(watchlist.get_watchlistID())
            if watchlistSecurities["code"] == 200:
                ws_list = []
                for ws in watchlistSecurities["data"]:
                    row_dict = {}
                    ticker = ws["Ticker"]
                    WatchlistName = ws["WatchlistName"]
                    tickerName = get_securities_name(ticker)
                    recent_1_day_record = get_last_day_exit_enter_price(ticker)
                    row_dict["entry"] = recent_1_day_record["_channel_lower"]
                    row_dict["exit"] = recent_1_day_record["_channel_upper"]
                    row_dict["ticker"] = ticker
                    row_dict["WatchlistName"] = WatchlistName
                    row_dict["tickerName"] = tickerName
                    # row_dict["dataForEachPeriod"] = view_ticker_for_graph(ticker)
                    ws_list.append(row_dict)
                    number_of_stock += 1
                each_watchlist_info["watchlist_list"] = ws_list

            else:
                each_watchlist_info["watchlist_list"] = None
            each_watchlist_info["number_of_stock"] = number_of_stock
            data.append(each_watchlist_info)
        return {
            "code": 200,
            "data": data
        }
    return {
        "code": 404,
        "data": data
    }
def create_watchlist(userID, watchlistName):
    engine = create_engine()
    watchlistID = get_auto_watchlistID()
    sql = f"INSERT INTO watchlist (watchlistID, userID, watchlistGroupName) VALUES ('{watchlistID}', '{userID}', '{watchlistName}')"
#     print(sql)
    engine.execute(sql)
    return {
        "code": 200,
        "message": "New watchlist name insert successfully!"
    }
def update_watchlist_name(watchlistID, newWatchlistGroupName):
    engine = create_engine()
    sql = f"UPDATE watchlist SET `watchlistGroupName` = '{newWatchlistGroupName}' WHERE `watchlistID` = '{watchlistID}';"
    engine.execute(sql)
    return {
        "code": 200,
        "message": "New watchlist name update successfully!"
    }

def delete_watchlist_securities(watchlistID):
    
    engine = create_engine()
    sql = f"DELETE FROM watchlist_securities WHERE watchlistID IN (SELECT watchlistID FROM watchlist WHERE watchlistID = '{watchlistID}')"
    engine.execute(sql)
    return {
        "code": 200,
        "message": "watchlist securities delete successfully!"
    }
def delete_watchlist(watchlistID):
    engine = create_engine()
    delete_watchlist_securities(watchlistID)
    sql = f"DELETE FROM watchlist WHERE watchlistID = '{watchlistID}'"
    engine.execute(sql)
    return {
        "code": 200,
        "message": "watchlist delete successfully!"
    }

def insert_new_securities_into_watchlist(watchlistID, ticker, watchlistName):
    engine = create_engine()
    sql = f"INSERT INTO watchlist_securities (watchlistID, ticker, watchlistName) VALUES ('{watchlistID}', '{ticker}', '{watchlistName}');"
    engine.execute(sql)
    return {
        "code": 200,
        "message": "insert new securities into watchlist successfully!"
    }

def remove_securities_from_watchlist(watchlistID, ticker):
    engine = create_engine()
    sql = f"DELETE FROM watchlist_securities WHERE watchlistID='{watchlistID}' AND ticker='{ticker}';"
    engine.execute(sql)
    return {
        "code": 200,
        "message": "remove security from watchlist successfully!"
    }

def get_today_market_data(ticker):
    engine = create_engine()
    sql = f"SELECT * FROM market_data WHERE ticker='{ticker}' ORDER BY date DESC LIMIT 1"
    result = engine.execute(sql)
    if result.rowcount > 0:
        info = result.fetchone()
        marketdata = Market_Data(info[0], info[1], info[2],info[3], info[4], info[5],info[6], info[7], info[8])
        return marketdata.get_closing_price()


def get_all_securities():
    engine = create_engine()
    sql = f"SELECT * FROM securities;"
    result = engine.execute(sql)
    data = []
    if result.rowcount > 0:
        for info in result.fetchall():
            security = Securities(info[0], info[1])
            change_within_24hrs_in_percent = get_1_day_change_in_percent(security.get_ticker())["data"]
            crrPrice = get_today_market_data(security.get_ticker())
            record_for_past_24_hrs = past_24_hours_record(security.get_ticker())
            market_data = get_market_data_by_ticker(security.get_ticker())["data"]
            summary = get_summary_by_ticker(security.get_ticker())
            get_1_day_change_in_price = get_1_day_change(security.get_ticker())["data"]
            stock_data = {
                "ticker": security.get_ticker(),
                "tickerName": security.get_tickerName(),
                "1_day_change_per_cent": change_within_24hrs_in_percent,
                "1_day_change_in_price": get_1_day_change_in_price,
                "currentPrice": crrPrice,
                "record_for_past_24_hrs":record_for_past_24_hrs,
                "market_data": market_data,
                "summary": summary
            }
            data.append(stock_data)
        return {
            "code": 200,
            "data": data
        }
    return {
        "code": 404,
        "data": data
    }

def get_net_worth_security_holdings(userID):
    engine = create_engine()
    sql = f"SELECT * FROM all_holdings WHERE holdingsID IN (SELECT holdingsID FROM securities_holdings WHERE userID='{userID}');"
    net_worth = 0.0 
    result = engine.execute(sql)
    if result.rowcount>0:
        for info in result.fetchall():
            holding = All_Holdings(info[0], info[1], info[2], info[3])
            current_price_USD = get_today_ticker_info(holding.get_ticker())
            current_price_SGD = convert_USD_to_SGD(current_price_USD)
            qty = holding.get_qty()
            net_worth += current_price_SGD*qty
        return {
            "code": 200,
            "data": net_worth,
            "message": "Security holdings information retireve successfully"
        }
    return {
        "code": 404,
        "message": "no available information found",
        "data": 0.0
    }
def convert_timestamp_to_datetime(timestamp):
    import datetime
    datetime_obj = datetime.datetime.fromtimestamp(timestamp).strftime('%Y-%m-%d %H:%M:%S')
    return datetime_obj
def get_summary_by_ticker(ticker):
    info = yf.Ticker(ticker).info
    try:
        marketCap = info['marketCap']
    except:
        marketCap = 0.0
        
    try:
        
        regularMarketVolume = info['regularMarketVolume']
    except:
        regularMarketVolume = 0.0    
    
    try:
        
        dividendDate = convert_timestamp_to_datetime(info['dividendDate'])
    except:
        dividendDate = None
    
    try:
        
        averageDailyVolume3Month = info['averageDailyVolume3Month']
    except:
        averageDailyVolume3Month = 0.0
    
    try:
        
        averageDailyVolume3Month = info['averageDailyVolume3Month']
    except:
        averageDailyVolume3Month = 0.0
    
    try:
        
        priceEpsCurrentYear = info['priceEpsCurrentYear']
    except:
        priceEpsCurrentYear = 0.0
    try:
        
        epsCurrentYear = info['epsCurrentYear']
    except:
        epsCurrentYear = 0.0
    return {
        "code": 200,
        "data":{
            "marketCap":marketCap, 
            "regularMarketVolume":regularMarketVolume, 
            "dividendDate":dividendDate, 
            "averageDailyVolume3Month":averageDailyVolume3Month, 
            "priceEpsCurrentYear":priceEpsCurrentYear, 
            "epsCurrentYear":epsCurrentYear, 
        }
    }