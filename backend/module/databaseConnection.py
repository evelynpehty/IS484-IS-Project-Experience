import sqlalchemy as db


def create_engine():
    return db.create_engine('mysql+mysqlconnector://root:@localhost:3306/monetari')