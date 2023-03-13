from module.databaseConnection import create_engine
from module.classes.product import Product
from module.classes.loan_account import Loan_Account
from module.classes.transaction_log import Transaction_Log

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
                info[8], info[9], info[10], info[11], info[12], info[13]
            )
            totalOutstandingLoan += loanAccountInfo.get_loanBalance()
            loan_detail = get_view_calculate_loan_repayment_detail(loanAccountInfo.get_loanAmount(), 
                                                                   loanAccountInfo.get_interestRate(),
                                                                   loanAccountInfo.get_loanTerm())
            
            totalMonthlyRepayment += loan_detail["monthly_payment"]
            productID = loanAccountInfo.get_productID()
            productName = get_product_name(productID)
            loanAccountInfo = loanAccountInfo.to_dict()
            loanAccountInfo["ProductName"] = productName
            loanAccountInfo["Detail"] = loan_detail
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
                info[8], info[9], info[10], info[11], info[12], info[13]
            )
        loan_detail = get_view_calculate_loan_repayment_detail(loanAccountInfo.get_loanAmount(), 
                                                                   loanAccountInfo.get_interestRate(),
                                                                   loanAccountInfo.get_loanTerm())
        
        historical_transaction = view_loan_transactions_by_account(loanAccountInfo.get_loanAccountID())
        productID = loanAccountInfo.get_productID()
        productName = get_product_name(productID)
        loanAccountInfo = loanAccountInfo.to_dict()
        loanAccountInfo["ProductName"] = productName
        loanAccountInfo["Detail"] = loan_detail
        loanAccountInfo["Transactions"] = historical_transaction
        
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
    monthly_interest_rate = float(rate)/12 
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
        loanEmployeeID):
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
            loanEmployeeID)
            VALUES
            ('%s', '%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s')
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
            loanEmployeeID)
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
    all_bank_loans = get_view_all_loan_account(userID)["data"]
    total_loan_repayment = 0.0 
    result = {
        "code": 200,
        "LoanDetails": [],
    }
    for loan in all_bank_loans:
        LoanAccountID = loan["LoanAccountID"]
        LoanAmount = loan["LoanAmount"] # principal 
        InterestRate = loan["InterestRate"] # rate
        LoanTerm = loan["LoanTerm"] # payment_period_in_year
        loan_repayment_detail = get_view_calculate_loan_repayment_detail(LoanAmount, InterestRate, LoanTerm)
        repayment = loan_repayment_detail["monthly_payment"]
        result["LoanDetails"].append({
            "LoanAccountID": LoanAccountID, 
            "Repayment": repayment
        })
        total_loan_repayment += repayment
    result["TotalLoanPayment"] = total_loan_repayment

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
