'use strict';

module.exports = function(Parliamentarian) {

	Parliamentarian.disableRemoteMethodByName('create');
	Parliamentarian.disableRemoteMethodByName('replaceOrCreate');
	Parliamentarian.disableRemoteMethodByName('patchOrCreate');
	Parliamentarian.disableRemoteMethodByName('exists');
	//Parliamentarian.disableRemoteMethodByName('findById');
	//Parliamentarian.disableRemoteMethodByName('find');
	//Parliamentarian.disableRemoteMethodByName('findOne');
	Parliamentarian.disableRemoteMethodByName('destroyById');
	//Parliamentarian.disableRemoteMethodByName('count');
	Parliamentarian.disableRemoteMethodByName('replaceById');
	Parliamentarian.disableRemoteMethodByName('prototype.patchAttributes');
	Parliamentarian.disableRemoteMethodByName('createChangeStream');
	Parliamentarian.disableRemoteMethodByName('updateAll');
	Parliamentarian.disableRemoteMethodByName('upsertWithWhere');			
		
	//Parliamentarian.disableRemoteMethodByName('prototype.__get__campaign_list');
	Parliamentarian.disableRemoteMethodByName('prototype.__create__campaign_list');
	Parliamentarian.disableRemoteMethodByName('prototype.__update__campaign_list');
	Parliamentarian.disableRemoteMethodByName('prototype.__destroy__campaign_list');
	Parliamentarian.disableRemoteMethodByName('prototype.__delete__campaign_list');
	Parliamentarian.disableRemoteMethodByName('prototype.__exists__campaign_list');
	//Parliamentarian.disableRemoteMethodByName('prototype.__findById__campaign_list');
	Parliamentarian.disableRemoteMethodByName('prototype.__destroyById__campaign_list');
	Parliamentarian.disableRemoteMethodByName('prototype.__count__campaign_list');
	Parliamentarian.disableRemoteMethodByName('prototype.__updateById__campaign_list');
	//Parliamentarian.disableRemoteMethodByName('prototype.__link__campaign_list');
	//Parliamentarian.disableRemoteMethodByName('prototype.__unlink__campaign_list');
	
	//Parliamentarian.disableRemoteMethodByName('prototype.__get__constituency');
	Parliamentarian.disableRemoteMethodByName('prototype.__create__constituency');
	Parliamentarian.disableRemoteMethodByName('prototype.__update__constituency');
	Parliamentarian.disableRemoteMethodByName('prototype.__destroy__constituency');
	Parliamentarian.disableRemoteMethodByName('prototype.__delete__constituency');
	Parliamentarian.disableRemoteMethodByName('prototype.__exists__constituency');
	//Parliamentarian.disableRemoteMethodByName('prototype.__findById__constituency');
	Parliamentarian.disableRemoteMethodByName('prototype.__destroyById__constituency');
	Parliamentarian.disableRemoteMethodByName('prototype.__count__constituency');
	Parliamentarian.disableRemoteMethodByName('prototype.__updateById__constituency');
	Parliamentarian.disableRemoteMethodByName('prototype.__link__constituency');
	Parliamentarian.disableRemoteMethodByName('prototype.__unlink__constituency');
	
	var app = require('../../server/server');
	
	Parliamentarian.linkParliamentariansToConstituencies = function(cb) {
				  
		var Constituency = app.models.Constituency;
				
		Parliamentarian.find({}, function(err, parliamentarians)
		{		  			
			var count = parliamentarians.length;
			parliamentarians.forEach(function(parliamentarian) {
				
				Constituency.findOne({where: {constituency_code: parliamentarian.constituency_number}}, function(err, constituency) {
					
					if(constituency != null)
					{					
						parliamentarian.constituency.remove(constituency.id, function(err) {
							
							parliamentarian.constituency.add(constituency.id); 					
							
						});		
						
					}	

					//It will go out before finishing all the operations, but they'll continue in the background.
					//We do not need to return any info so it's okay.
					count--;
					if (count === 0)
					{
						cb(null, "Finished");
					}						
									
				}); 
			});

		});
	  
    }

    Parliamentarian.remoteMethod('linkParliamentariansToConstituencies', {          
          returns: {arg: 'result', type: 'string'},
		  description: "Re-links all Parliamentarians to their relevant Constituencies and viceversa"
    });
};
