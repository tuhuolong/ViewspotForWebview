
/**
 * 酒店预订模块
 * @author fuen
 * @param {Object} extD  json
 * @param {Object} opts  可选参数
 */

/*var hotelData = {
    room_info :[
        { //酒店房型价格信息（数组）
            room_type_name: "豪华套间", //房型名称
            lowest_price: "999", //房型最低价格
            book_state: 1, //房态（1：自由预订；3：订完）
            ota_price_url: "XXX" //价格url
        }
    ]
}
*/

function showHotelOTA(uid, opts){
    setTemp.showHotelOTA = setTemp.showHotelOTA || {};

    var hotelOTA = T.G("hotelOTA"),
        htmls = [],
        btnState = '',
        btnTxt = '';

    hotelOTA.style.display = "block";
    htmls.push('<div class="container box_1 hotel_ota">')
    htmls.push('<div class="otaBar"><em>入住</em><span class="ota_date"><span class="arrow"  id="sta_ota_date"></span></span><em>退房</em><span class="ota_date"><span class="arrow"  id="end_ota_date"></span></span></div>')
    htmls.push('<div id="ota_List"></div>')
    htmls.push('</div>');
    htmls.push('<div class="container" style="text-align:right;padding-right:5px;">酒店房型价格由去哪儿提供!</div>')
    hotelOTA.innerHTML = htmls.join(''); 
 
    var startV = T.G("sta_ota_date"),
        endV = T.G("end_ota_date"),
        AG = (typeof (bdServerTime) == "undefined") ? new Date() : new Date(bdServerTime * 1000),
        Y = new Date(AG.getFullYear(), AG.getMonth(), (AG.getDate() + 88));
    
    AG = AG.getFullYear() * 10000 + (AG.getMonth() + 1) * 100 + AG.getDate()
    
    Y = Y.getFullYear() * 10000 + (Y.getMonth() + 1) * 100 + Y.getDate();
    AD(AG, startV);
    AD(AG + 1, endV);

    var X = AE(startV),
        V = AE(endV);   

    function AD(AR, T) {
        var AQ = AH(AR);
        T.innerHTML = DateType(AQ);
    }
    //实例化
    var sta_wcal = new WCal({
        eleID : 'ota_start_id',
        posEle: hotelOTA,
        count:1,
        input:startV,
        today: AG,
        between: [AG, Y],
        onShow: function () {
            if (end_wcal) {
               end_wcal.hide()
            }
           startV.parentNode.style.border = "1px solid #ffcca0";
           endV.parentNode.style.border = "1px solid #b1b1b1";
           this.setHtml(X);
           addStat(STAT_HOTEL_OTA, {otaType: "dateClick"}); //统计日期点击量
        },
        onChange: function () {
            this.setDay(X);
        },
        onSelectDay: function (T, AQ) {
            X = T;
            if (V <= X) {
                V = DateType(AH(X + 1)).replace(/-/g, "");
                AD(V, endV)
            }
            ota_tip();
            otaRequest(uid);

            /*if(T && AG && T >= AG){
               var startD = T - AG;
               addStat(STAT_HOTEL_OTA,{startv:startD}); //统计用（选择今天、明天、后天、第四天、第五天、第六天、七天后）
            }*/

        }
    });

    var end_wcal = new WCal({
        eleID : 'ota_end_id',
        posEle: hotelOTA,
        count:1,
        input:endV,
        today:AG,
        onShow: function () {
            if (sta_wcal) {
               sta_wcal.hide()
            }
            this.setBetween([X + 1, Y + 1]);
            this.setHtml(V);
            endV.parentNode.style.border = "1px solid #ffcca0";
            startV.parentNode.style.border = "1px solid #b1b1b1";
            addStat(STAT_HOTEL_OTA, {otaType: "dateClick"})
               
        },
        onChange: function () {
           this.setDay(V);
        },
        onSelectDay: function (T, AQ) {
            V = T;
            ota_tip();
            otaRequest(uid);
            /*if(T && AG && T >= AG){
               var endD = T - AG;
               addStat(STAT_HOTEL_OTA, {endv: endD});//统计用（选择今天、明天、后天、第四天、第五天、第六天、七天后）
            }*/
        }
    });

    setTemp.showHotelOTA.hvData = 1;
   
   addStat(STAT_HOTEL_OTA, {otaType: "indexShow"});
}

function ota_tip(){
               if(T.G('ota_List')){
                T.G('ota_List').innerHTML = '<p class="ota_data_loading"><span>正在查询</span><img src="../img/loading_imp.gif" width=20 height=20 /></p>';
            }
}
//把时间转换成 2013-01-23的格式
function DateType(T) {
    return "" + T.getFullYear() + "-" + ("0" + (T.getMonth() + 1)).slice(-2) + "-" + ("0" + T.getDate()).slice(-2)
    }

function AH(T) {
    T = T.toString().match(/^(\d+)(\d\d)(\d\d)/);
    T.shift();
    return new Date(T[0], T[1] - 1, T[2])
}

function AE(AQ) {
        var T = AQ.innerHTML.match(/^(\d+)-(\d\d)-(\d\d)/);
        if (T && T.length == 4) {
            return parseInt("" + T[1] + T[2] + T[3])
        } else {
            return false
        }
}
/**
 * 展示数据列表
 * @author fuen
 * @param {Object} type  string "list" 部分列表 ， "moreList" 全部列表； 
 */

function ota_showList(type){

    var htmls = [],
        J = window.ota_listData,
        openUrl = '';
    htmls.push('<ul id="ota_ul">');

    if(type == "list"){
        for(var i = 0, len = J.length; i < len; i++){
            if(J[i].room_type_name){
                if(i == 5){
                    break;
                }

                if(J[i].ota_price_url){
                    openUrl = ' onclick="callAppFun(\'newwindow\',{page:\'hotelOta.html\', otaUrl:\'' + J[i].ota_price_url +'\'})"' 
                }else{
                    openUrl = '';
                }

                htmls.push('<li' + openUrl + '>' + J[i].room_type_name + '<div>');
                if(J[i].lowest_price){
                    htmls.push('<em>￥</em><span class="price">'+J[i].lowest_price+'</span><span class="price_inf">起</span>');
                }
                if(J[i].book_state && J[i].book_state == 1){
                    btnState = "btn_1";
                    btnTxt =  "预订";
                }else{
                    btnState = "btn_3";
                    btnTxt =  "订完";
                }
                htmls.push('<span class="' + btnState + '">' + btnTxt + '</span>');
                htmls.push('</div></li>');
            }
        }

        htmls.push('</ul>')
        if(J && J.length > 5){
            htmls.push('<div class="bottom_nav bottom_nav_1"><div><span><a href="javascript:void(0);" onclick="ota_showList(\'listMore\');addStat(' + STAT_HOTEL_OTA + ', {otaType:\'clickMore\'});">查看更多房型<em class="goto_icon_down"></em></a></span></div></div>');
        }
    }
    //展开更多；
    if(type == "listMore"){
        for(var i = 0, len = J.length; i < len; i++){
            if(J[i].room_type_name){
                
                if(J[i].ota_price_url){
                    openUrl = ' onclick="callAppFun(\'newwindow\',{page:\'hotelOta.html\', otaUrl:\'' + J[i].ota_price_url +'\'})"' 
                }else{
                    openUrl = '';
                }
                
                htmls.push('<li' + openUrl + '>' + J[i].room_type_name + '<div>');
                if(J[i].lowest_price){
                    htmls.push('<em>￥</em><span class="price">'+J[i].lowest_price+'</span>');
                }
                if(J[i].book_state && J[i].book_state == 1){
                    btnState = "btn_1";
                    btnTxt =  "预订";
                }else{
                    btnState = "btn_3";
                    btnTxt =  "订完";
                }
                htmls.push('<span class="' + btnState + '">' + btnTxt + '</span>');
                htmls.push('</div></li>');
            }
        }
        htmls.push('</ul>')
        if(J && J.length > 5){
            htmls.push('<div class="bottom_nav bottom_nav_1"><div><span><a href="javascript:void(0);" onclick="ota_showList(\'list\');addStat(' + STAT_HOTEL_OTA + ', {otaType:\'clickList\'})">点击收起<em class="goto_icon_up"></em></a></span></div></div>');
        }          
    }
    T.G('ota_List').innerHTML = htmls.join('');
    
    callAppFun('relayout');
}

//获取元素位置
function getPos(obj){
    var pos = {"top":0, "left":0};
    if (obj.offsetParent){
        while (obj.offsetParent){
            pos.top += obj.offsetTop;
            pos.left += obj.offsetLeft;
            obj = obj.offsetParent;
        }
    }else if(obj.x){
        pos.left += obj.x;
    }else if(obj.x){
        pos.top += obj.y;
    }
    return pos;
}

//发起请求
function otaRequest(uid, type){

    if(!uid){
        return;
    }

    otaRequest.tp = type; //是否首次请求 first 为首次请求
    var url =  'http://client.map.baidu.com/detail',
        startV = '',
        endV = '',
        btn = '',
        params = {},
        DATE = (typeof (bdServerTime) == "undefined") ? new Date() : new Date(bdServerTime * 1000);

    DATE = DATE.getFullYear() * 10000 + (DATE.getMonth() + 1) * 100 + DATE.getDate();

    if(otaRequest.tp == "first"){
        
        params = {
            qt: 'otaroom',
            uid: uid,
            st: DateType(AH(DATE)),
            et: DateType(AH(DATE+1)),
            from: 'webview',
            callback: 'otaSearch'
        };
    
    }else{

        startV = T.G("sta_ota_date");
        endV = T.G("end_ota_date");
        btn = T.G("ota_search");
        params = {
            qt: 'otaroom',
            uid: uid,
            st: startV.innerHTML,
            et: endV.innerHTML,
            from: 'webview',
            callback: 'otaSearch'
        };

        /*var day_X = AE(startV)*1,
            day_v = AE(endV)*1,
            day = day_v - day_X;
            alert(day_X);
            alert(day_v)

       addStat(STAT_HOTEL_OTA, {otaType:"btnSearch",day:day }) //统计预订天数*/
       addStat(STAT_HOTEL_OTA, {otaType:"btnSearch"}) //统计检索量*/
    }
       

    url = url + '?t=' + Date.now();
    for (var k in params) {
        if (params.hasOwnProperty(k) && params[k]) {
            url = url + '&' + k + '=' + params[k];
        }
    }


    scriptRequest(url, 'ota_search');

}

//发起检索
function otaSearch(json){
    

    if(!json || !json.room_info || json.room_info.length == 0){
        if(T.G('ota_List')){
            T.G('ota_List').innerHTML = '<p style="padding:10px;">暂没有数据，请选择日期重试！</p>';
        }
        return; 
    }
    
    window.ota_listData = json.room_info;
    //window.ota_listData = hotelData.room_info; //测试数据；

    if(otaRequest.tp == "first"){ //首次调用
        showHotelOTA(window.poiInfo.uid);
        ota_showList("list");
    }else{
        ota_showList("list");
    }
}

