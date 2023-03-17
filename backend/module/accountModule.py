from module.databaseConnection import *
from module.classes.user import User
from module.depositModule import get_net_worth_deposit
from module.loanModule import get_net_worth_loan, get_credit_card_net_worth
import time
"""

"""
#LOGIN
def verify_password(username, password):
  engine = create_engine()
  sql = "SELECT * from user WHERE username='"+username+"' AND password ='"+password+"'"
  print(sql)
  result = engine.execute(sql).fetchone()
  print(result)
  if result:
    userID = result[0]
    ts = time.time()
    ts = str(int(ts))
    result = User(result[0], result[1], result[2], result[3]).to_dict()
    #update the last log in time 
    updateSQL = "UPDATE user SET lastLoginTimeStamp='"+str(int(ts))+"' WHERE userID = '" + str(userID)+"'"
    engine.execute(updateSQL)
    return {
      "code": 200,
      "message": "information retireve successfully",
      "data": result
    }

  return  {
      "code": 404,
      "message": "no available information found",
      "data": None
    }

#PEEK
def get_net_worth(userID):
  engine = create_engine()
  sql = "SELECT * FROM deposit_account WHERE userID = "+str(userID)
  result = engine.execute(sql)
  if result.rowcount > 0:
    availBalance = 0.0
    for info in result.fetchall():
      availBalance += info[6]
    return{
      "code": 200,
      "message": "information retireve successfully",
      "data": availBalance
    }

  return {
    "code": 404,
    "message": "no available information found",
    "data": None
  }

#REGISTER
def register(username, password):
  engine = create_engine()
  sql = "SELECT * FROM user WHERE username='%s'" %username
  result = engine.execute(sql)
  if(result.rowcount > 0):
    return {
    "code": 409,
    "message": "register is not successful, username has been registered"
  }
  userID = engine.execute("SELECT COUNT(*) FROM user").fetchone()[0]+1
  sql = "INSERT INTO user (userID, username, password, lastLoginTimeStamp) VALUES ('"+str(userID)+"', '"+str(username)+"', '"+password+"', 'None')"
  result = engine.execute(sql)
  return {
    "code": 200,
    "message": "register successful"
  }


# FUNCTION BEFORE MIDTERM 



#reset password
def reset_password(username, password, new_password):
    info = verify_password(username, password)
    if info["code"] == 404:
       return info 
    engine = create_engine()
    # sql = "SELECT * FROM user WHERE username='%s'" %username
    sql = "SELECT * FROM user WHERE username='%s'" %username
    result = engine.execute(sql)
    if(result.rowcount == 0):
        return {
        "code": 404,
        "message": "username is not found"
      }
    sql ="UPDATE user SET password='%s' WHERE username='%s'" % (new_password, username)
    print(sql)
    result = engine.execute(sql)
    return {
      "code": 200,
      "message": "password reset successful"
    }

#edit personal detail 
def edit_personal_detail(userID, familyName, givenName, 
                         taxIdentifier, dateOfBirth, postalCode, 
                         addressLine1, addressLine2, country, 
                         city, state, countryCode, phoneNo, homeNo, 
                         registrationDate, nationality, gender, 
                         ethnicity, occupation, jobTitle, 
                         employerName, maritalStatus, 
                         email, chosenColor):
    engine = create_engine()
    sql = "SELECT * FROM user WHERE userID='%s'" %userID
    result = engine.execute(sql)
    if(result.rowcount == 0):
        return {
        "code": 404,
        "message": "username is not found"
      }
    sql = """
        UPDATE user_details
        SET
          familyName = '%s',
          givenName = '%s',
          taxIdentifier = '%s',
          dateOfBirth = '%s',
          postalCode = '%s',
          addressLine1 = '%s',
          addressLine2 = '%s',
          country = '%s',
          city = '%s',
          state = '%s',
          countryCode = '%s',
          phoneNo = '%s',
          homeNo  = '%s',
          registrationDate  = '%s',
          nationality  = '%s',
          gender  = '%s',
          ethnicity  = '%s',
          occupation  = '%s',
          jobTitle  = '%s',
          employerName  = '%s',
          maritalStatus  = '%s',
          email  = '%s',
          chosenColor  = '%s'
        WHERE  userID  = '%s';
      """ % (familyName, givenName, 
                             taxIdentifier, dateOfBirth, postalCode, 
                             addressLine1, addressLine2, country, 
                             city, state, countryCode, phoneNo, homeNo, 
                             registrationDate, nationality, gender, 
                             ethnicity, occupation, jobTitle, 
                             employerName, maritalStatus, 
                             email, chosenColor, userID)
    result = engine.execute(sql)
    return {
      "code": 200,
      "message": "edit personal detail successful"
    }
    

#peek details 
def peek_detail(userID):
  net_worth_deposit = get_net_worth_deposit(userID)
  net_worth_loan = get_net_worth_loan(userID)
  net_worth_credit_card = get_credit_card_net_worth(userID)
  return {
     "code": 200,
     "message": "Peek data successfully",
     "data": {
        "deposit_net_worth": net_worth_deposit,
        "loan_net_worth": net_worth_loan,
        "net_worth_credit_card": net_worth_credit_card
     }
  }

#self-customization (type: dictionary: {userID: [functions]})
# SELF_CUSTOMIZATION = {
   
# }


#LOOKING INTO SELF_CUSTOMIZATION.json for records 
# implement by json file to store the customization function; can consider it with fornt end cookies in futures
def get_self_customization_functions(userID):
   SELF_CUSTOMIZATION = get_SELF_CUSTOMIZATION()
   DEFAULT_FUNCTION_FOR_CUSTOMIZATION = "Saving,Loan,Investments,Personalise"
   if userID in SELF_CUSTOMIZATION:
      return {
         "code": 200,
         "data":{ 
         "functions": SELF_CUSTOMIZATION[userID].replace(" ", "").split(",")
         }
      }
   SELF_CUSTOMIZATION[userID] = DEFAULT_FUNCTION_FOR_CUSTOMIZATION
   update_SELF_CUSTOMIZATION(SELF_CUSTOMIZATION)
   return {
      "code": 404,
      "data":{ 
         "functions": DEFAULT_FUNCTION_FOR_CUSTOMIZATION.replace(" ", "").split(",")
        }
   }

def update_self_customization_functions(userID, functions_for_customization):
   SELF_CUSTOMIZATION = dict(get_SELF_CUSTOMIZATION())
   print("functions_for_customization", functions_for_customization)
   SELF_CUSTOMIZATION[userID] = functions_for_customization
   update_SELF_CUSTOMIZATION(SELF_CUSTOMIZATION)
   return {
      "code": 200,
      "message": "update self customization functions successfully!",
      "data": SELF_CUSTOMIZATION[userID].replace(" ", "").split(",")
   }

