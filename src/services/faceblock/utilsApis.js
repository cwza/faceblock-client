
const API_ROOT = 'http://localhost:3001/'

const getFaceblockTokenFromLocalStorage = () => {
  let reduxLocalStorage = localStorage.getItem('redux');
  if(reduxLocalStorage)
    reduxLocalStorage = JSON.parse(reduxLocalStorage);
  if(reduxLocalStorage && reduxLocalStorage.localStorage && reduxLocalStorage.localStorage.authentication)
    return reduxLocalStorage.localStorage.authentication.item.faceblockToken;
  return '';
}

const getReqHeaders = () => {
  return {
    "Content-Type": "application/json",
    "faceblock_token": getFaceblockTokenFromLocalStorage(),
  };
}

export {API_ROOT, getReqHeaders}
