genreFilter = "all"
var clickedData = null
var clickedPoints = null
let colorGenre = d3.scaleOrdinal()
                    .domain(["all", "country", "folk", "funk", "hip hop", "indie", 
                    "jazz", "latin", "pop", "punk", "r&b", "rock", "soul", "trap", "rap"])
                    .range(["#1DB954", "#EC6E3D", "#F7CFD3", "#F3E357", "#5D8F7F", "#DAF882", 
                            "#91C155", "#E57A9F", "#DC3A9A", "#F5C774", "#A6C2D0", 
                            "#EB5540", "#6399EE", "#3905EF", "#741532"])

d3.csv("data/spotify_data.csv").then(function(data) {
    // Number of both rows and columns
    var nRows = 1
    var nCols = 3 

    var dimensions = {
        width: 1350,
        height: 850,
        margin: {
            top: 30,
            bottom: 50,
            right: 10,
            left: 60
        },
        subMargin: 5
    }

    var subplotDim = {
        width: (dimensions.width - (dimensions.subMargin*2) - dimensions.margin.left) / nCols,
        height: (dimensions.height - (dimensions.subMargin) - dimensions.margin.bottom) / nRows
    }

    var svg = d3.select("#scattersub")
                .style("width", dimensions.width)
                .style("height", dimensions.height)
                .style("background", "black")

    console.log(data)
    // Three attributes to use for subplots.
    var attributes = ['Danceability', 'Acousticness', 'Energy', 'Valence', 'Liveness', 'Speechiness']
    xScales = []
    yScales = []

    // Updated version
    var xAccessor = d => parseFloat(d.Streams.replace(/,/g, ''))
    for(i = 0; i < nCols; i++) {
        xScales.push(d3.scaleLog()
                .domain(d3.extent(data, xAccessor))
                .range([dimensions.margin.left + (dimensions.subMargin*(i)) + (subplotDim.width*i), 
                    (dimensions.subMargin*i) + (subplotDim.width*(i+1))]))
    }
    // Create y scales by adding the subplot dimensions
    for(i = 0; i < nRows; i++) {
        yScales.push(d3.scaleLinear()
                .domain([0, 1])
                .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top]))
    }
    // Default to Danceability, Acousticness, Energy
    var attrScales = {
        plot1: {
            attr: "Danceability",
            x: xScales[0],
            y: yScales[0]
        },
        plot2: {
            attr: "Acousticness",
            x: xScales[1],
            y: yScales[0]
        },
        plot3: {
            attr: "Energy",
            x: xScales[2],
            y: yScales[0]
        }
    }
    // Plot x scales
    xScales.forEach(element => {
        svg.append("g")
            .call(d3.axisBottom().scale(element).tickFormat(d => d / 1000000))
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

    genres = ["All", "Country", "Folk", "Funk", "Hip Hop", "Indie", 
                "Jazz", "Latin", "Pop", "Punk", "R&B", "Rock", "Soul", "Trap", "Rap"]

    svg.append("text")
        .attr("x", dimensions.width / 2)
        .attr("y", dimensions.height - 10)
        .text("Log Scale of Streams (Millions)")
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

    var plots = ["plot1", "plot2", "plot3"]

    // Plot all circles
   plots.forEach(element => {
        var dots = svg.selectAll(element)
            .data(data)
            .enter()
            .append("circle")
            //.attr("cx", d => attrScales[element].x(+d[attrScales[element].attr]))
            //.attr("cy", d => attrScales[element].y(yAccessor(d)))
            .attr("cx", d => attrScales[element].x(xAccessor(d)))
            .attr("cy", d => attrScales[element].y(+d[attrScales[element].attr]))
            .attr("fill", colorGenre(genreFilter))
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
                        attrScales['plot1'].attr + ": " + hoverData[attrScales['plot1'].attr] + "\n" +
                        attrScales['plot2'].attr + ": " + hoverData[attrScales['plot2'].attr] + "\n" +
                        attrScales['plot3'].attr + ": " + hoverData[attrScales['plot3'].attr] + "\n" +
                        "Highest Charting Position: " + hoverData['Highest Charting Position'] + "\n"
                    )
            })
            .on("mouseout", function () {
                // Only want to reset if its not the clicked point
                if (clickedData == null || d3.select(this).attr("id") != clickedData["Song ID"]) {
                    d3.select(this)
                        .attr("fill", colorGenre(genreFilter))
                }
                // Reset to songdata of clicked point.
                if (clickedData != null) {
                    songInfo
                        .style("visibility", "visible")
                        .text(clickedData["Song Name"] + " by " + clickedData["Artist"] + "\n" +
                            attrScales['plot1'].attr + ": " + clickedData[attrScales['plot1'].attr] + "\n" +
                            attrScales['plot2'].attr + ": " + clickedData[attrScales['plot2'].attr] + "\n" +
                            attrScales['plot3'].attr + ": " + clickedData[attrScales['plot3'].attr] + "\n" +
                            "Highest Charting Position: " + clickedData['Highest Charting Position'] + "\n"
                        )
                } else songInfo.style("visibility", "hidden")

            })
            .on("click", function () {
                // Need to reset all other circles before highlighting new ones.
                svg.selectAll("circle").each(function() {
                    d3.select(this)
                        .attr("fill", colorGenre(genreFilter))
                        // Only set size back to 4 if they fit the filter.
                        .attr("r", function() { 
                                if (genreFilter == "all" || genreFilter == "all (genre)") return 4 
                                else if (d3.select(this).data()[0]['General_Genre'].includes(genreFilter)) return 4
                                else return 0
                            })
                        .style("opacity", .6)
                })
                // Create string to set ID. For some reason #id does not work.     
                var id = d3.select(this).attr("id")
                id = "[id='" + id + "']"
                
                clickedPoints = d3.selectAll(id)
                clickedPoints.transition().duration(500)
                    .attr("fill", "white")
                    .attr("r", 6)
                    .style("opacity", 1.0)
                // Store clicked data to be used in other interactions
                clickedData = d3.select(this).data()[0]
                // Reset text of song info
                songInfo.style("visibility", "visible")
                    .text(clickedData["Song Name"] + " by " + clickedData["Artist"] + "\n" +
                        attrScales['plot1'].attr + ": " + clickedData[attrScales['plot1'].attr] + "\n" +
                        attrScales['plot2'].attr + ": " + clickedData[attrScales['plot2'].attr] + "\n" +
                        attrScales['plot3'].attr + ": " + clickedData[attrScales['plot3'].attr] + "\n" +
                        "Highest Charting Position: " + clickedData['Highest Charting Position'] + "\n"
                    ) 
            })
    })

    var attrDescriptions = {"Danceability": "Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.",
        "Acousticness": "A measure from 0.0 to 1.0 of whether the track is acoustic.",
        "Energy": "Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy.",
        "Liveness": "Detects the presence of an audience in the recording.",
        "Valence": "A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).",
        "Speechiness": "Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value."
    }
    // Set textbox for attribute description
    var description = d3.select("#attrInfo")
        .append("div")
        .style("position", "absolute")
        .style("white-space", "pre-line")
        .style("fill", "white")
        .style("visibility", "hidden")
        .text("testing testing")
        .classed("tooltip", true)

    // Create dropdowns for each plot
    d3.selectAll(".attrSelect")
        .on('mouseover', function() {
            description
                .style("left", parseInt(d3.select(this).style("left")) + 130 + "px")
                .style("top", parseInt(d3.select(this).style("top")) + 20 + "px")
                .text(attrDescriptions[d3.select(this).property("value")])
                .style("visibility", "visible")
        })
        .on('mouseout', function() {
            description.style("visibility", "hidden")
        })
        .selectAll("option")
        .data(attributes)
        .enter()
        .append("option")
        .text(d => d)
        .attr("value", d => d)
    // First plot select tool
    d3.select("#attrSelect1")
        .style("left", attrScales["plot1"].x(15000000) - 20 + "px")
        .property("value", attrScales["plot1"].attr)
        .on('change', function() {
            attrScales["plot1"].attr = d3.select(this).property("value")
            svg.selectAll("circle[plot='plot1']")
                .transition().duration(1000)
                .attr("cy", d => attrScales["plot1"].y(+d[attrScales["plot1"].attr]))
        })
    // Second plot select tool
    d3.select("#attrSelect2")
        .style("left", attrScales["plot2"].x(15000000) - 20 + "px")
        .property("value", attrScales["plot2"].attr)
        .on('change', function() {
            attrScales["plot2"].attr = d3.select(this).property("value")
            svg.selectAll("circle[plot='plot2']")
                .filter(function() {
                    return d3.select(this).attr("plot") == "plot2"
                })
                .transition().duration(1000)
                .attr("cy", d => attrScales["plot2"].y(+d[attrScales["plot2"].attr]))
        })
    // Third plot select tool
    d3.select("#attrSelect3")
        .style("left", attrScales["plot3"].x(15000000) - 20 + "px")
        .property("value", attrScales["plot3"].attr)
        .on('change', function() {
            attrScales["plot3"].attr = d3.select(this).property("value")
                svg.selectAll("circle[plot='plot3']")
                .transition().duration(1000)
                .attr("cy", d => attrScales["plot3"].y(+d[attrScales["plot3"].attr]))
        })

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
                if(genreFilter == 'all') {
                    if (clickedData != null && d['Song ID'] == clickedData['Song ID']) return 6
                    else return 4
                }
                else if(d['General_Genre'].includes(genreFilter)) {
                    if (clickedData != null && d['Song ID'] == clickedData['Song ID']) return 6
                    else return 4
                }
                else return 0
            })
            .attr("fill", d => {
                if (clickedData != null && d['Song ID'] == clickedData['Song ID']) return 'white'
                else return colorGenre(genreFilter) 
            })
        
        // First deal with bar chart by resetting and editing clicked bar.
        var barSelection = "rect[genre=" + "'" + genreFilter + "']"
        clickedBar = d3.select("#barchart").select(barSelection)
            
        d3.select("#barchart")
            .selectAll("rect")
            .attr('opacity', 1)
            .attr('stroke-width', 0)

        clickedBar.attr('opacity', 0.5)
            .attr('stroke', 'white')
            .attr('stroke-width', '3')
         // Then genre node
         d3.select("#topArtists").selectAll("circle").attr("fill", "white")
        if (genreFilter == "all") {
            clickedNode.attr("fill", "white")
            link.attr("stroke-opacity", 0)
            clickedNode = null
        } else {
            var nodeSelection = "circle[name=" + "'" + genreFilter + "']"
            clickedNode = d3.select("#topArtists").select(nodeSelection)
            clickedNode.attr("fill", "#1DB954")
            colorLinks(clickedNode)
        }
    })
})

function filterGenre() {
    d3.select("#scattersub").selectAll("circle").transition().duration(1000)
        .attr("r", d => {
            if(genreFilter == 'all') {
                if (clickedData != null && d['Song ID'] == clickedData['Song ID']) return 6
                else return 4
            }
            else if(d['General_Genre'].includes(genreFilter)) {
                if (clickedData != null && d['Song ID'] == clickedData['Song ID']) return 6
                else return 4
            }
            else return 0
        })
        .attr("fill", d => {
            if (clickedData != null && d['Song ID'] == clickedData['Song ID']) return 'white'
            else return colorGenre(genreFilter) 
        })
}
