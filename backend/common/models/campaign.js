'use strict';

module.exports = function(Campaign) {
		
	var app = require('../../server/server');
	
	Campaign.linkConstituenciesByNameSegment = function(id,name_segment,cb) {
		
		var Constituency = app.models.Constituency;
		
		Campaign.findOne({where: {id: id}}, function(err, campaign) {
						
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
				 {arg: 'id', type: 'string', required: true},
				 {arg: 'name_segment', type: 'string', required: true}
				],
        http: { path: '/linkConstituenciesByNameSegment', verb: 'get' },
        returns: { arg: 'result', type: 'object' },
		description: "Links constituencies that include name_segment on constituency_name to Campaign",
		notes: "If 'Germany' is given as a name_segment, it'll make the campaign federal and add all constituencies to it."
    }); 
	
};

//Campaign.find({where: {"campaign_code": "002"}, limit: 3}, function(err, campaigns) 
//Campaign.find({where: {constituency_list: [{constituency_code: '002'}]}, limit: 3}, function(err, campaigns) 

