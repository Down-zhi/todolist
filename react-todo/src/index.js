import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>    
    <App />
  // </React.StrictMode>
);
//  为什么 每次创建会创建两个的原因：重载一次看看清除函数可不可行
//  在React中，Strict mode是一种开发模式，可以帮助开发者更容易地发现潜在的副作用问题，它可以通过故意双重调用某些函数来实现。以下是Strict mode中被双重调用的函数列表：
// 1.Class组件的constructor、render和shouldComponentUpdate方法
// 2.Class组件的静态方法getDerivedStateFromProps
// 3.函数组件本身
// 4.State更新函数（setState的第一个参数）
// 5.传递给useState、useMemo或useReducer的函数
// 双重调用仅适用于开发模式。在生产模式下，生命周期函数不会被双重调用。