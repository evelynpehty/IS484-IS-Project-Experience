from module.databaseConnection import create_engine
from module.classes.product import Product
from module.classes.loan_account import Loan_Account
from module.classes.transaction_log import Transaction_Log
from module.classes.credit_card import Credit_Card
from module.classes.loan_reminder import Loan_Reminder
from datetime import datetime

def get_view_all_loan_account(userID):
    engine = create_engine()
    sql = "SELECT * FROM loan_account WHERE userID = "+str(userID)
    result = engine.execute(sql)
    totalOutstandingLoan = 0.0 
    totalMonthlyRepayment = 0.0 
    if result.rowcount>0:
        accountInfo = []
        for info in result.fetchall():
            loanAccountInfo = Loan_Account(
                info[0], info[1], info[2], info[3], info[4], info[5], info[6], info[7],
                info[8], info[9], info[10], info[11], info[12], info[13], info[14]
            )
            totalOutstandingLoan += loanAccountInfo.get_loanBalance()
            loan_detail = get_view_calculate_loan_repayment_detail(loanAccountInfo.get_loanAmount(), 
                                                                   loanAccountInfo.get_interestRate(),
                                                                   loanAccountInfo.get_loanTerm())
            loan_reminder = get_loan_reminder_by_loan_account(loanAccountInfo.get_loanAccountID())
            
            totalMonthlyRepayment += loan_detail["monthly_payment"]
            productID = loanAccountInfo.get_productID()
            productName = get_product_name(productID)
            loanAccountInfo = loanAccountInfo.to_dict()
            loanAccountInfo["ProductName"] = productName
            loanAccountInfo["Detail"] = loan_detail
            loanAccountInfo["Reminder"] = loan_reminder
            accountInfo.append(loanAccountInfo)
        return{
            "code": 200,
            "data": {
                "accountInformation": accountInfo, 
                "totalOutstandLoan":totalOutstandingLoan,
                "totalMonthlyRepayment": totalMonthlyRepayment
            }
            
        }

    return {
        "code": 404,
        "message": "no available information found",
        "data": None
    }

#SELECT 
def get_view_loan_account_detail(loanAccountID):
    engine = create_engine()
    sql = "SELECT * FROM loan_account WHERE loanAccountID = "+str(loanAccountID)
    info = engine.execute(sql).fetchone()
    if info:
        loanAccountInfo = Loan_Account(
                info[0], info[1], info[2], info[3], info[4], info[5], info[6], info[7],
                info[8], info[9], info[10], info[11], info[12], info[13], info[14]
            )
        loan_detail = get_view_calculate_loan_repayment_detail(loanAccountInfo.get_loanAmount(), 
                                                                   loanAccountInfo.get_interestRate(),
                                                                   loanAccountInfo.get_loanTerm())
        
        historical_transaction = view_loan_transactions_by_account(loanAccountInfo.get_loanAccountID())
        loan_reminder = get_loan_reminder_by_loan_account(loanAccountInfo.get_loanAccountID())

        productID = loanAccountInfo.get_productID()
        productName = get_product_name(productID)
        loanAccountInfo = loanAccountInfo.to_dict()
        loanAccountInfo["ProductName"] = productName
        loanAccountInfo["Detail"] = loan_detail
        loanAccountInfo["Transactions"] = historical_transaction
        loanAccountInfo["Reminder"] = loan_reminder
        
        return{
            "code": 200,
            "data": loanAccountInfo
        }
    return {
        "code": 404,
        "message": "no available information found",
        "data": None
    }



#maybe can make some improvement in next few meetings 
def get_view_calculate_loan_repayment_detail(principal, rate, payment_period_in_year):
    n = payment_period_in_year*12
    r = rate/(100*12)
    monthly_payment = principal*((r*((r+1)**n))/(((r+1)**n)-1))
    total_interest_paid = monthly_payment*12*payment_period_in_year
    total_amount = total_interest_paid + principal
    schedule_for_payment = generate_debt_paydown(principal, payment_period_in_year, rate, monthly_payment)
    return {
        "code": 200,
        "monthly_payment": monthly_payment,
        "total_interest_paid": total_interest_paid,
        "total_payment_amount": total_amount,
        "schedule_for_payment": schedule_for_payment
    }

def generate_debt_paydown(principal, payment_period_in_year, rate, monthly_payment):
    print(principal, payment_period_in_year, rate, monthly_payment)
    monthly_interest_rate = float(rate)/12/100 
    loan_term_in_months = round(float(payment_period_in_year) * 12)
    balance = principal
    result = {

    }
    for month in range(1, loan_term_in_months+1):
        this_month_detail = {} 
        this_month_detail["begin_balance"] = balance
        interest_payment = balance * monthly_interest_rate
        principal_payment = monthly_payment - interest_payment
        balance -= principal_payment
        this_month_detail["interest"] = interest_payment
        this_month_detail["principal"] = principal_payment
        this_month_detail["end_balance"] = balance
        result[month] = this_month_detail
    return result 

# def get_calculate_partial_loan_repayment(amount, rate, no_of_year):
#     totalAmount = amount
#     while no_of_year > 0:
#         totalAmount *= (1+rate)

#     return {
#         "Total_amount": totalAmount
#     }


# FUNCTION BEFORE MIDTERM 


#view loan transactions 
def view_loan_transactions_by_account(loanAccountID):
    engine = create_engine()
    sql = """
        SELECT *  FROM transaction_log
            WHERE accountTo IN 
            (SELECT loanAccountID 
            FROM loan_account WHERE loanAccountID='%s')
    """ % loanAccountID
    result = engine.execute(sql)
    if result.rowcount > 0:
        transactions = []
        
        for info in result.fetchall():
            transaction = Transaction_Log(
                info[0], info[1], info[2], info[3], 
                info[4], info[5], info[6], info[7],
                info[8], info[9], info[10]
            ).to_dict()
            transactions.append(transaction)
        return {
            "code": 200,
            "transactions": transactions
        }
    return {
            "code": 404,
            "transactions": []
        }
def view_loan_transactions_by_user(userID):
    engine = create_engine()
    sql = """
        SELECT *  FROM transaction_log
            WHERE accountTo IN 
            (SELECT loanAccountID 
            FROM loan_account WHERE userID='%s')
    """ % userID
    result = engine.execute(sql)
    if result.rowcount > 0:
        transactions = []
        
        for info in result.fetchall():
            transaction = Transaction_Log(
                info[0], info[1], info[2], info[3], 
                info[4], info[5], info[6], info[7],
                info[8], info[9], info[10]
            ).to_dict()
            transactions.append(transaction)
    return {
        "code": 200,
        "transactions": transactions
    }

# PEEK for loan 
def get_net_worth_loan(userID):
    engine = create_engine()
    sql = "SELECT * FROM loan_account WHERE userID = "+str(userID)
    result = engine.execute(sql)
    if result.rowcount > 0:
        availLoan = 0.0
        for info in result.fetchall():
            availLoan += info[6]
        return{
        "code": 200,
        "message": "Loan information retireve successfully",
        "data": availLoan
        }

    return {
        "code": 404,
        "message": "no available information found",
        "data": None
    }


#Add Loan Accounts (Add or Delete)
def add_loan_account(loanAccountID,
        userID,
        productID,
        loanStartDate,
        loanMaturityDate,
        loanTerm,
        loanAmount,
        loanBalance,
        loanPurpose,
        ltvRatio,
        interestRate,
        penaltyRate,
        loanEmployeeID,
        chosenColor):
    engine = create_engine()
    sql = "SELECT * FROM loan_account WHERE userID = "+str(userID)
    result = engine.execute(sql)
    if result.rowcount > 0:
        sql = """
            INSERT INTO loan_account
            (loanAccountID,
            userID,
            productID,
            loanStartDate,
            loanMaturityDate,
            loanTerm,
            loanAmount,
            loanBalance,
            loanPurpose,
            ltvRatio,
            interestRate,
            penaltyRate,
            loanEmployeeID, 
            chosenColor)
            VALUES
            ('%s', '%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s', '%s')
            """%(loanAccountID,
            userID,
            productID,
            loanStartDate,
            loanMaturityDate,
            loanTerm,
            loanAmount,
            loanBalance,
            loanPurpose,
            ltvRatio,
            interestRate,
            penaltyRate,
            loanEmployeeID,
            chosenColor)
        result = engine.execute(sql)
        return {
            "code": 200,
            "message": "New loan account added successfully"
        }
    return{
        "code": 404,
        "message": "No user found"
    }
    
    



def delelte_loan_account(loanAccountID):
    engine = create_engine()
    sql = "SELECT * FROM loan_account WHERE loanAccountID = '%s'" % loanAccountID
    result = engine.execute(sql)
    if result.rowcount > 0:
        sql = "DELETE FROM loan_account WHERE loanAccountID = '%s'" % loanAccountID
        result = engine.execute(sql)
        return {
            "code": 200,
            "message": "Loan account deleted successfully"
        }
    return{
        "code": 404,
        "message": "No loan account found"
    }


#Partial Loan Repayment Calculation
def calculate_partial_loan_repayment(principal, rate, payment_period_in_year, pay_amount_in_advance):

    return get_view_calculate_loan_repayment_detail(principal - pay_amount_in_advance, rate, payment_period_in_year)

#Consolidated Loan Repayment
def consolidated_loan_repayment(userID):
    TotalLoanRepayment = get_view_all_loan_account(userID)["data"]["totalMonthlyRepayment"]
    result = {
        "code": 200,
        "message":"consolidated loan repayment generated successfully",
        "TotalLoanRepayment": TotalLoanRepayment
    }
    return result


def get_product_name(productID):
    engine = create_engine()
    sql = "SELECT * FROM product WHERE productID = %s" % productID
    result = engine.execute(sql)
    if result.rowcount > 0:
        for info in result.fetchall():
            product = Product(info[0], info[1], info[2], info[3])
            return product.get_productName()
    return ""


#update loan account name 
def update_loan_account_name(loanAccountID, newAccountName):
    engine = create_engine()
    sql = "UPDATE loan_account SET accountName = '%s' WHERE loanAccountID = '%s'" % (newAccountName, loanAccountID)
    engine.execute(sql)
    return {
        "code": 200,
        "message": "account name has updated successfully"
    }


# find the day difference - for due date 
def day_diff(repayment_date):
    # payment_date for example, '2022-12-15'
    crr_date = datetime.now()
    repayment_date = datetime.strptime(repayment_date, "%Y-%m-%d")
    delta =  repayment_date - crr_date
    return delta.days


def get_view_all_credit_card(userID):
    engine = create_engine()
    sql = "SELECT * FROM credit_card WHERE userID = '%s'"%userID
    result = engine.execute(sql)
    cardInfo = []
    if result.rowcount>0:
        for info in result.fetchall():
            creditCardInfo = Credit_Card(
                info[0], info[1], info[2], info[3], 
                info[4], info[5], info[6], info[7],
                info[8], info[9]
            )
            transactions = get_view_all_transaction_by_credit_card(creditCardInfo.get_creditCardAccountID())
            productName = get_product_name(creditCardInfo.get_productID())
            creditCardInfo = creditCardInfo.to_dict()
            creditCardInfo["transactions"] = transactions["data"]
            creditCardInfo["productName"] = productName
            cardInfo.append(creditCardInfo)
        return{
            "code": 200,
            "data": cardInfo
        }
    return{
        "code": 404,
        "data": cardInfo
    }


def get_view_all_credit_card_detail(creditCardAccountID):
    engine = create_engine()
    sql = "SELECT * FROM credit_card WHERE creditCardAccountID = '%s'"%creditCardAccountID
    info  = engine.execute(sql).fetchone()
    if info: 
        creditCardInfo = Credit_Card(
                info[0], info[1], info[2], info[3], 
                info[4], info[5], info[6], info[7],
                info[8], info[9]
            )
        productName = get_product_name(creditCardInfo.get_productID())
        transactions = get_view_all_transaction_by_credit_card(creditCardInfo.get_creditCardAccountID())
        creditCardInfo = creditCardInfo.to_dict()
        creditCardInfo["transactions"] = transactions["data"]
        creditCardInfo["productName"] = productName
        return{
            "code": 200,
            "data": creditCardInfo
        }
    return{
        "code": 404,
        "data": None
    }

def get_view_all_transaction_by_credit_card(creditCardAccountID):
    engine = create_engine()
    sql = "SELECT * FROM transaction_log WHERE accountFrom='%s' or accountFrom = '%s'" %(creditCardAccountID, creditCardAccountID)
    result = engine.execute(sql)
    transactions = []
    if result.rowcount > 0:

        for info in result.fetchall():
            transaction = Transaction_Log(
                info[0], info[1], info[2], info[3], 
                info[4], info[5], info[6], info[7],
                info[8], info[9], info[10]
            )
            
            transaction = transaction.to_dict()
            transactions.append(transaction)
        return {
            "code": 200,
            "data": transactions 
        }
    return {
        "code": 404,
        "data": transactions
    }

def get_loan_reminder_by_loan_account(loanAccountID):
    engine = create_engine()
    sql = "SELECT * FROM loan_reminder WHERE loanAccountID='%s';" %(loanAccountID)
    result = engine.execute(sql)
    reminders = []
    if result.rowcount > 0:
        for info in result.fetchall():
            loanReminder = Loan_Reminder(info[0], info[1], info[2])
            loanReminder = loanReminder.to_dict()
            reminders.append(loanReminder)
        return{
            "code": 200,
            "data": reminders
        }
    return {
        "code": 404,
        "data": reminders #[] 
    }


def get_all_loan_detail_with_reminder(userID):
    engine = create_engine()
    sql = "SELECT * FROM loan_account  WHERE loanAccountID IN (SELECT loanAccountID FROM loan_reminder) AND userID='%s'" %(userID)
    result = engine.execute(sql)
    loan_with_reminder = []
    if result.rowcount > 0:
        for info in result.fetchall():
            print(info, len(info))
            loan = Loan_Account(
                info[0], info[1], info[2], info[3], info[4], info[5], info[6], info[7],
                info[8], info[9], info[10], info[11], info[12], info[13], info[14]
            )
            print(loan)
            reminders = get_loan_reminder_by_loan_account(loan.get_loanAccountID())
            loan = loan.to_dict()
            loan["reminders"] = reminders["data"]
            loan_with_reminder.append(loan)
        return{
            "code": 200,
            "data": loan_with_reminder
        }
    return {
        "code": 404,
        "data": loan_with_reminder #[] 
    }

def remove_reminder(loanReminderID):
    engine = create_engine()
    sql = "DELETE FROM loan_reminder WHERE loanReminderID='%s';" % (loanReminderID)
    engine.execute(sql)
    return {
        "code": 200,
        "message": "new loan reminder has removed successfully"
    }

def update_new_reminder(loanAccountID, ReminderType):
    engine = create_engine()
    sql = "INSERT INTO loan_reminder (loanAccountID, ReminderType) VALUES ('%s', '%s');" % (loanAccountID, ReminderType)
    engine.execute(sql)
    return {
        "code": 200,
        "message": "new loan reminder has updated/add successfully"
    }


def update_credit_card_color(creditCardAccountID, newColor):
    engine = create_engine()
    sql = "UPDATE credit_card SET chosenColor = '%s' WHERE creditCardAccountID = '%s';" % (newColor, creditCardAccountID)
    print(sql)
    engine.execute(sql)
    return {
        "code": 200,
        "message": "credit card color has updated successfully"
    }

def update_loan_account_color_and_name(loanAccountID, newColor, newName):
    engine = create_engine()
    sql = "UPDATE loan_account SET chosenColor = '%s', loanAccountName = '%s' WHERE loanAccountID = '%s';" % (newColor, newName, loanAccountID)
    print(sql)
    engine.execute(sql)
    return {
        "code": 200,
        "message": "loan account color has updated successfully"
    }



def get_credit_card_net_worth(userID):
    engine = create_engine()
    sql = "SELECT * FROM credit_card WHERE userID = '%s'"%userID
    result = engine.execute(sql)
    cardInfo = []
    net_worth = 0.0
    if result.rowcount>0:
        
        for info in result.fetchall():
            creditCardInfo = Credit_Card(
                info[0], info[1], info[2], info[3], 
                info[4], info[5], info[6], info[7],
                info[8], info[9]
            )
            net_worth += creditCardInfo.get_creditCardLimit()
        return{
            "code": 200,
            "data": net_worth
        }
    return{
        "code": 404,
        "data": net_worth
    }