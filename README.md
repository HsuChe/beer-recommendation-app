<h3 align="center">Beer Recommendation App</h3>


<p align="center">
     Using flask, d3, python, and mongodb to generate the best beers based on the features from the dataset offered by Beer Advocate
    <br />
    <a href=https://github.com/HsuChe/beer-recommendation-app><strong>Project Github URL »</strong></a>
    <br />
    <br />
  </p>
</p>


<!-- ABOUT THE PROJECT -->

## About The Project

![hero image](images/hero_image.jpg)

Beer flaors are incredibly complex its subjective nature often makes it difficult to quantify. People's preference in beer can vary drastically so we decided to isolate specific characteristics of beer flavor and aggregate reviews to infer the best beers for each characteristics.

Reviews alone is not enough to produce an accurate picture of the performance of the beer. So we also took into account the total number of reviews a beer has as well as the quality of review that it is. 

## Visualization Goals

1. Coming up with an intuitive interface to isolate the variables that we want to do analysis for.
2. Take into account the quality and quantity of reviews for each beer.
3. Create a dashboard to show recommendation quickly

## Cleaning the data and readying it for Mongo DB

<br>
<a href = "https://query.data.world/s/iop5arbr5e2bjlimw5cwvsfhqzeawz"><strong>Link to Dataset</strong></a>

The Dataset was collected by Beer Advocate Website where they aggregate beer reviews from various internet sources and consoladated it into usable data.

We will be importing the data into our jupyter notebook and begin the process of cleaning the data and getting it ready to be pushed to Mongo DB for analysis.


```sh
df_raw = pd.read_csv('https://query.data.world/s/iop5arbr5e2bjlimw5cwvsfhqzeawz')
```

Next we will keep the columns we wish to analyze and remove the rest.

```sh
    df = df_raw[[ 'review_overall',
       'review_aroma', 'review_appearance', 'review_profilename', 'beer_style',
       'review_palate', 'review_taste', 'beer_name',
       'beer_beerid']]
    })
```
We can now group the data using DataFrame.groupby() method to aggregate information for each unique beer name and beer ID. We want specifically the average value of each review and the total count for overall review

```sh
beer_table = df_raw.groupby(['beer_name', 'beer_beerid']).mean()[['brewery_id','review_overall',	'review_aroma',	'review_appearance',	'review_palate',	'review_taste']]
beer_count = df_raw.groupby(['beer_name', 'beer_beerid']).count()['review_overall']
beer_table['review_count'] = beer_count
```
With Beer table formed, we can begin sorting the performance of the beer based on specific features.

```sh
    aroma_table = beer_df.sort_values(by=['review_aroma', 'review_count'], ascending = [False,False]).head(10000).set_index('beer_name')
    appearance_table = beer_df.sort_values(by=['review_appearance', 'review_count'], ascending = [False,False]).head(10000).set_index('beer_name')
    palate_table = beer_df.sort_values(by=['review_palate', 'review_count'], ascending = [False,False]).head(10000).set_index('beer_name')
    taste_table = beer_df.sort_values(by=['review_taste', 'review_count'], ascending = [False,False]).head(10000).set_index('beer_name')
```
Next we will be pushing the various tables to mongo DB, first we import the necessary dependencies.

```sh 
    from pymongo import MongoClient
    from config import mongo_uri

    collection = MongoClient(mongo_uri).beer_db.feature_tables
collection.insert_many([aroma_table.to_dict(), appearance_table.to_dict(), palate_table.to_dict(), taste_table.to_dict()])
```

Now that the various feature tables are in mongo DB, we can begin building the flask app using the database. 

## Constructing the Flask Application

After pushing the necessary information to Mongo DB, we can begin the construction of the Flask App. First we will import all the necessary dependencies.

```sh
    from bson.objectid import ObjectId
    from flask import Flask, json, render_template, Response, make_response, jsonify
    from flask_pymongo import PyMongo
    from main.config import mongo_uri
    from bson.json_util import dumps
    import json
```
bson will be used to remove the ObjectID formed by Mongo DB in the response so the response can be rendered by json encoders.

The various function of flask methods and classes will be used to render the visualizations.

We will now create the 