// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var path = require('path');
var archiveh = require('../helpers/archive-helpers');
var fs = require('fs');
var httph = require('./http-helpers');
var _ = require('underscore');
var url = require('url');
var exports = module.exports = {};


//regularly check the lists and download the pages.
exports.fetchHtmls = function() {
  var sites = [];
  archiveh.readListOfUrls((data) => {
    _.each(data.split('\n'), (url) => {
      sites.push(url);
    });
  });

  return archiveh.downloadUrls(sites);
};