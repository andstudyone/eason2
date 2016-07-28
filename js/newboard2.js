
function $S(s){return document.getElementById(s);}
function $html(s,html){$S(s).innerHTML=html;}
function $append(s,html){$S(s).innerHTML=$S(s).innerHTML+html;}//$S(s).appendChild(toNode(html));
function $display(s,f){$S(s).style.display=f;}
config.stopBubble=function(e){if(window.event && window.event.cancelBubble){window.event.cancelBubble = true;}if (e && e.stopPropagation){e.stopPropagation();}}

//ajax
function json2url(json){
	json.t=Math.random();
	var arr=[];
	for(var i in json){
		arr.push(i+'='+encodeURIComponent(json[i]));
	}
	return arr.join('&');
}

function myajax(json){
	json=json||{};
	if(!json.url)return;
	json.data=json.data||{};
	json.type=json.type||'get';
	
	if(window.XMLHttpRequest){
		var oAjax=new XMLHttpRequest();
	}else{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	switch(json.type.toLowerCase()){
		case 'get':
			oAjax.open('GET',json.url+'?'+json2url(json.data),true);
			oAjax.send();
		break;
		case 'post':
			oAjax.open('POST',json.url,true);
			oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			oAjax.send(json.data);
		break;
	}
	
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){
			if(oAjax.status>=200&&oAjax.status<300||oAjax.status==304){
				json.success&&json.success(oAjax.responseText);
			}else{
				json.error&&json.error(oAjax.status);
			}
		}
	};	
}

function getDateTimeStamp(dateStr){
	return Date.parse(dateStr.replace(/-/gi,"/"));
}

function jsDateDiff(publishTime){       
    var d_minutes,d_hours,d_days;       
    var timeNow = parseInt(new Date().getTime()/1000);       
    var d;       
    d = timeNow - publishTime;       
    d_days = parseInt(d/86400);
    d_hours = parseInt(d/3600);     
    d_minutes = parseInt(d/60);
    if(d_days > 0 && d_days < 4){       
        return d_days+"天前";       
    }else if(d_days <= 0 && d_hours > 0){       
        return d_hours+"小时前";       
    }else if(d_hours <= 0 && d_minutes > 0){       
        return d_minutes+"分钟前";       
    }else{       
        var s = new Date(publishTime*1000);       
        // s.getFullYear()+"年";
        return (s.getMonth()+1)+"月"+s.getDate()+"日";       
    }       
}

function errorimg(obj,defimg){
	obj.src=defimg;
}

function getDate(flag){
    var dateTime=new Date();
    var yy=dateTime.getFullYear();
    var MM=dateTime.getMonth()+1;  //因为1月这个方法返回为0，所以加1
    if(MM<10)MM="0"+MM;
    var dd=dateTime.getDate();
    if(dd<10)dd="0"+dd;
    var week=dateTime.getDay();
    var hh=dateTime.getHours();
    if(flag==1){
  		return yy+""+MM+""+dd;
    }else if(flag==2){
	    return dateTime.getTime();
    }
    return yy+""+MM+""+dd+""+hh;
}

var defaultpic = 'http://image.kuwo.cn/website/h5/hitlist/defaultpic.png';
var defaultname = '葬爱三少';
document.addEventListener('DOMContentLoaded',function(){
	document.documentElement.style.fontSize=document.documentElement.clientWidth*0.0625+'px';
	window.onresize = function(){
		document.documentElement.style.fontSize=document.documentElement.clientWidth*0.0625+'px';
	}
	
},false);

//热门评论
var commListhot = $S('commlist_hot');
var hotnpn = 1;
var hotnrn = 10;
var hottotal;
var hottotalPg;
function loadlist_hot(hotnpn){
	var url = 'http://comment.kuwo.cn/com.s?type=get_rec_comment&uid='+uid+'&prod='+prod+'&digest='+digest+'&sid='+sid+'&page='+hotnpn+'&rows='+hotnrn+'&f=web';
	kuwo.jsonp(url,'callback=showlst_hot',function(json){log("成功")},function(){log("出错了")});
}

function countnum(num){
	return num >= 10 ? 10 : num;
}

function showlst_hot(jsonData){
	var data = jsonData;
	hottotal = parseInt(data.total);
	hottotalPg = data.totalPage;
	var rows = data.rows;
	var len = rows.length;
	if(len==0){
		$S('tit_hot').style.display = 'none';
		$query('.h11')[0].style.display = 'none';
		$query('.h11')[1].style.display = 'none';
	}
	for(var i=0;i<countnum(len);i++){
		commListhot.innerHTML += createReplyBox(rows[i]);
	}
	hotnpn++;
}

//最新评论
//var isLogin;//判断是否登录
//var userId = ;//获取用户uid

var nrn = 10;//每页10条
var uid = g_uid;
var prod = 'web';
var digest = 'z1';
var sid = hdid;
var title = fstitle;
var ntotal;
var ntotalPg;
function loadlist(npn){
	if(ntotal){
		if(npn == ntotalPg){		
			setTimeout(function(){
				$S('allcomment').innerHTML = '哥，没了';
			},500);
		}
	}
	
	var url = 'http://comment.kuwo.cn/com.s?type=get_comment&uid='+uid+'&prod='+prod+'&digest='+digest+'&sid='+sid+'&page='+npn+'&rows='+nrn+'&f=web';
	kuwo.jsonp(url,'callback=showlst',function(json){log("成功")},function(){log("出错了")});
}


function showlst(jsonData){
	var data = jsonData;
	if(data.rows.length == 0){
		$S('newboard').style.display = 'none';
		return;
	}
	ntotal = parseInt(data.total);
	ntotalPg = data.totalPage;
	var rows = data.rows;
	var len = rows.length;
	for(var i=0;i<len;i++){
		commList.innerHTML += createReplyBox(rows[i]);
	}
	if(len==1){
		$display('allcomment','none');
	}
	npn++;
}

var commList = $S('commlist');
//var commBox = commList.children;

//查看全部评论
/*$S('allcomment').onclick = function(){
	if(npn>ntotalPg)return;
	loadlist(npn);
}*/

//创建回复模块
function createReplyBox(info){
	var count = 0;
	var html = [];
	var _html = '';
	var reply = info.reply;
	var replyStr = '';
	var likeNum = info.like_num==0?'':info.like_num;
	if(reply!=undefined){
		replyStr = '<div class="commentBox clearfix">'+
	                    '<p class="commentCon"><span class="userComment"><span>@'+decodeURI(reply.u_name)+'</span>：</span>'+reply.msg+'</p><i></i>'+
	                '</div>';
	}else{
		replyStr='';
	}
    html[count++]='<li class="commbox clearfix" data-id="'+info.id+'" data-uid="'+info.u_id+'">';
	html[count++]='<div class="userphoto" data-uid="'+info.u_id+'" data-name="'+decodeURI(info.u_name)+'">';
	html[count++]='<a class="userpic">';
	html[count++]='<img onerror="errorimg(this,\''+defaultpic+'\');" src="'+(info.u_pic==''?defaultpic:info.u_pic)+'" />';
	html[count++]='</a>';
	html[count++]='</div>';
	html[count++]='<div class="comminfo" data-id="'+info.id+'">';
	html[count++]='<span class="username">'+(info.u_name==''?defaultname:decodeURI(info.u_name))+'</span>';
	html[count++]='<span class="commtime">'+jsDateDiff((getDateTimeStamp(info.time)/1000))+'</span>';
	html[count++]='<p class="commtxt">'+decodeURI(info.msg)+'</p>';
	html[count++]=replyStr;
	html[count++]='</div>';
	html[count++]='<div class="praise" data-flag="'+info.is_like+'" praise_num="'+likeNum+'"></div>';
	html[count++]='</li>';
	_html = html.join('');
	return _html;
}
