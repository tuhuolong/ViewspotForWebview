
//客户端调取JS方法设置place信息;
var setTemp = {};
function setPlaceInfo(json) {
    setTemp = {};

    //hunter统计统计;
    window.Hunter && Hunter.stop();


    //客户端调起 setPlaceInfo方法的时间;
//    window.setPlaceInfoTime = new Date().getTime();
    //初始化统计信息;
    window.statInfo = {};
    //客户端调用setPlaceInfo的开始时间;
    window.statInfo.t1 = Date.now();
    
    var info = null;
    eval('info = '+json);
    //test
//    info.uid = 'd31f5dcd11f4950232f71d2c';
    info = info || {};
    //加油站数据测试
    //info.uid = '815d40be38945e950782c261';

    //iphone版本号测试
//    info.xda_ver = '2.3.0';
	//测试电话效果
//    info.tel = '13213,345566';


    //如果客户端传过来的 包含 'null'，则过滤掉;
    if(info.overall_rating && info.overall_rating.toLowerCase().indexOf('null') > -1){
        delete info.overall_rating
    }
    if(info.price && info.price.toLowerCase().indexOf('null') > -1){
        delete info.price;
    }
    if(info.comment_num && info.comment_num.toLowerCase().indexOf('null') > -1){
        delete info.comment_num;
    }
    window.poiInfo = info;
    var poiUid = info.uid,
        favStat = info.is_fav || 0;
    //如果没有传uid则返回;
    if(!poiUid){
        return;
    }
	
	//如果是ugc调用
	if(window.templateType == 'ugc'){
			window.Info.uid= info.uid;

			if(!window.Info.uid){
				return;
			}
			setTimeout(function(){addStat(window["STAT_UGC_SHOW"]);}, 100);
			if(!isSignIn()){  //如果用户未登录，通知获取用户信息		
				getUserInfo();
			}

            setTimeout(function(){
                callAppFun('relayout');
            },100);
            
			return;
	}

        //每次进来先隐藏dom元素;
		window.resetPageContent && window.resetPageContent();

       
		
	//    var str = '';
	//
	//    for(var i in info){
	//        str += i + ':' + info[i] +'\n';
	//    }

        if(window.templateType == 'index'){
            //设置收藏状态;
            setFavStatus('{"status":'+ favStat +'}');
        }
        
		//取本地缓存
		window.localData = window.PlaceDataMgr.getPlaceData(poiUid);

		//页面开始取本地数据的时间;
		window.statInfo.t2 = Date.now();
		//如果本地缓存存在，则加载本地缓存;
		if(window.templateType != 'impression' && localData){
			//记录使用本地缓存
			window.statInfo.localData = 1;
			fillTemplate(window.localData, poiUid, {type: 'saveData'});
			return;
		}

        
        //因webview初始化后处于一直打开状态不会销毁，页面中的js也不会重新执行，需要在setPlaceInfo方法中进行空模板加载；
		window.fillEmptyTemplate && window.fillEmptyTemplate();

		//页面开始请求数据的时间;
		window.statInfo.t3 = Date.now();

		//如果本地缓存不存在则从服务端请求数据;
		getPlaceInfo('fillTemplate');
}
