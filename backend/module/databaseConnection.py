import sqlalchemy as db


def create_engine():
    #local database
    return db.create_engine('mysql+mysqlconnector://root:@localhost:3306/monetari')

    #cloud database
    # return db.create_engine('mysql+mysqlconnector://admin:fypubs2023@database.cxfozjjso73f.us-west-2.rds.amazonaws.com:3306/monetari')