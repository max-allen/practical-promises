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
}

$Promise.prototype._internalReject = function (reason) {
	if(this._state === 'pending'){
		this._value = reason;
		this._state = 'rejected'
	}
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
