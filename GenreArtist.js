d3.json("data/top_artists.json").then(function(dataset){
    console.log(dataset)

    var width = 900
    var height = 900
    var padding = 1.5, // separation between same-color nodes
        clusterPadding = 6, // separation between different-color nodes
        maxRadius = 8;

    var n = 28, // total number of nodes
        m = 2; // number of distinct clusters

    

    // get topArtists svg
    var svg = d3.select('#topArtists')
                .style("width", width)
                .style("height", height)
                .style("background-color", 'black');

    var nodes =[
        {name: "Pop", type:"Genre", value:819},
        {name: "Hip Hop", type:"Genre", value:356},
        {name: "Latin", type:"Genre", value:194},
        {name: "Rap", type:"Genre", value:654},
        {name: "Trap", type:"Genre", value:346},
        {name: "R&B", type:"Genre", value:75},
        {name: "Country", type:"Genre", value:14},
        {name: "Folk", type:"Genre", value:7},
        {name: "Funk", type:"Genre", value:19},
        {name: "Indie", type:"Genre", value:38},
        {name: "Jazz", type:"Genre", value:15},
        {name: "Punk", type:"Genre", value:2},
        {name: "Soul", type:"Genre", value:14},
        {name: "Rock", type:"Genre", value:74},
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
        {name: "Anuel AA", type:"Artist", value:5},
        {name: "Maneskin", type:"Artist", value:4},
        {name: "Halsey", type:"Artist", value:4},
        {name: "Conan Gray", type:"Artist", value:2},
        {name: "Arctic Monkeys", type:"Artist", value:2},
        {name: "G-Eazy", type:"Artist", value:2},
        {name: "Jamie Miller", type:"Artist", value:1},
        {name: "John Legend", type:"Artist", value:1},
        {name: "Pink Sweat$", type:"Artist", value:1},
        {name: "Anitta", type:"Artist", value:2},
        {name: "Niack", type:"Artist", value:2},
        {name: "MC Zaquin", type:"Artist", value:1},
        {name: "Clean Bandit", type:"Artist", value:1},
        {name: "Lexa", type:"Artist", value:1},
        {name: "Morgan Wallen", type:"Artist", value:7},
        {name: "Walker Hayes", type:"Artist", value:1},
        {name: "Kane Brown", type:"Artist", value:1},
        {name: "Brett Eldredge", type:"Artist", value:1},
        {name: "Eagles", type:"Artist", value:1},
        {name: "Surf Curse", type:"Artist", value:1},
        {name: "The Pogues", type:"Artist", value:1},
        {name: "Vance Joy", type:"Artist", value:1},
        {name: "Big Red Machine", type:"Artist", value:1},
        {name: "John Lennon", type:"Artist", value:1},
        {name: "Burl Ives", type:"Artist", value:1},
        {name: "Michael Buble", type:"Artist", value:3},
        {name: "Dean Martin", type:"Artist", value:3},
        {name: "Brenda Lee", type:"Artist", value:1},
        {name: "Andy Williams", type:"Artist", value:1},
        {name: "Nat King Cole", type:"Artist", value:2},
        {name: "Maroon 5", type:"Artist", value:5},
        {name: "Twenty One Pilots", type:"Artist", value:5},
        {name: "Imagine Dragons", type:"Artist", value:4},
        {name: "Queen", type:"Artist", value:3}
        
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
        {source: "Latin", target: "Anuel AA"},
        {source: "Rock", target: "Maroon 5"},
        {source: "Rock", target: "Twenty One Pilots"},
        {source: "Rock", target: "Maneskin"},
        {source: "Rock", target: "Imagine Dragons"},
        {source: "Rock", target: "Queen"},
        {source: "Indie", target: "Maneskin"},
        {source: "Indie", target: "Halsey"},
        {source: "Indie", target: "Conan Gray"},
        {source: "Indie", target: "Arctic Monkeys"},
        {source: "Indie", target: "G-Eazy"},
        {source: "Soul", target: "Ty Dolla $ign"},
        {source: "Soul", target: "The Weeknd"},
        {source: "Soul", target: "Jamie Miller"},
        {source: "Soul", target: "John Legend"},
        {source: "Soul", target: "Pink Sweat$"},
        {source: "Funk", target: "Anitta"},
        {source: "Funk", target: "Niack"},
        {source: "Funk", target: "MC Zaquin"},
        {source: "Funk", target: "Clean Bandit"},
        {source: "Funk", target: "Lexa"},
        {source: "Country", target: "Morgan Wallen"},
        {source: "Country", target: "Walker Hayes"},
        {source: "Country", target: "Kane Brown"},
        {source: "Country", target: "Brett Eldredge"},
        {source: "Country", target: "Eagles"},
        {source: "Punk", target: "Surf Curse"},
        {source: "Punk", target: "The Pogues"},
        {source: "Folk", target: "Vance Joy"},
        {source: "Folk", target: "Big Red Machine"},
        {source: "Folk", target: "John Lennon"},
        {source: "Folk", target: "Burl Ives"},
        {source: "Folk", target: "The Pogues"},
        {source: "Jazz", target: "Michael Buble"},
        {source: "Jazz", target: "Dean Martin"},
        {source: "Jazz", target: "Brenda Lee"},
        {source: "Jazz", target: "Andy Williams"},
        {source: "Jazz", target: "Nat King Cole"}
    ];


    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.name).distance(500))
      .force("collisions", d3.forceCollide(d => d.type == "Genre" ? ((d.value / 8)+17) : (d.value / 2)+17))
      .force("forceY", d3.forceY(d => d.type == "Genre" ? 200 : 700))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on('tick', ticked);

    const link = svg.append("g")
      .attr("stroke", '#1DB954')
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-opacity", d => d.source.name == "Pop" ? 1 : 0);

    console.log(link)

    var popLinks = links.filter(function(e){
      return e.source.name == "Pop"
    })

    var popArtists = popLinks.map(function(z){
      return z.target.name
    })

    const node = svg.append("g")
      .attr("stroke", "white")
      .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
      .attr("r", function(d){
        if (d.type == 'Genre')
          return ((d.value / 8)+5)
        else
          return ((d.value / 2)+3)
      })
      .attr("cx", d=>d.x)
       .attr("cy", d=>d.y)
       .attr("fill", function(d){
        if (popArtists.includes(d.name) || d.name == "Pop")
          return '#1DB954'
        else
          return 'white'
      })
      
       
    node.append("title")
       .text(d => d.name);
 
    const text = svg.append("g")
                .selectAll("text")
                .data(nodes)
                .join("text")
                .attr("dx", 0)
                .attr("dy", d => d.type == "Genre" ? -1*(d.value/8)-10 : (d.value/2)+15)
                .attr("font-size", d=> d.type == 'Genre' ? 16: 12)
                .attr("font-family", "Helvetica")
                .attr("font-weight", "bold")
                .attr("fill", "white")
                .attr("opacity", function(d){
                  if (popArtists.includes(d.name) || d.type == "Genre")
                    return 1
                  else
                    return 0
                })
                .text(function(d) { return d.name });

    var clickedNode

    node
        .on('mouseover', function(d){
          d3.select(this) // work on this specific node
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
                return 'white'
            })

            link.attr("stroke-opacity", function(d){
              if (connected.includes(d))
                return 1
              else
                return 0
            })

            

            text.attr("opacity", function(d){
              if (targets.includes(d.name) || d.type=="Genre"){
                return 1
              }
              else return 0;
            })

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
                return 'white'
            })
            .attr("opacity", function(d){
              if (artist == d.name || d.type=="Genre"){
                return 1
              }
              else return 0;
            })
            

            link.attr("stroke-opacity", function(d){
              if (connected.includes(d))
                return 1
              else
                return 0
            })

            text.attr("opacity", function(d){
              if (artist == d.name || d.type == "Genre"){
                return 1
              }
              else return 0;
            })
              

          }
      
        })
        .on('click', function(){
          node.attr("clicked", false)
          clickedNode = d3.select(this)
          clickedNode.classed("clicked", true)
          clickedNode.attr("fill", '#1DB954');
          // If genre node, apply filter.
          if (clickedNode.data()[0]['type'] == "Genre") {
            genreFilter = clickedNode.data()[0]['name'].toLowerCase()
            
            d3.select("#scattersub")
            .selectAll("circle").transition().duration(1000)
              .attr("r", d => {
                  if(genreFilter == 'all')
                      return 4
                  else if(d['General_Genre'].includes(genreFilter))
                      return 4
                  else return 0
              })
          }
        })
        .on('mouseout', function(){
            node.attr("fill", "white")
                .attr("opacity", 1);
            link.attr("stroke-opacity", 0);
            text.attr("opacity", function(d){
              if (d.type == 'Artist') return 0
            });
            /*if (d3.select(this).classed("clicked") == true) {
              d3.select(this).attr("fill", '#1DB954')
            }*/
        }); 

    
    function ticked(){
        // take all the circles
        svg.selectAll("circle")
            .attr("cx", d => d.name == "Michael Buble" ? d.x-60 : (d.x)-20) // change x pos 
            .attr("cy", d => d.name == "Morgan Wallen" ? d.y : (d.y)+30) // change y pos
  
        // update all lines
        svg.selectAll("line")
        .attr("x1", d=>d.source.name == "Michael Buble" ? d.source.x-60 : (d.source.x)-20)
        .attr("y1", d => d.source.name == "Morgan Wallen" ? d.source.y : (d.source.y)+30)
        .attr("x2", d=>d.target.name == "Michael Buble" ? d.target.x-60 : (d.target.x)-20)
        .attr("y2", d => d.target.name == "Morgan Wallen" ? d.target.y : (d.target.y)+30)

        svg.selectAll("text")
            .attr("x", d => d.name == "Michael Buble" ? d.x-60 : (d.x)-20)//d.type == "Genre" ? 200 : 520)
            .attr("y", d => d.name == "Morgan Wallen" ? d.y : (d.y)+30);
    }
    
})
