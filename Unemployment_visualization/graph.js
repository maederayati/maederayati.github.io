/*	var pieTip = d3.tip()
          .attr('class', 'd3-tip')
          .offset([-10, 0])
          //.html(function () { return "<span style='color: #f0027f'>" + "testkey" + "</span> : "  + "value"; });	
.html('<div style="width: 160px;"><p>Old text old text old text old text old text old text<p></div>');
*/



	function drawNational(){
		
		
			national=cities.filter(function(d,i){		
			if(d.id=="National")
				return 1;
			else return 0;
		});

	
		
		national2=[];
		national2.push( {
			id: national[0].id,
			values: national[0].values.filter(function(d31){
				if(d31.date>=parseTime2(+minDate) && d31.date<=parseTime2(+maxDate)) 
					return 1;
				else 
					return 0;
			}),
			ranking: national[0].ranking.filter(function(d61){
				if(d61.date>=parseTime2(+minDate) && d61.date<=parseTime2(+maxDate)) 
					return 1;
				else 
					return 0;
									
			})
							
		});
		
		
		
		z.domain(cities.map(function(c) { return c.id; }));

		
		var initialGraph = g.selectAll(".initialGraph")
		
			.data(national2)
			.enter().append("g")
			  .attr("class", "initialGraph");
			  
			  


		
		initialGraph.append("path")
			.attr("class", "line national")
			.attr("d", function(d23) { return line(d23.values); })
			.style("stroke", "black")
			.style("stroke-width",1.5)
			;
			

		

	
				
	initialGraph.on("mouseover",function(){
		d3.selectAll("path.line.national")
		.style("stroke-width",2.5);
	});

	
	initialGraph.on("mouseout",function(){
		
		d3.selectAll("path.line.national")	
		.style("stroke-width",1.5);
	});	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//initialGraph.attr("stroke-width","5px");
		
	/*initialGraph.selectAll("rect")
      .data(national[0].values).enter()
      .append("rect")
      .attr("stroke", "#000")
      .attr("fill", "red")
      .attr("x", function(d89){
        return x(d89.date);
      })
      .attr("y", function(d92){
        return y(d92.rate);
      })
	  .attr("width",20)
	  .attr("height",25)
      //.attr("r", function(d110){
      //  return 8;
      //})
	  ;	
	
*/
	
	/*d3.selectAll("rect")
	.on("mouseover", function(d1,i1){
			d3.selectAll("rect")
			.attr("fill-opacity",function(d2){
				if (d2!=d1)
				return 0; 
			});
	});
	*/
		
			
			
		

	/*	var tip = d3.tip()
			.attr('class', 'd3-tip')
			.offset([-10, 0])
			.html(function(d) {
				return "<strong>Frequency:</strong> <span style='color:red'>" + d.ranking.rate + "</span>";
			})

	


		d3.selectAll("g.initialGraph").append("rect")
				.append("title")
			.text("jhjh");
			
	*/
			  
		initialGraph.append("text")
			.attr("class","lab national")
			.datum(function(d21) { return {id: d21.id, value: d21.values[d21.values.length - 1]}; })
			.attr("transform", function(d22) { return "translate(" + x(d22.value.date) + "," + y(d22.value.rate) + ")"; })
			.attr("x", 3)
			.attr("dy", "0.35em")
			.style("font", "10px sans-serif")
			.text("National");
			

			
	
			
			

		
			
		}
	
/*	d3.selectAll("g.initialGraph").append("rect")
	 .append("title")
   .text(function(d) {
         return "jhg";
   });
	

	d3.selectAll("g.initialGraph").call(pieTip);
				d3.selectAll("g.initialGraph").on('mouseover', pieTip.show)
      .on('mouseout', pieTip.hide);

	*/
	
	
			var svg = d3.select("svg.s2"),
		margin = {top: 30, right: 60, bottom: 30, left: 50},
		width = svg.attr("width") - margin.left - margin.right,
		height = svg.attr("height") - margin.top - margin.bottom,
		g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
	
	

		
	//function on parsing time
		
	var parseTime = d3.timeParse("%Y%m%d");
	var parseTime2 = d3.timeParse("%Y");

	
	//function on the dimentions of axis
	var x = d3.scaleTime().range([0, width]),
		y = d3.scaleLinear().range([height, 0]),
		z = d3.scaleOrdinal(d3.schemeCategory10);

		
	//function on scaling to range
	var line = d3.line()
		.curve(d3.curveBasis)
		.x(function(d) { return x(d.date); })
		.y(function(d) { return y(d.rate); });


	
	
	//load data and initial graph		
	d3.csv("unemploymentData/UsUnemploymentData.csv", type, function(error, data) {
		d3.csv("unemploymentData/rank.csv", type, function(error, data2) {
		if (error) throw error;

		//get state names
		rownames=data.columns.slice(1).map(function(d){return d;});	
		
		
		//load cities
		cities = data.columns.slice(1).map(function(id) {
			return {
				id: id,
				values: data.map(function(d) {
					return {date: d.date, rate: d[id]};
				}),
				ranking: data2.map(function(d2) {
					return {date: d2.date, rate: d2[id]};
				})
			};
		});

		//sorting cities
		cities.forEach(function(a){
			a.values.sort(function(c,d){
			if (c.date<d.date)
				return -1;
			else if (c.date>d.date)
					return 1;
			else
				return 0;
			});
		});
		
	
	
		x.domain(d3.extent([parseTime2(+minDate),parseTime2(+maxDate)]));
		//x.domain(d3.extent(data, function(d) { return d.date; }));
		  
		 
		y.domain([
			d3.min(cities, function(c) { return d3.min(c.values, function(d) { return d.rate; }); }),
			d3.max(cities, function(c) { return d3.max(c.values, function(d) { return d.rate; }); })
		]);

		z.domain(cities.map(function(c) { return c.id; }));

		g.append("g")
		  .attr("class", "axis axis--x")
		  .attr("transform", "translate(0," + height + ")")
		  .call(d3.axisBottom(x));

		g.append("g")
		  .attr("class", "axis axis--y")
		  .call(d3.axisLeft(y))
		.append("text")
		  .attr("transform", "rotate(-90)")
		  .attr("y", 6)
		  .attr("dy", "0.71em")
		  .attr("fill", "#000")
		  .text("Unemployment Rate(%)");

			document.getElementById("newch").checked=true;
			drawNational();
			
		});
	});
		
		











		
	//on checkbox change
	d3.select("input").on("change", function () {	
		if(document.getElementById("newch").checked==true){
			drawNational();	
		}	
		
		else 
			d3.select(".initialGraph").remove();
		
	});  
			  
			  
	

		
	
		


		//on slider change
		range.noUiSlider.on('update', function( values, handle ) {
		
			selected.forEach(function(j){d3.select(".selectedGraph"+mapStatesBack(j)).remove()});
		//	selected=[];
			d3.select(".initialGraph").remove();

			if ( handle ) {
				maxDate = values[handle];
			} else {
				minDate = values[handle];
			}

			x.domain(d3.extent([parseTime2(+minDate),parseTime2(+maxDate)]));
			d3.select("g.axis").call(d3.axisBottom(x));
		
			selected.forEach(function(p){drawGraph(mapStatesBack(p));});
		
			if(document.getElementById("newch").checked==true){
				drawNational();
			}

		});
			
		function type(d, _, columns) {
		  d.date = parseTime(d.date);
		  for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
		  return d;
		}
	