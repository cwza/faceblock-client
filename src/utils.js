const removeSpecialWordFromQuery = (queryStr) => {
  if(queryStr.length === 1 && '#.`'.includes(queryStr)) {
    return '';
  }
  if(queryStr) {
    return queryStr.replace(/[&\/\\,+()$~%'":?<>{}!=^\[\]\\]/g,'');
  }
  return '';
}

const createUrlByParams = (base, params) => {
  let result = Object.keys(params).reduce((paramStr, key) => {
    return paramStr + key + '=' + params[key] + '&';
  }, base);
  return encodeURI(result.slice(0, result.length-1));
}

const parseTimeStrFieldToDate = (obj, fields) => {
  return Object.keys(obj)
    .filter(key => fields.includes(key))
    .reduce((result, key) => {
      result[key] = new Date(obj[key])
      return result;
    }, {...obj});
}

const deletePropertiesFromObject = (obj, properties) => {
  return Object.keys(obj)
    .filter(key => !properties.includes(key))
    .reduce((result, key) => {
      result[key] = obj[key];
      return result;
    }, {});
}

const getMailUsername = (emailAddress) => {
   return emailAddress.match(/^(.+)@/)[1];
}

export {
  parseTimeStrFieldToDate, deletePropertiesFromObject, createUrlByParams,
  removeSpecialWordFromQuery, getMailUsername
 };
