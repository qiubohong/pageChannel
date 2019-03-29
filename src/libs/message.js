/**
* message数据通讯层
* 通过postMessage 和 localStorage去实现跨域页面通讯机制
*/

class Message{
	constructor(options = {}){
		this.$options = options;
		this.targetOrigin = options.targetOrigin; //调用postMessage的window对象的url地址
		this.otherWindow = this.$options.otherWindow; //需调用postMessage的window对象
		this.isChannel = this.$options.isChannel; //是否为通讯中间层
		this.targetUrl = this.$options.targetUrl; //传递跨窗口页面地址
		this._init();
	}
	_init(){
		window.addEventListener("message", this.receiveMessage.bind(this), false);
		//如果是通讯中间层
		if(this.isChannel){
			window.addEventListener('storage', (e)=>{
				console.log('收到数据变化', e, this);
				let data = JSON.parse(e.newValue);
				this.targetOrigin = data.targetUrl;
				this.postMessage(data);
			});
		}
	}

	receiveMessage(event){
		console.log(window.location.href,'收到',!this.isChannel)
		var targetOrigin = this.targetOrigin || '';
		if(targetOrigin.indexOf(event.origin) < 0 && !this.isChannel){
			return;
		}
		// data
		// 从其他 window 中传递过来的对象。
		// origin
		// 调用 postMessage  时消息发送方窗口的 origin 
		this.$options.receive.call(this, event.data);

		if(this.isChannel){
			this.targetOrigin = event.origin;
			this._changeStorage(event.data);
		}
	}

	_changeStorage(data){
		console.log('存在缓存中的：',data)
		localStorage.setItem(data.targetUrl, JSON.stringify(data));
	}

	setReceive(callback = function(){}){
		this.$options.receive = callback;
	}

	postMessage(message){
		console.log(window.location.href,'发送')
		this.otherWindow.postMessage(message, this.targetOrigin);
	}
}

	


export default Message