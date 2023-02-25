from flask import Blueprint, request, jsonify
from models import db, User, UserDetails, Product, DepositAccount, LoanAccount, TransactionType, TransactionLog, MonthlyBalance, CreditCard

from module.accountModule import *
from module.depositModule import *
from module.loanModule import *
from module.portfolioModule import *
from module.predictiveModule import *
from module.securitiesModule import *

api = Blueprint('api', __name__)

### account module--- 
# required attribute: username, password
@api.route('/login',methods = ['POST', 'GET'])
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
    # print(username, password)
    userInfo = verify_password(username, password)
    return jsonify(userInfo), 200

  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500

# required attribute: username, password
@api.route('/register',methods = ['POST', 'GET'])
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

# required attribute: 
@api.route('/logout',methods = ['POST', 'GET'])
def logout():
  # update the username and userID in cookie if using 
  return jsonify({
    "username": None,
    "userID": None,
    "message": "log out successfully",
  }), 200



### deposit module--- 
# required attribute: userID
@api.route('/get_all_deposit_accounts',methods = ['POST', 'GET'])
def get_all_deposit_accounts():
  try:
    userID = None 
    if request.method == 'POST':
      userID = request.form['userID']
    else:
      userID = request.args.get('userID')
    
    result = get_view_all_deposit_accounts(userID)
    code = result["code"]
    return jsonify(result), code
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500


# required attribute: depositAccountID
@api.route('/get_selected_deposit_account',methods = ['POST', 'GET'])
def get_selected_deposit_account():
  try:
    depositAccountID = None 
    if request.method == 'POST':
      depositAccountID = request.form['depositAccountID']
    else:
      depositAccountID = request.args.get('depositAccountID')
    
    result = get_view_selected_deposit_account(depositAccountID)
    code = result["code"]
    return jsonify(result), code
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500

# required attribute: userID
@api.route('/get_available_balance',methods = ['POST', 'GET'])
def get_available_balance():
  try:
    userID = None 
    if request.method == 'POST':
      userID = request.form['userID']
    else:
      userID = request.args.get('userID')
    
    result = get_view_available_balance(userID)
    code = result["code"]
    return jsonify(result), code
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500

# required attribute: userID
@api.route('/get_recent_three_transaction',methods = ['POST', 'GET'])
def get_recent_three_transaction():
  try:
    userID = None 
    if request.method == 'POST':
      userID = request.form['userID']
    else:
      userID = request.args.get('userID')
    
    result = get_view_recent_three_transaction(userID)
    code = result["code"]
    return jsonify(result), code
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500


# required attribute: userID
@api.route('/get_all_transaction',methods = ['POST', 'GET'])
def get_all_transaction():
  try:
    userID = None 
    if request.method == 'POST':
      userID = request.form['userID']
    else:
      userID = request.args.get('userID')
    
    result = get_view_all_transaction(userID)
    code = result["code"]
    return jsonify(result), code
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500



# required attribute(default): depositAccountID, userID, accountName
# required attribute(non-default): depositAccountID, userID, accountName, productID, accountOpenDate, accountCloseDate,
#                                 availBalance, pendingBalance, currentStatus, interestRate, depositTerm, openEmployeeID,
#                                 minimumAmount, cardNo, cardStartDate, cardExpiryDate, CVV
@api.route('/add_new_deposit_account',methods = ['POST', 'GET'])
def add_new_deposit_account():
  try:
    depositAccountID = None
    userID = None
    accountName = None
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





### loan module --- 
# required attribute(default): userID
@api.route('/get_all_loan_account',methods = ['POST', 'GET'])
def get_all_loan_account():
  try:
    userID = None 
    if request.method == 'POST':
      userID = request.form['userID']
    else:
      userID = request.args.get('userID')
    
    result = get_view_all_loan_account(userID)
    code = result["code"]
    return jsonify(result), code
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500


# required attribute(default): loanAccountID
@api.route('/get_loan_account_detail',methods = ['POST', 'GET'])
def get_loan_account_detail():
  try:
    loanAccountID = None 
    if request.method == 'POST':
      loanAccountID = request.form['loanAccountID']
    else:
      loanAccountID = request.args.get('loanAccountID')
    
    result = get_view_loan_account_detail(loanAccountID)
    code = result["code"]
    return jsonify(result), code
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500



# required attribute(default): principal, rate, payment_period_in_year
@api.route('/get_calculate_loan_repayment_detail',methods = ['POST', 'GET'])
def get_calculate_loan_repayment_detail():
  try:
    principal = None
    rate = None 
    payment_period_in_year = None 
    if request.method == 'POST':
      principal = request.form['principal']
      rate = request.form['rate'] 
      payment_period_in_year = request.form['payment_period_in_year']
    else:
      principal = request.args.get('principal')
      rate = request.args.get('rate')
      payment_period_in_year = request.args.get('payment_period_in_year')
    
    result = get_view_calculate_loan_repayment_detail(float(principal), float(rate), float(payment_period_in_year))
    code = result["code"]
    return jsonify(result), code
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500
