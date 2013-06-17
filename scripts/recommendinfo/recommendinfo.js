//window.templateType = 'impression';
window.templateType = 'recommendinfo';
/*
 *重置页面内容   
 */
function resetPageContent() {
    if(T.g('recommendinfo_index')){
        T.g('recommendinfo_index').style.display = 'none';
    }
}

/**
 *填充数据
 *@param {obj} json 数据内容 必填
		json 为客户端传入的数据，或者 回调函数传入的数据
 *@param {string} type 数据来源 saveData 标示来源与本地存储;
 *
 *测试转正式方法：  去掉所有标记为 test by jgd的语句
 */
function fillData(extD, opts) {
    var opts = opts || {},
    	type = opts.type || '',
        cur_num = window.poiInfo.index_num || 0;

    setBodyHeight()
    //test by jgd
    //json = window.pubTestInfo;
    //

    json = extD;
    //客户端测试 test add by jgd
    //window.poiInfo.index_num = 0;
    //客户端测试

	var recommendinfoIndex = json && json.rich_info && json.rich_info.recommend_commodity && json.rich_info.recommend_commodity[cur_num];
    if(!recommendinfoIndex){
        //test by jgd
		//alert("return recommendinfoIndex");
		return;
	}
	recommendinfoInfo(recommendinfoIndex);
    //通知客户端设置webview高度
    callAppFun('relayout');
}

/*评论信息*/

function recommendinfoInfo(recommendinfoIndex) {
    var recommendinfo_dish = recommendinfoIndex,
        htmls = [],
        haveData = false;
    //如果没有数据则返回;
    //test by jgd
    //alert('recomentinfo')
    if(!(recommendinfo_dish && recommendinfo_dish.image.length)) {
        return;
    }
    var pic_side_width = 0,
        screen_height = window.deviceHeight,
        screen_width = window.deviceWidth,
        div_width = screen_width,
        image_width = div_width-16,
        image_height = screen_height-20,
        scroll_width = recommendinfo_dish && recommendinfo_dish.image && (recommendinfo_dish.image.length * div_width);
        
    htmls.push('    <div id="wrapper_dish" class="wrapper_dish"  onclick="stopBubble(event);">');
    htmls.push('    <div id="scroller_dish" class="dish_pic_list_con" style="width:'+ (scroll_width + pic_side_width*2) +'px">');
    htmls.push("<ul>"); 
    //alert(image_width);
    //alert(image_height);
    for(var i=0;i<recommendinfo_dish.image.length;i++){
            //htmls.push("<div class='dish_item' style='width:"+div_width+"px'><div class='dish_item_inner'><li><div style='width:"+image_width+"px;height:"+image_height+"px;background:url(\"http://map.baidu.com/maps/services/thumbnails?width="+image_width+"&height="+image_height+"&align=center,center&src="+recommendinfo_dish.image[i].imgUrl+"\") no-repeat;background-size:"+image_width+"px "+image_height+"px;background-position:center' class='dish_image'></div><div class='commodity_name'>"+recommendinfo_dish.commodity_name+"</div><div class='dish_absolute'>"+recommendinfo_dish.recommend_num+"次推荐</div><div class='clear_both'></div></li><div class='shadow_left'></div><div class='shadow_right'></div></div></div>");

            htmls.push("<div class='dish_item' style='width:"+div_width+"px'><div class='dish_item_inner'><li><div style='width:"+image_width+"px;height:"+image_height+"px;' class='dish_image'><img src='http://map.baidu.com/maps/services/thumbnails?width="+image_width+"&height="+image_height+"&align=center,center&src="+recommendinfo_dish.image[i].imgUrl+"' width='"+image_width+"px' height='"+image_height+"px' onload='javascript:scaleImage(this,"+image_width+","+image_height+");if(this.parentNode){this.parentNode.style.backgroundImage=\"none\"}' onerror=\"javascript(){}\" style='display:none' /></div><div class='clear_both'></div></li></div></div>");

            //htmls.push("<div class='dish_item'><div class='dish_item_inner'><li><div style='height:"+image_height+"px;background:url(\"http://map.baidu.com/maps/services/thumbnails?width=270&height="+image_height+"&align=center,center&src="+recommendinfo_dish.image[i].imgUrl+"\") no-repeat;background-size:100%;background-position:center' class='dish_image'></div><div class='commodity_name'>"+recommendinfo_dish.commodity_name+"</div><div class='dish_absolute'>"+recommendinfo_dish.recommend_num+"次推荐</div><div class='clear_both'></div></li><div class='shadow_left'></div><div class='shadow_right'></div></div></div>");

            //htmls.push("<div class='dish_item'><div class='dish_item_inner'><li><div style='height:"+image_height+"px;background:url(\"http://map.baidu.com/maps/services/thumbnails?width=270&height="+image_height+"&align=center,center&src="+recommendinfo_dish.image[i].imgUrl+"\") no-repeat;background-position:center' class='dish_image'></div><div class='commodity_name'>"+recommendinfo_dish.commodity_name+"</div><div class='dish_absolute'>"+recommendinfo_dish.recommend_num+"次推荐</div><div class='clear_both'></div></li><div class='shadow_left'></div><div class='shadow_right'></div></div></div>");
    }
    //<div class='commodity_name'>"+recommendinfo_dish.commodity_name+"</div><div class='dish_absolute'>"+recommendinfo_dish.recommend_num+"次推荐</div>
    //<div class='shadow_left'></div><div class='shadow_right'></div>

	htmls.push("</ul>");
    if(!haveData){
        //插入HTML代码
        T.g("recommendinfoCon").innerHTML = htmls.join('');
        T.g("recommendinfo_index").style.display = '';
        //T.g("recommendinfo_subinfo_name").innerHTML = recommendinfo_dish.commodity_name;
        document.getElementsByTagName("title")[0].innerText = recommendinfo_dish.commodity_name || '网友推荐';
    }
    addDishAnimation(recommendinfo_dish.image.length, div_width);
}
function addDishAnimation(numCount, pageWidth) {
    var wrapper = T.g('wrapper_dish') || '';

    if(!(wrapper)){
        return;
    }
    var _goto_num = numCount > 1 ? 1 : numCount -1;

    window['dishScroll'] = new iScroll(wrapper, {
        snap: true,
        momentum: false,
        hScrollbar: false,
        vScroll :false,
        x : - (_goto_num * pageWidth),
        currPageX : _goto_num,
        wrapperW : pageWidth
     });
}

function scaleImage(ImgD,imageWidth,imageHeight){
    //参数(图片,允许的宽度,允许的高度)
    var iwidth = imageWidth,
        iheight = imageHeight,
        topHei = 0,
        image=new Image();

    image.onload=function(){
        if(this.width>0 && this.height>0){
            if(this.width/this.height>= iwidth/iheight){
                if(this.width>iwidth){
                    ImgD.width=iwidth;
                    ImgD.height=(this.height*iwidth)/this.width;
                }else{
                    ImgD.width=this.width;  
                    ImgD.height=this.height;
                }
            }
            else{
                if(this.height>iheight){  
                    ImgD.height=iheight;
                    ImgD.width=(this.width*iheight)/this.height;        
                }else{
                    ImgD.width=this.width;  
                    ImgD.height=this.height;
                }
            }

            ImgD.style.marginTop = ((iheight - ImgD.height)/2 - topHei) + 'px';
//            ImgD.style.marginBottom = (document.body.clientHeight - hei - ImgD.height)/2 + 'px';
            ImgD.style.display = 'none';
            ImgD.style.display = 'block';
            //ImgD.parentNode.style.background="url(\""+ImgD.src+"\") no-repeat";
            //ImgD.parentNode.style.backgroundSize=ImgD.width+"px "+ImgD.height+"px";
            //ImgD.parentNode.style.backgroundPosition="center";
            //当图片加载完成后，删除_src 的值;
            ImgD.setAttribute('_src','');
        }
    };
  
    image.src=ImgD.src;
}

function stopBubble(e) { 
//如果提供了事件对象，则这是一个非IE浏览器 
    if ( e && e.stopPropagation ) 
    //因此它支持W3C的stopPropagation()方法 
    e.stopPropagation(); 
     else 
    //否则，我们需要使用IE的方式来取消事件冒泡 
    window.event.cancelBubble = true; 
} 

function setBodyHeight() {
//    if(window.mobileType == 'android'){
//        var viewport = document.querySelector("meta[name=viewport]");
//        viewport.setAttribute('content', 'width=device-width,height=device-height,minimum-scale=1.0,maximum-scale=10,user-scalable=no');
//    }
    window.deviceWidth = document.documentElement.clientWidth;
    window.deviceHeight = document.documentElement.clientHeight;
}

/*by jgd
window.pubTestInfo={
    "content": {
        "ext": {
            "detail_info": {
                "name": "\u8fa3\u5c1a\u763e\u4ea4\u5927\u5e97",
                "address": "\u6d77\u6dc0\u533a\u4ea4\u901a\u5927\u5b66\u8def8\u53f7(\u4ea4\u5927\u5357\u95e8\u4e1c200\u7c73\u8def\u5357)",
                "phone": "010-62253137",
                "point": {
                    "x": "12952529.88",
                    "y": "4831717.61"
                },
                "price": "51",
                "overall_rating": "5.0",
                "checkin_num": 623,
                "comment_num": 2319,
                "tag": "\u70e4\u9c7c,\u5317\u4e0b\u5173",
                "premium2": [{
                    "discount_id": "172608",
                    "discount_title": "\u8fa3\u5c1a\u763e\u4ea4\u5927\u5e978\u6298",
                    "discount_content": "\u51ed\u6b64\u5238\u53ef\u4eab\u53d7\u8fa3\u5c1a\u763e\u4ea4\u5927\u5e978\u6298\u4f18\u60e0\u6216\u6d88\u8d39\u6bcf\u6ee1100\u5143\u7acb\u51cf30\u5143(\u9152\u6c34\u3001\u7279\u4ef7\u83dc\u9664\u5916)\u81ea\u5e26\u9152\u6c34\u4e0d\u4eab\u53d7\u4f18\u60e0 \u6d88\u8d39\u524d\u5411\u5546\u5bb6\u51fa\u793a,\u6b64\u4f18\u60e0\u7531\u4e00\u5361\u60e0\u6253\u6298\u7f51\u63d0\u4f9b,\u6295\u8bc9\u7535\u8bdd4006967797",
                    "discount_tm": "1",
                    "discount_photo": "http:\/\/www.ekave.cn\/imageupload\/image\/20120831111257_6.jpg",
                    "discount_remark": "\u6b64\u4f18\u60e0\u4e0d\u4e0e\u5e97\u5185\u5176\u4ed6\u4f18\u60e0\u6d3b\u52a8\u540c\u4eab\uff0c\u6d88\u8d39\u524d\u51fa\u793a\u4f18\u60e0\u5238\u77ed\u4fe1",
                    "discount_store_num": "6",
                    "discount_start": "2012-11-06",
                    "discount_end": "2013-08-31",
                    "discount_effective_start": "2012-09-01",
                    "discount_effective_end": "2013-08-31",
                    "dl": "200+",
                    "discount_offline": 0,
                    "discount_dl": "420",
                    "discount_src": {
                        "cn_name": "\u4e00\u5361\u60e0\u6253\u6298\u7f51",
                        "en_name": "yikahui",
                        "phone": "\u5ba2\u670d\u70ed\u7ebf4006977797",
                        "tips": ""
                    }
                }],
                "groupon": [{
                    "groupon_title": "\u8fa3\u5c1a\u763e!\u4ec5\u552e88\u5143,\u4ef7\u503c161-171\\\/174\u5143\u53cc\u4eba\u70e4\u9c7c\\\/\u9ebb\u8fa3\u9999\u9505\u5957\u99102\u90091!6\u5e97\u901a\u7528!\u9c9c\u8fa3\u6ecb\u5473,\u706b\u8fa3\u9b45\u529b,\u5c31\u6b64\u4e0a\u763e!",
                    "groupon_url_pc": "http%3A%2F%2Ftuan.baidu.com%2Fgoods_13119938%3Fsource%3Dmap",
                    "groupon_url_mobile": "http:\/\/tuan.baidu.com\/redirect?from=bdmapwise&url=http%3A%2F%2Fm.dianping.com%2Ftuan%2Fredirect%3Fdid%3D88679",
                    "groupon_start": "2012-11-27",
                    "groupon_end": "2013-01-30",
                    "regular_price": "174",
                    "groupon_price": "88",
                    "groupon_rebate": "5.1",
                    "groupon_type": "1",
                    "groupon_image": "http%3A%2F%2Ftuanimg0.baidu.com%2Fdata%2F2_17f8ed69f58188242b6e00467cf16723",
                    "groupon_num": "3755",
                    "groupon_site": "http%3A%2F%2Ft.dianping.com%2Fredirect%3Futm_source%3Dtuan_baidu%26amp%3Bcityname%3Dbeijing",
                    "cn_name": "\u5927\u4f17\u70b9\u8bc4"
                }],
                "link": [{
                    "cn_name": "\u5927\u4f17\u70b9\u8bc4",
                    "name": "dianping",
                    "url": "http:\/\/www.dianping.com\/shop\/2987527"
                }, {
                    "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
                    "name": "shenbian",
                    "url": "http:\/\/s.baidu.com\/shop\/5aed06355903761c8b70af7b"
                }, {
                    "cn_name": "\u996d\u7edf",
                    "name": "fantong",
                    "url": "http:\/\/www.fantong.com\/biz-85208\/"
                }],
                "di_review_keyword": null,
                "_validate": 1,
                "origin_id": {
                    "lbc_uid": "1616251858161220715"
                },
                "review_flag": 1,
                "premium_flag": 0
            },
            "rich_info": {
                "description": "\u670d\u52a1\u6001\u5ea6\u201c\u633a\u4e0d\u9519\u201d\uff0c\u8fdb\u95e8\u5c31\u201c\u7b11\u8138\u76f8\u8fce\u201d\u3002\u4e3b\u6253\u70e4\u9c7c\u548c\u9ebb\u8fa3\u9999\u9505\uff0c\u5473\u9053\u90fd\u201c\u4e0d\u9519\u201d\u3002\u5c24\u5176\u559c\u6b22\u9ebb\u8fa3\u9999\u9505\uff0c\u8981\u5fae\u8fa3\u5c31\u591f\u4e86\uff0c\u5403\u8d77\u6765\u201c\u4e0d\u89c9\u5f97\u71e5\u201d\uff1b\u83dc\u53ef\u4ee5\u201c\u70b9\u534a\u4efd\u201d\uff0c\u4eba\u591a\u805a\u4f1a\u65f6\uff0c\u65b9\u4fbf\u201c\u517c\u987e\u201d\u5176\u4ed6\u51fa\u54c1\uff0c\u6bcf\u6837\u90fd\u5c1d\u5c1d\u3002\u51c9\u83dc\u63a8\u8350\u84dd\u8393\u5c71\u836f\uff0c\u505a\u5f97\u201c\u5f88\u7ec6\u201d\uff0c\u53ef\u4ee5\u5f53\u201c\u751c\u54c1\u201d\u5403\uff0c\u89e3\u8fa3\u3002",
                "shop_hours": "11\uff1a00-22\uff1a00",
                "atmosphere": ",,\u670b\u53cb\u805a\u9910,\u60c5\u4fa3\u7ea6\u4f1a,\u5bb6\u5ead\u805a\u4f1a,\u968f\u4fbf\u5403\u5403,\u4f11\u95f2\u5c0f\u61a9,\u5546\u52a1\u5bb4\u8bf7",
                "featured_service": ",\u53ef\u4ee5\u5237\u5361,\u514d\u8d39\u505c\u8f66,\u6709\u9732\u5929\u4f4d,\u53ef\u4ee5\u505c\u8f66,\u53ef\u4ee5\u5305\u573a",
                "recommendation": ",\u9ebb\u8fa3\u9999\u9505,\u70e4\u9c7c,\u84dd\u8393\u5c71\u836f,\u9178\u6885\u6c64,\u9e21\u7fc5,\u9999\u8fa3\u70e4\u9c7c,\u6cb9\u8c46\u76ae,\u83b2\u85d5",
                "recommend_commodity": [{
                    "commodity_name": "\u9ebb\u8fa3\u9999\u9505",
                    "recommend_num": "1040",
                    "image": [{
                        "imgUrl": "http:\/\/i1.dpfile.com\/pc\/d2e1c480dcbdab94cb2dbc790483161e(249x249)\/thumb.jpg",
                        "name": "dianping",
                        "cn_name": "\u5927\u4f17\u70b9\u8bc4"
                    },
                    {
                        "imgUrl": "http:\/\/i1.dpfile.com\/pc\/d2e1c480dcbdab94cb2dbc790483161e(249x249)\/thumb.jpg",
                        "name": "dianping",
                        "cn_name": "\u5927\u4f17\u70b9\u8bc4"
                    },
                    {
                        "imgUrl": "http:\/\/i1.dpfile.com\/pc\/d2e1c480dcbdab94cb2dbc790483161e(249x249)\/thumb.jpg",
                        "name": "dianping",
                        "cn_name": "\u5927\u4f17\u70b9\u8bc4"
                    },
                    {
                        "imgUrl": "http:\/\/i1.dpfile.com\/pc\/d2e1c480dcbdab94cb2dbc790483161e(249x249)\/thumb.jpg",
                        "name": "dianping",
                        "cn_name": "\u5927\u4f17\u70b9\u8bc4"
                    }]
                }, {
                    "commodity_name": "\u70e4\u9c7c",
                    "recommend_num": "690",
                    "image": [{
                        "imgUrl": "http:\/\/i1.dpfile.com\/pc\/1cf7a0224d3f235bbdd5d1d12f72f6d4(249x249)\/thumb.jpg",
                        "name": "dianping",
                        "cn_name": "\u5927\u4f17\u70b9\u8bc4"
                    }]
                }, {
                    "commodity_name": "\u84dd\u8393\u5c71\u836f",
                    "recommend_num": "644",
                    "image": [{
                        "imgUrl": "http:\/\/i1.dpfile.com\/pc\/afeccf12e210cf220371d8d44899b340(249x249)\/thumb.jpg",
                        "name": "dianping",
                        "cn_name": "\u5927\u4f17\u70b9\u8bc4"
                    }]
                }, {
                    "commodity_name": "\u9178\u6885\u6c64",
                    "recommend_num": "488",
                    "image": [{
                        "imgUrl": "http:\/\/i3.dpfile.com\/pc\/9c5d855380ad83107c675e2e21299b91(249x249)\/thumb.jpg",
                        "name": "dianping",
                        "cn_name": "\u5927\u4f17\u70b9\u8bc4"
                    }]
                }, {
                    "commodity_name": "\u9e21\u7fc5",
                    "recommend_num": "264",
                    "image": [{
                        "imgUrl": "http:\/\/i1.dpfile.com\/2009-07-20\/2370245_b.jpg(249x249)\/thumb.jpg",
                        "name": "dianping",
                        "cn_name": "\u5927\u4f17\u70b9\u8bc4"
                    }]
                }, {
                    "commodity_name": "\u9999\u8fa3\u70e4\u9c7c",
                    "recommend_num": "39",
                    "image": [{
                        "imgUrl": "http:\/\/i1.fantong.cn\/middle\/c49eb647eff34c8a6662c4b4b0c90173",
                        "name": "fantong",
                        "cn_name": "\u996d\u7edf"
                    }]
                }, {
                    "commodity_name": "\u6cb9\u8c46\u76ae",
                    "recommend_num": "37",
                    "image": [{
                        "imgUrl": "http:\/\/i2.fantong.cn\/middle\/b9ac90718ecad4be283ba61a05dc050f",
                        "name": "fantong",
                        "cn_name": "\u996d\u7edf"
                    }]
                }, {
                    "commodity_name": "\u83b2\u85d5",
                    "recommend_num": "36",
                    "image": [{
                        "imgUrl": "http:\/\/i1.fantong.cn\/middle\/b124837827db2685485850ee2fb8d150",
                        "name": "fantong",
                        "cn_name": "\u996d\u7edf"
                    }]
                }],
                "reservation": [{
                    "phone": "4006177177",
                    "discount": null,
                    "url": "http:\/\/www.fantong.com\/biz-order-85208\/"
                }]
            },
            "review": [{
                "cn_name": "\u5927\u4f17\u70b9\u8bc4",
                "from": "dianping.com",
                "name": "dianping",
                "review_num": "2171",
                "url": "2171",
                "info": [{
                    "content": "\u672c\u6765\u60f3\u53bb\u5403\u70e4\u8089\u7684\uff0c\u7ed3\u679c\u56e0\u4e3a\u4eba\u592a\u591a\uff0c\u6240\u4ee5\u6765\u5230\u4e86\u8fd9\u91cc\u3002\u8981\u4e86\u4e00\u4efd\u9ebb\u8fa3\u9999\u9505\uff0c\u4e00\u4efd\u9999\u8fa3\u70e4\u9c7c\uff0c\u5473\u9053\u90fd\u4e0d\u9519\uff0c\u70e4\u9c7c\u5473\u9053\u504f\u91cd\uff0c\u6211\u559c\u6b22\u3002\u70b9\u7684\u9ebb\u8fa3\u9999\u9505\u662f\u4e01\u70b9\u513f\u8fa3\uff0c\u6240\u4ee5\u5bf9\u4e8e\u6211\u8fd9\u79cd\u662f\u8fa3\u5982\u547d\u7684\u4eba\u6765\u8bf4\uff0c\u6839\u672c\u6ca1\u5565\u7279\u6b8a\u5473\u9053\uff0c\u4e0d\u8fc7\u5403\u7684\u51fa\u6765\u8fa3\u6912\u7684\u9999\u5473\uff0c\u4f46\u662f\u4e24\u4e2a\u670b\u53cb\u5374\u5df2\u7ecf\u6ee1\u5934\u5927\u6c57\u4e86\uff0c\u5475\u5475\uff0c\u8fd9\u91cc\u7b26\u5408\u5927\u4f17\u53e3\u5473\u3002\u6211\u6bd4\u8f83\u559c\u6b22\u4ed6\u4eec\u5bb6\u7684\u70e4\u9c7c\uff0c\u5f88\u6b63\u5b97\u7684\uff0c\u5473\u9053\u5f88\u597d\u3002",
                    "date": "12-12-14 20:25",
                    "user_name": "\u65e0\u975e\u822c\u82e5",
                    "user_logo": "http:\/\/i1.dpfile.com\/pc\/5569c0ab2866959a50a7f22c7640e013(48c48)\/thumb.jpg",
                    "user_url": "http:\/\/www.dianping.com\/member\/1042090",
                    "overall_rating": 4,
                    "taste_rating": "4.0",
                    "environment_rating": "3.0",
                    "service_rating": "3.0",
                    "price": "59",
                    "one_url": "http:\/\/www.dianping.com\/review\/36772610#fn",
                    "time_stamp": 1355487900
                }]
            }, {
                "cn_name": "\u996d\u7edf",
                "from": "fantong.com",
                "name": "fantong",
                "review_num": "143",
                "url": "143",
                "info": [{
                    "content": "\u8fa3\u5c1a\u763e\uff0c\u672c\u8eab\u4ee5\u4e3a\u662f\u5ddd\u83dc\u9986\uff0c\u8fdb\u53bb\u53d1\u73b0\u53ea\u6709\u70e4\u9c7c \u9ebb\u8fa3\u9999\u9505\u56db\u79cd\u4e3b\u83dc\uff0c\u7136\u540e\u70b9\u914d\u83dc\uff0c\u548c\u60f3\u8c61\u4e2d\u7684\u4e0d\u4e00\u6837\u3002\u70e4\u9c7c\u5473\u9053\u4e00\u822c\uff0c\u6709\u4e9b\u7cca\u4e86\u3002\u83dc\u54c1\u5b9e\u5728\u4e0d\u6562\u606d\u7ef4\u3002\u4e0d\u8fc7\u670d\u52a1\u5f88\u597d\uff01\u73af\u5883\u4e5f\u86ee\u4e0d\u9519\u7684\uff0c\u5475\u5475",
                    "date": "2012-10-26 15:58:03",
                    "user_name": "maxinxin",
                    "user_logo": "http:\/\/www.fantong.com\/user\/head\/4322728",
                    "user_url": "http:\/\/www.fantong.com\/user\/4322728\/member",
                    "overall_rating": 4,
                    "taste_rating": "4.0",
                    "environment_rating": "3.0",
                    "service_rating": "3.0",
                    "price": "80.00",
                    "one_url": null,
                    "time_stamp": 1351238283
                }]
            }, {
                "from": "s.baidu.com",
                "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
                "name": "shenbian",
                "review_num": "71",
                "info": [{
                    "content": "\u670d\u52a1\u5468\u5230",
                    "date": "2012-08-10 18:44:52",
                    "id": "999139",
                    "user_name": "Viagra",
                    "user_logo": "http:\/\/hiphotos.baidu.com\/view\/abpic\/item\/37d12f2eb9389b50bd6c47108535e5dde6116ee5.jpg",
                    "price": "80",
                    "rating": {
                        "\u53e3\u5473": 0,
                        "\u670d\u52a1": 0,
                        "\u73af\u5883": 0
                    },
                    "one_url": "http:\/\/s.baidu.com\/comment\/b18971e539fc12c53068e8a2",
                    "overall_rating": "5"
                }, {
                    "content": "\u73af\u5883\u4e00\u822c\u4f46\u662f\u670d\u52a1\u8fd8\u662f\u86ee\u4e0d\u9519\u5566\uff01\u9ebb\u8fa3\u9999\u9505\u7684\u5473\u9053\u4e5f\u8fd8\u4e0d\u9519\uff01\u9178\u6885\u6c64\u5f88\u597d\u559d\u5fae\u5fae\u6709\u70b9\u504f\u751c\uff01",
                    "date": "2012-06-22 17:11:43",
                    "id": "964814",
                    "user_name": "\u6674\u6674\u7684\u79d8\u5bc6\u82b1\u56ed",
                    "user_logo": "http:\/\/hiphotos.baidu.com\/view\/abpic\/item\/b7003af33a87e950def3b5d310385343faf2b4ad.jpg",
                    "price": "0",
                    "rating": {
                        "\u53e3\u5473": 0,
                        "\u670d\u52a1": 0,
                        "\u73af\u5883": 0
                    },
                    "one_url": "http:\/\/s.baidu.com\/comment\/fe5efc160e06bcf85236c624",
                    "overall_rating": "5"
                }, {
                    "content": "\u7231\u5403\u9ebb\u8fa3\u9999\u9505\u548c\u70e4\u9c7c\u7684\u4eba\u5c31\u80af\u5b9a\u4f1a\u53bb\u5566~~~\u5473\u9053\u8fd8\u662f\u5f88\u4e0d\u9519\u7684\u561b\uff0c\u5c24\u5176\u662f\u70e4\u9c7c\uff0c\u6211\u89c9\u5f97\u6bd4\u9ebb\u8fa3\u9999\u9505\u505a\u7684\u66f4\u597d\u5403\uff0c\u5403\u9ebb\u8fa3\u9999\u9505\u7684\u8bdd\u8fd8\u662f\u8981\u8003\u8651\u5ddd\u6210\u56ed\u561b\uff0c\u89c9\u5f97\u90a3\u4e2a\u66f4\u5730\u9053\u4e9b~~~~~\n\u70e4\u9c7c\u70e4\u9c7c\uff0c\u60f3\u5403\u4e86~~~~~~",
                    "date": "2012-06-10 18:41:16",
                    "id": "950453",
                    "user_name": "\u5706\u561f\u561f\u7684\u732b\u541b",
                    "user_logo": "http:\/\/hiphotos.baidu.com\/view\/abpic\/item\/a08b87d6277f9e2f9a2252a11f30e924b899f300.jpg",
                    "price": "0",
                    "rating": {
                        "\u53e3\u5473": 5,
                        "\u670d\u52a1": 5,
                        "\u73af\u5883": 5
                    },
                    "one_url": "http:\/\/s.baidu.com\/comment\/5efc398cbc0950f1b83cd91c",
                    "overall_rating": "5"
                }, {
                    "content": "\u662f\u6211\u5f88\u559c\u6b22\u7684\u4e00\u5bb6\u70e4\u9c7c\u5e97\uff0c\u5728\u5317\u4eac\u5403\u8fc7\u7684\u70e4\u9c7c\u91cc\u6700\u559c\u6b22\u5403\u7684\u3002\u73af\u5883\u4e5f\u8fd8\u884c\uff0c\u6bcf\u6b21\u53bb\u5f97\u65f6\u5019\u90fd\u4f1a\u6392\u8001\u957f\u7684\u961f\u3002\u6211\u662f\u897f\u5357\u7684\uff0c\u559c\u6b22\u5403\u8fa3\u3002\u5e97\u91cc\u7684\u9c7c\u9ebb\u8fa3\u5473\u7684\u8db3\u591f\u4e86\u3002\u53bb\u4e86N\u56de\u3002",
                    "date": "2012-05-29 17:53:21",
                    "id": "918551",
                    "user_name": "\u4e1c\u5317\u4e50\u5929\u599e",
                    "user_logo": "http:\/\/hiphotos.baidu.com\/view\/abpic\/item\/f603918fa0ec08fac798bc0259ee3d6d54fbdaff.jpg",
                    "price": "0",
                    "rating": {
                        "\u53e3\u5473": 5,
                        "\u670d\u52a1": 5,
                        "\u73af\u5883": 5
                    },
                    "one_url": "http:\/\/s.baidu.com\/comment\/b228fcd9a7e9d9bba8233f98",
                    "overall_rating": "5"
                }, {
                    "content": "\u6211\u89c9\u5f97\u5473\u9053\u4e0d\u9519\uff0c\u70e4\u9c7c\u5f88\u597d\u5403\uff0c\u5916\u7126\u91cc\u5ae9\u3002\u63a8\u8350\u7ea2\u8c46\u9178\u5976\u5427\uff0c\u5f88\u597d\u5403\uff0c\u4ef7\u94b1\u4e5f\u53ef\u4ee5\u63a5\u53d7\uff0c\u9002\u5408\u540c\u5b66\u805a\u4f1a\uff0c\u5468\u672b\u4e5f\u662f\u8981\u6392\u53f7\u7684\uff0c\u751f\u610f\u8fd8\u4e0d\u9519\u3002",
                    "date": "2012-04-29 17:23:05",
                    "id": "891563",
                    "user_name": "\u4e91\u5f69\u4e2d\u7684\u4e00\u6ef4\u6c34",
                    "user_logo": "http:\/\/hiphotos.baidu.com\/view\/abpic\/item\/37d3d539b6003af3631aeac4352ac65c1138b6f5.jpg",
                    "price": "0",
                    "rating": {
                        "\u53e3\u5473": 5,
                        "\u670d\u52a1": 5,
                        "\u73af\u5883": 5
                    },
                    "one_url": "http:\/\/s.baidu.com\/comment\/4571ebd5a298592835b3a206",
                    "overall_rating": "5"
                }],
                "url": "http:\/\/s.baidu.com\/shop\/5aed06355903761c8b70af7b\/#commentList",
                "src_url": "http:\/\/s.baidu.com\/shop\/5aed06355903761c8b70af7b"
            }],
            "src_name": "cater",
            "image": {
                "all": [{
                    "imgUrl": "http:\/\/i3.dpfile.com\/2010-06-10\/4479128_m.jpg",
                    "name": "dianping",
                    "cn_name": "\u5927\u4f17\u70b9\u8bc4"
                }, {
                    "imgUrl": "http:\/\/i0.fantong.cn\/middle\/0801e4ab670fb3ab57f480ac1b046bb3",
                    "name": "fantong",
                    "cn_name": "\u996d\u7edf"
                }, {
                    "name": "shenbian",
                    "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
                    "imgUrl": "http:\/\/d.hiphotos.baidu.com\/shenbian\/w%3D640\/sign=2207c2dfb319ebc4c078759db227cf79\/1c950a7b02087bf451e7aa53f2d3572c11dfcf05.jpg",
                    "link": "http:\/\/s.baidu.com\/shop\/album\/5aed06355903761c8b70af7b\/0\/",
                    "photo_num": "61",
                    "create_time": "1332404127",
                    "src_url": "http:\/\/s.baidu.com\/shop\/5aed06355903761c8b70af7b"
                }, {
                    "name": "shenbian",
                    "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
                    "imgUrl": "http:\/\/e.hiphotos.baidu.com\/shenbian\/w%3D640\/sign=6a32bee50c3387449cc52c78610ed937\/5882b2b7d0a20cf4adbb1e6a76094b36acaf9958.jpg",
                    "link": "http:\/\/s.baidu.com\/shop\/album\/5aed06355903761c8b70af7b\/0\/",
                    "photo_num": "61",
                    "create_time": "1329563625",
                    "src_url": "http:\/\/s.baidu.com\/shop\/5aed06355903761c8b70af7b"
                }, {
                    "name": "shenbian",
                    "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
                    "imgUrl": "http:\/\/a.hiphotos.baidu.com\/shenbian\/w%3D640\/sign=81253aa6b6fd5266a72b3f109b199799\/cefc1e178a82b9014a7ef57e738da9773812efaf.jpg",
                    "link": "http:\/\/s.baidu.com\/shop\/album\/5aed06355903761c8b70af7b\/0\/",
                    "photo_num": "61",
                    "create_time": "1325057042",
                    "src_url": "http:\/\/s.baidu.com\/shop\/5aed06355903761c8b70af7b"
                }, {
                    "name": "shenbian",
                    "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
                    "imgUrl": "http:\/\/a.hiphotos.baidu.com\/shenbian\/w%3D640\/sign=53ddaffe8c5494ee87220c1d1df5e0e1\/94cad1c8a786c917df3d7c78c93d70cf3bc757b0.jpg",
                    "link": "http:\/\/s.baidu.com\/shop\/album\/5aed06355903761c8b70af7b\/0\/",
                    "photo_num": "61",
                    "create_time": "1317706814",
                    "src_url": "http:\/\/s.baidu.com\/shop\/5aed06355903761c8b70af7b"
                }, {
                    "name": "shenbian",
                    "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
                    "imgUrl": "http:\/\/d.hiphotos.baidu.com\/shenbian\/w%3D640\/sign=fb0f6a6dafc379317d68852ddbc5b784\/a8014c086e061d9589849f537bf40ad163d9ca9f.jpg",
                    "link": "http:\/\/s.baidu.com\/shop\/album\/5aed06355903761c8b70af7b\/0\/",
                    "photo_num": "61",
                    "create_time": "1304231083",
                    "src_url": "http:\/\/s.baidu.com\/shop\/5aed06355903761c8b70af7b"
                }, {
                    "name": "shenbian",
                    "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
                    "imgUrl": "http:\/\/h.hiphotos.baidu.com\/shenbian\/w%3D640\/sign=b7ab7c4395cad1c8d0bbff234f3f67c4\/d1160924ab18972b53e26ca6e6cd7b899f510a85.jpg",
                    "link": "http:\/\/s.baidu.com\/shop\/album\/5aed06355903761c8b70af7b\/0\/",
                    "photo_num": "61",
                    "create_time": "1304087506",
                    "src_url": "http:\/\/s.baidu.com\/shop\/5aed06355903761c8b70af7b"
                }, {
                    "name": "shenbian",
                    "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
                    "imgUrl": "http:\/\/e.hiphotos.baidu.com\/shenbian\/w%3D640\/sign=1c1295a1513d26972ed30b5965fab24f\/5ab5c9ea15ce36d369c72b5b3af33a87e850b19e.jpg",
                    "link": "http:\/\/s.baidu.com\/shop\/album\/5aed06355903761c8b70af7b\/0\/",
                    "photo_num": "61",
                    "create_time": "1303905924",
                    "src_url": "http:\/\/s.baidu.com\/shop\/5aed06355903761c8b70af7b"
                }, {
                    "name": "shenbian",
                    "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
                    "imgUrl": "http:\/\/c.hiphotos.baidu.com\/shenbian\/w%3D640\/sign=61ed2d25ca8065387beaa717a7dca115\/a6efce1b9d16fdfa5daf6e85b48f8c5495ee7b9e.jpg",
                    "link": "http:\/\/s.baidu.com\/shop\/album\/5aed06355903761c8b70af7b\/0\/",
                    "photo_num": "61",
                    "create_time": "1303893594",
                    "src_url": "http:\/\/s.baidu.com\/shop\/5aed06355903761c8b70af7b"
                }, {
                    "name": "shenbian",
                    "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
                    "imgUrl": "http:\/\/g.hiphotos.baidu.com\/shenbian\/w%3D640\/sign=fec7ce18fbf2b211e42e864afa816511\/e4dde71190ef76c6491053409d16fdfaae51679f.jpg",
                    "link": "http:\/\/s.baidu.com\/shop\/album\/5aed06355903761c8b70af7b\/0\/",
                    "photo_num": "61",
                    "create_time": "1303563429",
                    "src_url": "http:\/\/s.baidu.com\/shop\/5aed06355903761c8b70af7b"
                }]
            }
        },
        "uid": "6e0d820b4e2acca33913fdd3",
        "name": "\u8fa3\u5c1a\u763e\u4ea4\u5927\u5e97",
        "geo": "1|12952529.88,4831717.61;12952529.88,4831717.61|12952529.88,4831717.61;"
    }
}*/