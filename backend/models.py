"""
models.py
- Data classes for the application
"""

from email.policy import default
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

## User ##
class User(db.Model):
    __tablename__ = 'user'

    userID = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    lastLoginTimeStamp = db.Column(db.String(30), nullable=False)
    
    def __init__(self, username, password, lastLoginTimeStamp):
        self.username = username
        self.password = password
        self.lastLoginTimeStamp = lastLoginTimeStamp
        
    # specify how to represent our book object as a JSON string
    def json(self):
        return {
                "userID": self.userID, 
                "username": self.username,
                "password": self.password,
                "lastLoginTimeStamp": self.lastLoginTimeStamp,
            }
        
        
## User Details ##
class UserDetails(db.Model):
    __tablename__ = 'user_details'

    userID = db.Column(db.ForeignKey('user.userID', ondelete='CASCADE'), primary_key=True)
    familyName = db.Column(db.String(100), nullable=False)
    givenName = db.Column(db.String(100), nullable=False)
    taxIdentifier = db.Column(db.String(100), nullable=False)
    
    dateOfBirth = db.Column(db.DateTime, nullable=False)
    postalCode = db.Column(db.String(6), nullable=False)
    addressLine1 = db.Column(db.String(255), nullable=False)
    addressLine2 = db.Column(db.String(255), nullable=True)
    
    country = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    countryCode = db.Column(db.String(3), nullable=False)
    
    phoneNo = db.Column(db.String(15), nullable=False)
    homeNo = db.Column(db.String(15), nullable=False)
    registrationDate = db.Column(db.DateTime, nullable=False)
    nationality = db.Column(db.String(255), nullable=False)
    
    gender = db.Column(db.String(50), nullable=False)
    ethnicity = db.Column(db.String(255), nullable=False)
    occupation = db.Column(db.String(255), nullable=True)
    jobTitle = db.Column(db.String(255), nullable=True)
    
    employerName = db.Column(db.String(255), nullable=True)
    maritalStatus = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    chosenColor = db.Column(db.String(6), nullable=False)
    
    def __init__(self, userID, familyName, givenName, taxIdentifier, 
                 dateOfBirth, postalCode, addressLine1, addressLine2,
                 country, city, state, countryCode, phoneNo, homeNo, registrationDate, nationality, gender,
                 ethnicty, occupation, jobTitle, employerName, maritalStatus, email, chosenColor):
        
        self.userID = userID
        self.familyName = familyName
        self.givenName = givenName
        self.taxIdentifier = taxIdentifier
        
        self.dateOfBirth = dateOfBirth
        self.postalCode = postalCode
        self.addressLine1 = addressLine1
        self.addressLine2 = addressLine2
        
        self.country = country
        self.city = city
        self.state = state
        self.countryCode = countryCode
        
        self.phoneNo = phoneNo
        self.homeNo = homeNo
        self.registrationDate = registrationDate
        self.nationality = nationality
        
        self.gender = gender
        self.ethnicty = ethnicty
        self.occupation = occupation
        self.jobTitle = jobTitle
        
        self.employerName = employerName
        self.maritalStatus = maritalStatus
        self.email = email
        self.chosenColor = chosenColor
        
    # specify how to represent our book object as a JSON string
    def json(self):
        return {
                "userID": self.userID, 
                "familyName": self.familyName,
                "givenName": self.givenName,
                "taxIdentifier": self.taxIdentifier,
                
                "dateOfBirth": self.dateOfBirth, 
                "postalCode": self.postalCode,
                "addressLine1": self.addressLine1,
                "addressLine2": self.addressLine2,
                
                "dateOfBirth": self.dateOfBirth, 
                "postalCode": self.postalCode,
                "addressLine1": self.addressLine1,
                "addressLine2": self.addressLine2,
                
                "country": self.country, 
                "city": self.city,
                "state": self.state,
                "countryCode": self.countryCode,
                
                "phoneNo": self.phoneNo, 
                "homeNo": self.homeNo,
                "registrationDate": self.registrationDate,
                "nationality": self.nationality,
                
                "gender": self.gender, 
                "ethnicity": self.ethnicity,
                "occupation": self.occupation,
                "jobTitle": self.jobTitle,
                
                "employerName": self.employerName, 
                "maritalStatus": self.maritalStatus,
                "email": self.email,
                "chosenColor": self.chosenColor
            }
        
## Product ##
class Product(db.Model):
    __tablename__ = 'product'

    productID = db.Column(db.Integer, primary_key=True)
    productName = db.Column(db.String(255), nullable=False)
    productDescription = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    
    def __init__(self, productName, productDescription, status):
        self.productName = productName
        self.productDescription = productDescription
        self.status = status
        
    # specify how to represent our book object as a JSON string
    def json(self):
        return {
                "productID": self.productID, 
                "productName": self.productName,
                "productDescription": self.productDescription,
                "status": self.status
            }
        
## Deposit Account ##
class DepositAccount(db.Model):
    __tablename__ = 'deposit_account'

    depositAccountID = db.Column(db.String(100), primary_key=True)
    userID = db.Column(db.ForeignKey('user.userID', ondelete='CASCADE'), nullable=False)
    productID = db.Column(db.ForeignKey('product.productID', ondelete='CASCADE'), nullable=False)
    accountName = db.Column(db.String(100), nullable=False)
    accountOpenDate = db.Column(db.DateTime, nullable=False)
    accountCloseDate = db.Column(db.DateTime, nullable=True)
    availBalance = db.Column(db.Float, nullable=False)
    pendingBalance = db.Column(db.Float, nullable=False)
    currentStatus = db.Column(db.String(50), nullable=False)
    interestRate = db.Column(db.Float, nullable=False)
    depositTerm = db.Column(db.Integer, nullable=True)
    openEmployeeID = db.Column(db.Integer, nullable=False)
    minimumAmount = db.Column(db.Float, nullable=False)
    cardNo = db.Column(db.String(50), nullable=True)
    cardStartDate = db.Column(db.DateTime, nullable=True)
    cardExpiryDate = db.Column(db.DateTime, nullable=True)
    CVV = db.Column(db.String(50), nullable=True)
    
    def __init__(self, userID, productID, accountName, accountOpenDate, accountCloseDate
                 , availBalance, pendingBalance, currentStatus, interestRate, depositTerm
                 , openEmployeeID, minimumAmount, cardNo, cardStartDate, cardExpiryDate, CVV):
        
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
        
    # specify how to represent our book object as a JSON string
    def json(self):
        return {
                "depositAccountID": self.depositAccountID, 
                "userID": self.userID,
                "productID": self.productID,
                "accountName": self.accountName,     
                "accountOpenDate": self.accountOpenDate, 
                "accountCloseDate": self.accountCloseDate,
                "availBalance": self.availBalance,
                "pendingBalance": self.pendingBalance,      
                "currentStatus": self.currentStatus, 
                "interestRate": self.interestRate,
                "depositTerm": self.depositTerm,
                "openEmployeeID": self.openEmployeeID, 
                "minimumAmount": self.minimumAmount, 
                "cardNo": self.cardNo,
                "cardStartDate": self.cardStartDate,
                "cardExpiryDate": self.cardExpiryDate,
                "CVV": self.CVV
            }
        
## Loan Account ##
class LoanAccount(db.Model):
    __tablename__ = 'loan_account'

    loanAccountID = db.Column(db.String(100), primary_key=True)
    userID = db.Column(db.ForeignKey('user.userID', ondelete='CASCADE'), nullable=False)
    productID = db.Column(db.ForeignKey('product.productID', ondelete='CASCADE'), nullable=False)
    loanStartDate = db.Column(db.DateTime, nullable=False)
    loanMaturityDate = db.Column(db.DateTime, nullable=False)
    loanTerm = db.Column(db.Integer, nullable=False)
    loanAmount = db.Column(db.Float, nullable=False)
    loanBalance = db.Column(db.Float, nullable=False)
    loanPurpose = db.Column(db.String(255), nullable=False)
    ltvRatio = db.Column(db.Float, nullable=True)
    interestRate = db.Column(db.Float, nullable=False)
    penaltyRate = db.Column(db.Float, nullable=False)
    loanEmployeeID = db.Column(db.Integer, nullable=False)
    
    def __init__(self, userID, productID, loanStartDate, loanMaturityDate, loanTerm, loanAmount, loanBalance,
                 loanPurpose, ltvRatio, interestRate, penaltyRate, loanEmployeeID):
        self.userID = userID
        self.productID = productID
        self.userID = userID  
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
        
    # specify how to represent our book object as a JSON string
    def json(self):
        return {
                "loanAccountID": self.loanAccountID, 
                "userID": self.userID, 
                "productID": self.productID,
                "loanStartDate": self.loanStartDate,
                "loanMaturityDate": self.loanMaturityDate,
                "loanTerm": self.loanTerm,
                "loanAmount": self.loanAmount,
                "loanBalance": self.loanBalance,
                "loanPurpose": self.loanPurpose,
                "ltvRatio": self.ltvRatio,
                "interestRate": self.interestRate,
                "penaltyRate": self.penaltyRate,
                "loanEmployeeID": self.loanEmployeeID
            }
        
## Credit Card ##
class CreditCard(db.Model):
    __tablename__ = 'credit_card'

    creditCardAccountID = db.Column(db.Integer, primary_key=True)
    userID = db.Column(db.ForeignKey('user.userID', ondelete='CASCADE'), nullable=False)
    productID = db.Column(db.ForeignKey('product.productID', ondelete='CASCADE'), nullable=False)
    creditCardIssuer = db.Column(db.String(255), nullable=False)
    creditCardLimit = db.Column(db.Float, nullable=False)
    creditCardStartDate = db.Column(db.DateTime, nullable=False)
    creditCardExpiryDate = db.Column(db.DateTime, nullable=False)
    CVV = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    
    def __init__(self, userID, productID, creditCardIssuer, creditCardLimit, creditCardStartDate,
                 creditCardExpiryDate, CVV, status):
        self.userID = userID
        self.productID = productID
        self.creditCardIssuer = creditCardIssuer
        self.creditCardLimit = creditCardLimit
        self.creditCardStartDate = creditCardStartDate
        self.creditCardExpiryDate = creditCardExpiryDate
        self.CVV = CVV
        self.status = status
        
    # specify how to represent our book object as a JSON string
    def json(self):
        return {
                "creditCardAccountID": self.creditCardAccountID, 
                "userID": self.userID,
                "productID": self.productID, 
                "creditCardIssuer": self.creditCardIssuer,
                "creditCardLimit": self.creditCardLimit, 
                "creditCardStartDate": self.creditCardStartDate,
                "creditCardExpiryDate": self.creditCardExpiryDate, 
                "CVV": self.CVV,
                "status": self.status
            }
        
        
## Transaction Type ##
class TransactionType(db.Model):
    __tablename__ = 'transaction_type'

    transactionTypeID = db.Column(db.Integer, primary_key=True)
    transactionTypeName = db.Column(db.String(255), nullable=False)
    
    def __init__(self, transactionTypeName):
        self.transactionTypeName = transactionTypeName
        
    # specify how to represent our book object as a JSON string
    def json(self):
        return {
                "transactionTypeID": self.transactionTypeID, 
                "transactionTypeName": self.transactionTypeName
            }
        
## Transaction ##
class TransactionLog(db.Model):
    __tablename__ = 'transaction_log'

    transactionID = db.Column(db.Integer, primary_key=True)
    transactionDate = db.Column(db.DateTime, nullable=False)
    transactionDescription = db.Column(db.String(255), nullable=False)
    transactionAmount = db.Column(db.Float, nullable=False)
    transactionType = db.Column(db.ForeignKey('transaction_type.transactionTypeID', ondelete='CASCADE'), nullable=False)
    accountFrom = db.Column(db.String(100), nullable=True)
    accountTo = db.Column(db.String(100), nullable=False)
    exchangeRate = db.Column(db.Float, nullable=False)
    currency = db.Column(db.String(5), nullable=False)
    accountFrom_interimBalance = db.Column(db.Float, nullable=True)
    accountTo_interimBalance = db.Column(db.Float, nullable=True)

    def __init__(self, transactionDate, transactionDescription, transactionAmount, transactionType,
                 accountFrom, accountTo, exchangeRate, currency, accountFrom_interimBalance, accountTo_interimBalance):
        self.transactionDate = transactionDate
        self.transactionDescription = transactionDescription
        self.transactionAmount = transactionAmount
        self.transactionType = transactionType
        self.accountFrom = accountFrom
        self.accountTo = accountTo
        self.exchangeRate = exchangeRate
        self.currrency = currency
        self.accountFrom_interimBalance = accountFrom_interimBalance
        self.accountTo_interimBalance = accountTo_interimBalance

    # specify how to represent our book object as a JSON string
    def json(self):
        return {
                "transactionID": self.transactionID, 
                "transactionDate": self.transactionDate,
                "transactionDescription": self.transactionDescription,
                "transactionAmount": self.transactionAmount,
                "transactionType": self.transactionType,
                "accountFrom": self.accountFrom,
                "accountTo": self.accountTo,
                "exchangeRate": self.exchangeRate,
                "currrency": self.currency,
                "accountFrom_interimBalance": self.accountFrom_interimBalance,
                "accountTo_interimBalance": self.accountTo_interimBalance
            }
        

## Monthly Balance ##
class MonthlyBalance(db.Model):
    __tablename__ = 'monthly_balance'

    balanceID = db.Column(db.Integer, primary_key=True)
    depositAccountID = db.Column(db.ForeignKey('deposit_account.depositAccountID', ondelete='CASCADE'), nullable=False)
    yearMonth = db.Column(db.DateTime, nullable=False)
    balance = db.Column(db.Float, nullable=False)
    
    def __init__(self, depositAccountID, yearMonth, balance):
        self.depositAccountID = depositAccountID
        self.yearMonth = yearMonth
        self.balance = balance
        
    # specify how to represent our book object as a JSON string
    def json(self):
        return {
                "balanceID": self.balanceID, 
                "depositAccountID": self.depositAccountID, 
                "yearMonth": self.yearMonth, 
                "balance": self.balance
            }