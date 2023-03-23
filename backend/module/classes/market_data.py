class Market_Data:
    def __init__(self, ticker, date, openPrice, highPrice, lowPrice, closingPrice, volume, dividends, stockSplit):
        self.ticker = ticker
        self.date = date
        self.openPrice = openPrice
        self.highPrice = highPrice
        self.lowPrice = lowPrice
        self.closingPrice = closingPrice
        self.volume = volume
        self.dividends = dividends
        self.stockSplit = stockSplit

    # Conversion to dictionary
    def to_dict(self):
        return {
            "Ticker": self.ticker,
            "Date": self.date,
            "OpenPrice": self.openPrice,
            "HighPrice": self.highPrice,
            "LowPrice": self.lowPrice,
            "ClosingPrice": self.closingPrice,
            "Volume": self.volume,
            "Dividends": self.dividends,
            "StockSplit": self.stockSplit
        }

    # Getter methods
    def get_ticker(self):
        return self.ticker

    def get_date(self):
        return self.date

    def get_open_price(self):
        return self.openPrice

    def get_high_price(self):
        return self.highPrice

    def get_low_price(self):
        return self.lowPrice

    def get_closing_price(self):
        return self.closingPrice

    def get_volume(self):
        return self.volume

    def get_dividends(self):
        return self.dividends

    def get_stock_split(self):
        return self.stockSplit

    # Setter methods
    def set_ticker(self, ticker):
        self.ticker = ticker

    def set_date(self, date):
        self.date = date

    def set_open_price(self, openPrice):
        self.openPrice = openPrice

    def set_high_price(self, highPrice):
        self.highPrice = highPrice

    def set_low_price(self, lowPrice):
        self.lowPrice = lowPrice

    def set_closing_price(self, closingPrice):
        self.closingPrice = closingPrice

    def set_volume(self, volume):
        self.volume = volume

    def set_dividends(self, dividends):
        self.dividends = dividends

    def set_stock_split(self, stockSplit):
        self.stockSplit = stockSplit

    # Default methods
    def __str__(self):
        return f"Ticker: {self.ticker}, Date: {self.date}, Open Price: {self.openPrice}, High Price: {self.highPrice}, Low Price: {self.lowPrice}, Closing Price: {self.closingPrice}, Volume: {self.volume}, Dividends: {self.dividends}, Stock Split: {self.stockSplit}"

    def __repr__(self):
        return f"Market_Data(ticker='{self.ticker}', date='{self.date}', openPrice={self.openPrice}, highPrice={self.highPrice}, lowPrice={self.lowPrice}, closingPrice={self.closingPrice}, volume={self.volume}, dividends={self.dividends}, stockSplit={self.stockSplit})"

    def __eq__(self, other):
        if isinstance(other, Market_Data):
            return self.__dict__ == other.__dict__
        return False
