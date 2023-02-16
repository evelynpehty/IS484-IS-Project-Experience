class Deposit_Account:
  def __init__(self, depositAccountID, userID, productID, accountName, accountOpenDate, accountCloseDate,
  availBalance, pendingBalance, currentStatus, interestRate, depositTerm, openEmployeeID, minimumAmount,
  cardNo, cardStartDate, cardExpiryDate, CVV):
    self.depositAccountID = depositAccountID
    self.userID = userID
    self.productID = productID
    self.accountName = accountName
    self.accountOpenDate = accountOpenDate
    self.accountCloseDate = accountCloseDate
    self.availBalance = availBalance
    self.pendingBalance = pendingBalance

    self.currentStatus = currentStatus
    self.interestRate = interestRate
    self.depositTerm = depositTerm
    self.openEmployeeID = openEmployeeID
    self.minimumAmount = minimumAmount
    self.cardNo = cardNo
    self.cardStartDate = cardStartDate
    self.cardExpiryDate = cardExpiryDate
    self.CVV = CVV

  def to_dict(self):
    return{
      "DepositAccountID": self.depositAccountID,
      "UserID": self.userID,
      "ProductID": self.productID,
      "AccountName": self.accountName,
      "AccountOpenDate": self.accountOpenDate,
      "AccountCloseDate": self.accountCloseDate,
      "AvailBalance": self.availBalance,
      "PendingBalance": self.pendingBalance,
      "CurrentStatus": self.currentStatus,
      "InterestRate": self.interestRate,
      "DepositTerm": self.depositTerm,
      "OpenEmployeeID": self.openEmployeeID,
      "MinimumAmount": self.minimumAmount,
      "CardNo": self.cardNo,
      "CardStartDate": self.cardStartDate,
      "CardExpiryDate": self.cardExpiryDate,
      "CVV": self.CVV,
    }