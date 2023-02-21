from flask import Blueprint, request, jsonify
from models import db, User, UserDetails, Product, DepositAccount, LoanAccount, TransactionType, TransactionLog, MonthlyBalance, CreditCard

from module.accountModule import *
from module.depositModule import *
from module.loanModule import *
from module.portfolioModule import *
from module.predictiveModule import *
from module.securitiesModule import *

api = Blueprint('api', __name__)

@api.route("/user")
def getalluser():
    user_list = User.query.all()
    if len(user_list):
        return jsonify({
            "code": 200,
            "data":{
                "user_list": [user.json() for user in user_list]
            }
        }), 200
    return jsonify({
        "code": 404,
        "message": "There are no available user."
    }),404
    
#Get user by username
@api.route("/user/<string:username>")
def getuserbyusername(username):
    username = User.query.filter_by(username=username).first()
    if username:
        return jsonify({
            "code": 200,
            "data": username.json()
        }),200
    return jsonify({
        "code": 404,
        "message": "No record found"
    }),404
    
#Update User LoginTimeStamp
@api.route("/user/<int:userID>",  methods=["PUT"])
def updateuserbyusername(userID):
    user = User.query.filter_by(userID=userID).first()
    if not user:
        return jsonify({
            "code": 404,
            "message": "No such user"
        }),404
        
    data = request.get_json()
    
    try:
        user.lastLoginTimeStamp = data["lastLoginTimeStamp"]
        db.session.commit()

    except: 
        return jsonify(
            {
                "code": 500,
                "message": "An error occurred while updating the user"
            }
        ), 500

    return jsonify(
        {
            "code": 201,
            "data": user.json(),
            "message": "user has been successfully updated!"

        }
    ), 201 
    

@api.route("/userdetails")
def getalluserdetails():
    userdetails_list = UserDetails.query.all()
    if len(userdetails_list):
        return jsonify({
            "code": 200,
            "data":{
                "user_list": [user_detail.json() for user_detail in userdetails_list]
            }
        }), 200
    return jsonify({
        "code": 404,
        "message": "There are no available user details."
    }),404
    
#Get userdetails by userid
@api.route("/userdetails/<int:userID>")
def getuserdetailsbyuserid(userID):
    userdetails = UserDetails.query.filter_by(userID=userID).first()
    if userdetails:
        return jsonify({
            "code": 200,
            "data": userdetails.json()
        }),200
    return jsonify({
        "code": 404,
        "message": "No record found"
    }),404

@api.route("/product")
def getallproduct():
    product_list = Product.query.all()
    if len(product_list):
        return jsonify({
            "code": 200,
            "data":{
                "product_list": [product.json() for product in product_list]
            }
        }), 200
    return jsonify({
        "code": 404,
        "message": "There are no available product."
    }),404
    
#Get product by productID
@api.route("/product/<int:productID>")
def getproductbyproductID(productID):
    product = Product.query.filter_by(productID=productID).first()
    if product:
        return jsonify({
            "code": 200,
            "data": product.json()
        }),200
    return jsonify({
        "code": 404,
        "message": "No record found"
    }),404

@api.route("/depositaccount")
def getalldepositaccount():
    deposit_list = DepositAccount.query.all()
    if len(deposit_list):
        return jsonify({
            "code": 200,
            "data":{
                "deposit_account_list": [deposit.json() for deposit in deposit_list]
            }
        }), 200
    return jsonify({
        "code": 404,
        "message": "There are no available deposit account."
    }),404

#Get depositAccount by depositAccountID
@api.route("/depositaccount/<string:depositAccountID>")
def getdepositaccountbydepositAccountID(depositAccountID):
    dp = DepositAccount.query.filter_by(depositAccountID=depositAccountID).first()
    if dp:
        return jsonify({
            "code": 200,
            "data": dp.json()
        }),200
    return jsonify({
        "code": 404,
        "message": "No record found"
    }),404
    
#Get depositAccount by userID
@api.route("/userdepositaccount/<int:userID>")
def getdepositaccountbyuser(userID):
    dp_list = DepositAccount.query.filter_by(userID=userID).all()
    if len(dp_list):
        return jsonify({
            "code": 200,
            "data":{
                "deposit_list": [dp.json() for dp in dp_list]
            }
        }), 200
    return jsonify({
        "code": 404,
        "message": "There are no available deposit account."
    }),404


@api.route("/loanaccount")
def getallloanaccount():
    loan_list = LoanAccount.query.all()
    if len(loan_list):
        return jsonify({
            "code": 200,
            "data":{
                "deposit_account_list": [loan.json() for loan in loan_list]
            }
        }), 200
    return jsonify({
        "code": 404,
        "message": "There are no available loan account."
    }),404
    
#Get loanAccount by loanAccountID
@api.route("/loanaccount/<string:loanAccountID>")
def getdloanaccountbydepositAccountID(loanAccountID):
    loan = LoanAccount.query.filter_by(loanAccountID=loanAccountID).first()
    if loan:
        return jsonify({
            "code": 200,
            "data": loan.json()
        }),200
    return jsonify({
        "code": 404,
        "message": "No record found"
    }),404
    
#Get loanAccount by userID
@api.route("/userloanaccount/<int:userID>")
def getloanaccountbyuser(userID):
    loan_list = LoanAccount.query.filter_by(userID=userID).all()
    if len(loan_list):
        return jsonify({
            "code": 200,
            "data":{
                "loan_list": [loan.json() for loan in loan_list]
            }
        }), 200
    return jsonify({
        "code": 404,
        "message": "There are no available loan account."
    }),404
    
@api.route("/creditcardaccount")
def getallcreditcardaccount():
    ccn_list = CreditCard.query.all()
    if len(ccn_list):
        return jsonify({
            "code": 200,
            "data":{
                "ccn_list": [cc.json() for cc in ccn_list]
            }
        }), 200
    return jsonify({
        "code": 404,
        "message": "There are no available credit card account."
    }),404
    
#Get creditcardaccount by id
@api.route("/creditcardaccount/<string:creditCardAccountID>")
def getccaccountbydepositAccountID(creditCardAccountID):
    cc = CreditCard.query.filter_by(creditCardAccountID=creditCardAccountID).first()
    if cc:
        return jsonify({
            "code": 200,
            "data": cc.json()
        }),200
    return jsonify({
        "code": 404,
        "message": "No record found"
    }),404
    
#Get ccAccount by userID
@api.route("/usercreditcardaccount/<int:userID>")
def getccaccountbyuser(userID):
    cc_list = CreditCard.query.filter_by(userID=userID).all()
    if len(cc_list):
        return jsonify({
            "code": 200,
            "data":{
                "creditcard_list": [cc.json() for cc in cc_list]
            }
        }), 200
    return jsonify({
        "code": 404,
        "message": "There are no available credit card account."
    }),404


    
@api.route("/transactiontype")
def getalltransactiontype():
    transaction_type_list = TransactionType.query.all()
    if len(transaction_type_list):
        return jsonify({
            "code": 200,
            "data":{
                "transaction_type_list": [tt.json() for tt in transaction_type_list]
            }
        }), 200
    return jsonify({
        "code": 404,
        "message": "There are no available transaction type."
    }),404
    
@api.route("/transaction")
def getalltransaction():
    transaction_list = TransactionLog.query.all()
    if len(transaction_list):
        return jsonify({
            "code": 200,
            "data":{
                "transaction_list": [t.json() for t in transaction_list]
            }
        }), 200
    return jsonify({
        "code": 404,
        "message": "There are no available transaction."
    }),404
    
@api.route("/monthlybalance")
def getallmonthlybalance():
    monthly_balance_list = MonthlyBalance.query.all()
    if len(monthly_balance_list):
        return jsonify({
            "code": 200,
            "data":{
                "monthly_balance_list": [mb.json() for mb in monthly_balance_list]
            }
        }), 200
    return jsonify({
        "code": 404,
        "message": "There are no available monthly balance."
    }),404


# @api.route('/login')
# def login():
#     # return jsonify({
#     #   "code": 500,
#     #   "message": str("1"),
#     #   "data": None
#     # }), 5
#   username = None 
#   password = None
#   print(request.args)
#   try:
#     # print(request.form)
#     if request.method == 'POST':
#       username = request.form['username']
#       password = request.form['password']
#       # return redirect(url_for('success',name = user))
#     else:
#       username = request.args.get('username')
#       password = request.args.get('password')
#       # return redirect(url_for('success',name = user))
#     print(username, password)
#     userInfo = verify_password(username, password)
#     return jsonify(userInfo), 200

#   except Exception as e:

#     return jsonify({
#       "code": 500,
#       "message": str(e),
#       "data": None
#     }), 500
