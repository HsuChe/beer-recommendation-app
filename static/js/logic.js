let scrape = () => {
    $.ajax({
        url: "/scrape",
        type: "POST",
        data: "json",
        success: (data) => {
            plotly_graph(data)
        }
    });
};

let searchControl = () => {
    let searchTerm = d3.select("#searchInput").property("value")
    console.log(searchTerm)
};

let plotly_graph = (data) => {
    console.log(data)
};

let init = () => {
   scrape()
};

init()