from bson.objectid import ObjectId
from flask import Flask, json, render_template, Response, make_response, jsonify
from flask_pymongo import PyMongo
from main.config import mongo_uri
from bson.json_util import dumps



app = Flask(__name__)
mongo = PyMongo(app, uri = mongo_uri)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/aroma', methods = ["GET","POST"])
def data_aroma():
    aroma = mongo.db.feature_tables.find()[0]
    # return json_response(aroma, cls=MongoJsonEncoder)
    return jsonify(dumps(aroma))

@app.route('/appearance', methods = ["GET","POST"])
def data_appearance():
    appearance = mongo.db.feature_tables.find()[1]
    return jsonify(dumps(appearance))
    
@app.route('/palate', methods = ["GET","POST"])
def palate():
    palate = mongo.db.feature_tables.find()[2]
    return jsonify(dumps(palate))

@app.route('/taste', methods = ["GET","POST"])
def taste():
    taste = mongo.db.feature_tables.find()[3]
    return jsonify(dumps(taste))

@app.route('/beer', methods = ["GET","POST"])
def beer():
    # beer = mongo.db.beer_table.find_one()
    beer = mongo.db.beer_table.find_one()
    return jsonify(dumps(beer))

if __name__ == "__main__":
    app.run(debug=True)
