window.ObjectUtils = window.O = {
  hasPrototypeProperty(obj,property){
    return (!obj.hasProperty(property)) && (property in obj);
  }
}