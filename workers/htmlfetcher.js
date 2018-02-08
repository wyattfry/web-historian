// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var path = require('path');
var archiveh = require('../helpers/archive-helpers');
var fs = require('fs');
var httph = require('../web/http-helpers');
var _ = require('underscore');
var url = require('url');
var cron = require('node-cron');
var exports = module.exports = {};


//regularly check the lists and download the pages.
exports.fetchHtmls = function() {
  var sites = [];
  archiveh.readListOfUrls((data) => {
    _.each(data.split('\n'), (url) => {
      sites.push(url);
    });
  });

  archiveh.downloadUrls(sites);
};

//schedule a task here in node-cron
//exceute every 1 min
cron.schedule('*/1 * * * *', exports.fetchHtmls);