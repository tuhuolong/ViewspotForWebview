

function picInfo(extD,opts) {
    resetTemp.picInfo = resetTemp.picInfo || {};
    var data = extD.image || {},
        dataNum = 0,
        src_name = extD.src_name,
        opts = opts || {},
        type = opts.type || {},
        htmls = [],
        data_config = dataConfig[src_name] || dataConfig['defaul_t'];

    for(var i=0;i<4;i++){
        var _img_data = extD.image[i];
        if(_img_data && _img_data.imgUrl && _img_data.cn_name && _img_data.name){
            //http://map.baidu.com/maps/services/thumbnails?width=1132&height=655&quality=50&src=http://hiphotos.baidu.com/local/pic/item/f2b7baef876e46552cf534b6.jpg
            if(dataNum <4){
                htmls.push('<li><a onclick="addStat(STAT_INDEX_CLICK_PIC_LIST);callAppFun(\'newwindow\',{page:\'pic.html\',index:'+ dataNum +',imgUrl:\''+ _img_data.imgUrl +'\',name:\'' + _img_data.name + '\',cn_name:\'' + _img_data.cn_name + '\'})"><img src="http://map.baidu.com/maps/services/thumbnails?src='+ encodeURIComponent(_img_data.imgUrl) +'&quality=50&width=128&height=128&align=center" width="64" height="64" /></a></li>');
            }            
            dataNum ++;
        }else{
            htmls.push('<li><a onclick="callAppFun(\'openModule\',{\'name\':\'sbPhoto\'})"><img src="../img/add_img_bj.png" width="64" height="64" /></a></li>');
        }
        //展示3张后，停止;
        if(dataNum > 4){
            break;
        }
    }

    //输出更多图片;
//    if(dataNum >3){
        htmls.push('<li class="bottom_nav"><div><span><a onclick="addStat(STAT_INDEX_CLICK_PHOTO);callAppFun(\'openModule\',{\'name\':\'sbPhoto\'})"><em class="photo"></em>我要上传</a></span><span><a href="javascript:void(0)" onclick="addStat(STAT_INDEX_CLICK_PIC_ALL);callAppFun(\'newwindow\',{page:\'picList.html\'})">查看更多图片<em class="goto_icon_1"></em></a></span></div></li>');
//    }


    //if(dataNum){
        resetTemp.picInfo.havePic = 1;
        //插入HTML代码
        T.g("picInfo").innerHTML = htmls.join('');
        //显示dom容器
        T.g("picCon").style.display = '';
    //}else{
     //   T.g('noPicCon').style.display = '';
    //}
}
