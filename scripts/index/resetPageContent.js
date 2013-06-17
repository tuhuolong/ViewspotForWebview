/**
 * place
 */


/*
 *重置页面内容   
 */
var resetTemp = {};
function resetPageContent(type) {
    
    type = type || 'default';

    //需要隐藏的元素
    var hiddenElements = ['telYlCon',
                          'telCon',
                          'saleInfo',
                          'rebateInInfo',
                          'movieCon',
                          'theatreCon',
                          'richCon',
                          'seatCon',
                          'picCon',
                          'noPicCon',
                          'ktvCon',
                          'pubImpression',
                          'commCon',
                          'noCommCon',
                          'moreCon',
                          'grouponInfo',
                          'saleGrouponCon',
                          'rankInfo',
                          'rankListInfo',
                          'rankCon',
                          'venueCon',
                          'floorCon',
                          'oril_info',
                          'viewSpotPro',
                          'viewSpotSitePro',
                          'viewSpotPrice',
                          'viewStrategy',
                          'realtimeInfo',
                          'bookOnline',
                          'hotelOTA',
                          'ota_start_id',
                          'ota_end_id',
                          'teleOrder',
                          'viewSpotTicket',
                          'bookTelOrderCon',
                          'tongcheng',
                          'myShop'
        ];
    var noHidden = {
        'checkData':{
            'hotelOTA' : 1,
            'realtimeInfo' : 1
        }
    };

    //页面滚动至顶部;
    window.scrollTo(0,0);

    if(T.g('baseInfoPic')){
//        var place_type = (window.poiInfo && window.poiInfo.src_name) || 'defalt';
        T.g('baseInfoPic').style.backgroundImage = 'url("../img/defalt_banner.png")';
    }
    //清除头部样式;
    if(T.g('basicInfo')){
        T.removeClass(T.g('basicInfo'),'noMoreStyle');
    }
    if(T.g('ota_start_id')){
        document.body.removeChild(T.g('ota_start_id')); 
    }
    if(T.g('ota_end_id')){
         document.body.removeChild(T.g('ota_end_id'));  
    }
    //隐藏所有需要隐藏的元素;
    for(var i=0,l=hiddenElements.length;i<l;i++){
        var id = hiddenElements[i];
            _dom = T.g(id);

        if(!(noHidden[type] && noHidden[type][id]) &&_dom){
            _dom.style.display = 'none';
        }
    }

    //ota酒店电话
    if(T.g('telNumCon')){
        T.removeClass(T.g('telNumCon').parentNode,'tel_style');
    }

    //清空页面上的临时信息;
    window.resetTemp = {};
        
}

/**
 * place
 */

/**
 *渲染空模板;
 */
function fillEmptyTemplate() {
    //只对首页进行空模板加载；
    if(window.templateType != 'index'){
        return;
    }
    var data = {"detail_info" : {
                    "image":"",
                    "overall_rating":"",
                    "price":""
                }
        };
    fillTemplate(data, window.poiInfo.uid, {type: 'emptyData'});
}
