const http = require('http');
const fs = require('fs');

// 最原始的异步执行代码------------------------------
// http.createServer((req, res) => {
//     if (req.url == '/') {
//         fs.readFile('./titles.json', (err, data) => {
//             if (err) {
//                 hadError(err,res);
//             } else {
//                 const titles = JSON.parse(data.toString());
//                 fs.readFile('./template.html', (err, data) => {
//                     if (err) {
//                         console.error(err);
//                         res.end('Server Error');
//                     } else {
//                         const tmpl = data.toString();
//                         const html = tmpl.replace('%', titles.join('</li><li>'));
//                         res.writeHead(200, { 'Content-Type': 'text/html' });
//                         res.end(html);
//                     }
//                 });
//             }
//         });
//     }
// }).listen(8000, '127.0.0.1');

// // 使用命名函数对异步代码进行封装-----------------------------
// http.createServer((req, res) => {
//     getTitles(res);
// }).listen(8000, '127.0.0.1');

// function getTitles(res) {
//     fs.readFile('./titles.json', (err, data) => {
//         if (err) { return hadError(err, res); }
//         getTemplate(JSON.parse(data.toString()), res);
//     });
// }
// function getTemplate(titles, res) {
//     fs.readFile('./template.html', (err, data) => {
//         if (err) { return hadError(err, res); }
//         formatHtml(titles, data.toString(), res);
//     });
// }
// function formatHtml(titles, tmpl, res) {
//     const html = tmpl.replace('%', titles.join('</li><li>'));
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end(html);
// }
// function hadError(err, res) {
//     console.error(err);
//     res.end('Server Error');
// }

//异步逻辑顺序化-------------
// http.createServer((req, res) => {
//     next(res);
// }).listen(8000, '127.0.0.1');
// const tasks = [getTitles,getTemplate,formatHtml];
// function next(...result) {
//     const currentTask = tasks.shift();
//     if (currentTask) {
//         currentTask(result);
//     }
// }
// function getTitles(result) {
//     let res = result[0];
//     fs.readFile('./titles.json', (err, data) => {
//         if (err) { hadError(err, res); }
//         next(JSON.parse(data.toString()), res);
//     });
// }
// function getTemplate(result) {
//     let titles = result[0], res = result[1];
//     fs.readFile('./template.html', (err, data) => {
//         if (err) { hadError(err, res); }
//         next(titles, data.toString(), res);
//     });
// }
// function formatHtml(result) {
//     let titles = result[0], tmpl = result[1], res = result[2];
//     const html = tmpl.replace('%', titles.join('</li><li>'));
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end(html);
// }
// function hadError(err, res) {
//     console.error(err);
//     res.end('Server Error');
// }

// promise异步控制------------------------------
// http.createServer((req, res) => {
//     if (req.url == '/') {
//         const p1 = new Promise((resolve, reject) => {
//             fs.readFile('./titles.json', (err, data) => {
//                 if (err) {
//                     reject(err);
//                     return;
//                 }
//                 resolve(data);
//             });
//         });
//         p1.then(function (contents) {
//             const titles = JSON.parse(data.toString());
//             return new Promise((resolve,reject) => {
//                 fs.readFile('./template.html', (err, data) => {
//                     if(err){
//                         reject(err);
//                         return;
//                     }
//                     resolve(data);
//                 });
//             }); 
//         }, function (err) {
//             hadError(err, res);
//         }).then(contents => {

//         }, err => {

//         });
//     }
// });

// 学习promise---------------
// 创建一个promise-------------
// 新的 Promise 使用 Promise 构造器来创建。
// 此构造器接受单个参数：一个被称为执行器 executor的函数，该执行器会被传递两个名为 resolve()
// 与 reject() 的函数作为参数，异步操作成功时应调用resolve，出错时应调用reject，传入这两个函数的参数会被then中的对应函数接收到
// const promise = new Promise((resolve,reject) => {
//    console.log("create a promise...");//传入Promise中的函数
//    fs.readFile("./xample.txt",{encoding:"utf8"},(err,data) => {
//        if(err) return reject(err);// 出错时调用reject方法，此时promise被决议进入rejected状态。
//        resolve(data);// 执行成功时调用resolve方法，此时promise被决议进入resolved状态。
//    });
// });
// promise.then(contents => {
//    //promise决议进入resolved时，执行这里的代码
//    console.log(contents);
// }, err => {
//    //promise决议进入rejected时，执行这里的代码
//    console.log(err);
// });
// 当 resolve() 或 reject() 在执行器内
// 部被调用时，一个作业被添加到作业队列中，以便决议（ resolve ）这个 Promise
// //-----可以将promise封装到一个函数里，调用的时候才执行promise的创建。
// function runAsync() {
//     const promise = new Promise((resolve, reject) => {
//         console.log("create a promise...");//传入Promise中的函数
//         fs.readFile("./xample.txt", { encoding: "utf8" }, (err, data) => {
//             if (err) return reject(err);// 出错时调用reject方法，此时promise被决议进入rejected状态。
//             resolve(data);// 执行成功时调用resolve方法，此时promise被决议进入resolved状态。
//         });
//     });
//     return promise;
// }

new Promise((resolve,reject)=>{
  setTimeout(() => {
    resolve(1)
  }, 1000); 
}).then((data) => {
  console.log(data);//1
  return 20;
}).then((data)=>{
  console.log(data)//20
  throw new Error("5");
}).then((data)=>{
  console.log(data);//未执行
},(err)=>{
  console.log(err);
  return 50;
}).then((data)=>{
  console.log(data+"success");//50success
},err=>{
  console.log(err+"fail");//未执行
})

// // ------then方法监听的三种状态，完成处理函数与拒绝处理函数总是会在执行器的操作结束后被添加到作业队列的尾部。

// const p = runAsync();
// // 监听成功和失败
// p.then(contents => {
//     console.log("a");
// }, err => {
//     console.log("err1");
// });
// // 监听成功
// p.then(contents => {
//     console.log("b");
// });
// // 监听失败
// p.then(null, contents => {
//     console.log("b");
// });
// // 与上面的代码等效
// p.catch(err => {
//     console.log(err);
// });

// // 创建已决的promise---------------
// let promise = Promise.resolve(42);
// promise.then(contents => {
//     console.log(contents);
// }, err => {
//     //由于这是一个已决的完成态的promise，拒绝处理函数将永远不会被执行
// });

// let promise = Promise.reject(42);
// promise.catch(function (value) {
//     console.log(value); // 42
// });

// 传递promise给Promise.resolve和Promise.reject---------------
// 将任何状态的promise实例传入Promise.resolve都会原封不动返回它
// 将任何状态的promise实例p1传入Promise.reject中会返回一个包装过的对象p2，在p2的then方法中的拒绝处理函数和catch方法会接收到p1
// const p1 = Promise.reject(42);
// console.log(p1);
// let promise = Promise.resolve(p1);
// console.log(promise);
// console.log( p1 === promise);
// promise.then(contents => {
//     console.log("finish");
//     console.log(contents);
// }, err => {
//     console.log("err:");
//     console.log(err === p1);
//     console.log(err);
// });

//--------创建一个非Promise的thenable对象
// 使用promise.resolve方法将thenable转换为promise
// 因为Promise.resolve方法和Promise.reject方法都是创建已决议的promise实例，所以会直接调用thenable内部的then方法
// let thenable = {
//     then(resolve,reject){
//         reject(42); 
//     }
// };
// let p1=Promise.resolve(thenable);
// p1.catch((err)=>{
//     console.log(err);
// });

// // promise的链式调用，每一个then方法调用会返回一个新的promise实例，后面的then方法可以接收到前一个then处理函数方法中返回数据或者错误对象。
// // 当返回简单值时，第一个promise的reject调用以及后续then方法内部处理函数中抛出的错误，
// // 会优先被catch和拒绝处理函数接收，若没有则会被完成处理函数接收，并由浏览器或node抛出错误
// // 
// let p1 = new Promise(function (resolve, reject) {
//     reject(42);
// });
// p1.catch(err=>{
//     throw new Error("5");
// }).then(function (value) {
//     // 第二个完成处理函数
//     console.log(value); // "43"
// },err=>{
//     console.log(`err`);
//     return err+1;
// });

// promise链返回promise---------------
let p1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(1);
    },200);
});
function r1(v){
    let p1 = new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(v);
        },200);
    });
    return p1;
}
function r2(v){
    let p1 = new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(v);
        },200);
    });
    return p1;
}
function r3(v){
    let p1 = new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(v);
        },200);
    });
    return p1;
}
p1.then(contents => {
   return r1(contents+1);
}, err => {
   
}).then(contents => {
   return r2(contents+1);
}, err => {
   
}).then(contents => {
   return r3(contents+1);
}, err => {
   
});