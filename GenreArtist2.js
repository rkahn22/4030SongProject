d3.json("data/top_artists.json").then(function(dataset){
    console.log(dataset)

    var width = 512
    var height = 500

    // get topArtists svg
    var svg = d3.select('#topArtists')
                .style("width", width)
                .style("height", height);

    var nodes =[
        {name: "Pop", type:"Genre"},
        {name: "Hip Hop", type:"Genre"},
        {name: "Latin", type:"Genre"},
        {name: "Rap", type:"Genre"},
        {name: "Trap", type:"Genre"},
        {name: "R&B", type:"Genre"},
        {name: "Taylor Swift", type:"Artist"},
        {name: "Justin Bieber", type:"Artist"},
        {name: "BTS", type:"Artist"},
        {name: "The Weeknd", type:"Artist"},
        {name: "Drake", type:"Artist"},
        {name: "Eminem", type:"Artist"},
        {name: "J. Cole", type:"Artist"},
        {name: "Tyler, The Creator", type:"Artist"},
        {name: "DaBaby", type:"Artist"},
        {name: "Lil Uzi Vert", type:"Artist"},
        {name: "Juice WRLD", type:"Artist"},
        {name: "Bad Bunny", type:"Artist"},
        {name: "21 Savage", type:"Artist"},
        {name: "Lil Baby", type:"Artist"},
        {name: "Rauw Alejandro", type:"Artist"},
        {name: "Joji", type:"Artist"},
        {name: "Tory Lanez", type:"Artist"},
        {name: "Mariah Carey", type:"Artist"},
        {name: "Ty Dolla $ign", type:"Artist"},
        {name: "J Balvin", type:"Artist"},
        {name: "Maluma", type:"Artist"},
        {name: "Anuel AA", type:"Artist"}
    ];

    var links = [
        {source: "Pop", target: "Taylor Swift"},
        {source: "Pop", target: "Justin Bieber"},
        {source: "Pop", target: "BTS"},
        {source: "Pop", target: "The Weeknd"},
        {source: "Pop", target: "Drake"},
        {source: "Hip Hop", target: "Eminem"},
        {source: "Hip Hop", target: "Drake"},
        {source: "Hip Hop", target: "J. Cole"},
        {source: "Hip Hop", target: "Tyler, The Creator"},
        {source: "Hip Hop", target: "DaBaby"},
        {source: "Rap", target: "Lil Uzi Vert"},
        {source: "Rap", target: "Juice WRLD"},
        {source: "Rap", target: "Bad Bunny"},
        {source: "Rap", target: "Eminem"},
        {source: "Rap", target: "Drake"},
        {source: "Trap", target: "Lil Uzi Vert"},
        {source: "Trap", target: "Bad Bunny"},
        {source: "Trap", target: "21 Savage"},
        {source: "Trap", target: "Lil Baby"},
        {source: "Trap", target: "Rauw Alejandro"},
        {source: "R&B", target: "The Weeknd"},
        {source: "R&B", target: "Joji"},
        {source: "R&B", target: "Tory Lanez"},
        {source: "R&B", target: "Mariah Carey"},
        {source: "R&B", target: "Ty Dolla $ign"},
        {source: "Latin", target: "Bad Bunny"},
        {source: "Latin", target: "J Balvin"},
        {source: "Latin", target: "Rauw Alejandro"},
        {source: "Latin", target: "Maluma"},
        {source: "Latin", target: "Anuel AA"}
    ];

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.name).distance(200))
      .force("collisions", d3.forceCollide(5))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("forcex", d3.forceX(d => d.type == "Genre" ? 200 : 600))
      .on('tick', ticked);

    const link = svg.append("g")
      .attr("stroke", "darkgrey")
      .attr("stroke-opacity", 1)
        .selectAll("line")
        .data(links)
        .join("line")
      //.attr("stroke-width", d => Math.sqrt(d.value));


    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
      .attr("r", 8)
      .attr("cx", d=>d.x)
       .attr("cy", d=>d.y);

    node.append("title")
      .text(d => d.name);

    const text = svg.append("g")
                .selectAll("text")
                .data(nodes)
                .join("text")
                    .attr("dx", 12)
                    .attr("dy", ".35em")
                    .text(function(d) { return d.name });


    
    function ticked(){
        // take all the circles
        svg.selectAll("circle")
            .attr("cx", d=>d.x) // change x pos 
            .attr("cy", d=>d.y) // change y pos
    
        // update all lines
        svg.selectAll("line")
        .attr("x1", d=>d.source.x)
        .attr("y1", d=>d.source.y)
        .attr("x2", d=>d.target.x)
        .attr("y2", d=>d.target.y)

        svg.selectAll("text")
            .attr("x", d => d.x)
            .attr("y", d => d.y);
    }
})