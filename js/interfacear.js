config={}
config.userinfo={}
config.listtitle='';
config.listpic='';
config.keyvalue='';
config.getkeyvalue='';
function $S(s){return document.getElementById(s);}
function $html(s,html){$S(s).innerHTML=html;}
function $append(s,html){$S(s).innerHTML=$S(s).innerHTML+html;}//$S(s).appendChild(toNode(html));
function $display(s,f){$S(s).style.display=f;}
config.stopBubble=function(e){if(window.event && window.event.cancelBubble){window.event.cancelBubble = true;}if (e && e.stopPropagation){e.stopPropagation();}}
function sendtj(url){var tjimg = new Image();tjimg.src=url;}
function callNative(json){
	var u = navigator.userAgent;
	var isandroid=u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
	if(!isandroid){
		try{window.external.notify(json);}catch(e){}	
	}else{
		try{window.KuwoInterface.jsCallNative(json);}catch(e){}
	}
}
function playSong(index,e,f,hasquality,libpath){
	var fstr="control_playselect";
	if(f=='down'){
		fstr="control_downloadselect";
	}else if(f=='add'){
		fstr="control_addselect";
	}else if(f=='ring'){
		fstr="control_set_online_ring";
	}else if(f=='favor'){
		fstr="sys_favor_song";
	}
	var obj=playlist.musiclist[index];
	libpath=encodeURIComponent(libpath);
	var jsonstr='{"action":"'+fstr+'","libpath":"'+libpath+'","musiclist":[{"musicrid":"'+obj.musicrid+'","name":"'+obj.name+'","artist":"'+obj.artist+'","album":"'+obj.album+'","formats":"'+obj.formats+'","pay":"'+obj.pay+'","audio_id":"'+obj.audio_id+'"}],"hasquality":"'+hasquality+'"}';
	callNative(jsonstr);
	config.stopBubble(e);
}
function allplaySong(f,hasquality,libpath){
	var fstr="control_playselect";
	if(f=='down'){
		fstr="control_downloadselect";
	}else if(f=='add'){
		fstr="control_addselect";
	}else if(f=='sc'){
		fstr="control_collectsonglist";
	}
	libpath=encodeURIComponent(libpath);
	var jsonstr='{"action":"'+fstr+'","libpath":"'+libpath+'","listpic":"'+config.listpic+'","listtitle":"'+config.listtitle+'","musiclist":[';
	var sum=0;
	for(var i=0; i<playlist.musiclist.length;i++ ){
		var obj = playlist.musiclist[i];
		if(sum>0) jsonstr+=',';
		jsonstr+='{"musicrid":"'+obj.musicrid+'","name":"'+obj.name+'","artist":"'+obj.artist+'","album":"'+obj.album+'","formats":"'+obj.formats+'","pay":"'+obj.pay+'","audio_id":"'+obj.audio_id+'"}';
		sum++;
	}
	jsonstr+=']}';
	callNative(jsonstr);
}
function fsdq(index,e){
	var obj=playlist.musiclist[index];
	var fstr="control_shareselect";
	var jsonstr ='{"action":"'+fstr+'","musiclist":[{"musicrid":"'+obj.musicrid+'","name":"'+obj.name+'","artist":"'+obj.artist+'","album":"'+obj.album+'","formats":"'+obj.formats+'","pay":"'+obj.pay+'"}]}';
	callNative(jsonstr);
	config.stopBubble(e);
}
function getrandomurl(url){
	var jssum=getupdatesum(3600000);
	if(url.indexOf("?")>-1){url=url+"&r="+jssum;}else{url=url+"?r="+jssum;}
	return url;
}
function getupdatesum(fm){
	var jssum=Math.floor(new Date().getTime()/fm);
	return jssum;
}
function controlOutappUrl(url,title,type){
	url=getrandomurl(url);
	var jsonstr='{"action":"control_outapp_url","url":"'+url+'","title":"'+title+'","pagetype":"'+type+'"}';
	callNative(jsonstr);
}
function controlInappUrl(url,title,type){
	url=getrandomurl(url);
	var jsonstr='{"action":"control_inapp_url","url":"'+url+'","title":"'+title+'","pagetype":"'+type+'"}';
	callNative(jsonstr);
}
function setTitle(title){
	var jsonstr='{"title":"'+title+'"}';
	window.KuwoInterface.set_title(title);
}
function getDeviceinfo(type){
	var jsonstr='{"action":"control_get_deviceinfo","pagetype":"'+type+'"}';
	callNative(jsonstr);
}
function feedback_ardeviceinfo(data){
	config.userinfo= eval('('+data+')');
	hideload();
	deviceback();
}
function hideload(){
	try{window.KuwoInterface.web_command("hideloading");}catch(e){}
}
function getfavorsongs(){
	var jsonstr='{"action":"control_get_favorsongs"}';
	callNative(jsonstr);
}
config.favorbackmethod="favorback";
function feedback_favorsongs(data){
	eval(config.favorbackmethod+'('+data+')')
}
function sendsyslog(index,flag,e){
	var obj=playlist.musiclist[index];
	var jsonstr='{"action":"control_sendlog","act":"'+flag+'","music":{"musicrid":"'+obj.musicrid+'","name":"'+obj.name+'","artist":"'+obj.artist+'","album":"'+obj.album+'","formats":"'+obj.formats+'"}}';
	callNative(jsonstr);	
	config.stopBubble(e);
}

function gtver(ver,cgwver){
	ver=ver.replace("kwplayer_ar_","");
	var arr=ver.split(".");
	var versum=arr.join("");
	if(parseInt(versum)>=cgwver){
		return true;
	}
	return false;
}
function savestr(jsonstr){
	callNative(jsonstr);
}
function feedback_keyvalue(data){
	eval(config.keyvalue+"("+data+");");
}
function getstr(jsonstr){
	callNative(jsonstr);
}
function feedback_getkeyvalue(data){
	eval(config.getkeyvalue+"("+data+");");
}
function arPlayMV(index,e,libpath){
    var obj=mvlist.musiclist[index];
	var jsonstr='{"action":"control_playmv","libpath":"'+libpath+'","musiclist":[{"mvid":"'+obj.mvid+'","mvname":"'+obj.name+'","mvquality":"'+obj.mvquality+'","artist":"'+obj.artist+'"}]}';
	callNative(jsonstr);
}
function arFs(jsonstr,e){
	callNative(jsonstr)
	config.stopBubble(e);
}
//{"action":"control_login"}
function goHome(){
	var jsonstr='{"action":"control_gohome"}';
	callNative(jsonstr);
}
