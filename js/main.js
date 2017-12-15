var cWidth,cHeight,scale,isReady=false,currentPage=0,firstMaxSize=0,isBreak=false;
var isTouch='ontouchstart' in document.documentElement?true:false;
var ua=navigator.userAgent.toLocaleLowerCase();
var isWeiXin=(ua.indexOf('micromessenger')>-1)?true:false; 
var isQQ=(ua.indexOf('qq/')>-1)?true:false;
var isAndroid=(ua.indexOf('android')>-1||ua.indexOf('linux') > -1 )?true:false;
var isX5=ua.indexOf('tbs/') > -1; 
var touchStartEvent=isTouch?'touchstart':'mousedown';
var touchMoveEvent=isTouch?'touchmove':'mousemove';
var touchEndEvent=isTouch?'touchend':'mouseup';
var scaleObj,scale2Obj;
var body=$('body');
var animationObj={x:0,percent:0};
var touchSpeed=0;
var isAnimationEnd=true;
var maxPosition=0;
var isVertical=true;
var pic=$('.pic');
var containner=$('.containner');
var containner2=$('.containner2'); 
var containner3=$('.containner3'); 
var containner4=$('.containner4');
var main=$('.main');
var main1=$('.main1');
var main2=$('.main2');
var last = $(".last");
var icons=$('.icon');
var iconsObj=$('.icons');
var canvasObj;
var canvasBox=$('.canvasBox');
var tips=$('.tips');
//isAndroid=true; 

var projectName="cbnmemory2017"; 
window.onerror=function(msg,url,line){
	//alert(msg+'\n '+url+'\n '+line);
	return true; 
};
 
set_weixin_share(init); 
function changePath(path){
 ("pushState"in history)&&history.pushState(null,"",path);
}
function set_weixin_share(fn){
  if(!('startWebCount' in window)){
	  fn&&fn();
	  return;
  }
  startWebCount(projectName,'main');
  cg2.wx.title="你的记忆真的靠谱吗？";
  cg2.wx.imgUrl="http://h5.shmds.com/"+projectName+"/images/share.jpg";
  cg2.wx.desc="请回答2017"; 
  cg2.wx.link="http://h5.shmds.com/"+projectName;
  var shareComplete=function(){
	        var _c=cg2.wx;  
			wx.onMenuShareTimeline({ 
					title: _c.title,
					link: _c.link,
					imgUrl: _c.imgUrl,
					success: function () {
						startWebCount(projectName,'ShareTimeline');
					},
					cancel: function () {}
				});
				wx.onMenuShareAppMessage({
					title:_c.title,
					desc:_c.desc,
					link:_c.link,
					imgUrl:_c.imgUrl,
					type:_c.type,
					dataUrl:_c.dataUrl,
					success:function(){
						startWebCount(projectName,'ShareAppMessage');
					},
					cancle:function(){}
				});
				wx.onMenuShareQQ({
					title: _c.title,
					desc: _c.desc,
					link: _c.link,
					imgUrl: _c.imgUrl,
					success: function () {
					   startWebCount(projectName,'ShareQQ');
					},
					cancel: function () {}
				});
  };

  
  loadJS({"src":"/php/wechat.php","flag":true,"cb":function(){
	  wx.ready(shareComplete); 
	  fn&&fn();
  }}); 
} 
function init(){
    if(!('localStorage' in window)){
		alert('暂不支持当前浏览器！');
		return;
	}
    initDatas();
    pic=$('.pic');
    containner=$('.containner');
    containner2=$('.containner2'); 
    containner3=$('.containner3'); 
    main=$('.main');

    main2=$('.main2');
    
	scaleObj=$('div.scale');
	scale2Obj=$('div.scale2');
	scale3Obj=$('div.scale3');
	initEvent(); 
	var first=$('.first');
    var firstImgs=$('.first img');
	syncLoadImg(firstImgs,function(){
		first.fadeIn(400);
	    $('script').remove();		
		var imgs=$('.main img,.main2 img,.tips img,.last img,.share img');
		var tick=Date.now();
		var minDelay=0;
		syncLoadImg(imgs,function(){
		    initMain();
            var delta=Date.now()-tick;
			var complete=function(){
				requestAnimationFrame(function(){
					var delayPlayBgm=function(){
						if(bgmSound){
							bgmSound.play();
						}else setTimeout(delayPlayBgm,100);
					};
				   //loadImages(['foot.png','left-bicep.png','left-forearm.png','left-thigh.png','right-bicep.png','right-forearm.png','right-thigh.png','shadow.png','shin.png','toes.png','torso.png'],function(){
							   var tips1=$('.tips1');
							   var tips2=$('.tips2');
							   $('.tips-line4').setAnimationFn(function(){ 
								   setTimeout(function(){
									   tips1.fadeOut(600,null,'ease-out');
									   tips2.fadeIn(600,function(){
											tips.bind('click',function(){
													//delayPlayBgm(); 
													main1.fadeIn(1000,function(){
														tips.remove(); 
														first.remove(); 
														 canvasBox.css({'opacity':0,'display':'block'});
														 setTimeout(function(){
															 canvasBox.transition({'opacity':1},600); 
														 },100); 
														isReady=true;
													})
												});
									   },'ease-out');
								   },500);
							   })
							   tips.fadeIn(400,function(){
									//loadWalking(); 
							   },'ease-out');
					//});						
				})
			};
            if(delta>=minDelay)  complete();
            else setTimeout(complete,minDelay-delta);			
		});
	});
}
function loadWalking(){
	getAllLinks(['images/keyframes.css','images/webkit_keyframes.css','images/moz_keyframes.css','images/common.css'],function(links){  //load css
	   for(var i=0;i<links.length;i++){
		   var link=document.createElement('link');
		   link.rel="stylesheet";
		   link.href=links[i];
		   document.head.appendChild(link);
	   }

	});
	canvasObj=$('#canvas');
	var walking_animations=[
	                           [330,784],  //330,784   //364,765
							   [636,646],
							   [820,492],
							   [1080,384],
							   [1373,330],
							   [1535,278],
							   [1893,274],
							   [2244,376],
							   [2512,594],
							   [3517,612],
							   [3933,790],	
							   [4403,808],							   
	  ];
	 var addX=-30;
	 var addY=20;
	 //计算路径总长度
	 var length=0,prevPos;
	 for(var i=0;i<walking_animations.length;i++){
		 var pos=walking_animations[i];
		if(i==0) prevPos=pos;
		else{
		  var dx=pos[0]-prevPos[0];
		  var dy=pos[1]-prevPos[1];
		  length+=Math.sqrt(dx*dx+dy*dy);
		  prevPos=pos;
		}
	 }
	 var animationStr='';
	 var rotateStr='';
	 //正向动画
	 var prevPos=undefined;
	 var percent_count=0;
	 for(var i=0;i<walking_animations.length;i++){
		var pos=walking_animations[i];
		var percent=0,dx=0,dy=0,deg=0;
		if(i==0)  prevPos=pos;
		else{
		  var dx=pos[0]-prevPos[0];
		  var dy=pos[1]-prevPos[1];  
		  percent=Math.sqrt(dx*dx+dy*dy)*100/length;
		  prevPos=pos;
		  deg=Math.atan2(dy,dx)*10;
		  //console.log(deg);
		} 
		var x=pos[0]+addX;
		var y=pos[1]+addY;
		percent_count+=percent;
		animationStr+=percent_count*0.5+'%{transform:translateX('+x+'px) translateY('+y+'px)}'; 
		rotateStr+=percent_count*0.5+'%{transform:rotate('+deg+'deg) scaleX(1) scale(0.4) translateY(-100%) translateX(-50%)}'; 
	 }
	 //反向动画
	 var prevPos=undefined;
	 var percent_count=0;
	 for(var i=walking_animations.length-1;i>=0;i--){
		var pos=walking_animations[i];
		var percent=0,dx=0,dy=0,deg=0;
		if(i==walking_animations.length-1)  prevPos=pos;
		else{
		  var dx=pos[0]-prevPos[0];
		  var dy=pos[1]-prevPos[1];  
		  percent=Math.sqrt(dx*dx+dy*dy)*100/length;
		  prevPos=pos;
		  deg=-Math.atan2(dy,dx)*2;
		} 
		var x=pos[0]+addX;
		var y=pos[1]+addY;
		percent_count+=percent;
		animationStr+=(percent_count*0.5+50)+'%{transform:translateX('+x+'px) translateY('+y+'px)}'; 
		rotateStr+=(percent_count*0.5+50)+'%{transform:rotate('+deg+'deg) scaleX(-1) scale(0.4) translateY(-100%) translateX(-50%)}'; 
	 }
	 var speed=70000;
	 canvasBox.animation(animationStr,speed,' linear infinite');
	 canvasObj.animation(rotateStr,speed,' linear infinite');
}
function initDatas(){
	var datas=[
	    /*['ele-waimai',232,744,51,33], */
		['ele-smoke',378,770,26,39],
		/*['ele-ticket',901,167,10,14],*/
		/*['ele-screen',889,125,40,29],*/
		['ele-denglong1',865,44,45,52],
		['ele-denglong2',995,7,45,53],
		['ele-weiqi1',860,505,23,16],
		['ele-weiqi2',1458,244,19,11],
		['ele-reqi',1772,500,8,10],  
		['ele-reqi2',3396,440,10,10],   
		/*['ele-baozhi',1857,592,44,29],*/
		['ele-danzhu',1879,793,6,7], 
		['ele-door',2412,263,151,37],
		['ele-weiqi4',3165,654,45,27],
		['ele-motuo3',3342,673,48,46], 
		['ele-motuo4',3441,673,47,46], 
		['ele-yezi1',2770,846,34,28],
		['ele-yezi2',3400,890,35,27],  
		['ele-smoke2',175,345,8,11],
		['ele-denglong3',239,151,26,33],
	  /*['ele-denglong4',1544,186,33,44],*/
		['ele-denglong5',2095,6,27,36], 
	  /*['ele-denglong6',3496,537,27,36],
		['ele-motuo5',2651,627-10,81,81],
		['ele-motuo6',3033,631-10,84,84], 
		['ele-bus',2583,468-10,595,237],*/ 
		['ele-bike1',350,613,74,75],
		['ele-bike2',459,579,74,75],
		['ele-bike3',1628,221,52,53],
		['ele-bike4',1711,221,53,53], 
		['ele-bike5',2000,227,61,61], 
		['ele-bike6',1916,209,60,60],
	  /*['ele-zhifubao',1893,522,48,90],*/
		['ele-dianhua',2248,625,18,46],
	  /*['ele-yuguaqi1',3628,360,24,13],
		['ele-yuguaqi2',3603,360,24,8],*/
		['ele-arm',4150,493,33,50],
		['ele-sound1',1614,269,12,16],
		['ele-sound2',1601,281,10,13],
		['ele-sound3',1607,314,14,10],
	];
	var html='';
	for(var i=0;i<datas.length;i++){
		var data=datas[i];
		var name=data[0];
		html+='<div class="'+name+'" style="left:'+data[1]+'px;top:'+data[2]+'px;width:'+data[3]+'px;height:'+data[4]+'px;"><span><img url="'+name+'.png"></span></div>';
	}
	containner.html(html);
	
	//多个树叶动画
	var datas=[
          [
			[10,158,9,258],
			[70,164,60,300],
			[50,170,64,314]
          ],
          [
			[469,45,500,100],
			[526,6,640,134], 
			[550,56,554,118]
          ],
          [
			[2174,12,2203,95],
			[2211,4,2178,102],
			[2280,8,2310,74]
          ],
		  
          [
			[2308,600,2316,715],
			[2347,583,2369,732],
			[2416,583,2405,803],
			[2467,644,2531,695],
			[2502,565,2634,733]
          ],
          [
			[2893,19,2936,181],
			[2958,20,2899,215],
			[3017,5,3018,161],
			[3103,1,3160,56]
          ],
          [
			[3814,747,3840,925],
			[3878,723,3938,940],
			[3911,675,3980,929],
			[4039,746,4140,896],
			[3982,782,4045,938]
          ],
          [
			[4224,98,4221,235],
			[4309,70,4302,218],
			[4329,35,4374,170], 
			[4382,88,4397,232],
			[4430,92,4447,197]
          ]
	];
	var html='';
	var pic2=$('.pic2');
	var isPic2=pic2.is(":visible");
	for(var i=0;i<datas.length;i++){
		var arr=datas[i];
		html+='<div class="yezi-group">';
		for(var j=0;j<arr.length;j++){
			var data=arr[j];
			var name=data[0];
			html+='<div class="yezi" style="left:'+data[0]+'px;top:'+data[1]+'px;" data-index="'+j+'" data-total="'+arr.length+'" data-position="'+data.join(',')+'"><span><img url="ele-yezi.png"></span></div>';
		}
		html+='</div>';
	}
	containner4.html(html);
	/*
	var btn_position=[
	                   [232,743,54,73],
					   [880,112,54,48],
					   [1890,520,52,90],
					   [2865,699,158,143],
					   [3572,330,155,102],
	                 ];
	for(var i=0;i<btn_position.length;i++){
		var c=btn_position[i];
		html+='<div class="btns click" style="left:'+c[0]+'px;top:'+c[1]+'px;width:'+c[2]+'px;height:'+c[3]+'px"></div>';
	}
	*/
    
	
	
	requestAnimationFrame(function(){
		var yezis=$('div.yezi');
		yezis.each(function(){
			var obj=$(this);
			var position=obj.attr('data-position');
			var index=parseInt(obj.attr('data-index'));
			var total=parseInt(obj.attr('data-total'));
			var data=position.split(',');
			var deltaX=parseInt(data[2])-parseInt(data[0]);
			var deltaY=parseInt(data[3])-parseInt(data[1]); 
			var span=obj.children(0);
			var random=Math.random();
			var delay=-(10/total)*index; 
			var effect='infinite ease-out '+delay+'s';
			var sDeg=random*360;
			var eDeg=sDeg+360*0.3;
			if(Math.random()>0.5){  //反向旋转
				var tmpS=sDeg;
				var tmpE=eDeg;
				sDeg=tmpE;
				eDeg=tmpS; 
			} 
			var time=3000/*Math.sqrt(deltaX*deltaX+deltaY*deltaY)*20*/;  //持续时间
			obj.animation("0%{opacity:0;transform: translateX(0px) translateY(0px);}\
						   10%{opacity:1;}\
						   70%,90%{opacity:1;transform: translateX("+deltaX+"px) translateY("+deltaY+"px);}\
						   100%{opacity:0;transform: translateX("+deltaX+"px) translateY("+deltaY+"px);}",time,'ease-out infinite '+delay+'s');
			span.animation("0%{transform: rotate("+sDeg+"deg);}70%,100%{transform: rotate("+eDeg+"deg);} ",time,effect);
		});
				
	});

    //2017场景动画
	var datas=[
				['ele2-weiqi1',744,698,21,15], 
				['ele2-weiqi2',1239,424,21,19],
				['ele2-weiqi3',1806,321,26,16],
				['ele2-weiqi4',3480,611,30,15],
				['ele2-weiqi5',3622,790,23,15],
				
				['ele2-lunzi1',1013,501,48,48],
				['ele2-lunzi2',1174,432,49,48],
				
				['ele2-lunzi3',1569,296,47,48],
				['ele2-lunzi4',1744,292,48,49],
				
				['ele2-lunzi5',2430,760,47,46],
				['ele2-lunzi6',2534,787,46,46],
				
				['ele2-lunzi7',3032,584,56,56],
				['ele2-lunzi8',3308,584,59,58],
				
				['ele2-lunzi9',3366,718,59,58],
				['ele2-lunzi10',3566,750,50,50],
	];
    var html='';
	for(var i=0;i<datas.length;i++){
		var data=datas[i];
		var name=data[0];
        html+='<div class="'+name+'" style="left:'+data[1]+'px;top:'+data[2]+'px;width:'+data[3]+'px;height:'+data[4]+'px;"><span><img url="'+name+'.png"></span></div>';
	}
   containner3.html(html);  
}
var maskTimer;
var txt=$('.txt');
function showMaskAnimation(){
	isBreak=true;
	if(!huiguiSound.paused) huiguiSound.pause();
	else if(!jacksonSound.paused)  jacksonSound.pause();
	//回到初始位置
	animationObj.x=0;
	animationObj.percent=0;
	pic.css({'transform':'translateX(0px)'});
	var maskObj={percent:0}; 
	var add=0.1;
	var updateMask=function(){
		maskTimer=requestAnimationFrame(updateMask);  
		var percent2=Math.min(1,maskObj.percent+add);
		var percent1=Math.max(0,maskObj.percent-add);  
		var str='gradient(linear,left center, right center,\
				 color-stop('+percent1+',rgba(0,0,0,1)),\
				 color-stop('+percent2+',rgba(0,0,0,0))';	
	    main2.css({'-webkit-mask':'-webkit-'+str,'mask':str});
		TWEEN.update();
		//console.log('loop==>'+maskObj.percent+" "+percent1+"  "+percent2);
	};
	updateMask();
	 new TWEEN.Tween(maskObj).to({percent:0.5},1000).onComplete(function(){
		 cancelAnimationFrame(maskTimer);
		 TWEEN.removeAll();
		 animationObj.x=maxPosition;
		 animationObj.percent=1;
		 pic.transition({'transform':'translateX('+animationObj.x+'px)'},10000,'linear',function(){
				 updateMask(); 
				 new TWEEN.Tween(maskObj).to({percent:1+add},1000).onComplete(function(){
				   cancelAnimationFrame(maskTimer);
				   TWEEN.removeAll();
				   main1.hide();
				   main2.css({'-webkit-mask':'','mask':''});
				   last.fadeIn(600,null,'ease-out');
				 }).start();
		 });
	 }).start();
	 main2.show();
	 requestAnimationFrame(function(){
			iconsObj.fadeOut(1000);
	 });
}
function syncLoadImg(imgs,completeFn,progressFn){
    var imgs_loaded=0;
     //预加载所有图片（去除重复）
    var max=imgs.length;
    if(max==0) completeFn&&completeFn();	
    var loadImg=function(index){   
     var obj=imgs.eq(index);
     var tp=obj.attr('tp');
     var url=obj.attr('url');
	 //index++;
     if(url){ 
		 getAllLinks(['images/'+url],function(links){ 
			  imgs_loaded++; 
			  var lnk=links[0];
			  if(tp=='bg'){
				   if(lnk.indexOf('blob')>-1) obj.parent().addClass('blob').attr('blob',lnk);
				  obj.attr('src',lnk).removeAttr('tp').removeAttr('url').addClass('hide').parent().css({'background-image':'url('+lnk+')'}).attr('blob',lnk);
              }else{
				  obj.attr('src',lnk).removeAttr('url');
				  if(lnk.indexOf('blob')>-1) obj.addClass('blob').attr('blob',lnk);
				  /*
				  if(isX5&&url.indexOf('qrcode.jpg')<0){   
					  var canvas=document.createElement('canvas');
					  var ctx=canvas.getContext('2d');
					  var img=obj[0];
					  canvas.width=img.width;
					  canvas.height=img.height; 
					  canvas.className=img.className;
					  canvas.style.display=img.style.display;
					  ctx.drawImage(img,0,0); 
					  obj.parent().append(canvas);
					  obj.parent()[0].insertBefore(canvas,obj[0]);
     				  obj.remove();           					  
				  }
				  */
			  }
			  if(imgs_loaded==max){
				  completeFn&&completeFn();
			  }else{
				    progressFn&&progressFn(imgs_loaded/(max));
			  }
			  //if(index<max) loadImg();
		 });
	 }else{
		 //loadImg(); 
	 }
   };
   for(var i=0;i<imgs.length;i++){
	   loadImg(i); 
   }
   //loadImg();
}
function toggleSoundEffect(){
	   animationObj.percent=animationObj.x/maxPosition; 
	   if(isBreak) return;
	  //回归音效
	  if (animationObj.x <= cWidth - 1595*scale && animationObj.x >= -(1595+93)*scale) {
		 if (huiguiSound.paused) {
			huiguiSound.play();
		 }
	  }else{
		if(!huiguiSound.paused) {
			huiguiSound.pause();
		}
	  }
	  if (animationObj.x <= cWidth - 3886*scale && animationObj.x >= -(3886+592)*scale) {
		 if (jacksonSound.paused) {
			jacksonSound.play();
		 }
	  }else{
		if(!jacksonSound.paused) {
			jacksonSound.pause();
		}
	  }
	  
}
function initEvent(){  
	 initUI(); 
	 window.onresize=initUI; 
	 document.addEventListener(touchStartEvent,function(e){
		 if(!($(e.target).hasClass('click'))) e.preventDefault(); 	 
	 },false);
	 document.addEventListener(touchMoveEvent,function(e){
		 e.preventDefault();
	 },false);	 
	 var picTouchX,picTouchY,isDown=false;
	 var yezi_group=$('.yezi-group');
	 main.bind(touchStartEvent,function(e){ 
	     if(maxPosition>=-30||!isReady||isBreak){ 
             isDown=false;
			 return;  //页面长图小于高度，不显示滚动条
		 }
		 isDown=true;
	     //e.preventDefault();
         picTouchX= !isTouch?e.clientX:e.targetTouches[0].pageX;
		 picTouchY= !isTouch?e.clientY:e.changedTouches[0].pageY;
		 
		 isAnimationEnd=true;
	 });
	 main.bind(touchMoveEvent,function(e){
		 e.preventDefault(); 
		 if(!isDown||!isReady||isBreak) return; 		 
		  var newX= e.clientX|| e.changedTouches[0].pageX;
		  var newY= e.clientY|| e.changedTouches[0].pageY;
		  var deltaX=newX-picTouchX;
		  var deltaY=newY-picTouchY;
		  touchSpeed=isVertical?deltaX:deltaY; 	 
		  picTouchX=newX; 
		  picTouchY=newY;
		  animationObj.x+=touchSpeed;		  
		  if(animationObj.x>0){
			  animationObj.x=0;
		  }else if(animationObj.x<maxPosition){
			  animationObj.x=maxPosition; 
		  }
		  pic.css({'transform':'translateX('+animationObj.x+'px)'});
		  toggleSoundEffect();
	 }); 
	 main.bind(touchEndEvent,function(e){
		 isDown=false;
		 if(!isReady||isBreak) return;
		 if(isAndroid&&Math.abs(touchSpeed)>30) touchSpeed=30*(touchSpeed<0?-1:1);
		 renderEndAnimation(); 
	 });
	 if(isAndroid) pic.css({'-webkit-transition':'-webkit-transform 0.1s ease-out','transition':'transform 0.1s ease-out'});  //android下防止拖动卡顿，插值动画
	 var pic2= $('.pic2'); 
	 var btns=$('.btns');
	 var closeBtn=$('.close-btn');
	 var count=0;
	 var animationEnd=function(){
		   count++;
		  if(count>=btns.length){
			 // main1.remove();  //全部显示后隐藏第一个场景  
			 isBreak = true;
			 setTimeout(showMaskAnimation,1000);
		  }
		  console.log('end');	  
	 };

	btns.bind('click',function(e){ 
	 	e.stopPropagation();
		isDown=false;
		stopRenderEndAnimation(); 
	    if(isBreak) return;
		 var obj=$(this);
		 if(!obj.hasClass('clicked')){
			 //isBreak=true;
			 obj.addClass('clicked'); 
			 var no=parseInt(obj.attr('class').match(/btn\d/)[0].replace('btn',''));
			 icons.eq(no-1).addClass('active'); 
             if(no==4)  ofoSound.play();
			 animationEnd();
			 
		 }
	});
	$(".replay-btn").bind("click",function(e){
	 	e.stopPropagation();
		cancelAnimationFrame(maskTimer);
	    TWEEN.removeAll();
		pic.css({'-webkit-transition':'','transition':''});
	    btns.removeClass('clicked'); 
		icons.removeClass('active');
	 	main1.fadeIn(400);
		main2.fadeOut(400,function(){
	 		count = 0;
		    txt.show();
		    last.css({'background-color':'rgba(0,0,0,0)'});
			closeBtn.show();
			last.css({'background-color':'rgba(0,0,0,0.8)'});
		 });
		 iconsObj.fadeIn(1000);
	 	last.fadeOut(400);
	 	animationObj.x = 0;
	 	animationObj.percent = 0;
	 	pic.css({"transform":"translateX("+ animationObj.x +"px)"});
        // pic.css({'transform':'translateX('+animationObj.x+'px)'});
        isBreak = false;
	})
	$(".finish-btn").bind("click",function(e){
	 	 e.stopPropagation();
	 	 /*
	 	 rect.css({'-webkit-mask':'none'});
	 	 last.fadeOut(400,function(){
	 	 	main1.hide(); 
	 	 });
	 	 */
	 	 window.location.href = "http://z.cbndata.com/cbndata/fiesta/2017/index.html";
	 	 isBreak = false;
	});
   var share=$('.share');
	$(".invite-btn").bind("click",function(e){
		e.stopPropagation();
		share.fadeIn(400); 
	})
	share.bind('click',function(){
		share.fadeOut(400);
	});
	closeBtn.bind('click',function(){
		closeBtn.fadeOut(400);
		txt.fadeOut(400);
		last.transition({'background-color':'rgba(0,0,0,0)'},400);
		isBreak=false;
	});
	 
}

function stopRenderEndAnimation(){
	touchSpeed=0;
	if('timer' in window){
		cancelAnimationFrame(timer);
		//if(!isAndroid) cancelAnimationFrame(timer);
		//else clearTimeout(timer);
	}
	isAnimationEnd=true;
	if(animationObj.x>0) animationObj.x=0;
    else if(animationObj.x<maxPosition) animationObj.x=maxPosition; 	
}
function renderEndAnimation(){
	isAnimationEnd=false;
	var tick;
	var loop=function(){ 
		if(!isAnimationEnd){ 
			timer=requestAnimationFrame(loop);    
		}
		pic.css({'transform':'translateX('+animationObj.x+'px)'}); 
		toggleSoundEffect();
        /*		
		var ex=1;
		if(isAndroid){ //防止帧率低时动画运行不了
			var newTick=Date.now();
			ex=tick?(newTick-tick)/16:1; 
			tick=newTick;
		}
		*/
		touchSpeed*=0.95;  
		animationObj.x+=touchSpeed;  
		if(Math.abs(touchSpeed)<0.5||(animationObj.x>=0)||(animationObj.x<=maxPosition)){
			  isAnimationEnd=true;
			  stopRenderEndAnimation(); 
			  if(animationObj.x>0) animationObj.x=0;
		      else if(animationObj.x<maxPosition) animationObj.x=maxPosition;
		 }
	};
	loop();
}

function initMain(){
	if(!('cachedImgs' in window)) return;
	var img=cachedImgs['images/pic.jpg'];
	var ww=img.naturalWidth;
	var hh=img.naturalHeight;
	var maxW=cHeight*ww/hh;
	maxPosition=-maxW+cWidth;
	pic.css({'width':maxW+'px'});
	containner.css({'width':ww+'px','height':hh+'px','transform':'scale('+scale+')'});
	containner2.css({'width':ww+'px','height':hh+'px','transform':'scale('+scale+')'});
	containner3.css({'width':ww+'px','height':hh+'px','transform':'scale('+scale+')'}); 
}
function initUI(){
	cWidth=$(window).width();
	cHeight=$(window).height();
	scale=cHeight/960;
	scale2=cWidth/736;
	scaleObj.css({'transform':'scale('+scale+') translateX(-50%)'});
	scale2Obj.css({'transform':'scale('+scale2+')'});
    scale3Obj.css({'transform':'scale('+scale+')'});
	initMain();
	var isHack=false;
	if(isAndroid&&firstMaxSize){
		if(Math.max(cWidth,cHeight)<firstMaxSize*0.7) isHack=true;   
	} 
	animationObj.x=maxPosition*animationObj.percent;
    pic.css({'transform':'translateX('+animationObj.x+'px)'}); 
	//isVertical=(cWidth<cHeight)||!isTouch;
	/*
	if(!isHack){  
         if(!isVertical){
			var deg=window.orientation==-90?90:270;
			var e=cWidth/cHeight;
			body.css({'transform':'rotate('+deg+'deg) scale('+e+')'});
		}else{
			body.css({'transform':''});
		} 
	}
	*/

	if(isAndroid&&!firstMaxSize){
		firstMaxSize=Math.max(cWidth,cHeight);
	}
}
function getUrlArgument(name){
	var search=location.search.split('?')[1]||'';
	var arr=search.split('&');
	for(var i in arr){
	 var cArr=arr[i].split('=');
	 if(cArr[0]==name) return cArr[1];
	}
	return '';
}
function loadImages(imgs,completeCallBack,progressCallBack){
    var loaded=0;
    if(imgs){
        var load=function(file){
            var img=new Image();
            img.onload=function(){
                loaded++;
                //hideImage.appendChild(this);
                if(progressCallBack) progressCallBack((loaded+1)/(imgs.length+1));
                if(loaded==imgs.length&&completeCallBack) completeCallBack();
                return true;
            };
            img.onerror=function(){
                var re=load(file);
                if(re) loaded++;
                console.log('Failed to load '+img.currentSrc);
                return false;
            };
            img.src='images/'+file;
        }
        for(var i=0;i<imgs.length;i++){
            load(imgs[i]);
        }
    }else if(completeCallBack)  completeCallBack();
}