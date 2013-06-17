window.templateType = 'picList';

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

    //隐藏图片容器
    T.g('pic_list_con').style.display = 'none';

    if(!extD) return;


    //输出商户详细信息
    if(extD.image && extD.image.length){
        moreInfo(extD);
    }

    //填充数据完毕
    fillData.DONE = true;

    //延时500ms加载图片;
    setTimeout(function(){
        addPicListImg();
    },500);
    

    //通知客户端设置webview高度
    callAppFun('relayout');
}


function moreInfo(extD) {
    var data = extD.image,
        src_name = extD.src_name,
        bottom_nav_hei = 65,
        body_width = document.body.clientWidth;
        

    window.picConHeight = window.deviceHeight - bottom_nav_hei - 20;

//    alert(window.picConHeight + ',' + window.deviceHeight + ',' + top_nav_hei + ',' + bottom_nav_hei);
//    document.body.style.height = (window.deviceHeight - 60) + 'px';


    //如果没有信息则返回;
    if(!data){
        return;
    }


    var htmls = [],
        img_num = 0;

    for(var i=0;i<data.length;i++){
        var _img = data[i],
            _p_w = 'width=302&',
            _p_h = 'height=216&',
            _p_a = 'align=center&',
            _p_q = 'quality=50',
            ya_pic_url = 'http://map.baidu.com/maps/services/thumbnails?src=' + encodeURIComponent(_img.imgUrl) + '&'+ _p_w +_p_h + _p_a + _p_q,
            _img_src = 'src';
        
        //不对饭桶的图片进行压缩;
        if(_img.name == 'fantong'){
            ya_pic_url = _img.imgUrl;
        }
        if(i>3){
            _img_src = '_src';
        }

        if(_img.imgUrl && _img.cn_name && _img.name){
            htmls.push('<li><a onclick="callAppFun(\'newwindow\',{page:\'pic.html\',index:'+ img_num +',imgUrl:\''+ _img.imgUrl +'\',name:\'' + _img.name + '\',cn_name:\'' + _img.cn_name + '\'})"><img id="img_id_'+img_num+'" '+ _img_src +'="'+ ya_pic_url +'" title="'+ _img.cn_name +'" width="100%" height="108px" /></a></li>');

            //图片张数统计
            img_num ++ ;
            
        }
    }

    T.g('pic_list_con').style.display = '';
    T.g('pic_list').innerHTML = htmls.join('');

    addStat(STAT_PICLIST_PAGE);
   
}

function addPicListImg() {
    var pic_list_img = T.g('pic_list').getElementsByTagName('img');
    for(var i=0;i<pic_list_img.length;i++){
        var _cur_img = pic_list_img[i];
        if(!_cur_img.src){
            _cur_img.src = _cur_img.getAttribute('_src');
        }
    }
}