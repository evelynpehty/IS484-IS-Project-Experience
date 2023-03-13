class Credit_Card:
  def __init__(self, creditCardAccountID, userID, productID, creditCardIssuer, creditCardLimit,
  creditCardStartDate, creditCardExpiryDate, CVV, status):
    self.creditCardAccountID = creditCardAccountID
    self.userID = userID
    self.productID = productID
    self.creditCardIssuer = creditCardIssuer
    self.creditCardLimit = creditCardLimit
    self.creditCardStartDate = creditCardStartDate
    self.creditCardExpiryDate = creditCardExpiryDate
    self.CVV = CVV
    self.status = status

  def to_dict(self):
    return{
      "CreditCardAccountID": self.creditCardAccountID,
      "UserID": self.userID,
      "ProductID": self.productID,
      "CreditCardIssuer": self.creditCardIssuer,
      "CreditCardLimit": self.creditCardLimit,
      "CreditCardStartDate": self.creditCardStartDate,
      "CreditCardExpiryDate": self.creditCardExpiryDate,
      "CVV": self.CVV,
      "Status": self.status
    }
  
   # Getter methods
  def get_creditCardAccountID(self):
    return self.creditCardAccountID

  def get_userID(self):
    return self.userID

  def get_productID(self):
    return self.productID

  def get_creditCardIssuer(self):
    return self.creditCardIssuer

  def get_creditCardLimit(self):
    return self.creditCardLimit

  def get_creditCardStartDate(self):
    return self.creditCardStartDate

  def get_creditCardExpiryDate(self):
    return self.creditCardExpiryDate

  def get_CVV(self):
    return self.CVV

  def get_status(self):
    return self.status

  # Setter methods
  def set_creditCardAccountID(self, creditCardAccountID):
    self.creditCardAccountID = creditCardAccountID

  def set_userID(self, userID):
    self.userID = userID

  def set_productID(self, productID):
    self.productID = productID

  def set_creditCardIssuer(self, creditCardIssuer):
    self.creditCardIssuer = creditCardIssuer

  def set_creditCardLimit(self, creditCardLimit):
    self.creditCardLimit = creditCardLimit

  def set_creditCardStartDate(self, creditCardStartDate):
    self.creditCardStartDate = creditCardStartDate

  def set_creditCardExpiryDate(self, creditCardExpiryDate):
    self.creditCardExpiryDate = creditCardExpiryDate

  def set_CVV(self, CVV):
    self.CVV = CVV

  def set_status(self, status):
    self.status = status

  # Default methods
  def __str__(self):
    return f"CreditCardAccountID: {self.creditCardAccountID}, UserID: {self.userID}, ProductID: {self.productID}, CreditCardIssuer: {self.creditCardIssuer}, CreditCardLimit: {self.creditCardLimit}, CreditCardStartDate: {self.creditCardStartDate}, CreditCardExpiryDate: {self.creditCardExpiryDate}, CVV: {self.CVV}, Status: {self.status}"

  def __repr__(self):
    return f"Credit_Card(creditCardAccountID={self.creditCardAccountID}, userID={self.userID}, productID={self.productID}, creditCardIssuer={self.creditCardIssuer}, creditCardLimit={self.creditCardLimit}, creditCardStartDate={self.creditCardStartDate}, creditCardExpiryDate={self.creditCardExpiryDate}, CVV={self.CVV}, status={self.status})"

  def __eq__(self, other):
    if isinstance(other, Credit_Card):
      return self.__dict__ == other.__dict__
    return False
