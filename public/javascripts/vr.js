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

document.querySelectorAll('.video-preview').forEach(function() {
  console.log(this);
  this.addEventListener('click', function(el) {
    console.log(el);
  });
});

