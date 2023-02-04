from flask import Flask, redirect, url_for, request, jsonify
from flask_cors import CORS
from module.accountModule import verify_password
from module.depositModule import get_view_all_deposit_accounts

app = Flask(__name__)
CORS(app)



@app.route('/success/<name>')
def success(name):
   return 'welcome %s' % name

@app.route('/login',methods = ['POST', 'GET'])
def login():
  username = None 
  password = None
  print(request.form)
  if request.method == 'POST':
    username = request.form['username']
    password = request.form['password']
      # return redirect(url_for('success',name = user))
  else:
    username = request.args.get('username')
    password = request.args.get('password')
      # return redirect(url_for('success',name = user))
  userInfo = verify_password(username, password)
  if userInfo:
    return jsonify(userInfo), 200
  return jsonify({
    "username": None
  }), 404
@app.route('/logout',methods = ['POST', 'GET'])
def logout():
  return jsonify({
    "username": None
  }), 404


@app.route('/login',methods = ['POST', 'GET'])
def view_all_deposit_accounts():
  all_deposit_account = {

  }
  return jsonify(all_deposit_account),200



if __name__ == '__main__':
   app.run(debug = True)