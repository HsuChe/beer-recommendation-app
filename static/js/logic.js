let searchControl = (data) => {
    let searchTerm = d3.select("#searchInput").property("value")
    // let searchTerm = 'aroma'
    console.log(searchTerm)
    if (searchTerm == 'aroma') {
        aroma(searchTerm)
    } else if (searchTerm == 'appearance'){
        appearance(searchTerm)
    } else if (searchTerm == 'palate'){
        palate(searchTerm)
    } else if (searchTerm == "taste") {
        taste(searchTerm)
    } else {
        beer(searchTerm)
    }
};

let plotly_graph = (data, userInput) => {
    
    console.log(typeof(data))
    console.log()
    dasboardUpdate(data)
    bar_graph(data, userInput)
    pie_graph(data, userInput)
    over_view(data, userInput)
};

let bar_graph = (data, userInput) => {
    beerNames = Object.keys(data['review_count']).slice(0,10)
    reviewCount = Object.values(data[`review_${userInput}`]).slice(0,10)
    let trace1 = {
        x: beerNames,
        y: reviewCount,
        name: "Beer Count",
        type: "bar",
        marker:{
            color: ['rgba(204,204,204,0.99)', 'rgba(222,45,38,0.9)', 'rgba(255,99,71,0.8)', 'rgba(255,99,71,0.7)', 'rgba(255,99,71,0.6)','rgba(255,99,71,0.5)','rgba(255,99,71,0.4)','rgba(255,99,71,0.3)','rgba(255,99,71,0.2)','rgba(255,99,71,1)']
          }
    };

    let trace_data = [trace1]
    let layout_bar = {
        title: "Highest Beer Reviews"
    };
    Plotly.newPlot("myAreaChart", trace_data, layout_bar );
    console.log("plotly pinged")
};

let pie_graph = (data, userInput) => {
    beerNames = Object.keys(data['review_count']).slice(0,5)
    reviewCount = Object.values(data['review_count']).slice(0,5)
    let trace2 = {
        type: "pie",
        values: reviewCount,
        labels:beerNames,
        showlegend: false,
        marker:{
            color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)', 'rgba(255,99,71,0.4)', 'rgba(255,99,71,0.2)', 'rgba(255,99,71,1)']
          }
      };
      
    let data_pie = [trace2];
    
    let layout_pie = {
    title: "Review Count Contribution",
    };
    
    Plotly.newPlot('myPieChart', data_pie, layout_pie);
    console.log('plotly pinged')
}

let over_view = (data, userInput) => {
    let aromaReview = Object.values(data['review_aroma'])[0]
    let appearanceReview = Object.values(data['review_appearance'])[0]
    let palateReview = Object.values(data['review_palate'])[0]
    let tasteReview = Object.values(data['review_taste'])[0]

    let data_chart = [{
        type: 'bar',
        x: [aromaReview,appearanceReview,palateReview,tasteReview],
        y: ['Aroma', 'Appearance', 'Palate', 'Taste'],
        orientation: 'h',
        marker:{
            color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)', 'rgba(255,99,71,0.4)', 'rgba(255,99,71,0.2)', 'rgba(255,99,71,1)']
          }
      }];

    let layout_summary = {
        title: `Summary for ${Object.keys(data['review_count'])[0]}`,
    };
      Plotly.newPlot('summaryChart', data_chart, layout_summary);
}

let dasboardUpdate = (data) => {
    d3.select('#beerMostRating').text(`${Object.keys(data['Beer_name'])[0]}`)
    d3.select('#beerRatingAvg').text(`${Math.round(Object.values(data['review_overall'])[0],4)}/5`)
    d3.select('#totalReviews').text(`${Object.values(data['review_count'])[0]}`)
    let numerator = Object.values(data['review_overall'])[0]
    let denominator = Object.values(data['review_count']).slice(0,5).reduce(function (a, b) {return a + b;}, 0)
    let percent = numerator/denominator * 10000
    d3.select('#ratingCont').text(`${Math.round(percent, 2)}%`)
};