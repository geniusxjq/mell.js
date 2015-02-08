// JavaScript Document
/*
--------------------------------

开发者: APP880.com

项目名：Mell

组件名：Mell.Move

// Copyright (c) 2012-2014, APP880.com All rights reserved.

--------------------------------

说明：

mell-move-mode:的属性有：

move/swap/swpr/prsw/part

1.是标签的自定义属性如“<a mell-move-mode="move"></a>”

2.被移动的对象的mell-move-mode为 "swap" 时对象是点对点移动,"swpr"则是移动该对象的父级,"prsw"是"swpr"时的父级。

3.被移动的对象的mell-move-mode为 "move" 时对象可认意移动,"mopr"则是移动该对象的父级。

4.

mell-move-mode="part" 的对象。是 "Swap"对象的父级和 "Swpr" 父级的父级，用于划定不同区域的 "Swap" 对象。不是移动对象。如：

<div mell-move-mode="part">
<div mell-move-mode="move" mell-move-property="{limit:{left:0,top:0,height:300,width:300}}></div>"
</div>

<div mell-move-mode="part">
<div mell-move-mode="move" mell-move-property="{limit:{left:0,top:0,height:300,width:300}}></div>"
</div>

可在标签上直接标定属性，使其可以移动：

<div mell-move-mode="move" mell-move-property="{limit:{left:0,top:0,height:300,width:300},onDown:function(){alert(0)}}></div>" 

++++++++++++++++++++++++++++++++++++++++++++++

mell-move-property={}

属性有:

type:cover/swap

focusClass:设置焦点对象默认样式（交换模式）

emptyClass:设置占空对象默认样式（交换/插队模式）

coverClass:设置虚拟对象默认样式（自由移动模式）

holdTime://启动时间

testTime://排序检测动时间

throwTime：//投掷时间

limit:

为限制对象移动的区域可以是一个Rect矩阵对象

格式：

limit:{left:0,top:0,height:300,width:300}

也可以是一个dom对象

limit:dom

+++++++++++++++++++++++++++++++++++++++++++++++++++++++(绑定方式)+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Mell.Move.drag(o,selector,mell-move-property);//自由拖拽

Mell.Move.dragSort(o,selector,mell-move-property);//拖拽排序

调用实例：

 Mell.Move.dragSort("",".the_div",{
					
   limit:{left:0,top:0,height:300,width:300},
   type:"swap",
   onDown:function(){alert(this.target)}
   
});
 
++++++++++++++++++++++++++

事件属性(onDown/onStart/onDragUp/onUp/onEnd/onClick/onChange/onMove/onThrow/)：

function(e){}

this//指向被拖拽对象

e.target//被拖拽对象

e.parent//被拖拽对象父级

e.relatedTarget//事件相关对象
	
e.relatedParent//事件相关对象父级

e.left/right/up/donw:移动方向

e.distance:移动相对起点距离

++++++++++++++++++++++++++++

Mell.Move 所有API见下-》

	drag//自由拖拽
	
	dragSort//拖拽排序
	
	remove//移除对象拖拽事件
	
	on//开启拖拽
	
	off///关闭拖拽
	
	coverModeOn//开启移动虚拟对象模式
	
	coverModeOff//关闭移动虚拟对象模式
			
	swapModeOn//开启交换模式
		
	swapModeOff//关闭交换模式
		
	sortOn//开启排序
	
	sortOff//关闭排序
	
	setSwapPart//设置一个可交换区域
	
	setSwapPartLastDom//设置一个可交换区域内永远处于最后位置的对象
	
	setTestTime//设置排序检测时间间隔(dragSort)
		
	setThrowTime//设置投掷事件有效时间
	
	setHoldTime//设置按下指定时间后可拖拽

	setDragTarget//设置被拖拽对象
		
	setLimit//设置对象可拖拽范围
	
	setLimitGlobal//设置全部对象可拖拽范围

	setEmptyClass//设置占空对象默认样式（dragSort）
	
	setFocusClass//设置焦点对象默认样式(dragSort)

	setCoverClass//设置虚拟对象默认样式(drag)
	
	getByDomXY//获取鼠标相对于当前对象的坐标
	
	getDistance//获取相对起始点移动距离
	
	getDirection//获取移动方向
	
	getDirectionByStart//获取相对起始点方向
	
	onDown//在移动对象上按下鼠标时
	
	onStart//在移动开始时
	
	onDragUp//拖起时触发
			
	onUp//在移动对象上弹起鼠标时
	
	onEnd//移动结束时
					
	onClick//只是点击没有移动时
	
	onChange//在交换或插队时变换焦点对象时触发(dragSort)
			
	onMove//在移动时
	
	onThrow//投掷时
	
*/

//********************************************-------Code--------***********************************************

Mell.Move={
		
	drag:function(o,selector,property){//自由拖拽
								
		Mell.Move.core.addDrag(o,"move",selector,property);
		
		return arguments.callee;
						
	},
	
	dragSort:function(o,selector,property){//拖拽排序
						
		Mell.Move.core.addDrag(o,"swap",selector,property);
		
		return arguments.callee;
		
	},
	
	remove:function(o,selector){//移除对象拖拽事件
		
		Mell.Move.core.removeDrag(o,selector);
		
		return arguments.callee;
		
	},
	
	on:function(){//开启拖拽
		
		Mell.Move.core.globalLock=false;
		
	},
	
	off:function(){////关闭拖拽
		
		Mell.Move.core.globalLock=true;
						
	},
	
	coverModeOn:function(){//开启移动虚拟对象模式
		
		Mell.Move.core.finalOperatingMoveType=Mell.Move.core.defaultOperatingMoveType=0;
		
	},
	
	coverModeOff:function(){//关闭移动虚拟对象模式
		
		Mell.Move.core.finalOperatingMoveType=Mell.Move.core.defaultOperatingMoveType=1;
		
	},
			
	swapModeOn:function(){//开启交换模式
		
		Mell.Move.core.finalOperatingSwapType=Mell.Move.core.defaultOperatingSwapType=1;
		
	},
		
	swapModeOff:function(){//关闭交换模式
		
		Mell.Move.core.finalOperatingSwapType=Mell.Move.core.defaultOperatingSwapType=0;
		
	},
		
	sortOn:function(){//开启排序
		
		Mell.Move.core.swapLock=false;
		
	},
	
	sortOff:function(){//关闭排序
		
		Mell.Move.core.swapLock=true;
		
	},
	
	setSwapPart:function(dom_or_id){//设置一个可交换区域
		
		var dom=dom_or_id;
		
		if(Mell.Type.isString(dom)){
			
			dom=Mell.ById(dom);
						
		}
		
		Mell.MapCall(dom,function(elem){
								
			Mell.Attr.set(elem,"mell-move-mode","part");
											
		});
		
	},
	
	setSwapPartLastDom:function(Part_dom,Last_dom){//设置一个可交换区域内永远处于最后位置的对象
		
		if(!Part_dom){return false};
		
		Part_dom["mell-move-last-dom"]=Last_dom;
			
	},
	
	setTestTime:function(time){//排序检测时间间隔(dragSort)
				
		Mell.Move.core.testTime=time;
		
	},
	
	setThrowTime:function(time){//设置投掷事件有效时间
	
		Mell.Move.core.throwTime=time;
		
	},
	
	setHoldTime:function(time){//设置按下指定时间后可拖拽
	
		Mell.Move.core.holdTime=time;
		
	},
		
	setDragTarget:function(o){//设置被拖拽对象
		
		Mell.Move.core.onTarget=o;
		
	},
		
	setLimit:function(o,selector,dom_or_property){//设置对象可拖拽范围
		
		var the_limit=Mell.Move.core.mathTheLimit(dom_or_property);
		
		if(Mell.Move.core.isBeMove){
			
			Mell.Move.core.targetLimitXY=the_limit;
			
		}
		
		if(selector){
			
			selector in Mell.Move.core.moveSelectorParam==false?
			Mell.Move.core.moveSelectorParam[selector]={}:false;
			
			Mell.Move.core.moveSelectorParam[selector]["limit"]=the_limit;
			
			return ;
		
		}
		
		if("mell-move-property" in o){
			
			o["mell-move-property"]["limit"]=the_limit;
			
		}
		
	},
	
	setLimitGlobal:function(dom_or_property){//设置全部对象可拖拽范围
		
		Mell.Move.core.defaultLimitXY=Mell.Move.core.mathTheLimit(dom_or_property);
		
	},

	setEmptyClass:function(property_or_className){//设置占空对象默认样式（dragSort）
		
		Mell.Move.core.emptyClass=property_or_className?property_or_className:null;
		
	},
	
	setFocusClass:function(property_or_className){//设置焦点对象默认样式(dragSort)
						
		Mell.Move.core.focusEmptyClass=property_or_className?property_or_className:null;
		
	},

	setCoverClass:function(property_or_className){//设置虚拟对象默认样式(drag)
				
		Mell.Move.core.coverClass=property_or_className?property_or_className:null;
				
	},
	
	setMinPosition:function(px){//设置最小移动偏移量
		
		Mell.Move.core.movedOutPX=px;
		
	},
	
	getByDomXY:function(dom){//获取鼠标相对于当前对象的坐标
		
		return Mell.Move.core.getXYPoor(dom);
	
	},
	
	getDistance:function(){//获取相对起始点移动距离
		
		return Mell.Move.core.getDistance();
		
	},
	
	getDirection:function(){//获取移动方向
		
		return Mell.Move.core.getDirection(Mell.Move.core.beforeX,Mell.Move.core.beforeY);
		
	},
	
	getDirectionByStart:function(){//获取相对起始点方向
		
		return Mell.Move.core.getDirection(Mell.Move.core.oldX,Mell.Move.core.oldY);
		
	},
	
	onDown:function(fn){//在移动对象上按下鼠标时
	
		Mell.Move.core.moveEvents["ondown"]=fn;
		
	},
	
	onDragUp:function(fn){//拖起时触发
		
		Mell.Move.core.moveEvents["ondragup"]=fn;
		
	},
	
	onStart:function(fn){//在移动开始时
		
		Mell.Move.core.moveEvents["onstart"]=fn;
		
	},
	
	onUp:function(fn){//在移动对象上弹起鼠标时
		
		Mell.Move.core.moveEvents["onup"]=fn;
		
	},
	
	onEnd:function(fn){//移动结束时
		
		Mell.Move.core.moveEvents["onend"]=fn;
		
	},
			
	onClick:function(fn){//只是点击没有移动时
		
		Mell.Move.core.moveEvents["onclick"]=fn;
		
	},
	
	onChange:function(fn){//在交换或插队时变换焦点对象时触发(dragSort)
		
		Mell.Move.core.moveEvents["onchange"]=fn;
		
	},
			
	onMove:function(fn){//在移动时
		
		Mell.Move.core.moveEvents["onmove"]=fn;
		
	},
	
	onThrow:function(fn){//在投掷时
		
		Mell.Move.core.moveEvents["onthrow"]=fn;
		
	}
				
}

Mell.Move.core=(function(window,document,undefined){

	var $Move={//拖放组件内核部分
						  		
		theHtml:(Mell.ByTag(document,"html")[0]),
		
		emptyClass:null,
		
		coverClass:null,
		
		focusEmptyClass:null,
				
		parentTarget:null,
		
		oldparentTarget:null,
				
		onTarget:null,
		
		onTargetNextSibling:null,
								
		toTarget:null,
		
		oldToTarget:null,
		
		relatedTarget:null,//事件相关对象
		
		toTargetNextSibling:null,
		
		globalShelterTarget:null,//全局遮罩（确保移动时不受底层元素干扰）
		
		emptyCover:null,
		
		emptyTarget:null,
		
		emptyShelter:null,
				
		moveMode:null,
		
		toMoveMode:null,
		
		targetLimitXY:null,//记录限定移动区域格式为{left:0,top:0,width:0,height:0}（运算值）
				
		finalLimitXY:{x:0,y:0},//记录限定移动区域计算结果(最终值)
				
		oldMargin:null,oldLeft:null,oldTop:null,oldPosition:null,//对象原始css属性
				
		isDown:false,//已在可以移动对象上按下
		
		isBeMove:false,//是可以移动对象
		
		targetMoved:false,//已经移动
		
		isDragUp:false,//拖起
		
		moveModeCache:null,
		
		x:0,y:0,beforeX:0,beforeY:0,oldX:0,oldY:0,mouseXYPoor:{x:0,y:0},//XY
		
		XYPoor:{x:0,y:0},//存放对象坐标和鼠标坐标的差值
		
		parentAll:[],//存放编成数组父级(父级动态scroll对象)
		
		parentAllXY:{x:0,y:0},//存放对象所有父级坐标和
		
		parentXYScrollPoor:{x:0,y:0},//父级坐标父级scroll差
		
		max_zindex:100,//记录最大zindex(默认为100)
		
		min_zindex:10,//记录最小zindex(默认为10)用于“Swap" "Swpr”对象点对点移动
		
		finalOperatingSwapType:null,//最终交换方式 =1 元素交换 =0 元素插队（结合defaultOperatingSwapType和对象type的判断）
		
		finalOperatingMoveType:null,//最终移动方式（结合defaultOperatingMoveType和对象type的判断）
		
		//-----------------------------------------------------*************************************************默认全局属性
		
		defaultLimitXY:null,//设置默认限定移动区域=null为不限制 格式为{left:0,top:0,width:0,height:0}（全局）
				
		defaultOperatingMoveType:1,//=0 时移动虚拟对象 =1 时移动对象本身。（全局）
		
		defaultOperatingSwapType:0,//=1 元素交换 =0 元素插队（全局）
		
		//-----------------------------------------------------
		
		movedOutPX:1,//偏移量动（确保区分点击和移动事件的准确性）
		
		throwOutPX:10,//达到偏移量将 ThrowRecordCount 清零
		
		holdTime:0,//坚持时间
		
		holdTimer:null,//坚持计时器
		
		holdTimeout:null,//坚持超时触发计时器
				
		throwTime:10,//ThrowRecordCount记录间隔,越大投掷事件越容易触发
		
		throwTimer:null,//投掷事件计时器
		
		ThrowRecordCount:0,//<2时判断为投掷事件
		
		recordTimer:null,//计时器（记录对象运行坐 标beforeX,beforeY）
		
		recordTime:100,//记录间隔时间
		
		testTimer:null,//拖拽排序检测计时器
		
		testTime:10,//拖拽排序检测时间间隔
		
		moveLock:false,//当前对象移动锁=false可以移动； =true不能移动；
		
		swapLock:false,//锁：交换模式下，用于锁定是否执行动作的变量。=false 正常执行动作； =true 不执行动作
		
		globalLock:false,//全局锁=false可以可操作=true不可操作
				
		//----------------------------------------选择器参数
		
		moveSelectorParam:{},//选择参数存放<全局>
		
		moveSelector:null,//当前选择
		
		moveProperty:{},//当前移动对象的属性
		
		moveStarted:false,//开始事件是否已经执行过
		
		//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++<全局FUNCTION>
				
		moveEvents:{
			
			//在移动对象上按下鼠标时
			
			"ondown":null,
			
			//在移动开始时
			
			"onstart":null,
			
			//在移动对象上弹起鼠标时
			
			"onup":null,
			
			//移动结束时
			
			"onend":null,
			
			//只是点击没有移动时				
			
			"onclick":null,
			
			//在移动时
			
			"onmove":null,
			
			//在交换或插队时变换焦点对象时触发		
			
			"onchange":null,
			
			//投掷时触发事件
			
			"onthrow":null,
			
			//拖起时触发
			
			"ondragup":null
		
		},
				
		//----------------------------------------------------------------------------添加可拖放对象
		
		addDrag:function(o,mode,selector,property){
			
			//循环绑定多个选择
			
			o=o||document;
						
			Mell.Each(Mell.Type.isString(selector)?Mell.Str.trim(selector).split(/\s+/):selector||"",function(i,s){
					
				$Move.toAddDrag(o,mode,s,property);
				
			});
					
		},
		
		toAddDrag:function(o,mode,selector,property){
			
			if(!property){
				
				if(Mell.Type.isObject(selector)){
				
					property=selector;
					
					selector=undefined;
				
				}else{
					
					property={};
					
				}
				
			}
			
			property["mode"]=mode;
			
			property["mell-move-eventParent"]=o;
			
			if(!selector||!Mell.Type.isString(selector)){
				
				Mell.Attr.set(o,"mell-move-mode",property.mode);
								
				o["mell-move-property"]=property;
				
				return ;
				
			}
			

			selector?$Move.moveSelectorParam[selector]=property:false;
			
		},
		
		//----------------------------------------------------------------移除可拖放属性
		
		removeDrag:function(o,selector){
			
			o=o||document;
			
			Mell.Each(Mell.Type.isString(selector)?Mell.Str.trim(selector).split(/\s+/):selector||"",function(i,s){
					
				$Move.toRemoveDrag(o,s);
				
			});
			
		},
		
		toRemoveDrag:function(o,selector){
			
			if(!selector){
				
				Mell.Attr.remove(o,"mell-move-mode")(o,"mell-move-property");
				
				"mell-move-property" in o?
				delete o["mell-move-property"]:false;
				
				return;
				
			}
			
			selector&&Mell.Type.isString(selector)?
			delete $Move.moveSelectorParam[selector]:false;
			
		},
		
		mathTheLimit:function(o){//返回限定移动区域rect
			
			var offset;
			
			if(o.nodeType){
				
				offset=Mell.Offset(o);
								
				offset.width+=offset.left;
				
				offset.height+=offset.top;
								
				return offset;
				
			}else{
				
				if(Mell.Type.isObject(o)){
																
					return o;
				
				}
				
			}
			
			return null;
			
		},
		
		//---------------------------------------------------------------------------------获取对象所有父级
		
		getParentAll:function(o){//将对象的父级编成数组存放
				
			if($Move.parentAll.length<=0||($Move.parentAll.length>0&&o.parentNode!=$Move.parentAll[0])){
				
				var in_parent=o.offsetParent;
							
				$Move.parentAll=[];
				
				for(var i=0;in_parent!=null;i++){
					
					if(in_parent.offsetParent==null){
										
						break;
						
					}
					
					$Move.parentAll[i]=in_parent;
					
					in_parent=in_parent.offsetParent;
					
				}
								
			}
		
		},
		
		//-----------------------------------------获取对象所有父级scroll
		
		getParentScroll:function(){
						
			var scroll_l=0;
			
			var scroll_t=0;
			
			for(var i in $Move.parentAll){
						
				scroll_l+=$Move.parentAll[i].scrollLeft;
				
				scroll_t+=$Move.parentAll[i].scrollTop;
				
			}
			
			return {x:scroll_l,y:scroll_t};
				
		},
		
		//---------------------------------------------------------------------获取对象所有父级xy值
		
		getParentAllXY:function(){
						
			var o_x=0;
			
			var o_y=0;
			
			for(var i in $Move.parentAll){
						
				o_x+=$Move.parentAll[i].offsetLeft;
				
				o_y+=$Move.parentAll[i].offsetTop;
				
			}
			
			return {x:o_x,y:o_y};
				
		},
		
		//----------------------------------------获取对象全局坐标和鼠标坐标的差
		
		getXYPoor:function(o){
						
			if(Mell.Type.typeOf(o,"object")){
				
				$Move.getParentAll(o);
				
				$Move.parentXYScrollPoor=$Move.getParentScroll();
				
				$Move.parentAllXY=$Move.getParentAllXY();
				
				$Move.XYPoor.x=$Move.x-($Move.parentAllXY.x+(o.offsetLeft||0));
				
				$Move.XYPoor.y=$Move.y-($Move.parentAllXY.y+(o.offsetTop||0));
						
				$Move.parentXYScrollPoor.x=$Move.parentAllXY.x-$Move.parentXYScrollPoor.x;
				
				$Move.parentXYScrollPoor.y=$Move.parentAllXY.y-$Move.parentXYScrollPoor.y;
				
				if($Move.isDown==false){
					
					  $Move.parentAllXY={x:0,y:0};
					  
					  $Move.parentXYScrollPoor={x:0,y:0};
					  
					  return $Move.XYPoor;
			
				}
			
			}
				
		},
		
		//+++++++++++++++++++++++++++++++++++++++(loopMatch)循环匹配(确定可交换对象)+++++++++++++++++++++++++++++++++++
		
		loopMatch:function(o){
			
			if(!o||!Mell.Type.isDom(o)||o==document.body||o==$Move.onTarget){return false;}
			
			$Move.toMoveMode=!o["mell-move-property"]?Mell.Attr.get(o,"mell-move-mode"):null;
		
			if(!$Move.toMoveMode){
				
				o=$Move.matchSelector(o);
				
				$Move.toMoveMode=o?$Move.moveProperty.mode:null;
			
			}
			
			if($Move.toMoveMode){
				
				if(!Mell.Dom.contains($Move.moveProperty["mell-move-eventParent"],o)){
					
					return null;
					
				}
				
				return o;
				
			}else{
								
				return null;
					
			}
							
		},

		//-------------------------------------------------------------------------根据move_selector匹配对象
		
		matchSelector:function(target,selector){
			
			if(target==document.body){return false;}
					
			var selector=selector?selector:$Move.moveSelector;
			
			return Mell.Dom.matchSelector(target,selector);
						  
		},
		
		moveEventPro:function(e,target){//事件函数呼叫
		
			var event_property={};
			
			var _s=null;
			
			var l_e=e.toLowerCase();
			
			var g_e=l_e;
						
			if(($Move.moveProperty[e]==false&&$Move.moveProperty[l_e]==false)&&$Move.moveEvents[l_e]){return;}
						
			$Move.relatedTarget=(/change/ig.test(e))&&$Move.moveModeCache!=1?
			$Move.oldToTarget:$Move.onTarget?$Move.targetByPoint():null;
			
			event_property.target=$Move.onTarget;
			
			event_property.parent=$Move.oldparentTarget;
			
			if($Move.relatedTarget){
			
				event_property.relatedTarget=$Move.relatedTarget;
					
				event_property.relatedParent=$Move.relatedTarget.parentNode;
			
			}
			
			event_property[Mell.Move.getDirectionByStart()]=true;
			
			event_property["distance"]=$Move.getDistance();
			
			if($Move.moveProperty[e]||$Move.moveProperty[l_e]){
										
				if(!$Move.moveProperty[e]){
					
					e=l_e;
					
				}
				
				try{
					
					_s=$Move.moveProperty[e].call($Move.onTarget,event_property);
				
				}catch(e){
					
					_s=null;
					
				}
				
				if(_s==false){
											
					return _s;
						
				}
				
			}
			
			if($Move.moveEvents[g_e]){
				
				try{
					
					_s=$Move.moveEvents[g_e].call($Move.onTarget,event_property);
					
					if(_s==false){
						
						return _s;
						
					}

				}catch(e){}
				
			}
			
			return;
			
		},
			
		getDirection:function(x,y) {//根据角度判断移动方向
			
			var a=$Move.getAngle(x,y);
			
			var b={
				
				up:-45 > a && a > -135,
				
				down:a >= 45 && 135 > a,
				
				left:a >= 135 || -135 >= a,
				
				right:a >= -45 && 45 >= a
				
			};
			
			for (var c in b){ if (b[c]) return c;}
			
			return null;
		
		},
		
		getDistance:function(x,y) {//获取两点间距离
			
			var a={x:(x||$Move.oldX),y:(y||$Move.oldY)};
			
			var b={x:$Move.x,y:$Move.y};
			
			var c=b.x-a.x,d=b.y-a.y;
			
			return Math.sqrt(c*c+d*d);
		
		},
		
		//角度
		
		getAngle:function(x,y) {
			
			var a={x:x,y:y};
				
			var b={x:$Move.x,y:$Move.y};
				
			return 180*Math.atan2(b.y-a.y,b.x-a.x)/Math.PI;
			
		}, 
		
		//记录坐标,并执行自定义，移动事件。
		
		recordXY:function(){
			
			$Move.beforeX=$Move.x;
			
			$Move.beforeY=$Move.y;

			if(!$Move.isDragUp){return false;}
			
			try{
				
				if($Move.moveEventPro("onMove")==false){
					
					return false;
					
				};
				
			}catch(ev){}
						
		},
		
		//比较偏移量
		
		isOutPXByBefore:function(){
			
			return (Math.abs($Move.beforeX-$Move.x)>$Move.throwOutPX||Math.abs($Move.beforeY-$Move.y)>$Move.throwOutPX);
			
		},
		
		//是否达到偏移后，断定是移动事件还是点击事件。
		
		isOutPX:function(m){
			
			var OutPX=(Math.abs($Move.oldX-$Move.x)>$Move.movedOutPX||Math.abs($Move.oldY-$Move.y)>$Move.movedOutPX);
			
			if(m){return OutPX;}
			
			if($Move.moveLock==true){return false;}
			
			if(!$Move.targetMoved&&!$Move.isDragUp){
						
				if(OutPX){
					
					if($Move.holdTimer){
						
						$Move.moveLock=true;
						
						return false;
						
					}	
				
				}
			
			}
			
		},
		
		recordThrowCount:function(){
			
			$Move.ThrowRecordCount<5&&($Move.ThrowRecordCount+=1);
			
		},
		
		//清除throwTime
		
		clearThrowTimer:function(){
			
			if(!$Move.throwTimer){return false;}
		
			clearInterval($Move.throwTimer);
			
			$Move.throwTimer=null;
							
		},
		
		//清除clearHoldTimer
		
		clearHoldTimer:function(){
			
			if(!$Move.moveLock){
				
				$Move.setDragUp();
			
			}
			
			if(!$Move.holdTimer){return false;}	
			
			clearTimeout($Move.holdTimer);
			
			$Move.holdTimer=null;
										
		},
				
		//=======================================(getOnXY)获取点击处的坐标=============================================
		
		getOnXY:function(e){
			
			if($Move.globalLock==true||e.target==$Move.theHtml||e.target==document.body){return true;}
				
			if("touches" in e){
				
				//触摸设备双指时执行（拦截不向下执行）				
				
				if(e.touches.length>1){
										
					if($Move.isDragUp==false){
						
						$Move.clearEvent(e);
						
						return true;
					
					}
						
				}
									
			}
			
			if($Move.moveModeCache!=null){
				
				$Move.getXY(e);

				return true;
				
			}
						
			$Move.isDown=true;
						
			if($Move.getXY(e,1)!=false){
				
				$Move.onTarget=e.target;
			
				$Move.moveMode=Mell.Attr.get($Move.onTarget,"mell-move-mode");

				if(!$Move.moveMode){
						
					Mell.Each($Move.moveSelectorParam,function(selector,property){
												   
						try{//进行5层检测确定对象					   
						
						$Move.onTarget=$Move.matchSelector($Move.onTarget,selector)||
						$Move.matchSelector($Move.onTarget.parentNode,selector)||
						$Move.matchSelector($Move.onTarget.parentNode.parentNode,selector)||
						$Move.matchSelector($Move.onTarget.parentNode.parentNode.parentNode,selector)||
						$Move.matchSelector($Move.onTarget.parentNode.parentNode.parentNode.parentNode,selector);
						
						}catch(ev){}
						
						if($Move.onTarget){
							
							if(selector&&"mell-move-eventParent" in property&&
							   !Mell.Dom.contains(property["mell-move-eventParent"],$Move.onTarget)){
													
								return false;
								
							}
							
							$Move.moveSelector=selector;
							
							$Move.moveProperty=property;
							
							$Move.moveMode=property.mode;
							
							return false;
							
						}
						
						$Move.onTarget=e.target;
						
					});
					
					if(!$Move.onTarget){
						
						return true;
						
					}
				
				}else{//mell-move-property
					
					$Move.moveProperty=$Move.onTarget["mell-move-property"]||
					Mell.Attr.get($Move.onTarget,"mell-move-property");
							
					if($Move.moveProperty){
						
						Mell.Type.isString($Move.moveProperty)?
						$Move.moveProperty=(new Function("return "+$Move.moveProperty))():false;
						
					}else{
						
						$Move.moveProperty={};
						
					} 		
					
				}
				
				if($Move.moveMode!=null){
					
					$Move.moveMode=new String($Move.moveMode).toLowerCase();
					
					if($Move.moveMode=="part"){return true;}
					
					$Move.readyMove();					
															
				}
			
			}
				
			if($Move.isBeMove==true){
							
				if("touches" in e==false){
					
					//非触摸设备时触发
																
					return false;
												
				}
						
			}
			
		},
				
		//***********************************************(getXY)获取鼠标坐标**********************************
		
		getXY:function(e,m){
						
			if($Move.globalLock==true&&$Move.moveModeCache==null){return true;}
						
			if($Move.isDown==true||m==1){
								
				if("touches" in e){
					
					//触摸设备事件							
										
					e=e.touches[0];
															
				}
				
				$Move.x=e.pageX;
				
				$Move.y=e.pageY;
				
				if($Move.moveModeCache!=null){
					
					if($Move.isOutPXByBefore()){
						
						$Move.ThrowRecordCount=0;
						
					}
					
					if(m!=1){
						
						$Move.isOutPX();

						if(!$Move.isDragUp){
														
							return document.all?false:true;
							
						}
					
					}
									
					$Move.toMove();
					
					return false;
							
				}
			
			}
						
		},
		
		//++++++++++++++++++++++++++++++++++++++++++++拖起(setDragUp)++++++++++++++++++++++++++++++++++++++++++++++++++
		
		setDragUp:function(){
			
			$Move.isDragUp=true;
						
			try{
				
				if($Move.moveEventPro("onDragUp")==false){
					

					$Move.moveLock=true;
					
				}
				
			}catch(ev){}

		},
		
		//+++++++++++++++++++++++++++++++++++++++++++(moveStartSet)移动开始才设置样式和属性+++++++++++++++++++++++++++++++
		
		moveStartSet:function(){
						
			if($Move.onTarget.style.zIndex==""||parseInt($Move.onTarget.style.zIndex)+1!=parseInt($Move.max_zindex)){
				
				$Move.onTarget.style.zIndex=$Move.max_zindex;
				
				$Move.max_zindex++;
			
			}
			
			if($Move.moveModeCache==1){//move
								
				if($Move.finalOperatingMoveType==1){
					
					Mell.Style.add($Move.onTarget,{
					
						"position":"absolute",
					
						"margin":0
					
					});
					
					if($Move.parentTarget.nodeName.toLowerCase()!="body"){
					
						Mell.Dom.append(document.body,$Move.onTarget);
					
					}
				
				}else{
					
					try{
						$Move.createCover();
					}catch(e){}	

				}
				
				$Move.createGlobalShelterTarget();
				
			}
			
			if($Move.moveModeCache==0){//swap
				
				try{ $Move.createEmpty();
				}catch(e){}	
				
				Mell.Style.add($Move.onTarget,{
				
					"position":"absolute",
				
					"margin":0
				
				});
				
				if($Move.parentTarget.nodeName.toLowerCase()!="body"){
					
					Mell.Dom.append(document.body,$Move.onTarget);
				
				}
				
				$Move.testTimer==null?$Move.testTimer=setInterval($Move.testInsert,$Move.moveProperty["testTime"]||$Move.testTime):false;
		
			}
						
		},
		
		//++++++++++++++++++++++++++++++++++++++++++(limitMoveXY)返回限定区域移动计算值+++++++++++++++++++++++++++
		
		limitMoveXY:function(){
			
			if($Move.moveModeCache==null){
				
				if("touches" in e){
					
					//触摸设备双指时不向下执行				
					
					if(e.touches.length>1){return true;}
					
				}
				
			}
			
			if($Move.globalLock==true){return true;}
			
			var cache_x=$Move.x-$Move.mouseXYPoor.x;
			
			var cache_y=$Move.y-$Move.mouseXYPoor.y;
						
			if($Move.targetLimitXY==null||$Move.globalLock==true){
				
				$Move.finalLimitXY={x:cache_x,y:cache_y};
		
			}else{
				
				var offset=Mell.Offset($Move.onTarget);
							
				offset.height=$Move.targetLimitXY.height-offset.height;
				
				offset.width=$Move.targetLimitXY.width-offset.width;
						
				if($Move.targetLimitXY.left!="no"&&cache_x<$Move.targetLimitXY.left) {
				
					$Move.finalLimitXY.x=$Move.targetLimitXY.left;
					
				}else if(offset.width!="no"&&cache_x>offset.width){ 
				
					$Move.finalLimitXY.x=offset.width>0?offset.width:$Move.targetLimitXY.left;
				
				}else{
		
					$Move.finalLimitXY.x=cache_x;
					
				}
				
				if($Move.targetLimitXY.top!="no"&&cache_y<$Move.targetLimitXY.top){
				
					$Move.finalLimitXY.y=$Move.targetLimitXY.top;
							
				}else if(offset.height!="no"&&cache_y>offset.height){
				
					$Move.finalLimitXY.y=offset.height>0?offset.height:$Move.targetLimitXY.top;
							
				}else{
					
					$Move.finalLimitXY.y=cache_y;
								
				}
				
			}
			
			cache_x=null;
			
			cache_y=null;
			
		},
				
	  //+++++++++++++++++++++++++++++++++++++++++++(readyMove)确定对象是否可移动/准备移动对象++++++++++++++++++++++++
			
		readyMove:function(){
			
			if($Move.moveMode=="move"||$Move.moveMode=="swap"){
				
					if($Move.isBeMove==false){
					
						$Move.isBeMove=true;
					
					}
						
			}else if($Move.moveMode=="mopr"||$Move.moveMode=="swpr"){
				
				$Move.onTarget=$Move.onTarget.parentNode;
					
				if($Move.isBeMove==false){
				
					$Move.isBeMove=true;
				
				}
				
			}
			
			try{
				
				if($Move.moveEventPro("onDown")==false){
					
					$Move.moveLock=true;
					
				}
				
			}catch(ev){}
												
			$Move.confirmOperatingMode();
			
			return false;
		
		},
		
		//readyMove end
		
		//++++++++++++++++++++++++++++++++++++++++++(confirmOperatingMode)确定移动方式+++++++++++++++++++++++++++++++++++
			
		confirmOperatingMode:function(){
			
			$Move.recordTimer=setInterval($Move.recordXY,$Move.recordTime||100);//启动坐标记录器
			
			$Move.throwTimer=setInterval($Move.recordThrowCount,$Move.moveProperty["throwTime"]||$Move.throwTime);
					
			$Move.holdTime>0?
			$Move.holdTimer=setTimeout($Move.clearHoldTimer,$Move.moveProperty["holdTime"]||$Move.holdTime):
			$Move.clearHoldTimer();

			var offset=Mell.Offset($Move.onTarget);
			
			$Move.getXYPoor($Move.onTarget);
			
			$Move.parentTarget=$Move.onTarget.parentNode;
			
			$Move.onTargetNextSibling=$Move.onTarget.nextSibling;
			
			$Move.mouseXYPoor.x=$Move.x-offset.left;
			
			$Move.mouseXYPoor.y=$Move.y-offset.top;
						
			$Move.beforeX=$Move.oldX=$Move.x;
				
			$Move.beforeY=$Move.oldY=$Move.y;
			
			if($Move.targetLimitXY==null&&"limit" in $Move.moveProperty){
																	
				$Move.targetLimitXY=$Move.mathTheLimit($Move.moveProperty["limit"]);
					
			}else{
				
				$Move.targetLimitXY=$Move.defaultLimitXY;
			}
									
			if($Move.moveMode=="swap"||$Move.moveMode=="swpr"){//点对点移动
			
				$Move.oldMargin=$Move.oldTop=$Move.oldLeft=$Move.oldPosition=null;

				$Move.oldMargin=Mell.Style.get($Move.onTarget,"margin");
				
				$Move.oldTop=Mell.Style.get($Move.onTarget,"top");
				
				$Move.oldLeft=Mell.Style.get($Move.onTarget,"left");
				
				$Move.oldPosition=Mell.Style.get($Move.onTarget,"position");
								
				if($Move.finalOperatingSwapType==null){
					
					if("type" in $Move.moveProperty){
						
						$Move.finalOperatingSwapType=$Move.moveProperty["type"]=="swap"?1:0;
						
					}else{
						
						$Move.finalOperatingSwapType=$Move.defaultOperatingSwapType;
						
					}
				
				}
				
				$Move.oldparentTarget=$Move.parentTarget;
				
				$Move.moveModeCache=0;
							
			}else{//自由移动
			
				if($Move.finalOperatingMoveType==null){
							
					if("type" in $Move.moveProperty){
						
						$Move.finalOperatingMoveType=$Move.moveProperty["type"]=="cover"?0:1;
						
					}else{
						
						$Move.finalOperatingMoveType=$Move.defaultOperatingMoveType;
						
					}
					
					$Move.moveModeCache=1;
					
				}
							
			}
					
			return false;
					
		},
		
		//confirmOperatingMode end 
					
		//getXY end
		//++++++++++++++++++++++++++++++++++++++++++++++(toMove)开始移动对象+++++++++++++++++++++++++++++++++++++++++++
		
		toMove:function(){
				
			$Move.limitMoveXY();
			
			var ox=$Move.finalLimitXY.x+"px";
			
			var oy=$Move.finalLimitXY.y+"px";
			
			if(!$Move.moveStarted){
				
				if(!$Move.isOutPX(1)){return false;}
				
				$Move.targetMoved=true;	
				
				$Move.moveStartSet();
				
				try{
						
					if($Move.moveEventPro("onStart")==false){
						
						return false;
						
					}
					
				}catch(ev){}
				
				$Move.moveStarted=true;
				
			}
				
			if($Move.moveModeCache==1){
			
				if($Move.finalOperatingMoveType==0){
					
					Mell.Style.add($Move.emptyCover,{
					
						"left":ox,
						"top":oy
					
					});
					
				}
					
				if($Move.finalOperatingMoveType==1){
					
					Mell.Style.add($Move.onTarget,{
					
						"left":ox,
						"top":oy
					
					});
					
				}
			
			}
			
			if($Move.moveModeCache==0){
				
				Mell.Style.add($Move.onTarget,{
				
					"left":ox,
					"top":oy
				
				});
				
			}
							
		},
		
		//toMove end 
		
		//+++++++++++++++++++++++++++++++++++(targetByPoint)获取坐标点下对象+++++++++++++++++++++++++++++++++++++
		
		targetByPoint:function(){
			
			return $Move.onTarget?Mell.ByPoint(($Move.onTarget.offsetLeft-Mell.ScrollLeft()+($Move.onTarget.offsetWidth*0.5)),($Move.onTarget.offsetTop-Mell.ScrollTop())-2):null;

		},
		
		//+++++++++++++++++++++++++++++++++++++++++++(testInsert)检测目标对象移动类型++++++++++++++++++++++++++++++
		
		testInsert:function(m){
							
			$Move.toTarget=$Move.targetByPoint();
			
			if($Move.toTarget!=null){
				
				if($Move.oldToTarget&&$Move.toTarget==$Move.oldToTarget){
										
					return true;
					
				}
				
				try{//进行5层检测确定对象
										
					$Move.toTarget=$Move.loopMatch($Move.toTarget)||
					$Move.loopMatch($Move.toTarget.parentNode)||
					$Move.loopMatch($Move.toTarget.parentNode.parentNode)||
					$Move.loopMatch($Move.toTarget.parentNode.parentNode.parentNode)||
					$Move.loopMatch($Move.toTarget.parentNode.parentNode.parentNode.parentNode);
												
				}catch(e){}
				
				if(!$Move.toTarget||$Move.toTarget==$Move.oldToTarget||$Move.toTarget.nodeName.toLowerCase()=="html"){
					
					$Move.oldToTarget=$Move.toTarget;
					
					return true;
					
				}
				
				$Move.parentTarget=$Move.toTarget.parentNode;
				
				if($Move.toTarget==$Move.oldparentTarget){
								
					return true;
					
				}
				
				if($Move.toMoveMode!=null){
					
					$Move.relatedTarget=$Move.oldToTarget;

					$Move.oldToTarget=$Move.toTarget;
					
					$Move.toMoveMode=new String($Move.toMoveMode).toLowerCase();

					try{
						
						if($Move.toMoveMode!="empty"){
														
							try{
								
								if($Move.moveEventPro("onChange")==false){
									
									return true;
									
								};
								
							}catch(ev){}

						}
						
					}catch(e){}
					
				}
				
				if(m!=1){
					 
					$Move.isInsert();
					
				}
			
			}
			
		},
		
		//testInsert end
		
		//++++++++++++++++++++++++++++++++++++++++++++++++++(isInsert)可以与外部交换++++++++++++++++++++++++++++++++++++
		
		isInsert:function(m){
			
		  if($Move.toMoveMode!="empty"&&$Move.toMoveMode!="part"&&$Move.toMoveMode!=null){
			
			if($Move.toMoveMode!="swap"&&$Move.toMoveMode!="prsw"){
				
				$Move.toTarget=$Move.toTarget.parentNode;
				
				if($Move.toMoveMode!="swpr"){
				
					$Move.toMoveMode=Mell.Attr.get($Move.toTarget,"mell-move-mode");
					
					if($Move.toMoveMode!=null){
						
						$Move.toMoveMode=new String($Move.toMoveMode).toLowerCase();
						
					}
		  
				}
					
			  }
			  
			  if(m!=1){
				 
				  if($Move.toMoveMode.match(/swap|prsw|swpr/ig)){
					 
					  $Move.parentTarget=$Move.toTarget.parentNode;
					  
					  if($Move.swapLock==false){
					 
						  $Move.toInsert();
					  
					  }
					  
				  }else{
					  
					  $Move.toMoveMode=null;
					  
					  return false;
					  
				  }
			  
			  }
			
		   }
			
		},
		
		//++++++++++++++++++++++++++++++++++++++++++++++++++(toInsert)转移空白对象+++++++++++++++++++++++++++++++++++
		
		toInsert:function(){
			
			if($Move.finalOperatingSwapType==1){//元素换位
					
				$Move.createShelterToEmpty($Move.toTarget.offsetLeft,$Move.toTarget.offsetTop);
				
			}else{//元素插队
			
				try{Mell.Dom.before($Move.toTarget,$Move.emptyTarget);}catch(e){}
				
				$Move.testInsert(1);
				
				$Move.isInsert(1);
				
				if($Move.toMoveMode!="empty"){
						
					Mell.Dom.after($Move.toTarget,$Move.emptyTarget);
						
				}
			
			}
				
		},
		
		//toInsert end
		
		//++++++++++++++++++++++++++++++++++++++++(createGlobalShelterTarget)创建全局遮罩++++++++++++++++++++++++++++++++++
		
		createGlobalShelterTarget:function(){
			
			if($Move.globalShelterTarget==null){
				
				$Move.globalShelterTarget=Mell.Dom.create("span",{
					
					css:{
						position:"absolute","opacity":0,
						margin:0,paddin:0,left:0,top:0,border:0,
						background:"#fff"
					}
													
				});
				
			}
			
			Mell.Dom.append(document.body,$Move.globalShelterTarget);
			
			$Move.globalShelterTarget.style.width=Mell.PageWidth()+"px";
			
			$Move.globalShelterTarget.style.height=Mell.PageHeight()+"px";
			
			$Move.globalShelterTarget.style.zIndex=(parseInt($Move.onTarget.style.zIndex)+1);
						
			return false;

		},
		
		//++++++++++++++++++++++++++++++++++++++++++++(createCover)移动虚框对象++++++++++++++++++++++++++++++++++
		
		createCover:function(){
			
			var default_emptyClass=$Move.coverClass||$Move.moveProperty["coverClass"]||{//移动虚框对象样式
				
				width:$Move.onTarget.offsetWidth,
				height:$Move.onTarget.offsetHeight,
				border:"1px #000 dashed",
				background:"#fff",position:"absolute",
				padding:0,"margin":0,"opacity":0.5
				
			}			
			
			if($Move.emptyCover==null){
				
				$Move.emptyCover=Mell.Dom.create("span",{
					attr:{"mell-move-mode":"empty"}
				});
				
			}
					
			if(Mell.Type.isObject(default_emptyClass)){
				
				Mell.Style.add($Move.emptyCover,default_emptyClass);
			
			}else{
				
				$Move.emptyCover.className=default_emptyClass;
			
			}
			
			Mell.Style.add($Move.emptyCover,{
						   
				css:{
					position:"absolute",margin:0,padding:0
				}
						   
			});
			
			$Move.emptyCover.style.zIndex=(parseInt($Move.onTarget.style.zIndex)+2);
							
			try{ Mell.Dom.append(document.body,$Move.emptyCover);
			
			}catch(e){}
											
			return false;
			
		},

		//++++++++++++++++++++++++++++++++++++++++++(createEmpty)创建占空对象++++++++++++++++++++++++++++++++++++++++++
		
		createEmpty:function(){
				
			var default_emptyClass=$Move.emptyClass||$Move.moveProperty["emptyClass"]||{//占空对象样式
					
					margin:Mell.Style.get($Move.onTarget,"margin"),
					padding:Mell.Style.get($Move.onTarget,"padding"),
					height:$Move.onTarget.offsetHeight,
					width:$Move.onTarget.offsetWidth,
					position:"relative",float:"left",border:0
					  
				}
							
			if($Move.emptyTarget==null){
				
				$Move.emptyTarget=Mell.Dom.create("span",{
					attr:{"mell-move-mode":"empty"}
				});
				
			}
								
			$Move.emptyTarget.className=$Move.onTarget.className;
				
			if(Mell.Type.isObject(default_emptyClass)){
				
				Mell.Style.add($Move.emptyTarget,default_emptyClass);
			
			}else{
				
				$Move.emptyTarget.className=default_emptyClass;
			
			}
	
			try{ Mell.Dom.before($Move.onTarget,$Move.emptyTarget);
				
			}catch(e){}
										
			return false;
			
		},
		
		//+++++++++++++++++++++++++++++++（createShelterToEmpty）交换方式下的虚拟提示对象+++++++++++++++++++++++++++++
		
		createShelterToEmpty:function(x,y){
			
			var default_focusClass=$Move.focusEmptyClass||$Move.moveProperty["focusClass"]||{
					
				height:$Move.toTarget.offsetHeight,
				width:$Move.toTarget.offsetWidth,
				position:"absolute", border:"1px solid #F00",float:"left",
				margin:0,"padding": 0,left:-1,top:-1
				
				}
			
			if($Move.emptyShelter==null){
			  
				$Move.emptyShelter=Mell.Dom.create("span",{
					
					css:{"margin":"0px","position":"absolute"},
					
					attr:{"mell-move-mode":"empty"}
					
				});
							
			}
			
			$Move.emptyShelter.style.zIndex=(parseInt($Move.onTarget.style.zIndex)-1);
			
			if(Mell.Type.isObject(default_focusClass)){
				
				Mell.Style.add($Move.emptyShelter,default_focusClass);
			
			}else{
				
				$Move.emptyShelter.className=default_focusClass;
			
			}
			  			
			if($Move.emptyShelter.parentNode!=$Move.parentTarget){
				
				Mell.Dom.append($Move.parentTarget,$Move.emptyShelter);
				
			}

			Mell.Style.add($Move.emptyShelter,{
						   
				"left":"","top":""
			
			});
							
			Mell.Style.add($Move.emptyShelter,default_focusClass);
			
			Mell.Style.add($Move.emptyShelter,{
						   
				"left":x+Mell.Str.toNumber(Mell.Style.get($Move.emptyShelter,"left")),
					
				"top":y+Mell.Str.toNumber(Mell.Style.get($Move.emptyShelter,"top"))
			
			});
					
		},
				
		//++++++++++++++++++++++++++++++++++++++++(swapOver)完成点对点移动++++++++++++++++++++++++++++++++++
		
		swapOver:function(){
						
			if($Move.finalOperatingSwapType==1){
				
				if($Move.emptyShelter!=null){
									
					try{Mell.Dom.remove($Move.emptyShelter);}catch(e){}
									
				}
				
				if($Move.toMoveMode!="part"){
			
					$Move.testInsert(1);
					
					$Move.isInsert(1);
				
				}
			
			}
			
			if(!$Move.toTarget||$Move.toTarget==$Move.oldparentTarget||$Move.swapLock==true||
			   $Move.toMoveMode=="empty"||$Move.toTarget==null||$Move.toMoveMode==null){
			
				try{Mell.Dom.before($Move.emptyTarget,$Move.onTarget);}catch(e){}
				
				try{Mell.Dom.remove($Move.emptyTarget);}catch(e){}
					
			}else{
				 			
				if($Move.finalOperatingSwapType==1){
					
					$Move.toSwapSwap();
					
				}else{
					
					$Move.toSwapInsert();
					
				}
								
			}
						
		},//swapOver end
		
		//+++++++++++++++++++++++++++++++++++++++++(toSwapSwap)将对象放到目标位+++++++++++++++++++++++++++++++++
		
		toSwapSwap:function(){//$Move.finalOperatingSwapType==1
				 
		   if($Move.toMoveMode!="part"){
				
				$Move.toTargetNextSibling=$Move.toTarget.nextSibling;
				
				if($Move.toTargetNextSibling!=$Move.emptyTarget){
					
					try{Mell.Dom.before($Move.emptyTarget,$Move.toTarget);}catch(e){}
				  
					try{Mell.Dom.before($Move.toTargetNextSibling,$Move.onTarget);}catch(e){}
				
				}else{
					
					try{Mell.Dom.before($Move.toTarget,$Move.onTarget);}catch(e){}
					
				}
				
			}else{
			   
			  if($Move.toTarget==$Move.oldparentTarget){
				 
				  try{Mell.Dom.before($Move.emptyTarget,$Move.onTarget);}catch(e){}
				  
			  }else{
				  
				  $Move.toSwapParent();
				  
			  }
				
			}
			   
			try{Mell.Dom.remove($Move.emptyTarget);}catch(e){}
							
		},
		
		//++++++++++++++++++++++++++++++++++++++++(toSwapInsert)+++++++++++++++++++++++++++++++++++++++++++++++++++++
		
		toSwapInsert:function(){//$Move.finalOperatingSwapType==0
				  
			if($Move.toMoveMode!="part"||$Move.toTarget==$Move.parentTarget){
				
				try{
					
					Mell.Dom.before($Move.emptyTarget,$Move.onTarget);
				
				}catch(e){}
				
			}else{
				
				$Move.toSwapParent();
				
			}
			
			try{Mell.Dom.remove($Move.emptyTarget);}catch(e){}
						
		},
		
		//++++++++++++++++++++++++++++++++++++++++++++++++++(toSwapParent)+++++++++++++++++++++++++++++++++++++++
		
		toSwapParent:function(){
			
			var last_dom=$Move.toTarget["mell-move-last-dom"]||Mell(Mell.Attr.get($Move.toTarget,"mell-move-last-dom"));
						
			if(!last_dom||$Move.onTarget==last_dom){
					
				try{ Mell.Dom.append($Move.toTarget,$Move.onTarget);
				}catch(e){}
					
			}else{
				 
				try{ Mell.Dom.before(last_dom,$Move.onTarget);
				}catch(e){}
				  
			}
			
		},
		
		//+++++++++++++++++++++++++++++++++++++++(mouseIsOutWindow)判断鼠标是否超出窗口+++++++++++++++++++++++++++++
		
		mouseIsOutWindow:function(){
						
			if($Move.x<Mell.ScrollLeft()) return true;
			
			if($Move.y<Mell.ScrollTop()) return true;
		
			if($Move.x>Mell.ClientWidth()+Mell.ScrollLeft()) return true;
			
			if($Move.y>Mell.ClientHeight()+Mell.ScrollTop()) return true;
				
		},
		
		//++++++++++++++++++++++++++++++++++++++(actionCompleted)移动事件成立/完成对象放置++++++++++++++++++++++++
		
		actionCompleted:function(){
			
			if(!Mell.Dom.contains(document,$Move.onTarget)){
				
				if($Move.moveModeCache==0){
					
					try{Mell.Dom.remove($Move.emptyTarget);}catch(e){}
					
					try{Mell.Dom.remove($Move.emptyShelter);}catch(e){}
					
				}else{
					
					try{Mell.Dom.remove($Move.emptyCover);}catch(e){}
					
					try{Mell.Dom.remove($Move.globalShelterTarget);}catch(e){}
				
				}
				
				return false;
				
			}
			
			if($Move.moveModeCache==1){//1:move
			
				try{
					
				$Move.parentXYScrollPoor=$Move.getParentScroll();		
				
				var offset=$Move.finalOperatingMoveType==0&&$Move.moveStarted?
				{left:$Move.emptyCover.offsetLeft,top:$Move.emptyCover.offsetTop}:
				Mell.Offset($Move.onTarget);
				
				var _xy={
					x:((offset.left-$Move.parentAllXY.x)+$Move.parentXYScrollPoor.x),
					y:((offset.top-$Move.parentAllXY.y)+$Move.parentXYScrollPoor.y)
				}
			   			
				var boder_TW=Mell.Str.toNumber(Mell.Style.get($Move.parentTarget,"borderTopWidth"));
				
				var boder_LW=Mell.Str.toNumber(Mell.Style.get($Move.parentTarget,"borderLeftWidth"));
								
				if($Move.finalOperatingMoveType==0){
										
					Mell.Style.add($Move.onTarget,{
								
						"left":_xy.x-boder_LW,
						"top":_xy.y-boder_TW,
						"position":"absolute",
						"margin":0
					
					});
					
					try{Mell.Dom.remove($Move.emptyCover);}catch(e){}
					
				}
				
				if($Move.finalOperatingMoveType==1){
										
					Mell.Style.add($Move.onTarget,{
								
						"left":_xy.x-boder_LW,
						"top":_xy.y-boder_TW
					
					});
					
					if($Move.parentTarget.nodeName.toLowerCase()!="body"){
					
						try{
							
							Mell.Dom.append($Move.parentTarget,$Move.onTarget);
						
						}catch(e){
							
							Mell.Dom.append($Move.oldparentTarget,$Move.onTarget);
							
						}
					
					}
					
				}
				
				boder_TW=null;
				
				boder_LW=null;
				
				}catch(e){}
				
				try{ Mell.Dom.remove($Move.globalShelterTarget);}catch(e){}
				
			}
				
			if($Move.moveModeCache==0){//0:swap
				
				$Move.testInsert();
				
				$Move.swapOver();
				
				Mell.Style.add($Move.onTarget,{
							   
					"zIndex":$Move.min_zindex,
					 "margin":$Move.oldMargin,
					 "top":$Move.oldTop,
					 "left":$Move.oldLeft,
					 "position":$Move.oldPosition
							   
				});
								
			}
		
		},
		
		//++++++++++++++++++++++++++++++++++++(clearEvent)解除鼠标事件/完成一次操作++++++++++++++++++++++++++++++++
		
		clearEvent:function(e){
			
			if($Move.globalLock==true&&$Move.moveModeCache==null){return true;}
			
			//触摸设备事件(还有手指没拿起就不向下执行)
			
			if("touches" in e&&e.touches.length==1){return true;}
			
			if($Move.mouseIsOutWindow()!=true){
				
				$Move.clearTimerAll();
																	
				if($Move.moveModeCache!=null){
						
					try{$Move.moveEventPro("onUp");
					}catch(e){}	
					
					try{
						
						if($Move.ThrowRecordCount<2&&$Move.isOutPX(1)){
							
							try{$Move.moveEventPro("onThrow");}catch(e){}
												
						}
						
					}catch(e){}
					
					if(!$Move.moveLock){

						if($Move.targetMoved==true&&$Move.isDragUp==true&&$Move.isOutPX(1)){

							try{$Move.actionCompleted();}catch(e){}
							
							try{
															
								$Move.moveEventPro("onEnd");
							
							}catch(e){}
							
						}else{
							
							if($Move.targetMoved&&$Move.isDragUp){//矫正1px移动误差点击事件

								try{$Move.actionCompleted();}catch(e){}
															
							}
													
							if(!$Move.targetMoved){
											  
								try{$Move.moveEventPro("onClick");}catch(e){}
									
							}
							
						}
					
					}
										
					try{$Move.resetValue();
					}catch(e){}	
					
					return false;
				
				}//if($Move.moveModeCache!=null)
				
				$Move.isDown=false;			
		
				$Move.isBeMove=false;			
						
			}//if($Move.mouseIsOutWindow()!=true)
				
		  },//clearEvent end
		  
		  clearTimerAll:function(){
			  
			  $Move.clearThrowTimer();
			  
			  $Move.clearHoldTimer();
			  
			  $Move.recordTimer&&clearInterval($Move.recordTimer);
			  
			  $Move.testTimer&&clearInterval($Move.testTimer);
			  
		  },
		  
		  resetValue:function(){
			  			  
			  $Move.moveLock=false;
			  			  									
			  $Move.oldTop=null;
			  
			  $Move.oldLeft=null;
			  
			  $Move.oldPosition=null;
			  
			  $Move.oldMargin=null;
			  			  
			  $Move.targetLimitXY=null;
			  
			  $Move.finalOperatingMoveType=null;
			  
			  $Move.finalOperatingSwapType=null;
			  			  
			  $Move.targetMoved=false;
			  
			  $Move.isDragUp=false;
										  
			  $Move.moveModeCache=null;
			  
			  $Move.toMoveMode=null;
			  
			  $Move.moveMode=null;
			  
			  $Move.relatedTarget=null;
			  
			  $Move.onTarget=null;
			  
			  $Move.toTarget=null;
			  
			  $Move.toTargetNextSibling=null;
			  
			  $Move.oldToTarget=null;
			   
			  $Move.oldparentTarget=null;
			  
			  $Move.parentTarget=null;
			  
			  $Move.moveProperty={};
			  								  
			  $Move.parentAllXY={x:0,y:0};
					   
			  $Move.parentXYScrollPoor={x:0,y:0}; 
			  
			  $Move.testTimer=null;
			  
			  $Move.recordTimer=null;
			  
			  $Move.ThrowRecordCount=0;
			  
			  $Move.moveStarted=false;
			  
			  $Move.moveSelector=null;
							
			  $Move.moveProperty=null;
			   			  			  
		  },
		  
		  //++++++++++++++++++++++++++++++++++++++++++++++初始化(init)+++++++++++++++++++++++++++++++++++++++++++++
		  
		  init:function(){
			  			  																			
			  Mell.Event.on(document,"mousedown",$Move.getOnXY);
			  
			  Mell.Event.on(document,"mousemove",$Move.getXY);
			   
			  Mell.Event.on(document,"mouseup",$Move.clearEvent);
			  			  			  
			  if(Mell.Browser.isMobile){
				  
				  //触摸设备的取消事件
								  
				  Mell.Event.on(document,"touchcancel",$Move.clearEvent);
				  			  
			  }
				
		  }//init end
	
	}
		
	$Move.init();
	
	return $Move;

})(window,document,undefined);

//end