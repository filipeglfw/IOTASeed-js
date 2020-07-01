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

function getStrongRandomInteger(min, max) {
  const range = max - min;
  const maxGeneratedValue = Math.pow(2,32)-1;
  const possibleResultValues = range + 1;
  const possibleGeneratedValues = maxGeneratedValue + 1;
  const remainder = possibleGeneratedValues % possibleResultValues;
  const maxUnbiased = maxGeneratedValue - remainder;

  if (!Number.isInteger(min) || !Number.isInteger(max) ||
       max > Number.MAX_SAFE_INTEGER || min < Number.MIN_SAFE_INTEGER) {
    throw new Error('Arguments must be safe integers.');
  } else if (range > maxGeneratedValue) {
    throw new Error(`Range of ${range} (from ${min} to ${max}) > ${maxGeneratedValue}.`);
  } else if (max < min) {
    throw new Error(`max (${max}) must be >= min (${min}).`);
  } else if (min === max) {
    return min;
  } 

  let generated;
  do {
    generated = getStrongRandom()*maxGeneratedValue;
  } while (generated > maxUnbiased);

  return min + (generated % possibleResultValues);
};

function IOTASeed() {
	let seed = [];
	while (seed.length < 80) {
		let rdn = Math.floor(getStrongRandomInteger(0,27));
		let seedChar = rdn == 0 ? 9 : String.fromCharCode(rdn+64);
		seed.push(seedChar);
	}
	if(seed.indexOf(9) < 0) {
		let idx = Math.floor(getStrongRandomInteger(0,80));
		seed.splice(idx,0,9);
	} else {
		let rdn = Math.floor(getStrongRandomInteger(0,27));
		let seedChar = rdn == 0 ? 9 : String.fromCharCode(rdn+64);
		seed.push(seedChar);
	}
	return seed.join("")
}
