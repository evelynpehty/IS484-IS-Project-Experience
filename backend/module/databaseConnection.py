import sqlalchemy as db
from polygon import RESTClient
 


def create_engine():
    #local database
    return db.create_engine('mysql+mysqlconnector://root:@localhost:3306/monetari')
