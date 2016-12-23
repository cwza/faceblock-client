const parseTimeStrFieldToDate = (obj, fields) => {
  let result = {...obj};
  Object.keys(obj).filter(key => fields.includes(key))
    .forEach(key => result[key] = new Date(obj[key]))
  return result;
}

export {parseTimeStrFieldToDate};
