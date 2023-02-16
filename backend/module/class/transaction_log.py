class Transaction_Log:
  def __init__(self, transactionID, transactionDate, transactionDescription, transactionAmount, transactionType, accountFrom, accountTo,
  exchangeRate, currency, accountFrom_interimBalance, accountTo_interimBalance):
    self.transactionID = transactionID
    self.transactionDate = transactionDate
    self.transactionDescription = transactionDescription
    self.transactionAmount = transactionAmount
    self.transactionType = transactionType
    self.accountFrom = accountFrom
    self.accountTo = accountTo
    self.exchangeRate = exchangeRate
    self.currency = currency
    self.accountFrom_interimBalance = accountFrom_interimBalance
    self.accountTo_interimBalance = accountTo_interimBalance


  def to_dict(self):
    return{
      "transactionID": self.transactionID,
      "transactionDate": self.transactionDate,
      "transactionDescription": self.transactionDescription,
      "transactionAmount": self.transactionAmount,
      "transactionType": self.transactionType,
      "accountFrom": self.accountFrom,
      "accountTo": self.accountTo,
      "exchangeRate": self.exchangeRate,
      "currency": self.currency,
      "accountFrom_interimBalance": self.accountFrom_interimBalance,
      "accountTo_interimBalance": self.accountTo_interimBalance
    }