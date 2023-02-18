from flask import Flask, redirect, url_for, request, jsonify
from flask_cors import CORS
from module.accountModule import *
from module.depositModule import *

app = Flask(__name__)
CORS(app)


#demo --- 
@app.route('/success/<name>')
def success(name):
   return 'welcome %s' % name

# account module--- 
@app.route('/login',methods = ['POST', 'GET'])
def login():
  username = None 
  password = None
  
  try:
    # print(request.form)
    if request.method == 'POST':
      username = request.form['username']
      password = request.form['password']
      # return redirect(url_for('success',name = user))
    else:
      username = request.args.get('username')
      password = request.args.get('password')
      # return redirect(url_for('success',name = user))
    print(username, password)
    userInfo = verify_password(username, password)
    return jsonify(userInfo), 200

  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500

@app.route('/register',methods = ['POST', 'GET'])
def register_call():
  username = None 
  password = None
  
  try:
    # print(request.form)
    if request.method == 'POST':
      username = request.form['username']
      password = request.form['password']
      # return redirect(url_for('success',name = user))
    else:
      username = request.args.get('username')
      password = request.args.get('password')
      # return redirect(url_for('success',name = user))
    info = register(username, password)
    return jsonify(info), 200
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500
@app.route('/logout',methods = ['POST', 'GET'])
def logout():
  # update the username and userID in cookie if using 
  return jsonify({
    "username": None,
    "userID": None,
  }), 200

# deposit module--- 
@app.route('/get_all_deposit_accounts',methods = ['POST', 'GET'])
def get_all_deposit_accounts():
  try:
    userID = None 
    if request.method == 'POST':
      userID = request.form['userID']
    else:
      userID = request.args.get('username')
    
    result = get_view_all_deposit_accounts(userID)
    code = result["code"]
    return jsonify(result), code
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500

@app.route('/get_selected_deposit_account',methods = ['POST', 'GET'])
def get_selected_deposit_account():
  try:
    DepositAccountID = None 
    if request.method == 'POST':
      DepositAccountID = request.form['DepositAccountID']
    else:
      DepositAccountID = request.args.get('DepositAccountID')
    
    result = get_view_selected_deposit_account(DepositAccountID)
    code = result["code"]
    return jsonify(result), code
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500

@app.route('/get_available_balance',methods = ['POST', 'GET'])
def get_available_balance():
  try:
    userID = None 
    if request.method == 'POST':
      userID = request.form['userID']
    else:
      userID = request.args.get('username')
    
    result = get_view_available_balance(userID)
    code = result["code"]
    return jsonify(result), code
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500


@app.route('/get_recent_three_transaction',methods = ['POST', 'GET'])
def get_recent_three_transaction():
  try:
    userID = None 
    if request.method == 'POST':
      userID = request.form['userID']
    else:
      userID = request.args.get('username')
    
    result = get_view_recent_three_transaction(userID)
    code = result["code"]
    return jsonify(result), code
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500

@app.route('/get_all_transaction',methods = ['POST', 'GET'])
def get_all_transaction():
  try:
    userID = None 
    if request.method == 'POST':
      userID = request.form['userID']
    else:
      userID = request.args.get('username')
    
    result = get_view_all_transaction(userID)
    code = result["code"]
    return jsonify(result), code
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500

# no test yet 
@app.route('/add_new_deposit_account',methods = ['POST', 'GET'])
def add_new_deposit_account():
  try:
    depositAccountID = None
    userID = None
    depositAccountID = None
    if request.method == 'POST':
      depositAccountID = request.form['depositAccountID']
      userID = request.form['userID']
      accountName = request.form['accountName']
    else:
      depositAccountID = request.args.get('depositAccountID')
      userID = request.args.get('username')
      accountName = request.args.get('accountName')
    try:
      productID = None
      accountOpenDate = None
      accountCloseDate = None
      availBalance = None
      pendingBalance = None
      currentStatus = None
      interestRate = None
      depositTerm = None
      openEmployeeID = None
      minimumAmount = None
      cardNo = None
      cardStartDate = None
      cardExpiryDate = None
      CVV = None
      if request.method == 'POST':
        productID = request.form['productID']
        accountOpenDate = request.form['accountOpenDate']
        accountCloseDate = request.form['accountCloseDate']
        availBalance = request.form['availBalance']
        pendingBalance = request.form['pendingBalance']
        currentStatus = request.form['currentStatus']
        interestRate = request.form['interestRate']
        depositTerm = request.form['depositTerm']
        openEmployeeID = request.form['openEmployeeID']
        minimumAmount = request.form['minimumAmount']
        cardNo = request.form['cardNo']
        cardStartDate = request.form['cardStartDate']
        cardExpiryDate = request.form['cardExpiryDate']
        CVV = request.form['CVV']
      else:
        productID = request.args.get('productID')
        accountOpenDate = request.args.get('accountOpenDate')
        accountCloseDate = request.args.get('accountCloseDate')
        availBalance = request.args.get('availBalance')
        pendingBalance = request.args.get('pendingBalance')
        currentStatus = request.args.get('currentStatus')
        interestRate = request.args.get('interestRate')
        depositTerm = request.args.get('depositTerm')
        openEmployeeID = request.args.get('openEmployeeID')
        minimumAmount = request.args.get('minimumAmount')
        cardNo = request.args.get('cardNo')
        cardStartDate = request.args.get('cardStartDate')
        cardExpiryDate = request.args.get('cardExpiryDate')
        CVV = request.args.get('CVV')
      add_new_deposit_account_without_default_values(depositAccountID ,  userID ,  productID ,  accountName , 
        accountOpenDate ,  accountCloseDate ,  availBalance , 
        pendingBalance ,  currentStatus ,  interestRate ,  depositTerm , 
        openEmployeeID ,  minimumAmount ,  cardNo ,  cardStartDate , 
        cardExpiryDate ,  CVV )
    except:
      result = add_new_deposit_account_with_default_values(depositAccountID, userID, accountName)
      code = result["code"]
      return jsonify(result), code
    
    
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500

if __name__ == '__main__':
   app.run(debug = True)