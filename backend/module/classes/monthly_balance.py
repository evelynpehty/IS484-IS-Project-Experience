class Monthly_Balance:
  def __init__(self, balanceID, depositAccountID, yearMonth, balance):
    self.balanceID = balanceID
    self.depositAccountID = depositAccountID
    self.yearMonth = yearMonth
    self.balance = balance

  def to_dict(self):
    return{
      "BalanceID": self.balanceID,
      "DepositAccountID": self.depositAccountID,
      "YearMonth": self.yearMonth,
      "Balance": self.balance
    }
  

  
  # Getter methods
  def get_balanceID(self):
    return self.balanceID

  def get_depositAccountID(self):
    return self.depositAccountID

  def get_yearMonth(self):
    return self.yearMonth

  def get_balance(self):
    return self.balance

  # Setter methods
  def set_balanceID(self, balanceID):
    self.balanceID = balanceID

  def set_depositAccountID(self, depositAccountID):
    self.depositAccountID = depositAccountID

  def set_yearMonth(self, yearMonth):
    self.yearMonth = yearMonth

  def set_balance(self, balance):
    self.balance = balance

  # Default methods
  def __str__(self):
    return f"BalanceID: {self.balanceID}, DepositAccountID: {self.depositAccountID}, YearMonth: {self.yearMonth}, Balance: {self.balance}"

  def __repr__(self):
    return f"Monthly_Balance(balanceID={self.balanceID}, depositAccountID={self.depositAccountID}, yearMonth={self.yearMonth}, balance={self.balance})"

  def __eq__(self, other):
    if isinstance(other, Monthly_Balance):
      return self.__dict__ == other.__dict__
    return False