d3.csv("data/spotify_data.csv").then(function(data) {
    // Number of both rows and columns
    var nRows = 2
    var nCols = 3 

    var dimensions = {
        width: 800,
        height: 610,
        margin: {
            top: 10,
            bottom: 50,
            right: 10,
            left: 60
        },
        subMargin: 10
    }

    var subplotDim = {
        width: (dimensions.width - (4*dimensions.subMargin) - dimensions.margin.left) / nCols,
        height: (dimensions.height - (3*dimensions.subMargin) - dimensions.margin.bottom) / nRows
    }

    var svg = d3.select("#correlations")
                .style("width", dimensions.width)
                .style("height", dimensions.height)

    console.log(data)

    var attributes = ['Danceability', 'Acousticness', 'Energy', 
                        'Speechiness', 'Liveness', 'Valence']

    console.log(attributes)

    xScales = []
    yScales = []

    var yAccessor = d => parseFloat(d.Streams.replace(/,/g, ''))
    // Create x scales by adding the subplot dimensions
    for(i = 0; i < nCols; i++) {
        xScales.push(d3.scaleLinear()
                        .domain([0, 1])
                        .range([dimensions.margin.left + (dimensions.subMargin*(i+1)) + (subplotDim.width*i), 
                            dimensions.margin.left + (dimensions.subMargin*i) + (subplotDim.width*(i+1))]))
    }
    // Create y scales by adding the subplot dimensions
    for(i = 0; i < nRows; i++) {
        yScales.push(d3.scaleLinear()
                        .domain([0, 600])
                        .range([(dimensions.subMargin*i) + (subplotDim.height*(i+1)), 
                            (dimensions.subMargin*(i+1)) + (subplotDim.height*i)]))
    }

    var attrScales = {
        Danceability: {
            x: xScales[0],
            y: yScales[0]
        },
        Acousticness: {
            x: xScales[1],
            y: yScales[0]
        },
        Energy: {
            x: xScales[2],
            y: yScales[0]
        },
        Speechiness: {
            x: xScales[0],
            y: yScales[1]
        },
        Liveness: {
            x: xScales[1],
            y: yScales[1]
        },
        Valence: {
            x: xScales[2],
            y: yScales[1]
        }
    }

    var bins = {}
    // Create a mapping of the binned data for each attribute
    attributes.forEach(element => {
        var histogram = d3.histogram()
                            .value(function(d) { return d[element] })
                            .domain(attrScales[element].x.domain())
                            .thresholds(attrScales[element].x.ticks(30))
        
        bins[element] = histogram(data)
    })
    // Plot x scales
    xScales.forEach(element => {
        svg.append("g")
            .call(d3.axisBottom().scale(element))
            .style("transform", `translateY(${dimensions.height-dimensions.margin.bottom}px)`)
            .style("stroke", "gray")
    })
    // Plot y scales
    yScales.forEach(element => {
        svg.append("g")
            .call(d3.axisLeft().scale(element))
            .style("transform", `translateX(${dimensions.margin.left}px)`)
            .style("stroke", "gray")
    })

    var color = d3.scaleOrdinal(d3.schemeCategory10)
                    .domain(attributes)
                    
    // Gets the correct height for the bar.
    function getHeight(subplotHeight, barHeight) {
        // If using subplotHeight results in a negative, we assume this subplot is on the next row.
        if (subplotHeight + dimensions.subMargin - barHeight > 0) return subplotHeight - barHeight
        else return (subplotHeight * 2) + dimensions.subMargin - barHeight
    }
    // Plot all bars
    attributes.forEach(element => {
        svg.selectAll(element)
            .data(bins[element])
            .enter()
            .append("rect")
            .attr("x", 1)
            .attr("transform", d => "translate(" + attrScales[element].x(d.x0) + "," + attrScales[element].y(d.length) + ")")
            .attr("width", d => attrScales[element].x(d.x1) - attrScales[element].x(d.x0) - 1)
            .attr("height", d=> getHeight(subplotDim.height, attrScales[element].y(d.length)))
            .style("fill", color(element))
    })

    attributes.forEach(element => {
        svg.append("text")
            .attr("x", attrScales[element].x(.35))
            .attr("y", attrScales[element].y(550))
            .text(element)
            .style("fill", "black")
            .style("font-family", "Verdana")
        }
    )}

   /*attributes.forEach(element => {
        svg.selectAll(element)
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => attrScales[element].x(+d[element]))
            .attr("cy", d => attrScales[element].y(yAccessor(d)))
            .attr("fill", color(element))
            .attr("id", element)
            .attr("r", 2)
    })*/

)