

var lengthDimensions = {
    width: 512,
    height: 368,
    margin: {
        top: 10,
        bottom: 50,
        right: 10,
        left: 50
    }
}

var artistsDimensions = {
    width: 512,
    height: 355,
    margin: {
        top: 10,
        bottom: 50,
        right: 10,
        left: 50
    }
}

var timeDimensions = {
    width: 512,
    height: 472,
    margin: {
        top: 10,
        bottom: 50,
        right: 10,
        left: 50
    }
}

var svgLength = d3.select("#popularityLength")
            .style("width", lengthDimensions.width)
            .style("height", lengthDimensions.height)
            .style("background-color", "white")
            .append("svg:image") // Image is used as a placeholder
            .attr("xlink:href", "images/length.png")
            
var svgArtists = d3.select("#topArtists")
            .style("width", artistsDimensions.width)
            .style("height", artistsDimensions.height)
            .style("background-color", "white")
            .append("svg:image") // Image is used as a placeholder
            .attr("xlink:href", "images/artists.png")

var svgTime = d3.select("#timeline")
            .style("width", timeDimensions.width)
            .style("height", timeDimensions.height)
            .style("background-color", "white") // This is just used as a placeholder
            .append("svg:image")
            .attr("xlink:href", "images/timeline.jpg")