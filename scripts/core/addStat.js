
/**
 * 添加统计
 * @type Number 统计代码
 * 压缩时会匹配改文件 (addStat.js)，将里面的统计url地址进行修改，如果修改文件名或者将统计功能移至其他地方需要同时修改;
 */
function addStat(code, opts) {
    if (!code) {
        return;
    }

    var urls = {
        lbc_promo: 'http://api.lbc.baidu.com/ba/promo/view?',
        lbc_poi: 'http://api.lbc.baidu.com/ba/poi/view?',
        lbc_sale: 'http://push.lbc.baidu.com/sendmsg/api/counter?'
    },
        origin = {
            'iphone' : '3',
            'android' : '4',
            'ipad' : '7'
    },

        //重要！切记：
        //1、此处url使用测试环境的url是为了防止本地开发、测试统计 计入log平台统计中，
        //2、此处url在使用release.bat 进行压缩时会将url进行补全，如修改url需要同时修改preprocess.php中的正则匹配；
        img_url = "http://wuxupeng.fe.baidu.com/place/v5/img/transparent_gif?newmap=1&code="+ code + '&',
        stat_type = 'map';
        

    opts = opts || {};
    
    if (opts.stat_type) {
        stat_type = opts.stat_type;
        delete opts.stat_type;
		        //生成随机值
      // ts = (Math.random() * 100000000).toFixed(0),
       // opts.t = ts;

        img_url = urls[stat_type];
    }

    var poiInfo = window.poiInfo || {};
	
    if (stat_type == 'map') {
        var fromType = {
            'search' : 'list',
            'push' : 'push'
        },
            placeType = {
            'sale' : 'sale',
            'groupon' : 'groupon'
        }

        for(var i in fromType){
            if (poiInfo.from && poiInfo.from == i) {
                for(var j in placeType){
                   if(poiInfo.place_type && poiInfo.place_type == j){
                        opts[j + fromType[i]] = '1';
                    } 
                }
            }
        }
        
        
        opts.uid = poiInfo.uid || "";
        opts.qid = poiInfo.qid || "";
        opts.src_name = poiInfo.src_name || 'default';
        opts.mobile = window.mobileType || '';
        opts.ov = poiInfo.xda_ov || '';
        opts.m = poiInfo.xda_m || '';
        opts.did = poiInfo.xda_did || '';
        opts.im = poiInfo.im || '';
        opts.ver = poiInfo.xda_ver || '';
        opts.tmp = 'developmentTemp';
        opts.catalog_id = poiInfo.cla || '';
        opts.fr = poiInfo.from || "";


        if (poiInfo.center_x && poiInfo.center_y) {
            opts.cx = poiInfo.center_x;
            opts.cy = poiInfo.center_y;
        }
    }else if((stat_type == 'lbc_poi') || (stat_type == 'lbc_promo')){
        opts.origin = origin[window.mobileType] || 'mapNativeAppOther';
        opts.imei = poiInfo.xda_did || '';
    }else if(stat_type == 'lbc_sale'){
        opts.uid = poiInfo.uid || "";
        opts.imei = poiInfo.xda_did || '';
        opts.strategy = poiInfo.strategy || '';
    }


    for (var i in opts) {
        img_url += i + "=" + encodeURIComponent(opts[i]) + "&";
    }
	img_url+="t="+Date.now();
    //删除最后一个 & 符号;
   // img_url = img_url.replace(/&$/,'');

    // 内部函数定义 - 发送统计请求
    var sendStat = function (q) {
            if (!q) {
                return;
            }
            addStat._sending = true;
            setTimeout(function () {
                T.g("img").src = q.src;
//                T.g("img").src = 'http://client.map.baidu.com/detail?qt=ninf&uid=' + window.poiInfo.uid + '&from=webview&os=map_'+ window.mobileType +'_app&t=' + Date.now();
//                T.g("img").src = 'http://wuxupeng.fe.baidu.com/place/transparent_gif?t='+Date.now();
            }, 50);
        };
    // 内部函数定义 - 发送队列中下一个统计请求
    var reqNext = function () {
            var nq = addStat._reqQueue.shift()
            if (nq) {
                sendStat(nq);
            }
        }


    if (addStat._sending) {
        // 将本次请求加入队列
        addStat._reqQueue.push({
            src:  img_url
        });
    } else {
        // 直接发送请求
        sendStat({
            src:  img_url
        });
    }

    // 绑定事件
    if (!addStat._binded) {
        T.on(T.g("img"), "load", function () {
            addStat._sending = false;
            reqNext();
        });
        T.on(T.g("img"), "error", function () {
            addStat._sending = false;
            reqNext();
        });
        addStat._binded = true;
    }
}

// 初始化请求队列
addStat._reqQueue = [];

