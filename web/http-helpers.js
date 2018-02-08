var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': ''
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  if (callback === undefined) {
    callback = (err, data) => {
      if (err) { 
        console.error(err);
        res.writeHead(500, exports.headers);
      } else {
        res.writeHead(200, exports.headers);
      }
      res.write(data);
      res.end();
    };
  }

  fs.readFile(asset, 'utf8', callback);
  
};