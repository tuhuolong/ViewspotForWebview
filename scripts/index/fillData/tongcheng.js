
/**
 * 豆瓣同城页面生成
 * @author fuen
 * @param {Object} extD  json
 * @param {Object} opts  可选参数
 */

function showCityWide(extD, opts){

    resetTemp.doubanTC = resetTemp.doubanTC || {};

    
    if(!T.G("tongcheng")){
        return;
    }
    var htmls = [],
        tongCheng = T.G("tongcheng"),
        data = extD.activity,
        haibaoImg = '';

    tongCheng.style.display = "block";

    htmls.push('<div class="h3">豆瓣同城活动</div>');
    htmls.push('<div class="box_1"><div  class="tongchengC" onclick="addStat(STAT_INDEX_DOUBAN_CLICK, {indxeClick:1});callAppFun(\'newwindow\',{page:\'active_detail.html\', index:0});">');
    if(data[0].name){
        htmls.push('<div class="tit">'+data[0].name+'</div>');   
    }
    htmls.push('<table cellpadding=0 cellspacing=0><tr><td class="td_img">');
    
    haibaoImg = data[0].haibao_url_mb ? data[0].haibao_url_mb : data[0].haibao_url;
        htmls.push('<div class="imgBox"><div><img src=http://map.baidu.com/maps/services/thumbnails?quality=100&width=98&height=145&align=center&src=' + decodeURIComponent(haibaoImg) + ' /></div></div>');

    htmls.push('</td><td class="td_text">');
    if(data[0].date){
        htmls.push('<p class="date">' + data[0].date + '</p>');
    }
    if(data[0].price){
        htmls.push('<p class="price">费用：' + data[0].price + '</p>');
    }
    if(data[0].type){
        htmls.push('<p class="type">类型：' + data[0].type + '</p>');
    }
    if(data[0].zhubanfang){
        htmls.push('<p class="zhubanfang">主办方：' + data[0].zhubanfang + '</p>');
    }        
    htmls.push('</td></tr></table>');

    htmls.push('<div class="join">')
    if(data[0].enddays){
        htmls.push('<span><em>' + data[0].enddays + '</em>天结束</span><span class="line">|</span>');
    }        
    if(data[0].like_num){
        htmls.push('<span><em>' + data[0].like_num + '</em>感兴趣</span><span class="line">|</span>');
    }        
    if(data[0].attend_num){
        htmls.push('<span><em>' + data[0].attend_num + '</em>参加</span>');
    }        
    htmls.push('</div>')
    htmls.push('</div>')
    if(data.length > 1){
        htmls.push('<div class="bottom_nav bottom_nav_1"><div><span><a onclick="callAppFun(\'newwindow\',{page:\'active_list.html\'})" href="javascript:void(0)">点击查看更多活动<em class="goto_icon_1"></em></a></span></div></div>')
    }
    htmls.push('</div>');
    tongCheng.innerHTML = htmls.join('');

    resetTemp.doubanTC.show = 1;
}
