from databaseConnection import create_engine
from classes.deposit_account import Deposit_Account
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
            "accountInfo": accountInfo
        }

    return {
        "code": 404,
        "accountInfo":[

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
            "accountInfo": depositAccountInfo
        }
    return {
        "code": 404,
        "accountInfo": None
    }




