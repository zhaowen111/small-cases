import "./dom.js"
let div1 = dom.create('div');
div1.style.width = '100px';
div1.style.height = '100px';
div1.style.background = 'red';
let div2 = div1.cloneNode();
document.body.appendChild(div1);

let div3 = dom.create(
  '<div style="background:black;width:200px;height:200px;"></div>'
);
dom.wrap(div1, div3);

console.log(dom.attr(document.body, 'style'));
console.log(dom.attr(document.body, 'style', 'background:black;height:500px'));
console.log(dom.attr(document.body, 'style'));
dom.style(document.body, { background: 'red', width: '5000px' });
dom.on(document.body, 'click', (e) => {
  alert(e.target);
});

let parent = dom.find('#siblings')[0];
console.log(dom.children(parent));
let firstChild = dom.children(parent)[0];
console.log(dom.siblings(firstChild));
let middleChild = dom.next(firstChild);
console.log(middleChild);
console.log(dom.prev(middleChild));
console.log(dom.prev(firstChild));

console.log('next/prev element');
middleChild = dom.find('.div2')[0];
console.log(middleChild);
console.log(dom.nextEle(middleChild));
console.log(dom.prevEle(middleChild));

console.log(dom.indexOfParent(middleChild));
