$.getJSON('data.json', function(data) {
    // create 2 data_set
    var data1 = [
      {group: data.data[0][0], value: data.data[0][1]},
      {group: data.data[1][0], value: data.data[1][1]},
      {group: data.data[2][0], value: data.data[2][1]}
    ];
    
    
    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz2")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
    
    // Initialize the X axis
    var x = d3.scaleBand()
      .range([ 0, width ])
      .padding(0.2);
    var xAxis = svg.append("g")
      .attr("transform", "translate(0," + height + ")")
    
    // Initialize the Y axis
    var y = d3.scaleLinear()
      .range([ height, 0]);
    var yAxis = svg.append("g")
      .attr("class", "myYaxis")
    
    
    // A function that create / update the plot for a given variable:
    function update(data) {
    
      // Update the X axis
      x.domain(data.map(function(d) { return d.group; }))
      xAxis.call(d3.axisBottom(x))
    
      // Update the Y axis
      y.domain([0, d3.max(data, function(d) { return d.value }) ]);
      yAxis.transition().duration(1000).call(d3.axisLeft(y));
    
      // Create the u variable
      var u = svg.selectAll("rect")
        .data(data)
    
      u
        .enter()
        .append("rect") // Add a new rect for each new elements
        .merge(u) // get the already existing elements as well
        .transition() // and apply changes to all of them
        .duration(1000)
          .attr("x", function(d) { return x(d.group); })
          .attr("y", function(d) { return y(d.value); })
          .attr("width", x.bandwidth())
          .attr("height", function(d) { return height - y(d.value); })
          .attr("fill", "#9c21d1")
    
      // If less group in the new dataset, I delete the ones not in use anymore
      u
        .exit()
        .remove()
    }
    
    // Initialize the plot with the first dataset
    update(data1)
    });