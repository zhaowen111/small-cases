export default {
  saveData(key,data){
    let str = JSON.stringify(data,this.replacer);
    localStorage.setItem(key,str);
  },
  getData(key){
    let str = localStorage.getItem(key);
    return JSON.parse(str,this.reviver);
  },
  isEmptyObject(obj){
    return JSON.stringify(obj) === "{}";
  },
  //https://stackoverflow.com/questions/29085197/how-do-you-json-stringify-an-es6-map
  replacer(key, value) {
    if(value instanceof Map) {
      return {
        dataType: 'Map',
        value: Array.from(value.entries()), // or with spread: value: [...value]
      };
    } else {
      return value;
    }
  },
  reviver(key, value) {
    if(typeof value === 'object' && value !== null) {
      if (value.dataType === 'Map') {
        return new Map(value.value);
      }
    }
    return value;
  }
}
