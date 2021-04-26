let delegateMap = new Map();
export default {
  create(tagName) {
    if (tagName.match(/<.*>/)) {
      const container = document.createElement('template');
      container.innerHTML = tagName.trim();
      return container.content.firstChild;
    } else {
      return document.createElement(tagName);
    }
  },
  insertAfter(node, target) {
    target.parentNode.insertBefore(node, target.nextSibling);
  },
  insertBefore(node, target) {
    target.parentNode.insertBefore(node, target);
  },
  wrap(node, parent) {
    let oldParent = node.parentNode;
    oldParent.appendChild(parent);
    parent.appendChild(node);
  },
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },
  empty(node) {
    const arr = [];
    while (node.firstChild) {
      arr.push(this.remove(node.firstChild));
    }
    return arr;
  },
  attr(node, name, value) {
    if (value !== undefined) {
      return node.setAttribute(name, value);
    }
    return node.getAttribute(name);
  },
  text(node, str) {
    if (!str) {
      return node.innerText || node.textContent;
    }
    if ('innerText' in node) {
      node.innerText = str;
    } else if ('textContent' in node) {
      node.textContent = str;
    } else {
      console.error('invalid node parameter');
    }
  },
  style(node, options) {
    if (options) {
      for (let key in options) {
        node.style[key] = options[key];
      }
    }
    return node.style;
  },
  on(node, eventType, callback) {
    return node.addEventListener(eventType, callback);
  },
  off(node, eventType, callback) {
    return node.removeEventListener(eventType, callback);
  },
  find(selector, target) {
    return (target || document).querySelectorAll(selector);
  },
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return Array.from(node.children);
  },
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => {
      return n !== node;
    });
  },
  next(node) {
    return node.nextSibling;
  },
  prev(node) {
    return node.previousSibling;
  },
  nextEle(node) {
    let result = this.next(node);
    if (result === null) return result;
    return result.nodeType === 1 ? result : this.nextEle(result);
  },
  prevEle(node) {
    let result = this.prev(node);
    if (result === null) return result;
    return result.nodeType === 1 ? result : this.prevEle(result);
  },
  indexOfParent(node) {
    return this.children(node.parentNode).indexOf(node);
  },
  each(nodeList, callback) {
    return Array.from(nodeList).forEach(callback);
  },
  delegate(eventType, container, selector, cb) {
    if (!container instanceof Element) {
      throw new Error('invalid parameter container,need a Element type object');
    }
    const listener = function (e) {
      let matchedElement = getMatchedElement(e.target, selector, container);
      if (matchedElement !== null) cb(matchedElement, e);
    };
    container.addEventListener(eventType, listener);
    function getMatchedElement(el, selector, root) {
      if (el === root) return null;
      if (el.matches(selector)) {
        return el;
      } else {
        return getMatchedElement(el.parentNode, selector, root);
      }
    }
  },
  ajax(method, url, options) {
    const { success, fail } = options;
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          success(null, xhr.response);
        } else if (xhr.status >= 400) {
          fail(null, xhr, xhr.status);
        }
      }
    });
    xhr.open(method, url);
    xhr.send(options.data);
  },
  wrapper(element) {
    if (!element instanceof Element) {
      element = document.querySelector(element);
    }
    return element;
  }
};

