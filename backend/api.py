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
"""
ACCOUNT MODULE 


  LOGIN - /login 

  PEEK NET WORTH - /peek_detail

  PEEK ACCOUNT - /peek_detail

  REGISTER - /register


Functions: verify_password, get_net_worth, register, reset_password, edit_personal_detail, peek_detail

API Integrated: verify_password, get_net_worth, register, reset_password, edit_personal_detail, peek_detail

API function tested: verify_password, get_net_worth, register, reset_password, edit_personal_detail, peek_detail

API function no tested: 

"""
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

## account module--- AFTER MIDTERM REVIEW 


# required attribute: userID, familyName, givenName, 
#                         taxIdentifier, dateOfBirth, postalCode, 
#                        addressLine1, addressLine2, country, 
#                         city, state, countryCode, phoneNo, homeNo, 
#                         registrationDate, nationality, gender, 
#                         ethnicity, occupation, jobTitle, 
#                         employerName, maritalStatus, 
#                         email, chosenColor
@api.route('/edit_personal_detail',methods = ['POST', 'GET'])
def edit_personal_detail_request():
  userID = None 
  familyName = None 
  givenName = None 
  taxIdentifier = None 
  dateOfBirth = None 
  postalCode = None 
  addressLine1 = None 
  addressLine2 = None 
  country = None 
  city = None 
  state = None 
  countryCode = None 
  phoneNo = None 
  homeNo = None 
  registrationDate = None 
  nationality = None 
  gender = None 
  ethnicity = None 
  occupation = None 
  jobTitle = None 
  employerName = None 
  maritalStatus = None 
  email = None 
  chosenColor = None
  try:
    if request.method == 'POST':
      userID=request.form['userID']
      familyName=request.form['familyName']
      givenName=request.form['givenName']
      taxIdentifier=request.form['taxIdentifier']
      dateOfBirth=request.form['dateOfBirth']
      postalCode=request.form['postalCode']
      addressLine1=request.form['addressLine1']
      addressLine2=request.form['addressLine2']
      country=request.form['country']
      city=request.form['city']
      state=request.form['state']
      countryCode=request.form['countryCode']
      phoneNo=request.form['phoneNo']
      homeNo=request.form['homeNo']
      registrationDate=request.form['registrationDate']
      nationality=request.form['nationality']
      gender=request.form['gender']
      ethnicity=request.form['ethnicity']
      occupation=request.form['occupation']
      jobTitle=request.form['jobTitle']
      employerName=request.form['employerName']
      maritalStatus=request.form['maritalStatus']
      email=request.form['email']
      chosenColor=request.form['chosenColor']
    else:
      userID=request.args.get('userID')
      familyName=request.args.get('familyName')
      givenName=request.args.get('givenName')
      taxIdentifier=request.args.get('taxIdentifier')
      dateOfBirth=request.args.get('dateOfBirth')
      postalCode=request.args.get('postalCode')
      addressLine1=request.args.get('addressLine1')
      addressLine2=request.args.get('addressLine2')
      country=request.args.get('country')
      city=request.args.get('city')
      state=request.args.get('state')
      countryCode=request.args.get('countryCode')
      phoneNo=request.args.get('phoneNo')
      homeNo=request.args.get('homeNo')
      registrationDate=request.args.get('registrationDate')
      nationality=request.args.get('nationality')
      gender=request.args.get('gender')
      ethnicity=request.args.get('ethnicity')
      occupation=request.args.get('occupation')
      jobTitle=request.args.get('jobTitle')
      employerName=request.args.get('employerName')
      maritalStatus=request.args.get('maritalStatus')
      email=request.args.get('email')
      chosenColor=request.args.get('chosenColor')
    info = edit_personal_detail(userID, familyName, givenName, 
                         taxIdentifier, dateOfBirth, postalCode, 
                         addressLine1, addressLine2, country, 
                         city, state, countryCode, phoneNo, homeNo, 
                         registrationDate, nationality, gender, 
                         ethnicity, occupation, jobTitle, 
                         employerName, maritalStatus, 
                         email, chosenColor)
    return jsonify(info), info["code"]
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500

# required attribute: userID
@api.route('/peek_detail',methods = ['POST', 'GET'])
def peek_detail_request():
  userID = None 
  
  try:
    # print(request.form)
    if request.method == 'POST':
      userID = request.form['userID']
    else:
      userID = request.args.get('userID')

    info = peek_detail(userID)
    return jsonify(info), info["code"]
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 5

# required attribute: username, password, new_password
@api.route('/reset_password',methods = ['POST', 'GET'])
def reset_password_request():
  username = None 
  password = None
  new_password = None 
  try:
    # print(request.form)
    if request.method == 'POST':
      username = request.form['username']
      password = request.form['password']
      new_password = request.form['new_password']
      # return redirect(url_for('success',name = user))
    else:
      username = request.args.get('username')
      password = request.args.get('password')
      new_password = request.form['new_password']
      # return redirect(url_for('success',name = user))
    # print(username, password)
    userInfo = reset_password(username, password, new_password)
    return jsonify(userInfo), 200

  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500

# required attribute: userID
@api.route('/get_self_customization_functions',methods = ['POST', 'GET'])
def get_self_customization_functions_request():
  userID = None 
  
  try:
    # print(request.form)
    if request.method == 'POST':
      userID = request.form['userID']
    else:
      userID = request.args.get('userID')

    info = get_self_customization_functions(userID)
    return jsonify(info), info["code"]
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 5

# required attribute: userID, functions_for_customization
@api.route('/update_self_customization_functions',methods = ['POST', 'GET'])
def update_self_customization_functions_request():
  userID = None 
  functionsForCustomization = None 
  try:
    # print(request.form)
    if request.method == 'POST':
      print("POST")
      print("REQUEST", request.form)
      userID = request.form['userID']
      
      functionsForCustomization = request.form['functionsForCustomization']
      print("functionsForCustomization",request.form['functionsForCustomization'])
    else:
      print("GET")
      userID = request.args.get('userID')
      functionsForCustomization = request.args.get('functionsForCustomization')
    print(userID, functionsForCustomization)
    info = update_self_customization_functions(userID, functionsForCustomization)
    return jsonify(info), info["code"]
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 5




### deposit module--- 
"""
DEPOSIT MODULE
  ALL ACCOUNTS - /get_all_deposit_accounts

  ACCOUNTS DETAILS - /get_selected_deposit_account

  MANAGE ACCOUNT - 

    EDIT ACCOUNT - /remove_deposit_account, update_deposit_account_name

    ADD ACCOUNT - /add_new_deposit_account (add_new_deposit_account_with_default_values, add_new_deposit_account_without_default_values)

  TRANSACTIONS/CASH FLOW  
                - /filter_transaction_history_by_account (by individual account)
                - /filter_transaction_history_by_user (by user: to view all the user's transactions)





Functions: get_view_all_deposit_accounts, get_view_selected_deposit_account, get_view_available_balance, 
                      get_view_recent_three_transaction, get_view_all_transaction, add_new_deposit_account_with_default_values,
                      add_new_deposit_account_without_default_values, get_new_productID, get_net_worth_deposit, filter_transaction_history_by_user,
                      filter_transaction_history_by_account, view_large_spending_by_account, view_large_spending_by_user,
                      remove_deposit_account (including sub-function: remove_monthly_balance)

API Integrated: get_view_all_deposit_accounts, get_view_selected_deposit_account, get_view_available_balance, 
                      get_view_recent_three_transaction, get_view_all_transaction, add_new_deposit_account_with_default_values,
                      add_new_deposit_account_without_default_values

API function tested: get_view_all_deposit_accounts, get_view_selected_deposit_account, get_view_available_balance, 
                      get_view_recent_three_transaction, get_view_all_transaction, add_new_deposit_account_with_default_values,
                      add_new_deposit_account_without_default_values, get_new_productID, get_net_worth_deposit, filter_transaction_history_by_user,
                      filter_transaction_history_by_account, view_large_spending_by_account, view_large_spending_by_user,
                      remove_deposit_account (including sub-function: remove_monthly_balance)

API function no tested: 

"""

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


## deposit module--- AFTER MIDTERM REVIEW 

# required attribute: userID
@api.route('/get_net_worth_deposit',methods = ['POST', 'GET'])
def get_net_worth_deposit_request():
  userID = None 
  
  try:
    # print(request.form)
    if request.method == 'POST':
      userID = request.form['userID']
    else:
      userID = request.args.get('userID')

    userInfo = get_net_worth_deposit(userID)
    return jsonify(userInfo), userInfo["code"]

  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500

# required attribute: userID, start_date, end_date
@api.route('/filter_transaction_history_by_user',methods = ['POST', 'GET'])
def filter_transaction_history_by_user_request():
  userID = None
  start_date = None 
  end_date = None
  try: 
    if request.method == 'POST':
      userID = request.form['userID']
      start_date = request.form['start_date']
      end_date = request.form['end_date']
    else:
      userID = request.args.get('userID')
      start_date = request.args.get('start_date')
      end_date = request.args.get('end_date')
    userInfo = filter_transaction_history_by_user(userID, start_date, end_date)
    return jsonify(userInfo), userInfo["code"]
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500
  
# required attribute: depositAccountID, start_date, end_date
@api.route('/filter_transaction_history_by_account',methods = ['POST', 'GET'])
def filter_transaction_history_by_account_request():
  depositAccountID = None
  start_date = None 
  end_date = None
  try: 
    if request.method == 'POST':
      depositAccountID = request.form['depositAccountID']
      start_date = request.form['start_date']
      end_date = request.form['end_date']
    else:
      depositAccountID = request.args.get('depositAccountID')
      start_date = request.args.get('start_date')
      end_date = request.args.get('end_date')
    userInfo = filter_transaction_history_by_account(depositAccountID, start_date, end_date)
    return jsonify(userInfo), userInfo["code"]
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500

# required attribute: userID, large_amount_threshold
@api.route('/view_large_spending_by_user',methods = ['POST', 'GET'])
def view_large_spending_by_user_request():
  userID = None
  large_amount_threshold = None 
  try: 
    if request.method == 'POST':
      userID = request.form['userID']
      large_amount_threshold = request.form['large_amount_threshold']
    else:
      userID = request.args.get('userID')
      large_amount_threshold = request.args.get('large_amount_threshold')
    userInfo = view_large_spending_by_user(userID, large_amount_threshold)
    return jsonify(userInfo), userInfo["code"]
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500

# required attribute: depositAccountID, large_amount_threshold
@api.route('/view_large_spending_by_account',methods = ['POST', 'GET'])
def view_large_spending_by_account_request():
  depositAccountID = None
  large_amount_threshold = None 
  try: 
    if request.method == 'POST':
      depositAccountID = request.form['depositAccountID']
      large_amount_threshold = request.form['large_amount_threshold']
    else:
      depositAccountID = request.args.get('depositAccountID')
      large_amount_threshold = request.args.get('large_amount_threshold')
    userInfo = view_large_spending_by_account(depositAccountID, large_amount_threshold)
    return jsonify(userInfo), userInfo["code"]
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500

# required attribute: depositAccountID
@api.route('/remove_deposit_account',methods = ['POST', 'GET'])
def remove_deposit_account_request():
  depositAccountID = None
  try: 
    if request.method == 'POST':
      depositAccountID = request.form['depositAccountID']
    else:
      depositAccountID = request.args.get('depositAccountID')
    print(depositAccountID)
    userInfo = remove_deposit_account(depositAccountID)
    return jsonify(userInfo), userInfo["code"]
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500
  
# required attribute: depositAccountID, newAccountName
@api.route('/update_deposit_account_name',methods = ['POST', 'GET'])
def update_deposit_account_name_request():
  depositAccountID = None
  newAccountName = None 
  try: 
    if request.method == 'POST':
      depositAccountID = request.form['depositAccountID']
      newAccountName = request.form['newAccountName']
    else:
      depositAccountID = request.args.get('depositAccountID')
      newAccountName = request.args.get('newAccountName')
    print(depositAccountID)
    userInfo = update_deposit_account_name(depositAccountID, newAccountName)
    return jsonify(userInfo), userInfo["code"]
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500

### loan module --- 

"""

LOAN MODULE 
 ALL LOANS - /get_all_loan_account ( but Account name hasn't updated)
 ACCOUNT DETAILS - /get_loan_account_detail
 LOAN CALCULATOR - /get_calculate_loan_repayment_detail
 REPAYMENT - /view_loan_transactions_by_account, /view_loan_transactions_by_user

  UPDATE ACCOUNT NAME - 




functions: get_view_all_loan_account, get_view_loan_account_detail, get_view_calculate_loan_repayment_detail,
                    view_loan_transactions_by_account, view_loan_transactions_by_user, get_net_worth_loan, add_loan_account, 
                    delelte_loan_account, calculate_partial_loan_repayment, consolidated_loan_repayment, consolidated_loan_repayment


API Integrated: get_view_all_loan_account, get_view_loan_account_detail, get_view_calculate_loan_repayment_detail, 
                    view_loan_transactions_by_account, view_loan_transactions_by_user, get_net_worth_loan, add_loan_account, 
                    delelte_loan_account, consolidated_loan_repayment

API function tested: get_view_all_loan_account, get_view_loan_account_detail, get_view_calculate_loan_repayment_detail,
                      view_loan_transactions_by_account, view_loan_transactions_by_user, get_net_worth_loan, add_loan_account, 
                      delelte_loan_account, consolidated_loan_repayment

API function no tested: 

"""
# required attribute(default): userID
@api.route('/get_all_loan_account',methods = ['POST', 'GET'])
def get_all_loan_account_request():
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
def get_loan_account_detail_request():
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
def get_calculate_loan_repayment_detail_request():
  try:
    principal = None
    rate = None 
    payment_period_in_year = None 
    if request.method == 'POST':
      print(request.form)
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

## loan module--- AFTER MIDTERM REVIEW 
# required attribute(default): userID
@api.route('/get_net_worth_loan',methods = ['POST', 'GET'])
def get_net_worth_loan_request():
  try:
    userID = None 
    if request.method == 'POST':
      userID = request.form['userID']
    else:
      userID = request.args.get('userID')
    
    result = get_net_worth_loan(userID)
    code = result["code"]
    return jsonify(result), code
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500


# required attribute(default): loanAccountID,
#                userID,
#                 productID,
#                 loanStartDate,
#                 loanMaturityDate,
#                 loanTerm,
#                 loanAmount,
#                 loanBalance,
#                 loanPurpose,
#                 ltvRatio,
#                 interestRate,
#                 penaltyRate,
#                 loanEmployeeID
@api.route('/add_loan_account',methods = ['POST', 'GET'])
def add_loan_account_request():
  try:
    loanAccountID = None 
    userID = None
    productID = None
    loanStartDate = None
    loanMaturityDate = None
    loanTerm = None
    loanAmount = None
    loanBalance = None
    loanPurpose = None
    ltvRatio = None
    interestRate = None
    penaltyRate = None
    loanEmployeeID = None
    if request.method == 'POST':
      loanAccountID = request.form['loanAccountID']
      userID = request.form['userID']
      productID = request.form['productID']
      loanStartDate = request.form['loanStartDate']
      loanMaturityDate = request.form['loanMaturityDate']
      loanTerm = request.form['loanTerm']
      loanAmount = request.form['loanAmount']
      loanBalance = request.form['loanBalance']
      loanPurpose = request.form['loanPurpose']
      ltvRatio = request.form['ltvRatio']
      interestRate = request.form['interestRate']
      penaltyRate = request.form['penaltyRate']
      loanEmployeeID = request.form['loanEmployeeID']
    else:
      loanAccountID = request.args.get('loanAccountID')
      userID = request.args.get('userID')
      productID = request.args.get('productID')
      loanStartDate = request.args.get('loanStartDate')
      loanMaturityDate = request.args.get('loanMaturityDate')
      loanTerm = request.args.get('loanTerm')
      loanAmount = request.args.get('loanAmount')
      loanBalance = request.args.get('loanBalance')
      loanPurpose = request.args.get('loanPurpose')
      ltvRatio = request.args.get('ltvRatio')
      interestRate = request.args.get('interestRate')
      penaltyRate = request.args.get('penaltyRate')
      loanEmployeeID = request.args.get('loanEmployeeID')
    
    result = add_loan_account(loanAccountID,
                userID,
                productID,
                loanStartDate,
                loanMaturityDate,
                loanTerm,
                loanAmount,
                loanBalance,
                loanPurpose,
                ltvRatio,
                interestRate,
                penaltyRate,
                loanEmployeeID)
    
    return jsonify(result), result["code"]
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500
  
# required attribute(default): loanAccountID
@api.route('/delelte_loan_account',methods = ['POST', 'GET'])
def delelte_loan_account_request():
  try: 
    loanAccountID = None 
    if request.method == 'POST':
      loanAccountID = request.form['loanAccountID']
    else:
      loanAccountID = request.args.get('loanAccountID')
    result = delelte_loan_account(loanAccountID)
    return jsonify(result), result["code"]
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500
  

# required attribute(default): userID
@api.route('/consolidated_loan_repayment',methods = ['POST', 'GET'])
def consolidated_loan_repayment_request():
  try: 
    userID = None 
    if request.method == 'POST':
      userID = request.form['userID']
    else:
      userID = request.args.get('userID')
    result = consolidated_loan_repayment(userID)
    return jsonify(result), result["code"]
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500
  
# required attribute(default): loanAccountID
@api.route('/view_loan_transactions_by_account',methods = ['POST', 'GET'])
def view_loan_transactions_by_account_request():
  try: 
    loanAccountID = None 
    if request.method == 'POST':
      loanAccountID = request.form['loanAccountID']
    else:
      loanAccountID = request.args.get('loanAccountID')
    result = view_loan_transactions_by_account(loanAccountID)
    return jsonify(result), result["code"]
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500

# required attribute(default): userID
@api.route('/view_loan_transactions_by_user',methods = ['POST', 'GET'])
def view_loan_transactions_by_user_request():
  try: 
    userID = None 
    if request.method == 'POST':
      userID = request.form['userID']
    else:
      userID = request.args.get('userID')
    result = view_loan_transactions_by_user(userID)
    return jsonify(result), result["code"]
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500
  

# required attribute(default): userID
@api.route('/update_loan_account_name',methods = ['POST', 'GET'])
def update_loan_account_name_request():
  try: 
    loanAccountID = None
    newAccountName = None
    if request.method == 'POST':
      loanAccountID = request.form['loanAccountID']
      newAccountName = request.form['newAccountName']
    else:
      loanAccountID = request.args.get('loanAccountID')
      newAccountName = request.args.get('newAccountName')
    result = update_loan_account_name(loanAccountID, newAccountName)
    return jsonify(result), result["code"]
  except Exception as e:

    return jsonify({
      "code": 500,
      "message": str(e),
      "data": None
    }), 500