var clickedBar

d3.csv("data/datawithdatesandgenrecorrect.csv").then(function(dataset){

  //console.log(dataset)

  var dimensions = {
      width: 600,
      height: 450,
      margin: {
          top: 10,
          bottom: 100,
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
    //console.log(genreName)

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
    const highestPositionData = [countryPosAvg, folkPosAvg, funkPosAvg, hiphopPosAvg, indiePosAvg, jazzPosAvg, latinPosAvg, popPosAvg, punkPosAvg, rbPosAvg, rockPosAvg, soulPosAvg]
    const timesChartedData = [countryTimesCharted, folkTimesCharted, funkTimesCharted, hiphopTimesCharted, indieTimesCharted, jazzTimesCharted, latinTimesCharted, popTimesCharted, punkTimesCharted, rbTimesCharted, rockTimesCharted, soulTimesCharted]


var xScale = d3.scaleBand()
    .domain(genresChart)
    .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])
    .padding(0.2)

var yScale = d3.scaleLinear()
    .domain([0, d3.max(timesChartedData)])
    .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])

var xAxisgen = d3.axisBottom()
        .scale(xScale)

var yAxisgen = d3.axisLeft().scale(yScale)

var g = svg.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");
//spearmint, fuchsia, citric, white, black, other colors
var color = ["#e75e2b", "#bc2be7", "#56e72b", "#4b917d", "#914b5f", "#82914b", "#3748f0", "#f037a5", "#cdf564", "#5a4b91", "#f56484", "#8c64f5"]

var nameSelected = timesChartedData
var yAxisLabel = 'Average # of times in top charts'


var bars = svg.selectAll("rect")
    .data(timesChartedData)
    .enter()
    .append("rect")
    .attr("x", (d,i) => xScale(genresChart[i]))
    .attr("y", (d,i) => yScale(timesChartedData[i]))
    .attr("width", xScale.bandwidth())
    .attr("height", d => dimensions.height - dimensions.margin.bottom - yScale(d))
    .attr("fill", function(d, i){
        return color[i%12]
    })
    .attr("genre", (d, i) => genresChart[i])
    .on('mouseenter', function(actual,i){
        d3.select(this).attr('opacity', 0.5)
        //.attr('width', xScale.bandwidth()+7)
        .attr('stroke', 'white')
        .attr('stroke-width', '3')
    })
    .on('mouseleave', function(actual,i){
        d3.select(this).attr('opacity', 1)
        //.attr('width', xScale.bandwidth())
        .attr('stroke-width', '0')
        
        if (clickedBar != null) {
            clickedBar.attr('opacity', .5)
                .attr('stroke', 'white')
                .attr('stroke-width', '3')
        }
    })
    .on('click', function() {
        // reset all rects before highlighting clicked
        svg.selectAll('rect')
            .attr('opacity', 1)
            .attr('stroke-width', 0)
        
        clickedBar = d3.select(this)
        genreFilter = clickedBar.attr("genre")
        var selection = "circle[name=" + "'" + genreFilter + "']"

        clickedBar.attr('opacity', .5)
            .attr('stroke', 'white')
            .attr('stroke-width', '3')
        
        // edit scatter plots
        d3.select("#scattersub")
            .selectAll("circle").transition().duration(1000)
              .attr("r", d => {
                  if(genreFilter == 'all')
                      return 4
                  else if(d['General_Genre'].includes(genreFilter))
                      return 4
                  else return 0
              })
        // and its filter
        d3.select("#genres").property("value", genreFilter)
        // Then genre node and links
        d3.select("#topArtists").selectAll("circle").attr("fill", "white")
        clickedNode = d3.select("#topArtists").select(selection)
        clickedNode.attr("fill", "#1DB954")
        link.attr("stroke-opacity", 0);
        colorLinks(clickedNode)
    })
    
var editText = svg.selectAll("rect")    
    .append("title")
    .text(function(d,i){
        return "Avg # of times charted is " +nameSelected[i];
    })


    //.attr("fill", "white")
    
        

var xAxis = svg.append("g")
      .call(xAxisgen)
      .style("transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)
      .selectAll("text")
      .attr("transform", "rotate(-65)")
      .attr("dx", "-1.85em")
      .attr("dy", "0em")
      .attr("fill", "white")
    //   .style("stroke", "white")
      .style("font-size", 15)

var xAxisTitle = svg.append('text')
      .attr('x', dimensions.width / 2 + dimensions.margin.bottom -100)
      .attr('y', dimensions.height-20)
      .attr('text-anchor', 'center')
      .text('General Genres')
      .attr("fill", "white")
    //   .style("stroke", "white")
      .attr("font-family", "Helvetica")

var yAxis = svg.append("g")
      .call(yAxisgen)
      .style("transform", `translateX(${dimensions.margin.left}px)`)
      .style("stroke", "white")
      .style("font-size", 15)

var yAxisTitle = svg.append('text')
      .attr('x', -dimensions.margin.left-50)
      .attr('y', -dimensions.margin.top+22)
      .attr('text-anchor', 'end')
      .attr('transform', 'rotate(-90)')
      .text(yAxisLabel)  
      .attr("fill", "white")
    //   .style("stroke", "white")  
      .attr("font-family", "Helvetica")  
      




// var LabelXAxis = svg.append('text')
//       .call(yAxisgen)
//       .attr('x', -(dimensions.height / 2) - dimensions.margin)
//       .attr('y', dimensions.margin / 2.4)
//       .attr('transform', 'rotate(-90)')
//       .attr('text-anchor', 'middle')
//       .text('Love meter (%)')

// svg.append('text')
//     .call(xAxisgen)
//       .attr('x', dimensions.width / 2 + dimensions.margin)
//       .attr('y', 40)
//       .attr('text-anchor', 'middle')
//       .text('Most loved programming languages in 2018')





    //times charted data
d3.select("#timescharted").on('click', function(){
    yAxisLabel = 'Average # of times in top charts'
    nameSelected = timesChartedData
    yScale
        .domain([0, d3.max(timesChartedData)])
    yAxisgen.scale(yScale)
    yAxis.transition().duration(5000)
    .call(yAxisgen)
    
    bars.transition().duration(5000)
        .attr("y", (d,i) => yScale(timesChartedData[i]))
        .attr("height", (d,i) => dimensions.height - dimensions.margin.bottom - yScale(timesChartedData[i]))
        

    editText
        .text(function(d,i){
            return "Avg # of times charted is " +nameSelected[i];
        })
    })

    //back to highest position - want average to be small (1 means #1 in chart)
d3.select("#highestpos").on('click', function(){

        yAxisLabel = 'Avg highest position in top charts'
        console.log()
        nameSelected = highestPositionData
        yScale
            .domain([d3.max(highestPositionData)+10, 0])
        yAxisgen.scale(yScale)
        yAxis.transition().duration(5000)
            .call(yAxisgen)
        yAxisTitle
            .text('Avg highest position of songs in top charts')

    
    bars.transition().duration(5000)
        .attr("y", (d,i) => yScale(highestPositionData[i]))
        .attr("height", (d, i) => dimensions.height - dimensions.margin.bottom - yScale(highestPositionData[i]))

    editText
        .text(function(d,i){
            return "Avg highest pos is " +nameSelected[i];
        })
    


    
    })
    // var ascendingHighestPositionValues = highestPositionData.sort(function(a,b){return a-b})
    // var ascendingHighestPositionGenre = ["folk", "punk", "latin", "pop", "r&b", "indie", "hip hop", "rock", "soul", "jazz", "country", "funk"]
//     //greatest to least
// var descendingHighestPositionValues = highestPositionData.sort(function(a,b){return b-a})
// // console.log(newDescendingOrder)
// var descendingHighestPositionGenre = ["funk", "country", "jazz", "soul", "rock", "hip hop", "indie", "r&b", "pop", "latin", "punk", "folk"]
// // //least to greatest


// var descendingTimesChartedValues = timesChartedData.sort(function(a,b){return b-a})


// var ascendingTimesChartedValues = timesChartedData.sort(function(a,b){return a-b})

    var allGroup = ['Select One','Ascending', 'Descending']

    d3.select("#selectButton")
        .selectAll('myOptions')
        .data(allGroup)
        .enter()
        .append('option')
        .text(function(d) {return d;})
        .attr("value", function(d) {return d;})
        // if (nameSelected = highestPositionData){
        //     if (d = allGroup[1]){
        //         var ascendingHighestPositionValues = highestPositionData.sort(function(a,b){return a-b})
        //         var ascendingHighestPositionGenre = ["folk", "punk", "latin", "pop", "r&b", "indie", "hip hop", "rock", "soul", "jazz", "country", "funk"]
        //         svg.selectAll("rect")
        //         xScale
        //             .domain(ascendingHighestPositionGenre)
        //         bars.transition().duration(5000)
        //             .attr("x", (d,i) => xScale(ascendingHighestPositionValues[i]))
        //             //.attr("height", (d,i) => dimensions.height - dimensions.margin.bottom - yScale(timesChartedData[i]))
                
        //     }
        // }
        //     else{

        //     }

        // }
        // else{

        // }





 })

