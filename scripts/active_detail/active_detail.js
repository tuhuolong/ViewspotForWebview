
window.templateType = 'active_detail';

/*
 *重置页面内容   
 */
function resetPageContent() {
    if(T.g('ActivBase')){
        T.g('ActivBase').style.display = 'none';
    }
    if(T.g('activePro')){
        T.g('activePro').style.display = 'none';
    }
    if(T.g('active_imgBox')){
        T.g('active_imgBox').style.display = 'none';
    }
}

/**
 *填充数据
 *@param {obj} json 数据内容 必填
		json 为客户端传入的数据，或者 回调函数传入的数据
 *@param {string} type 数据来源 saveData 标示来源与本地存储;
 */
function fillData(extD, opts) {

    try{

        var opts = opts || {},
            type = opts.type || {};

        if(!extD) return;
        
        var data = extD.activity;
        if(!data || data.length < 1){
            return;
        }

        showActivBase(data);
        //通知客户端设置webview高度
        callAppFun('relayout');
    }catch(e){
        }finally{
        //通知客户端设置webview高度
        callAppFun('relayout');
    }
}

/**
 * 豆瓣同城页面生成
 * @author fuen
 * @param {Object} extD  json
 * @param {Object} opts  可选参数
 */
function showActivBase(extD, opts){

    if(!T.G("ActivBase") || !extD){
        return;
    }
    
    var htmls = [],
        tongCheng = T.G("ActivBase"),
        data = extD,
        detail_url = '',
        index = window.poiInfo.index || "",
        imgs = [],
        description = '',
        haibaoImg = '';
    
    tongCheng.style.display = "block";

    htmls.push('<div class="box_1 tongchengC">');

    if(data[index].name){
        htmls.push('<div class="tit">'+data[index].name+'</div>');   
    }

    htmls.push('<table cellpadding=0 cellspacing=0><tr><td class="td_img">');

    haibaoImg = data[index].haibao_url_mb ? data[index].haibao_url_mb : data[index].haibao_url;
    haibaoBigImg = data[index].haibao_url ? data[index].haibao_url : data[index].haibao_url_mb;

        htmls.push('<div class="imgBox" onclick="callAppFun(\'newwindow\',{page:\'active_bigimg.html\', imgUrl:\'' + haibaoBigImg + '\'});"><div><img src=http://map.baidu.com/maps/services/thumbnails?quality=100&width=98&height=145&align=center&src=' + decodeURIComponent(haibaoImg) + ' /></div></div>');

    htmls.push('</td><td class="td_text">');
    if(data[index].date){
        htmls.push('<p class="date">' + data[index].date + '</p>');
    }

    if(data[index].price){
        htmls.push('<p class="price">费用：' + data[index].price + '</p>');
    }
    if(data[index].type){
        htmls.push('<p class="type">类型：' + data[index].type + '</p>');
    }
    if(data[index].zhubanfang){
        htmls.push('<p class="zhubanfang">主办方：' + data[index].zhubanfang + '</p>');
    }        
    htmls.push('</td></tr></table>');

    htmls.push('<div class="join">')
    if(data[index].enddays){
        htmls.push('<span><em>' + data[index].enddays + '</em>天结束</span><span class="line">|</span>');
    }        
    if(data[index].like_num){
        htmls.push('<span><em>' + data[index].like_num + '</em>感兴趣</span><span class="line">|</span>');
    }        
    if(data[index].attend_num){
        htmls.push('<span><em>' + data[index].attend_num + '</em>参加</span>');
    }    
    
    htmls.push('</div>')
    htmls.push('</div>')
    tongCheng.innerHTML = htmls.join('');
    
    //报名模块
    detail_url = data[index].src_url_mb ? data[index].src_url_mb : data[index].src_url;
    joinFun(detail_url);

    //详细模块
    description = data[index].description ?  data[index].description : "";
    showActivePro(description);

    //展示图片
    imgs = data[index].image;
    if(imgs && imgs.length) {showImg(imgs);}

}

//报名模块
function joinFun(url){
    if(!url){
        return;
    }
    var htmls = [],
        joinBox = T.G('joinBox');

    joinBox.style.display = 'block';
    
    T.on("joinBox", "click", function(){
        openLink(url);
    })

    htmls.push('<img src="../img/dou.png" width="19" height="19" /><span style="margin-left:12px;vertical-align:4px;">去豆瓣报名参加</span><img class="goDouban" src="../img/goto_v3.png" width="7" height="12" />');
    joinBox.innerHTML = htmls.join('');
}

function openLink(url, code){
    window.open(url);
}

//详细介绍模块
function showActivePro(pro){
    if(!pro) return;

    var htmls = [],
        activePro = T.G('activePro');

    activePro.style.display = 'block';
    htmls.push('<div class="h3">活动介绍</div>');
    htmls.push('<div class="box_1 activePro">' + pro + '</div>');
    activePro.innerHTML = htmls.join('');
}

function showImg(imgs){

    if(!imgs) return;
    
    var htmls = [],
        imgUrl = "",
        active_imgBox = T.G('active_imgBox'),
        scroll_width = imgs.length*67,
        //pic_side_width = getPicSideWid(),
        index = window.poiInfo.index || "";
    
    active_imgBox.style.display = 'block';

    htmls.push('<div class="h3">活动图片</div>');
    htmls.push('<div class="box_1"><div class="activeImg" id="activeImgBox">');
    htmls.push('<div id="active_imgList" style="width:'+ (scroll_width) +'px">');
    htmls.push('<ul id="activeImg">')

    
    for(var i = 0,len = imgs.length; i < len; i++){
        imgUrl = imgs[i].imgUrl_mb ? imgs[i].imgUrl_mb : imgs[i].imgUrl;
        
       htmls.push('<li id="active_img_'+i+'" onclick="callAppFun(\'newwindow\',{page:\'active_img.html\', active_index:' + index + ', active_ImgIndex:' + i + '});"><img src=http://map.baidu.com/maps/services/thumbnails?quality=100&width=128&height=128&align=center&src=' + decodeURIComponent(imgUrl) + ' width=64 height=64  /></li>');

    }


    htmls.push('</ul>');
    htmls.push('</div>');
    htmls.push('</div>');
    htmls.push('</div>');
    active_imgBox.innerHTML = htmls.join('');


    showImg.img_num = imgs.length; 
    addTheatreAnimation();
}

//图片滑动效果;
function addTheatreAnimation() {
    var wrapper = T.g('active_imgList') || '',
        pic_list = T.g('activeImg') || '';

    if(!(wrapper && pic_list)){
        return;
    }
    var pic_list_li = pic_list.getElementsByTagName('li'),
        
        _goto_num = showImg.img_num > 1 ? 1 : showImg.img_num -1;

    window['activeImgScroll'] = new iScroll("activeImgBox", {

        hScrollbar: false,
        scrollPart : false,
        vScrollbar: false,
        x : - (_goto_num * 0),
        currPageX : _goto_num 
     });
}