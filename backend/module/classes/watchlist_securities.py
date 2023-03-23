class Watchlist_Securities:
    def __init__(self, watchlistID, ticker, watchlistName):
        self.watchlistID = watchlistID
        self.ticker = ticker
        self.watchlistName = watchlistName

    # Getter methods
    def get_watchlistID(self):
        return self.watchlistID

    def get_ticker(self):
        return self.ticker

    def get_watchlistName(self):
        return self.watchlistName

    # Setter methods
    def set_watchlistID(self, watchlistID):
        self.watchlistID = watchlistID

    def set_ticker(self, ticker):
        self.ticker = ticker

    def set_watchlistName(self, watchlistName):
        self.watchlistName = watchlistName

    # Conversion to dictionary
    def to_dict(self):
        return {
            "WatchlistID": self.watchlistID,
            "Ticker": self.ticker,
            "WatchlistName": self.watchlistName
        }

    # Default methods
    def __str__(self):
        return f"Watchlist Securities: {self.ticker}"

    def __repr__(self):
        return f"Watchlist_Securities(watchlistID={self.watchlistID}, ticker='{self.ticker}', watchlistName='{self.watchlistName}')"

    def __eq__(self, other):
        if isinstance(other, Watchlist_Securities):
            return self.__dict__ == other.__dict__
        return False
