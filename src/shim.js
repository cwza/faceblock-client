const objectValues = () => {
  Object.values = Object.values || (obj => Object.keys(obj).map(key => obj[key]));
}

export default () => {
  objectValues();
}
