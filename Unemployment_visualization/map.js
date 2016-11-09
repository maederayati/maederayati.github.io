
	
	var temp;
	var temp2=[];
	var selected=[];
	var cities;
	var dataAll=[];
	var national;
	var national2=[];
	var rownames=[];
	var minDate="1978";
	var	maxDate="2017";
	var mapClick=true;
	var current;
	
	
	
	function mapStates(num){
		if(num==1 ||num==2) return num;
		else if(num>3 && num<7) return num-1;
		else if(num>7 && num<14) return num-2;
		else if(num>14 && num<43) return num-3;
		else if(num>43 && num<52) return num-4;
		else if(num>52 && num<57) return num-5;
		
	}
	
	function mapStatesBack(num){
		if(num==1 ||num==2) return num;
		else if(num>2 && num<6) return num+1;
		else if(num>5 && num<12) return num+2;
		else if(num>11 && num<40) return num+3;
		else if(num>39 && num<48) return num+4;
		else if(num>47 && num<52) return num+5;
		
	}

	//begin map
	function include(arr, obj) {
		for(var i=0; i<arr.length; i++) {
			if (arr[i] == obj) return true;
		}
	}

	

	function drawGraph(did){
	
		temp=cities.filter(function(d2,i){
			i++;
			if(i==mapStates(+did))
				return 1;
			else 
				return 0;
		});
		temp2=[];
		temp2.push( {
				id: temp[0].id,
				values: temp[0].values.filter(function(d8){
					if(d8.date>=parseTime2(+minDate) && d8.date<=parseTime2(+maxDate)) // &&parseTime(d8.date)<parseTime(maxDate)
						return 1;
					else 
						return 0;					
				})	
		});
		
		
	


		z.domain(cities.map(function(c) { return c.id; }));
		var newg=d3.select("svg.s2").append("g").attr("transform", "translate(" + 50 + "," + 30 + ")");
		var selectedGraph = newg.selectAll(".selectedGraph")
			.data(temp2)
			.enter().append("g")
			.attr("class", "selectedGraph"+did);


		selectedGraph.append("path")
			.attr("class", "line "+did)
			.attr("d", function(d) { return line(d.values); })
			.style("stroke", function(d2) { return z(d2.id); })

			
			.style("stroke-width",1.5)
			.on("mouseover", function(pq){			
				d3.select(this).style("stroke-width",2.5);
			})
			.on("mouseout", function(pq){
				d3.select(this)
					.style("stroke-width",1.5);
			});

			
			

		//debugger;	
			

		selectedGraph.append("text")
			.datum(function(d3) { return {id: d3.id, value: d3.values[d3.values.length - 1]}; })
			.attr("transform", function(d4) { return "translate(" + x(d4.value.date) + "," + y(d4.value.rate) + ")"; })
			.attr("x", 3)
			.attr("dy", "0.35em")
			.style("font", "10px sans-serif")
			.style("fill", function(dg){return z(dg.id);})
			.text(function(d6) { return d6.id; });
			
			
				

			
			
		}
			
			
		

		
		  


	d3.csv("unemploymentData/mean_allStates.csv", function(err, data) {

		var config = {"color1":"#d3e5ff","color2":"#08306B","stateDataColumn":"state","valueDataColumn":"meanRate"}
		var WIDTH = 300, HEIGHT = 200;
		var COLOR_COUNTS = 9;
		var SCALE = 0.32;
	  
		function Interpolate(start, end, steps, count) {
			var s = start,
				e = end,
				final = s + (((e - s) / steps) * count);
		  return Math.floor(final);
		}
		function Color(_r, _g, _b) {
			var r, g, b;
			var setColors = function(_r, _g, _b) {
			r = _r;
			g = _g;
			b = _b;
		}
		setColors(_r, _g, _b);
		this.getColors = function() {
			var colors = {
				r: r,
				g: g,
				b: b
			};
			return colors;
		  };
		}
	  
		function hexToRgb(hex) {
			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			return result ? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
			} : null;
		}
	  
		function valueFormat(d) {
			return d3.format(".2f")(d);
		}
	  
		var COLOR_FIRST = config.color1, COLOR_LAST = config.color2;
		var rgb = hexToRgb(COLOR_FIRST);
		var COLOR_START = new Color(rgb.r, rgb.g, rgb.b);
		rgb = hexToRgb(COLOR_LAST);
		var COLOR_END = new Color(rgb.r, rgb.g, rgb.b);
		var MAP_STATE = config.stateDataColumn;
		var MAP_VALUE = config.valueDataColumn;
		var width = WIDTH,
		height = HEIGHT;
		var valueById = d3.map();
		var startColors = COLOR_START.getColors(),
			endColors = COLOR_END.getColors();
		var colors = [];
		for (var i = 0; i < COLOR_COUNTS; i++) {
			var r = Interpolate(startColors.r, endColors.r, COLOR_COUNTS, i);
			var g = Interpolate(startColors.g, endColors.g, COLOR_COUNTS, i);
			var b = Interpolate(startColors.b, endColors.b, COLOR_COUNTS, i);
			colors.push(new Color(r, g, b));
		}
		var quantize = d3.scale.quantize()
			.domain([0, 1.0])
			.range(d3.range(COLOR_COUNTS).map(function(i) { return i }));
	  
		var path = d3.geo.path();
	  
		var svgmap = d3.select("#canvas-svg").append("svg")
			.attr("width", width)
			.attr("height", height)
			.attr("class","s1");
	  
		d3.tsv("mapData/us-state-names.tsv", function(error, names) {
	  
			name_id_map = {};
			id_name_map = {};	  
			for (var i = 0; i < names.length; i++) {
				name_id_map[names[i].name] = names[i].id;
				id_name_map[names[i].id] = names[i].name;
			}
		  
			data.forEach(function(d) {
				var id = name_id_map[d[MAP_STATE]];
				valueById.set(id, +d[MAP_VALUE]); 
			});
	  
			quantize.domain([d3.min(data, function(d){ return +d[MAP_VALUE] }),
							d3.max(data, function(d){ return +d[MAP_VALUE] })]);
	  
			d3.json("mapData/us.json", function(error, us) {
				svgmap.append("g")
				.attr("class", "states-choropleth")
				.selectAll("path")
				.data(topojson.feature(us, us.objects.states).features)
				.enter().append("path")
				.attr("transform", "scale(" + SCALE + ")")
			
			
				.style("fill", function(d) {
					
					if (valueById.get(d.id)) {
						var i = quantize(valueById.get(d.id));
						var color = colors[i].getColors();
						return "rgb(" + color.r + "," + color.g +
							"," + color.b + ")";
					} 
					else 
						return "";				  
				})
			

				.attr("d", path)
			
			

			
				.on("mousemove", function(d) {
					var html = "";		  
					html += "<div class=\"tooltip_kv\">";
					html += "<span class=\"tooltip_key\">";
					html += id_name_map[d.id];
					html += "</span>";
					html += "<span class=\"tooltip_value\">";
					html += (valueById.get(d.id) ? valueFormat(valueById.get(d.id)) : "");
					html += "";
					html += "</span>";
					html += "</div>";
				
					$("#tooltip-container").html(html);
					$(this).attr("fill-opacity", "0.8");
					//$(this).style("fill", "black");
					$("#tooltip-container").show();
				
					var coordinates = d3.mouse(this);
					var map_width = $('.states-choropleth')[0].getBoundingClientRect().width;
				
					if (d3.event.layerX < map_width / 2) {
						d3.select("#tooltip-container")
							.style("top", (d3.event.layerY + 15) + "px")
							.style("left", (d3.event.layerX + 15) + "px");
					} 
					else {
						var tooltip_width = $("#tooltip-container").width();
						d3.select("#tooltip-container")
							.style("top", (d3.event.layerY + 15) + "px")
							.style("left", (d3.event.layerX - tooltip_width - 30) + "px");
					}
				})
			
		
				.on("mouseout", function() {
					$(this).attr("fill-opacity", "1.0");
					$("#tooltip-container").hide();
				})
			

				.on("click", function(d) {
					
					if(!(include(selected, mapStates(+d.id)))){
						selected.push(mapStates(+d.id));
						d3.select(this).attr("opacity",0.2);
						drawGraph(d.id);
					}
					
					
					else{
						selected=selected.filter(function(f){
							if(f==mapStates(+d.id))
								return 0;
							else 
								return 1;
						});
						d3.select(this).attr("opacity",1);
						temp=cities.filter(function(d2,i){
							i++;
							if(include(selected, i))
								return 1;
							else 
								return 0;
						});
						temp2=[];
						d3.select(".selectedGraph"+d.id).remove();
					}
	
				});	
					

	  
				svgmap.append("path")
					.datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
					.attr("class", "states")
					.attr("transform", "scale(" + SCALE + ")")
					.attr("d", path);
			});
	  
		});
	});

