from databaseConnection import create_engine
import time

#LOGIN
def verify_password(username, password):
  engine = create_engine()
  sql = "SELECT username from user WHERE username='"+username+"' AND password ='"+password+"'"
  result = engine.execute(sql).fetchone()
  if result:
    userID = result[0]
    ts = time.time()
    ts = str(int(ts))

    #update the last log in time 
    updateSQL = "UPDATE user SET lastLoginTimeStamp='"+str(int(ts))+"' WHERE userID = " + str(userID)
    engine.execute(updateSQL)
    return {
      "code": 200,
      "message": "information retireve successfully",
      "data": result
    }, 200

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
def register(userID, username, password):
  engine = create_engine()
  userID = engine.execute("SELECT COUNT(*) FROM user").fetchone()[0]
  sql = "INSERT INTO user (userID, username, password, lastLoginTimeStamp) VALUES ('"+str(userID)+"', '"+str(username)+"', '"+password+"', 'None')"
  result = engine.execute(sql)
  engine.execute(result)
  return {
    "code": 200,
    "status": "register successful"
  }