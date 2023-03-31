from module.databaseConnection import *
from module.accountModule import peek_detail
from module.classes.transaction_log import Transaction_Log
from datetime import datetime, timedelta
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
                "cashflowout" : cashflowout,
                "transactions": transactions
            }
        }
    return {
            "code": 404,
            "data":{
                "cashflowout" : cashflowout,
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
                "cashflowout" : cashflowin,
                "transactions": transactions
            }
        }
    return {
            "code": 404,
            "data": {
                "cashflowout" : cashflowin,
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
                "cashflowout" : cashflowout,
                "transactions": transactions
            }
        }
    return {
            "code": 404,
            "data":{
                "cashflowout" : cashflowout,
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
                "cashflowin" : cashflowin,
                "transactions": transactions
            }
        }
    return {
            "code": 404,
            "data":{
                "cashflowin" : cashflowin,
                "transactions": transactions
            }
    }


def get_cashflow_six_months(userID):
    cashflow_in = get_cashflow_in_six_months(userID)
    cashflow_out = get_cashflow_out_six_months(userID)
#View Net Worth
def get_user_net_worth(userID):
    return peek_detail(userID)

def get_recent_one_month_transactions(userID):
    pass

#View My Financial Goals

def view_my_financial_goals():
    pass 
