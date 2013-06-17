


//by jingd

function theatreInfo(extD,opts) {
    resetTemp.theatreInfo = resetTemp.theatreInfo || {};
    var htmls = [],
        base_info = {},
        pic_side_width = getPicSideWid();

    var _style = '',
        theatre_num = 0,
        htmls_pic = [],
        htmls_info = [],
        scroll_width = data&&(data.length * 76);
    //htmls.push('<ul class="list con1 goto_icon">');
    //htmls.push('<div class="block_title">演出信息</div>');
    //htmls.push('</ul>');
    htmls.push('<div class="h3">演出信息</div>');
    htmls.push('<div class="box_3" id="theatre_info_con" '+ _style +'>');

    var data = extD && extD.theatre_info&&extD.theatre_info.time_table;
    scroll_width = data&&(data.length * 76);
    if(!(data&&data.length)){
        htmls.push('<p class="theatre_nothing">暂无上映信息</p>');
        htmls.push('</div>');
        htmls.push('<div class="splitLine2"></div>');
        T.g('theatreCon').innerHTML = htmls.join('');
        T.g("theatreCon").style.display = '';
        return;
    }
    htmls_pic.push('    <div id="wrapper_theatre" class="theatre_wrapper">');
    htmls_pic.push('    <div id="scroller_theatre" class="theatre_pic_list_con" style="width:'+ (scroll_width + pic_side_width*2) +'px">');
    htmls_pic.push('       <ul class="theatre_pic_list" id="theatre_pic_list">');
    htmls_info.push('    <div class="theatre_info_list_con" id="theatre_info_list_con">');
    theatreInfo.theatre_num = data.length;
    for(var j=0;j<data.length;j++){
        var _m_inf1 = data[j],
            _style1 = ' style="display:none"',
            _style2 = '';

        if(theatre_num == 0){
            _style1 = '';
            _style2 = ' style="margin-left:'+ pic_side_width +'px"';
        }else if(theatre_num == data.length){
            _style2 = ' style="margin-right:'+ pic_side_width +'px"';
        }
        htmls_pic.push('            <li'+_style2+'><img id="theatre_pic_list_' + theatre_num +'" src="'+ _m_inf1.opera_piture +'" /></li>');
        htmls_info.push('<div'+ _style1 +' id="theatre_info_list_' + theatre_num +'">');
        htmls_info.push('<ul class="theatre_info_list">');
        if(_m_inf1.opera_name.length>31){
            htmls_info.push('<li class="theatre_title">'+ _m_inf1.opera_name.slice(0,30) +'...</li>');
        }else{
            htmls_info.push('<li class="theatre_title">'+ _m_inf1.opera_name +'</li>');
        }
        if(_m_inf1.sub_head){
            htmls_info.push('<li class="theatre_sub_head">'+ _m_inf1.sub_head +'</li>');    
        }
        if(_m_inf1.show_time){
            htmls_info.push('<li class="theatre_show_time"><span>演出时间 : </span>'+ _m_inf1.show_time +'</li>');
        }else{
            htmls_info.push('<li class="theatre_show_time"><span>演出时间 : </span>暂无</li>');
        }
        
        htmls_info.push('<li class="theatre_price"><span>票价 :</span>￥'+ _m_inf1.min_price +'<span> 起</span></li>');
        htmls_info.push('</ul>');
        var _order_url = _m_inf1.order_url;
        if(_order_url.length>0){
            //for(var _i=0;_i<_order_url.length;_i++){ //后续扩展 
            htmls_info.push('<div class="theatre_tick_btn"><span class="btn_left"><a href="'+_order_url[0].url+'" onclick="addStat(\''+ STAT_INDEX_THEATRE_DAMAI + '\')"><em class="damai_icon"></em>在线订票</a></span><span class="btn_right"><a href="javascript:void(0)" onclick="addStat(\''+ STAT_INDEX_DAMAI_TEL + '\');callAppFun(\'tel\',{tel:\'4006103721\'});return false;" ><em class="damai_icon"></em>电话订票</a></span></div>');    
            //}
        }
        
        htmls_info.push('</div>');

        theatre_num ++;
    }
    htmls_pic.push('        </ul>');
    htmls_pic.push('    </div>'); 
    htmls_pic.push('    </div>'); 

    htmls_info.push('        </ul>');
    htmls_info.push('<span class="cur_theatre_point"></span>')
    htmls_info.push('    </div>'); 

    htmls.push(htmls_pic.join(''));
    htmls.push(htmls_info.join(''));
    htmls.push('</div>');
    htmls.push('<div class="splitLine2"></div>');
    T.g('theatreCon').innerHTML = htmls.join('');
    T.g("theatreCon").style.display = '';
    resetTemp.theatreInfo.haveTheatre = true;
    addTheatreAnimation()
;}

//剧院图片列表添加动画效果;
showTheatreInfo.prePage = 100000;
function addTheatreAnimation() {
    var wrapper = T.g('wrapper_theatre') || '',
        pic_list = T.g('theatre_pic_list') || '';

    if(!(wrapper && pic_list)){
        return;
    }
    var pic_list_li = pic_list.getElementsByTagName('li'),
        _goto_num = theatreInfo.theatre_num > 1 ? 1 : theatreInfo.theatre_num -1;

    window['theatreScroll'] = new iScroll(wrapper_theatre, {
        snap: true,
        momentum: false,
        hScrollbar: false,
        scrollPart : false,
        onBeforeScrollStart : null,
        x : - (_goto_num * 76),
        currPageX : _goto_num,
        wrapperW : 76,
        noScrollWid : getPicSideWid() + 100,
        onScrollEnd : function(){
            if(showTheatreInfo.prePage != this.currPageX){
                addStat(STAT_INDEX_THEATRE_POSTER);
                showTheatreInfo.prePage = this.currPageX;
            }
            showTheatreInfo(this.currPageX);
        }
     });
     //显示当前电影信息
     showTheatreInfo(_goto_num);

     for(var j=0;j<pic_list_li.length;j++){
         (function(){
            var _j = j;
            pic_list_li[_j].onmouseup = function(){
                window['theatreScroll'].scrollToPage(_j);
            }
         })();
     }
}

//显示某个电影当天的放映时刻表;
function showTheatreInfo(index) {
    var _cur_inf = T.g('theatre_info_list_'+ index),
        _cur_pic = T.g('theatre_pic_list_'+ index);

    if(!(_cur_inf&&_cur_pic) ){
        return;
    }


    for(var i=0;i<theatreInfo.theatre_num;i++){
        T.g('theatre_info_list_'+i).style.display = 'none';
    }
    _cur_inf.style.display = '';
}