from module.databaseConnection import *
from module.accountModule import peek_detail
from module.classes.transaction_log import Transaction_Log
from module.classes.deposit_account import Deposit_Account
# from datetime import datetime, timedelta
def get_dashboard():

    return {

    }

def get_net_worth_calculator():

    return {

    }

def get_diversification_what_if_analysis():

    return {
        
    }

# FUNCTION BEFORE MIDTERM 
def get_cashflow_out_six_months(userID):
    engine = create_engine()
    sql = f"""
            SELECT *
            FROM transaction_log
            WHERE (accountFrom IN (SELECT creditCardAccountID FROM credit_card WHERE userID = '{userID}')
                   OR accountFrom IN (SELECT loanAccountID FROM loan_account WHERE userID = '{userID}'))
                  AND transactionDate >= DATE_SUB(NOW(), INTERVAL 6 MONTH);
            """
    cashflowout = 0.0
    transactions = []
    result = engine.execute(sql)
    if result.rowcount>0:
        for info in result.fetchall():
            transaction = Transaction_Log(
                info[0], info[1], info[2], info[3], 
                info[4], info[5], info[6], info[7],
                info[8], info[9], info[10]
            )
            transactions.append(transaction.to_dict())
            cashflowout += transaction.get_transactionAmount()
        return {
            "code": 200,
            "data":{
                "cashflow_out" : cashflowout,
                "transactions": transactions
            }
        }
    return {
            "code": 404,
            "data":{
                "cashflow_out" : cashflowout,
                "transactions": transactions
            }
    }

def get_cashflow_in_six_months(userID):
    engine = create_engine()
    sql = f"""
            SELECT *
            FROM transaction_log
            WHERE (accountTo IN (SELECT creditCardAccountID FROM credit_card WHERE userID = '{userID}')
                   OR accountTo IN (SELECT loanAccountID FROM loan_account WHERE userID = '{userID}'))
                  AND transactionDate >= DATE_SUB(NOW(), INTERVAL 6 MONTH);
            """
    cashflowin = 0.0
    transactions = []
    result = engine.execute(sql)
    if result.rowcount>0:
        for info in result.fetchall():
            transaction = Transaction_Log(
                info[0], info[1], info[2], info[3], 
                info[4], info[5], info[6], info[7],
                info[8], info[9], info[10]
            )
            transactions.append(transaction.to_dict())
            cashflowin += transaction.get_transactionAmount()
        return {
            "code": 200,
            "data": {
                "cashflow_in" : cashflowin,
                "transactions": transactions
            }
        }
    return {
            "code": 404,
            "data": {
                "cashflow_in" : cashflowin,
                "transactions": transactions
            }
    }
def get_cashflow_out_this_month(userID):
    engine = create_engine()
    sql = f"""
            SELECT *
            FROM transaction_log
            WHERE (accountFrom IN (SELECT creditCardAccountID FROM credit_card WHERE userID = '{userID}')
                   OR accountFrom IN (SELECT loanAccountID FROM loan_account WHERE userID = '{userID}'))
                  AND MONTH(transactionDate) = MONTH(CURRENT_DATE())
                  AND YEAR(transactionDate) = YEAR(CURRENT_DATE());

            """
    cashflowout = 0.0
    transactions = []
    result = engine.execute(sql)
    if result.rowcount > 0:
        for info in result.fetchall():
            transaction = Transaction_Log(
                info[0], info[1], info[2], info[3], 
                info[4], info[5], info[6], info[7],
                info[8], info[9], info[10]
            )
            transactions.append(transaction.to_dict())
            cashflowout += transaction.get_transactionAmount()
        return {
            "code": 200,
            "data":{
                "cashflow_out" : cashflowout,
                "transactions": transactions
            }
        }
    return {
            "code": 404,
            "data":{
                "cashflow_out" : cashflowout,
                "transactions": transactions
            }
    }

def get_cashflow_in_this_month(userID):
    engine = create_engine()
    sql = f"""
            SELECT *
            FROM transaction_log
            WHERE (accountTo IN (SELECT creditCardAccountID FROM credit_card WHERE userID = '{userID}')
                   OR accountTo IN (SELECT loanAccountID FROM loan_account WHERE userID = '{userID}'))
                  AND MONTH(transactionDate) = MONTH(CURRENT_DATE())
                  AND YEAR(transactionDate) = YEAR(CURRENT_DATE());
            """
    cashflowin = 0.0
    transactions = []
    result = engine.execute(sql)
    if result.rowcount > 0:
        for info in result.fetchall():
            transaction = Transaction_Log(
                info[0], info[1], info[2], info[3], 
                info[4], info[5], info[6], info[7],
                info[8], info[9], info[10]
            )
            transactions.append(transaction.to_dict())
            cashflowin += transaction.get_transactionAmount()
        return {
            "code": 200,
            "data":{
                "cashflow_in" : cashflowin,
                "transactions": transactions
            }
        }
    return {
            "code": 404,
            "data":{
                "cashflow_in" : cashflowin,
                "transactions": transactions
            }
    }


def get_cashflow_six_months(userID):
    cashflow_in = get_cashflow_in_six_months(userID)
    cashflow_out = get_cashflow_out_six_months(userID)


def get_recent_one_month_transactions(userID):
    cashflow_in = get_cashflow_in_this_month(userID)["data"]["cashflow_in"]
    cashflow_out = get_cashflow_out_this_month(userID)["data"]["cashflow_out"]
    return {
        "code": 200,
        "data": {
            "cashflow_in": cashflow_in,
            "cashflow_out": cashflow_out
        }
    }

#View My Financial Goals

def view_my_financial_goals():
    pass 



#View Net Worth
def get_user_net_worth(userID):
    return peek_detail(userID)

def emergency_saving_target_amount(userID):
    six_months_amount = get_cashflow_out_six_months(userID)["data"]["cashflow_out"]
    # six_months_amount = get_cashflow_out_six_months(userID)["data"]["cashflow_out"]
    return {
        "code": 200,
        "data": {
            "six_month_total_expense": six_months_amount,
            "ideal_amount":{
                "one_month": six_months_amount/6,
                "three_month": six_months_amount/2,
                "six_month": six_months_amount
            }
        }
    }

# def get_detail_of_emergency_saving(userID):
#     engine = create_engine()
#     sql = "SELECT * FROM deposit_account WHERE userID = "+str(userID)
#     result = engine.execute(sql)
#     target_amount = emergency_saving_target_amount(userID)
#     if result.rowcount>0:
#         accountInfo = []
#         for info in result.fetchall():
#             depositAccountInfo = Deposit_Account(
#                 info[0], info[1], info[2], info[3], info[4], info[5], info[6], info[7],
#                 info[8], info[9], info[10], info[11], info[12], info[13], info[14], info[15],
#                 info[16], info[17]
#             )