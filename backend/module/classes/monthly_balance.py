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