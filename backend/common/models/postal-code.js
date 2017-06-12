'use strict';

module.exports = function(PostalCode) {

	PostalCode.disableRemoteMethodByName('create');
	PostalCode.disableRemoteMethodByName('replaceOrCreate');
	PostalCode.disableRemoteMethodByName('patchOrCreate');
	PostalCode.disableRemoteMethodByName('exists');
	PostalCode.disableRemoteMethodByName('findById');
	PostalCode.disableRemoteMethodByName('find');
	PostalCode.disableRemoteMethodByName('findOne');
	PostalCode.disableRemoteMethodByName('destroyById');
	PostalCode.disableRemoteMethodByName('count');
	PostalCode.disableRemoteMethodByName('replaceById');
	PostalCode.disableRemoteMethodByName('prototype.patchAttributes');
	PostalCode.disableRemoteMethodByName('createChangeStream');
	PostalCode.disableRemoteMethodByName('updateAll');
	PostalCode.disableRemoteMethodByName('upsertWithWhere');	
	
};
