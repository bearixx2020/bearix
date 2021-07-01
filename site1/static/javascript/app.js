
window.onload=function(){ 
    
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;



var svg2 = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// 1

d3.csv("vibr_inp0_t.csv",

  // When reading the csv, I must format variables:
  function(d){
     
    return { frequency : d.frequency, magnitude : d.magnitude }
  },

  // Now I can use this dataset:
  function(data) {
   
    console.log(data);
     let zer =  data[0].magnitude;
   let zer1 = "Значение в нуле : Амплитуда = ";
   zer1 += zer;
   zer1+= " Частота = ";
   zer1 += 0;
   data[0].magnitude=0; 
   document.getElementById("min1").innerHTML = zer1;
    // Add X axis --> it is a date format
    let x1 = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.frequency; })])
      .range([ 0, width ]);
    xAxis1 = svg2.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x1));

    // Add Y axis
    let y = d3.scaleLinear()
      .domain([0,100+ d3.max(data, function(d) { return +d.magnitude; })])
      .range([ height, 0 ]);
    yAxis = svg2.append("g")
      .call(d3.axisLeft(y));

   let max = d3.max(data, function(d) {  return +d.magnitude; })
   let max1 = "Максимальное значение : Амплитуда = ";
   max1 += max;
   max1+= " Частота = ";
   max1 += data.find(el=>el.magnitude==max).frequency;
   document.getElementById("max1").innerHTML = max1;
   
  
   
    // Add a clipPath: everything out of this area won't be drawn.
    let clip = svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("y", 0);

    // Add brushing
    let brush = d3.brushX()                   // Add the brush feature using the d3.brush function
        .extent( [ [0,0], [width,height] ] )  // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
        .on("end", updateChart)               // Each time the brush selection changes, trigger the 'updateChart' function

    // Create the area variable: where both the area and the brush take place
    let area = svg2.append('g')
      .attr("clip-path", "url(#clip)")

    // Create an area generator
    let areaGenerator = d3.area()
      .x1(function(d) { return x1(d.frequency) })
      .y0(y(0))
      .y1(function(d) { return y(d.magnitude) })

    // Add the area
    area.append("path")
      .datum(data)
      .attr("class", "myArea")  // I add the class myArea to be able to modify it later on.
      .attr("fill", "#ff8b38")
      .attr("fill-opacity", 1)
      .attr("stroke", "#ff8b38")
      .attr("stroke-width", 1)
      .attr("d", areaGenerator )

  svg2.append("text")
    .attr("x", (width / 2))
    .attr("y", 10 )
    .attr("text-anchor", "middle")
    .style("font-size", "22px")
    .text("АЧХ (Ось Х) :");
    
     
      svg2.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", 20+width/2)
    .attr("y", height + 28)
    .style("font-size", "10px")
    .text("Частота (Гц)");

    // Add the brushing
    area
      .append("g")
        .attr("class", "brush")
        .call(brush);

    // A function that set idleTimeOut to null
    let idleTimeout
    function idled() { idleTimeout = null; }

    // A function that update the chart for given boundaries
    function updateChart() {

      // What are the selected boundaries?
      extent = d3.event.selection

      // If no selection, back to initial coordinate. Otherwise, update X axis domain
      if(!extent){
        if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
        x1.domain([ 4,8])
      }else{
        x1.domain([ x1.invert(extent[0]), x1.invert(extent[1]) ])
        area.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
      }

      // Update axis and area position
      xAxis1.transition().duration(1000).call(d3.axisBottom(x1))
      area
          .select('.myArea')
          .transition()
          .duration(1000)
          .attr("d", areaGenerator)
    }

    // If user double click, reinitialize the chart
    svg2.on("dblclick",function(){
      x1.domain(d3.extent(data, function(d) { return d.frequency; }))
      xAxis1.transition().call(d3.axisBottom(x1))
      area
        .select('.myArea')
        .transition()
        .attr("d", areaGenerator)
    });

})
　




// 2
var svg = d3.select("#my_dataviz２")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("vibr_inp1_t.csv",

  function(d){
     
    return { frequency : d.frequency, magnitude : d.magnitude }
  },

  function(data) {
   
    
     let zer =  data[0].magnitude;
   let zer1 = "Значение в нуле : Амплитуда = ";
   zer1 += zer;
   zer1+= " Частота = ";
   zer1 += 0;
   data[0].magnitude=0; 
   document.getElementById("min2").innerHTML = zer1;
    
    let x2 = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.frequency; })])
      .range([ 0, width ]);
    xAxis2 = svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x2));

    // Add Y axis
    let y = d3.scaleLinear()
      .domain([0, 100+d3.max(data, function(d) { return +d.magnitude; })])
      .range([ height, 0 ]);
    yAxis = svg.append("g")
      .call(d3.axisLeft(y));

   let max = d3.max(data, function(d) {  return +d.magnitude; })
   let max1 = "Максимальное значение : Амплитуда = ";
   max1 += max;
   max1+= " Частота = ";
   max1 += data.find(el=>el.magnitude==max).frequency;
   document.getElementById("max2").innerHTML = max1;
   
  
    let clip = svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("y", 0);

    let brush = d3.brushX()                   
        .extent( [ [0,0], [width,height] ] )  
        .on("end", updateChart)               
    
    let area = svg.append('g')
      .attr("clip-path", "url(#clip)")

    let areaGenerator = d3.area()
      .x1(function(d) { return x2(d.frequency) })
      .y0(y(0))
      .y1(function(d) { return y(d.magnitude) })

    area.append("path")
      .datum(data)
      .attr("class", "myArea")  // I add the class myArea to be able to modify it later on.
      .attr("fill", "#ff8b38")
      .attr("fill-opacity", 1)
      .attr("stroke", "#ff8b38")
      .attr("stroke-width", 1)
      .attr("d", areaGenerator )

  svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 10 )
    .attr("text-anchor", "middle")
    .style("font-size", "22px")
    .text("АЧХ (Ось Y):");
    
     
      svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", 20+width/2)
    .attr("y", height + 28)
    .style("font-size", "10px")
    .text("Частота (Гц)");

    area
      .append("g")
        .attr("class", "brush")
        .call(brush);

    let idleTimeout
    function idled() { idleTimeout = null; }

    function updateChart() {

      extent = d3.event.selection

      if(!extent){
        if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); 
        x2.domain([ 4,8])
      }else{
        x2.domain([ x2.invert(extent[0]), x2.invert(extent[1]) ])
        area.select(".brush").call(brush.move, null) 
      }

     
      xAxis2.transition().duration(1000).call(d3.axisBottom(x2))
      area
          .select('.myArea')
          .transition()
          .duration(1000)
          .attr("d", areaGenerator)
    }

   
    svg.on("dblclick",function(){
      x2.domain(d3.extent(data, function(d) { return d.frequency; }))
      xAxis2.transition().call(d3.axisBottom(x2))
      area
        .select('.myArea')
        .transition()
        .attr("d", areaGenerator)
    });

})
　




//3

var svg3 = d3.select("#my_dataviz3")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("vibr_inp2_t.csv",

  function(d){
     
    return { frequency : d.frequency, magnitude : d.magnitude }
  },

  function(data) {
   
    
     let zer =  data[0].magnitude;
   let zer1 = "Значение в нуле : Амплитуда = ";
   zer1 += zer;
   zer1+= " Частота = ";
   zer1 += 0;
   data[0].magnitude=0; 
   document.getElementById("min3").innerHTML = zer1;
    
    let x3 = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.frequency; })])
      .range([ 0, width ]);
    xAxis3 = svg3.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x3));

    let y = d3.scaleLinear()
      .domain([0, 100+d3.max(data, function(d) { return +d.magnitude; })])
      .range([ height, 0 ]);
    yAxis = svg3.append("g")
      .call(d3.axisLeft(y));

   let max = d3.max(data, function(d) {  return +d.magnitude; })
   let max1 = "Максимальное значение : Амплитуда = ";
   max1 += max;
   max1+= " Частота = ";
   max1 += data.find(el=>el.magnitude==max).frequency;
   document.getElementById("max3").innerHTML = max1;
   
  
    let clip = svg3.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("y", 0);

  svg3.append("text")
    .attr("x", (width / 2))
    .attr("y", 10 )
    .attr("text-anchor", "middle")
    .style("font-size", "22px")
    .text("АЧХ (Ось Z):");
    
     
      svg3.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", 20+width/2)
    .attr("y", height + 28)
    .style("font-size", "10px")
    .text("Частота (Гц)");

    let brush = d3.brushX()                   
        .extent( [ [0,0], [width,height] ] )  
        .on("end", updateChart)               
    
    let area = svg3.append('g')
      .attr("clip-path", "url(#clip)")

    let areaGenerator = d3.area()
      .x1(function(d) { return x3(d.frequency) })
      .y0(y(0))
      .y1(function(d) { return y(d.magnitude) })

    area.append("path")
      .datum(data)
      .attr("class", "myArea")  
      .attr("fill", "#ff8b38")
      .attr("fill-opacity", 1)
      .attr("stroke", "#ff8b38")
      .attr("stroke-width", 1)
      .attr("d", areaGenerator )

    area
      .append("g")
        .attr("class", "brush")
        .call(brush);

    let idleTimeout
    function idled() { idleTimeout = null; }

    function updateChart() {

      extent = d3.event.selection

      if(!extent){
        if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); 
        x3.domain([ 4,8])
      }else{
        x3.domain([ x3.invert(extent[0]), x3.invert(extent[1]) ])
        area.select(".brush").call(brush.move, null) 
      }

     
      xAxis3.transition().duration(1000).call(d3.axisBottom(x3))
      area
          .select('.myArea')
          .transition()
          .duration(1000)
          .attr("d", areaGenerator)
    }

   
    svg3.on("dblclick",function(){
      x3.domain(d3.extent(data, function(d) { return d.frequency; }))
      xAxis3.transition().call(d3.axisBottom(x3))
      area
        .select('.myArea')
        .transition()
        .attr("d", areaGenerator)
    });

})



//4

var svg4 = d3.select("#my_dataviz4")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("vibr_inp3_t.csv",

  function(d){
     
    return { frequency : d.frequency, magnitude : d.magnitude }
  },

  function(data) {
   
    
     let zer =  data[0].magnitude;
   let zer1 = "Значение в нуле : Амплитуда = ";
   zer1 += zer;
   zer1+= " Частота = ";
   zer1 += 0;
   data[0].magnitude=0; 
   document.getElementById("min4").innerHTML = zer1;
    
    let x4 = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.frequency; })])
      .range([ 0, width ]);
    xAxis4 = svg4.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x4));

    let y = d3.scaleLinear()
      .domain([0,100+ d3.max(data, function(d) { return +d.magnitude; })])
      .range([ height, 0 ]);
    yAxis = svg4.append("g")
      .call(d3.axisLeft(y));

   let max = d3.max(data, function(d) {  return +d.magnitude; })
   let max1 = "Максимальное значение : Амплитуда = ";
   max1 += max;
   max1+= " Частота = ";
   max1 += data.find(el=>el.magnitude==max).frequency;
   document.getElementById("max4").innerHTML = max1;
   
  
    let clip = svg4.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("y", 0);

    let brush = d3.brushX()                   
        .extent( [ [0,0], [width,height] ] )  
        .on("end", updateChart)               
    
    let area = svg4.append('g')
      .attr("clip-path", "url(#clip)")

    let areaGenerator = d3.area()
      .x1(function(d) { return x4(d.frequency) })
      .y0(y(0))
      .y1(function(d) { return y(d.magnitude) })

    area.append("path")
      .datum(data)
      .attr("class", "myArea")  
      .attr("fill", "#ff8b38")
      .attr("fill-opacity", 1)
      .attr("stroke", "#ff8b38")
      .attr("stroke-width", 1)
      .attr("d", areaGenerator )

  svg4.append("text")
    .attr("x", (width / 2))
    .attr("y", 10 )
    .attr("text-anchor", "middle")
    .style("font-size", "22px")
    .text("АЧХ (Ось X):");
    
     
      svg4.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", 20+width/2)
    .attr("y", height + 28)
    .style("font-size", "10px")
    .text("Частота (Гц)");

    area
      .append("g")
        .attr("class", "brush")
        .call(brush);

    let idleTimeout
    function idled() { idleTimeout = null; }

    function updateChart() {

      extent = d3.event.selection

      if(!extent){
        if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); 
        x4.domain([ 4,8])
      }else{
        x4.domain([ x4.invert(extent[0]), x4.invert(extent[1]) ])
        area.select(".brush").call(brush.move, null) 
      }

     
      xAxis4.transition().duration(1000).call(d3.axisBottom(x4))
      area
          .select('.myArea')
          .transition()
          .duration(1000)
          .attr("d", areaGenerator)
    }

   
    svg4.on("dblclick",function(){
      x4.domain(d3.extent(data, function(d) { return d.frequency; }))
      xAxis4.transition().call(d3.axisBottom(x4))
      area
        .select('.myArea')
        .transition()
        .attr("d", areaGenerator)
    });

})


//5

var svg5 = d3.select("#my_dataviz5")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("vibr_inp4_t.csv",

  function(d){
     
    return { frequency : d.frequency, magnitude : d.magnitude }
  },

  function(data) {
   
    
     let zer =  data[0].magnitude;
   let zer1 = "Значение в нуле : Амплитуда = ";
   zer1 += zer;
   zer1+= " Частота = ";
   zer1 += 0;
   data[0].magnitude=0; 
   document.getElementById("min5").innerHTML = zer1;
    
    let x5 = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.frequency; })])
      .range([ 0, width ]);
    xAxis5 = svg5.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x5));

    let y = d3.scaleLinear()
      .domain([0, 100+d3.max(data, function(d) { return +d.magnitude; })])
      .range([ height, 0 ]);
    yAxis = svg5.append("g")
      .call(d3.axisLeft(y));

   let max = d3.max(data, function(d) {  return +d.magnitude; })
   let max1 = "Максимальное значение : Амплитуда = ";
   max1 += max;
   max1+= " Частота = ";
   max1 += data.find(el=>el.magnitude==max).frequency;
   document.getElementById("max5").innerHTML = max1;
   
  
    let clip = svg5.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("y", 0);

    let brush = d3.brushX()                   
        .extent( [ [0,0], [width,height] ] )  
        .on("end", updateChart)               
    
    let area = svg5.append('g')
      .attr("clip-path", "url(#clip)")

    let areaGenerator = d3.area()
      .x1(function(d) { return x5(d.frequency) })
      .y0(y(0))
      .y1(function(d) { return y(d.magnitude) })

    area.append("path")
      .datum(data)
      .attr("class", "myArea")  
      .attr("fill", "#ff8b38")
      .attr("fill-opacity", 1)
      .attr("stroke", "#ff8b38")
      .attr("stroke-width", 1)
      .attr("d", areaGenerator )
  svg5.append("text")
    .attr("x", (width / 2))
    .attr("y", 10 )
    .attr("text-anchor", "middle")
    .style("font-size", "22px")
    .text("АЧХ (Ось Y):");
    
     
      svg5.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", 20+width/2)
    .attr("y", height + 28)
    .style("font-size", "10px")
    .text("Частота (Гц)");
    area
      .append("g")
        .attr("class", "brush")
        .call(brush);

    let idleTimeout
    function idled() { idleTimeout = null; }

    function updateChart() {

      extent = d3.event.selection

      if(!extent){
        if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); 
        x5.domain([ 4,8])
      }else{
        x5.domain([ x5.invert(extent[0]), x5.invert(extent[1]) ])
        area.select(".brush").call(brush.move, null) 
      }

     
      xAxis5.transition().duration(1000).call(d3.axisBottom(x5))
      area
          .select('.myArea')
          .transition()
          .duration(1000)
          .attr("d", areaGenerator)
    }

   
    svg5.on("dblclick",function(){
      x5.domain(d3.extent(data, function(d) { return d.frequency; }))
      xAxis5.transition().call(d3.axisBottom(x5))
      area
        .select('.myArea')
        .transition()
        .attr("d", areaGenerator)
    });

})

//6

var svg6 = d3.select("#my_dataviz6")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("vibr_inp5_t.csv",

  function(d){
     
    return { frequency : d.frequency, magnitude : d.magnitude }
  },

  function(data) {
   
    
     let zer =  data[0].magnitude;
   let zer1 = "Значение в нуле : Амплитуда = ";
   zer1 += zer;
   zer1+= " Частота = ";
   zer1 += 0;
   data[0].magnitude=0; 
   document.getElementById("min6").innerHTML = zer1;
    
    let x = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.frequency; })])
      .range([ 0, width ]);
    xAxis = svg6.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    let y = d3.scaleLinear()
      .domain([0, 100+d3.max(data, function(d) { return +d.magnitude; })])
      .range([ height, 0 ]);
    yAxis = svg6.append("g")
      .call(d3.axisLeft(y));

   let max = d3.max(data, function(d) {  return +d.magnitude; })
   let max1 = "Максимальное значение : Амплитуда = ";
   max1 += max;
   max1+= " Частота = ";
   max1 += data.find(el=>el.magnitude==max).frequency;
   document.getElementById("max6").innerHTML = max1;
   
  
    let clip = svg6.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("y", 0);

    let brush = d3.brushX()                   
        .extent( [ [0,0], [width,height] ] )  
        .on("end", updateChart)               
    
    let area = svg6.append('g')
      .attr("clip-path", "url(#clip)")

    let areaGenerator = d3.area()
      .x(function(d) { return x(d.frequency) })
      .y0(y(0))
      .y1(function(d) { return y(d.magnitude) })

    area.append("path")
      .datum(data)
      .attr("class", "myArea")  
      .attr("fill", "#ff8b38")
      .attr("fill-opacity", 1)
      .attr("stroke", "#ff8b38")
      .attr("stroke-width", 1)
      .attr("d", areaGenerator )

  svg6.append("text")
    .attr("x", (width / 2))
    .attr("y", 10 )
    .attr("text-anchor", "middle")
    .style("font-size", "22px")
    .text("АЧХ (Ось Z):");
    
     
      svg6.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", 20+width/2)
    .attr("y", height + 28)
    .style("font-size", "10px")
    .text("Частота (Гц)");

    area
      .append("g")
        .attr("class", "brush")
        .call(brush);

    let idleTimeout
    function idled() { idleTimeout = null; }

    function updateChart() {

      extent = d3.event.selection

      if(!extent){
        if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); 
        x.domain([ 4,8])
      }else{
        x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
        area.select(".brush").call(brush.move, null) 
      }

     
      xAxis.transition().duration(1000).call(d3.axisBottom(x))
      area
          .select('.myArea')
          .transition()
          .duration(1000)
          .attr("d", areaGenerator)
    }

   
    svg6.on("dblclick",function(){
      x.domain(d3.extent(data, function(d) { return d.frequency; }))
      xAxis.transition().call(d3.axisBottom(x))
      area
        .select('.myArea')
        .transition()
        .attr("d", areaGenerator)
    });

})


}
























