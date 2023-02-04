def verify_password(username, password):
  #search for the username then return password from database
  #password_from_database => get the password from database
  password_from_database = "password1"
  if password == password_from_database:
    return {
      "username": username,

    } 
  return None 
