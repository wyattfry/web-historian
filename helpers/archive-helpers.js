var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', (err, data) => {
    if (err) {
      console.error('Error', err);
    } else {
      //console.log('Data: ', data);
      callback(data);
    }
  });
};

exports.isUrlInList = function(url, callback) {
  fs.readFile(exports.paths.list, 'utf8', (err, data) => {
    var present = false;
    if (err) {
      console.error('Error', err);
    } else {
      console.log('Data: ', data);
      _.each(data.split('\n'), function(line) {
        if (url === line) {
          present = true;
        }
      });
    }
    return callback(present);
  });
};

exports.addUrlToList = function(url, callback) {
  if (!exports.isUrlInList(url, callback)) {
    fs.appendFile(exports.paths.list, url, (err) => {
      if (err) { throw err; }
      callback('Success');
    });
  }
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites + '/' + url, (err, files) => {
    if (err) {
      console.error(err);
      callback(false);
    } else {
      callback(true);
    }
  });
};

exports.downloadUrls = function(urls) {
  
};


//Testing the above functions.
exports.isUrlInList('', console.log);



