'use strict';

module.exports = function(Constituency) {

	var app = require('../../server/server');
	
	Constituency.listOfCampaignsFromConstituencyCode = function(constituency_code, cb) {
		
		var Campaign = app.models.Campaign;	
		
		if(constituency_code == "Germany")
		{
			Campaign.find({where: {is_federal_level: true}}, function(err, campaigns) {
									
				if(campaigns != null)
				{	
					cb(null, campaigns);
				}	
				else
				{
					cb(null, "No found Campaigns");
				}					
								
			}); 
		}
		else
		{	
			Constituency.findOne({where: {constituency_code: constituency_code},include: "campaign_list"}, function(err, constituency) {
									
				if(constituency != null)
				{		
					
					cb(null, constituency.campaign_list());
				}	
				else
				{
					cb(null, "Constituency not found");
				}					
								
			}); 			
		}		
    }

    Constituency.remoteMethod('listOfCampaignsFromConstituencyCode', {
          accepts: {arg: 'constituency_code', type: 'string', required: true},
          returns: {arg: 'result', type: 'object'},
		  http: {path: '/listOfCampaignsFromConstituencyCode', verb: 'get'},
		  description: "Takes constituency_code and returns a list of campaigns for that constituency",
		  notes: "If 'Germany' is given as a constituency_code, it'll display all federal level campaigns"
    });
	
	Constituency.listOfParliamentariansFromConstituencyCode = function(constituency_code, cb) {
		
		var Parliamentarian = app.models.Campaign;	
				
		Constituency.findOne({where: {constituency_code: constituency_code},include: "parliamentarian_list"}, function(err, constituency) {
								
			if(constituency != null)
			{		
				
				cb(null, constituency.parliamentarian_list());
			}	
			else
			{
				cb(null, "Constituency not found");
			}					
							
		}); 		
				
    }
	
	Constituency.remoteMethod('listOfParliamentariansFromConstituencyCode', {
          accepts: {arg: 'constituency_code', type: 'string', required: true},
          returns: {arg: 'result', type: 'object'},
		  http: {path: '/listOfParliamentariansFromConstituencyCode', verb: 'get'},
		  description: "Takes constituency_code and returns a list of parliamentarians for that constituency"
    });

};