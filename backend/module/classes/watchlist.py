class Watchlist:
    def __init__(self, watchlistID, userID, watchlistGroupName):
        self.watchlistID = watchlistID
        self.userID = userID
        self.watchlistGroupName = watchlistGroupName

    # Getter methods
    def get_watchlistID(self):
        return self.watchlistID

    def get_userID(self):
        return self.userID
    
    def get_watchlist_group_name(self):
        return self.watchlistGroupName

    # Setter methods
    def set_watchlistID(self, watchlistID):
        self.watchlistID = watchlistID

    def set_userID(self, userID):
        self.userID = userID

    def set_watchlist_group_name(self, watchlistGroupName):
        self.watchlistGroupName = watchlistGroupName

    # Conversion to dictionary
    def to_dict(self):
        return {
            "WatchlistID": self.watchlistID,
            "UserID": self.userID,
            "WatchlistGroupName": self.watchlistGroupName
        }

# Default methods
    def __str__(self):
        return f"watchlistID: {self.watchlistID}, userID: {self.userID}, watchlistGroupName: {self.watchlistGroupName}"

    def __repr__(self):
        return f"Watchlist(watchlistID={self.watchlistID}, userID={self.userID}, watchlistGroupName={self.watchlistGroupName})"

    def __eq__(self, other):
        if isinstance(other, Watchlist):
            return self.__dict__ == other.__dict__
        return False
