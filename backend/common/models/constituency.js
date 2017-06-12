'use strict';

module.exports = function(Constituency) {

	//Constituency.disableRemoteMethodByName('create');
	Constituency.disableRemoteMethodByName('replaceOrCreate');
	Constituency.disableRemoteMethodByName('patchOrCreate');
	Constituency.disableRemoteMethodByName('exists');
	//Constituency.disableRemoteMethodByName('findById');
	//Constituency.disableRemoteMethodByName('find');
	//Constituency.disableRemoteMethodByName('findOne');
	Constituency.disableRemoteMethodByName('destroyById');
	//Constituency.disableRemoteMethodByName('count');
	Constituency.disableRemoteMethodByName('replaceById');
	Constituency.disableRemoteMethodByName('prototype.patchAttributes');
	Constituency.disableRemoteMethodByName('createChangeStream');
	Constituency.disableRemoteMethodByName('updateAll');
	Constituency.disableRemoteMethodByName('upsertWithWhere');			
		
	Constituency.disableRemoteMethodByName('prototype.__get__postal_code_list');
	Constituency.disableRemoteMethodByName('prototype.__create__postal_code_list');
	Constituency.disableRemoteMethodByName('prototype.__update__postal_code_list');
	Constituency.disableRemoteMethodByName('prototype.__destroy__postal_code_list');
	Constituency.disableRemoteMethodByName('prototype.__delete__postal_code_list');
	Constituency.disableRemoteMethodByName('prototype.__exists__postal_code_list');
	Constituency.disableRemoteMethodByName('prototype.__findById__postal_code_list');
	Constituency.disableRemoteMethodByName('prototype.__destroyById__postal_code_list');
	Constituency.disableRemoteMethodByName('prototype.__count__postal_code_list');
	Constituency.disableRemoteMethodByName('prototype.__updateById__postal_code_list');
	Constituency.disableRemoteMethodByName('prototype.__link__postal_code_list');
	Constituency.disableRemoteMethodByName('prototype.__unlink__postal_code_list');
	
	//Constituency.disableRemoteMethodByName('prototype.__get__parliamentarian_list');
	Constituency.disableRemoteMethodByName('prototype.__create__parliamentarian_list');
	Constituency.disableRemoteMethodByName('prototype.__update__parliamentarian_list');
	Constituency.disableRemoteMethodByName('prototype.__destroy__parliamentarian_list');
	Constituency.disableRemoteMethodByName('prototype.__delete__parliamentarian_list');
	Constituency.disableRemoteMethodByName('prototype.__exists__parliamentarian_list');
	//Constituency.disableRemoteMethodByName('prototype.__findById__parliamentarian_list');
	Constituency.disableRemoteMethodByName('prototype.__destroyById__parliamentarian_list');
	Constituency.disableRemoteMethodByName('prototype.__count__parliamentarian_list');
	Constituency.disableRemoteMethodByName('prototype.__updateById__parliamentarian_list');
	Constituency.disableRemoteMethodByName('prototype.__link__parliamentarian_list');
	Constituency.disableRemoteMethodByName('prototype.__unlink__parliamentarian_list');
	
	//Constituency.disableRemoteMethodByName('prototype.__get__campaign_list');
	Constituency.disableRemoteMethodByName('prototype.__create__campaign_list');
	Constituency.disableRemoteMethodByName('prototype.__update__campaign_list');
	Constituency.disableRemoteMethodByName('prototype.__destroy__campaign_list');
	Constituency.disableRemoteMethodByName('prototype.__delete__campaign_list');
	Constituency.disableRemoteMethodByName('prototype.__exists__campaign_list');
	//Constituency.disableRemoteMethodByName('prototype.__findById__campaign_list');
	Constituency.disableRemoteMethodByName('prototype.__destroyById__campaign_list');
	Constituency.disableRemoteMethodByName('prototype.__count__campaign_list');
	Constituency.disableRemoteMethodByName('prototype.__updateById__campaign_list');
	//Constituency.disableRemoteMethodByName('prototype.__link__campaign_list');
	//Constituency.disableRemoteMethodByName('prototype.__unlink__campaign_list');

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