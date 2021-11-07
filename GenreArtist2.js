d3.json("data/top_artists.json").then(function(dataset){
    console.log(dataset)

    var width = 700
    var height = 900

    // get topArtists svg
    var svg = d3.select('#topArtists')
                .style("width", width)
                .style("height", height);

    var nodes =[
        {name: "Pop", type:"Genre", value:819},
        {name: "Hip Hop", type:"Genre", value:356},
        {name: "Latin", type:"Genre", value:194},
        {name: "Rap", type:"Genre", value:654},
        {name: "Trap", type:"Genre", value:346},
        {name: "R&B", type:"Genre", value:75},
        {name: "Taylor Swift", type:"Artist", value:52},
        {name: "Justin Bieber", type:"Artist", value:32},
        {name: "BTS", type:"Artist", value:29},
        {name: "The Weeknd", type:"Artist", value:21},
        {name: "Drake", type:"Artist", value:19},
        {name: "Eminem", type:"Artist", value:22},
        {name: "J. Cole", type:"Artist", value:16},
        {name: "Tyler, The Creator", type:"Artist", value:14},
        {name: "DaBaby", type:"Artist", value:14},
        {name: "Lil Uzi Vert", type:"Artist", value:32},
        {name: "Juice WRLD", type:"Artist", value:30},
        {name: "Bad Bunny", type:"Artist", value:28},
        {name: "21 Savage", type:"Artist", value:12},
        {name: "Lil Baby", type:"Artist", value:10},
        {name: "Rauw Alejandro", type:"Artist", value:6},
        {name: "Joji", type:"Artist", value:8},
        {name: "Tory Lanez", type:"Artist", value:3},
        {name: "Mariah Carey", type:"Artist", value:2},
        {name: "Ty Dolla $ign", type:"Artist", value:2},
        {name: "J Balvin", type:"Artist", value:9},
        {name: "Maluma", type:"Artist", value:6},
        {name: "Anuel AA", type:"Artist", value:5}
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
      .force("forcex", d3.forceX(d => d.type == "Genre" ? 300 : 700))
      .force("collisions", d3.forceCollide(50))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on('tick', ticked);

    const link = svg.append("g")
      .attr("stroke", 'darkgrey')
      .attr("stroke-opacity", 3)
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
      .attr("r", function(d){
        if (d.type == 'Genre')
          return (d.value / 10)
        else
          return (d.value / 2)
      })
      .attr("cx", d=>d.x)
       .attr("cy", d=>d.y);
       

    node
        .on('mouseover', function(d){
          d3.select(this) // work on this specific node
              //.attr('stroke-width', 2)
              .attr("fill", '#1DB954');
          
          
          // if you select a Genre node
          if (d3.select(this)._groups[0][0].__data__.type == "Genre"){
            genre = d3.select(this)._groups[0][0].__data__.name;
            
            
            var connected = links.filter(function(e){
              return e.source.name == genre
            })

            var targets = connected.map(function(z){
              return z.target.name
            })
            
            
            node.attr("fill", function(d){
              if (targets.includes(d.name) || d.name == genre)
                return '#1DB954'
              else
                return 'black'
            })
            
            link
            .style("stroke", link_d => link_d.source.name == genre ? '#1DB954' : 'darkgrey')
            .style('stroke-width', function (link_d) { return link_d.source.name === genre ? 2 : 1;})
            
          }
          else{
            artist = d3.select(this)._groups[0][0].__data__.name;

            var connected = links.filter(function(e){
              return e.target.name == artist
            })

            var sources = connected.map(function(z){
              return z.source.name
            })
            
            
            node.attr("fill", function(d){
              if (sources.includes(d.name) || d.name == artist)
                return '#1DB954'
              else
                return 'black'
            })

            link
              .style("stroke", link_d => link_d.target.name == artist ? '#1DB954' : 'darkgrey')
              .style('stroke-width', function (link_d) { return link_d.target.name === artist ? 2 : 1;});

          }
      
        })
        .on('click', function(){
          d3.select(this)
              .attr("fill", '#1DB954');
        })
        .on('mouseout', function(){
          node.attr("fill", "black");
          link
            .style('stroke', 'darkgrey')
            .style('stroke-width', 1);
        }); 

    node.append("title")
      .text(d => d.name);

    const text = svg.append("g")
                .selectAll("text")
                .data(nodes)
                .join("text")
                    .attr("dx", 12)
                    .attr("dy", ".35em")
                    .attr("font-size", d=> d.type == 'Genre' ? 20: 12)
                    .attr("font-family", "Verdana")
                    .attr("text-anchor", d=> d.type == 'Genre' ? 'end': 'start')
                    .text(function(d) { return d.name });

    
    
    function ticked(){
        // take all the circles
        svg.selectAll("circle")
            .attr("cx", d => d.type == "Genre" ? 300 : 500) // change x pos 
            .attr("cy", d=>d.y) // change y pos
  
        // update all lines
        svg.selectAll("line")
        .attr("x1", 300)
        .attr("y1", d=>d.source.y)
        .attr("x2", 500)
        .attr("y2", d=>d.target.y)

        svg.selectAll("text")
            .attr("x", d => d.type == "Genre" ? 200 : 520)
            .attr("y", d => d.y);
    }
})