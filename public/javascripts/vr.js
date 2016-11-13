$(function() {
   // Increase opacity for all menu-panes individually
  document.querySelectorAll('.hover-ui').forEach(function() {
    var dark = '0.9';
    var light = '0.3';
    var boxes = d3.selectAll('.hover-ui');

    this.addEventListener('mouseenter', function () {
      boxes.transition()
        .duration(1000)
        .attr('opacity', dark);
    });
    
    this.addEventListener('mouseleave', function () {
      boxes.transition()
        .duration(1000)
        .attr('opacity', light);
    });
  });

  // When user clicks on a video preview we swap out assets
  document.querySelectorAll('.video-preview').forEach(function() {
    $(this).click(function(e) {
      var target = e.target;
      var vidId = $(target).data('video-id');

      // Make sure valid element was clicked
      if (vidId > -1) {
        var vidData = $('#video-' + vidId);
        console.log(vidData[0].dataset.title);
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
            attribute: 'bmfont-text', prefix: 'text: ', data: 'pubdate'},
          };
        $.each(swap, function(key, value) {
          var selector = key.replace('_', '-');
          var newVal = (value.data) ? vidData[0].dataset[value.data] : '';
          var changeVal = d3.select('#' + selector).attr(value.attribute, value.prefix + newVal);
        });
      }
    }).stop();
  });
});





