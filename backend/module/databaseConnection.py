import sqlalchemy as db
# from polygon import RESTClient
from config import BaseConfig


def create_engine():
    #local database
    # return db.create_engine()
    # return db.create_engine(BaseConfig.SQLALCHEMY_DATABASE_URI)
    return db.create_engine(BaseConfig.SQLALCHEMY_DATABASE_URI_LOCAL)
