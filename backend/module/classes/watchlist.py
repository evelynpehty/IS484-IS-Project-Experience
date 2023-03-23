class Watchlist:
    def __init__(self, watchlistID, userID):
        self.watchlistID = watchlistID
        self.userID = userID

    # Getter methods
    def get_watchlistID(self):
        return self.watchlistID

    def get_userID(self):
        return self.userID

    # Setter methods
    def set_watchlistID(self, watchlistID):
        self.watchlistID = watchlistID

    def set_userID(self, userID):
        self.userID = userID

    # Conversion to dictionary
    def to_dict(self):
        return {
            "WatchlistID": self.watchlistID,
            "UserID": self.userID
        }

    # Default methods
    def __str__(self):
        return f"Watchlist: {self.watchlistID}"

    def __repr__(self):
        return f"Watchlist(watchlistID={self.watchlistID}, userID={self.userID})"

    def __eq__(self, other):
        if isinstance(other, Watchlist):
            return self.__dict__ == other.__dict__
        return False
