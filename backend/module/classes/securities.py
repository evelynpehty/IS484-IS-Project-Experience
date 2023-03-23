class Securities:
    def __init__(self, ticker):
        self.ticker = ticker

    # Getter method for ticker attribute
    def get_ticker(self):
        return self.ticker

    # Setter method for ticker attribute
    def set_ticker(self, ticker):
        self.ticker = ticker

    # Default methods
    def __str__(self):
        return f"Security: {self.ticker}"

    def __repr__(self):
        return f"Securities(ticker='{self.ticker}')"

    def __eq__(self, other):
        if isinstance(other, Securities):
            return self.ticker == other.ticker
        return False
