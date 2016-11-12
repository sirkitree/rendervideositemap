// Increase opacity for all menu-panes individually
document.querySelectorAll('.hover-ui').forEach(function() {
  var dark = '0.9';
  var light = '0.3';
  var boxes = d3.selectAll('.hover-ui');

  this.addEventListener('mouseenter', function () {
    console.log("enter");
    boxes.transition()
              .duration(1000)
              .attr('opacity', dark);
  });
  
  this.addEventListener('mouseleave', function () {
    console.log("leave");
    boxes.transition()
              .duration(1000)
              .attr('opacity', light);
  });
});