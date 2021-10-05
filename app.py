from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
from config import mongo_uri
from main.clean import clean
from main.scrape import scrape

app = Flask(__name__)
mongo = PyMongo(app, uri = mongo_uri)

@app.route('/')
def index():
    return render_template('index.html')

# @app.route('/scrape', methods = ["POST"])
# def data_scrape():
#     dictionary = scrape()
#     return jsonify(dictionary)

if __name__ == "__main__":
    app.run(debug=True)
