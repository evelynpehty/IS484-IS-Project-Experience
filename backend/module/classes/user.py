class User:
  def __init__(self, userID, username, password, lastLoginTimeStamp):
    self.userID = userID
    self.username = username
    self.password = password
    self.lastLoginTimeStamp = lastLoginTimeStamp

  def to_dict(self):
    return{
      "UserID": self.userID,
      "Username": self.username,
      "Password": self.password,
      "LastLoginTimeStamp": self.lastLoginTimeStamp
    }