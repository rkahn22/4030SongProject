
d3.csv("spotify_data.csv").then(function(dataset){

  console.log(dataset)

    var dimensions = {
        width: 1300,
        height: 600,
        margin: {
            top: 10,
            bottom: 50,
            right: 10,
            left: 50
        }
    }

    var svg = d3.select("#barchart")
                .style("width", dimensions.width)
                .style("height", dimensions.height)

    var name = 'General_Genre'

    var genreName = Array()
//get the values
    for (var i = 0; i<dataset.length;i++){
      genreName.push(+dataset[i][name])
    }

    console.log(genreName)
//get the days...convert to weeks?

    var startDate = d => +d.Weeks_Start
    var endDate = d => +d.Weeks_End

    var diff_in_time = endDate.getTime() - startDate.getTime()
    var diff_in_days = diff_in_time/(1000*3600*24)

    var time = [...new Set(dataset.map(diff_in_days))]

    console.log(time)

//when with a category, use band
    var xScale = d3.scaleBand()
                    .domain(time)
                    .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])
                    .padding(0.2)

    var yScale = d3.scaleLinear()
                    .domain([0, d3.max(genreName)])
                    .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])

    var xAxisgen = d3.axisBottom()
                        .scale(xScale)
                        .tickFormat((interval,i) => {
                            return i%3 !== 0 ? " ": interval;})

    var yAxisgen = d3.axisLeft().scale(yScale)


    var bars = svg.selectAll("rect")
                    .data(genreName)
                    .enter()
                    .append("rect")
                    .attr("x", (d,i) => xScale(time[i]))
                    .attr("y", (d,i) => yScale(genreName[i]))
                    .attr("width", xScale.bandwidth())
                    .attr("height", d => dimensions.height - dimensions.margin.bottom - yScale(d))


      var xAxis = svg.append("g")
                      .call(xAxisgen)
                      .style("transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)
                      .selectAll("text")
                      .attr("transform", "rotate(-65)")
                      .attr("dx", "-1.85em")
                      .attr("dy", "0em")

      var yAxis = svg.append("g")
                      .call(yAxisgen)
                      .style("transform", `translateX(${dimensions.margin.left}px)`)


})
