d3.csv("data/datawithdatesandgenrecorrect.csv").then(function(dataset){

  console.log(dataset)

  var dimensions = {
      width: 600,
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
    var highestPosition = 'Highest Charting Position'
    var timesCharted = 'Number of Times Charted'
    var genreName = Array()

    var country = Array()
    var countryHighestPosition = Array()
    var countryTimesCharted = Array()
    var folk = Array()
    var folkHighestPosition = Array()
    var folkTimesCharted = Array()
    var funk = Array()
    var funkHighestPosition = Array()
    var funkTimesCharted = Array()
    var hiphop = Array()
    var hiphopHighestPosition = Array()
    var hiphopTimesCharted = Array()
    var indie = Array()
    var indieHighestPosition = Array()
    var indieTimesCharted = Array()
    var jazz = Array()
    var jazzHighestPosition = Array()
    var jazzTimesCharted = Array()
    var latin = Array()
    var latinHighestPosition = Array()
    var latinTimesCharted = Array()
    var pop = Array()
    var popHighestPosition = Array()
    var popTimesCharted = Array()
    var punk = Array()
    var punkHighestPosition = Array()
    var punkTimesCharted = Array()
    var rb = Array()
    var rbHighestPosition = Array()
    var rbTimesCharted = Array()
    var rap = Array()
    var rapHighestPosition = Array()
    var rapTimesCharted = Array()
    var rock = Array()
    var rockHighestPosition = Array()
    var rockTimesCharted = Array()
    var soul = Array()
    var soulHighestPosition = Array()
    var soulTimesCharted = Array()


    for (var i = 0; i<dataset.length;i++){
        genreName.push(dataset[i][name])
    }
    console.log(genreName)

          //get the values
    for (var i = 0; i<dataset.length;i++){
        if (genreName[i] == 'country'){
            country.push(dataset[i][name])
            countryHighestPosition.push(+dataset[i][highestPosition])
            countryTimesCharted.push(+dataset[i][timesCharted])
        }
        else if (dataset[i][name] == 'folk'){
            folk.push(+dataset[i][name])
            folkHighestPosition.push(+dataset[i][highestPosition])
            folkTimesCharted.push(+dataset[i][timesCharted])
        }
        else if (dataset[i][name] == 'funk'){
            funk.push(dataset[i][name])
            funkHighestPosition.push(+dataset[i][highestPosition])
            funkTimesCharted.push(+dataset[i][timesCharted])
        }
        else if (dataset[i][name] == 'hip hop'){
            hiphop.push(dataset[i][name])
            hiphopHighestPosition.push(+dataset[i][highestPosition])
            hiphopTimesCharted.push(+dataset[i][timesCharted])
        }
        if (dataset[i][name] == 'indie'){
            indie.push(dataset[i][name])
            indieHighestPosition.push(+dataset[i][highestPosition])
            indieTimesCharted.push(+dataset[i][timesCharted])
        }
        if (dataset[i][name] == 'jazz'){
            jazz.push(dataset[i][name])
            jazzHighestPosition.push(+dataset[i][highestPosition])
            jazzTimesCharted.push(+dataset[i][timesCharted])
        }
        if (dataset[i][name] == 'latin'){
            latin.push(dataset[i][name])
            latinHighestPosition.push(+dataset[i][highestPosition])
            latinTimesCharted.push(+dataset[i][timesCharted])
        }
        if (dataset[i][name] == 'pop'){
            pop.push(dataset[i][name])
            popHighestPosition.push(+dataset[i][highestPosition])
            popTimesCharted.push(+dataset[i][timesCharted])
        }
        if (dataset[i][name] == 'punk'){
            punk.push(dataset[i][name])
            punkHighestPosition.push(+dataset[i][highestPosition])
            punkTimesCharted.push(+dataset[i][timesCharted])
        }
        if (dataset[i][name] == 'r&b'){
            rb.push(dataset[i][name])
            rbHighestPosition.push(+dataset[i][highestPosition])
            rbTimesCharted.push(+dataset[i][timesCharted])
        }
        if (dataset[i][name] == 'rap'){
            rap.push(dataset[i][name])
            rapHighestPosition.push(+dataset[i][highestPosition])
            rapTimesCharted.push(+dataset[i][timesCharted])
        }
        if (dataset[i][name] == 'rock'){
            rock.push(dataset[i][name])
            rockHighestPosition.push(+dataset[i][highestPosition])
            rockTimesCharted.push(+dataset[i][timesCharted])
        }
        if (dataset[i][name] == 'soul'){
            soul.push(dataset[i][name])
            soulHighestPosition.push(+dataset[i][highestPosition])
            soulTimesCharted.push(+dataset[i][timesCharted])
        }

    }

    var totalHighestPos = 0
    var totalTimesCharted = 0

    for (var i = 0; i < country.length; i++){
        totalHighestPos = totalHighestPos + countryHighestPosition[i]
        totalTimesCharted = totalTimesCharted + countryTimesCharted[i]
    }

    var countryPosAvg = totalHighestPos/country.length
    var countryTimesCharted = totalTimesCharted/country.length

    totalHighestPos = 0
    totalTimesCharted = 0

    for (var i = 0; i < folk.length; i++){
        totalHighestPos = totalHighestPos + folkHighestPosition[i]
        totalTimesCharted = totalTimesCharted + folkTimesCharted[i]
    }

    var folkPosAvg = totalHighestPos/folk.length
    var folkTimesCharted = totalTimesCharted/folk.length

    totalHighestPos = 0
    totalTimesCharted = 0


    for (var i = 0; i < funk.length; i++){
        totalHighestPos = totalHighestPos + funkHighestPosition[i]
        totalTimesCharted = totalTimesCharted + funkTimesCharted[i]
    }

    var funkPosAvg = totalHighestPos/funk.length
    var funkTimesCharted = totalTimesCharted/funk.length

    totalHighestPos = 0
    totalTimesCharted = 0

    for (var i = 0; i < hiphop.length; i++){
        totalHighestPos = totalHighestPos + hiphopHighestPosition[i]
        totalTimesCharted = totalTimesCharted + hiphopTimesCharted[i]
    }

    var hiphopPosAvg = totalHighestPos/hiphop.length
    var hiphopTimesCharted = totalTimesCharted/hiphop.length

    totalHighestPos = 0
    totalTimesCharted = 0

    for (var i = 0; i < indie.length; i++){
        totalHighestPos = totalHighestPos + indieHighestPosition[i]
        totalTimesCharted = totalTimesCharted + indieTimesCharted[i]
    }

    var indiePosAvg = totalHighestPos/indie.length
    var indieTimesCharted = totalTimesCharted/indie.length

    totalHighestPos = 0
    totalTimesCharted = 0

    for (var i = 0; i < jazz.length; i++){
        totalHighestPos = totalHighestPos + jazzHighestPosition[i]
        totalTimesCharted = totalTimesCharted + jazzTimesCharted[i]
    }

    var jazzPosAvg = totalHighestPos/jazz.length
    var jazzTimesCharted = totalTimesCharted/jazz.length

    totalHighestPos = 0
    totalTimesCharted = 0

    for (var i = 0; i < latin.length; i++){
        totalHighestPos = totalHighestPos + latinHighestPosition[i]
        totalTimesCharted = totalTimesCharted + latinTimesCharted[i]
    }

    var latinPosAvg = totalHighestPos/latin.length
    var latinTimesCharted = totalTimesCharted/latin.length

    totalHighestPos = 0
    totalTimesCharted = 0

    for (var i = 0; i < pop.length; i++){
        totalHighestPos = totalHighestPos + popHighestPosition[i]
        totalTimesCharted = totalTimesCharted + popTimesCharted[i]
    }

    var popPosAvg = totalHighestPos/pop.length
    var popTimesCharted = totalTimesCharted/pop.length

    totalHighestPos = 0
    totalTimesCharted = 0

    for (var i = 0; i < punk.length; i++){
        totalHighestPos = totalHighestPos + punkHighestPosition[i]
        totalTimesCharted = totalTimesCharted + punkTimesCharted[i]
    }

    var punkPosAvg = totalHighestPos/punk.length
    var punkTimesCharted = totalTimesCharted/punk.length

    totalHighestPos = 0
    totalTimesCharted = 0

    for (var i = 0; i < rb.length; i++){
        totalHighestPos = totalHighestPos + rbHighestPosition[i]
        totalTimesCharted = totalTimesCharted + rbTimesCharted[i]
    }

    var rbPosAvg = totalHighestPos/rb.length
    var rbTimesCharted = totalTimesCharted/rb.length

    totalHighestPos = 0
    totalTimesCharted = 0

    for (var i = 0; i < rap.length; i++){
        totalHighestPos = totalHighestPos + rapHighestPosition[i]
        totalTimesCharted = totalTimesCharted + rapTimesCharted[i]
    }

    var rapPosAvg = totalHighestPos/rap.length
    var rapTimesCharted = totalTimesCharted/rap.length

    totalHighestPos = 0
    totalTimesCharted = 0

    for (var i = 0; i < rock.length; i++){
        totalHighestPos = totalHighestPos + rockHighestPosition[i]
        totalTimesCharted = totalTimesCharted + rockTimesCharted[i]
    }

    var rockPosAvg = totalHighestPos/rock.length
    var rockTimesCharted = totalTimesCharted/rock.length

    totalHighestPos = 0
    totalTimesCharted = 0

    for (var i = 0; i < soul.length; i++){
        totalHighestPos = totalHighestPos + soulHighestPosition[i]
        totalTimesCharted = totalTimesCharted + soulTimesCharted[i]
    }

    var soulPosAvg = totalHighestPos/soul.length
    var soulTimesCharted = totalTimesCharted/soul.length



    const genresChart = ["country", "folk", "funk", "hip hop", "indie", "jazz", "latin", "pop", "punk", "r&b", "rock", "soul"]
    const num = [1,2,3,4,5,6,7,8,9,10,11,12]
    const highestPositionData = [countryPosAvg, folkPosAvg, funkPosAvg, hiphopPosAvg, indiePosAvg, jazzPosAvg, latinPosAvg, popPosAvg, punkPosAvg, rbPosAvg, rockPosAvg, soulPosAvg]
    const timesChartedData = [countryTimesCharted, folkTimesCharted, funkTimesCharted, hiphopTimesCharted, indieTimesCharted, jazzTimesCharted, latinTimesCharted, popTimesCharted, punkTimesCharted, rbTimesCharted, rockTimesCharted, soulTimesCharted]

    console.log(genresChart)
    console.log(highestPositionData)
    console.log(timesChartedData)


var xScale = d3.scaleBand()
    .domain(genresChart)
    .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])
    .padding(0.2)

var yScale = d3.scaleLinear()
    .domain([0, d3.max(highestPositionData)])
    .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])

var xAxisgen = d3.axisBottom()
        .scale(xScale)
        // .tickFormat((interval,i) => {
        //     return i%3 !== 0 ? " ": interval;})

var yAxisgen = d3.axisLeft().scale(yScale)


var bars = svg.selectAll("rect")
    .data(highestPositionData)
    .enter()
    .append("rect")
    .attr("x", (d,i) => xScale(genresChart[i]))
    .attr("y", (d,i) => yScale(highestPositionData[i]))
    .attr("width", xScale.bandwidth())
    .attr("height", d => dimensions.height - dimensions.margin.bottom - yScale(d))
    .attr("fill", "white")


var xAxis = svg.append("g")
      .call(xAxisgen)
      .style("transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)
      .selectAll("text")
      .attr("transform", "rotate(-65)")
      .attr("dx", "-1.85em")
      .attr("dy", "0em")
      .style("stroke", "white")
      .attr("font-size", 15)

var yAxis = svg.append("g")
      .call(yAxisgen)
      .style("transform", `translateX(${dimensions.margin.left}px)`)
      .style("stroke", "white")
      .attr("font-size", 15)



    d3.select("#Start").on('click', function(){
        xScale
            .domain(d3.extent(dataset, xAccessorNew)) //want to use temp not cloud cover anymore, modify xScale to have new domain which is defined as xAccessorNew
        
        xAxisgen.scale(xScale)

        xAxis.transition().duration(5000)
        .call(xAxisgen)

        dots.transition().duration(5000) //5 seconds
            .attr("cx", d => xScale(xAccessorNew(d)))
    })

    d3.select("#Reset").on('click', function(){
        xScale
            .domain(d3.extent(dataset, xAccessor))
        
        xAxisgen.scale(xScale)

        xAxis.transtion().duration(5000)
            .call(xAxisgen)

        dots.transition().duration(5000)
            .attr("cx", d => xScale(xAccessor(d)))
            .attr("r", 8)
    })

    // const arrAvg = diff_in_weeks => diff_in_weeks.reduce((a,b) => a + b, 0) / diff_in_weeks.length
    // console.log(arrAvg)

    // console.log(countryWeeksStart)
    // console.log(countryWeeksEnd)

    // console.log(country)
    // console.log(folk)
    // console.log(funk)
    // console.log(hiphop)
    // console.log(indie)
    // console.log(jazz)
    // console.log(latin)
    // console.log(pop)
    // console.log(punk)
    // console.log(rb)
    // console.log(rap)
    // console.log(rock)
    // console.log(soul)

// var xScale = d3.scaleLinear()
//     .domain([0, d3.max(genresWeeksChart)])
//     .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])
    

// var yScale = d3.scaleBand()
//     .domain(genresChart)
//     .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])
//     .padding(0.2)

// svg.append("g")
//     .call(d3.axisLeft(yScale))

// var yAxisgen = d3.axisLeft()
//         .scale(xScale)
//         //.tickFormat((interval,i) => {interval;})

// var xAxisgen = d3.axisBottom().scale(yScale)


// var bars = svg.selectAll("rect")
//     .data(genresWeeksChart)
//     .enter()
//     .append("rect")
//     .attr("x", (d,i) => xScale(genresWeeksChart[i]))
//     .attr("y", (d,i) => yScale(genresChart[i]))
//     .attr("width", d => dimensions.width - dimensions.margin.right - xScale(d))
//     .attr("height", yScale.bandwidth())
//     .attr("fill", "#69b3a2")


// var xAxis = svg.append("g")
//     .call(xAxisgen)
//     .style("transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)

// var yAxis = svg.append("g")
//     .call(yAxisgen)
//     .style("transform", `translateX(${dimensions.margin.left- dimensions.margin.right}px)`)
//     .selectAll("text")
//     //.attr("transform", "rotate(-65)")
//     .attr("dx", "-1.85em")
//     .attr("dy", "0em")

//     d3.select("#Start").on('click', function(){
//         xScale
//             .domain(d3.extent(dataset, xAccessorNew)) //want to use temp not cloud cover anymore, modify xScale to have new domain which is defined as xAccessorNew
        
//         xAxisgen.scale(xScale)

//         xAxis.transition().duration(5000)
//         .call(xAxisgen)

//         dots.transition().duration(5000) //5 seconds
//             .attr("cx", d => xScale(xAccessorNew(d)))
//     })

//     d3.select("#Reset").on('click', function(){
//         xScale
//             .domain(d3.extent(dataset, xAccessor))
        
//         xAxisgen.scale(xScale)

//         xAxis.transtion().duration(5000)
//             .call(xAxisgen)

//         dots.transition().duration(5000)
//             .attr("cx", d => xScale(xAccessor(d)))
//             .attr("r", 8)
//     })


 })

