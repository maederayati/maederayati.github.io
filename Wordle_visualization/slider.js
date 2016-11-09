
range.noUiSlider.on('change', function( values, handle ) {
		
		$(document).ready(function(){
			d3.select("svg").remove();
			d3.select("svg.horizon").remove();
		});

			if ( handle ) {
				maxDate = values[handle];
				if(maxDate==2016){
					maxDate=201503;
				}
				else{
					maxDate=maxDate*100+1;
				}
			} else {
				minDate = values[handle];
				if(minDate==2004){
					minDate=200411;
				}
				else{
					minDate=minDate*100+1;
				}
			}

			$(document).ready(function(){
				drawBubble();
				drawHorizon();
			});

		});