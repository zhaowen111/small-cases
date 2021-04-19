let containerEle = dom.find('.content')[0]; //所有navArea的容器

let searchContainer = dom.find('.search-container')[0];
let searchInputEl = dom.find('.search-box')[0];
let searchBtnEl = dom.find('.search-btn')[0];

//上下文菜单事件
dom.delegate('contextmenu', containerEle, '.nav', (el, event) => {
  event.preventDefault();
  let navData = getNavData(el);
  contextMenuComp.open(event.clientX, event.clientY, navData, el);
});

dom.delegate('mouseout', containerEle, '.nav', (el, event) => {
  if (
    (event.relatedTarget === null ||
      !isOrIn(event.relatedTarget, contextMenuComp.el)) &&
    contextMenuComp.opening
  ) {
    contextMenuComp.close();
  }
});

// 搜索事件
(function () {
  let filteredData = null;
  searchBtnEl.addEventListener('click', function (e) {
    let keyword = searchInputEl.value;
    if (keyword === '' && filteredData !== null) {
      renderData(containerEle, dataComp.getAll());
      filteredData = null;
    } else {
      filteredData = filterData(dataComp.getAll(), keyword);
      renderData(containerEle, filteredData);
    }
  });
  //添加回车键搜索支持
  searchInputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      let clickEvent = createPopEvent('click');
      searchBtnEl.dispatchEvent(clickEvent);
    }
  });
})();


function createNavArea(typeName) {
  return dom.create(
    `<section class="nav-area">
      <header class="type-container">
        <label class="type-label ellipsis">${typeName}</label>
      </header>
      <main class="nav-container">
      </main>
    </section>`
  );
}

function createNav(title, url, id, type) {
  return dom.create(
    `<article class="nav" data-id="${id}" data-type="${type}">
    <span class="nav-img">${title[0]}</span>
    <label class="nav-title ellipsis">${title}</label>
    <a class="hidden-link" href="${url}"></a>
  </article>`
  );
}
function getNavData(navEl) {
  return {
    title: dom.find('.nav-title', navEl)[0].innerText,
    url: dom.find('.hidden-link', navEl)[0].href,
    type: navEl.dataset.type,
    id: navEl.dataset.id
  };
}
function renderData(containerEle, data) {
  containerEle.innerHTML = '';
  if (data.size === 0) {
    containerEle.appendChild(dom.create(`<div class="empty-search-result">没有匹配的数据！</div>`));
  } else {
    data.forEach((value, key) => {
      const navAreaEl = createNavArea(key);
      const navContainerEl = dom.find('.nav-container', navAreaEl)[0];
      for (let key in value) {
        const navData = value[key];
        const navEl = createNav(
          navData.title,
          navData.url,
          navData.id,
          navData.type
        );
        navContainerEl.appendChild(navEl);
      }
      containerEle.appendChild(navAreaEl);
    });
  }
}

function filterData(arrMap, keyword) {
  let result = new Map();
  arrMap.forEach((objMap, key) => {
    let filterArr = [];
    for (let key in objMap) {
      let navData = objMap[key];
      if (navData.title.includes(keyword) || navData.url.includes(keyword)) {
        filterArr.push(navData);
      }
    }
    if (filterArr.length > 0) {
      result.set(key, filterArr);
    }
  });
  return result;
}

function createPopEvent(type, detail) {
  return new CustomEvent(type, {
    bubbles: true,
    cancelable: true,
    detail: detail || {}
  });
}

function isOrIn(elChild, elParent) {
  if (elChild === document.body) return false;
  if (elChild === elParent) return true;
  else return isOrIn(elChild.parentNode, elParent);
}
/**
 * _data结构
 * Map[
 * "Design":{
 * 0:{title:xxx,url:xxx,type:"Design",id:0},
 * 1:{},
 * }]
 */
let dataComp = {
  _data: null,
  _KEY: 'fulgens-nav',
  _ID_KEY: 'fulgens-id',
  __id__: 0,
  generateId() {
    return this.__id__++;
  },
  saveToLocal() {
    saveData(this._KEY, this._data);
    saveData(this._ID_KEY, this.__id__);
  },
  addData(title, url, type) {
    if (!this._data.has(type)) {
      this._data.set(type, {});
    }
    let id = this.generateId();
    this._data.get(type)[id] = { title, type, url, id };
    this.saveToLocal();
  },
  addAll(type, dataArr) {
    if (!this._data.has(type)) {
      this._data.set(type, {});
    }
    let navAreaData = this._data.get(type);
    dataArr.forEach((value) => {
      value.id = this.generateId();
      value.type = type;
      navAreaData[value.id] = value;
    });
    this.saveToLocal();
  },
  getData(id, type) {
    return this._data.get(type)[id];
  },
  getAll() {
    return this._data;
  },
  updateData(id, title, url, type) {
    let navData = this._data.get(type)[id];
    navData.title = title;
    navData.url = url;
    this.saveToLocal();
  },
  deleteData(id, type) {
    delete this._data.get(type)[id];
    if (isEmptyObject(this._data.get(type))) this._data.delete(type);
    this.saveToLocal();
  },
  init() {
    let localData = getData(this._KEY);
    if (localData !== null) {
      this._data = localData;
      this.__id__ = getData(this._ID_KEY);
    } else {
      this._data = new Map();
    }
    if (this._data.size === 0) {
      dataComp.addAll('Design', [
        { title: 'acfun.com', url: 'https://www.acfun.cn' },
        { title: 'awwwward', url: 'https://www.awwwards.com/' }
      ]);
      dataComp.addAll('Novel', [
        { title: '起点中文网', url: 'https://www.qidian.com' },
        { title: '晋江', url: 'http:www.jjwxc.net/' },
        { title: '纵横中文网', url: 'http://www.zongheng.com/' },
        { title: '起点中文网', url: 'https://www.qidian.com' },
        { title: '晋江', url: 'http:www.jjwxc.net/' },
        { title: '纵横中文网', url: 'http://www.zongheng.com/' },
        { title: '起点中文网', url: 'https://www.qidian.com' },
        { title: '晋江', url: 'http:www.jjwxc.net/' },
        { title: '纵横中文网', url: 'http://www.zongheng.com/' }
      ]);
    }
  }
};
dataComp.init();

let contextMenuComp = {
  el: dom.find('.nav-context-menu')[0],
  editMenuEl: dom.find('.edit-menu', this.el)[0],
  deleteMenuEl: dom.find('.delete-menu', this.el)[0],
  navEl: null,
  navData: null,
  opening: false,
  mouseoutListener(e) {
    //如果关联的导航元素不为空，mouseout移入的另一对象不在自身内部，也不在关联的导航元素内部，则关闭上下文菜单
    if (
      contextMenuComp.navEl !== null &&
      e.target === e.currentTarget &&
      !isOrIn(e.relatedTarget, e.currentTarget) &&
      !isOrIn(e.relatedTarget, contextMenuComp.navEl)
    ) {
      contextMenuComp.close();
    }
  },
  open(x, y, navData, navEl) {
    this.opening = true;
    this.el.style.left = x + 'px';
    this.el.style.top = y + 'px';
    this.el.style.visibility = 'visible';
    this.navData = navData;
    this.navEl = navEl;
    this.el.addEventListener('mouseout', this.mouseoutListener);
  },
  close() {
    this.opening = false;
    this.el.style.visibility = 'hidden';
    this.navData = null;
    this.el.removeEventListener('mouseout', this.mouseoutListener);
  },
  init() {
    this.editMenuEl.addEventListener('click', (e) => {
      popWindowComp.open(this.navData);
      this.close();
    });
    this.deleteMenuEl.addEventListener('click', (e) => {
      dataComp.deleteData(this.navData.id, this.navData.type);
      renderData(containerEle, dataComp.getAll());
      this.close();
    });
  }
};
contextMenuComp.init();

let popWindowComp = {
  el: dom.find('.pop-window')[0],
  addBtnEl: dom.find('.add-nav-btn')[0],
  submitAdditionDataBtnEl: dom.find('.add-submit-btn')[0],
  additionTitleInputEl: dom.find('.add-title-input')[0],
  additionUrlInputEl: dom.find('.add-url-input')[0],
  additionNavTypeInputEl: dom.find('.add-type-input')[0],
  additionNavIdInputEl: dom.find('.nav-id')[0],
  siteTypeDatalist: dom.find('#site-type')[0],
  opened: false,
  isEdit: false,
  resetAdditionForm() {
    this.additionTitleInputEl.value = '';
    this.additionUrlInputEl.value = '';
    this.additionNavTypeInputEl.value = '';
  },
  initForm(editData) {
    if (editData) {
      this.additionNavTypeInputEl.value = editData.type;
      this.additionTitleInputEl.value = editData.title;
      this.additionUrlInputEl.value = editData.url;
      this.additionNavIdInputEl.value = editData.id;
    } else {
      this.additionNavTypeInputEl.value = dataComp.getAll().keys().next().value;
      this.additionUrlInputEl.focus();
      this.siteTypeDatalist.innerHTML = '';
      dataComp.getAll().forEach((_value, key) => {
        this.siteTypeDatalist.appendChild(
          dom.create(`<option>${key}</option>`)
        );
      });
    }
  },
  _open(editData) {
    this.additionNavTypeInputEl.disabled = Boolean(editData);
    this.initForm(editData);
    maskComp.open();
    this.el.classList.add("opened")
    this.opened = true;
  },
  _close() {
    maskComp.close();
    this.el.classList.remove("opened")
    this.resetAdditionForm();
    this.opened = false;
  },
  open(editData) {
    let clickEvent = createPopEvent('click', { editData });
    this.addBtnEl.dispatchEvent(clickEvent);
  },
  init() {
    this.addBtnEl.addEventListener('click', (e) => {
      if (!this.opened) {
        this._open(e.detail.editData);
        e.currentTarget.classList.add('can-close');
      } else {
        this._close();
        e.currentTarget.classList.remove('can-close');
      }
    });

    //为打开关闭添加窗口提供键盘支持
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Tab' && !this.opened ) {//&& e.path[0].nodeName !== 'INPUT'
        e.preventDefault();
        let clickEvent = createPopEvent('click');
        this.addBtnEl.dispatchEvent(clickEvent);
      } else if (e.key === 'Escape' && this.opened) {
        let clickEvent = createPopEvent('click');
        this.addBtnEl.dispatchEvent(clickEvent);
      }
    });

    //事件：提交添加信息按钮
    this.submitAdditionDataBtnEl.addEventListener('click', (e) => {
      let url = this.additionUrlInputEl.value;
      let title = this.additionTitleInputEl.value || url;
      let type = this.additionNavTypeInputEl.value;
      if (title !== '' && url !== '' && type !== '') {
        //判断是修改还是新增
        if (
          this.additionNavIdInputEl.value !== undefined &&
          this.additionNavIdInputEl.value !== ''
        ) {
          const id = this.additionNavIdInputEl.value;
          dataComp.updateData(id, title, url, type);
        } else {
          //新增
          dataComp.addData(title, url, type);
        }

        //模拟调用addBtnEl上的点击事件
        let clickEvent = createPopEvent('click');
        this.addBtnEl.dispatchEvent(clickEvent);
        searchInputEl.value = '';
        renderData(containerEle, dataComp.getAll());
      } else {
        let { currentTarget } = e;
        currentTarget.classList.add('invalid');
        setTimeout(() => {
          currentTarget.classList.remove('invalid');
        }, 1200);
      }
    });
  }
};
popWindowComp.init();

let maskComp = {
  el: dom.find('.mask')[0],
  open() {
    this.el.style.display = 'block';
  },
  close() {
    this.el.style.display = 'none';
  },
  init() {
    this.el.addEventListener('wheel', (e) => e.preventDefault(), {
      passive: false
    });
    this.el.addEventListener('touchstart', (e) => e.preventDefault(), {
      passive: false
    });
  }
};
maskComp.init();

//渲染数据
renderData(containerEle, dataComp.getAll());