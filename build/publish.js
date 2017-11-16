'use strict'
// Publish to Github Pages
var fs = require('fs');
var exec = require('child_process').exec;
var ncp = require('ncp').ncp;
var rimraf = require('rimraf');
var path = require('path');

function publish () {
  exec('npm run build', function() {
    // copy the dist build folder into .publish
    ncp('dist', '.publish', function(err) {
      if(err) {
        return console.error(err);
      } else {
        prepareForPublish();
      }
    });
  }).stderr.pipe(process.stderr);
}

// prepare index includes to be served by gh-pages
function prepareForPublish () {
  fs.readFile('.publish/index.html', 'utf-8', function (err, data) {
    if (err) {
      console.error(err);
    } else {
      pushToGithub();
    }

    var newData = data.replace(/src=\//g, 'src=').replace(/href=\//g, 'href=');
    fs.writeFile('.publish/index.html', newData, 'utf-8', function(err) {
      if (err) throw err;
    })
  });
}

function pushToGithub () {
  ghpages.publish(path.join(__dirname, '../.publish'), function(err) {
    console.log('Error publishing to gh-pages branch...');
    console.log(err);
  });
}

// Remove existing publish folder if it exists
if (fs.existsSync('.publish')) {
    rimraf('.publish', function () {
        publish();
    });
} else {
    publish();
}
