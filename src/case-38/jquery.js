window.$ = window.jquery = function (obj) {
  let wrapper;
  let history = obj.history || [null];
  if (typeof obj === 'string') {
    wrapper = Array.from(document.querySelectorAll(obj));
  } else if (Array.isArray(obj)) {
    wrapper = obj;
  }

  return {
    $el:wrapper,
    addClass(className) {
      wrapper.forEach((el) => el.classList.add(className));
      return this;
    },
    find(selector) {
      let resultArr = [];
      wrapper.forEach((el) => {
        resultArr.push(...Array.from(el.querySelectorAll(selector)));
      });
      return this.__create__(resultArr);
    },
    //对每个元素执行函数指定的操作
    each(callback) {
      wrapper.forEach(callback);
      return this;
    },
    parent() {
      let arr = wrapper.map(el => el.parentNode);
      return this.__create__(arr);
    },
    children() {
      let arr = [];
      wrapper.forEach(el => arr.push(...Array.from(el.children)));
      return this.__create__(arr);
    },
    //返回上一级的jquery对象
    end() {
      return history.pop();
    },
    //构造一个新的jquery对象
    __create__(obj) {
      obj.history = history.concat();
      obj.history.push(this);
      return jquery(obj);
    }
  };
};