// let div1 = dom.find('.div1')[0];
// let div2 = dom.find('.div2')[0];
// let div3 = dom.find('.div3')[0];
// let div4 = dom.find('.div4')[0];
// let div5 = dom.find('.div5')[0];
// let div6 = dom.find('.div6')[0];

// let runNum = 1;
// let f1 = function (e) {
//   const currentTarget = e.currentTarget;
//   console.log(e.bubbles);
//   setTimeout(() => {
//     currentTarget.classList.add('x');
//   }, 1000 * runNum);
//   runNum++;
// };
// let f2 = function (e) {
//   const currentTarget = e.currentTarget;
//   setTimeout(() => {
//     currentTarget.classList.remove('x');
//   }, 1000 * runNum);
//   runNum++;
// };
// let f3  =function(e){
//   console.log(e instanceof EventTarget)
//   e.preventDefault();
//   console.log(e.deltaX);
// }
// window.addEventListener("touchstart",function(e){
//   e.preventDefault();
// },{passive:false,capture:true})
// window.addEventListener("wheel",function(e){
//   e.preventDefault();
// },{passive:false,capture:true})
// div1.addEventListener('click', f1, false);
// div2.addEventListener('click', f1, false);
// div3.addEventListener('click', f1, false);
// div4.addEventListener('click', f1, false);
// div5.addEventListener('click', f1, false);
// div6.addEventListener('click', f1, false);

// div1.addEventListener('click', f2, true);
// div2.addEventListener('click', f2, true);
// div3.addEventListener('click', f2, true);
// div4.addEventListener('click', f2, true);
// div5.addEventListener('click', f2, true);
// div6.addEventListener('click', f2, true);


// div1.addEventListener('wheel', f3, true);
// div2.addEventListener('wheel', f3, true);
// div3.addEventListener('wheel', f3, true);
// div4.addEventListener('wheel', f3, true);
// div5.addEventListener('wheel', f3, true);
// div6.addEventListener('wheel', f3, true);

// let ps = dom.find("p");
// dom.each(ps,(el)=>{
//   el.addEventListener("click",(e)=>{
//     console.log("click pop");
//     let catEvent = new CustomEvent("cat",{detail:{name:"毛毛"}, bubbles:true,cancelable:true});
//     el.dispatchEvent(catEvent);
//   });

//   el.addEventListener("click",(e)=>{
//     console.log("click capture");
//     let catEvent = new CustomEvent("cat",{detail:{name:"毛毛"}, bubbles:true,cancelable:true});
//     el.dispatchEvent(catEvent);
//   },true);

//   el.addEventListener("cat",(e)=>{
//     console.log(e.detail);
//     console.log(e.currentTarget.innerText);
//   })
//   let clickEvent = new CustomEvent("click",{detail:0,bubbles:true,cancelable:true});
//   el.dispatchEvent(clickEvent);
// })

let dele = document.querySelector("#delegate");
dom.delegate("click",dele,"button",(e)=>{
  console.log(e);
  console.log("委托事件触发了");
})