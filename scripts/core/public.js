//console 容错处理;
if(!window.console){
    window.console = window.console || {};
    window.console.log = window.console.log || function(){};  
}

window.onerror = function(msg){
    var template = window.templateType || '';
    addStat(STAT_ERROR_2,{error:msg, template:template});
    return true;
}

function sortFun(a, b){
    return a-b;
}


/**
 * 获得设备网络状况
 * @param {Function} 回调函数
 */
function getNetworkStatus(callback){
//    if (1){
//        callback && callback({networkStatus: 1});
//        return;
//    }
    callNative('getnetworkstatus', {}, callback);
}

/**
 * 将json转化为查询字符串
 * @param {Object} 参数的json对象
 * @return {string} 结果字符串
 */
function jsonToQuery(json){
    if (!json) {return ''}
    var paramsArr = [];
    for (var key in json) {
        paramsArr.push(key + '=' + encodeURIComponent(json[key]));
    }
    return paramsArr.join('&');
}

/**
 * 调用客户端方法
 * @param {string} 方法名
 * @param {Object} 可选，参数的json对象
 * @param {Function} 可选，回调函数
 */
function callNative(method, params, callback) {
    params = params || {};
    if (callback) {
        // 准备callback名字
        var callbackName = '_nativeCbk' + (Math.random() * 100000).toFixed(0);
        // 补充callback:string参数，native会调用这个回调
        params.callback = callbackName;
        // 生成一个全局的回调函数，将参数callback封装
        window[callbackName] = function(data){
            callback && callback(data);
            delete window[callbackName];
        };
    }
    var paramStr = (jsonToQuery(params) == '') ? '' : '?' + jsonToQuery(params);
    window.location.href = 'bdapi://' + method + paramStr;
}

(function() {
    var bm_ua = window.navigator.userAgent.toLowerCase();
    //测试iphone效果时使用;
//    bm_ua = 'iphone';

    //测试ipad效果时使用;
//    bm_ua = 'ipad';
    //android 跟 iphone 适配；
    window.mobileType = 'android';
    document.body.className = 'android';
    if(/iphone/.test(bm_ua)){
        document.body.className = 'iphone';
        window.mobileType = 'iphone';
    }else if(/ipad/.test(bm_ua)){
        setPadTemplate();
        document.body.className = 'iphone ipad';
        window.mobileType = 'ipad';
    }
})();

function callAppFun(type,opts) {    
    return;//压缩的时候会将 "function callAppFun(type,opts){return;" 替换为 "function callAppFun(type,opts){" ，修改需要同步修改压缩代码; by wxp

    var opts = opts || {},
        hei = document.body.clientHeight,
        tel_str = opts.tel || window.poiInfo && window.poiInfo.tel || '';

        

    //拨打电话做的特出处理
    if(type =='tel'){
        delete opts.tel;
        if(opts.e){
            //电话默认拨打第一个;
            tel_str = tel_str.split(',')[0];

            if(opts.e){
                var e = opts.e,
                target = e.target,
                telNum = target.getAttribute('telNum');

                if(telNum){
                  tel_str = telNum;
                }
                //删除电话传进来的参数;
                delete opts.e;
            }
        }

        
        
    }

    //设置收藏功能是否处于交互状态，如处于交互状态，则不进行本次交互
    if(type == 'switchFavStatus'){
        if(resetTemp.setFavStatus && resetTemp.setFavStatus.isFavIng){
            return;
        }
        resetTemp.setFavStatus.isFavIng = 1;
    }

    //当opts有 height时，将webview的高度设定为指定的值
    if(type == 'relayout' && opts.height){
        //将高度设置为参数指定的值
        hei = opts.height
        //删除height属性
        delete opts.height;
    }
//    var str = '';
//
//    for(var i in window.poiInfo){
//        str += i + ':' + window.poiInfo[i] +'\n';
//    }

    var command = {
            'relayout' : {//重新设置webview的高度
                'comm' : 'relayout',
                'param' : 'height='+ hei
            },
            'refresh' : {//通知客户端更新缓存并重新刷新页面
                'comm' : 'refresh'
            },
            'viewmap' : {//查看地图
                'comm' : 'viewmap'
            },
            'goto' : {//到这里来
                'comm' : 'goto'
            },
            'gofrom' :{//从这里出发
                'comm' : 'gofrom'
            },
            'nearbysearch' : {//周边搜索
                'comm' : 'nearbysearch'
            },
            'share' : {//poi分享
                'comm' : 'share'
            },
            'newwindow' : {//打开新窗口
                'comm' : 'newwindow'
            },
            'tel' : {//拨打电话
                'agreement' : 'tel:' + tel_str,
                'comm' : ''
            },
            'poidetail' : {//打开优惠页面
            	'comm' : 'poidetail'
            },
			'getUserInfo':{//通知客户端传递用户信息
				'comm': 'getUserInfo'
			},
			'openUserLogin':{//通知客户端调用用户登录窗口
				'comm':'openUserLogin'
			},
			'checkApp':{
				'comm':'checkApp'
			},
			'openUrl':{
				'comm':'openUrl'
			},
			'poi_correction':{
				'comm':'poi_correction'
			},
			'openModule':{
				'comm':'openModule'
			},
            'switchFavStatus' : {
                'comm':'switchFavStatus'
            }
			
        };
        

    if(!command[type]){
        return;//如果没有对应的命令则返回;
    }

    var _command = command[type],
        agreement = _command.agreement || 'bdapi://',
        param = _command.param || '',
        href = agreement + _command.comm,
        _val = '',
        _url_host = 'http://client.map.baidu.com/place/v5/',
        poiInfo = window.poiInfo || {},
        xda_ver = poiInfo.xda_ver || '',
        xda_ver = xda_ver + '',
        xda_ver = xda_ver.slice(0,3),
        xda_ver = xda_ver*1,
        mobile = window.mobileType || '',
        app_ver = {
            'android' : 4.6,
            'iphone' : 4.6
        };

    if(xda_ver && app_ver[mobile] && xda_ver > app_ver[mobile]){
        _url_host = '';
    }

    for(var i in opts){
        _val = opts[i];
        if(type == 'newwindow' && i == 'page'){
            _val = _url_host + 'pages/' + _val;
        }
		//add by likun, check shenbian
		if(type == 'checkApp' && i == 'id'){
        _val = '' + _val;
        }
		
        param += i + '=' +encodeURIComponent(_val) + '&';
//        param += i + '=' +_val + '&';
    }
    param = param.replace(/&$/,'');

    //添加参数;
    if(param.length>0){
        href += '?' + param;
    }
//    alert(href);
//    return;
    //由于在协议发送前一般都会有一些统计的，所以延时发送统计；
//    setTimeout(function(){
        window.location.href = href;
//    },100);
    
}


/**
 * script标签请求
 * @param {String} url      请求脚本url
 * @param {Function} echo   回调函数
 * @param {String} id       script标签id
 */
function scriptRequest(url, id, opts){

    var isIe = /msie/i.test(window.navigator.userAgent),
        opts = opts || {},
        cbFun = opts.cbFun || '',
        cbStr = opts.cbStr || 'callback',
        sendUid = opts.sendUid || '';

    if(sendUid){
        var _fun_name;
        (function(){
            var uid = window.poiInfo.uid,
                _fun_num = 0,
                getFunName = function(){
                    if(window['__callback__' + cbFun + '_' + uid + '_' + _fun_num]){
                        _fun_num ++;
                    }
                    return '__callback__' + cbFun + '_' + uid + '_' + _fun_num;
                };
            
            _fun_name = getFunName();
            window[_fun_name] = function(json){
                
                window[cbFun] && window[cbFun](json, uid);

                //运行完毕后删除生成的函数;
                delete window[_fun_name];
                
            }
        })();
        url += '&'+ cbStr + '=' + _fun_name;
        url += '&t=' + Date.now();
    }

    if(isIe && document.getElementById("_script_" + id)){
        var script = document.getElementById("_script_" + id);
    }else{
        if(document.getElementById("_script_" + id)){
            document.getElementById("_script_" + id).parentNode.removeChild(document.getElementById("_script_" + id));
        }
        var script = document.createElement("script");
        script.charset = 'utf-8';
        script.setAttribute("type", "text/javascript");
        script.id = "_script_" + id;
        document.body.appendChild(script);
    }
    script.setAttribute("src", url, '_bd_place_js_');
}

/**
 * 获取当前的日期，不包括时分秒
 */
function getCurDate() {
    var d = new Date(),
    year = d.getFullYear(),
    month = d.getMonth() + 1,
    month = month<10 ? 0 +''+month :month,
    date = d.getDate(),
    date = date<10 ? 0+''+date : date,
    fullTime = year + '' + month + '' + date;

    return fullTime;
}
/**
 *设置pad的模板改动
 */
function setPadTemplate() {
    setPadViewPort();
}

/**
 *修改viewport的width
 */
function setPadViewPort() {
    var viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute('content', 'width=0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no');
}


var STAT_ERROR_1 = 9100;//错误监控
var STAT_ERROR_2 = 9120;//错误监控
var STAT_INDEX_SHOW = 934;            //带Place信息详情页的展现量
var STAT_INDEX_CLICK_PIC = 935;       //详情中查看图片的点击量
var STAT_INDEX_CLICK_SALE = 911;      //详情页优惠信息点击量
var STAT_INDEX_SALE_SMS_OK = 937;         //优惠短信发送成功量
var STAT_INDEX_SALE_SMS_FAIL = 938;         //优惠短信发送失败量
var STAT_INDEX_CALL_TEL = 939;        //带Place信息详情页调起拨打电话的量
var STAT_INDEX_CLICK_RICH= 940;       //“更多信息”点击量
var STAT_INDEX_CLICK_COMM = 941;      //评论信息点击量
var STAT_INDEX_CLICK_MORE = 942;      //合作方链接点击量
var STAT_INDEX_SALE_BUTTON_CLICK = 943; //推送优惠发送按钮点击量
var STAT_INDEX_CHECK_AND_UP = 944;       //place数据二次验证后需要更新的量
//for groupon
var STAT_INDEX_GROUPON_BUTTON_CLICK = 946; //详情页团购信息入口的点击量
var STAT_INDEX_GROUPON_PAGE_SHOW = 947; //团购二级页面的展现量
var STAT_INDEX_GROUPON_LOOK_CLICK = 948; //团购二级页面去看看按钮的点击量
var STAT_INDEX_GROUPON_TITLE_CLICK = 949; //团购二级页面团购标题的点击量
var STAT_INDEX_GROUPON_IMG_CLICK = 950;  //团购二级页面图片的点击量

var STAT_REBATE_PAGE_INIT = 1000;  // 折扣页面展现量
var STAT_FLOOR_PAGE_INIT = 1001;  // 楼层页面展现量
var STAT_INDEX_CLICK_REBATE = 1002;    //详情页折扣入口信息点击量
var STAT_INDEX_CLICK_FLOOR = 1003;     //详情页楼层入口信息点击量

//add by likun
var STAT_INDEX_CLICK_WRITE=952;        //详情页写评论入口的点击量
var STAT_COMMENT_SHOW=953;  //评论二级页面打开成功量

var STAT_COMMENT_CLICK_WRITE=955;  //评论二级页面写评论点击量
var STAT_UGC_SUBMIT_OK=956;  //评论提交成功量
var STAT_UGC_SHOW=957;  //提交评论页展现量
var STAT_UGC_CLICK_SUBMIT=958;  //写评论页面提交按钮点击量
var STAT_INDEX_CLICK_DOWNLOAD=959;  //下载百度身边点击量

var STAT_INDEX_SALE_SHOW = 960;  //进入优惠二级页面的展现量


//add by wxp
var STAT_INDEX_CLICK_GOTO = 963;  //到这里去
var STAT_INDEX_CLICK_SEARCH = 964;  //在附近找
var STAT_INDEX_CLICK_PHOTO = 965;  //点击拍照片
var STAT_INDEX_CLICK_ADDRESS = 966;  //点击地址
var STAT_INDEX_CLICK_PIC_LIST = 967;  //图片点击
var STAT_INDEX_CLICK_PIC_ALL = 968;  //查看全部图片点击
var STAT_INDEX_CLICK_COMM_GOTO = 969;  //评论二级页合作方查看链接点击
var STAT_INDEX_CLICK_COMM_ALL = 970;  //评论二级页单条评论查看全文点击
var STAT_INDEX_CLICK_FRIEND = 971;  //点击发送给好友
var STAT_INDEX_CLICK_ERROR = 972;  //点击报告错误
var STAT_INDEX_CLICK_MOVIE_0_0 = 973;  //今天当天电影海报切换操作次数
var STAT_INDEX_CLICK_MOVIE_0_1 = 974;  //今电影海报切换操作次数
var STAT_INDEX_CLICK_MOVIE_1_0 = 975;  //明天当天电影海报切换操作次数
var STAT_INDEX_CLICK_MOVIE_1_1 = 976;  //明天电影海报切换操作次数


//add by jgd
var STAT_INDEX_CLICK_SHOW_KEY = 977; //大家印象展现关键字操作次数 
var STAT_INDEX_CLICK_MORE_COMMENT = 978; //大家印象获取更多评论操作次数 

//add by jgd
var STAT_INDEX_CLICK_KTV_DAY   = 979;  //KTV日期切换操作次数
var STAT_INDEX_CLICK_KTV_BOX   = 980;  //KTV包厢切换操作次数

//add by fuen
var STAT_INDEX_VICINITY_fineFood  = 981;  //附近找 美食
var STAT_INDEX_VICINITY_snack  = 982;  //附近找 小吃快餐
var STAT_INDEX_VICINITY_innHotel  = 983;  //附近找 快捷酒店
var STAT_INDEX_VICINITY_busStation  = 984;  //附近找 公交站
var STAT_INDEX_VICINITY_bank  = 985;  //附近找 银行
var STAT_INDEX_VICINITY_shop  = 986;  //附近找 商场
var STAT_INDEX_VICINITY_starHotel  = 987;  //附近找 星级酒店
var STAT_INDEX_VICINITY_market  = 988;  //附近找 超市
var STAT_INDEX_VICINITY_hospital  = 989;  //附近找 医院
var STAT_INDEX_VICINITY_MORE  = 990;//附近找 更多

//add by jgd
var STAT_INDEX_THEATRE_POSTER  = 991;  //演出信息海报切换次数
var STAT_INDEX_THEATRE_DAMAI  = 992;   //去大麦购票入口点击量
var STAT_INDEX_THEATRE_DETAIL_SHOW  = 993;   //剧院在首页展现次数

var STAT_VIEWSPOT_SITELIST  =  1010; //子景点点击量
var STAT_VIEWSPOT_ALLSITE = 1011;   //全部景点点击量
var STAT_STRATEGY_LIST = 1012;   //攻略列表 查看全文的点击量；
var STAT_STRATEGY_ALL = 1013;   //攻略列表 查看总攻略点击量；
var STAT_VIEWBTN_OPEN = 1014;   //景点按钮相关统计 
var STAT_STRATEGY_ALL_1 = 1016;   //更多游记

//add by jgd
var STAT_IMPRESSION_XIALA = 1015;    //大家印象页面-点击倒三角的量
var STAT_IMPRESSION_SHOW = 1017;     //大家印象二级页面展示次数


var STAT_ADD_PIC_CLICK = 1018;  //非Place详情页拍照入口点击量
var STAT_ADD_COMM_CLICK = 1019;  //非Place详情页评论入口点击量
var STAT_INDEX_CLICK_FROM = 1020; //从这出发点击量
var STAT_INDEX_ADD_FAV = 1021; //详情页收藏点击添加量
var STAT_INDEX_REMOVE_FAV = 1022; //详情页收藏点击取消量
var STAT_INDEX_OTA_CLICK = 1023; //OTA电话拨打量
var STAT_INDEX_REALINFO_ADD_COMM = 1024; //我在现场添加评论按钮点击量
var STAT_INDEX_REALINFO_COMM_MORE = 1025; //实时动态查看更多评论点击量
var STAT_INDEX_HAVE_RealInfo = 1026; //有最新动态模块展现量/imei
var STAT_INDEX_VENUE_TAB = 1027; //场馆价格表中选择类别次数

// by mengfanlin
var STAT_INDEX_RANK_DOWN = 1031;	// 展开餐饮排行榜榜单
var STAT_INDEX_RANK_UP = 1032;		// 收起餐饮排行榜榜单
/*--1500 --1510-- 被sendtocar占用*/
//酒店预订相关统计

var STAT_HOTEL_OTA = 1511;// {{otaType: "otaDetail" //预订页}) dateClick 控件使用量 }
var STAT_HOTEL_OTA_CLICK = 1512; //订单页的PV


var STAT_VIEW_TICKET_BTN = 1513; //景点门票预订
var STAT_INDEX_DOUBAN_CLICK = 1514; //豆瓣同城点击量
var STAT_CATER_TEL_CLICK = 1515; //餐饮电话订座
var STAT_CATER_MYSHOP_CLICK = 1516; //商户认领
var STAT_INDEX_DAMAI_TEL = 1517; //大麦电话点击

var STAT_CATER_YD_CLICK = 1600; //餐饮有在线预订button点击量
var STAT_CATER_TJ_CLICK = 1601; //餐饮有推荐菜数据的点击量
var STAT_CATER_TJ2_CLICK = 1602; //餐饮推荐菜二级页菜品点击量
var STAT_MOVIE_PQ_CLICK = 1603; //详情页主页影讯排期的点击量

/*------------------------------------1610 - 1660 被电影预订占用----------------------------------------*/

var STAT_INDEX_CLICK_MOVIE_2_1 = 1611;  //今电影海报切换操作次数(后天)
var STAT_INDEX_MOVIE_URL = 1612;  //电影预订按钮
var STAT_INDEX_MOVIE_WANDA = 1613;  //电影预订按钮 万达
var STAT_PICLIST_PAGE = 1620;  //图片list 展现量
