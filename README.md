# pageChannel说明
一种完整跨页面通讯方案，以`postMessage`+`localStorage`的技术允许在同一浏览器跨域页面通讯。

## 原理
A域名a页面，与B域名下的b页面在同一浏览器通讯，通过通讯中间层页面C域名下c页面，搭建中间层，利用`postMessage`跨域属性，加上`localStorage`跨页面监听变化`storage`事件，实现跨域跨页面通讯。

## 浏览器兼容

* IE10+
* chrome 1.0
* Safari 4.0  
* Firefox 6.0


# 快速上手

## 引用方式

### npm包

安装通过ES import
```bash
npm install pagechannel
```
```javascript
//main.js

import PageChannel from 'pagechannel'

var pageChannel = new PageChannel({
	channelUrl: 'http://localhost:9000/channel.html',
	targetUrl: 'http://localhost:9004'
});
...
```

### script导入
下载`dist/pageChannel.min.js`引入
```html
<script src="pageChannel.min.js"></script>
<script>
var pageChannel = new PageChannel({
	channelUrl: 'http://localhost:9000/channel.html',
	targetUrl: 'http://localhost:9004'
});
...
</script>
```

## 使用

### A或B通讯页面使用
```JavaScript
//初始化
var pageChannel = new PageChannel({
	channelUrl: 'http://localhost:9000/channel.html', //中间层地址
	targetUrl: 'http://localhost:9004' //目标通讯页面地址
});
//接收数据
pageChannel.on('getMessage', function(res){
	//res.data为传递的数据
});

testButton.onclick = function(){
	//传递数据
	pageChannel.sendMessage({
		value : testAInput.value
	})
}

```

### C通讯中间层

```JavaScript
//初始化
var pageChannel = new PageChannel({
	isChannel: true //设置为中间层页面
});
```

## API文档

### 初始配置参数说明
```JavaScript
new PageChannel({
	channelUrl: 'xxx', //中间层地址
	targetUrl: 'xxxx', //目标通讯页面地址
	isChannel: true //是否中间层页面 默认为false
});
```

### 方法说明
```JavaScript
//监听页面通讯回调事件
pageChannel.on('getMessage', function(res){
	//res.data为传递的数据
});

//传递数据
pageChannel.sendMessage({
	value : testAInput.value
})
```