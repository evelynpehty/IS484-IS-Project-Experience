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
  
    # Getter methods
  def get_loanAccountID(self):
    return self.loanAccountID

  def get_userID(self):
    return self.userID

  def get_productID(self):
    return self.productID

  def get_loanStartDate(self):
    return self.loanStartDate

  def get_loanMaturityDate(self):
    return self.loanMaturityDate

  def get_loanTerm(self):
    return self.loanTerm

  def get_loanAmount(self):
    return self.loanAmount

  def get_loanBalance(self):
    return self.loanBalance

  def get_loanPurpose(self):
    return self.loanPurpose

  def get_ltvRatio(self):
    return self.ltvRatio

  def get_interestRate(self):
    return self.interestRate

  def get_penaltyRate(self):
    return self.penaltyRate

  def get_loanEmployeeID(self):
    return self.loanEmployeeID

  # Setter methods
  def set_loanAccountID(self, loanAccountID):
    self.loanAccountID = loanAccountID

  def set_userID(self, userID):
    self.userID = userID

  def set_productID(self, productID):
    self.productID = productID

  def set_loanStartDate(self, loanStartDate):
    self.loanStartDate = loanStartDate

  def set_loanMaturityDate(self, loanMaturityDate):
    self.loanMaturityDate = loanMaturityDate

  def set_loanTerm(self, loanTerm):
    self.loanTerm = loanTerm

  def set_loanAmount(self, loanAmount):
    self.loanAmount = loanAmount

  def set_loanBalance(self, loanBalance):
    self.loanBalance = loanBalance

  def set_loanPurpose(self, loanPurpose):
    self.loanPurpose = loanPurpose

  def set_ltvRatio(self, ltvRatio):
    self.ltvRatio = ltvRatio

  def set_interestRate(self, interestRate):
    self.interestRate = interestRate

  def set_penaltyRate(self, penaltyRate):
    self.penaltyRate = penaltyRate

  def set_loanEmployeeID(self, loanEmployeeID):
    self.loanEmployeeID = loanEmployeeID

  # Default methods
  def __str__(self):
    return f"LoanAccountID: {self.loanAccountID}, UserID: {self.userID}, ProductID: {self.productID}, LoanStartDate: {self.loanStartDate}, LoanMaturityDate: {self.loanMaturityDate}, LoanTerm: {self.loanTerm}, LoanAmount: {self.loanAmount}, LoanBalance: {self.loanBalance}, LoanPurpose: {self.loanPurpose}, LtvRatio: {self.ltvRatio}, InterestRate: {self.interestRate}, PenaltyRate: {self.penaltyRate}, LoanEmployeeID: {self.loanEmployeeID}"

  def __repr__(self):
    return f"Loan_Account(loanAccountID={self.loanAccountID}, userID={self.userID}, productID={self.productID}, loanStartDate={self.loanStartDate}, loanMaturityDate={self.loanMaturityDate}, loanTerm={self.loanTerm}, loanAmount={self.loanAmount}, loanBalance={self.loanBalance}, loanPurpose={self.loanPurpose}, ltvRatio={self.ltvRatio}, interestRate={self.interestRate}, penaltyRate={self.penaltyRate}, loanEmployeeID={self.loanEmployeeID})"

  def __eq__(self, other):
    if isinstance(other, Loan_Account):
      return self.__dict__ == other.__dict__
    return False

