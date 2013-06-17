window.templateType = 'hotel_ota_detail';

//隐藏元素；
function resetPageContent() {
    if(T.G('ota_detail')){
        T.G('ota_detail').style.display = 'none';
    }
}

/**
 *填充数据
 *@param {obj} json 数据内容 必填
		json 为客户端传入的数据，或者 回调函数传入的数据
 *@param {string} type 数据来源 saveData 标示来源与本地存储;
 */
function fillData(extD, opts) {
    var opts = opts || {},
        type = opts.type || {};

    if(!extD || !window.poiInfo || !window.poiInfo.uid || !window.poiInfo.otaUrl) {
        return;
    }
    
	showOtaDetail();

}

/**
 * 填充楼层信息
 * @author jason.zhou
 * @param {Array} 楼层信息
 */

function showOtaDetail() {
  
    var otaUrl = window.poiInfo.otaUrl,
        otaUid = window.poiInfo.uid,
        qUrl = "http://client.map.baidu.com/detail",
        params = {
            qt: 'otaprice',
            url: otaUrl,
            from: 'webview',
            callback: 'goOTAdetail'
        };
    
    qUrl = qUrl + '?t=' + Date.now();
    for (var k in params) {
        if (params.hasOwnProperty(k) && params[k]) {
            qUrl = qUrl + '&' + k + '=' + params[k];
        }
    }
    scriptRequest(qUrl, 'ota_detail');
}

function goOTAdetail(json){
 

    if(!json || !json.room_price || json.room_price.length == 0) {
        T.G('ota_detail').style.display = 'block';
        T.G('ota_detail').style.textAlign = 'center';
        T.G('ota_detail').style.padding = '20px';
        T.G('ota_detail').innerHTML = "由于网络原因，加载失败！";
        return;
    }
 
    T.G('ota_detail').style.display = 'block';
    var htmls = [],
        data = json.room_price,
        baseData = null,
        priceData = null,
        bookState = '',
        openLink = '',
        styleH = '',
        infoH = '',
        dis = '',
        infoBorder = '',
        coupon_type = '',
        stateTxt = '',
        otaBox = T.G('ota_detail');
    
    if(data.base_info){
        
        var baseData = data.base_info;
        
        if(!baseData.room_type_area && !baseData.bed_type && !baseData.room_type_floor && !baseData.adsl){
            infoH = 'height:auto;';
            infoBorder = 'background:none;margin-bottom:0;';
            dis = 'display:none;';
        }else{
            infoH = 'height:105px;';
            infoBorder = 'margin-bottom:10px;';
            dis = 'display:block;';
        }

        htmls.push('<div class="ota_baseInfo" style="' + infoH + '">');
        if(baseData.check_in_date && baseData.check_out_date){
            htmls.push('<div class="ota_date" style="' + infoBorder + '">入住<span>' + baseData.check_in_date + '</span>退房<span>' + baseData.check_out_date + '</span>');
            htmls.push('</div>');
        }
        
        htmls.push('<div class="ota_baseType" style="' + dis + '">');
        //大小
        if(baseData.room_type_area){
            htmls.push('<span class="room_type_area">' + baseData.room_type_area + '</span>');
        }
        //类型
        if(baseData.bed_type){
            htmls.push('<span class="bed_type">' + baseData.bed_type + '</span>');
        }
        htmls.push('</div>');

        htmls.push('<div class="ota_baseType" style="' + dis + '">');
        
        //楼层
        if(baseData.room_type_floor){
            htmls.push('<span class="room_type_floor">' + baseData.room_type_floor + '</span>');
        }
        //宽带
        if(baseData.adsl){
            htmls.push('<span class="adsl">' + baseData.adsl + '</span>');
        }

        htmls.push('</div>');
        htmls.push('</div>');
        
        if(data.price_info && data.price_info.length){
            htmls.push('<ul class="ota_priceInfo" style="display:block">');
            priceData = data.price_info;

            for(var i= 0,len = priceData.length; i < len; i++){

               if(priceData[i].ota_book_url && priceData[i].book_state == 1){
                   openLink =  ' onclick="openLink_ota(\'' + priceData[i].ota_book_url + '\', ' + STAT_HOTEL_OTA_CLICK + ')"'
               }else{
                   openLink = '';
               }
               htmls.push('<li' + openLink + '>');
               if(priceData[i].ota_name){
                   htmls.push('<h3>' + priceData[i].ota_name + '</h3>');
               }
               if(priceData[i].ota_room_name){
                   htmls.push('<p>' + priceData[i].ota_room_name + '</p>');
               }
               if(!priceData[i].book_state || priceData[i].book_state != 1){ //不可以预订状态
                    bookState = 'book_state_2'
                    stateTxt = '<span>(订完)</span>'
               }else{
                    bookState = "book_state_1"
                    stateTxt = '';
               }
               if(!priceData[i].ota_coupon_price){
                     styleH = 'height:35px;line-height:35px;';
               }else{
                     styleH = '';
               }
               htmls.push('<div class="' + bookState + '">');
               if(priceData[i].ota_price){

                   htmls.push('<h3 style="' + styleH + '"><span>￥</span>' + priceData[i].ota_price + stateTxt + '</h3>');
               }
               if(priceData[i].ota_coupon_price && priceData[i].ota_coupon_type){
                   if(priceData[i].ota_coupon_type == "返现" || priceData[i].ota_coupon_type == "直减"){
                        coupon_type = '-￥';
                   }else if(priceData[i].ota_coupon_type == "税费"){
                        coupon_type = '+￥';
                   }
                   htmls.push('<p>' + priceData[i].ota_coupon_type + coupon_type + priceData[i].ota_coupon_price + '</p>');
               }
               htmls.push('</div>');
               htmls.push('</li>'); 
            }
            htmls.push('</ul>');
        }
    }
    otaBox.innerHTML = htmls.join('');
    callAppFun('relayout');
    addStat(STAT_HOTEL_OTA, {otaType: "otaDetail"});//统计展现
    }
 
  
function openLink_ota(url, code){
    window.open(url);
    addStat(code);
}

