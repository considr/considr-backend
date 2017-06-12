'use strict';

module.exports = function(Country) {

	Country.disableRemoteMethodByName('create');
	Country.disableRemoteMethodByName('replaceOrCreate');
	Country.disableRemoteMethodByName('patchOrCreate');
	Country.disableRemoteMethodByName('exists');
	//Country.disableRemoteMethodByName('findById');
	//Country.disableRemoteMethodByName('find');
	//Country.disableRemoteMethodByName('findOne');
	Country.disableRemoteMethodByName('destroyById');
	//Country.disableRemoteMethodByName('count');
	Country.disableRemoteMethodByName('replaceById');
	Country.disableRemoteMethodByName('prototype.patchAttributes');
	Country.disableRemoteMethodByName('createChangeStream');
	Country.disableRemoteMethodByName('updateAll');
	Country.disableRemoteMethodByName('upsertWithWhere');			
		
	//Country.disableRemoteMethodByName('prototype.__get__constituency_list');
	Country.disableRemoteMethodByName('prototype.__create__constituency_list');
	Country.disableRemoteMethodByName('prototype.__update__constituency_list');
	Country.disableRemoteMethodByName('prototype.__destroy__constituency_list');
	Country.disableRemoteMethodByName('prototype.__delete__constituency_list');
	Country.disableRemoteMethodByName('prototype.__exists__constituency_list');
	//Country.disableRemoteMethodByName('prototype.__findById__constituency_list');
	Country.disableRemoteMethodByName('prototype.__destroyById__constituency_list');
	Country.disableRemoteMethodByName('prototype.__count__constituency_list');
	Country.disableRemoteMethodByName('prototype.__updateById__constituency_list');
	Country.disableRemoteMethodByName('prototype.__link__constituency_list');
	Country.disableRemoteMethodByName('prototype.__unlink__constituency_list');
	
};
