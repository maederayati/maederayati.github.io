	var range = document.getElementById('range');

noUiSlider.create(range, {
	start: [ 1978, 2017 ], // Handle start position
	step: 1, // Slider moves in increments of '10'
	margin: 1, // Handles must be more than '20' apart
	connect: true, // Display a colored bar between the handles
	direction: 'rtl', // Put '0' at the bottom of the slider
	orientation: 'vertical', // Orient the slider vertically
	behaviour: 'drag', // Move handle on tap, bar is draggable
	range: { // Slider can select '0' to '100'
		'min': 1978,
		'max': 2017
	},
	pips: { // Show a scale with the slider
		mode: 'count',
		values: 19,
		density: 2
	}
});









