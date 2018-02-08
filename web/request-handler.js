var path = require('path');
var archiveh = require('../helpers/archive-helpers');
var fs = require('fs');
var httph = require('./http-helpers');
var url = require('url');
var querystring = require('querystring');
var exports = module.exports = {};


exports.handleRequest = function (req, res) {
  
  console.log('Serving request type ', req.method + ' for url ', req.url);
  

  //CASE 1: Serve Index.html.
  if (req.method === 'GET') {
    httph.serveAssets(res, archiveh.paths.siteAssets + '/index.html');
  } else { //CASE 2: Serve Loading.html, POST url from index
    // parsedUrl = archiveh.removeProtocol(parsedUrl);
    var body = '';
    
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      var post = querystring.parse(body);
      var parsedUrl = post.url;
      parsedUrl = archiveh.removeProtocol(parsedUrl);
      var urlPath = archiveh.paths.archivedSites + '/' + parsedUrl;
      console.log('urlPath', urlPath);
      archiveh.addUrlToList(parsedUrl, (truth) => {
        if (truth) {
          //check if page is downloaded else serve loading.html
          archiveh.isUrlArchived(parsedUrl, (truth) => {
            if (!truth) {
              urlPath = archiveh.paths.siteAssets + '/loading.html';
            }
            httph.serveAssets(res, urlPath);
          });
        } else {
          httph.serveAssets(res, archiveh.paths.siteAssets + '/loading.html');
        }
      });
    });
  }
};