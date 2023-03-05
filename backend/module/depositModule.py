from module.databaseConnection import create_engine
from module.classes.deposit_account import Deposit_Account
from module.classes.transaction_log import Transaction_Log
from module.accountModule import get_net_worth
from datetime import datetime
from dateutil.relativedelta import relativedelta


def get_view_all_deposit_accounts(userID):
    engine = create_engine()
    sql = "SELECT * FROM deposit_account WHERE userID = "+str(userID)
    result = engine.execute(sql)
    if result.rowcount>0:
        accountInfo = []
        for info in result.fetchall():
            depositAccountInfo = Deposit_Account(
                info[0], info[1], info[2], info[3], info[4], info[5], info[6], info[7],
                info[8], info[9], info[10], info[11], info[12], info[13], info[14], info[15],
                info[16]
            ).to_dict()
            accountInfo.append(depositAccountInfo)
        return{
            "code": 200,
            "data": accountInfo
        }

    return {
        "code": 404,
        "message": "no available information found",
        "data":None
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
                info[16]
            ).to_dict()
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
    return get_net_worth(userID)

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
    result = add_new_deposit_account_without_default_values(depositAccountID, userID, productID, accountName,
        crr_date, expire_date, availBalance, 
        pendingBalance, currentStatus, interestRate, depositTerm, 
        openEmployeeID, minimumAmount, cardNo, crr_date,
        expire_date, CVV)
        
    return result




def add_new_deposit_account_without_default_values(depositAccountID ,  userID ,  productID ,  accountName , 
        accountOpenDate ,  accountCloseDate ,  availBalance , 
        pendingBalance ,  currentStatus ,  interestRate ,  depositTerm , 
        openEmployeeID ,  minimumAmount ,  cardNo ,  cardStartDate , 
        cardExpiryDate ,  CVV ):
    
    sql = """
        INSERT INTO  deposit_account
        ( depositAccountID ,  userID ,  productID ,  accountName , 
        accountOpenDate ,  accountCloseDate ,  availBalance , 
        pendingBalance ,  currentStatus ,  interestRate ,  depositTerm , 
        openEmployeeID ,  minimumAmount ,  cardNo ,  cardStartDate , 
        cardExpiryDate ,  CVV ) 
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
        cardExpiryDate ,  CVV 
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
        "data": None
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

#view large spending 
def view_large_spending_by_account(depositAccountID, large_amount_threshold):
    engine = create_engine()
    sql = """
        SELECT *
        FROM transaction_log
        WHERE transactionAmount >= %s
        AND (accountFrom IN (SELECT depositAccountID FROM deposit_account WHERE userID = '%s')
        OR accountTo IN (SELECT depositAccountID FROM deposit_account WHERE userID = '%s'));
    """% (large_amount_threshold, depositAccountID, depositAccountID)
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
def view_large_spending_by_user(userID, large_amount_threshold):
    engine = create_engine()
    sql = """
        SELECT *
        FROM transaction_log
        WHERE transactionAmount >= %s
        AND (accountFrom = %s OR accountTo = %s);
    """% (large_amount_threshold, userID, userID)
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

def remove_monthly_balance(depositAccountID):
    engine = create_engine()
    sql = "DELETE FROM monthly_balance WHERE depositAccountID ='%s'" % depositAccountID
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




