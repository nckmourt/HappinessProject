# import necessary libraries
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

import json
class Object:
    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)
#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

from flask_sqlalchemy import SQLAlchemy
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///db.sqlite"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://ezivkxcmfhmwns:ade7e62a63b37a2e37499152c4215d3ea0d7f6660a0fe9728c9a59f999b90701@ec2-52-203-98-126.compute-1.amazonaws.com:5432/d838r6r93rir05'

# app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db.sqlite"

db = SQLAlchemy(app)

# Create our database model for each year table
class Data_2015(db.Model):
    __tablename__ = 'data_2015'

    country = db.Column(db.String, primary_key=True)
    happiness_rank = db.Column(db.Float)
    happiness_score = db.Column(db.Float)
    gdp_per_capita = db.Column(db.Float)
    family = db.Column(db.Float)
    life_expectancy = db.Column(db.Float)
    freedom = db.Column(db.Float)
    generosity = db.Column(db.Float)
    government_corr = db.Column(db.Float)
    social_support = db.Column(db.Float)
    continent = db.Column(db.String)

class Data_2016(db.Model):
    __tablename__ = 'data_2016'

    country = db.Column(db.String, primary_key=True)
    happiness_rank = db.Column(db.Float)
    happiness_score = db.Column(db.Float)
    gdp_per_capita = db.Column(db.Float)
    family = db.Column(db.Float)
    life_expectancy = db.Column(db.Float)
    freedom = db.Column(db.Float)
    generosity = db.Column(db.Float)
    government_corr = db.Column(db.Float)
    social_support = db.Column(db.Float)
    continent = db.Column(db.String)
    
class Data_2017(db.Model):
    __tablename__ = 'data_2017'

    country = db.Column(db.String, primary_key=True)
    happiness_rank = db.Column(db.Float)
    happiness_score = db.Column(db.Float)
    gdp_per_capita = db.Column(db.Float)
    family = db.Column(db.Float)
    life_expectancy = db.Column(db.Float)
    freedom = db.Column(db.Float)
    generosity = db.Column(db.Float)
    government_corr = db.Column(db.Float)
    social_support = db.Column(db.Float)
    continent = db.Column(db.String)

class Data_2018(db.Model):
    __tablename__ = 'data_2018'

    country = db.Column(db.String, primary_key=True)
    happiness_rank = db.Column(db.Float)
    happiness_score = db.Column(db.Float)
    gdp_per_capita = db.Column(db.Float)
    family = db.Column(db.Float)
    life_expectancy = db.Column(db.Float)
    freedom = db.Column(db.Float)
    generosity = db.Column(db.Float)
    government_corr = db.Column(db.Float)
    social_support = db.Column(db.Float)
    continent = db.Column(db.String)

class Data_2019(db.Model):
    __tablename__ = 'data_2019'

    country = db.Column(db.String, primary_key=True)
    happiness_rank = db.Column(db.Float)
    happiness_score = db.Column(db.Float)
    gdp_per_capita = db.Column(db.Float)
    family = db.Column(db.Float)
    life_expectancy = db.Column(db.Float)
    freedom = db.Column(db.Float)
    generosity = db.Column(db.Float)
    government_corr = db.Column(db.Float)
    social_support = db.Column(db.Float)
    continent = db.Column(db.String)

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

# Query the database and send the jsonified results
@app.route("/api/year/2015")
def happy_2015():
    results = db.session.query(Data_2015.country, Data_2015.happiness_rank, Data_2015.happiness_score, \
        Data_2015.gdp_per_capita, Data_2015.family, Data_2015.life_expectancy, Data_2015.freedom, Data_2015.generosity, \
        Data_2015.government_corr, Data_2015.social_support, Data_2015.continent).all()
       
    for r in results:
        print(r)

    return jsonify(results)


@app.route("/api/year/2016")
def happy_2016():
    results = db.session.query(Data_2016.country, Data_2016.happiness_rank, Data_2016.happiness_score, \
        Data_2016.gdp_per_capita, Data_2016.family, Data_2016.life_expectancy, Data_2016.freedom, Data_2016.generosity, \
        Data_2016.government_corr, Data_2016.social_support, Data_2016.continent).all()
    
    for r in results:
        print(r)

    return jsonify(results)    


@app.route("/api/year/2017")
def happy_2017():
    results = db.session.query(Data_2017.country, Data_2017.happiness_rank, Data_2017.happiness_score, \
        Data_2017.gdp_per_capita, Data_2017.family, Data_2017.life_expectancy, Data_2017.freedom, Data_2017.generosity, \
        Data_2017.government_corr, Data_2017.social_support, Data_2017.continent).all()

    for r in results:
        print(r)

    return jsonify(results)   


@app.route("/api/year/2018")
def happy_2018():
    results = db.session.query(Data_2018.country, Data_2018.happiness_rank, Data_2018.happiness_score, \
        Data_2018.gdp_per_capita, Data_2018.family, Data_2018.life_expectancy, Data_2018.freedom, Data_2018.generosity, \
        Data_2018.government_corr, Data_2018.social_support, Data_2018.continent).all()

    for r in results:
        print(r)

    return jsonify(results)   


@app.route("/api/year/2019")
def happy_2019():
    results = db.session.query(Data_2019.country, Data_2019.happiness_rank, Data_2019.happiness_score, \
        Data_2019.gdp_per_capita, Data_2019.family, Data_2019.life_expectancy, Data_2019.freedom, Data_2019.generosity, \
        Data_2019.government_corr, Data_2019.social_support, Data_2019.continent).all()

    for r in results:
        print(r)

    return jsonify(results)               


if __name__ == "__main__":
    app.run()
