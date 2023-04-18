import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///../Data/vancouver.sqlite", echo=False)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# # Save reference to the table
crime = Base.classes.crime
rental = Base.classes.rental

# #################################################
# Flask Setup
# #################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/year<br/>"
        f"/api/v1.0/crime_type<br/>"
        f"/api/v1.0/neighbourhood<br/>"
    )

###################################################################
# Query to return yearly data from the crime and rental datasets
##################################################################

@app.route("/api/v1.0/year")
def year():
    #Create session link from Python to the database
    session = Session(engine)

    """Return Vancouver crime and rental data from 2010-2017"""
    #Query of crime and rental dataset
    results = session.query(crime.Year, crime.Type, crime.Month, crime.Latitude, crime.Longitude, rental.Year, rental.Neighbourhood, rental.PercentVacancyRate, rental.PercentAvailabilityRate, rental.AverageRentinDollars, rental.MedianRentinDollars, rental.PercentChange, rental.Units)

    session.close()

    crime_rows = [{"year": result[0], "crime_type": result[1], "crime_month": result[2], "crime_latitude" : result[3], "crime_longitude": result[4]} for result in results]
    rental_rows = [{"year": result[5], "neighbourhood": result[6], "vacancy_rate_percent": result[7], "availability_rate_percent" : result[8], "average_rent_dollars": result[9], "median_rent_dollars": result[10], "percent_change": result[11], "units": result[12]} for result in results]

    return jsonify(crime_rows, rental_rows)

####################################
# Query to return crime data only
###################################

@app.route("/api/v1.0/crime_type")
def crime_type():
    #Create session link from Python to the database
    session = Session(engine)

    """Return Vancouver crime data from 2010-2017"""
    #Query of crime dataset
    results = session.query(crime.YEAR, crime.TYPE, crime.MONTH, crime.Latitude, crime.Longitude)

    session.close()

    crime_rows = [{"year": result[0], "crime_type": result[1], "crime_month": result[2], "crime_latitude" : result[3], "crime_longitude": result[4]} for result in results]


    return jsonify(crime_rows)

####################################
# Query to return rental data only
###################################

@app.route("/api/v1.0/neighbourhood")
def neighbourhood():
    #Create session link from Python to the database
    session = Session(engine)

    """Return Vancouver rental data from 2010-2017"""
    #Query of crime dataset
    results = session.query(rental.Year, rental.Neighbourhood, rental.PercentVacancyRate, rental.PercentAvailabilityRate, rental.AverageRentinDollars, rental.MedianRentinDollars, rental.PercentChange, rental.Units)

    session.close()

    rental_rows = [{"year": result[5], "neighbourhood": result[6], "vacancy_rate_percent": result[7], "availability_rate_percent" : result[8], "average_rent_dollars": result[9], "median_rent_dollars": result[10], "percent_change": result[11], "units": result[12]} for result in results]

    return jsonify(rental_rows)


if __name__ == '__main__':
    app.run(debug=True)

