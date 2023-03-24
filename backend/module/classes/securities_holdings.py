class Securities_Holdings:
    def __init__(self, holdingsID, userID):
        self.holdingsID = holdingsID
        self.userID = userID

    # Getter methods
    def get_holdingsID(self):
        return self.holdingsID

    def get_userID(self):
        return self.userID

    # Setter methods
    def set_holdingsID(self, holdingsID):
        self.holdingsID = holdingsID

    def set_userID(self, userID):
        self.userID = userID

    # String representation
    def __str__(self):
        return f"Securities_Holdings: [holdingsID: {self.holdingsID}, userID: {self.userID}]"
    
    # String representation for debugging
    def __repr__(self):
        return f"Securities_Holdings(holdingsID='{self.holdingsID}', userID='{self.userID}')"

    # Equality check
    def __eq__(self, other):
        if isinstance(other, Securities_Holdings):
            return self.holdingsID == other.holdingsID and self.userID == other.userID
        return False
    
    # Conversion to dictionary
    def to_dict(self):
        return {
            "holdingsID": self.holdingsID,
            "userID": self.userID,
        }
