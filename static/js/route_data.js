// let scrape = () => {
//     $.ajax({
//         url: "/scrape",
//         type: "GET",
//         data: "json",
//         success: (data) => {
//             searchControl(data)
//         }
//     });
// };

let aroma = (userInput) => {
    $.ajax({
        url: "/aroma",
        type: "GET",
        data: "json",
        success: (data) => {
            json = JSON.parse(data)
            plotly_graph(json, userInput)
        }
    })
}

let appearance = (userInput) => {
    $.ajax({
        url: "/appearance",
        type: "GET",
        data: "json",
        success: (data) => {
            json = JSON.parse(data)
            plotly_graph(json, userInput)
        }
    })
}


let palate = (userInput) => {
    $.ajax({
        url: "/palate",
        type: "GET",
        data: "json",
        success: (data) => {
            json = JSON.parse(data)
            plotly_graph(json, userInput)
        }
    })
}


let taste = (userInput) => {
    $.ajax({
        url: "/taste",
        type: "GET",
        data: "json",
        success: (data) => {
            json = JSON.parse(data)
            plotly_graph(json, userInput)
        }
    })
}

let beer = (userInput) => {
    $.ajax({
        url: "/beer",
        type: "GET",
        data: "json",
        success: (data) => {
            json = JSON.parse(data)
            plotly_graph(json, userInput)
        }
    })
}

// d3.select(".my-link>a").attr("href", "https://nytimes.com").text("Now this is a link to the NYT!!");