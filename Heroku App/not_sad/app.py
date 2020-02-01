# import necessary libraries
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

from flask_sqlalchemy import SQLAlchemy
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///db.sqlite"
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')

# app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db.sqlite"

db = SQLAlchemy(app)

# Create our database model
class Happy(db.Model):
    __tablename__ = 'happy'

    country = db.Column(db.String, primary_key=True)
    happiness_rank = db.Column(db.Integer)
    happiness_score = db.Column(db.Integer)
    gdp_per_capita = db.Column(db.Integer)
    family = db.Column(db.Integer)
    life_expectancy = db.Column(db.Integer)
    freedom = db.Column(db.Integer)
    generosity = db.Column(db.Integer)
    government_corr = db.Column(db.Integer)

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

# Query the database and send the jsonified results
@app.route("/api/year/2015")
def happy_2015():

    results = db.session.query(data_2015).\
        order_by(data_2015.happiness_rank()).\
        limit(10).all()

if __name__ == "__main__":
    app.run()
