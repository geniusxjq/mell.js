# mell.js


开发者: APP880.com

本框架是面向过程管理框架。相对面向对象框架更高效，更节省系统资源,可控性更强，更适合多屏运用。

---------------------------------------------

函数使用说明：

1.不返回内容的函数或函数不返回内容时，返回本身（arguments.callee）。便于复式操作（非链式）。

复式操作格式:

链头(arguments)(arguments)...

实例：

Mell.Event.on(dom1,"click",function(o){return this;})(dom2,"click",function(o){return o;})

*/
