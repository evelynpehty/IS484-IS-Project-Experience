class User:
    def __init__(self, userID, username, password, lastLoginTimeStamp):
        self.userID = userID
        self.username = username
        self.password = password
        self.lastLoginTimeStamp = lastLoginTimeStamp

    def to_dict(self):
        return {
            "UserID": self.userID,
            "Username": self.username,
            "Password": self.password,
            "LastLoginTimeStamp": self.lastLoginTimeStamp
        }

    # Getter methods
    def get_userID(self):
        return self.userID

    def get_username(self):
        return self.username

    def get_password(self):
        return self.password

    def get_lastLoginTimeStamp(self):
        return self.lastLoginTimeStamp

    # Setter methods
    def set_userID(self, userID):
        self.userID = userID

    def set_username(self, username):
        self.username = username

    def set_password(self, password):
        self.password = password

    def set_lastLoginTimeStamp(self, lastLoginTimeStamp):
        self.lastLoginTimeStamp = lastLoginTimeStamp

    # Default methods
    def __str__(self):
        return f"UserID: {self.userID}, Username: {self.username}, Password: {self.password}, LastLoginTimeStamp: {self.lastLoginTimeStamp}"

    def __repr__(self):
        return f"User(userID={self.userID}, username={self.username}, password={self.password}, lastLoginTimeStamp={self.lastLoginTimeStamp})"

    def __eq__(self, other):
        if isinstance(other, User):
            return self.__dict__ == other.__dict__
        return False
