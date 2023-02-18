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
def get_loan_account_detail(loanAccountID):
    engine = create_engine()
    sql = "SELECT * FROM loan_account WHERE loanAccountID = "+str(loanAccountID)
    info = engine.execute(sql).fetchone()
    if info:
        loanAccountInfo = Loan_Account(
                info[0], info[1], info[2], info[3], info[4], info[5], info[6], info[7],
                info[8], info[9], info[10], info[11], info[12], info[13], info[14], info[15],
                info[16]
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
def get_calculate_partial_loan_repayment(principal, rate, payment_period_in_year):
    n = payment_period_in_year*12
    r = rate/(100*12)
    monthly_payment = principal*((r*((r+1)**n))/(((r+1)**n)-1))
    return {
        "monthly_payment": monthly_payment
    }

def get_interest_rate_calculation(amount, rate, no_of_year):
    totalAmount = amount
    while no_of_year > 0:
        totalAmount *= (1+rate)

    return {
        "Total_amount": totalAmount
    }