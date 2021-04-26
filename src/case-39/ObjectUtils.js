// window.ObjectUtils = window.O = {
//   hasPrototypeProperty(obj,property){
//     return (!obj.hasProperty(property)) && (property in obj);
//   }
// }

// function A() {
//   let a = 0;
//   a=1;
//   return function B() {
//     let b = 2;
//     return function C() {
//       let c = 3;
//       let x = `${a++}${b++}${c++}`;
//       console.log(x);
//     };
//   };
// }

// let c1 = A()();
// c1();//123
// c1();//233
// c1();//343
// let c2 = A()();
// c2();//123

//闭包指引用了另一个函数作用域中变量的函数。
//一个函数引用了其包含函数中的变量，导致包含函数无法被销毁，直到当前函数的引用被释放之前，包含函数中的变量都可以被当前函数访问到。
//以上代码中，函数B，C都引用了其他函数作用域中的变量，所以函数B，C都是闭包。
//由于每个函数中定义的变量和函数都会被放到这个函数关联的活动对象上，
//函数A和B的活动对象在函数c创建时（即运行A()()时）即被放到C的作用域链中，而函数C自身的活动对象是在函数执行时才被创建，推入作用域链前端，函数执行完毕后即被销毁。
//所以在函数C中对变量a和b的修改会保留下来，而对变量c的修改不会被保留。

//闭包可以用来创建函数的私有作用域，常见的使用方式有，创建对象的private属性，创建一个函数的特化函数(柯里化)
//使用闭包要注意，闭包取得的是包含函数中任何变量的最后一个值。

//闭包的缺点：因为闭包会保留其包含函数的作用域，所以比普通函数更占内存，大量使用闭包可能会导致内存占用过高。


// let arr = [1,5,2,3,4,2,3,1,3,"4"];

// function unique1(arr){
//   let map = {};
//   let result = [];
//   arr.forEach(val=>map[val]=true)
//   for(let val in map){
//     result.push(val);
//   }
//   return result;
// }

// function unique2(arr){
//   let set = new Set(arr);
//   return Array.from(set.values());
// }

// console.log(unique1(arr));//[ '1', '2', '3', '4', '5' ]
// console.log(unique2(arr));//[ 1, 5, 2, 3, 4, '4' ]


// function inheritPrototype(target,source){
//   var prototype = Object.assign({},source.prototype);
//   prototype.constructor = target;
//   target.prototype = prototype;
// }

// function SuperObj(name){
//   this.name = name;
//   this.run = function(){
//     console.log("I'm running! follow me!");
//   }
// }

// function SubObj(name,age){
//   SuperObj.call(this,name);
//   this.age = age;
//   this.say = function(){
//     console.log("I'm saying");
//   }
// }

// inheritPrototype(SubObj,SuperObj);
// var a = new SubObj("哈哈",20);
// a.run();
// a.say();
// console.log(a.name);
// console.log(a.age);
// class A{
//   constructor(name){
//     this.name = name;
//   }
//   sayName(){
//     console.log(this.name);
//   }
// }

// class B extends A{
//   constructor(name,age){
//     super(name);
//     this.age = age;
//   }
//   sayAge(){
//     console.log(this.age);
//   }
// }

// let b = new B("wo",20);
// b.sayName();
// b.sayAge();



let p1 = new Promise((resolve,reject)=>{
  setTimeout(() => {
    console.log("p1");
    resolve(1);
  }, 3000);
})
let p2 = new Promise((resolve,reject)=>{
  setTimeout(() => {
    console.log("p2");
    resolve(2);
  }, 5000);
})
let p3 = new Promise((resolve,reject)=>{
  setTimeout(() => {
    console.log("p3");
    resolve(3);
  }, 1000);
})


let pAll = Promise.all([p1,p2,p3])
pAll.then(data=>{
  console.log(data);
  setTimeout(() => {
    console.log("pAll");
  }, 1000);
},err=>{
  console.log(err);
})

let p4 = new Promise((resolve,reject)=>{
  setTimeout(() => {
    console.log("p4 error");
    reject("error");
  }, 9000);
})

let pAll1 = Promise.all([p1,p2,p3,p4])
pAll1.then(data=>{
  console.log(data);
},err=>{
  console.log(err);
})