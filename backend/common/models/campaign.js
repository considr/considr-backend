'use strict';

module.exports = function(Campaign) {
	Campaign.getCampaignsWithConstituency = function(fk,cb) {
        var response = "Yay! Hero did a good thing";
				
		Campaign.find({include: ['constituency_list'], limit: 3}, function(err, campaigns) 
		{ /* ... */ 						
			cb(null, campaigns);
		});					
				
    };
    Campaign.remoteMethod('getCampaignsWithConstituency', {
		accepts: {arg: 'fk', type: 'string'},
        http: { path: '/getCampaignsWithConstituency', verb: 'get' },
        returns: { arg: 'result', type: 'object' }
    }); 
};

//Campaign.find({where: {"campaign_code": "002"}, limit: 3}, function(err, campaigns) 
//Campaign.find({where: {constituency_list: [{constituency_code: '002'}]}, limit: 3}, function(err, campaigns) 

