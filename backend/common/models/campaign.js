'use strict';

module.exports = function(Campaign) {
		
	//Campaign.disableRemoteMethodByName('create');
	Campaign.disableRemoteMethodByName('replaceOrCreate');
	Campaign.disableRemoteMethodByName('patchOrCreate');
	Campaign.disableRemoteMethodByName('exists');
	//Campaign.disableRemoteMethodByName('findById');
	//Campaign.disableRemoteMethodByName('find');
	//Campaign.disableRemoteMethodByName('findOne');
	Campaign.disableRemoteMethodByName('destroyById');
	//Campaign.disableRemoteMethodByName('count');
	Campaign.disableRemoteMethodByName('replaceById');
	Campaign.disableRemoteMethodByName('prototype.patchAttributes');
	Campaign.disableRemoteMethodByName('createChangeStream');
	Campaign.disableRemoteMethodByName('updateAll');
	Campaign.disableRemoteMethodByName('upsertWithWhere');
						
	//Campaign.disableRemoteMethodByName('prototype.__get__country_list');
	Campaign.disableRemoteMethodByName('prototype.__create__country_list');
	Campaign.disableRemoteMethodByName('prototype.__update__country_list');
	Campaign.disableRemoteMethodByName('prototype.__destroy__country_list');
	Campaign.disableRemoteMethodByName('prototype.__delete__country_list');
	Campaign.disableRemoteMethodByName('prototype.__exists__country_list');
	//Campaign.disableRemoteMethodByName('prototype.__findById__country_list');
	Campaign.disableRemoteMethodByName('prototype.__destroyById__country_list');
	Campaign.disableRemoteMethodByName('prototype.__count__country_list');
	Campaign.disableRemoteMethodByName('prototype.__updateById__country_list');
	//Campaign.disableRemoteMethodByName('prototype.__link__country_list');
	//Campaign.disableRemoteMethodByName('prototype.__unlink__country_list');
	
	//Campaign.disableRemoteMethodByName('prototype.__get__constituency_list');
	Campaign.disableRemoteMethodByName('prototype.__create__constituency_list');
	Campaign.disableRemoteMethodByName('prototype.__update__constituency_list');
	Campaign.disableRemoteMethodByName('prototype.__destroy__constituency_list');
	Campaign.disableRemoteMethodByName('prototype.__delete__constituency_list');
	Campaign.disableRemoteMethodByName('prototype.__exists__constituency_list');
	//Campaign.disableRemoteMethodByName('prototype.__findById__constituency_list');
	Campaign.disableRemoteMethodByName('prototype.__destroyById__constituency_list');
	Campaign.disableRemoteMethodByName('prototype.__count__constituency_list');
	Campaign.disableRemoteMethodByName('prototype.__updateById__constituency_list');
	//Campaign.disableRemoteMethodByName('prototype.__link__constituency_list');
	//Campaign.disableRemoteMethodByName('prototype.__unlink__constituency_list');
	
	//Campaign.disableRemoteMethodByName('prototype.__get__call_list');
	Campaign.disableRemoteMethodByName('prototype.__create__call_list');
	Campaign.disableRemoteMethodByName('prototype.__update__call_list');
	Campaign.disableRemoteMethodByName('prototype.__destroy__call_list');
	Campaign.disableRemoteMethodByName('prototype.__delete__call_list');
	Campaign.disableRemoteMethodByName('prototype.__exists__call_list');
	//Campaign.disableRemoteMethodByName('prototype.__findById__call_list');
	Campaign.disableRemoteMethodByName('prototype.__destroyById__call_list');
	Campaign.disableRemoteMethodByName('prototype.__count__call_list');
	Campaign.disableRemoteMethodByName('prototype.__updateById__call_list');
	//Campaign.disableRemoteMethodByName('prototype.__link__call_list');
	//Campaign.disableRemoteMethodByName('prototype.__unlink__call_list');
	
	//Campaign.disableRemoteMethodByName('prototype.__get__parliamentarian_list');
	Campaign.disableRemoteMethodByName('prototype.__create__parliamentarian_list');
	Campaign.disableRemoteMethodByName('prototype.__update__parliamentarian_list');
	Campaign.disableRemoteMethodByName('prototype.__destroy__parliamentarian_list');
	Campaign.disableRemoteMethodByName('prototype.__delete__parliamentarian_list');
	Campaign.disableRemoteMethodByName('prototype.__exists__parliamentarian_list');
	//Campaign.disableRemoteMethodByName('prototype.__findById__parliamentarian_list');
	Campaign.disableRemoteMethodByName('prototype.__destroyById__parliamentarian_list');
	Campaign.disableRemoteMethodByName('prototype.__count__parliamentarian_list');
	Campaign.disableRemoteMethodByName('prototype.__updateById__parliamentarian_list');
	//Campaign.disableRemoteMethodByName('prototype.__link__parliamentarian_list');
	//Campaign.disableRemoteMethodByName('prototype.__unlink__parliamentarian_list');
			
	var app = require('../../server/server');
	
	Campaign.linkConstituenciesByNameSegment = function(campaign_id,name_segment,cb) {
		
		var Constituency = app.models.Constituency;
		
		Campaign.findOne({where: {id: campaign_id}}, function(err, campaign) {
						
			if(campaign != null)
			{					
				if(name_segment == "Germany")
				{		
					campaign.updateAttribute("is_federal_level",true,function(err, campaign){});
			
					Constituency.find({}, function(err, constituencies)
					{		  			
						var count = constituencies.length;
						constituencies.forEach(function(constituency) {
											
							campaign.constituency_list.remove(constituency.id, function(err) {
								
								campaign.constituency_list.add(constituency.id); 					
								
							});										

							//It will go out before finishing all the operations, but they'll continue in the background.
							//We do not need to return any info so it's okay.
							count--;
							if (count === 0)
							{
								cb(null, "Finished adding for all Germany");
							}						
								
						});

					});
				}
				else
				{
					/*Constituency.find({}, function(err, constituencies)
					{		  			
						var count = constituencies.length;
						constituencies.forEach(function(constituency) {
											
							campaign.constituency_list.remove(constituency.id, function(err) {
								
								campaign.constituency_list.add(constituency.id); 					
								
							});										

							//It will go out before finishing all the operations, but they'll continue in the background.
							//We do not need to return any info so it's okay.
							count--;
							if (count === 0)
							{
								cb(null, "Finished adding for filtered constituencies");
							}						
								
						});

					});*/
					
					cb(null, "Finished adding for filtered constituencies");
				}
				
			}				
							
		}); 		
    };
    Campaign.remoteMethod('linkConstituenciesByNameSegment', {
		accepts: [
				 {arg: 'campaign_id', type: 'string', required: true},
				 {arg: 'name_segment', type: 'string', required: true}
				],
        http: { path: '/linkConstituenciesByNameSegment', verb: 'post' },
        returns: { arg: 'result', type: 'object' },
		description: "Links constituencies that include name_segment on constituency_name to Campaign",
		notes: "If 'Germany' is given as a name_segment, it'll make the campaign federal and add all constituencies to it."
    }); 
	
};

//Campaign.find({where: {"campaign_code": "002"}, limit: 3}, function(err, campaigns) 
//Campaign.find({where: {constituency_list: [{constituency_code: '002'}]}, limit: 3}, function(err, campaigns) 

