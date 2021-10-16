

var lengthDimensions = {
    width: 200,
    height: 200,
    margin: {
        top: 10,
        bottom: 50,
        right: 10,
        left: 50
    }
}

var artistsDimensions = {
    width: 200,
    height: 200,
    margin: {
        top: 10,
        bottom: 50,
        right: 10,
        left: 50
    }
}

var corrDimensions = {
    width: 200,
    height: 200,
    margin: {
        top: 10,
        bottom: 50,
        right: 10,
        left: 50
    }
}

var timeDimensions = {
    width: 200,
    height: 200,
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
            .style("background-color", "white") // This is just used as a placeholder
            
var svgArtists = d3.select("#topArtists")
            .style("width", artistsDimensions.width)
            .style("height", artistsDimensions.height)
            .style("background-color", "white") // This is just used as a placeholder
            
var svgCorr = d3.select("#correlations")
            .style("width", corrDimensions.width)
            .style("height", corrDimensions.height)
            .style("background-color", "white") // This is just used as a placeholder

var svgTime = d3.select("#timeline")
            .style("width", timeDimensions.width)
            .style("height", timeDimensions.height)
            .style("background-color", "white") // This is just used as a placeholder