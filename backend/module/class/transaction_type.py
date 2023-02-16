class Transaction_Type:
  def __init__(self, transactionTypeID, transactionTypeName):
    self.transactionTypeID = transactionTypeID
    self.transactionTypeName = transactionTypeName

  def to_dict(self):
    return{
      "TransactionTypeID": self.transactionTypeID,
      "TransactionTypeName": self.transactionTypeName,
    }