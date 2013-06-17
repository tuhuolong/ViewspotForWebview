window.templateType = 'groupon';


/*
 *重置页面内容   
 */
function resetPageContent() {
    if(T.g('wrapper')){
        T.g('wrapper').style.display = 'none';
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
    if(extD.detail_info && extD.detail_info.groupon && extD.detail_info.groupon.length){
        grouponInfo(extD);
    }


   //团购二级页面展现量
   if(type != 'emptyData' && type != 'checkData'){
      setTimeout(function(){
       	addStat(STAT_INDEX_GROUPON_PAGE_SHOW);
        //团购推送统计
        if(window.poiInfo.from && window.poiInfo.from == "push" && window.poiInfo.place_type && window.poiInfo.place_type == "groupon"){
            addStat(1,{'stat_type':'lbc_sale','m':12,'sale_id':poiInfo.uid});
        }
      },100)
   }

    //通知客户端设置webview高度
    callAppFun('relayout');
}

//推送进入第三方网站统计;
function addPushStat(url,from) {
    if(window.poiInfo.from && window.poiInfo.from == "push" && window.poiInfo.place_type && window.poiInfo.place_type == "groupon"){
        addStat(1,{'stat_type':'lbc_sale','m':22,'sale_id':window.poiInfo.uid,'groupon_url_pc':decodeURIComponent(url),'click_from':from});
    }
}


function grouponInfo(extD) {
    var data = extD.detail_info.groupon;
    var bottom_nav_hei = 65;
    window.picConHeight = window.deviceHeight - bottom_nav_hei - 20;
    //如果没有信息则返回;
    if(!data){
        return;
    }
    var htmls = [],
        page_num=0,
        img_num = 0,
        page_cur = 0;

    page_num = data.length;
    for(var i=0;i<data.length;i++){
        var _img = data[i],
            group_mer = data[i].cn_name,
            group_image_url = decodeURIComponent(data[i].groupon_image),
            group_title = data[i].groupon_title.replace(/&lt;[\w\\/]*&gt;/ig,''),
            group_now = data[i].groupon_price,
            group_old = data[i].regular_price,
            group_start = data[i].groupon_start,
            group_end = data[i].groupon_end,
            group_num = data[i].groupon_num,
            page_cur = 0,
            group_mobile_pay="",
            group_website = decodeURIComponent(data[i].groupon_site),
            group_url = 
            _p_w = 'width=280&',
            _p_h = 'height=170&',
            _p_a = '',
            _p_q = 'quality=90&',
           ya_pic_url = 'http://map.baidu.com/maps/services/thumbnails?'+ _p_w +_p_h + _p_a + _p_q + 'src='+group_image_url,
            return_btn = '';

        if(data[i+1])
        {
        	 var pre_src = decodeURIComponent(data[i+1].groupon_image);
        }
        if(window.poiInfo.place_type && window.poiInfo.place_type == "groupon"){
            T.addClass(document.body,'grouponlist');
            return_btn = '<div class="splitLine"></div><div class="rich_more goto_icon back_a font_2"><a onclick="callAppFun(\'poidetail\')" href="javascript:void(0)">查看商户信息</a></div>';
        }

        var _src = "src";
        if(data[i].groupon_url_mobile)
        {
        	group_url = decodeURIComponent(data[i].groupon_url_mobile);
        	group_mobile_pay = '<b class=\'phone_icon\'>可手机支付</b>';
        }
        else
        {
        	group_url = decodeURIComponent(data[i].groupon_url_pc);
        	group_mobile_pay="";
        }

        var info_length = group_title.length;
        if(info_length > 40)
        {
        	group_title = group_title.slice(0,40) + '...';
        }
          //对第二张以后的图片首次不进行加载；
        if(i>1){
            _src = '_src';           
        }
        

        var splidWidth = document.body.clientWidth*0.91;   
        		
//http://map.baidu.com/maps/services/thumbnails?width=326&height=234&aligh=left,center,rightquality=90&src=http://hiphotos.baidu.com/product_name/pic/item/aec379310a55b319bbab1d6442a98226cffc1754.jpg
        page_cur = i+1;
        if(data[i]){ 
            htmls.push('<li style="position:relative;float:left;width:'+ (document.body.clientWidth * 0.87) +'px;margin-right:'+ (document.body.clientWidth * 0.04) +'px; height:100%;">'
                           + '<p class=\'group_page_num\'>'+page_cur+'/'+page_num +'</p>'
                           + '<div class=\'aa\'><p class=\'group_info\'><a target="_blank" href ='+ group_url +' onclick="addStat(\''+ STAT_INDEX_GROUPON_TITLE_CLICK + '\');addPushStat(\''+ data[i].groupon_url_pc +'\',\'1\')"><span class=\'\'>【'+group_mer+'】</span>' + group_title + group_mobile_pay+'</a>'     
                           + '<div class="imgBox"><div class=\'border_shadow\'><img id=\'img_id_'+img_num+'\' class=\'groupon_img\' src = '+ ya_pic_url +' onclick = "addStat(\''+ STAT_INDEX_GROUPON_IMG_CLICK + '\');addPushStat(\''+ data[i].groupon_url_pc +'\',\'2\');setTimeout(function(){callAppFun(\'openUrl\',{page:\''+group_url+'\'})},100);"></img></div></div>' 

                           + '<p class=\'group_price\'>'+ '¥'+ group_now +'<span class=\'group_price_old\'><del>/'+ ' ¥ '+group_old+'</del></span><span class=\'group_look\'><a target="_blank" href ='+ group_url +' onclick="addStat(\''+ STAT_INDEX_GROUPON_LOOK_CLICK + '\');addPushStat(\''+ data[i].groupon_url_pc +'\',\'3\')">去看看</a></span></p>'           		      
            		       + '<p class=\'group_time\'>截至时间: '+group_end +'<span class=\'group_num\'>'+ group_num +'人已购买</span></p>'
                           + return_btn
                           + '</div>'
            		   +'</li>');
            //图片张数统计
            img_num ++ ;     
        }
    }


    T.g('scroller').style.width = (document.body.clientWidth * img_num * 0.91) + 'px'; 
    T.g('scroller').style.paddingLeft = document.body.clientWidth * 0.07 + 'px';

    	
    T.g('wrapper').style.display = '';
    T.g('thelist').innerHTML = htmls.join('');

    window.myScroll = new iScroll('wrapper', {
        snap: true,
        momentum: false,
        scrollScale:0.91,
        hScrollbar: false,
        vScrollbar: false,
        scrollPart : false,
   });
	 
    
    
}
