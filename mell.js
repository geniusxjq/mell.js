// JavaScript Document

// JavaScript Document
/*
--------------------------------

开发者: APP880.com

项目名：Mell

组件名：Mell

版本：1.0

说明：本框架是面向过程管理框架。相对面向对象框架更高效，更节省系统资源,可控性更强，更适合多屏运用。

---------------------------------------------

函数使用说明：

1.不返回内容的函数或函数不返回内容时，返回本身（arguments.callee）。便于复式操作（非链式）。

复式操作格式:

链头(arguments)(arguments)...

实例：

Mell.Event.on(dom1,"click",function(o){return this;})(dom2,"click",function(o){return o;})

*/

//Code->>

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++基类++++++++++++++++++++++++++++++++++++++++++++++++++++++

var Mell=function(id){
			
	return document.getElementById(id);
	
}

Mell.Doc=document;

Mell.DocElem=document.documentElement;

//++++++++++++++++++++++++++++++++++++++++++++++++++++++基本功能++++++++++++++++++++++++++++++++++++++++++++++++++++

Mell.MapCall = function (mapcall_array, callback){//扫描数组回调
	
	//mapcall_array:数组如：[obj,obj]。 callback:回调函数。调用试例：Mell.MapCall([1,2],function(i){})
	
	if (mapcall_array==null){
		
		return mapcall_array;
		
	}
	
	if (mapcall_array==window){//解决window对象无法正确遍历问题
		
		mapcall_array=[window];
		
	}
	
	if(mapcall_array.options){//针对列表对象select兼容
		
		mapcall_array=[mapcall_array];
		
	}

	if (callback ==undefined){
		
		return mapcall_array;
		
	}
	
	var length = mapcall_array.length;

	if (length!==undefined){
		
		if (length > 0){
			
			for (var i=0; i < length;i++){
				
				if (callback.call(mapcall_array[i], mapcall_array[i], mapcall_array[i])==false){
					
					break;
					
				}
				
			}
			
		}

		return mapcall_array;
		
	}else{
		
		callback.call(mapcall_array, mapcall_array);
		
		return mapcall_array;
		
	}
		
}

Mell.Each=function (each_array, callback){//逐个执行回调
	
  //each_array:数组[1,2,3]或对象{n:1,m:2} 。callback:回调。示例：Mell.Each({n:1,m:2},function(name,value){})

	var length=each_array.length;
	
	var	type = typeof each_array;
	
	var	name=null;
	
	if (each_array==window){//解决window对象无法正确遍历问题
				
		type="";
		
	}
	
	if(each_array.options){//针对列表对象select兼容
		
		each_array=[each_array];
		
	}

	if (type=="array"||(type=="object"&&(length - 1) in each_array)){
		
		for (var i=0;i <length;i++){
			
			if (callback.call(each_array[i], i, each_array[i])==false){
				
				break;
				
			}
			
		}
		
	}else if (type=="object"){
		
		for (name in each_array){
			
			if(callback.call(each_array[name],name, each_array[name])==false){
				
				break;
				
			}
			
		}
		
		return each_array;
		
	}else{
		
		callback.call(each_array,0,each_array);
		
		return each_array;
		
	}
	
}

//++++++++++++++++++++++++++++++++++++++++++++++++++对象类型判断(Mell.Type)++++++++++++++++++++++++++++++++++++++++++++

Mell.Type={
	
	typeOf:function(o,type){
		
		if(!o){return false;}
		
		var t=new String(typeof(o)).toLowerCase();
		
		var _type=type?type.toLowerCase():null;
			
		return type?t==_type?true:false:t;
	
	},
	
	isBoolean:function (value){ 
	
		return (Mell.Type.typeOf(value)=="boolean")&&value.constructor==Boolean; 
	
	}, 
	
	isArray:function (o){ 
	
		return (Mell.Type.typeOf(o)=='object')&&o.constructor==Array; 
	
	}, 
	
	isString:function(str){ 
	
		return (Mell.Type.typeOf(str)=='string')&&str.constructor==String; 
	
	}, 
	
	isNumber:function(o){ 
	
		return (Mell.Type.typeOf(o)=='number')&&o.constructor==Number; 
	
	},
	
	isDate:function (o){ 
	
		return (Mell.Type.typeOf(o)=='object')&&o.constructor==Date; 
	
	},
	
	isFunction:function (o){ 
	
		return (Mell.Type.typeOf(o)=='function')&&o.constructor==Function; 
	
	},
	
	isObject:function (o){ 
	
		return (Mell.Type.typeOf(o)=='object')&&o.constructor==Object; 
	
	},
	
	isDom:function(o){
		
		return (Mell.Type.typeOf(o)=='object')&&o.constructor!=Object&&o.nodeType==1; 
		
	}
	
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++字符串操作(Mell.Str)+++++++++++++++++++++++++++++++++++++++++++

Mell.Str={
										   	
	camelCase: function (string){//驼峰化(如camel-case变为camelCase)
		
		return string.replace('-ms-', 'ms-').replace(/-([a-z])/ig, function (match,letter){
			return (letter + '').toUpperCase();
		});
		
	},

	replace:function(string,replacements_property){
		
		/*
		
		string:字符串
		
		replacements_property：替换为。格式:{key:str,key:str}
		
		*/
	
		Mell.Each(replacements_property,function(k,v){
									
			string=string.replace(new RegExp(k,"ig"),v);
											   
		});
		
		return string;
		
	},	
	
	slashes:function(string){//去换行
		
		return Mell.Str.replace(string,{
			"\\\\": '\\\\',
			"\b": '\\b',
			"\t": '\\t',
			"\n": '\\n',
			"\r": '\\r',
			'"': '\\"'
		});
		
	},

	respace:function(string){//去空白
		
		return string.replace(/\s+/g,"");
		
	},

	trim:function(string){//去两端空白
	
		if("".trim){
			
		return string.trim();
		
		}else{
			
		return (string + '').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		
		}
		

	},
	
	toNumber:function(string){//转换为数字/去掉非数字
		
		if(!isNaN(string)){return string}
		
		var num=string.match(/[\-\+0-9\.]/ig);
		
		return num&&num!=""?Number(num.join("")):0;
		
	}
	
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++浏览器/文档++++++++++++++++++++++++++++++++++++++++++++++++++++

Mell.Browser=function(keyword){//根据keyword检索返回是否匹配 true || false
	
	return Mell.Str.respace(Mell.Browser.ua).match(new RegExp(Mell.Str.respace(keyword),"i"))?true:false;
	
}

Mell.Browser.ua=navigator.userAgent.toLowerCase();//浏览器信息

Mell.Browser.language=((window.navigator.language||window.navigator.systemLanguage).toLowerCase());//系统语言
			
Mell.Browser.isCompatMode=(Mell.Doc.compatMode=="CSS1Compat");//判断页面是否为w3c标准页面（渲染兼容模式）

Mell.Browser.type=(function(){//浏览器类型					
	
	var ver_arr=["msie","firefox","chrome","opera","safari"];
		
	var ver_str=Mell.Browser.ua.match(new RegExp(ver_arr.join("|"),"i"));
	
	return ver_str=="msie"?"ie":ver_str;
	
})();

Mell.Browser.isMobile=(function(){
								
	var ver_arr=["iphone","ipod","android","ios","ipad"];
							 							 							 
	return Mell.Browser.ua.match(new RegExp(ver_arr.join("|"),"i"))?true:false;
	
})();

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++页面/窗口属性++++++++++++++++++++++++++++++++++++++++++++++++++

Mell.ScrollLeft=function(left){
	
	left&&window.scroll(left,Mell.ScrollTop);	
		
	return Mell.DocElem.scrollLeft?Mell.DocElem.scrollLeft:Mell.Doc.body.scrollLeft;
	
}

Mell.ScrollTop=function(top){
	
	top&&window.scroll(Mell.ScrollLeft,top);	
						
	return Mell.DocElem.scrollTop?Mell.DocElem.scrollTop:Mell.Doc.body.scrollTop;
	
}

Mell.ClientWidth=function(){
	
	return Mell.Browser.isCompatMode?Mell.DocElem.clientWidth:Mell.Doc.body.clientWidth;
	
}

Mell.ClientHeight=function(){
	
	return Mell.Browser.isCompatMode?Mell.DocElem.clientHeight:Mell.Doc.body.clientHeight;
	
}

Mell.PageWidth=function(){
	
	if(document.all){
		
		return Math.max(Mell.Doc.body.scrollWidth,Mell.ClientWidth());
	
	}else if(Mell.Browser.type=="opera"){
			
		return Mell.Doc.body.scrollWidth||Mell.Doc.documentElement.scrollWidth;
			
	}else{
	
		return Math.max(Mell.DocElem.offsetWidth,Mell.ClientWidth());
		
	}
		
}

Mell.PageHeight=function(){
	
	if(document.all){
		
		return Math.max(Mell.Doc.body.scrollHeight,Mell.ClientHeight());
	
	}else if(Mell.Browser.type=="opera"){
		
		return Mell.Doc.body.scrollHeight||Mell.Doc.documentElement.scrollHeight;
			
	}else{
		
		return Math.max(Mell.DocElem.offsetHeight,Mell.ClientHeight());
		
	}
	
}
	
//+++++++++++++++++++++++++++++++++++++++++++++对象绝对位置和宽高(Mell.Offset)+++++++++++++++++++++++++++++++++++++++++

Mell.Offset=function (o){
	
	if(o==document||o==window){
				
		return {
			
		  top:Mell.ScrollTop(),
		  
		  left:Mell.ScrollLeft(),
		  
		  height:o!=window?Mell.PageHeight():Mell.ClientHeight(),
		  
		  width:o!=window?Mell.PageWidth():Mell.ClientWidth()
			
		}
		
	}else{
			
		var rect=o.getBoundingClientRect();
		
		return {
			
		  top:rect.top+Mell.ScrollTop(),
			  
		  left:rect.left+Mell.ScrollLeft(),
			  
		  width:o.offsetWidth,
			  
		  height:o.offsetHeight
				
		}
	
	}
	
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++获取对象(Mell.By**)++++++++++++++++++++++++++++++++++++++++++++

Mell.ById=function(_id,callback){
	
	var dom,dom_arr=[];
			
	Mell.MapCall(Mell.Type.isArray(_id)?_id:_id.split(/\s+/),function(id){
						   
		dom=document.getElementById(id);				   
					   
		dom&&dom_arr.push(dom);
					   
	});
	
	return dom_arr[0]?Mell.MapCall(dom_arr,callback):null;
	
}

Mell.ByDom=function (o,callback){
	
	return Mell.MapCall(o,callback);
	
}

Mell.ByTag=function(o,tag,callback){
		
	var dom,dom_arr=[];
	
	o=o||document;
	
	Mell.MapCall(Mell.Type.isArray(tag)?tag:tag.split(/\s+/),function(t){
	
		dom=o.getElementsByTagName(t);
		
		dom_arr=dom_arr.concat(Mell.Dom.toArray(dom));
	
	});	
	
	return dom_arr[0]?Mell.MapCall(dom_arr,callback):null;
	
}

Mell.ByName=function(_name,callback){
	
	var dom,dom_arr=[]; 
	
	Mell.MapCall(Mell.Type.isArray(_name)?_name:_name.split(/\s+/),function(n){
					
		dom=Mell.Doc.getElementsByName(n);
		
		dom&&dom[0]&&(dom_arr=dom_arr.concat(Mell.Dom.toArray(dom)));
	
	});
	
	return dom_arr[0]?Mell.MapCall(dom_arr,callback):null;
	
}

Mell.ByPoint=function(clientX,clientY,callback){
	
	var offset=Mell.Offset(document);
	
	var client=Mell.Offset(window);
	
	var elem_fromPoint=document.elementFromPoint;
	
	if(!("check" in Mell.ByPoint)){
			
		if (offset.top>0){
		  
			Mell.ByPoint["check"]=(elem_fromPoint(0,offset.top+client.height-1)==null);
		
		}else if(offset.left>0){
		
			Mell.ByPoint["check"]=(elem_fromPoint(offset.left+client.width-1,0)==null);
		
		}
	
	}
	
	if("check" in Mell.ByPoint&&Mell.ByPoint["check"]==false){
		
		clientX+=offset.left;
		
		clientY+=offset.top;
		
	}
		
	return Mell.MapCall(elem_fromPoint(clientX,clientY),callback);
	
}

Mell.ByClass=function (o,className,callback){
	
	var dom_arr=[];
	
	var _fn=document.getElementsByClassName?function(c){
		
		var elem=o.getElementsByClassName(c);
					
		return elem&&elem[0]?Mell.Dom.toArray(elem):[];
				
	}:function(c){	
	
		var class_match=[];
		
		c=c.replace(".","");
		
		Mell.ByTag(o,"*", function (node){
								
			if(Mell.ClassName.has(node,c)){
				
				class_match.push(node);
				
			}
			
		});
	
		return class_match[0]?class_match:[];
	
	}
	
	Mell.MapCall(Mell.Type.isArray(className)?
	className:className.split(/\s+/),function(c){
																			
		dom_arr=dom_arr.concat(_fn(c));
																							
	});
	
	return dom_arr[0]?Mell.MapCall(dom_arr,callback):null;
	
}

Mell.ByAttr=function(o,attrs,callback){
		
	var dom_arr=[];
	
	var dom=Mell.ByTag(o,"*");
		
	Mell.Each(Mell.Type.isString(attrs)?attrs.split(/\s+/):attrs,function(k,v){
		
		if(!isNaN(k)){
			
			k=v;v=null;
			
		}

		Mell.MapCall(dom,function(node){
								  
			var	attr=Mell.Attr.get(node,k);	
			
			if(!attr){return true;}	
			
			if(!v||attr==v){
				
				dom_arr.push(node);
				
			}
															  
		});
																		  
	});
	
	return dom_arr[0]?Mell.MapCall(dom_arr,callback):null;
	
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++节点/内容操作(Mell.Dom)+++++++++++++++++++++++++++++++++++++++++

Mell.Dom={
	
	//创建DOM对象
		
	create:function(tag,properties,callback){
				
		if(Mell.Browser.type=="ie" && properties && "name" in properties){//解决IE中name无法设置问题
			
			tag="<"+tag+" name=\""+properties["name"]+"\"></"+tag+">";
			
		}
				
		var elem =document.createElement(tag);

		if (properties){
			
			try{
				
				Mell.Each(properties, function (name, property){
												
					switch (name){
						
						case "css":
						case "style":
						
							Mell.Type.isObject(property)?
							Mell.Style.add(elem,property):Mell.Style.set(elem,name,property);
							
							break;

						case "innerHTML":
						case "html":
						
							Mell.Dom.html(elem, property);
							
							break;

						case "className":
						case "class":
						
							Mell.ClassName.set(elem, property);
							
							break;

						case"text":
						
							Mell.Dom.text(elem, property);
							
							break;

						default:
						
							Mell.Type.isObject(property)?
							Mell.Attr.add(elem,property):Mell.Attr.set(elem, name, property);
							
							break;
							
					  }
					
				});

				return Mell.MapCall(elem,callback);
				
			}catch(e){}finally{
				
				elem = null;
								
			}
			
		}
			
		return Mell.MapCall(elem,callback);
					
	},
	
	//设置对象html
	
	html:function (o,html){
	
		var content=Mell.MapCall(o,function(o){
									  
			if (html){
				
				try{
					
					o.innerHTML=html;
					
				}catch (e){
					
					Mell.Dom.append(Mell.Dom.empty(o),html);
					
				}
				
				return o;
				
			}
		
			return o.nodeType==1?o.innerHTML:null;
			
		});
		
		return !html?content:arguments.callee;
	
	},
	
	//设置对象文本

	text:function (o, text){
		
		var content=Mell.MapCall(o,function (o){
										 
		if (text){
			
			Mell.Dom.empty(o);// 清空节点
			
			o.appendChild(Mell.Doc.createTextNode(text));

			return o;
			
		}else{
			
			var rtext="";
			
			var textContent=o.textContent;
			
			var nodeType;
			
			if ((textContent||o.innerText)==o.innerHTML){// 如果"o"只是一般字符
				
				rtext=textContent?
				Mell.Str.trim(o.textContent.replace(/(^\n+)|(\n+$)/g,"")):
				o.innerText.replace(/\r\n/g,"");
				
			}else{
				
				for(o=o.firstChild;o;o=o.nextSibling){
					
					nodeType = o.nodeType;

					if (nodeType==3&&Mell.Str.trim(o.nodeValue)!=""){
						
						rtext+=o.nodeValue.replace(/(^\n+)|(\n+$)/g,"")+
						(o.nextSibling&&o.nextSibling.tagName&&o.nextSibling.tagName.toLowerCase()!=="br"?"\n":"");
						
					}

					if (nodeType==1||nodeType ==2){
						
						rtext+=Mell.Dom.text(o)+(Mell.Style.get(o,"display")=="block"||
						o.tagName.toLowerCase()=="br"?"\n":"");
						
					}
					
				}
				
			}

			return rtext;
			
		}
			
		});
		
		return !text?content:arguments.callee;
		
	},
	
	//追加节点

	append:function(o,node){
		
		o&&(o.appendChild(Mell.Dom.nodeFragment(o,node)));
		
		return arguments.callee;
		
	},
	
	//插入节点到第一个

	prepend:function(o,node){
					  
		o&&(o.firstChild?
		o.insertBefore(Mell.Dom.nodeFragment(o,node),o.firstChild):
		o.appendChild(Mell.Dom.nodeFragment(o,node)));
						
		return arguments.callee;
		
	},
	
	//将节点插入指定对象前

	before:function(o,node){
						
		o&&(o.parentNode.insertBefore(Mell.Dom.nodeFragment(o,node),o));
		
		return arguments.callee;
		
	},
	
	//将节点插入指定对象之后

	after:function (o,node){
									  
		o&&(o.nextSibling?
		o.parentNode.insertBefore(Mell.Dom.nodeFragment(o,node),o.nextSibling):
		o.parentNode.appendChild(Mell.Dom.nodeFragment(o,node)));
		
		return arguments.callee;
		
	},
	
	//删除节点,和事件监听器。
	
	remove:function(o){
		
		Mell.MapCall(o,function(o){
										 
			Mell.Dom.empty(o);
			
			Mell.Event.off(o);
			
			return o!=null&&o.parentNode?o.parentNode.removeChild(o):o;
			
		});
		
		return arguments.callee;
		
	},
	
	//清空对象所有节点,和事件监听器。

	empty:function (o){
			
		Mell.MapCall(o, function (o){
										 
			if(o.options){
				
				o.options.length=0;
				
				return;
				
			}
	
			while (o.firstChild){
									
				if(o.firstChild.nodeType==1){Mell.Event.off(o.firstChild)};
									
				o.removeChild(o.firstChild);
				
			}
			
			return;
			
		});
		
		return arguments.callee;
		
	},
	
	//节点片段化，提高效率。
	
	nodeFragment:function (o, node){
				
		var type = typeof node;
	
		if (type=="string"){
			
			var doc=o&&o.ownerDocument||Mell.Doc;
			
			var fragment=doc.createDocumentFragment();
			
			var div=Mell.Dom.create("div");
			
			var ret=[];
	
			div.innerHTML = node;
			
			while (div.childNodes[0]!=null){
				
				Mell.Dom.append(fragment,div.childNodes[0]);
				
			}
			
			node=fragment;
			
			div=null;
		}
	
		if (type=="number"){
			
			node+="";
		}
	
		return node;
	
	},	
	
	//将DOM对象转换为数组
	
	toArray:function(o){
		
		if(Mell.Type.isArray(o)){return o;}
		
		var parsed_arr=[];
		
		try{
			
			parsed_arr=[].slice.call(o);
			
		}catch(e){
			
			try{
					
				Mell.MapCall(o,function(dom){
										  
					parsed_arr.push(dom);
										  
				});
				
			}catch(e){}
			
		}
		
		return parsed_arr;
		
	},
	
	//判断对象包容关系
	
	contains:function(parent,child){
		
		parent=parent==document?document.body:parent;
		
		return (parent.compareDocumentPosition?
		(parent.compareDocumentPosition(child)&16):parent.contains(child))?true:false;
		
	},
	
	//判断对象是否相交
	
	collide:function(target_a,target_b){
			
		if((target_a!=target_b!=document)&&(target_b!=target_a!=window)&&(!Mell.Type.isDom(target_a)||!Mell.Type.isDom(target_b))){
			
			return false;
		
		}
		
		function check_fn(check_a,check_b){
			
			var rect_a=Mell.Offset(check_a);
			
			var rect_b=Mell.Offset(check_b);
			
			rect_a["right"]=rect_a["left"]+rect_a["width"];
			
			rect_a["bottom"]=rect_a["top"]+rect_a["height"];
			
			rect_b["right"]=rect_b["left"]+rect_b["width"];
			
			rect_b["bottom"]=rect_b["top"]+rect_b["height"];
			
			return (rect_a.right>rect_b.left&&rect_a.right<rect_b.right||rect_a.left>rect_b.left&&rect_a.left<rect_b.right)&&
			(rect_a.bottom>rect_b.top&&rect_a.bottom<rect_b.bottom||rect_a.top<rect_b.bottom&&rect_a.bottom>rect_b.top);
		
		}
		
		return (check_fn(target_a,target_b)||check_fn(target_b,target_a));
		
    },
	
	//匹配选择
	
	matchSelector:function(target,selector){
		
		if(!target||!Mell.Type.isDom(target)){return false;}
										
		var _class=null,_id=null,_match=false;
								
		function _fn(s){
			
			_class=s.match(/\./ig);
			
			_id=s.match(/\#/ig);
			
			return _class?Mell.ClassName.has(target,s.replace(/\./,"")):
			_id?target.id==s.replace(/\#/,""):
			target.tagName.toLowerCase()==s||Mell.Attr.get(target,s);
				
		}
							
		Mell.MapCall(Mell.Type.isString(selector)?selector.split(/\s+/):selector,
				
			function(s){
				
				if(_fn(s)){_match=target;return false;}
				
			}
			
		);
		
		return _match;
		
	}
		
}

//+++++++++++++++++++++++++++++++++++++++++++++++模板(Mell.Template)+++++++++++++++++++++++++++++++++++++++++++++++++++++

Mell.Template={
	
	//设置一个新的模板，以备待用。
	
	set:function (templateName,template,data){
		
		/*
		
		templateName:模板名，可以为空。为空时以template为模板名。
		
		template:模板HTML(模板中的标签格式为"<div>{{标签}}</div>")。
		
		data匹配标签数据数据。
		
		数据格式为:[{标签：内容},{标签：内容}]
		
		实例："<div>{{text}}</div>"和[{text:IM}]进行遍历：结果->"<div>IM</div>"
		
		*/
							
		templateName=templateName||template;
		
		if(!templateName){return arguments.callee;}
		
		Mell.Template.core.templateCache[templateName]={};
				
		Mell.Template.core.templateCache[templateName].template=template;
		
		if(!data){return arguments.callee;}
		
		Mell.Template.core.templateCache[templateName].data=data;
										
		template=Mell.Template.core.proTemplate(data,template);				   
						 
		return template;
				
	},
	
	//获取模板
	
	get:function(templateName,data){
		
		/*
		
		templateName:模板名，必填。
		
		data：数据选填。在没不填data时，以设置时的data为数据，遍历到模板。
		
		*/
		
		if(!templateName){ return "";}
		
		var T=Mell.Template.core.templateCache[templateName];
		
		if(!T){ return "";}
		
		if("data" in T==false&&data){
			
			T.data=data;
			
		}
	 	
		return Mell.Template.core.proTemplate(data?data:T.data?T.data:null,T.template);		
		
	},
	
	//获取之前遍历使过的模板
	
	getLastUsed:function(){
		
		return Mell.Template.core.lastTemplate;
		
	},
	
	//清空模板缓存
	
	clearCache:function(){
		
		Mell.Template.core.templateCache={};
		
		Mell.Template.core.lastTemplate="";
		
	},
	
	//模板功能内核
	
	core:{
		
		//模板缓存
		
		templateCache:{},
		
		//保存最后一次遍历结果
		
		lastTemplate:"",
		
		//匹配标签遍历模板内容
		
		proTemplate:function(data,template){
			
			var T="";
			
			var T_cache=template;
						
			Mell.MapCall(data,function(d){
											  
				T_cache=T_cache.replace(/\{\{(\w+)\}\}/ig,function(i,v){
							
				   return d[v]?d[v]:("{{"+v+"}}");
																																
				});
				
				T+=T_cache;
				
				T_cache=template;
				
			});
			
			Mell.Template.core.lastTemplate=T;

			return T;
				
		}
		
	}

}

//+++++++++++++++++++++++++++++++++++++++++++++++++++数据存储（Mell.Storage）+++++++++++++++++++++++++++++++++++++++++++++

Mell.Storage={
	
	//存储数据
	
	set:function(key,value){
		
		return Mell.Storage.core.setData(key,value);
				
	},
	
	//获取存储的数据
	
	get:function(key){
		
		return Mell.Storage.core.getData(key);
		
	},
	
	//删除存储的数据
	
	remove:function(key){
		
		return Mell.Storage.core.removeData(key);
		
	},
	
	//存储内核
	
	core:{
		
		hname:location.hostname?location.hostname:"localStatus",
		dataDom:null,
		dataExpires:365*10,//数据有效期(ie)
	
		init:function(the_expires){ //初始化userData
		
			if(!Mell.Storage.core.dataDom){
				
				try{
					
					Mell.Storage.core.dataDom=Mell.Doc.createElement("input");//这里使用hidden的input元素
					Mell.Storage.core.dataDom.type="hidden";
					Mell.Storage.core.dataDom.style.display = "none";
					Mell.Storage.core.dataDom.addBehavior("#default#userData");//这是userData的语法
					Mell.Doc.body.appendChild(Mell.Storage.core.dataDom);
					var exDate = new Date();
					exDate = exDate.getDate()+Mell.Storage.core.dataExpires;
					Mell.Storage.core.dataDom.expires = exDate.toUTCString();//设定过期时间
					
				}catch(ex){
					
					return false;
					
				}
				
			}
			
			return true;
			
		},
		
		//存储数据
	
		setData:window.localStorage?function(key,value){
			
			window.localStorage.setItem(key,value);
			
			return arguments.callee;
				
		}:function(key,value){
		
			if(Mell.Storage.core.init()){
				
				Mell.Storage.core.dataDom.load(Mell.Storage.core.hname);
				Mell.Storage.core.dataDom.setAttribute(key,value);
				Mell.Storage.core.dataDom.save(Mell.Storage.core.hname);
				
			}
		
			return arguments.callee;
					
		},
		
		//获取存储的数据
		
		getData:window.localStorage?function(key){
			
				return window.localStorage.getItem(key);
				
		}:function(key){	
		
			if(Mell.Storage.core.init()){
				
					Mell.Storage.core.dataDom.load(Mell.Storage.core.hname);
					
					return Mell.Storage.core.dataDom.getAttribute(key);
					
			}
			
		},
			
		//删除存储的数据
	
		removeData:window.localStorage?function(key){
			
			localStorage.removeItem(key);
			
			return arguments.callee;
				
		}:function(key){
		
			if(Mell.Storage.core.init()){
				
				Mell.Storage.core.dataDom.load(Mell.Storage.core.hname);
				Mell.Storage.core.dataDom.removeAttribute(key);
				Mell.Storage.core.dataDom.save(Mell.Storage.core.hname);
				
			}
		
			return arguments.callee;
			
		}
		
	}
	
}

//++++++++++++++++++++++++++++++++++++++++++++++++++历史记录（Mell.Cookie）++++++++++++++++++++++++++++++++++++++++++++++

Mell.Cookie={
	
	//读取cookie

	get:function (name,path){
		
		var start = Mell.Doc.cookie.indexOf(name + "=");
		
		var len = start + name.length + 1;
		
		if ((!start) && (name != Mell.Doc.cookie.substring(0, name.length))) {
			
			return null;
		
		}
		
		if (start == -1) return null;
		
		var end = Mell.Doc.cookie.indexOf(';', len);
		
		if (end == -1) end = Mell.Doc.cookie.length;

		return unescape(Mell.Doc.cookie.substring(len, end));
		
	},
	
	//添加cookie

	set:function(name,value,hours,path){
	
		var str = name + "=" + escape(value)+(path? ";path="+path:";path=/;");
		
		if(hours > 0){//为0时不设定过期时间，浏览器关闭时cookie自动消失
		
		var date = new Date();
		
		var ms = hours*3600*1000;
		
		date.setTime(date.getTime() + ms);
		
		str += "; expires=" + date.toGMTString();
		
		}
		
		Mell.Doc.cookie = str;
		
		return arguments.callee;
	
	},
	
	//移除cookie

	remove:function(name,path){
		
	   var date=new Date();
	   
	   date.setTime(date.getTime()-10000);
	   
	   Mell.Doc.cookie=name+"=null; expire="+date.toGMTString()+(path? ";path="+path:";path=/;");
	   
	   return arguments.callee;
		   
	}

}

//+++++++++++++++++++++++++++++++++++++++++++++++++++切换/开关(Mell.Toggle)++++++++++++++++++++++++++++++++++++++++++++++++++

Mell.Toggle=function(o,on_callback,off_callback,is_init){
	
	var has_caller=arguments.callee.caller?true:false;
	
	Mell.MapCall(o,function(o){
		
		var status=o["mell-toggle"];
			
		on_callback&&on_callback!=o["mell-toggle-on-callback"]?
		o["mell-toggle-on-callback"]=on_callback:false;
		
		off_callback&&off_callback!=o["mell-toggle-off-callback"]?
		o["mell-toggle-off-callback"]=off_callback:false;
  
		if(has_caller&&!is_init){
	   
			(!status||status=="off")?Mell.Toggle.on(o):Mell.Toggle.off(o);
		
		}
		
	});
	  
	 return arguments.callee;
				
}

//开

Mell.Toggle.on=function(o){
	
	Mell.MapCall(o,function(o){
		
		if("mell-toggle" in o==false||o["mell-toggle"]=="off"){
			
			o["mell-toggle"]="on";
			
			o["mell-toggle-on-callback"].call(o,o)||false;
			
		}
		
	});
		
	return arguments.callee;
	
}

//关

Mell.Toggle.off=function(o){
	
	Mell.MapCall(o,function(o){
		
		if("mell-toggle" in o&&o["mell-toggle"]=="on"){
			
			o["mell-toggle"]="off";
			
			o["mell-toggle-off-callback"].call(o,o)||false;
			
		}
		
	});
		
	return arguments.callee;
			
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++属性操作(Mell.Attr)+++++++++++++++++++++++++++++++++++++++++++

Mell.Attr={
	
	get: function (o, name){
		
		return o?o.getAttribute(name):null;
		
	},
	
	set: function (o, name, value){
		
		Mell.MapCall(o,function(o){
		
			o.setAttribute(name, value);
		
		});
		
		return arguments.callee;
		
	},
		
	remove: function (o, name){
		
		Mell.MapCall(o,function(o){
							 
			o.removeAttribute(name);
		
		});
		
		return arguments.callee;
		
	},
	
	add:function(o,property){
		
		Mell.MapCall(o,function(o){
									
			Mell.Each(property,function(name,value){
								
				Mell.Attr.set(o,name,value);
									
			});
		
		});
		
		return arguments.callee;
		
	}
	
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++样式(Mell.Style)+++++++++++++++++++++++++++++++++++++++++++++++++

Mell.Style={
	
	toggle:function(o,on_property,on_callback,off_property,off_callback,is_init){
		
		if("Toggle" in Mell==false){return;}
		
		Mell.Toggle(o,function(o){
										
			Mell.Style.add(o,on_property);
			
			on_callback?on_callback.call(o,o):false;
		
		},function(o){
						
			Mell.Style.add(o,off_property);
			
			off_callback?off_callback.call(o,o):false;
			
		},is_init);
		
		return arguments.callee;
			
	},
		
	get:function(o,name){
		
		if(window.getComputedStyle){
			
			if (o!==null){
				
				var value = Mell.Doc.defaultView.getComputedStyle(o,false)[name];
	
				return value;
			}
			
		}else{
			
			if (o!== null){
				
				var value = name === 'opacity'?/opacity=([^)]*)/.test(o.currentStyle['filter']) ?
					(0.01 * parseFloat(RegExp.$1)) + '' :
					1 : o.currentStyle[Mell.Str.camelCase(name)];
	
				return value;
			}
			
		}

		return null;
		
	},

	set:function (o, name, value){
				
		if(Mell.DocElem.style.opacity !== undefined ){
		
			Mell.MapCall(o, function (o){
									  
				if(name=="rotate"){
					
					value="rotate("+(value||0)+"deg)";
					
					o.style.MozTransform=value;
					o.style.WebkitTransform=value;
					o.style.OTransform=value;
					o.style.Transform=value;
					
					return true;
						
				}
				
				if(name=="scale"){	
				
					value="scale("+(value||1)+")";
					
					o.style.MozTransform=value;
					o.style.WebkitTransform=value;
					o.style.OTransform=value;
					o.style.Transform=value;
					
					return true;
				  
				}
				
				o.style[Mell.Str.camelCase(name)]=Mell.Style.core.fix(name,value);
				
				return true;
				
			});
					
		}else{
		
			Mell.MapCall(o,function(o){
										  
				if (!o.currentStyle || !o.currentStyle.hasLayout){
					o.style.zoom = 1;
				}
	
				if (name=="opacity"){
					
					o.style.filter="alpha(opacity="+value*100+")";
					o.style.zoom=1;
					
					return true;
					
				}
				
				o.style[Mell.Str.camelCase(name)]=Mell.Style.core.fix(name,value);
	
				return true;
				
			});
		
		}
		
		return arguments.callee;
		
	},
	
	add:function(o,property){
		
		Mell.MapCall(o,function(o){
			
			Mell.Each(property,function(name,value){
																			
				Mell.Style.set(o,name,Mell.Style.core.fix(name,value));
				
			});
			
		});
		
		return arguments.callee;
							
	},
		
	core:{
		
		unit:function (name,value){
			
			if (Mell.Style.core.number[name]){return"";}
			
			var unit = (value + "").replace(/[\-\+0-9\.]/ig,"");

			return unit ==""? "px" : unit;
			
		},

		number:{"fontWeight": true,"lineHeight": true,"opacity": true,"zIndex":true},

		fix:function (name, value){
			
			if(typeof value=="number"&&!Mell.Style.core.number[name]){value+="px";}

			return value==null&&isNaN(value)?false:value;
			
		}
							 
	}
	
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++(Mell.ClassName)++++++++++++++++++++++++++++++++++++++++++++++++

Mell.ClassName={
	
	toggle:function(o,on_className,on_callback,off_className,off_callback,is_init){
		
		if("Toggle" in Mell==false){return;}
				
		Mell.Toggle(o,function(o){
							   
			Mell.ClassName.remove(o,off_className);
										
			Mell.ClassName.add(o,on_className);
			
			on_callback?on_callback.call(o,o):false;
		
		},function(o){
			
			Mell.ClassName.remove(o,on_className);
			
			Mell.ClassName.add(o,off_className);
			
			off_callback?off_callback.call(o,o):false;
			
		},is_init);
		
		return arguments.callee;
			
	},
		
	add:function (o,names){
		
		Mell.MapCall(o,function (o){
									   
			if (o.className==""){
				
				o.className=names;
				
			}else{
				
				var o_class=o.className;
				
				var nclass=[];

				Mell.MapCall(names.split(/\s+/),function(c){
													
					if (!new RegExp("\\b("+c+")\\b").test(o_class)){
						
						nclass.push(" "+c);
						
					}
					
				});
				
				o.className += nclass.join("");
			}
			
			return o;

		});
		
		return arguments.callee;
				
	},

	set:function (o,name){
		
		Mell.MapCall(o, function (o){
								  
			o.className=name;

			return o;
			
		});
		
		return arguments.callee;
		
	},

	has: function (o, name){
		
		return new RegExp("\\b("+name.split(/\s+/).join("|")+")\\b","g").test(o.className);
		
	},

	remove: function (o,name){
		
		Mell.MapCall(o, function (o){
								  
			o.className=name? 
			Mell.Str.trim(o.className.replace(new RegExp("\\b("+name.split(/\s+/).join("|") + ")\\b","g"),"").split(/\s+/).join(" ")):"";

			return o;
			
		});
		
		return arguments.callee;
		
	}
	
}

//++++++++++++++++++++++++++++++++++++++++++++++++++URL操作(Mell.Url)+++++++++++++++++++++++++++++++++++++++++++++

Mell.Url={
	
	addParam:function (url,params){
		
		/*
		
		url:要追加参数的URL。
		
		params:参数名值数组对象。
		
		将参数对象转换成，URL名值对。如：{callback:get,time:1000}转为callback=get&time=1000
		
		*/
		
		var param_str=[];
								
		var url_param=null;
		
		Mell.Type.isString(params)&&(params=Mell.Url.getParam(params));
		
		if(Mell.Type.isObject(params)){
			
			url_param=Mell.Url.getParam(url);
			
			if(!Mell.Type.isObject(url_param)){
				
				url+=url?"?":"";
				
				url_param=params;
				
			}else{
				
				url=url.substr(0,((/\?/.test(url)?url.indexOf("?"):(/\//.test(url)?url.lastIndexOf("\/"):-1))+1));
								
				Mell.Each(params,function(key,value){
					
					url_param[key]=value;
					
				});				
				
			}
			
			Mell.Each(url_param,function(key,value){
						
				param_str.push(key+"="+Mell.Url.encode(value));
			  
			});
							
			url+=param_str.join("&");
							
		}
		
		return url;//返回添加参数后的URL
		
	},
	
	getParam:function(url){
		
		//url:要获取参数的url
		
		if(!/\?|\&|\=/.test(url)||!Mell.Type.isString(url)){
			
			return Mell.Type.isObject(url)?url:null;
			
		}
		
		var str_arr=url.substr(((/\?/.test(url)?url.indexOf("?"):(/\//.test(url)?url.lastIndexOf("\/"):-1))+1)).split("&");
		
		var cache=null;
		
		var param_arr={};
		
		Mell.MapCall(str_arr,function(v){
			
			if(v!=""){
				
				cache=v.split("=");
				
				(cache.length>1)&&(param_arr[cache[0]]=Mell.Url.decode(cache[1]));
			
			}
			
		});
		
		return param_arr;//返回参数键值对象，如：{n:1,b:2}
		
	},
			
	encode:function (data){
		
		return encodeURIComponent(data);
		
	},
	
	decode:function (data){
		
		return decodeURIComponent(data);
		
	}

}

//++++++++++++++++++++++++++++++++++++++++++++++JS/CSS加载(Mell.Load)++++++++++++++++++++++++++++++++++++++++++++++

Mell.Load=function(url,callback,timeout_callback,timeout){
	
	  //url:文件路径。
	  //callback:成功回调function。
	  //timeout_callback：超时回调。
	  //timeout：超时时间（毫秒）。
						  
	if(!url){return arguments.callee;}
	
	if(Mell.Type.isObject(url)||Mell.Type.isArray(url)){
				
		Mell.Each(url,function(i,src){
							   
			Mell.Load(src,callback,timeout_callback,timeout);
							   
		});
		
		return arguments.callee;
		
	}
	
	var load_timeout=null;
	
	var is_css=url.match(/\.css[^\.]*$/ig);
		
	var tag=null;
	
	var property=null;
	
	var _load=null;
	
	if(is_css){//CSS
		
		tag="link";
	
		property={attr:{
			
			rel:"stylesheet",
			
			type:"text/css",
			
			href:url
		
		}};
		
	}else{//JS
		
		tag="script";
		
		property={attr:{
			
			type:"text/javascript",
								  
			language:"javascript",
			
			charset:"utf-8",
			
			async:true,
			
			src:url
		
		}};
	
	}
	
	_load=Mell.Dom.create(tag,property);
			
	load_timeout=setTimeout(function(){
			
		Mell.Dom.remove(_load);
		
		clearTimeout(load_timeout);
		
		timeout_callback?timeout_callback.call(_load,_load):false;
		
		_load=null;
		
	},timeout?timeout:10000);
	
	if(Mell.Browser.type!="ie"){
		
		_load.onload=function(){
			
			if(load_timeout){clearTimeout(load_timeout);}
											
			if(callback){callback.call(_load,_load);}
			
		}
				
	}else{
				
		if(_load.readyState){
							
			_load.onreadystatechange = function(){
				
				if (_load.readyState=="loaded"||_load.readyState=="complete"){
					
					if(load_timeout){clearTimeout(load_timeout);}
																	
					if(callback){callback.call(_load,_load);}
					
				}
				
			}
		
		}
		
	}
	
	Mell.Dom.append(Mell.ByTag(document,"head")[0],_load);
	
	return arguments.callee;
	
}

//+++++++++++++++++++++++++++++++++++++++++++++Json判断及转换(Mell.Json)+++++++++++++++++++++++++++++++++++++++++++++

Mell.Json={
	
	//判断是否为Json格式字符串
		   
	isJson:function(string){
		
		return typeof string=="string"&&Mell.Str.trim(string)!==""?/^[\],:{}\s]*$/.test(string.replace(/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,"@").replace(/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")):false;
		
	},
	
	//获取JSON长度（json.length）
	
	length:function(data){
		
		if(!data){
			
			return 0;
			
		}
		
		if(Mell.Type.isString(data)&&Mell.Json.isJson(data)){
			
			return  Mell.Json.length(Mell.Json.decode(data));
			
		}
		
		if(Mell.Type.isObject(data)){
			
			var length=0;
			
			for(var i in data){
				
				length++;
				
			}
			
			return length;
			
		}
		
		if(Mell.Type.isArray(data)){
			
			return data.length;
			
		}

		return 0;
		
	},
		
	//将字符转换为Json
	
	decode:function(string){
		
		if(!Mell.Json.isJson(string)){return false;}
			
		if(window.JSON){ 
		
			return JSON.parse(Mell.Str.trim(string));
		
		}else{ 
		
			return (new Function("return "+string))(); 
		
		}
		
	},
	
	//将Json转换为字符串形式
	
	encode:function (data){
		
		if(window.JSON){
			
		return JSON.stringify(data);
			
		}else{
			
		function stringify(data){
			
			var temp = [],i, type, value,rvalue;
			for (i in data){
				value = data[i];
				type = typeof value;
				if (type=="undefined"){
					return;
				}
				if (type!=="function"){
					switch (type){
						case"object":
							rvalue=value==null?value:value.getDay?"\""+(1e3-~value.getUTCMonth()*10+value.toUTCString()+1e3+ value/1).replace(/1(..).*?(\d\d)\D+(\d+).(\S+).*(...)/,"$3-$1-$2T$4.$5Z")+"\"":value.length?"["+(function(){
								var rdata = [];
								Mell.Each(value, function (i, item){
									rdata.push((typeof item=="string"?"\""+Mell.Str.slashes(item)+"\"":item));
								});
								return rdata.join(",");
							})()+"]":Mell.Json.encode(value);
							break;
						case"number":
							rvalue=!isFinite(value)?null:value;
							break;
						case "boolean":
						case "null":
							rvalue=value;
							break;
	
						case "string":
							rvalue ="\""+Mell.Str.trim(value)+"\"";
							break;
					}
					temp.push(!Mell.Type.isArray(data)?"\""+i+"\""+":"+rvalue:rvalue);
				}
			}
			return temp.join(",");
		}
		return Mell.Type.isArray(data)?"["+stringify(data)+"]":"{"+stringify(data)+"}";
		}
	}

}

//+++++++++++++++++++++++++++++++++++++++++++++++异步加载(Mell.Ajax)+++++++++++++++++++++++++++++++++++++++++++++++++++++++

Mell.Ajax=function(url,data,type,callback,error_callback,header_property,on_file_modified){
	
	/*
	
	url:加载地址。
	
	data:数据，如：{a:1,b:2}或a=1&b=2。
	
	type:发送方式 GET || POST
	
	callback:成功回调。
	
	error_callback:错误回调
	
	header_property:HTTP请求头，如:{"Content-Type":"text/text"},一般情况下不用设置。
	
	on_file_modified:文件有更新时重新加载文件；false（默认，始终加载）||true（文件有更新时加载）；
	
	*/
		
	if(!url||url==""){return arguments.callee;}
	
	if(type&&type!=""){
		
		type=type.toUpperCase();
		
	}else{
		
		type="GET";
		
	}
	
	if(data&&data!=""){
		
		if(type=="GET"){
	
			url=Mell.Url.addParam(url,data);
							
			data=null;
		
		}else{
			
			data=Mell.Type.isObject(data)?Mell.Url.addParam("",data):data;
			
		}
		
	}else{
		
		data=null;
		
	}
	
	if(Mell.Browser.type=="ie"&&type=="GET"&&!on_file_modified){//解决IE缓存导致的不请求BUG
			
		url=Mell.Url.addParam(url,{mell_ajax_timestamp:new Date().getTime()});
				
	}

	var xmlhttp=null;
		
	try { xmlhttp=new XMLHttpRequest(); }catch (e){ 
	
	  try  { xmlhttp=new ActiveXObject("Microsoft.XMLHTTP"); }catch(e){ 
	  
		try  { xmlhttp=new ActiveXObject("Msxml2.XMLHTTP"); }catch (e){ 
		
		 xmlhttp=null; 
		 
		} 
	   
	  }   
	 
	}
		
	if(xmlhttp==null){return arguments.callee;}
	
	xmlhttp.open(type,url,true);
			
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
	
	on_file_modified?xmlhttp.setRequestHeader("If-Modified-Since","0"):false;
	
	if(header_property&&header_property!=""&&Mell.Type.isObject(header_property)){
		
		Mell.Each(header_property,function(key,value){
		
			xmlhttp.setRequestHeader(key,value);
				  
		});
		
	}
		
	xmlhttp.send(data);
	
	xmlhttp.onreadystatechange=function(){
		
		//0 = 未初始化 1 = 读取中 2 = 已读取 3 = 交互中 4 = 完成
					
		if(xmlhttp.readyState==4){
			
			if(xmlhttp.status==200){
				
				data=xmlhttp.responseText||null;
				
				callback?callback(Mell.Json.isJson(data)?Mell.Json.decode(data):data):false;
				
				xmlhttp=null;	
				
			}else{
				
				data=xmlhttp.status||null;
				
				error_callback?error_callback(data):false;
				
				xmlhttp=null;
				
			}
			
		}
		
	}
	
	return arguments.callee;
		
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++动画(Mell.Animate)+++++++++++++++++++++++++++++++++++++++++++++++++

Mell.Animate=function(o,properties,duration,callback){
	
	//o:对象，properties：属性 duration：动画时长， callback：完成后回调，
		
	o&&Mell.Animate.core(o, properties, duration, callback);
	
	return arguments.callee;
	
}

Mell.Animate.core=(function (){//动画内核
	var style =Mell.DocElem.style;
	return (style.webkitTransition !== undefined ||
		style.MozTransition !== undefined ||
		style.OTransition !== undefined ||
		style.msTransition !== undefined ||
		style.transition !== undefined);
}())?(function (){
	var style =Mell.DocElem.style,
		prefix_name = style.webkitTransition !== undefined ? 'Webkit' :
			style.MozTransition !== undefined ? 'Moz' :
			style.OTransition !== undefined ? 'O' :
			style.msTransition !== undefined ? 'ms' : '',
		transition_name = prefix_name + 'Transition';

	return function (elem, properties, duration, callback){
		return Mell.MapCall(elem, function (elem){
			var css_value = [],
				css_name = [],
				unit = [],
				css_style = [],
				style = elem.style,
				css, offset;
			duration = duration || 300;
			for(css in properties){
				css_name[css] =Mell.Str.camelCase(css);
				if (properties[css].from!==undefined){
					properties[css].to = properties[css].to || 0;
					css_value[css] = !Mell.Style.core.number[css] ? parseInt(properties[css].to, 10) : properties[css].to;
					unit[css] =Mell.Style.core.unit(css, properties[css].to);
					Mell.Style.set(elem, css_name[css], parseInt(properties[css].from, 10) + unit[css]);
				}else{
					css_value[css] = !Mell.Style.core.number[css] ? parseInt(properties[css], 10) : properties[css];
					unit[css] = Mell.Style.core.unit(css, properties[css]);
					Mell.Style.set(elem, css_name[css], Mell.Style.get(elem, css_name[css]));
				}
				css_style.push(css);
			}

			setTimeout(function (){
				style[transition_name] = 'all ' + duration + 'ms';
				
				Mell.Each(css_style,function (i, css){
					style[css_name[css]] = css_value[css] + unit[css];
				});
			}, 15);
			// 动画完成
			setTimeout(function(){
				// 清除CSS属性
				style[transition_name] = '';

				if (callback){
					callback.call(elem,elem);
				}
			}, duration);

			return elem;
		});
	}
})() :
function (elem, properties, duration, callback){
	return Mell.MapCall(elem,function(elem){
		var step = 0,
			i = 0,
			j = 0,
			length = 0,
			p = 30,
			css_to_value = [],
			css_from_value = [],
			css_name = [],
			css_unit = [],
			css_style = [],
			property_value, css, offset, timer;

		duration = duration || 300;

		for (css in properties){
			css_name.push(Mell.Str.camelCase(css));
			if (properties[css].from !== undefined){
				property_value = properties[css].to;
				css_from_value.push(!Mell.Style.core.number[css] ? parseInt(properties[css].from, 10) : properties[css].from);
				Mell.Style.set(elem, css_name[i], css_from_value[i] + Mell.Style.core.unit(css, property_value));
			}else{
				property_value = properties[css];
				css_from_value.push(parseInt(Mell.Style.get(elem,Mell.Str.camelCase(css)), 10));
			}
			css_to_value.push(!Mell.Style.core.number[css] ? parseInt(property_value, 10) : property_value);
			css_unit.push(Mell.Style.core.unit(css, property_value));
			i++;
			length++;
		}
		// 计算 CSS 值
		for (j = 0; j < p; j++){
			css_style[j] = [];
			for (i = 0; i < length; i++){
				css_style[j][css_name[i]] =
					(css_from_value[i] + (css_to_value[i] - css_from_value[i]) / p * j) +
					(css_name[i] === 'opacity' ? '' : css_unit[i]);
			}
		}

		for (;i<p;i++){
			timer = setTimeout(function (){
				for (i=0;i<length;i++){
					Mell.Style.set(elem, css_name[i], css_style[step][css_name[i]]);
				}
				step++;
			}, (duration / p) * i);
		}

		setTimeout(function (){
			for (i = 0; i < length; i++){
				Mell.Style.set(elem, css_name[i], css_to_value[i] + css_unit[i]);
			}
			if (callback){
				callback.call(elem,elem);
			}
		}, duration);

		return elem;
	});
}

//++++++++++++++++++++++++++++++++++++++++++++显示隐藏(Mell.Display)+++++++++++++++++++++++++++++++++++++++++++++++++++++

Mell.Display={
	
	on:function(o,callback){
		
		Mell.MapCall(o,function(){
			
			Mell.Display.core.set(this,"show");
			
			callback?callback.call(this,this):false;	
					
		});
		
		return arguments.callee;
		
	},
	
	off:function(o,callback){
		
		Mell.MapCall(o,function(){
			
			Mell.Display.core.set(this,"hidden");
			
			callback?callback.call(this,this):false;	
		
		});
		
		return arguments.callee;
		
	},
	
	toggle:function(o,on_callback,off_callback){
		
		Mell.MapCall(o,function(){
		
			Mell.Display.core.getDisplayStatus(this)=="show"?
			Mell.Display.off(this,off_callback):Mell.Display.on(this,on_callback);
			
		});
		
		return arguments.callee;
				
	},	
	
	fadeIn:function(o,duration,callback){
		
		Mell.MapCall(o,function(){
		
			if(Mell.Style.get(this,"opacity")<=1&&Mell.Display.core.getDisplayStatus(this)!="show"){
				
				Mell.Display.on(this);
				
			}else{
				
				return false;
				
			}
			
			if("Animate" in Mell){
				
				Mell.Animate(this,{
													 
					"opacity":{
						
						from:0,
						
						to:1
						
					}
							 
				},duration||500,callback);
				
			}
		
		});
		
		return arguments.callee;
		
	},
	
	fadeOut:function(o,duration,callback){
		
		Mell.MapCall(o,function(){
		
			if(Mell.Style.get(this,"opacity")>0&&Mell.Display.core.getDisplayStatus(this)=="show"){
			
				Mell.Display.on(this);
			
			}else{
						
				return false;
			
			}
			
			if("Animate" in Mell){
				
				Mell.Animate(this,{
							 
					"opacity":{
						
						from:1,
						
						to:0
						
					}
							 
				},duration||500,function(){
					
					Mell.Display.off(this);
					
					callback?callback.call(this,this):false;
				
				});
				
			}else{
				
				Mell.Display.off(this,callback);
				
			}
		
		});
		
		return arguments.callee;
				
	},
	
	fadeToggle:function(o,duration,in_callback,out_callback){
		
		Mell.MapCall(o,function(){
		
			duration=duration||500;
			
			if("Animate" in Mell){
				
				(Mell.Style.get(this,"opacity")>0&&Mell.Display.core.getDisplayStatus(this)=="show")?
				Mell.Display.fadeOut(this,duration,out_callback):
				Mell.Display.fadeIn(this,duration,in_callback);
				
			}else{
			
				Mell.Display.toggle(this,in_callback,out_callback);
			
			}
		
		});
		
		return arguments.callee;
		
	},
		
	core:{
				
		property:["borderTopWidth","borderBottomWidth","borderLeftWidth","borderRightWidth",
				  "width","height","marginTop","marginBottom","marginLeft","marginRight",
				  "paddingTop","paddingBottom","paddingLeft","paddingRight"],
		
		set:function(o,mode){
									
			if(mode=="show"){
				
				if(Mell.Display.core.getDisplayStatus(o)=="show"){
					
					return;
					
				}
				
				Mell.Display.core.setDisplay(o,mode);
				
				if(Mell.Browser.type=="ie"){
					
					return;
					
				}
				
				if("mell-display"in o==false){
					
					return;
					
				}

				Mell.MapCall(Mell.Display.core.property,function(prop){
																											  					
					Mell.Style.set(o,prop,o["mell-display"][prop]);																						  
				});
				
				return;

			}
			
			if(mode=="hidden"){
				
				if(Mell.Display.core.getDisplayStatus(o)=="hidden"){
					
					return;
					
				}
				
				Mell.Display.core.setDisplay(o,mode);
				
				if(Mell.Browser.type=="ie"){
					
					return;
					
				}
								
				"mell-display"in o==false?o["mell-display"]={}:false;
				
				Mell.MapCall(Mell.Display.core.property,function(prop){
								   
					o["mell-display"][prop]=Mell.Style.get(o,prop);
					
					Mell.Style.set(o,prop,0);																						  
				});
				
				return;
			
			}
			
		},
		
		getDisplayStatus:function(o){
			
			return ((Mell.Style.get(o,"overflow")=="hidden"&&
			Mell.Style.get(o,"visibility")=="hidden")||
			(Mell.Style.get(o,"display")=="none"))?"hidden":"show";
			
		},
		
		setDisplay:Mell.Browser.type!="firefox"?function(o,m){
			
			Mell.Style.set(o,"display",m=="show"?"block":"none");
			
		}:function(o,m){
			
			m=m=="show"?"visible":"hidden";
				
			Mell.Style.add(o,{
						   
				"visibility":m,
				
				"overflow":m
																						  
			});			
			
			if(Mell.Style.get(o,"display")=="none"){
				
				Mell.Style.set(o,"display","block");
				
			}
				
		}
			
	}

}

//++++++++++++++++++++++++++++++++++++++++++++++++++选项卡(Mell.Tab)+++++++++++++++++++++++++++++++++++++++++++++++++++++

Mell.Tab=function(o,event_type,selector,fn,selected_class,default_class,default_tab,repeat){
		
	/*
	
	o:对象
	event_type:事件名如"click"
	selector:选择
	fn:函数
	selected_class:选中样式ClassName或Style属性如{border:""}
	default_class:默认样式ClassName或Style属性如{border:""}
	default_tab:默认选中（类型为对象或ID）
	repeat:是否重复触发（true || false ）
	
	*/
	  	  
	if(!o||!event_type||!selector||!Mell.Type.isString(event_type)){return arguments.callee;}
	  	  
	var the_fn=null;
	  
	var first_event=null;
				  
	the_fn=function(e){
					 
		if(!repeat&&this==e.srcTarget["mell-tab-on-"+selector]){
			
			return false;
			
		}	
		
		if(this==e.srcTarget["mell-tab-on-"+selector]){
			
			return fn?fn.call(this,e):false;
						
		}
		
		var tab_on=e.srcTarget["mell-tab-on-"+selector];
				
		e.srcTarget["mell-tab-on-"+selector]=this;	
		
		if(selected_class){

			if(Mell.Type.isObject(selected_class)){
			
				Mell.Style.add(this,selected_class);
			
			}else{
				
			   default_class&&Mell.ClassName.remove(this,default_class);
				
				Mell.ClassName.add(this,selected_class);
				
			}
		
		}
		
		if(default_class){
			
			if(Mell.Type.isObject(default_class)){
		
				Mell.Style.add(tab_on,default_class);
			
			}else{
				
				selected_class&&Mell.ClassName.remove(tab_on,selected_class);
				
				Mell.ClassName.add(tab_on,default_class);
				
			}
		
		}else{
			
			selected_class&&Mell.ClassName.remove(tab_on,selected_class);
			
		}
					 
		e["relatedTarget"]=tab_on;
		
		return fn?fn.call(this,e):false;
			  
	}
	
	first_event=event_type.split(/\s+/)[0];
							
	Mell.Event.on(o,event_type,selector,the_fn);
											
	if(default_tab){
		
		default_tab=Mell.Type.isString(default_tab)?Mell(default_tab):default_tab;
		
		if(default_tab){
									
			Mell.Event.doIt(default_tab,first_event);
			
			o["mell-tab-on-"+selector]=default_tab;
		
		}
	
	}
	
	return arguments.callee;

}

//+++++++++++++++++++++++++++++++++++++++++++++++++固定对象到指定位置(Mell.Fixed)++++++++++++++++++++++++++++++++++++++

Mell.Fixed=function(o,left,top,right,bottom){
	
	//o:对象。
	//left:可以是数字，也可以是：'left'\'right'或'center'。
	//top:可以是数字，也可以是：'top'\'bottom'或'center'。
	//right和bottom：只能是数字。
	
	if(!o){return arguments.callee;}
				
	var _left=0,_top=0,_right=0,_bottom=0,client_height=0,client_width=0;
			
	if(Mell.Browser("msie6.0")&&arguments.length<6){
		
		client_height="Mell.ClientHeight()";
		
		client_width="Mell.ClientWidth()";
		
		if("IE6_init" in Mell.Fixed==false){
			
			var html=Mell.ByTag(document,"html")[0];
			
			html.style.backgroundImage="url(about:blank)";
			
			html.style.backgroundAttachment="fixed";
			
			Mell.Fixed.IE6_init=true;
		
		}
		
		_right=!isNaN(right)?right:0;
			
		_bottom=!isNaN(bottom)?bottom:0;

		if(top&&top!=""){
			
			_top=!isNaN(top)?top:top=="top"?0:top=="bottom"?
			client_height+"-this.offsetHeight":top=="center"?"("+client_height+"*0.5)-(this.offsetHeight*0.5)":0;
				
		}
		
		if(left&&left!=""){
			
			_left=!isNaN(left)?left:left=="left"?0:left=="right"?
			client_width+"-this.offsetWidth":left=="center"?"("+client_width+"*0.5)-(this.offsetWidth*0.5)":0;
					
		}
					
		_left="Mell.ScrollLeft()+("+_left+")-("+_right+")";
		
		_top="Mell.ScrollTop()+("+_top+")-("+_bottom+")";
			
		Mell.MapCall(o,function(o){
								
			if(o.parentNode&&o.parentNode!=document.body){//父级不为body时
				
				Mell.Fixed(o,left,top,right,bottom,1);
				
				return;
				
			}
								
			o.style.position="absolute";
								
			o.style.setExpression("top","eval("+_top+")");
			
			o.style.setExpression("left","eval("+_left+")");
		
		});
	
	}else{
		
		client_height=Mell.ClientHeight();
		
		client_width=Mell.ClientWidth();
				
		if(top&&top!=""){
			
			if(!isNaN(top)){_top=top;}
			
			if(top=="top"){_top=0;}
						
			if(top=="center"){_top=top;}
			
			if(top=="bottom"){_top="auto";}
						
		}else{
			
			_top=0;
									
		}
		
		if(left&&left!=""){
			
			if(!isNaN(left)){_left=left;}
			
			if(left=="left"){_left=0;}
			
			if(left=="center"){_left=left;}
			
			if(left=="right"){_left="auto";}

		}else{
			
			_left=0;
						
		}
			
		_left=!isNaN(_left)&&_left!="center"?!isNaN(right)?(_left-right)+"px":_left+"px":_left;
		
		_right=isNaN(_left)?!isNaN(right)?right+"px":0:"auto";
			
		_top=!isNaN(_top)&&_top!="center"?!isNaN(bottom)?(_top-bottom)+"px":_top+"px":_top;
		
		_bottom=isNaN(_top)?!isNaN(bottom)?bottom+"px":0:"auto";
		
		Mell.MapCall(o,function(o){
								
			if(o.parentNode&&o.parentNode!=document.body||arguments.length>5){//父级不为body时
				
				client_width=o.parentNode.offsetWidth;
				
				client_height=o.parentNode.offsetHeight;
				
				o.style.position="absolute";
				
			}else{
				
				o.style.position="fixed";
			
			}
			
			_left=_left!="center"?
			_left:((100-(((o.offsetWidth+(Mell.Str.toNumber(_right)*2))/(client_width))*100))*0.5)+"%";
			
			o.style.left=_left;
				
			o.style.right=_right;
				
			o.style.top=_top!="center"?
			_top:((100-(((o.offsetHeight+(Mell.Str.toNumber(_bottom)*2))/(client_height))*100))*0.5)+"%";
				
			o.style.bottom=_bottom;
		
		});
		
	}
	
	return arguments.callee;
	
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++事件处理(Mell.Event)++++++++++++++++++++++++++++++++++++++++++++

Mell.Event={
	
	/*
	
	一个对象绑定多个事件多个函数:
	
	Mell.Event.on(o,{
				  
		click:function(){alert(0);},
		
		mousover:function(){alert(1);}
		 
	},"div",{})
	
	一个对象绑定多个事件:
	
	Mell.Event.on(o,"click mouseover","div",function(){alert(0)},{})
	
	*/
	
	on:function(o,types,selector,fn,data){//绑定事件
				
		Mell.MapCall(o,function(o){
								
			Mell.Event.core.add(o,types,selector,fn,data);
			
		});
				
		return arguments.callee;
		
	},
	
	off:function(o,types,selector,fn){//关闭事件
						
		Mell.MapCall(o,function(o){
					
			Mell.Event.core.remove(o,types,selector,fn);
			
		});
			
		return arguments.callee;
		
	},
	
	doIt:function(o,event_type){//触发某个绑定事件
							
		/*
		
		o:对象或ID
		
		event_type:事件类型
		
		*/
		
		Mell.MapCall(o,function(o){
		
			var tag=null;
								
			if(Mell.Type.isString(o)){tag=Mell(o);}
			
			if(Mell.Type.isDom(o)){tag=o;}
				
			if(tag!=null){
							
				 if(document.all){
					   
					tag[event_type]();
					  
				 }else{ 
				   
				   var evt=document.createEvent("MouseEvents");
				   
				   evt.initEvent(event_type,true,true);  
				   
				   tag.dispatchEvent(evt);
				   
				}
				
				tag=null;
			
			}
					
		});
		
		return arguments.callee;
							
	},
	
	//事件处理内核部分
	
	core:{
		
		//事件全局标号
		
		gid:0,
		
		//事件全局标记
		
		g:{},
				
		//克隆代理事件列表
		
		proEvent:["altKey","bubbles","button","buttons","cancelable",
		"ctrlKey","offsetX","offsetY","screenX","screenY","shiftKey","timeStamp"],
		
		//事件兼容替换列表
		
		replaceEvent:{
			
			//移动设备事件
			
			MobileEvent:{"mousedown":"touchstart","mousemove":"touchmove","mouseup":"touchend"},
			
			//鼠标进入和离开事件
			
			mouseEnterLeave:{"mouseenter":"mouseover","mouseleave":"mouseout"}
						
		},
		
		//添加事件
		
		add:function(o,types,selector,fn,data){
															
			if(Mell.Type.isString(types)){
				
				//一个对象多个事件绑定:types="eventType eventType"
				
				var _type=types.split(/\s+/);
				
				if(_type.length>1){
								
					Mell.MapCall(_type,function(type){
															 
						Mell.Event.on(o,type,selector,fn,data);									 
															 
					});
					
					return;
				
				}
				
			}
			
			if(Mell.Type.isObject(types)){
				
				//一个对象多个事件多个函数（function）绑定:types={eventType:fn,eventType:fn}
				
				if (Mell.Type.isObject(selector)){
					
					fn=data;
					
					data=selector;
					
					if (Mell.Type.isString(fn)){
						
						selector=fn;
						
					}else{

						selector=undefined;
					
					}
					
				}
					
				for (type in types){
					
					Mell.Event.on(o,type,selector,types[type],data);
					
				}
				
				return;
				
			}
										
			if(Mell.Type.isFunction(selector)){
				
				fn=selector;
				
				data=fn;
				
				selector=undefined;
				
			}
			
			if(!fn){return;}
						
			types=Mell.Event.core.replaceEventName(types);
			
			var gid=o.gid;
					
			var e_key=(selector||"")+"_"+types;
			
			var fn_key=fn;

			if(!o.gid){
				
				Mell.Event.core.gid++;
				
				gid=o.gid=Mell.Event.core.gid;
				
				Mell.Event.core.g[gid]={};
								
			}
					
			if(!Mell.Event.core.g[gid][e_key]){
				
				Mell.Event.core.g[gid][e_key]={};
								
			}
						
			fn=Mell.Event.core.delegateEvent(o,types,selector,fn,data);
						
			Mell.Event.core.replaceEvent.mouseEnterLeave[types]&&
			(fn=Mell.Event.core.mouseEnter(o,fn,selector,types));
			
			types=Mell.Event.core.replaceEvent.mouseEnterLeave[types]||types;
									
			Mell.Event.core.addEvent(o,types,fn);
			
			Mell.Event.core.g[gid][e_key][fn_key]=fn;
			
		},
		
		//绑定事件
		
		addEvent:function(o,types,fn){
			
			if(o.addEventListener){
							
				o.addEventListener(types,fn,(types=="blur"||types=="focus")); 
			
			} else { 
			
				o.attachEvent("on" +types,fn);
			
			} 
			
		},
		
		//移除事件
		
		remove:function(o,types,selector,fn){
			
			if(!o.gid){return;}
			
			if(Mell.Type.isString(types)){
								
				var _type=types.split(/\s+/);
				
				if(_type.length>1){
								
					Mell.MapCall(_type,function(type){
															 
						Mell.Event.off(o,type,selector,fn);									 
															 
					});
					
					return;
				
				}
				
			}

			if (Mell.Type.isObject(types)){
				
				for (type in types){
					
					Mell.Event.off(o,type,selector,types[type]);
					
				}
				
				return;
				
			}
			
			if(Mell.Type.isFunction(selector)){
				
				var _f=fn;
				
				fn=selector;
				
				selector=_f;
				
				_f=null;
				
			}
			
			types=Mell.Event.core.replaceEventName(types);
			
			var gid =o.gid;
			
			var e_key=(selector||"")+"_"+types;
			
			var fn_key=fn;
						
			types&&(types=Mell.Event.core.replaceEvent.mouseEnterLeave[types]||types);				
				
			if(!types){//移除对象绑定的所有事件
				
				Mell.Each(Mell.Event.core.g[gid],function(key,v){
													 
					var type=key.split("_")[1];
					
					types&&(types=Mell.Event.core.replaceEvent.mouseEnterLeave[types]||types);				
									
					Mell.Each(v,function(k,f){
															
						Mell.Event.core.removeEvent(o,type,f);
						
					});
					
				});
				
				delete Mell.Event.core.g[gid];
				
			} else if (!fn){//移除对象指定类型事件
				
				Mell.Each(Mell.Event.core.g[gid][e_key],function(i,f){
												
					Mell.Event.core.removeEvent(o,types,f);
										
				});
				
				delete Mell.Event.core.g[gid][e_key];
								
			}else{//移除对象指定功能函数
				
				Mell.Event.core.removeEvent(o,types,Mell.Event.core.g[gid][e_key][fn_key]);
				
				delete Mell.Event.core.g[gid][e_key][fn_key];
				
			}
			
		},
		
		//解绑事件
		
		removeEvent:function(o,types,fn){
			
			if(o.removeEventListener){ 
			
				o.removeEventListener(types,fn,(types=="blur"||types=="focus"));
				
			} else { 
			
				o.detachEvent("on" +types,fn); 
					
			} 
			
		},
		
		//事件名兼容性替换

		replaceEventName:function(types){
			
			if(!types){return types;}
			
			types=types.toLowerCase();
						
			types=types.substr(0,2)=="on"?types.substr(2,types.length):types;
			
			if(types.match(/mousewheel|dommousescroll/ig)){//firfox滚轮事件兼容
			
				return Mell.Browser.type!="firefox"?"mousewheel":"DOMMouseScroll";
			
			}
			
			if(types.match(/focus|blur/ig)&&Mell.Browser.type=="ie"){//IE下的Focus/Blur
				
				return types=="focus"?"focusin":"focusout";
				
			}
						
			if(Mell.Browser.isMobile){//触屏设备事件兼容
								
				return Mell.Event.core.replaceEvent.MobileEvent[types]||types;
				
			}
			
			return types;
				
		},
				
		//代理事件打包
				
		delegateEvent:function(o,types,selector,fn,data){
			
			return function(event){
			 
			var dgEvent={};
			
			dgEvent.target=Mell.Event.core.getEventTarget(event); 
			
			var addEventParam_Fn=Mell.Event.core.addEventParam(event,types,dgEvent);
			
			var target=!selector?o:dgEvent.target; 
							
			addEventParam_Fn?addEventParam_Fn():false;	
			 
			dgEvent.srcEvent=event;
			
			dgEvent.srcTarget=o;
			
			dgEvent.relatedTarget=Mell.Event.core.getRelatedTarget(event,types);
			
			dgEvent.data=data&&data!=""?data:undefined;
			
			dgEvent.stopPropagation=Mell.Event.core.stopPropagation;
			
			dgEvent.stopDefault=Mell.Event.core.stopDefault;	

			Mell.MapCall(Mell.Event.core.proEvent,function(key){
											
				if(key in event){
					
					dgEvent[key]=event[key];
					
				}
					
			});
			 
			if(!selector){//单一对象事件触发
								
				Mell.Event.core.runEvent(event,types,selector,target,dgEvent,fn);
								
			}else{
					
				if(!Mell.Event.core.replaceEvent.mouseEnterLeave[types]){//一般选择代理触发
				  
					for(;target!=o;target=dgEvent.target=target.parentNode){
						
						if(!target||target==document.body){
							
							break;
							
						}
					 
						if(Mell.Dom.matchSelector(target,selector)){
									   
							if(Mell.Event.core.runEvent(event,types,selector,target,dgEvent,fn)==false){
								
								break;
								
							}
											
						}
					
					}
										
				}else{
					
					/*
					
					mouseenter/mouseleave循环代理触发
					
					*/
				  
					for(;target!=o&&dgEvent.relatedTarget!=target&&target!=document.body;){
								  
						if(dgEvent.relatedTarget&&Mell.Dom.contains(target,dgEvent.relatedTarget)){
							
							break;
							
						}
					  
						if(Mell.Dom.matchSelector(target,selector)){
						  
							Mell.Event.core.runEvent(event,types,selector,target,dgEvent,fn);
						   
						}
						  
						try{ 
						
							target=dgEvent.target=target.parentNode;
						
						}catch(e){
							
							break;
							
						}
							  
					}
					  
				} // 一般选择代理触发 END
				   				  
			} // 单一对象事件触发 END
			
		  }
			
		},
		
		//参数兼容性调整
		
		addEventParam:function(event,types,dgEvent){
						
		  if(types.match(/click|mouse|contextmenu|DOMMouseScroll/ig)){//鼠标事件
			
			  return function(){	
			  
				  var offset=Mell.Offset(document);
			  
				  if(event.pageX){
							
					  dgEvent.pageX=event.pageX;
						  
					  dgEvent.pageY=event.pageY;
										  
					  dgEvent.clientX=event.pageX-offset.left;
					  
					  dgEvent.clientY=event.pageY-offset.top;
						 
				  }else{
							
					  dgEvent.pageX=event.clientX+offset.left;
						  
					  dgEvent.pageY=event.clientY+offset.top;
										  
					  dgEvent.clientX=event.clientX;
					  
					  dgEvent.clientY=event.clientY;
							  
				  }
				  
				  if (types.match(/DOMMouseScroll|mousewheel/ig)){
					
					  dgEvent.wheel=event.wheelDelta?event.wheelDelta/120:-(event.detail||0)/3;
				  
				  }
				  
				  if(Mell.Browser.isMobile==false){
					
					  dgEvent.rightClick=event.which==3||event.button== 2;
					
				  }else{
					
					  dgEvent.rightClick=false;
					
				  }
				  
			  }
										 
		  }
			
		  if(types.match(/key/ig)){//键盘事件
			  
			  return function(){
				  
				  dgEvent.keyCode=event.which||event.keyCode||event.charCode;
				  
				  dgEvent.ctrlKey=event.metaKey||event.ctrlKey;
				  
			  }
						  
		  }
			
		  if(types.match(/touch|gesture/ig)){//移动触摸设备事件
			
				return (function(){
														
					var touches=dgEvent.touches=event.touches;
					
					if (touches&&touches[0]){
					
						var touch=touches[0];
						
						dgEvent.pageX=touch.pageX;
						
						dgEvent.pageY=touch.pageY;
						
						dgEvent.clientX=touch.clientX;
						
						dgEvent.clientY=touch.clientY;
					
					}
				
				});
			
			}
			
		},
		
		//运行事件
		
		runEvent:function(event,types,selector,target,dgEvent,fn){
								
			if(!fn||fn.call(target,dgEvent)==false){
			
				Mell.Event.core.stopAll(dgEvent);
				
				return false;
				 
			}
									  
		},
		
		//mouseenter,mouseleave事件拦截	
		
		mouseEnter:function (o,fn,selector,types){
			 
			return function(event){
				  
				var rtarget=Mell.Event.core.getRelatedTarget(event,types);
				
				var target=o;
				
				if(selector){ 
				
					target=Mell.Event.core.getEventTarget(event);
				
					if(!target||!rtarget){
						
						fn.call(target,event);
						
						return;
						
					}
		
				}
				
				if (target==rtarget){return;}
					
				while(target&&rtarget&&rtarget!=target){
					
					rtarget=rtarget.parentNode;
										
				}
					
				if (rtarget==target){return;}
					
				fn.call(target,event);
				
			}
			
		},
				
		//获取事件源对象
		
		getEventTarget:function(event){
			
			return event.target||event.srcElement||document;
			
		},
		
		//获取事件相关对象
		
		getRelatedTarget:function(event,types){
			
			return(event.relatedTarget?
			event.relatedTarget:(types.match(/mouseover|mouseenter/)?
			event.fromElement:event.toElement));
			
		},
						
		//停止全部
		
		stopAll:function(e){
			
			Mell.Event.core.stopPropagation.call(e);
			
			Mell.Event.core.stopDefault.call(e);
			
			return false;
			
		},	
		
		//阻止冒泡
		
		stopPropagation:function(){
		
			var e=this.srcEvent;
			
			if(e&&e.stopPropagation){
				
				e.stopPropagation();
			
			}else{
				
				window.event.cancelBubble=true; 
				
			}
			
			return false;
						
		},
		
		//阻止默认行为	
		
		stopDefault:function(){
		
			var e=this.srcEvent;
			
			if (e&&e.preventDefault){
			
				e.preventDefault();
			
			}else{
			
				window.event.returnValue = false;
			
			}
			
			return false;
					
		}
	
	}
	
}

//+++++++++++++++++++++++++++++++++++++++++++++++++(Mell.Ready)+++++++++++++++++++++++++++++++++++++++++++++++++++

Mell.Ready=function(callback){
		
	if (document.readyState=="complete"||document.readyState=="loaded"){
		
		return setTimeout(function(){
								   
			  Mell.Ready.callFuntion(callback);
		 
		 },1);
		
	}
	
	if (document.addEventListener){
		
		Mell.Ready.readyList.push(callback);
		
		document.addEventListener("DOMContentLoaded",Mell.Ready.runReadyList, false);

		return;
		
	}
	
	var loopReady = function (){//IE下的READY
		
		try{ Mell.DocElem.doScroll("left");
		
		}catch (e){ 
		
			setTimeout(loopReady,1); 
			
			return;
			
		}
		
		loopReady=null;
		
		  Mell.Ready.callFuntion(callback);
		
	}
	
	loopReady();
	
	return arguments.callee;
	
}

Mell.Ready.readyList=[];

Mell.Ready.callFuntion=function(fn){
	
	fn.call();
	
};

Mell.Ready.runReadyList=function (){
  
  Mell.MapCall(Mell.Ready.readyList, function (callback){
							 
	  Mell.Ready.callFuntion(callback);
	  
  });
  
  document.removeEventListener("DOMContentLoaded",Mell.Ready.runReadyList, false);
  
}

//*****************************************************初始化******************************************************

//启动基本安全设置

Mell.Security=function(){

	if(window==window.top){//防iframe恶意跳转
	
		Mell.Event.on(window,"change",function(){
			
			var location=new Object();
				
		});
	
	}
		
}

//Mell.Debug

Mell.Debug=function(){

	//解决初次滚动条没有移动过时，拖拽对象的延后现象。(加速作用)
	
	try{
		
		window.scrollBy(1,1);
		
		window.scrollBy(-1,-1);
		
	}catch(e){}

}

//*****************************************************初始化事件******************************************************

//初始化

Mell.Ready(function(){
					
	Mell.Debug();
	
	Mell.Security();
	
	//刷新前停止所有加载事件
	
	Mell.Event.on(window,"beforeunload",function(){
				
		window.stop()||document.execCommand("Stop");
															 
	});
	
});