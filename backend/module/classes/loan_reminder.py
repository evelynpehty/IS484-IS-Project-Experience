class Loan_Reminder:
    def __init__(self, loanReminderID, loanAccountID, ReminderType):
        self.loanReminderID = loanReminderID
        self.loanAccountID = loanAccountID
        self.ReminderType = ReminderType

    # Conversion to dictionary
    def to_dict(self):
        return {
            "LoanReminderID": self.loanReminderID,
            "LoanAccountID": self.loanAccountID,
            "ReminderType": self.ReminderType,
        }


    # Getter methods
    def get_loanReminderID(self):
        return self.loanReminderID

    def get_loanAccountID(self):
        return self.loanAccountID

    def get_ReminderType(self):
        return self.ReminderType

    # Setter methods
    def set_loanReminderID(self, loanReminderID):
        self.loanReminderID = loanReminderID

    def set_loanAccountID(self, loanAccountID):
        self.loanAccountID = loanAccountID

    def set_ReminderType(self, ReminderType):
        self.ReminderType = ReminderType

    
    # Default methods
    def __str__(self):
        return f"LoanReminderID: {self.loanReminderID}, LoanAccountID: {self.loanAccountID}, ReminderType: {self.ReminderType}"

    def __repr__(self):
        return f"LoanReminder(loanReminderID={self.loanReminderID}, loanAccountID={self.loanAccountID}, ReminderType={self.ReminderType})"

    def __eq__(self, other):
        if isinstance(other, Loan_Reminder):
            return self.__dict__ == other.__dict__
        return False
