var express = require('express');
var router = express.Router();

var draw = require("aframe-draw-component").component;
var textwrap = require("aframe-textwrap-component").component;
//AFRAME.registerComponent("draw", draw);
//AFRAME.registerComponent("textwrap", textwrap);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('video_player', { title: 'Sitemap Video Player' });
});

module.exports = router;
