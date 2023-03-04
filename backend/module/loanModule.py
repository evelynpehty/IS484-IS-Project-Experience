from module.databaseConnection import create_engine
from module.classes.loan_account import Loan_Account

def get_view_all_loan_account(userID):
    engine = create_engine()
    sql = "SELECT * FROM loan_account WHERE userID = "+str(userID)
    result = engine.execute(sql)
    if result.rowcount>0:
        accountInfo = []
        for info in result.fetchall():
            depositAccountInfo = Loan_Account(
                info[0], info[1], info[2], info[3], info[4], info[5], info[6], info[7],
                info[8], info[9], info[10], info[11], info[12]
            ).to_dict()
            accountInfo.append(depositAccountInfo)
        return{
            "code": 200,
            "data": accountInfo
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
                info[8], info[9], info[10], info[11], info[12]
            ).to_dict()
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
    return {
        "code": 200,
        "monthly_payment": monthly_payment,
        "total_interest_paid": total_interest_paid,
        "total_payment_amount": total_amount
    }

# def get_calculate_partial_loan_repayment(amount, rate, no_of_year):
#     totalAmount = amount
#     while no_of_year > 0:
#         totalAmount *= (1+rate)

#     return {
#         "Total_amount": totalAmount
#     }

#view loan transactions 

#Add Loan Accounts (Add or Delete)
#Partial Loan Repayment Calculation
#Consolidated Loan Repayment
