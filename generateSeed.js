function getStrongRandom() {
    let arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    let n = arr[0];
    let max = Math.pow(2,32)-1;
    return n/max
}

function getStrongRandomArbitrary(min, max) {
    return getStrongRandom() * (max - min) + min;
}

function IOTASeed() {
	let seed = [];
	while (seed.length < 80) {
		let rdn = Math.floor(getStrongRandomArbitrary(0,27));
		let seedChar = rdn == 0 ? 9 : String.fromCharCode(rdn+64);
		seed.push(seedChar);
	}
	if(seed.indexOf(9) < 0) {
		let idx = Math.floor(getStrongRandomArbitrary(0,80));
		seed.splice(idx,0,9);
	} else {
		let rdn = Math.floor(getStrongRandomArbitrary(0,27));
		let seedChar = rdn == 0 ? 9 : String.fromCharCode(rdn+64);
		seed.push(seedChar);
	}
	return seed.join("")
}
