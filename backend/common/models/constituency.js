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
	
	Constituency.listOfParliamentariansFromCampaignIdOrConstituencyCode = function(campaign_id, constituency_code, cb) {
		
		var Campaign = app.models.Campaign;	
		
		Campaign.findOne({where: {id: campaign_id},include: "parliamentarian_list"}, function(err, campaign) {
						
			if(campaign != null)
			{				
				if(campaign.is_parliamentarians_predefined)	
				{
					cb(null, campaign.parliamentarian_list());
				}	
				else
				{
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
			}		
							
		}); 	
    }
	
	Constituency.remoteMethod('listOfParliamentariansFromCampaignIdOrConstituencyCode', {
          accepts: [
				 {arg: 'campaign_id', type: 'string', required: true},
				 {arg: 'constituency_code', type: 'string', required: true},
				],		  
          returns: {arg: 'result', type: 'object'},
		  http: {path: '/listOfParliamentariansFromCampaignIdOrConstituencyCode', verb: 'get'},
		  description: "Takes campaign_id and constituency_code and returns a list of parliamentarians for that campaign (if predetermind) or that constituency (if not)"
    });
	
	

};