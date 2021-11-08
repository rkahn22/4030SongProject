d3.csv("data/spotify_data.csv").then(function(data) {
    // Number of both rows and columns
    var nRows = 3
    var nCols = 1 

    var dimensions = {
        width: 900,
        height: 660,
        margin: {
            top: 10,
            bottom: 50,
            right: 10,
            left: 60
        },
        subMargin: 20
    }

    var subplotDim = {
        width: (dimensions.width - (dimensions.subMargin) - dimensions.margin.left) / nCols,
        height: (dimensions.height - (3*dimensions.subMargin) - dimensions.margin.bottom) / nRows
    }

    var svg = d3.select("#scattersub")
                .style("width", dimensions.width)
                .style("height", dimensions.height)
                .style("background", "black")

    console.log(data)
    // Three attributes to use for subplots.
    var attributes = ['Danceability', 'Acousticness', 'Energy']
    xScales = []
    yScales = []

    var xAccessor = d => parseFloat(d.Streams.replace(/,/g, ''))
    // Create x scales by adding the subplot dimensions
    for(i = 0; i < nCols; i++) {
        xScales.push(d3.scaleLog()
                        .domain(d3.extent(data, xAccessor))
                        .range([dimensions.margin.left, dimensions.width - dimensions.margin.right]))
    }
    // Create y scales by adding the subplot dimensions
    for(i = 0; i < nRows; i++) {
        yScales.push(d3.scaleLinear()
                        .domain([0, 1])
                        .range([(dimensions.subMargin*i) + (subplotDim.height*(i+1)), 
                            (dimensions.subMargin*(i+1)) + (subplotDim.height*i)]))
    }

    var attrScales = {
        Danceability: {
            x: xScales[0],
            y: yScales[0]
        },
        Acousticness: {
            x: xScales[0],
            y: yScales[1]
        },
        Energy: {
            x: xScales[0],
            y: yScales[2]
        }
    }
    // Plot x scales
    xScales.forEach(element => {
        svg.append("g")
            .call(d3.axisBottom().scale(element))
            .style("transform", `translateY(${dimensions.height-dimensions.margin.bottom}px)`)
            .style("stroke", "white")
        .select(".domain")
            .attr("stroke", "white")
    })
    // Plot y scales
    yScales.forEach(element => {
        svg.append("g")
            .call(d3.axisLeft().scale(element))
            .style("transform", `translateX(${dimensions.margin.left}px)`)
            .style("stroke", "white")
        .select(".domain")
            .attr("stroke", "white")
    })

    var color = d3.scaleOrdinal(d3.schemeCategory10)
                    .domain(attributes)

    // Create hidden text box for attribute descriptions
    var attributeInfo = d3.select("#scatterplots")
                            .append("div")
                            .style("position", "absolute")
                            .style("visibility", "hidden")
                            .style("white-space", "pre-line")
                            .classed("tooltip", true)
    
    var attrDescriptions = {"Danceability": "Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.",
        "Acousticness": "A measure from 0.0 to 1.0 of whether the track is acoustic.",
        "Energy": "Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy."
    }

    // Set all x-axis labels
    attributes.forEach(element => {
        svg.append("text")
            .attr("x", dimensions.width / 2)
            .attr("y", attrScales[element].y(1.0))
            .text(element)
            .style("fill", "white")
            .style("font-family", "Verdana")
            .style("text-anchor", "middle")
            .style("font-weight", "bold")
            .on('mouseover', function() {
                attributeInfo.style("visibility", "visible")
                            .style("left", parseInt(d3.select(this).attr("x")) + 200 + "px")
                            .style("top", parseInt(d3.select(this).attr("y")) - 30 + "px")
                            .text(attrDescriptions[d3.select(this).text()])
            })
            .on('mouseout', function() {
                attributeInfo.style("visibility", "hidden")
            })
    })

    // Set x-axis label
    svg.append("text")
        .attr("x", dimensions.width / 2)
        .attr("y", dimensions.height - 10)
        .text("Streams (Millions)")
        .style("fill", "white")
        .style("font-family", "Verdana")
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        
    // Set textbox for song info in corner.
    var songInfo = d3.select("#songInfo")
                    .append("div")
                    .style("position", "absolute")
                    .style("visibility", "hidden")
                    .style("white-space", "pre-line")
                    .classed("tooltip", true)

    var clickedData = null
    var genreFilter = "all"

    // Plot all circles
   attributes.forEach(element => {
        var dots = svg.selectAll(element)
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => attrScales[element].x(xAccessor(d)))
            .attr("cy", d => attrScales[element].y(+d[element]))
            .attr("fill", color(element))
            .attr("id", d => d['Song ID'])
            .attr("plot", element)
            .attr("r", 4)
            .style("opacity", .6)
            .on('mouseover', function() {
                d3.select(this)
                    .attr("fill", "white")
                
                var hoverData = d3.select(this).data()[0]
                // Update song info to point being hovered over
                songInfo
                    .style("visibility", "visible")
                    .text(hoverData["Song Name"] + " by " + hoverData["Artist"] + "\n" +
                        "Danceability: " + hoverData['Danceability'] + "\n" +
                        "Acousticness " + hoverData['Acousticness'] + "\n" + 
                        "Energy: " + hoverData['Energy'] + "\n" +
                        "Streams: " + hoverData['Streams'] + "\n" +
                        "Highest Charting Position: " + hoverData['Highest Charting Position'] + "\n"
                    )
            })
            .on("mouseout", function () {
                // Only want to reset if its not the clicked point, AKA the r size is 6.
                if (d3.select(this).attr("r") != 6) {
                    d3.select(this)
                        .attr("fill", color(d3.select(this).attr("plot")))
                }
                // Reset to songdata of clicked point.
                if (clickedData != null) {
                    songInfo
                        .style("visibility", "visible")
                        .text(clickedData["Song Name"] + " by " + clickedData["Artist"] + "\n" +
                            "Danceability: " + clickedData['Danceability'] + "\n" +
                            "Acousticness " + clickedData['Acousticness'] + "\n" + 
                            "Energy: " + clickedData['Energy'] + "\n" +
                            "Streams: " + clickedData['Streams'] + "\n" +
                            "Highest Charting Position: " + clickedData['Highest Charting Position'] + "\n"
                        )
                } else songInfo.style("visibility", "hidden")

            })
            .on("click", function () {
                // Need to reset all other circles before highlighting new ones.

                svg.selectAll("circle").each(function() {
                    d3.select(this)
                        .attr("fill", color(d3.select(this).attr("plot")))
                        // Only set size back to 4 if they fit the filter.
                        .attr("r", function() { 
                                if (genreFilter == "all") return 4 
                                else if (d3.select(this).data()[0]['General_Genre'].includes(genreFilter)) return 4
                                else return 0
                            })
                        .style("opacity", .6)
                })
                // Create string to set ID. For some reason #id does not work.     
                var id = d3.select(this).attr("id")
                id = "[id='" + id + "']"
                
                var clickedPoints = d3.selectAll(id).transition().duration(500)
                    .attr("fill", "white")
                    .attr("r", 6)
                    .style("opacity", 1.0)
                // Store clicked data to be used in other interactions
                clickedData = d3.select(this).data()[0]
                // Reset text of song info
                songInfo.style("visibility", "visible")
                        .text(clickedData["Song Name"] + " by " + clickedData["Artist"] + "\n" +
                        "Danceability: " + clickedData['Danceability'] + "\n" +
                        "Acousticness " + clickedData['Acousticness'] + "\n" + 
                        "Energy: " + clickedData['Energy'] + "\n" +
                        "Streams: " + clickedData['Streams'] + "\n" +
                        "Highest Charting Position: " + clickedData['Highest Charting Position'] + "\n"
                    )
                
            })
    })

    genres = ["All", "Country", "Folk", "Funk", "Hip Hop", "Indie", 
                "Jazz", "Latin", "Pop", "Punk", "R&B", "Rock", "Soul"]
    // Create genre options in dropdown select
    d3.select("#genres").selectAll("option")
        .data(genres)
        .enter()
        .append("option")
        .text(d => d)
        .attr("value", d => d.toLowerCase())

    // Update when select is changed.
    d3.select("#genres").on('change', function() {
        genreFilter = d3.select(this).property("value")
        // Shrink all points not in filter to 0
        svg.selectAll("circle").transition().duration(1000)
            .attr("r", d => {
                if(genreFilter == 'all')
                    return 4
                else if(d['General_Genre'].includes(genreFilter))
                    return 4
                else return 0
            })
    })
})
