$(function() {
  var dark = '0.9';
  var light = '0.3';
  var boxes = d3.selectAll('.hover-ui');

   // Increase opacity for all menu-panes individually
  document.querySelectorAll('.hover-ui').forEach(function(el) {
    el.addEventListener('mouseenter', function () {
      focusUI();
    });
    
    el.addEventListener('mouseleave', function () {
      fadeUI();
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
        var newVid = $('#video-' + vidId);
        var elements = getElements(vidId);
        
        stopVideo(currentVid);
        setElements(elements, newVid);
        playVideo(newVid);
      }
    });
  });
  
  // These are all the tags and attributes which need to be swapped.
  function getElements(id) {
    return {
      video_player: {
        attribute: 'src', 
        prefix: '#video-' + id
      },
      // video_controller: {
      //   attribute: 'video-controls', prefix: 'src:#video-' + id},
      video_title: {
        attribute: 'bmfont-text', 
        prefix: 'text: ', 
        data: 'title'
      },
      video_title2: {
        attribute: 'bmfont-text', 
        prefix: 'text: ', 
        data: 'title'
      },
      video_desc: {
        attribute: 'bmfont-text', 
        prefix: 'text: ', 
        data: 'desc'
      },
      video_pub: {
        attribute: 'bmfont-text', 
        prefix: 'text: Published on ', 
        data: 'pubdate'
      },
    };
  }

  function setElements(elements, video) {
    // Loop through list and swap all the attributes.
    $.each(elements, function(key, value) {
      var selector = '#' + key.replace('_', '-');
      var newVal = (value.data) ? video[0].dataset[value.data] : '';
      if (selector === 'video-controller') {
        console.log($(selector));
      }
      else {
        d3.select(selector).attr(value.attribute, value.prefix + newVal);
      } 
    });
  }

  function playVideo(selector) {
    $(selector).each(function () {
      this.currentTime = 0; 
      this.play();
      // Create EventListener for when the video ends.
      this.addEventListener('ended', nextVideo, false);
    });

    setTimeout(fadeUI, 2000);
  }

  function stopVideo(selector) {
    $(selector).each(function () { 
      this.pause() 
    });
  }

  function nextVideo(e) {
    var current = e.target.dataset.videoId;
    var next = ++current;
    
    // aframe-video-controls does not do well when swapping attributes on the fly.
    // var controller = $('#video-controller');
    // $('#video-controller').remove();
    // controller.attr('video-controls', 'src:#video-' + next);
    // $('#video-player').after(controller);

    initPlayer(next);
  }

  function fadeUI() {
    boxes.transition()
      .duration(1000)
      .attr('opacity', light);
  }

  function focusUI() {
    boxes.transition()
      .duration(1000)
      .attr('opacity', dark);
  }

  function initPlayer(id = 0) {
    var video = $('#video-' + id);
    var elements = getElements(id);

    setElements(elements, video);
    playVideo(video);
  }

  // Give the page time to load before streaming video and audio
  setTimeout(initPlayer, 3000);
});





