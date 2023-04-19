import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Data/vancouver.sqlite", echo=False)

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
        f"/api/v1.0/crime/year<br/>"
        f"/api/v1.0/crime/year/typeofcrime<br/>"
        f"/api/v1.0/neighbourhood/year<br/>"
        f"/api/v1.0/neighbourhood/year/neighbourhood<br/>"
    )

#############################################
# Query to return crime data by Sepcific Year
#############################################

@app.route("/api/v1.0/crime/<year>")
def crimeyear(year):
    #Create session link from Python to the database
    session = Session(engine)

    """Return Vancouver crime data by specific year"""
    #Query of crime dataset
    results = session.query(crime.Year, crime.Type, crime.Month, crime.Latitude, crime.Longitude).filter(crime.Year == int(year))

    session.close()

    crime_rows = [{"year": result[0], "crime_type": result[1], "crime_month": result[2], "crime_latitude" : result[3], "crime_longitude": result[4]} for result in results]

    return jsonify(crime_rows)

################################################################
# Query to return crime data by Specific Year and Type of Crime
################################################################

@app.route("/api/v1.0/crime/<year>/<typeofcrime>")
def crime_type(year, typeofcrime):
    #Create session link from Python to the database
    session = Session(engine)

    """Return Vancouver crime data from specified year and specified type of crime"""
    #Query of crime dataset
    crime_year = session.query(crime.Year, crime.Type, crime.Month, crime.Latitude, crime.Longitude).\
        filter(crime.Year == int(year))
    
    results = crime_year.filter(crime.Type == typeofcrime)

    session.close()

    crime_rows = [{"year": result[0], "crime_month": result[1], "crime_latitude" : result[2], "crime_longitude": result[3]} for result in results]

    return jsonify(crime_rows)

###############################################
# Query to return rental data by Specific Year
###############################################

@app.route("/api/v1.0/neighbourhood/<year>")
def neighbourhood(year):
    #Create session link from Python to the database
    session = Session(engine)

    """Return Vancouver rental data for specific year"""
    #Query of crime dataset
    results = session.query(rental.Year, rental.Neighbourhood, rental.PercentVacancyRate, rental.PercentAvailabilityRate, rental.AverageRentinDollars, rental.MedianRentinDollars, rental.PercentChange, rental.Units).\
    filter(rental.Year == year)

    session.close()

    rental_rows = [{"year": result[0], "neighbourhood": result[1], "vacancy_rate_percent": result[2], "availability_rate_percent" : result[3], "average_rent_dollars": result[4], "median_rent_dollars": result[5], "percent_change": result[6], "units": result[7]} for result in results]

    return jsonify(rental_rows)

###############################################################################
# Query to return rental data only by Specific Year for specific Neighbourhood
###############################################################################

@app.route("/api/v1.0/neighbourhood/<year>/<neighbourhood>")
def neighbourhood_area(year, neighbourhood):
    #Create session link from Python to the database
    session = Session(engine)

    """Return Vancouver rental data for specified year and neighbourhood"""
    #Query of crime dataset
    results = session.query(rental.Year, rental.Neighbourhood, rental.PercentVacancyRate, rental.PercentAvailabilityRate, rental.AverageRentinDollars, rental.MedianRentinDollars, rental.PercentChange, rental.Units).\
    filter(rental.Year == year).filter(rental.Neighbourhood == neighbourhood)

    session.close()

    rental_rows = [{"year": result[0], "neighbourhood": result[1], "vacancy_rate_percent": result[2], "availability_rate_percent" : result[3], "average_rent_dollars": result[4], "median_rent_dollars": result[5], "percent_change": result[6], "units": result[7]} for result in results]

    return jsonify(rental_rows)

if __name__ == '__main__':
    app.run(debug=True)

