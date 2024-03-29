from module.databaseConnection import create_engine
from module.classes.deposit_account import Deposit_Account
from module.classes.transaction_log import Transaction_Log
from module.classes.product import Product
# from module.portfolioModule import get_recent_one_month_transactions
# from module.accountModule import get_net_worth
from datetime import datetime
from dateutil.relativedelta import relativedelta


def get_view_all_deposit_accounts(userID):
    engine = create_engine()
    sql = "SELECT * FROM deposit_account WHERE userID = "+str(userID)
    result = engine.execute(sql)
    cashflow = get_recent_one_month_transactions(userID)["data"]
    totalBalance = 0.0 
    if result.rowcount>0:
        accountInfo = []
        for info in result.fetchall():
            depositAccountInfo = Deposit_Account(
                info[0], info[1], info[2], info[3], info[4], info[5], info[6], info[7],
                info[8], info[9], info[10], info[11], info[12], info[13], info[14], info[15],
                info[16], info[17]
            )
            
            totalBalance += depositAccountInfo.get_availBalance()
            productID = depositAccountInfo.get_productID()
            productName = get_product_name(productID)
            depositAccountInfo = depositAccountInfo.to_dict()
            depositAccountInfo["ProductName"] = productName
            accountInfo.append(depositAccountInfo)
        return{
            "code": 200,
            "message": "Deposit Account information has retrived successfully",
            "data": {
                "totalBalance": totalBalance,
                "cashflow_this_month": cashflow,
                "accountInfo": accountInfo
            }
            
        }

    return {
        "code": 404,
        "message": "no available information found",
        "data": {
                "totalBalance": totalBalance,
                "cashflow_this_month": cashflow,
                "accountInfo": None
            }
    }


#SELECTED
def get_view_selected_deposit_account(depositAccountID):
    engine = create_engine()
    sql = "SELECT * FROM deposit_account WHERE DepositAccountID = "+str(depositAccountID)
    info = engine.execute(sql).fetchone()
    if info:
        depositAccountInfo = Deposit_Account(
                info[0], info[1], info[2], info[3], info[4], info[5], info[6], info[7],
                info[8], info[9], info[10], info[11], info[12], info[13], info[14], info[15],
                info[16], info[17]
            )
        productID = depositAccountInfo.get_productID()
        productName = get_product_name(productID)
        depositAccountInfo = depositAccountInfo.to_dict()
        depositAccountInfo["ProductName"] = productName
        return{
            "code": 200,
            "data": depositAccountInfo
        }
    return {
        "code": 404,
        "message": "no available information found",
        "data": None
    }
#
def get_view_available_balance(userID):
    #same return as this function in accountModule
    return get_net_worth_deposit(userID)

def get_view_recent_three_transaction(userID):
    transactions = get_view_all_transaction(userID)
    if transactions["code"] == 200:
        transactions["data"] = transactions["data"][:3]
    return transactions
    # engine = create_engine()
    # sql = """
    # SELECT * FROM transaction_log  
    # WHERE accountFROM IN (SELECT depositAccountID FROM deposit_account WHERE userID = """ +str(userID)+""")
    # OR accountTo IN (SELECT depositAccountID FROM deposit_account WHERE userID = """ +str(userID)+""")
    # ORDER BY transactionDate DESC
    # LIMIT 3;
    # """
    # result = engine.execute(sql)
    # if result.rowcount > 0:
    #     transactions = []
    #     for info in result.fetchall():
    #         transaction = Transaction_Log(
    #             info[0], info[1], info[2], info[3], 
    #             info[4], info[5], info[6], info[7],
    #             info[8], info[9], info[10]
    #         ).to_dict()
    #         transactions.append(transactions)
    #     return {
    #         "code": 200,
    #         "data":transactions
    #     }

    # return {
    #     "code": 404,
    #     "message": "no available information found",
    #     "data":[

    #     ]
    # } 

#TRANSACTIONS UI
def get_view_all_transaction(userID):
    engine = create_engine()
    sql = """
    SELECT * FROM transaction_log  
    WHERE accountFROM IN (SELECT depositAccountID FROM deposit_account WHERE userID = """ +str(userID)+""")
    OR accountTo IN (SELECT depositAccountID FROM deposit_account WHERE userID = """ +str(userID)+""")
    ORDER BY transactionDate DESC;
    """
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
            "data":transactions
        }

    return {
        "code": 404,
        "message": "no available information found",
        "data":[

        ]
    } 

#ACCOUNT NUMBER UI
#add deposit account -> need more information 
def add_new_deposit_account_with_default_values(depositAccountID, userID, accountName):
    # accountNo => depositAccountID
    #current date: cardStarDate and accountOpenDate
    crr_date = datetime.today().strftime('%Y-%m-%d')
    productID = get_new_productID(userID)
    expire_date = (datetime.today() + relativedelta(years=5)).strftime('%Y-%m-%d')
    availBalance = 10000
    pendingBalance = 10000
    currentStatus = "Active"
    interestRate = 2
    depositTerm = 0 
    openEmployeeID = 1
    minimumAmount = 1
    cardNo = 78123456
    CVV = 111
    chosenColor = "linear-gradient(to top right, #A4B6D2, #0085FF)"
    result = add_new_deposit_account_without_default_values(depositAccountID, userID, productID, accountName,
        crr_date, expire_date, availBalance, 
        pendingBalance, currentStatus, interestRate, depositTerm, 
        openEmployeeID, minimumAmount, cardNo, crr_date,
        expire_date, CVV, chosenColor)
        
    return result




def add_new_deposit_account_without_default_values(depositAccountID ,  userID ,  productID ,  accountName , 
        accountOpenDate ,  accountCloseDate ,  availBalance , 
        pendingBalance ,  currentStatus ,  interestRate ,  depositTerm , 
        openEmployeeID ,  minimumAmount ,  cardNo ,  cardStartDate , 
        cardExpiryDate ,  CVV, chosenColor ):
    
    sql = """
        INSERT INTO  deposit_account
        ( depositAccountID ,  userID ,  productID ,  accountName , 
        accountOpenDate ,  accountCloseDate ,  availBalance , 
        pendingBalance ,  currentStatus ,  interestRate ,  depositTerm , 
        openEmployeeID ,  minimumAmount ,  cardNo ,  cardStartDate , 
        cardExpiryDate ,  CVV , chosenColor) 
        VALUES ('%s', '%s', '%s', '%s', 
                '%s', '%s', '%s', 
                '%s', '%s', '%s', '%s',
                '%s', '%s', '%s', '%s', 
                '%s', '%s');
        """ %(
        depositAccountID ,  userID ,  productID ,  accountName , 
        accountOpenDate ,  accountCloseDate ,  availBalance , 
        pendingBalance ,  currentStatus ,  interestRate ,  depositTerm , 
        openEmployeeID ,  minimumAmount ,  cardNo ,  cardStartDate , 
        cardExpiryDate ,  CVV ,chosenColor
        )
    engine = create_engine()
    engine.execute(sql)
    return{
        "code": 200,
        "message": "Your account has successfully added"
    }
    


def get_new_productID(userID):
    engine = create_engine()
    sql = "SELECT productID FROM deposit_account WHERE userID = "+str(userID) +" ORDER BY productID DESC"
    productID = engine.execute(sql).fetchone()[0] + 1
    # try to generate the productID
    return productID


# FUNCTION BEFORE MIDTERM 
def get_net_worth_deposit(userID):
    engine = create_engine()
    sql = "SELECT * FROM deposit_account WHERE userID = "+str(userID)
    result = engine.execute(sql)
    if result.rowcount > 0:
        availBalance = 0.0
        for info in result.fetchall():
            availBalance += info[6]
        return{
        "code": 200,
        "message": "Deposit information retireve successfully",
        "data": availBalance
        }

    return {
        "code": 404,
        "message": "no available information found",
        "data": 0.0
    }


#fiter transaction history 
def filter_transaction_history_by_user(userID, start_date, end_date):
    engine = create_engine()
    sql = """
        SELECT *
        FROM transaction_log
        WHERE (accountFrom IN (SELECT depositAccountID FROM deposit_account WHERE userID = '%s')
        OR accountTo IN (SELECT depositAccountID FROM deposit_account WHERE userID = '%s'))
        AND (transactionDate BETWEEN 
        '%s' AND '%s')
        """ % (userID, userID, start_date, end_date)
    print(sql)
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
            "data":transactions
        }

    return {
        "code": 404,
        "message": "no available information found",
        "data":[

        ]
    } 
def filter_transaction_history_by_account(depositAccountID, start_date, end_date):
    engine = create_engine()
    sql = """
        SELECT *
        FROM transaction_log
        WHERE (accountFrom = '%s'
        OR accountTo = '%s')
        AND (transactionDate BETWEEN 
        '%s' AND '%s')
        """ % (depositAccountID, depositAccountID, start_date, end_date)
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
            "data":transactions
        }

    return {
        "code": 404,
        "message": "no available information found",
        "data":[

        ]
    } 

#view large spending view_large_spending_by_user
def view_large_spending_by_user(userID, large_amount_threshold):
    engine = create_engine()
    sql = """
        SELECT *
        FROM transaction_log
        WHERE transactionAmount >= %s
        AND (accountFrom IN (SELECT depositAccountID FROM deposit_account WHERE userID = '%s')
        OR accountTo IN (SELECT depositAccountID FROM deposit_account WHERE userID = '%s'));
    """% (large_amount_threshold, userID, userID)
    print(sql)
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
            "data":transactions
        }

    return {
        "code": 404,
        "message": "no available information found",
        "data":[

        ]
    } 

#view large spending 
def view_large_spending_by_account(depositAccountID, large_amount_threshold):
    engine = create_engine()
    sql = """
        SELECT *
        FROM transaction_log
        WHERE transactionAmount >= %s
        AND (accountFrom = %s OR accountTo = %s);
    """% (large_amount_threshold, depositAccountID, depositAccountID)
    print(sql)
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
            "data":transactions
        }

    return {
        "code": 404,
        "message": "no available information found",
        "data":[

        ]
    } 

#delete deposit account 
def remove_deposit_account(depositAccountID):
    engine = create_engine()
    monthly_balance_record = remove_monthly_balance(depositAccountID)
    print(monthly_balance_record)
    sql = "DELETE FROM deposit_account WHERE depositAccountID ='%s'" % depositAccountID
    print(sql)
    result = engine.execute(sql)
    if result.rowcount > 0:
        return {
            "code": 200,
            "message": "deposit account has been successfully removed",
            "monthly balance": monthly_balance_record
        }
    return {
        "code": 404,
        "message": "no deposit account has been found"
    }

#sub function for remove_deposit_account
def remove_monthly_balance(depositAccountID):
    engine = create_engine()
    sql = "DELETE FROM monthly_balance WHERE depositAccountID ='%s'" % depositAccountID
    print(sql)
    result = engine.execute(sql)
    if result.rowcount > 0:
        return {
            "code": 200,
            "message": "%s monthly balance(s) have been successfully removed" % str(result.rowcount),
        }
    return {
        "code": 404,
        "message": "no monthly balance has been found",
    }

def update_deposit_account_name(depositAccountID, newAccountName):
    engine = create_engine()
    sql = "UPDATE deposit_account SET accountName = '%s' WHERE depositAccountID = '%s';" % (newAccountName, depositAccountID)
    engine.execute(sql)
    return {
        "code": 200,
        "message": "account name has updated successfully"
    }

def get_product_name(productID):
    engine = create_engine()
    sql = "SELECT * FROM product WHERE productID = %s" % productID
    result = engine.execute(sql)
    if result.rowcount > 0:
        for info in result.fetchall():
            product = Product(info[0], info[1], info[2], info[3])
            return product.get_productName()
    return ""

def update_deposit_account_color_and_name(depositAccountID, newColor, newName):
    engine = create_engine()
    sql = "UPDATE deposit_account SET chosenColor = '%s', accountName= '%s' WHERE depositAccountID = '%s';" % (newColor, newName, depositAccountID)
    print(sql)
    engine.execute(sql)
    return {
        "code": 200,
        "message": "deposit account color has updated successfully"
    }


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
                "cashflow_out" : cashflowin,
                "transactions": transactions
            }
        }
    return {
            "code": 404,
            "data": {
                "cashflow_out" : cashflowin,
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


def get_recent_one_month_transactions(userID):
    cashflow_in = get_cashflow_in_this_month(userID)["data"]["cashflow_in"]
    cashflow_out = get_cashflow_out_this_month(userID)["data"]["cashflow_out"]
    return {
        "code": 200,
        "data": {
            "income": cashflow_in,
            "expenses": cashflow_out
        }
    }

