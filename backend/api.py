from flask import Blueprint, request, jsonify
from models import db

api = Blueprint('api', __name__)