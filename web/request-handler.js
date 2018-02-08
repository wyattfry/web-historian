var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var http = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  if (req.url === "styles.css") {
    http.serveAssets(res, archive.paths.siteAssets + '/styles.css');
  } else {
    http.serveAssets(res, archive.paths.siteAssets + '/index.html');
  }
  //res.end(archive.paths.siteAssetslist);
};