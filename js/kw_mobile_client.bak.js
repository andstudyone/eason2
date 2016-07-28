var u = navigator.userAgent;
var isiPhone=u.indexOf('iPhone') > -1;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
var bIsWM = u.indexOf('Windows Phone') > -1;
var g_uid = '';
var uid = ''
config={};
config.host="kwip://kwplayerhd/";
function callNative2(jsonstr){
	if(isiPhone){
		window.open(config.host+"kw_mobile_client?param="+encodeURIComponent(jsonstr));
	}else if(isAndroid){
		try{window.KuwoInterface.jsCallNative(jsonstr);}catch(e){}
	}
	
}

//3.进入留言
function goto_client_comment(jsonstr){
	//jsonstr='{"action":"goto_client_comment","source":"z1","sourceid":"2901","title":"专栏标题"}';
	//alert(jsonstr);
	callNative2(jsonstr);
}
//4.回复留言
function reply_comment(jsonstr){
	//jsonstr='{"action":"reply_comment","source":"z1","sourceid":"2901","title":"专栏标题","cid":"3385008","uname":"测试用户"}';
	callNative2(jsonstr);
}

//6.进入用户主页接口
function goto_user_main_page(jsonstr){
	//jsonstr='{"action":"goto_user_main_page","uid":"205780289","uname":"用户名"}';
	callNative2(jsonstr);
}

//9.未登录弹出登录， 登录成功之后传用户信息给页面
function goto_login_page(jsonstr){
	jsonstr='{"action":"goto_login_page","callback":"back_goto_login_page"}';
	callNative2(jsonstr);
}
function back_goto_login_page(data){
	//{"result":"success","uid":"205780289","uname":"你好","pic":""}
	//document.getElementById('resultid').innerHTML=data;
	//alert(data);
	var jsonobj = eval('('+data+')');
	if(jsonobj.result == 'success'){
		g_uid = jsonobj.uid;
	}
}

//10.进入客户端歌手页
function goto_artist_page(jsonstr){
	callNative2(jsonstr);
}
//进入客户端歌单页
function goto_playlist_page(jsonstr){
	callNative2(jsonstr);
}
//进入客户端专辑页
function goto_album_page(jsonstr){
	callNative2(jsonstr);
}
//打榜开始


//支持专区和电台start
//1.进入客户端 电台页
function goto_radio_page(jsonstr){
	//alert(jsonstr);
	callNative2(jsonstr);
}
//2.进入客户端 专区页
function goto_area_page(jsonstr){
	//alert(jsonstr);
	callNative2(jsonstr);
}
//3.在得到设备信息的地方支持评论接口客户端里面写入标识  isarearadio=1  支持 android 和 ios一样
//支持专区和电台end



//打开地址
function controlInappUrl(url,title,type){
	var jsonstr='{"action":"control_inapp_url","url":"'+url+'","title":"'+title+'","pagetype":"'+type+'"}';
	if(isiPhone){
		window.open(config.host+"control_inapp_url?param="+encodeURIComponent(jsonstr));
	}else if(isAndroid){
		callNative2(jsonstr);
	}
}

//主分享
function mainfs(jsonstr){
	jsonstr='{"action":"control_share_webpage","weibo":"华综|宝宝总动员        本周六晚快乐大本营，宝宝们的爱为你治愈一下","qqspace":"本周六晚快乐大本营，宝宝们的爱为你治愈一下","wxmsg":"华综|宝宝总动员","wxdes":"本周六晚快乐大本营，宝宝们的爱为你治愈一下","url":"http://mobile.kuwo.cn/mpage/special/showSpecalShare.jsp?id=1203","imgurl":"http://img3.kwcdn.kuwo.cn/star/upload/8/8/1448012503496_.jpg","imageurl":"http://img3.kwcdn.kuwo.cn/star/upload/8/8/1448012503496_.jpg","needconfirm":"0"}';
	if(isiPhone){
		window.open(config.host+"control_share_webpage?param="+encodeURIComponent(jsonstr));
	}else if(isAndroid){
		callNative2(jsonstr);
	}
}

//function deviceback(userinfo){
//	
//}
//得到设备信息方法
//function getDeviceinfo(){
//	var jsonstr='{"action":"control_get_deviceinfo","pagetype":"def"}';
//	if(isiPhone){
//		window.open(config.host+"control_get_deviceinfo?param="+encodeURIComponent(jsonstr));
//	}else if(isAndroid){
//		callNative2(jsonstr);
//	}
//}
//function feedback_ardeviceinfo(data){
//	config.userinfo= eval('('+data+')');
//	deviceback(config.userinfo);
//}
//function feedback_deviceinfo(data){
//	config.userinfo= eval('('+data+')');
//	deviceback(config.userinfo);
//}
//document.getElementById('resultid').innerHTML=u;