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
    # Getter methods
  def get_transactionID(self):
    return self.transactionID

  def get_transactionDate(self):
    return self.transactionDate

  def get_transactionDescription(self):
    return self.transactionDescription

  def get_transactionAmount(self):
    return self.transactionAmount

  def get_transactionType(self):
    return self.transactionType

  def get_accountFrom(self):
    return self.accountFrom

  def get_accountTo(self):
    return self.accountTo

  def get_exchangeRate(self):
    return self.exchangeRate

  def get_currency(self):
    return self.currency

  def get_accountFrom_interimBalance(self):
    return self.accountFrom_interimBalance

  def get_accountTo_interimBalance(self):
    return self.accountTo_interimBalance

  # Setter methods
  def set_transactionID(self, transactionID):
    self.transactionID = transactionID

  def set_transactionDate(self, transactionDate):
    self.transactionDate = transactionDate

  def set_transactionDescription(self, transactionDescription):
    self.transactionDescription = transactionDescription

  def set_transactionAmount(self, transactionAmount):
    self.transactionAmount = transactionAmount

  def set_transactionType(self, transactionType):
    self.transactionType = transactionType

  def set_accountFrom(self, accountFrom):
    self.accountFrom = accountFrom

  def set_accountTo(self, accountTo):
    self.accountTo = accountTo

  def set_exchangeRate(self, exchangeRate):
    self.exchangeRate = exchangeRate

  def set_currency(self, currency):
    self.currency = currency

  def set_accountFrom_interimBalance(self, accountFrom_interimBalance):
    self.accountFrom_interimBalance = accountFrom_interimBalance

  def set_accountTo_interimBalance(self, accountTo_interimBalance):
    self.accountTo_interimBalance = accountTo_interimBalance

  
  # Default methods
  def __str__(self):
    return f"TransactionID: {self.transactionID}, TransactionDate: {self.transactionDate}, TransactionDescription: {self.transactionDescription}, TransactionAmount: {self.transactionAmount}, TransactionType: {self.transactionType}, AccountFrom: {self.accountFrom}, AccountTo: {self.accountTo}, ExchangeRate: {self.exchangeRate}, Currency: {self.currency}, AccountFrom_interimBalance: {self.accountFrom_interimBalance}, AccountTo_interimBalance: {self.accountTo_interimBalance}"

  def __repr__(self):
    return f"Transaction_Log(transactionID={self.transactionID}, transactionDate={self.transactionDate}, transactionDescription={self.transactionDescription}, transactionAmount={self.transactionAmount}, transactionType={self.transactionType}, accountFrom={self.accountFrom}, accountTo={self.accountTo}, exchangeRate={self.exchangeRate}, currency={self.currency}, accountFrom_interimBalance={self.accountFrom_interimBalance}, accountTo_interimBalance={self.accountTo_interimBalance})"

  def __eq__(self, other):
    if isinstance(other, Transaction_Log):
      return self.__dict__ == other.__dict__
    return False