"use strict";
/* eslint no-unused-vars:0, camelcase:0 */
// This script should be run from the commandline, when you"re in the root
// level of the venzee-api repository.

var server = require("./server");
var dataSource = server.dataSources.ifreight;

// load details of OAuth models
//var oauth = require("../node_modules/loopback-component-oauth2/lib/models/oauth2-models.js")(dataSource);

var models = [
  "ACL",
  "shipper",
  "trucker",
  "load"
];


models.forEach(function (modelName) {

  dataSource.isActual(modelName, function (err, actual) {
    if (err) {
      throw err;
    }

    if (actual) {
      console.log("actual: " + modelName);
    } else {
      console.log("not actual: " + modelName);
      dataSource.autoupdate(modelName, function (er) {

        if (er) {
          throw er;
        }
        console.log("created table " + modelName);
      });
    }
  });
});
