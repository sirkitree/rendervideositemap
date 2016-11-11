// https://github.com/dinbror/blazy
;(function() {
    // Initialize
    var bLazy = new Blazy();
})();

$(document).ready(function() {
	// https://github.com/object505/tipso
	/*$('.img-tipso').tipso({
		size: 'large'
    });*/

	// http://dimsemenov.com/plugins/magnific-popup/
	$('.popup-video').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});
});

