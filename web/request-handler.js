var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var http = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  fs.readFile(archive.paths.siteAssets + "/index.html", "utf8", (err, data) => {
    if (err) { console.error(err); }
    res.writeHead(200, http.headers);
    res.write(data);
    res.end();

  });
  
  //res.end(archive.paths.siteAssetslist);
};
