$(function() {
  var dark = '0.9';
  var light = '0.3';
  var boxes = d3.selectAll('.hover-ui');

   // Increase opacity for all menu-panes individually
  document.querySelectorAll('.hover-ui').forEach(function(el) {

    el.addEventListener('mouseenter', function () {
      boxes.transition()
        .duration(1000)
        .attr('opacity', dark);
    });
    
    el.addEventListener('mouseleave', function () {
      boxes.transition()
        .duration(1000)
        .attr('opacity', light);
    });
  });

  // When user clicks on a video preview we swap out assets
  document.querySelectorAll('.video-preview').forEach(function(el) {
    $(el).click(function(e) {
      var target = e.target;
      var vidId = $(target).data('video-id');

      // Make sure valid element was clicked
      if (vidId > -1) {
        var currentVid = $('#video-player').attr('src');
        stopVideo(currentVid);
        

        var newVid = $('#video-' + vidId);
        // These are all the tags and attributes which need to be swapped.
        var swap = {
              video_player: {
                attribute: 'src', prefix: '#video-' + vidId},
              video_controller: {
                attribute: 'video-controls', prefix: 'src:#video-' + vidId},
              video_title: {
                attribute: 'bmfont-text', prefix: 'text: ', data: 'title'},
              video_desc: {
                attribute: 'bmfont-text', prefix: 'text: ', data: 'description'},
              video_pub: {
                attribute: 'bmfont-text', prefix: 'text: Published on ', data: 'pubdate'},
        };

        // Loop through list and swap all the attributes.
        $.each(swap, function(key, value) {
          var selector = key.replace('_', '-');
          var newVal = (value.data) ? newVid[0].dataset[value.data] : '';
          d3.select('#' + selector).attr(value.attribute, value.prefix + newVal);
        });
        
        playVideo(newVid);
      }
    });
  });

  function playVideo(selector) {
    console.log($('#video-controller'));
    $('#video-controller').attr('video-controls', 'src:' + selector);
    $(selector).each(function () {
      this.currentTime = 0; 
      this.play() 
    });
  }

  function stopVideo(selector) {
    $(selector).each(function () { 
      this.pause() 
    });
  }
});





