class All_Holdings:
    def __init__(self, holdingsID, ticker, qty, buy_price):
        self.holdingsID = holdingsID
        self.ticker = ticker
        self.qty = qty
        self.buy_price = buy_price

    # Getter methods
    def get_holdingsID(self):
        return self.holdingsID

    def get_ticker(self):
        return self.ticker

    def get_qty(self):
        return self.qty

    def get_buy_price(self):
        return self.buy_price

    # Setter methods
    def set_holdingsID(self, holdingsID):
        self.holdingsID = holdingsID

    def set_ticker(self, ticker):
        self.ticker = ticker

    def set_qty(self, qty):
        self.qty = qty

    def set_buy_price(self, buy_price):
        self.buy_price = buy_price

    # String representation
    def __str__(self):
        return f"All_Holdings: [holdingsID: {self.holdingsID}, ticker: {self.ticker}, qty: {self.qty}, buy_price: {self.buy_price}]"

    # String representation for debugging
    def __repr__(self):
        return f"All_Holdings(holdingsID='{self.holdingsID}', ticker='{self.ticker}', qty={self.qty}, buy_price={self.buy_price})"

    # Equality check
    def __eq__(self, other):
        if isinstance(other, All_Holdings):
            return self.holdingsID == other.holdingsID and self.ticker == other.ticker and self.qty == other.qty and self.buy_price == other.buy_price
        return False

    # Conversion to dictionary
    def to_dict(self):
        return {
            "holdingsID": self.holdingsID,
            "ticker": self.ticker,
            "qty": self.qty,
            "buy_price": self.buy_price
        }
