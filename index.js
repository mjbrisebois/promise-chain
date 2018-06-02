
if (Promise && Promise.chain === undefined) {
    Object.defineProperty(Promise, 'chain', {
	value: function (chain, all) {
	    if (all === undefined)
		all	= [];
	    var p	= chain.shift()
	    if (typeof p === 'function')
		p	= p.apply(all,all);
	    if (p === null || typeof p !== 'object' || typeof p.then !== 'function')
		return Promise.reject(Error("Chain method did not return a Promise object"));
	    return p.then(function(data) {
		all.push(data);
		if (chain.length)
		    return Promise.chain(chain, all);
		else
		    return Promise.resolve(all);
	    }, function(err) {
		return Promise.reject(err);
	    });
	}
    });
}

module.exports = Promise.chain;
