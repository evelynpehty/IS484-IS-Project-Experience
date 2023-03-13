class Transaction_Type:
  def __init__(self, transactionTypeID, transactionTypeName):
    self.transactionTypeID = transactionTypeID
    self.transactionTypeName = transactionTypeName

  def to_dict(self):
    return{
      "TransactionTypeID": self.transactionTypeID,
      "TransactionTypeName": self.transactionTypeName,
    }

  # Getter methods
  def get_transactionTypeID(self):
    return self.transactionTypeID

  def get_transactionTypeName(self):
    return self.transactionTypeName

  # Setter methods
  def set_transactionTypeID(self, transactionTypeID):
    self.transactionTypeID = transactionTypeID

  def set_transactionTypeName(self, transactionTypeName):
    self.transactionTypeName = transactionTypeName

  # Default methods
  def __str__(self):
    return f"TransactionTypeID: {self.transactionTypeID}, TransactionTypeName: {self.transactionTypeName}"

  def __repr__(self):
    return f"Transaction_Type(transactionTypeID={self.transactionTypeID}, transactionTypeName={self.transactionTypeName})"

  def __eq__(self, other):
    if isinstance(other, Transaction_Type):
      return self.__dict__ == other.__dict__
    return False
