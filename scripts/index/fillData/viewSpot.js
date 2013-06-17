
/**
 * 景点介绍页面生成
 * @author fuen
 * @param {Object} extD  json
 * @param {Object} opts  可选参数
 */

function showViewSpotPro(extD, opts){
    resetTemp.showViewSpotPro = resetTemp.showViewSpotPro || {};
    var data = extD.scope_site.site_detail,
        html = [],
        html_li = "<li><div></div></li>";

    T.g('viewSpotPro').style.display = 'block';
    html.push('<div class="h3">景点介绍</div>');
    html.push('<div class="box_1"><ul class="c_list">');
    for(var i=0,len=data.length; i<len; i++){
        html.push('<li><div onclick="addStat('+ STAT_VIEWSPOT_SITELIST + ');"><a href="' + data[i].site_link_mb + '" class="list">' + (i+1) + '：' + data[i].site_name + '</a></div></li>'); 
        if(i == 3){
            break;
        }  
    }

    if(data.length < 4 && (data.length) % 2 != 0){
        html.push(html_li);
    }

    html.push('</ul>');
    html.push('<div class="bottom_nav bottom_nav_1"><div onclick="addStat('+ STAT_VIEWSPOT_ALLSITE + ');"><span><a href="' + extD.scope_site.total_link_mb + '">查看更多景点<em class="goto_icon_1"></em></a></span></div></div>');
    html.push('</div>');

    T.g('viewSpotPro').innerHTML = html.join('');

    resetTemp.showViewSpotPro.showViewSite = 1;
}


function showViewSpotSitePro(extD, opts){

    var data = extD.rich_info,
        html = [];
    if(data.description && data.description != ""){
        T.g('viewSpotSitePro').style.display = 'block';

        var siteProData ='<div onclick="ShowAndHidden(this, \'\', \'hiddenviewsite\');">' + data.description + '<span class="kongBtn"></span><span class="hiddenBtn">点击收起<span></span></span></div>';

        var shortData =data.description,
            data_leng = shortData.length >150 ? 150 : shortData.length;
        if(shortData.length >150){
            shortData = '<div onclick="ShowAndHidden(this, \'show\',\'showviewsite\');">' + shortData.slice(0,data_leng) + '...<span class="kongBtn"></span><span class="showBtn">点击展开<span></span></span></div>';
        }

        html.push('<div class="h3">景点介绍</div>');
        html.push('<div class="box_1">');
        html.push('<div class="box">' + shortData + '</div>')  
        html.push('<div class="box" style="display:none">' + siteProData + '</div>')  
        html.push('</div>');

        T.g('viewSpotSitePro').innerHTML = html.join('');
    }
}


/**
 * 景点精彩游记
 * @author fuen
 * @param {Object} extD  json
 * @param {Object} opts  可选参数
 */

function showViewStrategy(extD, opts){
    var data = extD.strategy.strategy_detail,
        html = [];

    T.g('viewStrategy').style.display = 'block';
     
    html.push('<div class="h3">精彩游记</div>');
    html.push('<div class="box_1"><ul>');
    for(var i=0,len=data.length; i<len; i++){
        html.push('<li onclick="openLink(\'' + data[i].link_mb + '\', ' +  STAT_STRATEGY_LIST  + ')">');
        if(data[i].title){
            html.push('<div class="tit">' + data[i].title + '</div>');
        }
        if(data[i].line){
            html.push('<div class="line">' + data[i].line + '</div>');
        }
        html.push('<div class="classify">');
        if(data[i].price){
            html.push('<span class="price">'+data[i].price+'</span>')
        }
        if(data[i].time){
            html.push('<span class="time">'+data[i].time+'</span>')
        }
        if(data[i].days){
            html.push('<span class="days">'+data[i].days+'</span>')
        }
        html.push('</div>');

        if(data[i].content){
            var shortData =data[i].content,
            data_leng = shortData.length >150 ? 150 : shortData.length;

            //字数超过150个字后，进行裁剪;
            if(shortData.length >150){
                shortData = shortData.slice(0,data_leng) + '...';
            }
            html.push('<div class="content">' + shortData + '<span class="showBtn">查看全文<span></div>');
        }
        if(data[i].link && data[i].link.indexOf('lvyou.baidu') > -1){
            html.push('<div class="link"><span>来自百度旅游</span>');
            if(data[i].release_time){
                html.push('<span class="release_time">' + data[i].release_time + '</span>');
            }
            html.push('</div>');
        }
        html.push('</li>') 
        if(i == 3){
            break;
        }  
    }
    html.push('</ul>');
    if(extD.strategy.total_link_mb){
        html.push('<div class="bottom_nav bottom_nav_1"><div><span><a href="' + extD.strategy.total_link_mb + '" onclick="addStat('+ STAT_STRATEGY_ALL + ');">查看更多游记<em class="goto_icon_1"></em></a></span></div></div>');
    }
    html.push('</div>');
    html.push('<div class="splitLine2"></div>');
    T.g('viewStrategy').innerHTML = html.join('');
}

/**
 * 景点门票和开放时间
 * @author fuen
 * @param {Object} extD  json
 * @param {Object} opts  可选参数
 */

function showViewSpotPrice(extD, opts){

    var data = extD.rich_info,
        html = [];
        T.g('viewSpotPrice').style.display = 'block';
        
        showViewSpotPrice.price = showViewSpotPrice.price || data.entrance_price || data.shop_hours;
        var houerData = "", priceData = "";
               
        if(extD.detail_info.entrance_price){
            priceData = '门票：' + extD.detail_info.entrance_price + '<br />';
        }


        if(data.shop_hours){
            houerData = '开放时间：' + data.shop_hours;
        }


        var allData = '<div onclick="ShowAndHidden(this, \'\', \'hiddenprice\');">' + priceData + houerData + '<span class="kongBtn"></span><span class="hiddenBtn">点击收起<span></span></span></div>'; 

        var shortData = priceData + houerData,
            data_leng = shortData.length >160 ? 160 : shortData.length;

        if(shortData.length > 160){
            shortData = shortData.slice(0, data_leng) + '...<span class="kongBtn"></span><span class="showBtn">点击展开<span></span></span>';
            shortData = '<div onclick="ShowAndHidden(this, \'show\', \'showprice\');">'+ shortData + '</div>';
        }
        
        html.push('<div class="h3">门票和开放时间</div>');
        html.push('<div class="box_1">');
        html.push('<div class="box">' + shortData + '</div>');
        html.push('<div class="box" style="display:none;">' + allData + '</div>');

        if(extD.detail_info && extD.detail_info.link && extD.detail_info.link.length){
            
            for(var i=0,len = extD.detail_info.link.length; i<len; i++){
                var url_mb = extD.detail_info.link[i].url_mb || extD.detail_info.link[i].url;
                if(extD.detail_info.link[i].name && extD.detail_info.link[i].name == "baidulvyou" && url_mb){
                    html.push('<div class="bottom_nav bottom_nav_1"><div><span><a href="' + url_mb + '" onclick="addStat('+ STAT_STRATEGY_ALL_1 + ');">查看更多攻略<em class="goto_icon_1"></em></a></span></div></div>');
                }
            }
    }

        html.push('</div>');

        T.g('viewSpotPrice').innerHTML = html.join('');
}

function ShowAndHidden(obj, type, statType){
    var opts = {};
    if(statType){
        opts[statType] = 1;
    }
    obj.parentNode.style.display = "none";
    if(type == "show"){
        obj.parentNode.nextSibling.style.display = "block";
    }else{
        obj.parentNode.previousSibling.style.display = "block";
    }
    callAppFun('relayout');
    addStat(STAT_VIEWBTN_OPEN,opts);
}


function openLink(url, code){
    window.open(url);
    if(code){
        addStat(code);
    }
}