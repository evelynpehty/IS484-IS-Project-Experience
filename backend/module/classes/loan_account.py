class Loan_Account:
  def __init__(self, loanAccountID, userID, productID, loanStartDate, loanMaturityDate, loanTerm, loanAmount,
  loanBalance, loanPurpose, ltvRatio, interestRate, penaltyRate, loanEmployeeID):
    self.loanAccountID = loanAccountID
    self.userID = userID
    self.productID = productID
    self.loanStartDate = loanStartDate
    self.loanMaturityDate = loanMaturityDate
    self.loanTerm = loanTerm
    self.loanAmount = loanAmount
    self.loanBalance = loanBalance
    self.loanPurpose = loanPurpose
    self.ltvRatio = ltvRatio
    self.interestRate = interestRate
    self.penaltyRate = penaltyRate
    self.loanEmployeeID = loanEmployeeID

  def to_dict(self):
    return{
      "LoanAccountID": self.loanAccountID,
      "UserID": self.userID,
      "ProductID": self.productID,
      "LoanStartDate": self.loanStartDate,
      "LoanMaturityDate": self.loanMaturityDate,
      "LoanTerm": self.loanTerm,
      "LoanAmount": self.loanAmount,
      "LoanBalance": self.loanBalance,
      "LoanPurpose": self.loanPurpose,
      "LtvRatio": self.ltvRatio,
      "InterestRate": self.interestRate,
      "PenaltyRate": self.penaltyRate,
      "LoanEmployeeID": self.loanEmployeeID
    }
  
  