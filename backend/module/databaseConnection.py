import sqlalchemy as db
# from polygon import RESTClient
from config import BaseConfig
import json

def create_engine():
    #local database
    # return db.create_engine()
    # return db.create_engine(BaseConfig.SQLALCHEMY_DATABASE_URI)
    return db.create_engine(BaseConfig.SQLALCHEMY_DATABASE_URI)


# for the custom quick function/button based on the user demand (personalized function)
def get_SELF_CUSTOMIZATION():
    with open('.\\module\\DataStore\\SELF_CUSTOMIZATION.json', 'r') as openfile:
        json_object = json.load(openfile)
        return dict(json_object)
    return {}

def update_SELF_CUSTOMIZATION(jsonFile):
    with open(".\\module\\DataStore\\SELF_CUSTOMIZATION.json", "w") as outfile:
        json.dump(jsonFile, outfile)

    
def get_Manage_Account_Details():
    with open('.\\module\\SELF_CUSTOMIZATION.json', 'r') as openfile:
        json_object = json.load(openfile)
        return dict(json_object)
    return {}
