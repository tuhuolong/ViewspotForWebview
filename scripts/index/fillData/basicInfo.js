

/*商户基本信息*/

function basicInfo(extD, opts){
    resetTemp.basicInfo = resetTemp.basicInfo || {};
    var data = extD.detail_info,
        src_name = extD.src_name || (window.poiInfo && window.poiInfo.src_name),
        opts = opts || {},
        type = opts.type || {};

    //验证无图情况
    //data.image = null;
    //验证无评分情况
    //_overall_rating = null;
    //验证无口味情况
    //data.taste_rating = null;
    //验证无环境情况
    //data.environment_rating = null;
    //验证无服务情况
    //data.service_rating = null;
    //验证无卫生情况
    //data.hygiene_rating = null;
    //验证无人均消费情况
    //data.price = null;
    //无评论数
//    _comment_num = null;

    var info = window.poiInfo,
        _name = info.name || extD && extD.name || '',
        _addr = info.addr || extD && extD.addr || '',
        _tel = info.tel ||  extD && extD.phone || '',
        _comment_num = info.comment_num || data && data.comment_num || '',
        _overall_rating = data && data.overall_rating || (info && info.overall_rating),
        _price = data && data.price || (info && info.price),
        _price  = _price ? '&#165;' + _price : '暂无',
        htmls = [],
        overall_rating = _overall_rating || 0,//星级评分没有提供时按 0 处理
        img_url = "../img/loading.png",
        data_config = dataConfig[src_name] || dataConfig['defaul_t'],
        className = '',
        base_info_num = 0,
        tel_class_name = ' tel_style',
        tel_tip_info = '',
        telNumCon = T.g('telNumCon'),
        telNumConPar = telNumCon.parentNode;


    //对图片进行处理
    if(data && data.image){
        
        //图片取本地缓存
        var localImgData = window.PlaceDataMgr.getPlaceData( window.poiInfo.uid + '_img');

        //如果本地缓存存在，则加载本地缓存;
        if((localImgData || data.image.indexOf('fantong') > -1) && window.poiInfo.uid != '7e73160c9bb8cf7909b93a5b'){
            img_url = localImgData || data.image;
            className = ' have_pic';
            _return = '';
            T.g('baseInfoPic').style.backgroundImage = 'url("' + img_url + '")';
        }else{
             var imgUrl = encodeURIComponent(decodeURIComponent(data.image));
            //将图片转换成base64格式
             getImgBase64({url:imgUrl,width:640,height:320,align:'center',quality : 50});
        }
    }else if(type != 'emptyData'){
        var place_type = (info && info.src_name);
        if(place_type && bannerType[place_type]){
            T.g('baseInfoPic').style.backgroundImage = 'url("../img/'+ place_type +'_banner.png")';
        }
    }

    htmls.push('        <li class="name">'+ _name +'</li>');

    if(_addr){
        htmls.push('        <li class="address font_1">'+ _addr +'</li>');
    }
    
    //星级评分
    //星级评分没有提供时按0处理，所以星级评分一直存在
    var w = Math.round((overall_rating*1)*(60/5) + parseInt(overall_rating*1)*2);
        w = isNaN(w)?0:w;
    htmls.push('        <li class="st1"><span class="star"><b style="width:' + w + 'px"></b></span><span class="num">' + overall_rating + '</span>');
    
    if(_comment_num){
        htmls.push('<span class="num comm_num">' + _comment_num + '条评论</span>');
    }

    htmls.push('</li>');

    if(data_config && data_config.base_info && data_config.base_info['price']){
        htmls.push('        <li class="st3">' + data_config.base_info['price'].name + ': <font class="red">' + _price + '</font></li>');
    }
    if(data && data_config &&　data_config.base_key && data_config.base_key.length && data_config.base_info){
        for(var i=0;i<data_config.base_key.length;i++){
            var key = data_config.base_key[i],
                _cls = 'st2',
                _value = data[key] || '-';

            //不对价格进行输出
            if(key == 'price'){
                continue;
            }
            if(i == (data_config.base_key.length -1)){
                _cls = 'st4';
            }
            if(data_config.base_info[key]){
                htmls.push('        <li class="'+ _cls +'">'+ data_config.base_info[key].name +':<font class="color_2">' + _value + '</font></li>');
                
                base_info_num ++ ;
            }
        }
    }

    if(T.g('basicInfo')){
        if(!base_info_num){
            T.addClass(T.g('basicInfo'),'noMoreStyle');
        }else{
            T.removeClass(T.g('basicInfo'),'noMoreStyle');
        }
    }
    

    //插入HTML代码
    T.g('basicInfo').innerHTML = htmls.join('');

    //添加显示OTA电话号码
    if(data && data.ota_info && data.ota_info[0]){
        resetTemp.basicInfo.haveOta = 1;
        
        var _ota_info = data.ota_info[0],
            telStr = _ota_info.ota_phone || '',
            tipStr = _ota_info.ota_tips || '',
            en_name = _ota_info.en_name || '';
        if(telStr && tipStr && en_name){
            T.g('telNumYlCon').style.backgroundImage = 'url("http://map.baidu.com/fwmap/upload/place/icon/'+ en_name +'/50.png")';
            T.g('telNumYlCon').innerHTML = '<a href="javascript:void(0)" onclick="addStat(STAT_INDEX_OTA_CLICK);callAppFun(\'tel\',{tel:\''+ telStr +'\'})" id="telNumYlCon" class="'+ tel_class_name +'">订房热线　 ' + telStr + '</a>';    
            T.g('telNumYlTipCon').innerHTML = tipStr;
            T.g('telYlCon').style.display = '';
            T.removeClass(telNumConPar,tel_class_name);
            tel_class_name = '';
            tel_tip_info = '酒店电话　 '
        }
        
    }

    //添加显示电话号码
    if(_tel){
        var telArr = _tel.split(','),
            telStr = '';
        for(var i=0;i<telArr.length;i++){
            telStr += '<span telNum='+ telArr[i] +'>'+telArr[i]+'</span>,';
        }
        //删除最后一个分号;
        telStr = telStr.replace(/,$/,'');
        if(!(resetTemp.basicInfo.haveOta || resetTemp.bookOnline.haveDcan) && !window._haveData_tel_fantong){
            T.addClass(telNumConPar,tel_class_name);
        }
        
        telNumCon.innerHTML = tel_tip_info + telStr;
        T.g('telCon').style.display = '';
    }

    //设置层显示
//    T.g('basicInfo').style.display = '';
}
