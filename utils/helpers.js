export function objectSort( src ) {
	const keys = Object.keys( src );
	keys.sort();
	return keys.reduce(( target, key ) => {
		target[ key ] = src[ key ];
		return target;
	}, {});
};