from databaseConnection import create_engine


def verify_password(username, password):
  #search for the username then return password from database
  #password_from_database => get the password from database
  engine = create_engine()
  sql = "SELECT username from user WHERE username='"+username+"' AND password ='"+password+"'"
  result = engine.execute("SELECT * FROM user_details WHERE userID='None'")
  if result.rowcount > 0:
    return {
      "code": 200,
      "username": username
    }, 200

  return  {
      "code": 404,
      "username": None
    }, 404 
