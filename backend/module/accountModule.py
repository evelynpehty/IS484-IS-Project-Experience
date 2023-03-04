from module.databaseConnection import create_engine
from module.classes.user import User
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
def reset_password():
  pass 

#edit personal detail 
def edit_personal_detail():
  pass 

#peek details 

def peek_detail():
  pass 
