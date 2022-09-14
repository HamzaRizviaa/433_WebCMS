/* eslint-disable no-unused-vars */
export function makeid(length) {
	var result = '';
	var characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

/**
 *
 * @param {URLSearchParams} query - URLSearchParams instance
 * @param {object} queryObject - query parameters in form of key value pair
 * @returns {string} returns query params converted into string form like this "abc=xyz&foo=bar"
 */
 export function changeQueryParameters(query, queryObject) {
	Object.entries(queryObject).forEach(([key, value]) => {
		if (value) {
			query.set(key, value);
		} else {
			query.delete(key);
		}
	});
	return query.toString();
}
