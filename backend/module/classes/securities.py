class Securities:
    def __init__(self, ticker, tickerName):
        self.ticker = ticker
        self.tickerName = tickerName

    # Getter method for ticker attribute
    def get_ticker(self):
        return self.ticker

    # Setter method for ticker attribute
    def set_ticker(self, ticker):
        self.ticker = ticker

    # Getter method for tickerName attribute
    def get_tickerName(self):
        return self.tickerName

    # Setter method for tickerName attribute
    def set_tickerName(self, tickerName):
        self.tickerName = tickerName

    # Default methods
    def __str__(self):
        return f"Security: {self.ticker}, Ticker Name: {self.tickerName}"

    def __repr__(self):
        return f"Securities(ticker='{self.ticker}', tickerName='{self.tickerName}')"

    def __eq__(self, other):
        if isinstance(other, Securities):
            return self.ticker == other.ticker and self.tickerName == other.tickerName
        return False
    
    # Conversion to dictionary
    def to_dict(self):
        return {
            "ticker": self.ticker,
            "tickerName": self.tickerName
        }
 