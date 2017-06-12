'use strict';

module.exports = function(Call) {
	
	//Call.disableRemoteMethodByName('create');
	Call.disableRemoteMethodByName('replaceOrCreate');
	Call.disableRemoteMethodByName('patchOrCreate');
	Call.disableRemoteMethodByName('exists');
	//Call.disableRemoteMethodByName('findById');
	//Call.disableRemoteMethodByName('find');
	//Call.disableRemoteMethodByName('findOne');
	Call.disableRemoteMethodByName('destroyById');
	//Call.disableRemoteMethodByName('count');
	Call.disableRemoteMethodByName('replaceById');
	Call.disableRemoteMethodByName('prototype.patchAttributes');
	Call.disableRemoteMethodByName('createChangeStream');
	Call.disableRemoteMethodByName('updateAll');
	Call.disableRemoteMethodByName('upsertWithWhere');			
		
	//Call.disableRemoteMethodByName('prototype.__get__from_campaign');
	Call.disableRemoteMethodByName('prototype.__create__from_campaign');
	Call.disableRemoteMethodByName('prototype.__update__from_campaign');
	Call.disableRemoteMethodByName('prototype.__destroy__from_campaign');
	Call.disableRemoteMethodByName('prototype.__delete__from_campaign');
	Call.disableRemoteMethodByName('prototype.__exists__from_campaign');
	//Call.disableRemoteMethodByName('prototype.__findById__from_campaign');
	Call.disableRemoteMethodByName('prototype.__destroyById__from_campaign');
	Call.disableRemoteMethodByName('prototype.__count__from_campaign');
	Call.disableRemoteMethodByName('prototype.__updateById__from_campaign');
	//Call.disableRemoteMethodByName('prototype.__link__from_campaign');
	//Call.disableRemoteMethodByName('prototype.__unlink__from_campaign');
	
	//Call.disableRemoteMethodByName('prototype.__get__participant_constituency');
	Call.disableRemoteMethodByName('prototype.__create__participant_constituency');
	Call.disableRemoteMethodByName('prototype.__update__participant_constituency');
	Call.disableRemoteMethodByName('prototype.__destroy__participant_constituency');
	Call.disableRemoteMethodByName('prototype.__delete__participant_constituency');
	Call.disableRemoteMethodByName('prototype.__exists__participant_constituency');
	//Call.disableRemoteMethodByName('prototype.__findById__participant_constituency');
	Call.disableRemoteMethodByName('prototype.__destroyById__participant_constituency');
	Call.disableRemoteMethodByName('prototype.__count__participant_constituency');
	Call.disableRemoteMethodByName('prototype.__updateById__participant_constituency');
	//Call.disableRemoteMethodByName('prototype.__link__participant_constituency');
	//Call.disableRemoteMethodByName('prototype.__unlink__participant_constituency');
	
	//Call.disableRemoteMethodByName('prototype.__get__participant_postal_code');
	Call.disableRemoteMethodByName('prototype.__create__participant_postal_code');
	Call.disableRemoteMethodByName('prototype.__update__participant_postal_code');
	Call.disableRemoteMethodByName('prototype.__destroy__participant_postal_code');
	Call.disableRemoteMethodByName('prototype.__delete__participant_postal_code');
	Call.disableRemoteMethodByName('prototype.__exists__participant_postal_code');
	//Call.disableRemoteMethodByName('prototype.__findById__participant_postal_code');
	Call.disableRemoteMethodByName('prototype.__destroyById__participant_postal_code');
	Call.disableRemoteMethodByName('prototype.__count__participant_postal_code');
	Call.disableRemoteMethodByName('prototype.__updateById__participant_postal_code');
	//Call.disableRemoteMethodByName('prototype.__link__participant_postal_code');
	//Call.disableRemoteMethodByName('prototype.__unlink__participant_postal_code');
	
	//Call.disableRemoteMethodByName('prototype.__get__to_parliamentarian');
	Call.disableRemoteMethodByName('prototype.__create__to_parliamentarian');
	Call.disableRemoteMethodByName('prototype.__update__to_parliamentarian');
	Call.disableRemoteMethodByName('prototype.__destroy__to_parliamentarian');
	Call.disableRemoteMethodByName('prototype.__delete__to_parliamentarian');
	Call.disableRemoteMethodByName('prototype.__exists__to_parliamentarian');
	//Call.disableRemoteMethodByName('prototype.__findById__to_parliamentarian');
	Call.disableRemoteMethodByName('prototype.__destroyById__to_parliamentarian');
	Call.disableRemoteMethodByName('prototype.__count__to_parliamentarian');
	Call.disableRemoteMethodByName('prototype.__updateById__to_parliamentarian');
	//Call.disableRemoteMethodByName('prototype.__link__to_parliamentarian');
	//Call.disableRemoteMethodByName('prototype.__unlink__to_parliamentarian');
	
	var app = require('../../server/server');
	
	Call.addCallToCampaignWithResult = function(campaign_id, constituency_code, parliamentarian_id, call_completed, call_result, call_starts, cb) {
		
		var Campaign = app.models.Campaign;	
		var Parliamentarian = app.models.Parliamentarian;	
		var Constituency = app.models.Constituency;
		
		Campaign.findOne({where: {id: campaign_id}}, function(err, campaign) {
			
			Parliamentarian.findOne({where: {id: parliamentarian_id}}, function(err, parliamentarian) {
					
				Constituency.findOne({where: {constituency_code: constituency_code}}, function(err, constituency) {
						  
					if(campaign != null && parliamentarian != null && constituency != null)
					{	
						var new_call = {
							"call_completed": call_completed,
							"call_result": call_result,
							"call_starts": call_starts,
							"call_ends": Date.now()
						};
				
						Call.create(new_call, function(err, call) {
						  
						  if (err) {
							  
							  cb(null, "Couldn't create Call with data provided");
						  }
						  else
						  {
							  call.from_campaign.add(campaign.id); 
							  call.to_parliamentarian.add(parliamentarian.id); 
							  call.participant_constituency.add(constituency.id); 
								
							  cb(null, call);
						  }

						});
					}	  
						  
				});
				
		    });
						
		}); 	
    }
	
	Call.remoteMethod('addCallToCampaignWithResult', {
          accepts: [
				 {arg: 'campaign_id', type: 'string', required: true},
				 {arg: 'constituency_code', type: 'string', required: true},
				 {arg: 'parliamentarian_id', type: 'string', required: true},
				 {arg: 'call_completed', type: 'boolean', required: true},
				 {arg: 'call_result', type: 'string', required: true},
				 {arg: 'call_starts', type: 'date', required: true}
				],		  
          returns: {arg: 'result', type: 'object'},
		  http: {path: '/addCallToCampaignWithResult', verb: 'post'},
		  description: "On giving Campaign feedback, it creates a Call instance to record the information about the outcome of the Call"
    });
};
