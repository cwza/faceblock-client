export default () => {
  if (!Array.includes) {
    require('core-js/fn/array/includes');
  }
  if (!String.includes) {
    require('core-js/fn/string/includes');
  }
  if (!Object.values) {
    require('core-js/fn/object/values');
  }
  if (!String.endsWith) {
    require('core-js/fn/string/ends-with');
  }
  if (!String.startsWith) {
    require('core-js/fn/string/starts-with');
  }
  if(typeof Symbol === "undefined") {
    require('core-js/es6/symbol');
  }
}
