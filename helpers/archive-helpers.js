var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var scraper = require('website-scraper');

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
  var present = false;
  exports.readListOfUrls((data) => {
    _.each(data.split('\n'), function(line) {
      if (url === line) {
        present = true;
      }
    });
  });
  callback(present);
};

exports.addUrlToList = function(url, callback) {
  exports.isUrlInList(url, function(present) {
    if (!present) {
      fs.appendFile(exports.paths.list, '\n' + url, (err) => {
        if (err) {
          console.error(err);
        }
        console.log('Success');
        callback(false);
      });
    } else {
      console.log(`${url} already in list.`);
      callback(true);
    }
  });
  
  // var present = exports.isUrlInList(url, callback);
  // if (!present) {
  //   fs.appendFile(exports.paths.list, '\n' + url, (err) => {
  //     if (err) { throw err; }
  //     callback('Success');
  // } else {
  //   callback('URL already in List');
  // }
};

exports.isUrlArchived = function(url, callback) {
  var link = exports.removeProtocol(url);
  fs.readdir(exports.paths.archivedSites + '/' + link, (err, files) => {
    if (err) {
      // // console.log('Error occured in reading directory');
      // console.log(`${link} directory not created`);
      // throw err;
      callback(false);
    } else {
      callback(true);
    }
  });
};

exports.downloadUrls = function(links) {

  //TODO: Check to see if the file has been downloaded before.
  for (let i = 0; i < links.length; i++) {
    
    //check if page has been archived.
    exports.isUrlArchived(links[i], (truth) => {
      if (truth) {
        // console.log(links[i], 'Archived already');
      } else {
        var link = exports.removeProtocol(links[i]);
        // console.log(link);
        var options = {
          urls: links[i],
          directory: exports.paths.archivedSites + '/' + link
        };
        // console.log('about to scrape, options:', options);
        scraper(options, (err, result) => {
          if (err) {
            throw err;
          } else {
            console.log('Sucessfully downloaded', result);
          }
        });
      }
    });
  }
};

exports.removeProtocol = function(url) {
  return url.replace(/(^\w+:|^)\/\//, '');
};