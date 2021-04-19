function saveData(key,data){
  let str = JSON.stringify(data,replacer);
  localStorage.setItem(key,str);
}
function getData(key){
  let str = localStorage.getItem(key);
  return JSON.parse(str,reviver);
}
function isEmptyObject(obj){
  return JSON.stringify(obj) === "{}";
}
//https://stackoverflow.com/questions/29085197/how-do-you-json-stringify-an-es6-map
function replacer(key, value) {
  if(value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
}
function reviver(key, value) {
  if(typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value);
    }
  }
  return value;
}