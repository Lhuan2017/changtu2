/** html5 dom javascript libiary
 *  support ie9+、chrome、firefox、android、ios
 *  powered by Lhuan  2015/9/10.
 */
!function(){
	"use strict";
	var TWEEN=TWEEN||function(){var a=[];return{REVISION:"7",getAll:function(){return a},removeAll:function(){a=[]},add:function(c){a.push(c)},remove:function(c){c=a.indexOf(c);-1!==c&&a.splice(c,1)},update:function(c){if(0===a.length)return!1;for(var b=0,d=a.length,c=void 0!==c?c:Date.now();b<d;)a[b].update(c)?b++:(a.splice(b,1),d--);return!0}}}();
TWEEN.Tween=function(a){var c={},b={},d=1E3,e=0,f=null,h=TWEEN.Easing.Linear.None,r=TWEEN.Interpolation.Linear,k=[],l=null,m=!1,n=null,p=null;this.to=function(a,c){null!==c&&(d=c);b=a;return this};this.start=function(d){TWEEN.add(this);m=!1;f=void 0!==d?d:Date.now();f+=e;for(var g in b)if(null!==a[g]){if(b[g]instanceof Array){if(0===b[g].length)continue;b[g]=[a[g]].concat(b[g])}c[g]=a[g]}return this};this.stop=function(){TWEEN.remove(this);return this};this.delay=function(a){e=a;return this};this.easing=
    function(a){h=a;return this};this.interpolation=function(a){r=a;return this};this.chain=function(){k=arguments;return this};this.onStart=function(a){l=a;return this};this.onUpdate=function(a){n=a;return this};this.onComplete=function(a){p=a;return this};this.update=function(e){if(e<f)return!0;!1===m&&(null!==l&&l.call(a),m=!0);var g=(e-f)/d,g=1<g?1:g,i=h(g),j;for(j in c){var s=c[j],q=b[j];a[j]=q instanceof Array?r(q,i):s+(q-s)*i}null!==n&&n.call(a,i);if(1==g){null!==p&&p.call(a);g=0;for(i=k.length;g<
i;g++)k[g].start(e);return!1}return!0}};
TWEEN.Easing={Linear:{None:function(a){return a}},Quadratic:{In:function(a){return a*a},Out:function(a){return a*(2-a)},InOut:function(a){return 1>(a*=2)?0.5*a*a:-0.5*(--a*(a-2)-1)}},Cubic:{In:function(a){return a*a*a},Out:function(a){return--a*a*a+1},InOut:function(a){return 1>(a*=2)?0.5*a*a*a:0.5*((a-=2)*a*a+2)}},Quartic:{In:function(a){return a*a*a*a},Out:function(a){return 1- --a*a*a*a},InOut:function(a){return 1>(a*=2)?0.5*a*a*a*a:-0.5*((a-=2)*a*a*a-2)}},Quintic:{In:function(a){return a*a*a*
    a*a},Out:function(a){return--a*a*a*a*a+1},InOut:function(a){return 1>(a*=2)?0.5*a*a*a*a*a:0.5*((a-=2)*a*a*a*a+2)}},Sinusoidal:{In:function(a){return 1-Math.cos(a*Math.PI/2)},Out:function(a){return Math.sin(a*Math.PI/2)},InOut:function(a){return 0.5*(1-Math.cos(Math.PI*a))}},Exponential:{In:function(a){return 0===a?0:Math.pow(1024,a-1)},Out:function(a){return 1===a?1:1-Math.pow(2,-10*a)},InOut:function(a){return 0===a?0:1===a?1:1>(a*=2)?0.5*Math.pow(1024,a-1):0.5*(-Math.pow(2,-10*(a-1))+2)}},Circular:{In:function(a){return 1-
    Math.sqrt(1-a*a)},Out:function(a){return Math.sqrt(1- --a*a)},InOut:function(a){return 1>(a*=2)?-0.5*(Math.sqrt(1-a*a)-1):0.5*(Math.sqrt(1-(a-=2)*a)+1)}},Elastic:{In:function(a){var c,b=0.1;if(0===a)return 0;if(1===a)return 1;!b||1>b?(b=1,c=0.1):c=0.4*Math.asin(1/b)/(2*Math.PI);return-(b*Math.pow(2,10*(a-=1))*Math.sin((a-c)*2*Math.PI/0.4))},Out:function(a){var c,b=0.1;if(0===a)return 0;if(1===a)return 1;!b||1>b?(b=1,c=0.1):c=0.4*Math.asin(1/b)/(2*Math.PI);return b*Math.pow(2,-10*a)*Math.sin((a-c)*
        2*Math.PI/0.4)+1},InOut:function(a){var c,b=0.1;if(0===a)return 0;if(1===a)return 1;!b||1>b?(b=1,c=0.1):c=0.4*Math.asin(1/b)/(2*Math.PI);return 1>(a*=2)?-0.5*b*Math.pow(2,10*(a-=1))*Math.sin((a-c)*2*Math.PI/0.4):0.5*b*Math.pow(2,-10*(a-=1))*Math.sin((a-c)*2*Math.PI/0.4)+1}},Back:{In:function(a){return a*a*(2.70158*a-1.70158)},Out:function(a){return--a*a*(2.70158*a+1.70158)+1},InOut:function(a){return 1>(a*=2)?0.5*a*a*(3.5949095*a-2.5949095):0.5*((a-=2)*a*(3.5949095*a+2.5949095)+2)}},Bounce:{In:function(a){return 1-
    TWEEN.Easing.Bounce.Out(1-a)},Out:function(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+0.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+0.9375:7.5625*(a-=2.625/2.75)*a+0.984375},InOut:function(a){return 0.5>a?0.5*TWEEN.Easing.Bounce.In(2*a):0.5*TWEEN.Easing.Bounce.Out(2*a-1)+0.5}}};
TWEEN.Interpolation={Linear:function(a,c){var b=a.length-1,d=b*c,e=Math.floor(d),f=TWEEN.Interpolation.Utils.Linear;return 0>c?f(a[0],a[1],d):1<c?f(a[b],a[b-1],b-d):f(a[e],a[e+1>b?b:e+1],d-e)},Bezier:function(a,c){var b=0,d=a.length-1,e=Math.pow,f=TWEEN.Interpolation.Utils.Bernstein,h;for(h=0;h<=d;h++)b+=e(1-c,d-h)*e(c,h)*a[h]*f(d,h);return b},CatmullRom:function(a,c){var b=a.length-1,d=b*c,e=Math.floor(d),f=TWEEN.Interpolation.Utils.CatmullRom;return a[0]===a[b]?(0>c&&(e=Math.floor(d=b*(1+c))),f(a[(e-
1+b)%b],a[e],a[(e+1)%b],a[(e+2)%b],d-e)):0>c?a[0]-(f(a[0],a[0],a[1],a[1],-d)-a[0]):1<c?a[b]-(f(a[b],a[b],a[b-1],a[b-1],d-b)-a[b]):f(a[e?e-1:0],a[e],a[b<e+1?b:e+1],a[b<e+2?b:e+2],d-e)},Utils:{Linear:function(a,c,b){return(c-a)*b+a},Bernstein:function(a,c){var b=TWEEN.Interpolation.Utils.Factorial;return b(a)/b(c)/b(a-c)},Factorial:function(){var a=[1];return function(c){var b=1,d;if(a[c])return a[c];for(d=c;1<d;d--)b*=d;return a[c]=b}}(),CatmullRom:function(a,c,b,d,e){var a=0.5*(b-a),d=0.5*(d-c),f=
    e*e;return(2*c-2*b+a+d)*e*f+(-3*c+3*b-2*a-d)*f+a*e+c}}};
	window['TWEEN']=TWEEN;
    window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(fn){
		var id=window['hackAnimationId'];
		id=id||0;
		id++;
		window['hackAnimationId']=id;
		window['hackAnimationTimer-'+id]=setTimeout(fn,1000/60);
		return id;
	};
    window.cancelAnimationFrame=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||function(id){
	   clearTimeout(window['hackAnimationTimer-'+id]);
	};
	var $=function(sel){
		if(!sel||!document.addEventListener) return;
		var obj;
		if(typeof(sel)=="object"){ 
			obj=[sel];
			if(sel.navigator){ //window
				obj.width=function(){return document.documentElement.clientWidth;};
				obj.height=function(){return document.documentElement.clientHeight;};
			}else if(sel.documentElement){   //document
				obj.width=function(){return document.body.scrollWidth;};
				obj.height=function(){return document.body.scrollHeight;};
			}else if(sel.innerHTML){  //element
				obj.width=function(){return parseInt(obj.css('width'));};
				obj.height=function(){return parseInt(obj.css('height'));};
			}else if(sel.css){  //diy object
			   obj=sel;
			}
		}else if(typeof(sel)=="string"){
			obj=Array.prototype.slice.call(document.querySelectorAll(sel));
		}
		if(!sel.navigator) obj=extend(obj,selector);
		return obj;
	};
	function extend(to,from){
	   if('__proto__' in Object){
	      to.__proto__=from;
	   }else{
		   for(var i in from){
			   to[i]=from[i];
		   }
	   }
	   return to;
	}
	function guid(){
       var guid = new Date().getTime();
	   guid+='-'+parseInt(Math.random()*1000000);  //增加2个100w以内的随机数
	   guid+='-'+parseInt(Math.random()*1000000);
       return guid.toUpperCase();    
    }
	function ajax(url,callback,parameters){
		if(!('XMLHttpRequest' in window)) return;
		var request = new XMLHttpRequest(); 
		if (callback !== undefined ) {
			request.onreadystatechange=function(){
			   if (request.readyState==4){
					if(request.status==200) callback&&callback(request.responseText);
					else{
					  //console.log('error'); 
					  ajax(url,callback,parameters);
					}
					//request.abort();
					request=null;				
			   }
			};
		}
		var type=parameters?'POST':'GET';
		var msg=null;
		if(typeof(parameters)=='object'){
			msg='';
			for(var i in parameters){
			  msg+='&'+i+'='+parameters[i];
			}
			if(msg) msg=msg.substring(1);
		}
		request.open( type, url, true );
		request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		request.send(msg);
	}
	function getHackPrefix(){
		var arr=['webkit','moz','o','ms'];
		var style=document.documentElement.style;
		var prefix='';
		if(!('animation' in style)){
			for(var i=0;i<arr.length;i++){
				if((arr[i]+'Animation') in style){
					if(arr[i]=='webkit') prefix='webkit';
					else if(arr[i]=='o') prefix='o';
					else if(arr[i]=='ms') prefix='MS';
					break;
				}
			}
		}
		return prefix;
	}
	function getHackTransform(str){
		    var prefix=getHackPrefix();
		    if(str.indexOf('-webkit-transform')>-1){
				if(prefix==''){
					str=str.replace('-webkit-transform','transform');
				}else if(prefix!='webkit'){
					str=str.replace('-webkit-transform','-'+prefix+'-transform');
				}
			}
			return str;
	}
	function formatArray(arr){
	    var result = [];
		for (var i = 0;i<arr.length;i++) {
			var v=arr[i];
			if(v!=''&&!v.match(/\s+/)&&result.indexOf(v)<0){
			    result.push(v);
			}
		}
		return result;
	}
	var selector={
		bind:function(type,fn,useCapture){
			useCapture=useCapture?true:false;
			for(var i=0;i<this.length;i++){
			   var el=this[i];
			   if(el.addEventListener){
				 el.addEventListener(type, fn, useCapture);
			   }   
			}
			return this;
		},
		unbind:function(type,fn,useCapture){
			useCapture=useCapture?true:false;
			for(var i=0;i<this.length;i++){
				var el=this[i];
				if(el.removeEventListener){
					el.removeEventListener(type, fn, useCapture);
				}
			}
			return this;
		},
		index:function(ele){
		  for(var i=0;i<this.length;i++){
		   if(ele==this[i]) return i;
		  }
		},
		eq:function(index){
		   var obj=[this[index]];
		   obj=extend(obj,selector);
		   return obj;
		},
		not:function(index){
			var obj=[];
			for(var i=0;i<this.length;i++){
			  if(i!=index) obj.push(this[i]);
			}
			obj=extend(obj,selector);
			 return obj;
		},
		attr:function(name,value){
		  if(arguments.length==1){
			 return this[0].getAttribute(name);  
		  }else{
			for(var i=0;i<this.length;i++){
		      this[i].setAttribute(name,value);
		    }
		   return this;
		  }
		},
		hasAttr:function(name){
			return this[0].hasAttribute(name);  
		},
		width:function(){
		   if(this.length) return this[0].offsetWidth;
		},
		height:function(){
		   if(this.length) return this[0].offsetHeight;
		},
		remove:function(){
		   for(var i=0;i<this.length;i++){
				var obj=this[i];
				if('remove' in obj) obj.remove();
				else obj.parentNode.removeChild(obj);
		   }
		},
		trigger:function(event){
		     for(var i=0;i<this.length;i++){
				 var element=this[i];
				 if (document.createEventObject){
					var evt = document.createEventObject();
					element.fireEvent('on'+event,evt);
				 }else{
					var evt = document.createEvent( 'HTMLEvents' );
					evt.initEvent(event,true,false);  
					element.dispatchEvent(evt);
				 }
			 }
		},
		removeAttr:function(name){
			for(var i=0;i<this.length;i++){
				this[i].removeAttribute(name);
			}
			return this;
		},
		is:function(str){
			if(str==':visible'){
				if(this.css('display')=='none'||this.css('visibility')=='hidden') return false;
				else return true;
			}
		},
		position:function(){
            var child=this[0];
			var parent=child.parentNode;
			var obj={
				top:child.offsetTop+parent.offsetTop,
				left:child.offsetLeft+parent.offsetLeft,
			};
			return obj;
		},
		offset:function(){
			var child=this[0];
			var obj={
				top:child.offsetTop,
				left:child.offsetLeft,
				width:child.offsetWidth,
				height:child.offsetHeight,
			};
			return obj;
		},
		find:function(sel){
		   var obj=[];
		   for(var i=0;i<this.length;i++){
			   var el=this[i];
			   obj=obj.concat(Array.prototype.slice.call(el.querySelectorAll(sel)));
		   }
		   obj=extend(obj,selector);
		   return obj;
		},
		children:function(index){
			var nodes=[];
			if(this.length&&this[0]){
				nodes=this[0].childNodes;
				var obj=[];
				for(var i=0;i<nodes.length;i++){
					if(nodes[i].nodeName!='#text'){
						obj.push(nodes[i]);
					}
				}
				if(arguments.length){
				  if(index>=0) obj=[obj[index]];
				  else obj=[obj[nodes.length+index]];
			    }
			}
			obj=extend(obj,selector);
			return obj;
		},
		parent:function(){
			var obj=[this[0].parentNode];
			obj=extend(obj,selector);
			return obj;
		},
		addClass:function(name){
			if(document.documentElement.classList){
				for(var i=0;i<this.length;i++){
					this[i].classList.add(name);
				}
			}else{
			  for(var i=0;i<this.length;i++){
				 var obj=this[i];
				 var cname=obj.className;
			     var arr=formatArray(cname.split(' '));
			     if(arr.indexOf(name)>-1) continue;
				 arr.push(name);
				 obj.className=arr.join(' ');
			  }
			}
			return this;
		},
		removeClass:function(name){
			if(document.documentElement.classList){
				for(var i=0;i<this.length;i++){
					this[i].classList.remove(name);
				}
			}else{
			  for(var i=0;i<this.length;i++){
				 var obj=this[i];
				 var cname=obj.className;
			     var arr=cname.split(' ');
			     if(arr.indexOf(name)<0) continue;
				 arr=cname.split(name);
				 var str=arr.join(' ');
				 arr=formatArray(str.split(' '));
				 obj.className=arr.join(' ');
			  }
			}
			return this;
		},
		hasClass:function(name){
			var ele=this[0];
			if(!ele) return this;
		    if(document.documentElement.classList){
				return ele.classList.contains(name);
			}else{
			   var arr=ele.className.split(' ');
			   return arr.indexOf(name)>-1;
			}
		   return this;
		},
        show:function(){
            for(var i=0;i<this.length;i++){
		      this[i].style.display='block';
		    }
			return this;
		},
        hide:function(){
            for(var i=0;i<this.length;i++){
		      this[i].style.display='none';
		    }
			return this;
		},
		each:function(fn){
			for(var i=0;i<this.length;i++){
				fn.call(this[i],i);
			}
			return this;
		},
		get:function(index){
			return this[index];
		},
		html:function(value){
			if(arguments.length==0) return this[0].innerHTML;
			for(var i=0;i<this.length;i++){
				this[i].innerHTML=value;
			}
			return this;
		},
		append:function(value){
			for(var i=0;i<this.length;i++){
				if(typeof(value)=='string') {
					var div = document.createElement('div');
					this[i].appendChild(div);
					div.outerHTML = value;
				}else if(typeof(value)=='object'){
					this[i].appendChild(value);
				}
			}
			return this;
		},
		prepend:function(){
			for(var i=0;i<this.length;i++){
				if(typeof(value)=='string') {
					var div = document.createElement('div');
					var obj=this[i];
					obj.parentNode.insertBefore(div,obj);
					div.outerHTML = value;
				}else if(typeof(value)=='object'){
					var obj=this[i];
					obj.parentNode.insertBefore(value,obj);  
				}
			}
			return this;
		},
		css:function(name,value){
			if(typeof(value)=='undefined'){
			   if(!this[0]) return '';
			   if(typeof(name)=='object'){
				   for(var i=0;i<this.length;i++){
					  for(var j in name){
						j=getHackTransform(j);
						this[i]['style'][j]=name[j];
					  }
				   }
				   return this;
			   }else{
				   var realStyle;
				   if (this[0].currentStyle) realStyle = this[0].currentStyle[name]; 
				   else if(window.getComputedStyle) realStyle = window.getComputedStyle(this[0],null)[name]; 
				   if(!realStyle) realStyle=this[0].style[name];
				   if(name.indexOf('transform')>-1&&this[0].style[name]!="") realStyle=this[0].style[name];
				   return realStyle;  
			   }
			}else{
			  for(var i=0;i<this.length;i++){
				this[i]['style'][name]=value;
			  }
			  return this;
			}
		},
		data:function(name,value){
		   return this.attr('data-'+name,value); 
		},
		scrollTop:function(value){
		   if(arguments.length==0) return this[0].scrollTop;
			this[0].scrollTop=value;
           return this;		   
		},
		transition:function(attrs,speed,effect,fn,diy){
			var count= 0,attr,style;
			for(var i in attrs){
				count++;
				attr=i;
				var str=getHackTransform(i);
				if(i!=str){
					attrs[str]=attrs[i];
					delete attrs[i];
				}
			}
			style=count==1?attr:'all';
			style+=' '+speed/1000+'s';
			if(effect) style+=' '+effect;
			if(diy) style=diy;
			var prefix=getHackPrefix();
			var transitiion_name=prefix==''?'transition':prefix+'Transition';
			style=getHackTransform(style);
			attrs[transitiion_name]=style;
			var transitionEndEvent=prefix==''?'transitionend':prefix+'TransitionEnd';
			var _this=this;
			var func=function(){
				_this.unbind(transitionEndEvent,func);
				_this.css(transitiion_name,'');
				if(fn){
					fn=fn.bind(_this);
					fn();
				}
			};
			this.bind(transitionEndEvent,func).css(attrs);
		},
		transition2:function(attrs,speed,effect,fn,diy){
		  	var count= 0,attr,style;
			for(var i in attrs){ 
				count++;
				attr=i;
				var str=getHackTransform(i);
				if(i!=str){
					attrs[str]=attrs[i];
					delete attrs[i];
				}
			}
			style=count==1?attr:'all';
			style+=' '+speed/1000+'s';
			if(effect) style+=' '+effect;
			if(diy) style=diy;
			var prefix=getHackPrefix();
			//var transitiion_name=prefix==''?'transition':prefix+'Transition';
			style=getHackTransform(style);
			//attrs[transitiion_name]=style;
			var _this=this;
			var count=0;
			var total=this.length;			
			for(var i=0;i<total;i++){
                var obj=this[i];
				obj.currentStyle={};
				for(var j in attrs){
					console.log($(obj));
					var v=$(obj).css(j);
					console.log(j);
					console.log(v);
					if(!isNaN(v)) v=parseFloat(v);
					console.log(v);
					obj.currentStyle[j]=v;
				}
				//console.log(obj.currentStyle);
				new TWEEN.Tween(obj.currentStyle).to(attrs,speed).easing(TWEEN.Easing.Sinusoidal.InOut).onComplete(function(){
				  count++;
				}).start();
			}
			var timer;  
			var loop=function(){
				timer=requestAnimationFrame(loop);
				TWEEN.update();
				for(var i=0;i<total;i++){
				   var obj=_this[i];
				   //console.log(obj.currentStyle);
				   //$(obj).css(obj.currentStyle);
				} 
				if(count==total){
					cancelAnimationFrame(timer);
					console.log('stop');
					if(fn){
						fn=fn.bind(_this);
						fn();
					}
			    }else{
					console.log('tick');
				}
			};
			//
			loop();
			
			/*
			var transitionEndEvent=prefix==''?'transitionend':prefix+'TransitionEnd';
			var _this=this;
			var func=function(){
				_this.unbind(transitionEndEvent,func);
				_this.css(transitiion_name,'');
				if(fn){
					fn=fn.bind(_this);
					fn();
				}
			};
			this.bind(transitionEndEvent,func).css(attrs);
			*/
		},
		fadeOut:function(speed,fn,effect){
			var _this=this;
			if(!_this.is(':visible')) return;
			effect=effect||'';
			_this.transition({'opacity':0},speed,effect,function(){
				_this.css({'opacity':'','display':'none'});
				if(fn){
					fn=fn.bind(_this);
					fn();
				}
			});
			return this;
		},
		fadeIn:function(speed,fn,effect){
			var _this=this;
			_this.css({'display':'block','opacity':0});
			effect=effect||'';
			setTimeout(function(){
				_this.transition({'opacity':1},speed,effect,function(){
					_this.css({'opacity':'','display':'block'});
					if(fn){
						fn=fn.bind(_this);
						fn();
				    }
				});
			},10);
			return this;
		},
		setAnimationFn:function(fn){
			var prefix=getHackPrefix();
			var animationEndEvent=prefix==''?'animationend':prefix+'AnimationEnd';
			var _this=this;
			var func=function(){
				_this.unbind(animationEndEvent,func);
				fn=fn.bind(_this);
				fn();
			};
			this.bind(animationEndEvent,func);
			return this;
		},
		animation:function(keyframes,speed,effect,fn){
			this.removeAnimation();
			var animation_id=guid();
			var style=document.createElement('style');
			style.id='style-'+animation_id;
			var prefix=getHackPrefix();
			var prefix2=prefix;
			prefix=prefix==''?'':'-'+prefix.toLowerCase()+'-';
			style.innerHTML='@'+prefix+'keyframes animation-'+animation_id+'{'+keyframes+'}';
			document.head.appendChild(style);
			var css='animation-'+animation_id+' '+speed/1000+'s';
			if(effect) css+=' '+effect;
			var animationEndEvent=prefix2==''?'animationend':prefix2+'AnimationEnd';
			var _this=this;
			var func=function(){
				_this.unbind(animationEndEvent,func);
				if(fn){
					fn=fn.bind(_this);
					fn();
				}
			};
			this.attr('animation-id',animation_id).bind(animationEndEvent,func).css(prefix+'animation',css);
		},
		removeAnimation:function(){
			var id=this.attr('animation-id'); 
			if(id) {
				var prefix = getHackPrefix();
				prefix = prefix == '' ? '' : '-' + prefix.toLowerCase() + '-';
				this.css(prefix + 'animation', '').removeAttr('animation-id');
				var style = document.getElementById('style-' + id);
				if (style.remove) style.remove();
				else style.parentNode.removeChild(style);
			}
			return this;
		}	
	};
	$.guid=guid;
	$.ajax=ajax; 
	window['$']=$; 
}();  