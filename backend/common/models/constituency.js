'use strict';

module.exports = function(Constituency) {

	Constituency.greet = function(msg, cb) {
      cb(null, 'Greetings... ' + msg);
    }

    Constituency.remoteMethod('greet', {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'result', type: 'string'}
    });

};