from module.databaseConnection import create_engine
from module.classes.user import User
from module.depositModule import get_net_worth_deposit
from module.loanModule import get_net_worth_loan
import time

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
    return {
      "code": 200,
      "message": "edit personal detail successful"
    }
    

#peek details 
def peek_detail(userID):
  net_worth_deposit = get_net_worth_deposit(userID)
  net_worth_loan = get_net_worth_loan(userID)
  return {
     "code": 200,
     "message": "Peek data successfully",
     "data": {
        "deposit_net_worth": net_worth_deposit,
        "loan_net_worth": net_worth_loan
     }
  }