
/**
 *填充数据
 *@param {obj} json 数据内容 必填
		json 为客户端传入的数据，或者 回调函数传入的数据
 *@param {string} type 数据来源 saveData 标示来源与本地存储;
 */
function fillData(extD, opts) {
    var opts = opts || {},
        type = opts.type || {};

    if(!extD) return;
   
    var data = extD.activity;
    if(!data || data.length < 1){
		return;
	}
	showAtiveList(data);
    //通知客户端设置webview高度
    callAppFun('relayout');
}

/**
 * 豆瓣同城页面生成
 * @author fuen
 * @param {Object} extD  json
 * @param {Object} opts  可选参数
 */

function showAtiveList(extD, opts){

    if(!T.G("active_list")){
        return;
    }
 
    var htmls = [],
        tongCheng = T.G("active_list"),
        data = extD,
        haibaoImg = '';

    tongCheng.style.display = "block";
   
    for(var i = 0, len = data.length; i < len; i++){

        htmls.push('<li onclick="addStat('+ STAT_INDEX_DOUBAN_CLICK + ', {TcListClick:1});callAppFun(\'newwindow\',{page:\'active_detail.html\', index:' + i + ' });">');
        htmls.push('<div class="box_1">');
        if(data[i].name){
            htmls.push('<div class="tit">'+data[i].name+'</div>');   
        }
        
        htmls.push('<div class="tongchengC">')
        htmls.push('<table cellpadding=0 cellspacing=0><tr><td class="td_img">');
    
        haibaoImg = data[i].haibao_url_mb ? data[i].haibao_url_mb : data[i].haibao_url;
        htmls.push('<div class="imgBox"><div><img src=http://map.baidu.com/maps/services/thumbnails?quality=100&width=98&height=145&align=center&src=' + decodeURIComponent(haibaoImg) + ' /></div></div>');


        htmls.push('</td><td class="td_text">');
        if(data[i].date){
            htmls.push('<p class="date">' + data[i].date + '</p>');
        }
        if(data[i].price){
            htmls.push('<p class="price">费用：' + data[i].price + '</p>');
        }
        if(data[i].type){
            htmls.push('<p class="type">类型：' + data[i].type + '</p>');
        }
        if(data[i].zhubanfang){
            htmls.push('<p class="zhubanfang">主办方：' + data[i].zhubanfang + '</p>');
        }        
        htmls.push('</td></tr></table>');

        htmls.push('<div class="join">')
        if(data[i].enddays){
            htmls.push('<span><em>' + data[i].enddays + '</em>天结束</span><span class="line">|</span>');
        }        
        if(data[i].like_num){
            htmls.push('<span><em>' + data[i].like_num + '</em>感兴趣</span><span class="line">|</span>');
        }        
        if(data[i].attend_num){
            htmls.push('<span><em>' + data[i].attend_num + '</em>参加</span>');
        }      
        htmls.push('</div>');
        htmls.push('</div>');
        htmls.push('</div>');
        htmls.push('<div class="circle left"></div><div class="circle right"></div>');
        htmls.push('<div class="bottom-effect"><div></div><div></div></div>');
        
        
        htmls.push('<img class="goDouban" src="../img/goto_v3.png" width="7" height="12" />');
        htmls.push('</li>');
    }
    tongCheng.innerHTML = htmls.join('');
    //展现量
    addStat(STAT_INDEX_DOUBAN_CLICK, {"TcList":1});
}
