"""
appserver.py
- creates an application instance and runs the dev server
"""

if __name__ == '__main__':
  from module.securitiesModule import update_market_data_for_recent_90_days_data
  update_market_data_for_recent_90_days_data()
  
  from application import create_app
  app = create_app()
  app.run(host='0.0.0.0', debug = True)
  
