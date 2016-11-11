var express = require('express');
var router = express.Router();
//var fs = require('fs');
var parse = require('xml-parser');
var request = require('request');

// Tiem to start assembling data to send to parse.jade template
router.get('/', function(req, res, next) {
    /**
     * Exmaple video sitemaps:
     *   http://www.bravotv.com/sitemap.xml?page=1 (default)
     *   https://www.thestreet.com/sitemap_video2016Jul.xml
     */ 
    var sitemap = (req.query.sitemap ? req.query.sitemap : 'http://www.bravotv.com/sitemap.xml?page=1');

    // @todo - use fs to store XML file locally
    request.get(sitemap, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // var inspect = require('util').inspect;
            var obj = parse(body);
        }

        if (obj.root.children) {
            var videos = [];
            var items = [];

            // Get past all the meta data at top of the feed
            var items = obj.root.children;

            // Loop through each item in feed, there are MANY
            items.forEach(function(item) {
                // Each item can contain multiple sitemap records
                item.children.forEach(function(record) {
                    // We only care about records which are for video
                    if (record.name == 'video:video') {
                        var video = [];
                        // Loop through all attributes of each video
                        record.children.forEach(function(meta) {
                            // For now these are the only fields we want to display.
                            var fields = ['title', 'duration', 'description', 'publication_date', 'thumbnail_loc', 'player_loc', 'restriction', 'tvshow', 'content_loc'];

                            // Attribute names all being with 'video:' we need to strip that out
                            // to match the fields above.
                            var name = meta.name.replace('video:', '');
                            if (fields.indexOf(name) != -1) {
                                // Append attribute to current video record
                                video[name] = meta.content;
                            }
                        });

                        // Add video record to list of videos we're sending to the template
                        videos.push(video);
                    }     
                });
            }, this);

            // Call the parse.jade template. 
            // Provide a page title and all the video items we found
            res.render('parse', { title: 'Thanks for the Video Sitemap!', videolist: videos });
            return;
        }

        // If no items present to display at least show something SEYMOUR!
        res.send('<img src="https://media.giphy.com/media/JseOQ2kuwSau4/giphy.gif" alt="FEED ME SEYMOUR!" />');
    });
});

module.exports = router;
