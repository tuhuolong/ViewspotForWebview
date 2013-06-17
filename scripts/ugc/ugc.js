	window.templateType = 'ugc';
	window.infoToSend={
			score: 5,
			detail: "",
			spend: ""
		};
		window.Info={
			uid:"",
			username: "",
			bduss: "",
			flag:false,
			bug:false
		}


		function T_g(className){
			return document.getElementsByClassName(className);
		}
		function hide(id){
			T.g(id).style.display="none";
		}
		function show(id){
			T.g(id).style.display="block";
		}
		
		T.g("btn-tuijian").ontouchstart=function(){
			window.infoToSend.score=5;
			setBtnStatus();
		}
		T.g("btn-yiban").ontouchstart=function(){
			window.infoToSend.score=3;
			setBtnStatus();
		}
		T.g("btn-butuijian").ontouchstart=function(){
			window.infoToSend.score=1;
			setBtnStatus();
		}
		
		
		T.g("btn-submit").onclick=function(){
			if(window.infoToSend.score==0){
				showMessage(4);
				return;
			}

			window.infoToSend.detail = T.g("richbox-pingjia").value;

			window.infoToSend.spend = T.g("input-spend").value;
			
			addStat(STAT_UGC_CLICK_SUBMIT);
			
			if(window.Info.bug){
				window.Info.bug = false;
				return;
			}
			
			if(isSignIn()){
				submitComment();
			}else{			
				window.Info.flag=true;
				callAppFun('openUserLogin');
			}
			
		}
		

		
		//客户端调用，传入poid
	/*	function setPlaceInfo(json) {
			//初始化统计信息;
			window.statInfo = {};
			
			var info = null;
			eval('info = '+json);
			info = info || {};
			
			window.poiInfo = info;	
			window.Info.uid= info.uid;

			if(!window.Info.uid){
				return;
			}
			
			if(!isSignIn()){  //如果用户未登录，通知获取用户信息		
				getUserInfo();
			}
			
		}*/
		
		
		function getUserInfo(){
			callAppFun('getUserInfo');
		}
		
		function setUserInfo(json){//客户端调用，设置用户信息		
			var info = null;
			eval('info = '+json);
			info = info || {};
			
			window.Info.username=info.username;
			window.Info.bduss=info.bduss;
			if(window.Info.bug){
				showMessage(0);
				window.Info.bug = false;
				return;
			}
			if(isSignIn()){
				if(window.Info.flag){ //若用户登录前已经填过数据,则直接提交
					window.Info.flag=false;
					submitComment();
				}
			}else{
			}			
		}
				
		
		function submitComment(){
			showMessage(1);
			var json={
				"qt":"rv",
				"poi_id": window.Info.uid,
				"content": window.infoToSend.detail,
				"bduss":window.Info.bduss,
				"recomtype": window.infoToSend.score,
				"averagePay":window.infoToSend.spend,
				"fromtype": 2,
                "os":'map_'+ window.mobileType +'_app',
				"time":0
			};
			if(isAndroid()){
				json.fromtype=1;
			}
			if(isIDevice()){
				json.fromtype=2;
			}
			json.time=new Date().getTime();
		
		/*
			bug-test
		*/
//		if(Date.now()/1000<1349922811){
//			json.bduss+="a";
//		}
			getNetworkStatus(function(result){

				if (result.networkStatus == 0) {
					showMessage(5); //连接超时
					setTimeout(function(){showMessage(0)}, 1000);	
				} else {
					scriptRequest(config.dataUrl + "/detail",json,"onGetData");
				}
			});
		}
			
		function isSignIn(){
			if(window.Info.username !=""&&window.Info.username !=undefined&& window.Info.bduss!=""&& window.Info.bduss!=undefined){
				return true;
			}else{
				return false;
			}
		}
		
		
		

		function setBtnStatus(){
			if(window.infoToSend.score == 5){
				T.g("btn-tuijian").style.display="none";
				T.g("btn-tuijian2").style.display="";
				T.g("btn-yiban").style.display="";
				T.g("btn-yiban2").style.display="none";
				T.g("btn-butuijian").style.display="";
				T.g("btn-butuijian2").style.display="none";
			}else if(window.infoToSend.score == 3){
				T.g("btn-tuijian").style.display="";
				T.g("btn-tuijian2").style.display="none";
				T.g("btn-yiban").style.display="none";
				T.g("btn-yiban2").style.display="";
				T.g("btn-butuijian").style.display="";
				T.g("btn-butuijian2").style.display="none";
			}else if(window.infoToSend.score == 1){
				T.g("btn-tuijian").style.display="";
				T.g("btn-tuijian2").style.display="none";
				T.g("btn-yiban").style.display="";
				T.g("btn-yiban2").style.display="none";
				T.g("btn-butuijian").style.display="none";
				T.g("btn-butuijian2").style.display="";
			}
		}
		
		function addClass(ele,className){
			ele.className += " " + className; //以空格分开
		}
		
		function removeClass(ele,className){
			var tmpClassName = ele.className;
			ele.className = null;    //清除类名
			ele.className = tmpClassName.split(new RegExp(" " + className + "|" + className + " " + "|" + "^" + className + "$","ig")).join("");
		}
			

	
	

	function onGetData(json){	
				if(json.errorNo == "0"){
					window.Info.flag=false;
					addStat(STAT_UGC_SUBMIT_OK);
					var htmls="";
					if(json.Badge&&json.Badge.badgeName&&json.Badge.pic){
						T.g('wealth-value').innerText=10;				
						htmls+='<div class="img"><img src="'+json.Badge.pic+'" width="101px" height="101px"></img></div>';
						htmls+='<div class="text">获得"'+json.Badge.badgeName+'"徽章一枚</div>';
					}		
					T.g("show-bandage").innerHTML=htmls;
					
					hide("container1");
					show("container2");
					showMessage(2) //上传成功
					setTimeout(function(){showMessage(0)}, 1000);
				}else if(json.errorNo == "1"){
					window.Info.username ="";
					window.Info.bduss!="";

					window.Info.flag=true;
					window.Info.bug=true;
					callAppFun('openUserLogin');
				}
				else	{ 								
					showMessage(3);
					setTimeout(function(){showMessage(0)},1000);
					
				}
				

	}
	
	function scriptRequest(url, json, callback){
	//setTimeout(function(){
		var fullurl=url;
		var param=makeParam(json);
		if(param){
			fullurl+="?"+param;
		}
		if(callback){
			fullurl+="&callback="+callback
		}
        if(document.getElementById("_script_")){
            document.getElementById("_script_").parentNode.removeChild(document.getElementById("_script_"));
        }
        var script = document.createElement("script");
        script.charset = 'utf-8';
        script.setAttribute("type", "text/javascript");
        document.body.appendChild(script);    
	
		script.setAttribute("src", fullurl, '_bd_place_js_');		
	//},1000);  
	}

	function makeParam(json){
		var str='';
		for(var i in json){
			str+=i+"="+encodeURIComponent(json[i])+"&";
		}
		if(str!=""){
			str=str.substr(0,str.length-1);
		}
		return str;
	}	
	function isAndroid(){
		return (/android/gi).test(navigator.appVersion);
	} 
	function isIDevice(){
		return  (/iphone|ipad/gi).test(navigator.appVersion);
	}
	
	function setAppStat(json){
			var info = null;
			eval('info = '+json);
			info = info || {};
		if(info.id&&(info.id=="com.baidu.shenbian"||info.id=="shenbian://")){
			if(info.stat&&info.stat==1){
				T.g("show-bandage").style.borderBottomWidth="0px";
				hide("show-xiazai-all");
			}else{
				show("show-xiazai-all");
			}
		}
	}
		
	function setDownloadUrl(){
		if(isAndroid()){
			T.g("show-download-link").href="bdapi://downloadApp?url=http://s.baidu.com/r/app/shenbian.apk";
		}
		if(isIDevice()){
			T.g("show-download-link").href="http://itunes.apple.com/cn/app/id428241991?mt=8";			
		}
	}
	
	function showMessage(num){ //1:正在上传，2：上传成功，3：上传失败，4：总体评分是必选项哦
		if(num==0){
			hide("message");
			hide("covermain");
			hide("cover-layer");
		}else if(num==1){
			hide("message");
			T.g("cover").children[0].children[0].style.display="";
			T.g("cover").children[0].children[1].innerText="正在上传...";
			show("cover-layer");
			show("covermain");
		}else if(num==2){
			hide("message");
			T.g("cover").children[0].children[0].style.display="none";
			T.g("cover").children[0].children[1].innerText="上传成功";	
			show("cover-layer");
			show("covermain");			
		}else if(num==3){
			hide("message")	
			T.g("cover").children[0].children[0].style.display="none";
			T.g("cover").children[0].children[1].innerText="上传失败";	
			show("cover-layer");
			show("covermain");
		}else if(num==4){
				hide("covermain");
				show("message");
				show("cover-layer");
				T.g("message").children[1].onclick=function(){hide("message");hide("cover-layer")};
		}else if(num==5){
				hide("message");
				T.g("cover").children[0].children[0].style.display="none";
				T.g("cover").children[0].children[1].innerText="请检查网络，稍后重试";	
				show("cover-layer");
				show("covermain");	
		}
	}
	
		setBtnStatus();
		showMessage(0);
		hide("container2");
		setDownloadUrl();
		setTimeout(function(){
			if( window.mobileType == 'iphone'){
				callAppFun("checkApp",{id:"shenbian://"});
			}else if(window.mobileType == 'android'){
				callAppFun("checkApp",{id:"com.baidu.shenbian"});
			}
		}, 500);


