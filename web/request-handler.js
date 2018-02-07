var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var http = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  http.serveAssets(res, archive.paths.siteAssets + '/index.html');
  
  //res.end(archive.paths.siteAssetslist);
};