'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:
function $Promise(executor){
	if(typeof executor !== 'function'){
		throw TypeError('The executor function was not a function!');
	}

	this._state = 'pending';
	this._value;
	this._handlerGroups = [];
	this.set = false;
	this.current;
	
	const resolve = function(data){
		this._internalResolve(data)

	}
	const reject = function(data){
		this._internalReject(data)

	}
	executor(resolve.bind(this),reject.bind(this)); //bind or arrow functions
}

$Promise.prototype._internalResolve = function (data) {
	if(this._state === 'pending'){
		this._value = data
		this._state = 'fulfilled'
	}
	if(this.set === true){
		for(var i = 0; i < this._handlerGroups.length; i++){
			this._handlerGroups[i].successCb(data);
			this._handlerGroups.splice(0,1);
			i--;
		}
	}
}

$Promise.prototype._internalReject = function (reason) {
	if(this._state === 'pending'){
		this._value = reason;
		this._state = 'rejected'
	}
	if(this.set === true){
		for(var i = 0; i < this._handlerGroups.length; i++){
			this._handlerGroups[i].errorCb(reason);
			// this._handlerGroups.splice(0,1);
			// this--;
		}

	}

}

$Promise.prototype.callHandlers = function(handler){
	handler(this._value);
}

$Promise.prototype.then = function(resFunc,rejFunc){
	if(typeof resFunc !== 'function'){
		resFunc = false;
	}
	if(typeof rejFunc !== 'function'){
		rejFunc = false;
	}

	let x = {successCb: resFunc,errorCb: rejFunc};
	this._handlerGroups.push(x);
	
	if(resFunc !== false){
		if(this._state === 'fulfilled'){
			this.callHandlers(resFunc);
		}
		this.set = true;
	}else{
		if(this._state === 'rejected'){
			this.callHandlers(rejFunc);
		}
		this.set = true;
		this.current = rejFunc;		
	}
	// this._handlerGroups.downstreamPromise = new $Promise;
}

$Promise.prototype.catch = function(opFunc){
	this.then(null,opFunc);
}

/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = $Promise;

So in a Node-based project we could write things like this:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
