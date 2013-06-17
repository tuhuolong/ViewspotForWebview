
/**
 * 景点门票
 * @author fuen
 * @param {Object} extD  json
 * @param {Object} opts  可选参数
 */

/*var ticketData = {"rich_info":
    {
        "scope_type":"xxx",//scope:类型，如山峰
        "scope_grade":"AAA", //景点等级如AAA
        "shop_hours":"xxxx", //景点的营业时间
        "official_web":"http://xxx", //官网的url
        "official_web_mb":"http://xxx", //手机端官网
        "is_site":"", //是否是景点，1：景点 0：景区，景区有子景点
        "description":"xxx",//景点的描述 ，景点特有
        "scope_reserve":[{
            "type":"xx", //门票的类型 如: 成人票(特惠团购)
            "orign_price":"xx",//原价
            "price":"xx",//现价
            "url_reserve":"", //预定的pc端里面
            "url_reserve_mb":""//预定的客户端的连接
        },{
            "type":"成人票(特惠团购)成人票(特惠团购)成人票(特惠团购)成人票(特惠团购)", //门票的类型 如: 成人票(特惠团购)
            "orign_price":"xx",//原价
            "price":"xx",//现价
            "url_reserve":"", //预定的pc端里面
            "url_reserve_mb":""//预定的客户端的连接
        },{
            "type":"xx", //门票的类型 如: 成人票(特惠团购)
            "orign_price":"11x",//原价
            "price":"100",//现价
            "url_reserve":"", //预定的pc端里面
            "url_reserve_mb":""//预定的客户端的连接
        },{
            "type":"xx", //门票的类型 如: 成人票(特惠团购)
            "orign_price":"xx",//原价
            "price":"xx",//现价
            "url_reserve":"x", //预定的pc端里面
            "url_reserve_mb":"x"//预定的客户端的连接
        }]
    }
}*/

function viewSpotTicket(extD, opts){
   if(!extD){
        return;
   }
   window.viewticketD = extD.rich_info.scope_reserve;
   showViewSpotTicket();
}

function showViewSpotTicket(type){
    
    resetTemp.showViewSpotPro = resetTemp.showViewSpotPro || {};
    
    T.g('viewSpotTicket').style.display = 'block';
    var htmls = [],
        JD = window.viewticketD,
        btn_url = '',
        arrData = {},
        ticketD = []; //有效值
    htmls.push('<div class="h3">在线订票</div>');
    htmls.push('<div class="box_1"><ul>');
    
    
    for(var j = 0, jlen = JD.length; j < jlen; j++){
        if(JD[j].price && parseInt(JD[j].price) > 0 ){
            ticketD.push(j);
        }
    }    
    
    for(var i=0, len = ticketD.length; i<len; i++){

        arrData = JD[ticketD[i]];
        btn_url = arrData.url_reserve_mb ? arrData.url_reserve_mb : arrData.url_reserve;
        
        htmls.push('<li onclick="openLink(\'' + btn_url + '\', ' + STAT_VIEW_TICKET_BTN + ');">' + arrData.type +'<div><span class="price"><em>￥</em>'+arrData.price+'</span><del class="orign_price">' + arrData.orign_price + '</del><span class="btn"><span>预订<em></em></span></span></div>');
       
        if(!type && i == 2){
            break;
        }else if(i==10){
            break;
        } 
                  
    }  
    
    htmls.push('</ul>');
    if(type != 'more' && ticketD.length > 3){
        htmls.push('<div class="bottom_nav bottom_nav_1"><div onclick="showViewSpotTicket(\'more\');addStat('+ STAT_VIEWSPOT_ALLSITE + ');"><span><a href="javascript:viod(0);">查看更多套餐<em class="goto_icon_1"></em></a></span></div></div>');
    }

    htmls.push('</div>');
    T.g('viewSpotTicket').innerHTML = htmls.join('');
    
    callAppFun('relayout');

    if(!type){
        resetTemp.showViewSpotPro.ShowViewSpotTicket = 1;
    }

    
}