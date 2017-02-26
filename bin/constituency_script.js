// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-database
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.considr_db;
ds.automigrate('Constituency', function(err) {
  if (err) throw err;

  var constituencies = 
  [
	  
  ];
  var count = constituencies.length;
  constituencies.forEach(function(constituency) {	  
    app.models.Constituency.create(constituency, function(err, model) {
      if (err) throw err;

      console.log('Created:', model);

      count--;
      if (count === 0)
        ds.disconnect();
    });
  });
});