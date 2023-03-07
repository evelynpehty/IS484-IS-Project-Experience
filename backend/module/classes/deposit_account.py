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
    # Getter methods
  def get_depositAccountID(self):
    return self.depositAccountID

  def get_userID(self):
    return self.userID

  def get_productID(self):
    return self.productID

  def get_accountName(self):
    return self.accountName

  def get_accountOpenDate(self):
    return self.accountOpenDate

  def get_accountCloseDate(self):
    return self.accountCloseDate

  def get_availBalance(self):
    return self.availBalance

  def get_pendingBalance(self):
    return self.pendingBalance

  def get_currentStatus(self):
    return self.currentStatus

  def get_interestRate(self):
    return self.interestRate

  def get_depositTerm(self):
    return self.depositTerm

  def get_openEmployeeID(self):
    return self.openEmployeeID

  def get_minimumAmount(self):
    return self.minimumAmount

  def get_cardNo(self):
    return self.cardNo

  def get_cardStartDate(self):
    return self.cardStartDate

  def get_cardExpiryDate(self):
    return self.cardExpiryDate

  def get_CVV(self):
    return self.CVV

  # Setter methods
  def set_depositAccountID(self, depositAccountID):
    self.depositAccountID = depositAccountID

  def set_userID(self, userID):
    self.userID = userID

  def set_productID(self, productID):
    self.productID = productID

  def set_accountName(self, accountName):
    self.accountName = accountName

  def set_accountOpenDate(self, accountOpenDate):
    self.accountOpenDate = accountOpenDate

  def set_accountCloseDate(self, accountCloseDate):
    self.accountCloseDate = accountCloseDate

  def set_availBalance(self, availBalance):
    self.availBalance = availBalance

  def set_pendingBalance(self, pendingBalance):
    self.pendingBalance = pendingBalance

  def set_currentStatus(self, currentStatus):
    self.currentStatus = currentStatus

  def set_interestRate(self, interestRate):
    self.interestRate = interestRate

  def set_depositTerm(self, depositTerm):
    self.depositTerm = depositTerm

  def set_openEmployeeID(self, openEmployeeID):
    self.openEmployeeID = openEmployeeID

  def set_minimumAmount(self, minimumAmount):
    self.minimumAmount = minimumAmount
  
  def set_cardNo(self, cardNo):
    self.cardNo = cardNo

  def set_cardStartDate(self, cardStartDate):
    self.cardStartDate = cardStartDate

  def set_cardExpiryDate(self, cardExpiryDate):
    self.cardExpiryDate = cardExpiryDate

  def set_CVV(self, CVV):
    self.CVV = CVV
  
  def str(self):
    return f"DepositAccountID: {self.depositAccountID}, UserID: {self.userID}, ProductID: {self.productID}, AccountName: {self.accountName}, AccountOpenDate: {self.accountOpenDate}, AccountCloseDate: {self.accountCloseDate}, AvailBalance: {self.availBalance}, PendingBalance: {self.pendingBalance}, CurrentStatus: {self.currentStatus}, InterestRate: {self.interestRate}, DepositTerm: {self.depositTerm}, OpenEmployeeID: {self.openEmployeeID}, MinimumAmount: {self.minimumAmount}, CardNo: {self.cardNo}, CardStartDate: {self.cardStartDate}, CardExpiryDate: {self.cardExpiryDate}, CVV: {self.CVV}"

  def repr(self):
    return f"Deposit_Account(depositAccountID={self.depositAccountID}, userID={self.userID}, productID={self.productID}, accountName={self.accountName}, accountOpenDate={self.accountOpenDate}, accountCloseDate={self.accountCloseDate}, availBalance={self.availBalance}, pendingBalance={self.pendingBalance}, currentStatus={self.currentStatus}, interestRate={self.interestRate}, depositTerm={self.depositTerm}, openEmployeeID={self.openEmployeeID}, minimumAmount={self.minimumAmount}, cardNo={self.cardNo}, cardStartDate={self.cardStartDate}, cardExpiryDate={self.cardExpiryDate}, CVV={self.CVV})"

  def eq(self, other):
    if isinstance(other, Deposit_Account):
      return self.dict == other.dict
    return False