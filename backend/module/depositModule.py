from databaseConnection import create_engine
from classes.deposit_account import Deposit_Account
from classes.transaction_log import Transaction_Log
from accountModule import get_net_worth

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
        "data":[

        ]
    }


#SELECTED
def get_selected_deposit_account(DepositAccountID):
    engine = create_engine()
    sql = "SELECT * FROM deposit_account WHERE DepositAccountID = "+str(DepositAccountID)
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
def get_available_balance(userID):
    #same return as this function in accountModule
    return get_net_worth(userID)

def get_recent_three_transaction(userID):
    engine = create_engine()
    sql = """
    SELECT * FROM transaction_log  
    WHERE accountFROM IN (SELECT depositAccountID FROM deposit_account WHERE userID = """ +str(userID)+""")
    OR accountTo IN (SELECT depositAccountID FROM deposit_account WHERE userID = """ +str(userID)+""")
    ORDER BY transactionDate DESC
    LIMIT 3;
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
            transactions.append(transactions)
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

#TRANSACTIONS UI
def get_all_transaction(userID):
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
            transactions.append(transactions)
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
def add_new_deposit_account():
    pass 


#Deposit Account UI
#more operation 
