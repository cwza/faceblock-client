const createUrlByParams = (base, params) => {
  let result = Object.keys(params).reduce((paramStr, key) => {
    return paramStr + key + '=' + params[key] + '&';
  }, base);
  return encodeURI(result.slice(0, result.length-1));
}

const parseTimeStrFieldToDate = (obj, fields) => {
  let result = {...obj};
  Object.keys(obj).filter(key => fields.includes(key))
    .forEach(key => result[key] = new Date(obj[key]))
  return result;
}

let deletePropertiesFromObject = (obj, properties) => {
  let returnedObj = {};
  Object.keys(obj)
    .filter(key => !properties.includes(key))
    .forEach(key => returnedObj[key] = obj[key]);
  return returnedObj;
}

export {parseTimeStrFieldToDate, deletePropertiesFromObject, createUrlByParams};
