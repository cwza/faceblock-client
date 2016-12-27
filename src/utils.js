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

export {parseTimeStrFieldToDate, deletePropertiesFromObject};
