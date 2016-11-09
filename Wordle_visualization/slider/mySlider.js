	var range = document.getElementById('range');

noUiSlider.create(range, {
	start: [ 2004, 2016 ], // Handle start position
	step: 1, // Slider moves in increments of '10'
	margin: 1, // Handles must be more than '20' apart
	connect: true, // Display a colored bar between the handles
	direction: 'rtl', // Put '0' at the bottom of the slider
	orientation: 'vertical', // Orient the slider vertically
	behaviour: 'drag', // Move handle on tap, bar is draggable
	range: { // Slider can select '0' to '100'
		'min': 2004,
		'max': 2016
	},
	pips: { // Show a scale with the slider
		mode: 'count',
		values: 13,
		density: 1
	}
});









