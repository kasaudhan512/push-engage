var mysql = require('mysql');
function handleMasterDisconnect() {

    var masterPool = mysql.createPool({
    	connectionLimit : POOL_CONNECTION_COUNT,
        host     : HOST,
        user     : USER,
        password : PASSWORD,
        database : DATABASE,
        supportBigNumbers : true,
        bigNumberStrings : true,
		dateStrings : true
    });
	global.masterPool = masterPool;
	masterPool.on('enqueue', function(){console.log('handleMasterDisconnect conn queued')});
	masterPool.on('dequeue', function(){console.log('handleMasterDisconnect conn dequeued')});
}

function handleSlaveDisconnect() {

    var slavePool = mysql.createPool({
        connectionLimit : POOL_CONNECTION_COUNT_SLAVE,
        host     : HOST_SLAVE,
        user     : USER_SLAVE,
        password : PASSWORD_SLAVE,
        database : DATABASE_SLAVE,
        supportBigNumbers : true,
        bigNumberStrings : true,
		dateStrings : true
    });

	global.slavePool = slavePool;
	slavePool.on('enqueue', function(){console.log('handleSlaveDisconnect conn queued')});
	slavePool.on('dequeue', function(){console.log('handleSlaveDisconnect conn dequeued')});
}

setInterval(function() {
	// console.log("Master Connection Free -> ", masterPool._freeConnections.length);
	// console.log("Salve Connection Free -> ", slavePool._freeConnections.length);
}, 1000)



global.masterExecute = function(statement, parameters, callback){

    masterPool.query(statement,parameters,function(err,rows){
    	if(err) {
    		console.error(err);
    		throw err;
    		return;
    	}
    	return callback(err,rows);
    });
}

global.slaveExecute = function(statement, parameters, callback){
    slavePool.query(statement,parameters,function(err,rows){
    	if(err) {
    		console.error(err);
    		throw err;
    		return;
    	}
    	return callback(err,rows);
    });
}

global.slaveExecutePromisified = function(statement, parameters){
	return new Promise(function(resolve, reject) {
        slavePool.query(statement,parameters,function(err,rows){
        	console.log(this.sql);
        	if(err) {
        		console.error(err);
        		return reject(err);
        	}
        	return resolve(rows);
        });
	});		
}

global.masterExecutePromisified = function(statement, parameters){
	return new Promise(function(resolve, reject) {
        masterPool.query(statement,parameters,function(err,rows){
        	console.log(this.sql);
        	if(err) {
        		console.error(err);
        		return reject(err);
        	}
        	return resolve(rows);
        });
	});		
}

handleMasterDisconnect();
handleSlaveDisconnect();