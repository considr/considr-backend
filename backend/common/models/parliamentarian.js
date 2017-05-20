'use strict';

module.exports = function(Parliamentarian) {

	var app = require('../../server/server');

	
	Parliamentarian.link_parliamentarians_to_constituencies = function(cb) {
				  
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

    Parliamentarian.remoteMethod('link_parliamentarians_to_constituencies', {          
          returns: {arg: 'result', type: 'string'}
    });
};
