export const queryString = (data) => {
	if (!data && item.data != '' && item.data != undefined) return ''
	return  '?' + cleanArray(Object.keys(data).map(key => {
		if (data[key] === undefined) return ''
		return encodeURIComponent(key) + '=' +
			encodeURIComponent(data[key])
	})).join('&')
}

function cleanArray(actual) {
   const newArray = []
   for (let i = 0; i < actual.length; i++) {
     if (actual[i]) {
       newArray.push(actual[i])
     }
   }
   return newArray
 }


export default {
	queryString,
}
