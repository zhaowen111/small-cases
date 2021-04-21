let htmlContentEle = document.querySelector("#htmlContent");
let styleEle = document.querySelector("#style");
let div1 = document.querySelector("#div1");

let content = `
/* 你好，我叫小赵
* 给你看个东西
* 首先画一个框
**/
#div1 {
 transform: translateX(-100%);
}
/* 接下来我把 框 变成一个八卦图
* 注意看好了
* 首先，把 div 变成一个圆
**/
#div1 {
 border-radius: 50%;
 box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
 border: none;
}
/*然后一半黑，一半白*/
#div1 {
 background: linear-gradient(to right, white 50%, black 50%);
}


#div1::before,
#div1::after {
 position: absolute;
 box-sizing: border-box;
 width: 100px;
 height: 100px;
 content: '';
 border-radius: 50%;
 transition: transform ease-out 0.5s;
}
/* 然后画两个小球*/


#div1::before {
 top: 0;
 left: 50%;
 background: radial-gradient(circle, white 25%, black 25%);
}

#div1::after {
 bottom: 0;
 right: 50%;
 background: radial-gradient(circle, black 25%, white 25%);
}
/* 然后做一个鼠标放上去，太极归位的效果*/
#div1:hover::before {
 transform: translateX(-50%);
}
#div1:hover::after {
 transform: translateX(50%);
} 
/*
现在把你的鼠标放上去试试啊
*/

/*
Bye bye!
*/
`;
let contentStr = "";
let styleStr = "";
let i = 0;
(function step(){
  setTimeout(() => {
    if (content[i] === '\n') {
      contentStr += '<br>';
    } else if (content[i] === ' ') {
      contentStr += '&nbsp';
    } else {
      contentStr += content[i];
    }
    htmlContentEle.innerHTML = contentStr;
    styleEle.innerHTML = content.substr(0, i);
    window.scrollTo({
      top: 9999,
      behavior: 'instant'
    });
    if (i < content.length - 1) {
      i++;
      step();
    }
  }, 10);
})()