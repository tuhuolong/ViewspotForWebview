window.templateType = 'active_img';

/*
 *重置页面内容   
 */
function resetPageContent() {
    if(T.g('Active_pic')){
        T.g('Active_pic').style.display = 'none';
    }
}

function fillData(extD, opts) {
       
    var opts = opts || {},
        type = opts.type || {};
    

    //是否填充数据完毕
    fillData.DONE = false; 
 
    //设置网页高度；
    setBodyHeight();
 
    if(!extD) return;
    
    var actvieData = extD.activity[window.poiInfo.active_index];
    //输出商户详细信息
    if(actvieData && actvieData.image && actvieData.image.length && actvieData.name ){
       showActivePic(actvieData);
    }
    
    //填充数据完毕
    fillData.DONE = true;
    

    //通知客户端设置webview高度
    callAppFun('relayout');


}

function showActivePic(actvieData){

    var data = actvieData.image,
        bottom_nav_hei = 65,
        imgUrl = "",
        actvieName = actvieData.name,
        body_width = document.body.clientWidth,
        pic_from_cont = T.g('active_pic_from_cont'),
        imgInfoNumCon = T.g('active_imgInfoNumCon');

    window.picConHeight = window.deviceHeight - bottom_nav_hei - 20;

    //如果没有信息则返回;
    if(!data){
        return;
    }
   
    //pic_from_cont.innerHTML = actvieName;
    //根据图片url判断当前url属于列表中的第几张



    var htmls = [],
        img_num = 0,
        _go_to_num = window.poiInfo.active_ImgIndex || 0,
        _go_to_num = _go_to_num > (data.length -1) ? data.length -1 : _go_to_num * 1;
        for(var i=0;i<data.length;i++){
        var _img = data[i],
            _a_bef = '',
            _a_end = '',
            _src = 'src',
            _p_w = 'width='+900+'&',
            _p_h = 'height='+540+'&',
            _p_a = '',
            _p_q = 'quality=80',
            _imgUrl = data[i].imgUrl ? data[i].imgUrl : data[i].imgUrl_mb;
            ya_pic_url = 'http://map.baidu.com/maps/services/thumbnails?src=' + encodeURIComponent(_imgUrl) + '&'+ _p_w +_p_h + _p_a + _p_q;
        
        //对第二张以后的图片首次不进行加载；
        if(i < (_go_to_num - 1) || i> (_go_to_num +1)){
            _src = '_src';
        }

        if(_imgUrl && actvieName){
            htmls.push('<li style="width:'+ body_width +'px;height:'+ window.picConHeight +'px">' + _a_bef + '<img id="img_id_'+img_num+'" '+ _src +'="'+ ya_pic_url +'" title="'+ actvieName +'" width="300px" height="480px" onload="javascript:scaleImage(this);if(this.parentNode){this.parentNode.style.backgroundImage=\'none\'}" onerror="if(this.src && this.parentNode){T.addClass(this.parentNode,\'error\')}"   />'+ _a_end +'</li>');

            //图片张数统计
            img_num ++ ;
            
        }
    }

    showActivePic.img_num = img_num;

    T.g('active_scroller').style.width = (body_width * img_num) + 'px'; 
    T.g('acitve_wrapper').style.display = '';
    T.g('active_thelist').innerHTML = htmls.join('');
    

  //设置底部导航的内容及样式;
    var setBarInfo = function(index){ 
        imgInfoNumCon.innerHTML = (index + 1) + '/'+ img_num;
    }
    setBarInfo(_go_to_num);
    

    window.myScroll = new iScroll('acitve_wrapper', {
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
    window.deviceWidth = document.documentElement.clientWidth;
    window.deviceHeight = document.documentElement.clientHeight;
}