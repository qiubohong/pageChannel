import { version } from '../package.json';

import Message from './libs/message.js'

const emptyCallback = function(){}

class PageChannel{
	constructor(options = {}){
		this.$isChannel = options.isChannel || false;
		this.$options = options;
		this.$events = {
			'getMessage': emptyCallback, //监听数据
			'error': emptyCallback //错误回调
		};
		this._init();
	}
	_init(){
		if(this.$isChannel){
			this.message = new Message({
				receive: this.$events['getMessage'],
				otherWindow: window.parent,
				isChannel: this.$isChannel
			});
		}else{
			this._appendIframe();

			this.message = new Message({
				targetOrigin: this.$options.channelUrl,
				receive: this.$events['getMessage'],
				otherWindow: this.iframe.contentWindow
			});
		}
		
	}
	_appendIframe(){
		const iframe = document.createElement('iframe');
		iframe.src =  this.$options.channelUrl;
		iframe.style.display = 'none';
		document.body.appendChild(iframe);
		this.iframe = iframe;
	}
	on(eventName, callback = function(){}){
		this.$events[eventName] = callback;

		if(eventName == 'getMessage' && this.message){
			this.message.setReceive(callback);
		}
	}
	sendMessage(message){
		//封装传递参数
		this.message.postMessage({
			data: message,
			targetUrl: this.$options.targetUrl,
			time: Date.now() //保持每次数据都能触发改变
		});
	}
}

PageChannel.version = version;

export default PageChannel