
const chain = function (sequence, all) {
    if (all === undefined)
	all				= [];
    
    var p				= sequence.shift()
    
    if ( typeof p === 'function' && typeof p.then !== 'function' )
	p				= p.apply(all,all);
    
    if (p === null || typeof p !== 'object' || typeof p.then !== 'function')
	return Promise.reject( Error("Array item did not return a Promise object: " + typeof p) );
    
    return p.then(function(data) {
	all.push(data);
	if (sequence.length)
	    return chain(sequence, all);
	else
	    return Promise.resolve(all);
    }, function(err) {
	return Promise.reject(err);
    });
}

if (Promise && Promise.chain === undefined) {
    Object.defineProperty(Promise, 'chain', {
	value: chain
    });
}

module.exports = chain;
