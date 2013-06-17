
window.BMap = {};
window.BMap.Viewspot = {};

BMap.Viewspot.Title = function(container, option) {   
    var _container = container;
    var _option = option ? option : {};

    // 装载dom
    var _dom = {};
    var _getDom = function(){return _dom;};

    var _headmaskDiv = {};
    var _headlineDiv = {};
    var _basicinfoDiv = {};
    var _basicInfoUl = {};
    var _nameLi = {};
    var _addressLi = {};
    var _st1Li = {};
    var _st2Li = {};
    var _st4Li = {};
    var _starSpan = {};
    var _starB = {};
    var _numSpan = {};
    var _commSpan = {};
    var _toolcontDiv = {};
    var _toolcontUl = {};
    var _gotoLi = {};
    var _gotoA = {};
    var _gofromLi = {};
    var _gofromA = {};
    var _searchLi = {};
    var _searchA = {};
    var _favorLi = {};
    var _favorA = {};

    var _setName = function(name) {
        _nameLi.innerHTML = name;
    }

    var _setAddress = function(address) {
        _addressLi.innerHTML = address;
    }

    var _setStar = function(width) {
        _starB.style.width = width + "px";
    }

    var _setNum = function(num) {
        _numSpan.innerHTML = num;
    }

    var _setCommNum = function(commnum) {
        _commSpan.innerHTML = commnum + "条评论";
    }

    var _setLevel = function(level) {
        _st2Li.innerHTML = level;
    }

    var _setType = function(type) {
        _st4Li.innerHTML = type;
    }
    
    var _initialize = function() {

        _dom = document.createElement('div');

        _headmaskDiv = document.createElement('div');
        _headmaskDiv.className = "titleHeadMask";
        _dom.appendChild(_headmaskDiv);

        _headlineDiv = document.createElement('div');
        _headlineDiv.id = "headLine";
        _headlineDiv.className = "titleHeadLine";
        _dom.appendChild(_headlineDiv);

        _basicinfoDiv = document.createElement('div');
        _basicinfoDiv.className = "container basicInfo";
        _dom.appendChild(_basicinfoDiv);


        _basicInfoUl = document.createElement('ul');
        _basicInfoUl.className = "list base color_1";
        _basicInfoUl.id = "basicInfo";
        _basicinfoDiv.appendChild(_basicInfoUl);

        _nameLi = document.createElement('li');
        _nameLi.className = "name";
        _basicInfoUl.appendChild(_nameLi);

        _addressLi = document.createElement('li');
        _addressLi.className = "address font_1";
        _basicInfoUl.appendChild(_addressLi);

        _st1Li = document.createElement('li');
        _st1Li.className = "st1";
        _basicInfoUl.appendChild(_st1Li);

        _starSpan = document.createElement('span');
        _starSpan.className = "star";
        _st1Li.appendChild(_starSpan);

        _starB = document.createElement('b');
        _starB.className = "star";
        _starSpan.appendChild(_starB);

        _numSpan = document.createElement('span');
        _numSpan.className = "num";
        _st1Li.appendChild(_numSpan);

        _commSpan = document.createElement('span');
        _commSpan.className = "num comm_num";
        _st1Li.appendChild(_commSpan);

        _st2Li = document.createElement('li');
        _st2Li.className = "st2";
        _basicInfoUl.appendChild(_st2Li);

        _st4Li = document.createElement('li');
        _st4Li.className = "st4";
        _basicInfoUl.appendChild(_st4Li);

        _toolcontDiv = document.createElement('div');
        _toolcontDiv.className = "container toolCont";
        _dom.appendChild(_toolcontDiv);

        _toolcontUl = document.createElement('ul');
        _toolcontUl.className = "box_3 tool_con";
        _toolcontDiv.appendChild(_toolcontUl);

        _gotoLi = document.createElement('li');
        _gotoA = document.createElement('a');
        _gotoA.className = "goto";
        _gotoA.innerHTML = "到这里去";
        _gotoLi.appendChild(_gotoA);
        _toolcontUl.appendChild(_gotoLi);

        _gofromLi = document.createElement('li');
        _gofromA = document.createElement('a');
        _gofromA.className = "gofrom";
        _gofromA.innerHTML = "从这出发";
        _gofromLi.appendChild(_gofromA);
        _toolcontUl.appendChild(_gofromLi);

        _searchLi = document.createElement('li');
        _searchA = document.createElement('a');
        _searchA.className = "search";
        _searchA.innerHTML = "在附近找";
        _searchLi.appendChild(_searchA);
        _toolcontUl.appendChild(_searchLi);

        _favorLi = document.createElement('li');
        _favorA = document.createElement('a');
        _favorA.className = "favor";
        _favorA.innerHTML = "收藏";
        _favorLi.appendChild(_favorA);
        _toolcontUl.appendChild(_favorLi);

        _container.appendChild(_dom);
    };
    
    (function() {
        _initialize();
    })();
    
    return {
        getDom : _getDom,
        setName : _setName,
        setAddress : _setAddress,
        setStar : _setStar,
        setNum : _setNum,
        setCommNum : _setCommNum,
        setLevel : _setLevel,
        setType : _setType
    }
};

BMap.Viewspot.Telephone = function(container, option)
{   
    var _container = container;
    var _option = option ? option : {};

    var _dom = {};
    var _getDom = function(){return _dom;};

    var _telUl = {};
    var _telLi = {};
    var _telA = {};
    var _tel1Span = {};
    var _tel2Span = {};

    var _addTel = function(tel) {
        var span = document.createElement('span');
        span.telnum = tel;
        span.innerHTML = tel;
        _telA.appendChild(span);
    }

    var _initialize = function() {

        _dom = document.createElement('div');

        _telUl = document.createElement('ul');
        _telUl.className = "list con1";
        _dom.appendChild(_telUl);

        _telLi = document.createElement('li');
        _telLi.className = "color_1 tel tel_style";
        _telUl.appendChild(_telLi);

        _telA = document.createElement('A');
        _telA.href = "javascript:void(0)";
        _telA.id = "telNumCon";
        _telLi.appendChild(_telA);

        _container.appendChild(_dom);
        _container.style.display = '';

    };

    (function() {
        _initialize();
    })();
    
    return {
        getDom : _getDom,
        addTel : _addTel
    }
}

BMap.Viewspot.Price = function(container, option)
{   
    var _container = container;
    var _option = option ? option : {};

    var _dom = {};
    var _getDom = function(){return _dom;};

    var _titleDiv = {};
    var _boxDiv = {};

    var _box1Div = {};
    var _box2Div = {};

    var _box21Div = {};
    var _box21Span = {};

    var _moreA = {};

    var _setData = function(data) {
        _box1Div.innerHTML = data;
    }

    var _setUrl = function(url) {
        _moreA.href = url;
    }

    var _initialize = function() {

        _dom = document.createElement('div');

        _titleDiv = document.createElement('div');
        _titleDiv.className = "h3";
        _dom.appendChild(_titleDiv);

        _boxDiv = document.createElement('div');
        _boxDiv.className = "box_1";
        _dom.appendChild(_boxDiv);

        _box1Div = document.createElement('div');
        _box1Div.className = "box";
        _boxDiv.appendChild(_box1Div);

        _box2Div = document.createElement('div');
        _box2Div.className = "bottom_nav bottom_nav_1";
        _boxDiv.appendChild(_box2Div);

        _box21Div = document.createElement('div');
        _box2Div.appendChild(_box21Div);

        _box21Span = document.createElement('span');
        _box21Div.appendChild(_box21Span);

        _moreA = document.createElement('a');
        _moreA.innerHTML = "查看更多攻略<em class=\'goto_icon_1\''></em>"
        _box21Span.appendChild(_moreA);

        _container.appendChild(_dom);
        _container.style.display = '';
    };

    (function() {
        _initialize();
    })();
    
    return {
        getDom : _getDom,
        setData : _setData,
        setUrl : _setUrl
    }
}

BMap.Viewspot.Strategy = function(container, extD, option)
{   
    var _container = container;
    var _extD = extD;
    var _option = option ? option : {};

    var _dom = {};
    var _getDom = function(){return _dom;};

    var _titleDiv = {};
    var _box1Div = {};
    var _contentUl = {};
    var _bottomDiv = {};
    var _bottomSubDiv = {};
    var _bottomSpan = {};
    var _bottomA = {};

    var _setUrl = function(url) {
        _bottomA.href = url;
    }

    var _addDataItem = function() {
        var itemLi = document.createElement('li');

        var titDiv = document.createElement('div');
        titDiv.className = "tit";
        titDiv.innerHTML = "【我们出发吧】消失的离宫--圆明园";
        itemLi.appendChild(titDiv);

        var lineDiv = document.createElement('div');
        lineDiv.className = "line";
        lineDiv.innerHTML = "北京圆明园";
        itemLi.appendChild(lineDiv);

        var classifyDiv = document.createElement('div');
        classifyDiv.className = "classify";
        var priceSpan = document.createElement('span');
        priceSpan.className = "price";
        priceSpan.innerHTML = "0元";
        var timeSpan = document.createElement('span');
        timeSpan.className = "time";
        timeSpan.innerHTML = "2012年09月";
        var daysSpan = document.createElement('span');
        daysSpan.className = "days";
        daysSpan.innerHTML = "1天";
        classifyDiv.appendChild(priceSpan);
        classifyDiv.appendChild(timeSpan);
        classifyDiv.appendChild(daysSpan);
        itemLi.appendChild(classifyDiv);

        var contentDiv = document.createElement('div');
        contentDiv.className = "content";
        contentDiv.innerHTML = "...……，不管怎么去痛恨那些侵略者还是当时的清政府，都已成为历史已成为过去，对与错是与非相信世人都会站在正义的一方来公正评价，只是多了一些遗憾。这里引用了一首诗《圆明园，我想对你说》，出处忘记了，不过写的很好在这里与大家分享。圆明园，我想对你说 明园呀！...";
        var showSpan = document.createElement('span');
        showSpan.className = "showBtn";
        showSpan.innerHTML = "查看全文";
        contentDiv.appendChild(showSpan);
        itemLi.appendChild(contentDiv);

        var linkDiv = document.createElement('div');
        linkDiv.className = "link";
        var span1 = document.createElement('span');
        span1.innerHTML = "来自百度旅游";
        linkDiv.appendChild(span1);
        var span2 = document.createElement('span');
        span2.className = "release_time";
        span2.innerHTML = "12-09-18";
        linkDiv.appendChild(span2);
        itemLi.appendChild(linkDiv);

        _contentUl.appendChild(itemLi);
    }

    var _initialize = function() {

        _dom = document.createElement('div');

        _titleDiv = document.createElement('div');
        _titleDiv.className = "h3";
        _titleDiv.innerHTML = "精彩游记";
        _dom.appendChild(_titleDiv);

        _box1Div = document.createElement('div');
        _box1Div.className = "box_1"; 
        _dom.appendChild(_box1Div);

        _contentUl = document.createElement('ul'); 
        _box1Div.appendChild(_contentUl);

        _bottomDiv = document.createElement('div');
        _bottomDiv.className = "bottom_nav bottom_nav_1";
        _box1Div.appendChild(_bottomDiv);

        _bottomSubDiv = document.createElement('div');
        _bottomDiv.appendChild(_bottomSubDiv);

        _bottomSpan = document.createElement('span');
        _bottomSubDiv.appendChild(_bottomSpan);

        _bottomA = document.createElement('a');
        _bottomA.innerHTML = "查看更多游记<em class=\'goto_icon_1\''></em>";
        _bottomSpan.appendChild(_bottomA);

        _container.appendChild(_dom);
        _container.style.display = 'block';
    };

    (function() {
        _initialize();
    })();
    
    return {
        getDom : _getDom,
        addDataItem : _addDataItem,
        setUrl : _setUrl
    }
}


BMap.Viewspot.NearbySearch = function(container, extD, option)
{   
    var _container = container;
    var _extD = extD;
    var _option = option ? option : {};

    var _initialize = function() {
        var shop;

        if(extD && extD.src_name && dataConfig[extD.src_name] && dataConfig[extD.src_name].VS){
            shop = dataConfig[extD.src_name].VS;
        }else if(extD){
            shop = dataConfig.defaul_t.VS;
        }

        if(!shop || shop.length==0 ){
            return;
        }
        var html = [], 
            shopData = vicinityShop,
            statCode = 990;

        html.push('<div class="h3">在该点附近找</div>');
        html.push('<div class="box_1"><ul class="c_list" id="vicinityShopBox">');

        for(var i=0,len=shop.length; i<len; i++){

            statCode = window['STAT_INDEX_VICINITY_'+ shopData[shop[i]].name];

            html.push('<li onclick="callAppFun(\'nearbysearch\',{\'wd\':\'' + shopData[shop[i]].key + '\'});addStat(' + statCode + ');"><div><span class="icon ' + shopData[shop[i]].name + '"></span><span class="text">' + shopData[shop[i]].key + '</span></div></li>');   
        }

        html.push('</ul>');
        html.push('<div class="bottom_nav bottom_nav_1"><div><span><a href="javascript:void(0)" onclick="addStat(\''+ STAT_INDEX_VICINITY_MORE + '\');callAppFun(\'nearbysearch\')">查看更多<em class="goto_icon_1"></em></a></span></div></div></div>');
        html.push('<div class="splitLine2"></div>');


        _container.innerHTML = html.join('');

        _container.style.display = 'block';

    };

    (function() {
        _initialize();
    })();
    
    // 对外接口
    return ;
}

BMap.Viewspot.More = function(container, extD, option)
{   
    var _container = container;
    var _extD = extD;
    var _option = option ? option : {};

    var _initialize = function() {
        var data = extD.detail_info && extD.detail_info.link || [],
            data_len = data.length;
            haveData = false;

        //如果没有数据则返回;
        if(!data_len){
            return;
        }

        var htmls = [];

        htmls.push('<div class="h3">查看更多</div>');
        htmls.push('<div class="c_list">');
        htmls.push('<ul class=" more box_1" id="moreInfo">');

        for(var i=0;i<data_len;i++){
            var _json = data[i],
                stat = '',
                s_name =  _json.s_name||"";                                 //--question no s_name property

            s_name = s_name=="" ? "" : "_"+s_name;
            var image_url="http://map.baidu.com/fwmap/upload/place/icon/"+_json.name+"/50"+s_name+".png";

            if(!_json.cn_name || _json.name == 'youke' ||  _json.name == 'youlaopo'){
                continue;
            }
            //统计信息
            stat = ' onclick = "addStat(\''+ STAT_INDEX_CLICK_MORE +'\',{datatype:\'more\',datafrom:\''+_json.name.toLowerCase()+'\'})"';
            var moreInfo_url =_json.url_mobilephone ? _json.url_mobilephone : _json.url;
            htmls.push('    <li class="blue log"><div><a href="'+moreInfo_url+'"'+ stat +' class="log_icon" style="background-image:url('+image_url+')">'+ _json.cn_name +'</a></div></li>');
            haveData = true;
        }

        //如果出现1行中只有1个数据的情况时，填充个空行
        if(data_len%2){
            htmls.push('    <li class="blue log"><div></div></li>');
        }

        htmls.push('</ul></div>');
        htmls.push('<div class="splitLine2"></div>');

        if(haveData){
            // 插入HTML代码
            _container.innerHTML = htmls.join('');

            _container.style.display = 'block';
        }

    };

    (function() {
        _initialize();
    })();
    
    // 对外接口
    return ;
}

BMap.Viewspot.Picture = function(container, extD, option)
{   
    var _container = container;
    var _extD = extD;
    var _option = option ? option : {};

    var _initialize = function() {
        resetTemp.picInfo = resetTemp.picInfo || {};
        var data = extD.image || {},
            dataNum = 0,
            src_name = extD.src_name,
            opts = opts || {},
            type = opts.type || {},
            htmls = [],
            data_config = dataConfig[src_name] || dataConfig['defaul_t'];

        htmls.push('<ul class="list pic box_1" id="picInfo">');

        for(var i=0;i<4;i++){
            var _img_data = extD.image[i];
            if(_img_data && _img_data.imgUrl && _img_data.cn_name && _img_data.name){
                //http://map.baidu.com/maps/services/thumbnails?width=1132&height=655&quality=50&src=http://hiphotos.baidu.com/local/pic/item/f2b7baef876e46552cf534b6.jpg
                if(dataNum <4){
                    htmls.push('<li><a onclick="addStat(STAT_INDEX_CLICK_PIC_LIST);callAppFun(\'newwindow\',{page:\'pic.html\',index:'+ dataNum +',imgUrl:\''+ _img_data.imgUrl +'\',name:\'' + _img_data.name + '\',cn_name:\'' + _img_data.cn_name + '\'})"><img src="http://map.baidu.com/maps/services/thumbnails?src='+ encodeURIComponent(_img_data.imgUrl) +'&quality=50&width=128&height=128&align=center" width="64" height="64" /></a></li>');
                }            
                dataNum ++;
            }else{
                htmls.push('<li><a onclick="callAppFun(\'openModule\',{\'name\':\'sbPhoto\'})"><img src="../img/add_img_bj.png" width="64" height="64" /></a></li>');
            }
            //展示3张后，停止;
            if(dataNum > 4){
                break;
            }
        }

        //输出更多图片;
        if(dataNum >3){
            htmls.push('<li class="bottom_nav"><div><span><a onclick="addStat(STAT_INDEX_CLICK_PHOTO);callAppFun(\'openModule\',{\'name\':\'sbPhoto\'})"><em class="photo"></em>我要上传</a></span><span><a href="javascript:void(0)" onclick="addStat(STAT_INDEX_CLICK_PIC_ALL);callAppFun(\'newwindow\',{page:\'picList.html\'})">查看更多图片<em class="goto_icon_1"></em></a></span></div></li>');
        }

        htmls.push('</ul>');
        htmls.push('<div class="splitLine2"></div>');

        if(dataNum){
            resetTemp.picInfo.havePic = 1;
            //插入HTML代码
            _container.innerHTML = htmls.join('');

        }else{
            var noHtmls = [];
            noHtmls.push('<div class="h3">暂无图片</div>');
            noHtmls.push('<div class="box_3">');
            noHtmls.push('<ul class="list con1">');
            noHtmls.push('<li class="button_1" onclick="addStat(STAT_ADD_PIC_CLICK);callAppFun(\'openModule\',{\'name\':\'sbPhoto\'})"><b class="photo_icon2"></b>快来拍照吧</li>');
            noHtmls.push('</ul></div>');
            noHtmls.push('<div class="splitLine2"></div>');
            _container.innerHTML = noHtmls.join('');
        }

        _container.style.display = '';

    };

    (function() {
        _initialize();
    })();
    
    // 对外接口
    return ;
}

BMap.Viewspot.ReportError = function(container, extD, option)
{   
    var _container = container;
    var _extD = extD;
    var _option = option ? option : {};

    var _initialize = function() {
        var htmls = [];
        htmls.push('<ul class="list bottom_bt_con">');
        htmls.push('<li class="back_a" id="shellCon_con"><a class="correction box_1" onclick="addStat(STAT_INDEX_CLICK_ERROR);callAppFun(\'poi_correction\')" class="photo">报告错误</a></li>');
        htmls.push('</ul>');

        _container.innerHTML = htmls.join('');
        _container.style.display = '';

    };

    (function() {
        _initialize();
    })();
    
    // 对外接口
    return ;
}


BMap.Viewspot.OnlineBook = function(container, extD, option)
{   
    // 装载dom
    var _dom = {};
    var _getDom = function(){return _dom;};
    
    // 初始化
    var _initialize = function()
    {
        
    };
    
    
    // 创建时立即执行
    (function() 
    {
        _initialize();
    })();
    
    // 对外接口
    return {
        getDom : _getDom
    }
};

BMap.Viewspot.Sale = function(container, extD, option) 
{
    var _container = container;
    var _extD = extD;

    var _setContent = function(htmls){
        _dom.innerHTML = htmls;
    };
    

    var _initialize = function()
    {

        resetTemp.saleInfo = resetTemp.saleInfo || {};
        var data = extD.detail_info && extD.detail_info.premium2,
            htmls = [],
            haveData = false,
            dataNum = 0;

        //如果没有数据则返回;
        if(!(data && data.length)) {
            return
        }

        for(var i=0;i<data.length;i++){
            var d = data[i];
            
            //如果没有优惠标题则继续;
            if(!(d && d.discount_title)){
                continue;
            }

            //如果有数据则haveData 为true
            haveData = true;
            //记录总共有几条优惠数据；
            dataNum ++;
        }  

        var d = data[0],        
            tit = d.discount_title.replace(/&lt;[\w\\/]*&gt;/ig,''),
            tit_str = dataNum>1 ? '优惠信息' : tit,
            num_str = dataNum>1 ? '<span class="num_con">'+ dataNum +'</span>' : '';

        if(haveData){
            //插入HTML代码
            /*
            T.g('saleInfo').innerHTML = htmls.join('');
            //设置层显示
            T.g('saleGrouponCon').style.display = '';
            T.g('saleInfo').style.display = '';

            //记录是否有优惠信息
            resetTemp.saleInfo.haveSale = true;*/
            htmls.push('<ul class="list con1 goto_icon" id="saleInfo">');
            htmls.push('    <li class="color_1"><a href="javascript:void(0)" onclick="addStat(\''+ STAT_INDEX_CLICK_SALE + '\');callAppFun(\'newwindow\',{page:\'sale.html\'})">' + tit_str + num_str + '</a></li>');
            htmls.push('</ul>');
        
        }







        resetTemp.grouponInfo = resetTemp.grouponInfo || {};
        var data = extD.detail_info && extD.detail_info.groupon,
            htmls = [],
            haveData = false,
            dataNum = 0,
            grouponTitle = '',
            groupDataStr ='',
            topStyle = '';

        //如果没有数据则返回;
        if(!(data && data.length)) {
            return
        }

        var rebateArr = [];
        for(var i=0;i<data.length;i++){
            var d = data[i];
            //如果有数据则haveData 为true
            haveData = true;
            //记录总共有几条团购数据；
            dataNum ++;
            if(data[i].groupon_rebate){
                rebateArr.push(data[i].groupon_rebate*1)
            }
        }  
    
    

        if(dataNum<=1){
            if(data[0].groupon_rebate && data[0].groupon_price){
                    grouponTitle = "超低价" + data[0].groupon_price*1 + "元，" + data[0].groupon_rebate*1 + "折"
            }else{
                grouponTitle = data[0].groupon_title.replace(/&lt;[\w\\/]*&gt;/ig,'');
            }
        }else{
            if(rebateArr.length){
                grouponTitle = "最低" + rebateArr.sort(sortFun)[0] + "折起";
            }else{
                grouponTitle = "团购信息";
            }
            groupDataStr = '<span class="num_con goto_icon_group">'+ dataNum +'</span>';
        }

        if(haveData){
            //插入HTML代码
            /*
            T.g('grouponInfo').innerHTML = htmls.join('');
            //设置层显示
             T.g('saleGrouponCon').style.display = '';
                T.g('grouponInfo').style.display = '';

            //记录是否有团购信息
            resetTemp.grouponInfo.haveGroup = true;*/

            htmls.push('<ul class="list con1 goto_icon" id="grouponInfo">');
            htmls.push('<li class="color_1 group_css"'+ topStyle +'><a href="javascript:void(0)" onclick="addStat(\''+ STAT_INDEX_GROUPON_BUTTON_CLICK + '\');callAppFun(\'newwindow\',{page:\'groupon.html\'})"><span>'+grouponTitle+'</span>'+ groupDataStr +'</a></li>');
            htmls.push('</ul>');
        
        }



        _container.innerHTML = htmls.join('');
    };
    
    (function()
    {
        _initialize();
    })();
    
    
    return {
        setContent : _setContent
    }
    
};

BMap.Viewspot.Groupon = function(container, option) 
{
    var _dom = {};

    var _setContent = function(htmls){
        _dom.innerHTML = htmls;
    };
    

    var _initialize = function()
    {
        _dom = document.getElementById('grouponInfo');
    };
    
    (function()
    {
        _initialize();
    })();
    
    
    return {
        setContent : _setContent
    }
    
};