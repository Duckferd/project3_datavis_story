# Project 3: Telling a story through Data Visualization

## The Vancity Neighbourhood Tool
A web based tool for the Vancouver, BC area that helps newcomers looking to settle in the city to determine average rental prices and crime in specific neighbourhoods. The tool will consist of a dashboard that will interactively update maps and statistics as the user makes dropdown selections and moves the map around.

## Introduction
The creation of this dashboard tool was intended to help newcomers and long-term visitors to the city of Vancouver who are looking for a place to settle or for a longer term stay. These are people who would be interested in understanding average rental and vacancy rates around the city, with a picture of crime in the area. 

Example scenario: A couple moving to Vancouver who wants to settle within the Downtown area. They want to determine rental price, and specific types of crimes they are worried about in that area; as well as historical information related to crime over the years and rent inflation.

## Usage
- Run index.html. This will take information from the flask API backend (hosted on AWS) and output the data onto the dashboard. 
- Use the dropdowns to select various combinations of years and crime types to get a picture of the city. 
    - For annual crime distribution, click on specific categories to remove from the pie chart for a better picture of the crime types you are interested in
    - Scroll around the Vancouver heat map to get a wide view of areas with the most crime, and zoom in to specific locations to see specific incidents
    - The Most Affordable Neighbourhood chart will show some basic information on the selected year, sorted by median rent

## Appendix Table of Contents
- Datasets
- GitHub Main
- Team Members/Contributors
- Acknowledgements
- License

## Datasets
- [Crime in Vancouver dataset from Kaggle](https://www.kaggle.com/datasets/wosaku/crime-in-vancouver)
    - Provides comprehensive stats on criminal incidents in Vancouver from 2005-2017
    - Due to rental dataset restrictions, only data from 2010-2017 is used in this tool
- [Vancouver primary rental housing dataset from CMHC (Canadian Mortgage and Housing Corporation)](https://www03.cmhc-schl.gc.ca/hmip-pimh/en/TableMapChart/Table?TableId=2.1.31.3&GeographyId=2410&GeographyTypeId=3&DisplayAs=Table&GeograghyName=Vancouver)
    - Provides comprehensive stats on rental pricing and availability of primary housing in Vancouver from 2010 to 2023

## GitHub Main 
- Data
    - Contains Raw, Cleaned, and SQL folders. These represent the steps taken formatting the data sources and inputting into a final vancouver.sqlite database. The SQL folder also contains the ERD parameters used in creating the SQL tables used.
- Images
    - Used for storing the ERD as well as Dashboard napkin sketch concepts
- Static
    - .CSS, .HTML and .JS scripts required to make the Javascript frontend run
- app.py
    - Script required to make the Python Flask backend run. 
- Proposal.md
    - Initial project proposal 4/11/23. Subject to change for final report.
- Index.html
    - Main dashboard frontend to interact with

## Team Members
- Zac Corbett
- Lynn Hoang
- Sameer Zubairi
- Christopher Yang 

## Acknowledgements
We would like to thank the University of Toronto for putting together a robust program for Data Analytics, and my fellow classmates as well as the wonderful Instructors and LAs at the University of Toronto for their support.

Some additional resources utilized to complete this project include:
- [This blog post by Diane Phan on Twilio](https://www.twilio.com/blog/deploy-flask-python-app-aws) explaining how to use a Flask App on AWS
- ChatGPT was used to explain how to use the CORS_flask wrapper to enable cross origin requests in the flask backend API.

## License
This is licensed under the MIT licensing scheme. Please see separate License File for information.