window.templateType = 'pic';

/*
 *重置页面内容   
 */
function resetPageContent() {
    if(T.g('wrapper')){
        T.g('wrapper').style.display = 'none';
    }
    if(T.g('imgInfoCont')){
        T.g('imgInfoCont').style.display = 'none';
    }
    if(T.g('imgInfoComment')){
        T.g('imgInfoComment').style.display = 'none';
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


    
    //是否填充数据完毕
    fillData.DONE = false;  

    //设置网页高度；
    setBodyHeight();


    if(!extD) return;


    //输出商户详细信息
    if(extD.image && extD.image.length){
        moreInfo(extD);
    }

    //填充数据完毕
    fillData.DONE = true;
    

    //通知客户端设置webview高度
    callAppFun('relayout');
}

moreInfo.userComentFlag = 0;  //表示无up/down图标   1表示down 2表示up     表达的是现状
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

//    if(window.poiInfo.index == 11){
//        window.poiInfo.imgUrl = '1231';
//    }

    //根据图片url判断当前url属于列表中的第几张
    for(var i=0;i<data.length;i++){
        if(window.poiInfo.imgUrl && (data[i].imgUrl == window.poiInfo.imgUrl)){
            window.poiInfo.index = i;
            break;
        }else if((i == data.length-1) && window.poiInfo.name && window.poiInfo.imgUrl && window.poiInfo.cn_name){
            //如果没有找到当前图片时，添加该图片到列表中;
            window.poiInfo.index = i+1;
            data[i+1] = {
                'name': window.poiInfo.name,
                'imgUrl': window.poiInfo.imgUrl,
                'cn_name': window.poiInfo.cn_name
            }
            break;
        }
    }

    var htmls = [],
        img_num = 0,
        _go_to_num = window.poiInfo.index || 0,
        _go_to_num = _go_to_num > (data.length -1) ? data.length -1 : _go_to_num * 1;

    for(var i=0;i<data.length;i++){
        var _img = data[i],
            _a_bef = '',
            _a_end = '',
            _src = 'src',
            _p_w = 'width='+(window.deviceWidth - 20)+'&',
            _p_h = 'height='+picConHeight+'&',
            _p_a = '',
            _p_q = 'quality=80',
            ya_pic_url = 'http://map.baidu.com/maps/services/thumbnails?src=' + encodeURIComponent(_img.imgUrl) + '&'+ _p_w +_p_h + _p_a + _p_q,
            _u_n = _img.nickName || '',//'Violetdfdfd',
            _u_s = _img.score || '',//5,//score:1(不推荐)，3（一般），5（推荐）
            _u_c = _img.content || '',//'好似好吃，绝对的肯定放空间哈根老大姐啦汉兰达话费的爱德华富利卡很多快减肥哈空间都回家啊哈的空间很大飞机和空间大好看的话防静电话费控件的很快就好的空间很多空间和大家多久发货接电话法律恢复快很多翻江倒海接电话家分店胡椒粉还多久发货大家很费劲的哈弗啊哈风很大房间爱很多飞哈大家很发达交话费带话费就看到很费劲的很费劲蝴蝶结很费劲的很费劲的',
            //_u_c = '好似好吃，绝对的肯定放',
            _u_p = _img.price || '',//'15',
            _u_r = _img.third_name || ''//'花生豆';
        //暂时屏蔽掉
//        if(_img.link){
//            _a_bef = '<a href="'+ _img.link +'">';
//            _a_end = '</a>';
//        }
        
        //不对饭桶的图片进行压缩;
        if(_img.name == 'fantong'){
            ya_pic_url = _img.imgUrl;
        }

        //对第二张以后的图片首次不进行加载；
        if(i < (_go_to_num - 1) || i> (_go_to_num +1)){
            _src = '_src';
        }

        if(_img.imgUrl && _img.cn_name){
            htmls.push('<li style="width:'+ body_width +'px;height:'+ window.picConHeight +'px">' + _a_bef + '<img id="img_id_'+img_num+'" '+ _src +'="'+ ya_pic_url +'" title="'+ _img.cn_name +'" from="'+ _img.name +'" s_name="'+ (_img.s_name || '') +'" width="300px" height="480px" onload="javascript:scaleImage(this);if(this.parentNode){this.parentNode.style.backgroundImage=\'none\'}" onerror="if(this.src && this.parentNode){T.addClass(this.parentNode,\'error\')}" style="display:none;" _user_n="'+_u_n+'" _user_s="'+_u_s+'" _user_c="'+_u_c+'" _user_p="'+_u_p+'" _user_r="'+_u_r+'" />'+ _a_end +'</li>');

            //图片张数统计
            img_num ++ ;
            
        }
    }
    moreInfo.img_num = img_num;

    T.g('scroller').style.width = (body_width * img_num) + 'px'; 

    T.g('wrapper').style.display = '';
    T.g('thelist').innerHTML = htmls.join('');
    

    var pic_from_cont = T.g('pic_from_cont'),
        imgInfoNumCon = T.g('imgInfoNumCon');

    
    //设置底部导航的内容及样式;
    var setBarInfo = function(index){
        var curImg = T.g('img_id_'+index),
            curClassName = curImg.getAttribute('from'),
            s_name = curImg.getAttribute('s_name') || '',
            s_name = s_name=="" ? "" : "_"+s_name,
            image_url="http://map.baidu.com/fwmap/upload/place/icon/"+curClassName+"/50"+s_name+".png",
            _u_n = curImg.getAttribute('_user_n') || '',
            _u_s = curImg.getAttribute('_user_s') || '',  //1-bad 2-simple 3-good
            _u_c = curImg.getAttribute('_user_c') || '',
            _u_p = curImg.getAttribute('_user_p') || '',
            _u_r = curImg.getAttribute('_user_r') || '',
            _u_c_length = 60,
            _u_c_short = _u_c.slice(0,_u_c_length-2)+'...',
            _u_s_p = 4-(parseInt(_u_s)+1)/2,
            _map_score = ['推荐','一般','不推荐'];
        _u_s = _map_score[_u_s_p-1];
        pic_from_cont.style.backgroundImage = 'url(' + image_url + ')';
        pic_from_cont.innerHTML = curImg.title;    
        imgInfoNumCon.style.display = 'none';
        imgInfoNumCon.innerHTML = (index + 1) + '/'+ img_num;

        //添加测试评论信息
        T.g('pic_user_name').innerHTML = _u_n;
        T.g('pic_user_mark').innerHTML = _u_s;
        T.g('pic_user_mark').style.background = 'url("../img/'+_u_s_p+'-1.png") no-repeat left center';
        T.g('pic_user_mark').style.backgroundSize= '20px 20px';

        
        if(curClassName == 'shenbian' && _u_n && _u_s && _u_c && _u_p && _u_r){

            moreInfo.userComentFlag = 0;
            if(_u_c.length > _u_c_length){
                T.g('pic_user_comment_short').innerHTML = _u_c_short;
                T.g('pic_user_comment_short').style.display = '';
                T.g('pic_user_comment').style.display = 'none'
                T.g('pic_user_comment').innerHTML = _u_c;
                moreInfo.userComentFlag = 1;
            }else{
                T.g('pic_user_comment').innerHTML = _u_c;
                moreInfo.userComentFlag = 0;
            }
            T.g('pic_user_price').innerHTML = '人均:'+_u_p;
            T.g('pic_user_category').innerHTML = _u_r;
            if(moreInfo.userComentFlag == 1){
                T.g('pic_change_control_icon_short').style.background = 'url("../img/down_1.png") no-repeat';
                T.g('pic_change_control_icon_short').style.backgroundSize= '20px 20px';
                T.g('pic_change_control_icon_short').setAttribute('onclick','changeLog()');
                T.g('pic_change_control_icon').style.background = 'url("../img/up_1.png") no-repeat';
                T.g('pic_change_control_icon').style.backgroundSize= '20px 20px';
                T.g('pic_change_control_icon').setAttribute('onclick','changeLog()');
                T.g('pic_user_comment').setAttribute('onclick','changeLog();');
                T.g('pic_user_comment_short').setAttribute('onclick','changeLog();');
            }else{
                T.g('pic_change_control_icon').style.display = 'none';
            }
            T.g('imgInfoComment').style.display = '';
            T.g("imgInfoCont").style.display = 'none';

        }else{
            T.g('imgInfoComment').style.display = 'none';
            T.g("imgInfoCont").style.display = '';
        }
        
    }

    setBarInfo(_go_to_num);
    

    window.myScroll = new iScroll('wrapper', {
        x : - (_go_to_num * body_width),
        currPageX : _go_to_num,
		snap: true,
		momentum: false,
		hScrollbar: false,
		onScrollEnd: function (e) {
            var num = this.currPageX * 1;
            setBarInfo(num);

            //预加载左、当前、右 3张图片
            for(var i=-1;i<2;i++){
                var img = T.g('img_id_' + (num +i));
                if(img && img.getAttribute('_src')){
                    img.src = img.getAttribute('_src');
                }
            }
		}
	 });
}

var changeLog=function(){
    if(moreInfo.userComentFlag == 1){
        T.g('pic_user_comment_short').style.display = 'none';
        T.g('pic_user_comment').style.display = '';
        T.g('pic_change_control_icon_short').style.display = 'none';
        T.g('pic_change_control_icon').style.display = '';
        moreInfo.userComentFlag = 2;
    }else if(moreInfo.userComentFlag == 2){
        T.g('pic_user_comment_short').style.display = '';
        T.g('pic_user_comment').style.display = 'none';
        T.g('pic_change_control_icon_short').style.display = '';
        T.g('pic_change_control_icon').style.display = 'none';
        moreInfo.userComentFlag = 1;
    }
}

/*
 * 气泡中图片按比例缩放
 */
function scaleImage(ImgD){
    //参数(图片,允许的宽度,允许的高度)
    var iwidth = window.deviceWidth - 20,
        iheight = picConHeight,
        topHei = window.mobileType == 'iphone' ? 0 : 10,
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

            ImgD.style.marginTop = ((window.picConHeight - ImgD.height)/2 - topHei) + 'px';
//            ImgD.style.marginBottom = (document.body.clientHeight - hei - ImgD.height)/2 + 'px';
            ImgD.style.display = 'none';
            ImgD.style.display = 'block';

            //当图片加载完成后，删除_src 的值;
            ImgD.setAttribute('_src','');
        }
    };
  
    image.src=ImgD.src;
}

//设置网页高度;
function setBodyHeight() {
//    if(window.mobileType == 'android'){
//        var viewport = document.querySelector("meta[name=viewport]");
//        viewport.setAttribute('content', 'width=device-width,height=device-height,minimum-scale=1.0,maximum-scale=10,user-scalable=no');
//    }
    window.deviceWidth = document.documentElement.clientWidth;
    window.deviceHeight = document.documentElement.clientHeight;
}

//添加横竖屏切换事件;
//window.onresize = function(){
//
//    //如果数据没有填充完毕则返回;
//    if(!(fillData && fillData.DONE) || window.resizeStatus == 1){
//        return
//    }
//
//    //记录切换状态; //1表示正在切换，2表示切换完成;
//    window.resizeStatus = 1;
//    
//    //修改webview的高度；
//    callAppFun('relayout',{height:1});
//
//    //设置页面高度;
//    setBodyHeight();
// 
//    T.g('scroller').style.width = (document.body.clientWidth * moreInfo.img_num) + 'px';
//
//
//    var liArr = document.getElementById('thelist').getElementsByTagName('li'),
//        bottom_nav_hei = 65;
//
//    window.picConHeight = window.deviceHeight - bottom_nav_hei - 20;
//
//    for(var i=0;i<liArr.length;i++){
//        var li = liArr[i],
//            img = li.getElementsByTagName('img')[0],
//            img_url = img.src;
//
//        li.style.width = document.body.clientWidth + 'px';
//        li.style.height = window.picConHeight + 'px';
//        img.src = '';
//        img.src = img_url;
//    }
//
//    //解决部分机器 横竖屏切换后 样式不正确问题 begin;
//    document.getElementById('thelist').style.display = 'none';
//    setTimeout(function(){
//        document.getElementById('thelist').style.display = 'block';
//    },500)
//    //解决部分机器 横竖屏切换后 样式不正确问题 end;
//
//    //更新滚动动画
//    window.myScroll.refresh();
//    //滚动至切换前的图片
//    window.myScroll.scrollToPage(window.myScroll.currPageX,0);
//
//    //记录resize状态;
//    window.resizeStatus = 2;   
//
//}