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