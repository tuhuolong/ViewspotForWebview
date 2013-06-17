

/*查看更多*/
function moreInfo(extD) {
    var data = extD.detail_info && extD.detail_info.link || [],
        data_len = data.length;
        haveData = false;

    //如果没有数据则返回;
    if(!data_len){
        return;
    }

    var htmls = [];
    for(var i=0;i<data_len;i++){
        var _json = data[i],
            stat = '',
            s_name =  _json.s_name||"";                                 //--question no s_name property

        s_name = s_name=="" ? "" : "_"+s_name;
        var image_url="http://map.baidu.com/fwmap/upload/place/icon/"+_json.name+"/50"+s_name+".png";

        if(!_json.cn_name || _json.name == 'youke' ||  _json.name == 'youlaopo'){
            continue;
        }
        //统计信息
        stat = ' onclick = "addStat(\''+ STAT_INDEX_CLICK_MORE +'\',{datatype:\'more\',datafrom:\''+_json.name.toLowerCase()+'\'})"';
        var moreInfo_url =_json.url_mobilephone ? _json.url_mobilephone : _json.url;
        htmls.push('    <li class="blue log"><div><a href="'+moreInfo_url+'"'+ stat +' class="log_icon" style="background-image:url('+image_url+')">'+ _json.cn_name +'</a></div></li>');
        haveData = true;
    }

    //如果出现1行中只有1个数据的情况时，填充个空行
    if(data_len%2){
        htmls.push('    <li class="blue log"><div></div></li>');
    }
    

    if(haveData){
//        插入HTML代码
        T.g("moreInfo").innerHTML = htmls.join('');
//        设置层显示
        T.g("moreCon").style.display = '';
    }
}
