// JavaScript Document
/*

开发者: APP880.com

项目名：Mell

组件名：Mell.JsonCross

JSON本地跨域获取（建议使用于可信域！）

// Copyright (c) 2012-2014, APP880.com All rights reserved.

*/

Mell.JsonCross=function(_url,_data,_callback,_timeout_callback,_timeout){//JSON跨域获取
	
	  //_url:文件路径。
	  //_data:数据格式如{n:1,callback:get}。
	  //_callback：成功回调。
	  //_timeout_callback：超时回调。
	  //_timeout：超时时间（毫秒）。
	  
	  var iframe;
	  
	  var iframe_obj;
	  
	  var oid=Mell.JsonCross.core.json_arr.length?Mell.JsonCross.core.json_arr.length:0;
	  
	  var substr_index=_url.substr(0,_url.indexOf("?"));
	  
	  var param=null;
	  
	  var callbackFn_key=null;
	  
	  var callbackFn_Default={callback:"callback",callbackFn:"callback",CallBack:"callback"};
	 
	  if(substr_index!=""){
		    
		  param=Mell.Url.getParam(_url);
		  
		  callbackFn_key=Mell.JsonCross.core.matchCallbackFn(param)||{};
		  
		  if(!callbackFn_key.value||callbackFn_key.value=="undefined"){
			  
			  param[callbackFn_key.key]=callbackFn_key.value="callback";
			  
		  }
	 
		  _url=Mell.Url.addParam(substr_index,param);
				  
	  }		
		  
	  if(_data&&_data!=""&&Mell.Type.isObject(_data)){
		  
		  param=Mell.JsonCross.core.matchCallbackFn(_data);
					  
		  if(callbackFn_key){
			  
			  if(param){
				  
				  delete _data[param.key];
				  
			  }
		  
		  }else if(param){
			  
			  callbackFn_key=param;
			  
			  if(!callbackFn_key.value||callbackFn_key.value=="undefined"){
			  
				  callbackFn_key.value="callback";
			  
			  }
			  
			  param=null;
			  
		  }else{
			  
			  callbackFn_key={key:"callback",value:"callback"};
			  
			  _url=Mell.Url.addParam(_url,callbackFn_Default);
		  
		  }
		  
		  _url=Mell.Url.addParam(_url,_data);
	  
	  }
	  
	  if(!callbackFn_key){
		  
		  callbackFn_key={key:"callback",value:"callback"};
		  
		  _url=Mell.Url.addParam(_url,callbackFn_Default);
	  
	  }
	  
	  iframe=Mell.Dom.create("iframe",{
							   
		  css:{
								   
			  width:0,
			  
			  height:0,
			  
			  marginHeight:0,
			  
			  marginWidth:0,
			  
			  border:0,
			  
			  display:"none"
		  
		  }
								
	  });
		
	  Mell.JsonCross.core.json_arr[oid]=iframe;
	  
	  iframe_obj=Mell.JsonCross.core.json_arr[oid];
	  
	  iframe_obj.Timeout_Callback=_timeout_callback?_timeout_callback:"";
	  
	  iframe_obj.Callback=_callback?_callback:"";
	  
	  iframe_obj.Timeout=setTimeout(function(){
											 
		  Mell.JsonCross.core.callBackTimeout(oid);
											 
	  },_timeout?_timeout:10000);
	  
	  //延时,解决IE下,不用window.onload,打开页面加载Json无法连接问题。
	  
	  setTimeout(function(){Mell.JsonCross.core.writeToIframe(iframe,_url,callbackFn_key.value,oid,_timeout);},1);
	  
	  return arguments.callee;
		
}
	
Mell.JsonCross.core={//LoadJson内核
	
	json_arr:[],
			
	matchCallbackFn:function(param){//匹配URL中的callback
		
		var param_arr=null;
		
		Mell.Each(param,function(k,v){
								 
			if(/callback/ig.test(k)){
				
				param_arr={};
				
				param_arr.key=k;
				
				param_arr.value=v;
				
				return false;
				
			}
								 
		});
		
		return param_arr;
		
	},
	
	writeToIframe:function(o,_url,callbackFn_key,oid,_timeout){//写入内容
		
		Mell.Dom.append(Mell.Doc.body,o);
				
		o.contentWindow.document.write("<body><script type='text/javascript' language='javascript'>function "+callbackFn_key+"(json){window.parent.Mell.JsonCross.core.callBack(json,"+oid+");}<\/script><script id='load_json'  src='"+_url+"' type='text/javascript' language='javascript' charset='utf-8' ><\/script></body>");

	},
	
	removeIframe:function(o,oid){
				
		Mell.Dom.remove(o);
		
		clearTimeout(o.Timeout);
		
		o.Timeout=null;
		
		if(Mell.JsonCross.core.json_arr.length==(oid+1)){
			
			Mell.JsonCross.core.json_arr=[];
		
		}
			
	},
	
	callBackTimeout:function(oid){
			
		var obj=Mell.JsonCross.core.json_arr[oid];
			
		Mell.JsonCross.core.removeIframe(obj,oid);
			
		if(obj.Timeout_Callback&&obj.Timeout_Callback!=""){
			
			obj.Timeout_Callback();
			
		}
		
	},
	
	callBack:function(json,oid){
			
		var obj=Mell.JsonCross.core.json_arr[oid];
				
		Mell.JsonCross.core.removeIframe(obj,oid);
			
		if(obj.Callback&&obj.Callback!=""){
				
			obj.Callback(json);
			
		}
	
	}
	
}
