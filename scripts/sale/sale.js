window.templateType = 'sale';

/*
 *重置页面内容   
 */
function resetPageContent() {
    if(T.g('container')){
        T.g('container').style.display = 'none';
    }
    if(T.g('mask')){
        T.g('mask').style.display = 'none';
    }
    if(T.g('box_content')){
        T.g('box_content').style.display = 'none';
    }
}

/**
 *填充数据
 *@param {obj} json 数据内容 必填
 *@param {string} type 数据来源 saveData 标示来源与本地存储;
 */
function fillData(extD, opts) {
	
    var opts = opts || {},
        type = opts.type || {};


    if(!extD) return;


    //输出优惠信息
    if(extD.detail_info && extD.detail_info.premium2 && extD.detail_info.premium2.length){
        saleInfo(extD);
    }


    //商户中心优惠浏览统计
    setTimeout(function(){
        addStat(STAT_INDEX_SALE_SHOW);
        addStat(1,{'stat_type':'lbc_promo','promo_id':saleInfo.sale_id_all,'action':1});
    },1000)

    

    //通知客户端设置webview高度
    callAppFun('relayout');
}

/*优惠信息*/
function saleInfo(extD){
    var data = extD.detail_info && extD.detail_info.premium2,
        htmls = [],
        data_num = 0,
        sale_id_all = [];

    //如果没有数据则返回;
    if(!(data && data.length)) {
        return
    }
//        data[0].discount_title = '购买暴风雪(中杯)免费送1份干果(新品不参加活动)';
//        data[1] = data[0];
//        data[2] = data[0];
//        data[3] = data[0];


//    data[0].discount_dl = 5;
//    data[0].discount_lf = 15;
//    data[0].discount_offline = 1;

    for(var i=0;i<data.length;i++){
        var d = data[i],
            sale_id = d.discount_id,
            _p_w = 'width=326&',
            _p_h = 'height=234&',
            _p_a = 'aligh=left,center,right',
            _p_q = 'quality=90&',
            ya_pic_url = 'http://map.baidu.com/maps/services/thumbnails?'+ _p_w +_p_h + _p_a + _p_q + 'src=',
            down_num = d.discount_dl || 0,
            last_num = d.discount_lf || 0,
            title = d.discount_title && d.discount_title.replace(/&lt;[\w\\/]*&gt;/ig,'') || '',
            c_name = d.cn_name || (d.discount_src && d.discount_src.cn_name),
            e_name = d.discount_src && d.discount_src.en_name || '',
            content = d.discount_content.replace(/^(\r\n)*/g, "").replace(/\r\n/g, "<br>"),
            download_class = '',
            photo_url = d.discount_photo,
            offline = '';
        sale_id_all.push(sale_id);

        if(photo_url.split(';')[0]){
            photo_url = photo_url.split(';')[0];
        }
            
        //如果没有优惠标题则继续;
        if(!(d && title)){
            continue;
        }

        
        if(d.discount_offline && d.discount_offline == 1){
            download_class = ' sale_button_2';
            offline = ' offline = 1';
        }

        htmls.push('<div style="position:relative;float:left;width:'+ (document.body.clientWidth * 0.87) +'px;margin-right:'+ (document.body.clientWidth * 0.04) +'px">')
        htmls.push('<div class="sale_num">'+ (i+1) +'/'+data.length+'</div>')
        htmls.push('<div class="new_sale_list">')
        htmls.push('    <ul class="list shop min_hei_1" id="richInfo">');

        var tit = title.length > 22 ? title.slice(0,22) + '...' : title;
        htmls.push('        <li class="h3 title">' + tit + '</li>');
        htmls.push('        <li class="img_con">');
        htmls.push('            <div class="imgCon"><span src="" style="background-image:url(\''+ya_pic_url + photo_url+'\')" class="sale_pic" ></span>');
        htmls.push('                <span style="display:block;height:25px;">');
        if(down_num){
            htmls.push('                <color class="font_color_1">'+ down_num +'</color>人下载');
        }
        if(down_num && last_num){
            htmls.push('| ');
        }
        if(last_num){
            htmls.push('                剩余<color class="font_color_1">'+ last_num +'</color>张');
        }

        htmls.push('                </span><span class="sale_pic_bottom"></span></div>');
        htmls.push('        <div class="valid">有效期:'+ d.discount_effective_start +'至'+ d.discount_effective_end +'</div></li>');
        htmls.push('        <li class="splitLine splitLine1"></li>');
        htmls.push('        <li class="h3">优惠详情</li>');
        htmls.push('        <li>'+content+'</li>');
        htmls.push('    </ul>');

        htmls.push('<div class="sale_button_1'+ download_class +'" id="sale_msm_btn'+ i +'" '+ offline +' sale_id="'+sale_id+'" en_name = "'+ e_name +'">');
        htmls.push('    发送到手机');
        htmls.push('</div>');

        if(window.poiInfo.place_type && window.poiInfo.place_type == "sale"){
            htmls.push('<div class="container box_1 salebtnCss">');
            htmls.push('    <ul class="list sale_icon goto_icon">');
            htmls.push('        <li class="color_1">');
            htmls.push('    	    <a ontouchstart="callAppFun(\'poidetail\')">查看商户详情</a>');
            htmls.push('        </li>');
            htmls.push('    </ul>');
            htmls.push('</div>');
        }

        if((window.poiInfo.place_type && window.poiInfo.place_type == "sale") || (c_name && e_name && e_name!='lbc-claim')){
            htmls.push('<div class="splitLine"></div>');
        }       
        

        if(c_name && e_name && e_name!='lbc-claim'){            
            htmls.push('<ul class="list from_list">');
            htmls.push('    <li class="h3">优惠来源</li>');
            htmls.push('    <li class="from_icon_con"><img src="http://map.baidu.com/fwmap/upload/place/icon/'+ e_name +'/50.png" class="from_icon" />'+ c_name +'</li>');
            htmls.push('</ul>');
        }
        
        htmls.push('</div>');
        htmls.push('<div class="sale_right_pic"></div>');
        htmls.push('</div>');

        //显示数据条数++;
        data_num ++;

    }    
    //记录所有的优惠id,发送统计时需要将页面中的所有优惠id发送出去;
    saleInfo.sale_id_all = sale_id_all.join('|');

    if(data_num){
        //将显示条数信息绑在 saleInfo.data_num 上
        
        saleInfo.data_num = data_num;

        T.g('scroller').style.width = (document.body.clientWidth * data_num * 0.91) + 'px'; 
        T.g('scroller').style.paddingLeft = document.body.clientWidth * 0.07 + 'px';
        //插入HTML代码
        T.g('container').style.display = '';
        //插入HTML代码
        T.g('thelist').innerHTML = htmls.join('');

        document.body.style.height = T.g('wrapper').clientHeight + 'px';
        //下载按钮绑定事件;
        bindEvent();
    }

    window.myScroll = new iScroll('wrapper', {
		snap: true,
		momentum: false,
		hScrollbar: false,
        scrollScale : 0.91,
        scrollPart : false,
        onBeforeScrollStart : null
	 });
    
}

//下载按钮绑定事件;
function bindEvent() {
    var num = saleInfo.data_num;

    for(var i=0;i<num;i++){

        //如果没有找到按钮则继续;
        if(!T.g('sale_msm_btn' + i)){
            continue;
        }
        (function(){

            var btn = T.g('sale_msm_btn' + i);

            if(btn.getAttribute('offline') != 1){
           
                T.on(btn,'touchstart',openSendSmsBox);
                T.on(btn,'touchstart',function(e){
                    T.addClass(btn,'box_1_hover');
                });
                T.on(btn,'touchend',function(){
                    T.removeClass(btn,'box_1_hover');
                });
                T.on(btn,'touchcancel',function(){
                    T.removeClass(btn,'box_1_hover');
                });

            }
        })();
        
    }
}

function testLength() {
    var tel_input = T.g('sale_tel_inpu'),
        class_name = tel_input.className;
    if(!tel_input.value.length){
        T.removeClass(tel_input,'inputTipNull');
    }else{
        if(class_name.indexOf('inputTipNull') < 0){
            T.addClass(tel_input,'inputTipNull');
        }     
    }
}

//发送短信
function openSendSmsBox() {

    var sale_id = this.getAttribute('sale_id'),
        en_name = this.getAttribute('en_name'),
        ms_box = T.g('send_message'),
        input_box = T.g('send_box'),
        tel_input = T.g('sale_tel_inpu'),
        tel_message = T.g('box_tel_message'),
        tel_num = PlaceStorage.getItem('placeSalTelNum');//记录电话号码;

    

    //将sale_id值绑在openSendSmsBox 的sale_id 属性上
    openSendSmsBox.sale_id = sale_id;
    openSendSmsBox.en_name = en_name;    

    
    //将本次存储的电话号码显示出来;
    tel_input.value = tel_num;
    
    
    //显示发短信框    
    input_box.style.display = '';
    ms_box.style.display = 'none';
    tel_message.style.display = 'none';

    T.g('mask').style.height = Math.max(document.documentElement.scrollHeight,document.body.scrollHeight) + 'px';
    T.g('mask').style.display = '';
    T.g('box_content').style.display = '';
    
    //获取焦点;
    tel_input.focus();

    addStat(STAT_INDEX_SALE_BUTTON_CLICK);

    if(window.poiInfo.from && window.poiInfo.from == "push" && window.poiInfo.place_type && window.poiInfo.place_type == "sale"){
        addStat(1,{'stat_type':'lbc_sale','m':10,'sale_id':openSendSmsBox.sale_id});
    }
    
}

//隐藏发送短信窗口
function hidenSmsBox() {
    T.g('mask').style.display = 'none';
    T.g('box_content').style.display = 'none';
}

//发送短信
function submit_sms() {

    //    var str = '';
    //    for(var i in window.poiInfo){
    //        str += i +':' + window.poiInfo[i] + '\n';
    //    }
    //    alert(str);

    var poiInfo = window.poiInfo,
        tel_input = T.g('sale_tel_inpu'),
        tel = tel_input.value,
        tel_message = T.g('box_tel_message'),
        fcrid = openSendSmsBox.sale_id,
        en_name = openSendSmsBox.en_name,
        poi_id = poiInfo.uid,
//        xda_bdx = poiInfo.xda_bdx,
//        xda_bdy = poiInfo.xda_bdy,
//        xda_ov = poiInfo.xda_ov,
//        xda_m = poiInfo.xda_m,
        xda_did = poiInfo.xda_did || ''//唯一用户标示
//        xda_ver = poiInfo.xda_ver;

    if(isNaN(tel) || tel.length != 11){
        tel_message.style.display = '';
        setTimeout(function(){
            tel_message.style.display = 'none';
            tel_input.focus();
        },1000);
        return;
    }
    //记录电话号码;
    PlaceStorage.setItem('placeSalTelNum',tel);

    getNetworkStatus(function(result){
        if (result.networkStatus == 0) {
            // 没有网络
            showMessage({'type':'noNetWork'});

            //延时两秒关闭提示;
            setTimeout(function(){
                cancel_sms();
            },2000);
        } else {
        //  var href = 'http://picman.s.baidu.com/iphone/sendCouponWithIdentifier?callback=setsendstatus&tel='+ tel +'&fcrid='+ fcrid +'&xda_bdx='+ xda_bdx +'&xda_bdy='+ xda_bdy +'&xda_ov='+ xda_ov +'&xda_m='+ xda_m +'&xda_did='+ xda_did +'&xda_ver='+ xda_ver +'&from=ditu&t=' + Date.now();
            var href = config.dataUrl + '/detail?qt=sms&en_name='+ en_name +'&os=map_'+ window.mobileType +'_app&poi_id='+ poi_id +'&callback=setsendstatus&mobile='+ tel +'&promo_id='+ fcrid +'&src=map&terminal='+ window.mobileType +'&imei='+ xda_did +'&t=' + Date.now();
            scriptRequest(href,'sendSaleInfo');
            //隐藏发送短信窗口
            showMessage({'type':'sendIng'});
        }
    })

    
}

//发送短信回调方法
function setsendstatus(json) {
        var json = json || {};
        if(json.errorNo == 0){
            showMessage({'type':'success'});
            addStat(STAT_INDEX_SALE_SMS_OK);

            if(window.poiInfo.from && window.poiInfo.from == "push" && window.poiInfo.place_type && window.poiInfo.place_type == "sale"){
                addStat(1,{'stat_type':'lbc_sale','m':20,'sale_id':openSendSmsBox.sale_id});
            }
            //商户中心优惠下载成功统计;
            addStat(1,{'stat_type':'lbc_promo','promo_id':openSendSmsBox.sale_id,'action':2});
        }else{
            showMessage({'message':json.errMsg});
            addStat(STAT_INDEX_SALE_SMS_FAIL);
        }
        //延时两秒关闭提示;
        setTimeout(function(){
            cancel_sms();
        },2000);
}

function showMessage(opts) {
    var opts = opts || {},
        ms = {
            'noNetWork' : '请检查网络，稍后重试',
            'sendIng' : '正在发送...',
            'success' : '发送成功',
            'fail' : '发送失败'
        },
        message = opts.message || ms[opts.type] || ms['fail'],
        ms_box = T.g('send_message'),
        input_box = T.g('send_box');

    input_box.style.display = 'none';
    ms_box.style.display = '';

    ms_box.innerHTML = message;

}

//取消发送短信
function cancel_sms() {
    //隐藏发送短信窗口
    hidenSmsBox();
}

