//显示旧版or新版留言
var isnew = 1;
var npn = 1;
//var g_uid = '';
HTMLElement.prototype.appendHTML = function (html) {
	var divTemp = document.createElement("div"), nodes = null, fragment = document.createDocumentFragment();
	divTemp.innerHTML = html;
	nodes = divTemp.childNodes;
	for (var i = 0, length = nodes.length; i < length; i += 1) {
		fragment.appendChild(nodes[i].cloneNode(true));
	}
	this.appendChild(fragment);
	// 据说下面这样子世界会更清净
	nodes = null;
	fragment = null;
};
var kuwo={
	jsonp:function(url,data,success,error){
		var add  = /\?/.test( url ) ? "&" : "?";
           var script =  document.createElement("script");
		script.jsonp = 1;
		var url = url + add + data;
           script.src = url;
		script.onload = script.onreadystatechange = function(){
             if( -[1,] || /loaded|complete/i.test(this.readyState)){
              kuwo.removeScript(script);
             }
           }
           script.onerror = function(){
		  	  requestErr();
              kuwo.removeScript(script);
           }
           var head = document.getElementsByTagName("head")[0];
           head.appendChild(script);
	},
	removeScript: function(script){
         if(typeof script.jsonp === "undefined" ){
         }
         if (script.clearAttributes) {
           script.clearAttributes();
         } else {
           script.onload = script.onreadystatechange = script.onerror = null;
         }
         script.parentNode.removeChild(script);
     }
}
var createAjax = function() {
    var xhr = null;
    try {
        xhr = new ActiveXObject("microsoft.xmlhttp");
    } catch (e1) {
        try {
            xhr = new XMLHttpRequest();
        } catch (e2) {
            window.alert("您的浏览器不支持ajax，请更换！");
        }
    }
    return xhr;
};
var ajax = function(conf) {
    var type = conf.type;
    var url = conf.url;
    var data = conf.data;
    var dataType = conf.dataType;
    var success = conf.success;                                      
    if (type == null){
        type = "get";
    }
    if (dataType == null){
        dataType = "text";
    }
    var xhr = createAjax();
    xhr.open(type, url, true);
    if (type == "GET" || type == "get") {
        xhr.send(null);
    } else if (type == "POST" || type == "post") {
        xhr.setRequestHeader("content-type",
                    "application/x-www-form-urlencoded");
        xhr.send(data);
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if(dataType == "text"||dataType=="TEXT") {
                if (success != null){
                    success(xhr.responseText);
                }
            }else if(dataType=="xml"||dataType=="XML") {
                if (success != null){
                    success(xhr.responseXML);
                }  
            }else if(dataType=="json"||dataType=="JSON") {
                if (success != null){
                    success(eval("("+xhr.responseText+")"));
                }
            }
        }else if(xhr.readyState == 4 && xhr.status != 200){
        	setToast3('<div style="color:#fff;background: rgba(0, 0, 0, 0.6);border-radius: 2px;padding: 2px;text-align: center;width:245px;margin: 0 auto;">没有成功，可能是网络出问题啦</div>');
        	isload=false;
        }
    };
};
function requestErr(){}
function jsonError(){}
var toastTime2=null;
var displayTime2=null;
function setToast3(html){
	if(toastTime2!=null){
		clearTimeout(toastTime2);
		clearTimeout(displayTime2);
	}
	$S('toastId2').style.display='block';
	$S('toastId2').style.opacity=1;
	$html('toastId2',html);
	toastTime2=setTimeout(function(){
		$S('toastId2').style.opacity=0;
		displayTime2=setTimeout(function(){$S('toastId2').style.display='none';},1000);
	},1000);
}
function sendimglog(f,str){
	var tjimg = new Image();
	tjimg.src="http://webstat.kuwo.cn/logtjsj/commsj/commjstj/sjazb/sjazb_mb"+f+"_"+str+"_"+hdid+".jpg";
}
var hdweibo='';
var hdqqspace='';
var hdwxmsg='分享首好听的歌曲给你~';
var hdwxdes='';
var hdurl='';
function allFsstr(url,e,needconfirm){
	hdurl =url;
	hdweibo = fstitle+"        "+fstext;	
	hdqqspace = fstext;
	hdwxdes =  fstext;
	hdwxmsg = fstitle;
	var imgurl = fspic;
	if("special"==pageflag){
		var jsonstr ='{"action":"control_share_webpage","weibo":"'+hdweibo+'","qqspace":"'+hdqqspace+'","wxmsg":"'+hdwxmsg+'","wxdes":"'+hdwxdes+'","url":"'+hdurl+'","imgurl":"'+imgurl+'","needconfirm":"'+needconfirm+'"}';
		arFs(jsonstr,e);
	}else {
		var jsonstr ='{"action":"control_share_webpage","weibo":"'+hdweibo+'","qqspace":"'+hdqqspace+'","wxmsg":"'+hdwxmsg+'","wxdes":"'+hdwxdes+'","url":"'+hdurl+'","imageurl":"'+imgurl+'","needconfirm":"'+needconfirm+'"}';
		iosFs(jsonstr,e);
	}
	sendimglog(pageflag,"fx");
}
function kv_back(json){
}
var def_uname="";
function getkv_back(json){
	try{
		var obj= json;
		if(obj.key=='ylunamear'){
			var devid=config.userinfo.dev_id;
			if("specialios"==pageflag){
				devid=config.userinfo.devid;
			}
			var uname=config.userinfo.uname;
			if(uname=='' && obj.value){
				uname=obj.value;
			}
			if(uname==''){
				try{
					devid=devid.substr(devid.length-4);
				}catch(e){devid="0001";}
				uname="kuwo"+devid;
			}
			def_uname=uname;
			$S('userName').value=def_uname;
			$S('refUserName').value=def_uname;
		}
		if("specialios"==pageflag){
			loadbigimg();
		}
	}catch(e){}
}
function gtver(ver,cgwver){
	ver=ver.replace("kwplayer_ip_","");
	ver=ver.replace("kwplayer_ar_","");
	var arr=ver.split(".");
	var versum=arr.join("");
	if(parseInt(versum)>=cgwver){
		return true;
	}
	return false;
}
function jsmvheight(){
	var imgarr=document.getElementsByName("mvpicname");
	for(var i=0;i<imgarr.length;i++){
		var tmph=parseInt(imgarr[i].width*9/16);
		imgarr[i].height=tmph;
	}
}
function allscSong(f,h,psrc){
	allplaySong(f,h,psrc);
	sendimglog(pageflag,"aps");
}
function toly(url,title,flag){
	if(config.userinfo.coolpad=="1"){
		url=url.replace("ismovies=1","ismovies=coolpad");
		if(url.indexOf("oldSpecail.jsp")>-1){
			if(url.indexOf("?")>-1){
				url=url+"&iscoolpad=1";
			}else{
				url=url+"?iscoolpad=1";
			}
		}
	}
	controlInappUrl(url,title,flag);
}

function deviceback(){
	try{jsmvheight();}catch(e){}
	config.keyvalue='kv_back';
	config.getkeyvalue='getkv_back';
	var devid="";
	config.listtitle=fstitle;
	config.listpic=fspic;
	if("special"==pageflag){
		try{devid=config.userinfo.dev_id;}catch(e){}
		try{hideload();}catch(e){}
		try{getstr('{"action":"data_getkeyvalue","key":"ylunamear"}');}catch(e){}
		try{config.issclst=gtver(config.userinfo.version,6580);}catch(e){}
		try{g_uid=config.userinfo.uid;}catch(e){}
	}else if("specialios"==pageflag){
		try{devid=config.userinfo.devid;}catch(e){}
		
		try{config.issclst=gtver(config.userinfo.ver,4730);}catch(e){}
		if(config.issclst){
			try{getstr('{"key":"ylunamear"}');}catch(e){}
		}
		try{g_uid=config.userinfo.userid;}catch(e){}
	}
	try{isnew=config.userinfo.iscomment;}catch(e){}
	try{
		
		$display('newboard','block');
		if(isnew!=1){	
			//getmessage(lid);
		}else{
			//loadlist_hot(hotnpn);
			loadlist(npn);
		}
	}catch(e){}
	//打榜新增支持歌单，专辑，歌手
	
	
}
function showAlbumPlayList(){
	var divarr=document.querySelectorAll(".commalbumdivname,.commplaylistname");
	for(var b=0;b<divarr.length;b++){
		var commobj=divarr[b];
		commobj.style.display='block';
	}
}

//滚动条在Y轴上的滚动距离
function getScrollTop(){
	var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
	if(document.body){
		bodyScrollTop = document.body.scrollTop;
	}
	if(document.documentElement){
		documentScrollTop = document.documentElement.scrollTop;
	}
	scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
	return scrollTop;
}
//文档的总高度
function getScrollHeight(){
	var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
	if(document.body){
		bodyScrollHeight = document.body.scrollHeight;
	}
	if(document.documentElement){
		documentScrollHeight = document.documentElement.scrollHeight;
	}
	scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
	return scrollHeight;
}
//浏览器视口的高度
function getWindowHeight(){
	var windowHeight = 0;
	if(document.compatMode == "CSS1Compat"){
		windowHeight = document.documentElement.clientHeight;
	}else{
		windowHeight = document.body.clientHeight;
	}
	return windowHeight;
}
var isScroll=1;
window.onscroll = function(){
	if(!isScroll)return;
	if(getScrollTop() + getWindowHeight()+50 > getScrollHeight()){
		if(isnew!=1){
			getmessage(lid);
		}
		isScroll=0;
	}
};

function turnBeast(bestType,url,title){
	if(bestType == '2'){
		controlInappUrl(url,title,'')
	}
}

function playSongStat(index,e,f,hasquality,libpath){
	playSong(index,e,f,hasquality,libpath);
	sendimglog(pageflag,"pls");
}

function playMVStat(index,e,libpath){
	if("special"==pageflag){
		arPlayMV(index,e,libpath);
	}else if("specialios"==pageflag){
		iosPlayMV(index,e,libpath);
	}
	sendimglog(pageflag,"plm");
}
//留言js
function showbox(f){
	$display('blackOverlayId','block');
	$display('light','block');
	$html('textwtitid','留下你想说的');
	g_refid=-1;
}
function hidebox(){
	$display('blackOverlayId','none');
	$display('light','none');
}
var g_refid=-1;
function replyText(refid,strtext,obj){
	$S('light').style.top=window.scrollY+'px';
	$display('blackOverlayId','block');
	$display('light','block');
	$html('textwtitid','@'+strtext);
	g_refid=refid;
	$S('refUserText').focus();
}
function replaceAll(a){
	if(a){
		return a.replace(new RegExp(/(\+)/g),' ');
	}
	return '';
}
function pullUpAction(f){
	loadmess(f);
}
function moreloadhtml(flag){
	if(1==flag){
		$html('morebtnId','');
	}else if(2==flag){
		$html('morebtnId','<div id="padload" style="display: block;margin:0 auto;width: 80px;" class="loading"><span class="pullUpLabel" style="font-size:1.27em;">获取更多</span></div>');
	}else if(3==flag){
		$html('morebtnId','<div id="padload" style="display: block;margin:0 auto;width: 150px;" class="loading"><span class="padloadIcon"></span><span class="pullUpLabel" style="font-size:1.27em;">正在加载...</span></div>');
	}
}
function getmessage(f) {
    pn=0;
    loadmess(f);
}
var pn=0;
var rn=20;
var total=-1;
function loadmess(f){
	if(pn==0){
		$html('messDivId','');
	}
	moreloadhtml(3);
	if(1==f){
		f=5;
	}else if(5==f){
		f=1;
	}
	var queryUrl="http://"+domain+"/mpage/html5/message/action/messageaction.jsp?flag=1&index="+f+"&pn="+pn+"&rn="+rn;
	ajax({type:"get", url:queryUrl,dataType:"json", success:function (data) {
        var obj=data;
        var html=[];
        var lst=obj.messlist;
        total=obj.total;
        for(var i=0;i<lst.length;i++){
        	var tmpmess=lst[i];
        	if(tmpmess){
        	
	        	html[html.length]='<div class="story">';
	        	html[html.length]='<div class="opbtn">';
	        	//html[html.length]='<img src="http://image.kuwo.cn/mpage/html5/message/wzhan.png" width="20" height="20" class="wzhan"/>';
	        	//html[html.length]='<span>5987</span>';
	        	html[html.length]='<img src="http://image.kuwo.cn/mpage/html5/message/hf.png" width="20" height="20" onclick="replyText('+tmpmess.id+',\''+replaceAll(decodeURIComponent(tmpmess.messageName))+'\',this);" class="hfimg"/>';
	        	html[html.length]='</div>';
	        	html[html.length]='<p class="story_t">'+replaceAll(decodeURIComponent(tmpmess.messageName))+'</p>';
	        	html[html.length]='<p class="story_time">'+tmpmess.messageTime+'</p>';
	        	html[html.length]='<div class="story_m">';
	        	html[html.length]=replaceAll(decodeURIComponent(tmpmess.messageText));
	        	html[html.length]='<p class="story_time">';
	        	
	        	if(tmpmess.bank1.indexOf('listnew:')==-1){
				    if('1'==tmpmess.bank1){
				    	//html[html.length]='<span class="new"><img src="http://image.kuwo.cn/kdt2014/new.png" width="17">我是新来的</span>';
				    }else if("2"==tmpmess.bank1){
				    	html[html.length]='<span class="xuan"><img src="http://image.kuwo.cn/kdt2014/xuan.png" width="17">萱粉</span>';
				    }else if("3"==tmpmess.bank1){
				    	html[html.length]='<span class="mo"><img src="http://image.kuwo.cn/kdt2014/mo.png" width="17">莫粉</span>';
				    }else if("2,3"==tmpmess.bank1){
				    	html[html.length]='<span class="mo" style="margin-right:10px;"><img src="http://image.kuwo.cn/kdt2014/mo.png" width="17">莫粉</span>';
				    	html[html.length]='<span class="xuan"><img src="http://image.kuwo.cn/kdt2014/xuan.png" width="17">萱粉</span>';
				    }
			    }else{
			    	var tagstr=tmpmess.bank1.substring(8);
			    	if(''==tagstr){
			    		//html[html.length]='<span class="new"><img src="http://image.kuwo.cn/kdt2014/new.png" width="17">我是新来的</span>';
			    	}else{
			    		var tarr=tagstr.split(",");
			    		for(var h=0;h<tarr.length;h++){
			    			var tmptagstr=tarr[h];
			    			var tagpic=tagarr[tmptagstr];
			    			if(tagpic){
				    			var picarr=tagpic.split(",");
				    			html[html.length]='<span class="tagdef" style="color:'+picarr[1]+';"><img src="'+picarr[0]+'" width="17">'+tmptagstr+'</span>';
			    			}
			    		}
			    	}
			    }
	        	html[html.length]='</p>';
	        	html[html.length]='</div>';
	        	if(tmpmess.refMessageText!=''){
		        	html[html.length]='<div class="story_hf">';
		        	html[html.length]=replaceAll(decodeURIComponent(tmpmess.refMessageText));
		        	html[html.length]='<p class="story_time">';
		        	
		        	if(tmpmess.bank2.indexOf('listnew:')==-1){
					    if('1'==tmpmess.bank2){
					    	//html[html.length]='<span class="new"><img src="http://image.kuwo.cn/kdt2014/new.png" width="17">我是新来的</span>';
					    }else if("2"==tmpmess.bank2){
					    	html[html.length]='<span class="xuan"><img src="http://image.kuwo.cn/kdt2014/xuan.png" width="17">萱粉</span>';
					    }else if("3"==tmpmess.bank2){
					    	html[html.length]='<span class="mo"><img src="http://image.kuwo.cn/kdt2014/mo.png" width="17">莫粉</span>';
					    }else if("2,3"==tmpmess.bank2){
					    	html[html.length]='<span class="mo" style="margin-right:10px;"><img src="http://image.kuwo.cn/kdt2014/mo.png" width="17">莫粉</span>';
					    	html[html.length]='<span class="xuan"><img src="http://image.kuwo.cn/kdt2014/xuan.png" width="17">萱粉</span>';
					    }
				    }else{
				    	var tagstr=tmpmess.bank2.substring(8);
				    	if(''==tagstr){
				    		//html[html.length]='<span class="new"><img src="http://image.kuwo.cn/kdt2014/new.png" width="17">我是新来的</span>';
				    	}else{
				    		var tarr=tagstr.split(",");
				    		for(var h=0;h<tarr.length;h++){
				    			var tmptagstr=tarr[h];
				    			var tagpic=tagarr[tmptagstr];
				    			if(tagpic){
					    			var picarr=tagpic.split(",");
					    			html[html.length]='<span class="tagdef" style="color:'+picarr[1]+';"><img src="'+picarr[0]+'" width="17">'+tmptagstr+'</span>';
				    			}
				    		}
				    	}
				    }
				    
		        	html[html.length]='</p>';
		        	html[html.length]='</div>';
	        	}
	        	html[html.length]='</div>';
			    
			}
        }
        if(pn==0){
        	$html('messDivId',html.join(""));
        }else{
        	$S("messDivId").appendHTML(html.join(""));
        }
        pn++;
        if(Math.floor((parseInt(total,10)+(rn-1))/rn) > pn){
        	if(pn<50){
				moreloadhtml(2);
			}
		}else{
			moreloadhtml(1);
		}
	}});
}

var isload=false;
var timer=null;
function addmess(flag){
	var userName=null;
	var userText=null;
	if(1==flag){
		userName=$S('userName');
		userText=$S('userText');
		g_refid=-1;
	}else if(2==flag){
		userName=$S('refUserName');
		userText=$S('refUserText');
	}
	if(userText && userText.value=='' || '最多输入200个字'==userText.value){
		setToast3('<div style="color:#fff;background: rgba(0, 0, 0, 0.6);border-radius: 2px;padding: 2px;text-align: center;width:175px;margin: 0 auto;">话题征集内容不能为空</div>');
		//userText.focus();
		return;
	}
	if(userText && userText.value.length>200){
		setToast3('<div style="color:#fff;background: rgba(0, 0, 0, 0.6);border-radius: 2px;padding: 2px;text-align: center;width:235px;margin: 0 auto;">话题征集内容最多输入200个字</div>');
		return;
	}
	if(userName && userName.value==''){
		setToast3('<div style="color:#fff;background: rgba(0, 0, 0, 0.6);border-radius: 2px;padding: 2px;text-align: center;width:120px;margin: 0 auto;">称呼不能为空</div>');
		return;
	}
	if(isload){
		setToast3('<div style="color:#fff;background: rgba(0, 0, 0, 0.6);border-radius: 2px;padding: 2px;text-align: center;width:175px;margin: 0 auto;">休息，休息一会儿</div>');
		return;
	}
	isload=true;
	
	if(timer)clearTimeout(timer);
	timer= setTimeout(function(){
    	//setToast3('<div style="color:#fff;background: rgba(0, 0, 0, 0.6);border-radius: 2px;padding: 2px;text-align: center;width:245px;margin: 0 auto;">没有成功，可能是网络出问题啦</div>');
    	isload=false;
    },20000);
    var fanName='listnew:';
    var tagnamearr=document.getElementsByName("fsfanName");
    var fanjs=0;
    for(var i=0;i<tagnamearr.length;i++){
    	if(tagnamearr[i].checked){
	    	if(fanjs>0)fanName+=",";
	    	fanName+=tagnamearr[i].value;
	    	fanjs++;
    	}
    }
    var f=lid;
    if(1==lid){
		f=5;
	}else if(5==lid){
		f=1;
	}
	var queryUrl="http://"+domain+"/mpage/html5/message/action/messageaction.jsp";
	var postDate="flag=2&index="+f+"&messageName="+userName.value+"&messageText="+userText.value+"&fanName="+fanName+"&refid="+g_refid;
	ajax({type:"post", url:queryUrl,dataType:"json",data:postDate,success:function (data) {
		try{
	        var obj=data;
	        if(obj.result=='ok'){
	        	userText.value="";
	        	setToast3('<div style="color:#fff;background: rgba(0, 0, 0, 0.6);border-radius: 2px;padding: 2px;text-align: center;width:80px;margin: 0 auto;">留言成功</div>');
	        	hidebox();
	        	getmessage(lid);
	        }else{
	        	setToast3('<div style="color:#fff;background: rgba(0, 0, 0, 0.6);border-radius: 2px;padding: 2px;text-align: center;width:245px;margin: 0 auto;">没有成功，可能是网络出问题啦</div>');
	        }
	        //isload=false;
        }catch(e){
        	setToast3('<div style="color:#fff;background: rgba(0, 0, 0, 0.6);border-radius: 2px;padding: 2px;text-align: center;width:245px;margin: 0 auto;">没有成功，可能是网络出问题啦</div>');
    		//isload=false;
        }
        savestr('{"action":"data_keyvalue","key":"ylunamear","value":"'+userName.value+'"}');
	}});
}

function toAlbum(source,sourceid,title){
	var jsonstr='{"action":"goto_album_page","albumid":"'+sourceid+'","name":"'+title+'"}';
	goto_album_page(jsonstr);
}
function toPlaylist(source,sourceid,title){
	var jsonstr='{"action":"goto_playlist_page","pid":"'+sourceid+'","name":"'+title+'"}';
	goto_playlist_page(jsonstr);
}

var u = navigator.userAgent;
var isiPhone=u.indexOf('iPhone') > -1;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
var bIsWM = u.indexOf('Windows Phone') > -1;
if(!isiPhone && !isAndroid && !bIsWM){
	deviceback();
}else{
	getDeviceinfo('def');
}
loadlist_hot(hotnpn);
loadlist(npn);
