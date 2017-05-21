// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-database
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.considr_db;
ds.autoupdate('Campaign', function(err) {
  if (err) throw err;

  var campaigns = 
  [
	  {
		"draft": true,
		"active": false,
		"last_updated": "2017-05-13T11:48:03.158Z",
		"creation_date": "2017-05-13T11:48:03.158Z",
		"campaign_picture_path": "http:",
		"campaign_code": "001",
		"creator_campaign": "Test1",
		"title": "First Campaign",
		"description": "This is the first campaign's description",
		"reason": "This is the reason why",
		"script": "This is the script",
		"is_parliamentarians_predefined": true,
		"is_federal_level": true
	  },
	  {
		"draft": true,
		"active": false,
		"last_updated": "2017-05-13T11:48:03.158Z",
		"creation_date": "2017-05-13T11:48:03.158Z",
		"campaign_picture_path": "http:",
		"campaign_code": "002",
		"creator_campaign": "Test2",
		"title": "Second Campaign",
		"description": "This is the second campaign's description",
		"reason": "This is the reason why",
		"script": "This is the script",
		"is_parliamentarians_predefined": false,
		"is_federal_level": false
	  }
	];
  var count = campaigns.length;
  campaigns.forEach(function(campaign) {
    app.models.Campaign.create(campaign, function(err, model) {
      if (err) throw err;

      console.log('Created:', model);

      count--;
      if (count === 0)
        ds.disconnect();
    });
  });
});