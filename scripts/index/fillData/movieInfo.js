
function showMovie(index) {
    
    var cur_nav = T.g('movie_nav_' + index),
        cur_content = T.g('cur_content'),
        cur_content_div = cur_content.getElementsByTagName('div'),
        movie_nav = T.g('movie_nav'),
        movie_nav_li = movie_nav.getElementsByTagName('li');
        
    if(cur_nav.className.indexOf('hover') > -1){
        //点击当天tab量
        addStat(window['STAT_INDEX_CLICK_MOVIE_'+ index +'_0']);
        return;
    }
    
    //记录当前显示的是哪天的影院信息;
        
    resetTemp.movieInfo.curIndex = index;

    for(var i = 0,len = cur_content_div.length; i < len; i++ ){
        if(cur_content_div[i].id.indexOf('movie_info_con') > -1){
            cur_content_div[i].style.display = "none";
        }
    }    

    for(var j = 0,jlen = movie_nav_li.length; j < jlen; j++){
        T.removeClass(movie_nav_li[j], 'hover');
    }

    T.g('movie_info_con' + index).style.display = 'block';
    T.addClass(cur_nav,'hover');
    T.g('movie_info_con' + index).style.display = '';

    T.g('movie_nav').style.background = "#e9e9e9";
    if(index == 1 && !showMovie.hasAddMoiveAnimation){
        addMoiveAnimation(1);
        showMovie.hasAddMoiveAnimation = true;
    }
    
    if(index == 2){
        T.g('movie_nav').style.background = "#ffffff";
    }
    if(index == 2 && !showMovie.hasAddMoiveAnimation2){
        addMoiveAnimation(2);
        showMovie.hasAddMoiveAnimation2 = true;
    }

    //点击另一天tab量
    addStat(window['STAT_INDEX_CLICK_MOVIE_'+ index +'_1']);
    callAppFun('relayout');
}


function getPicSideWid(opts) {
    var opts = opts || {},
        width = opts.width || 35,//35为图片一半的宽度
        body_width = document.body.clientWidth,
        mv_content_width = body_width - 12,
        pic_side_width = (mv_content_width / 2) - width; 

    return pic_side_width;
}

 var getClientTime = function(){ //获取客户端时间 转换为 --:--:--格式
    var _clietToday = new Date()
        _month = _clietToday.getMonth() + 1,
        _month = _month >9 ? _month : '0' + _month,
        _day = _clietToday.getDate(),
         _day = _day >9 ? _day : '0' + _day;

    return _clietToday.getFullYear() + '-' + _month + '-' + _day;
}


function movieInfo(extD,opts) {
    resetTemp.movieInfo = resetTemp.movieInfo || {};
    var data = extD.other_info || {},
        time_table = data.time_table,
        base_movie = data.base,
        src_name = extD.src_name,
        pic_side_width = getPicSideWid(),
        show_style = data.webview_style || "",
        now_time = data.now_time || getClientTime();

    
    if(show_style == 1 && time_table.length > 0){
       resetTemp.movieInfo.moviebooking = 1;
    }

    //获取电影当前日期;
    var getMovieDay = function(time){
        if(!time){
            return '';
        }
        var time_info = time.split('-'),
            time_info = time_info[1] + '.'+ time_info[2] +'';
        return time_info;
    }
    //根据今天日期获取明天日期
    var getTomorrowDate = function(time){
        var _timeArr = time.split('-'),
            _today = new Date(_timeArr[0],_timeArr[1] - 1,_timeArr[2]),
            _month = _day = 0;

        _today.setDate(_today.getDate()+1);

        _month = _today.getMonth() + 1;
        _month = _month >9 ? _month : '0' + _month;

        _day = _today.getDate();
        _day = _day >9 ? _day : '0' + _day;

        return _today.getFullYear() + '-' + _month + '-' + _day;
    }

   
    var htmls = [],
        movie_info = [],
        base_info = {},
        day_movie_num = [],//记录当天电影的条数;
        from_src = {};

    movieInfo.day_movie_num = day_movie_num;

    htmls.push('<div class="movie_nav_title_con"><span class="movie_nav_title_icon"></span>选座订票<span class="movie_nav_title_new"></span></div>');
    htmls.push('<div class="movieCon">');
    htmls.push('<div class="movie_nav_con">');
    htmls.push('        <ul class="movie_nav" id="movie_nav">');


    var time1_info = getTomorrowDate(now_time),
        time2_info = getTomorrowDate(time1_info);
      
    
    htmls.push('            <li id="movie_nav_0" class="today hover" onclick="showMovie(0)"><span>今天' + getMovieDay(now_time) +'</span></li>');
    htmls.push('            <li id="movie_nav_1" onclick="showMovie(1)"><span>明天' + getMovieDay(time1_info) +'</span></li>');
    htmls.push('            <li id="movie_nav_2" onclick="showMovie(2)"><span>后天' + getMovieDay(time2_info) +'</span></li>');
    
    htmls.push('        </ul>');
    htmls.push('    </div>');

    htmls.push('<div id="cur_content" class="cur_content">')

    var bookingDate = [];
        bookingDate[0] = [];
        bookingDate[1] = [];
        bookingDate[2] = [];

    if(time_table && time_table.length > 0){
        for(var m = 0, len = time_table.length; m < len; m++){
            if(now_time == time_table[m][0].date){
               bookingDate[0] =  time_table[m];
            }
            if(getTomorrowDate(now_time) == time_table[m][0].date){
               bookingDate[1] =  time_table[m];
            }
            if(getTomorrowDate(getTomorrowDate(now_time)) == time_table[m][0].date){
               bookingDate[2] =  time_table[m];
            }
        }
    }    


    if(bookingDate[0].length < 1 && bookingDate[1].length < 1 && bookingDate[2].length < 1){
        return;
    }

    for(var i=0;i<bookingDate.length;i++){
        var _m_obj = {},
            _mv_num = 0;            
        
        for(var j=0;j<bookingDate[i].length;j++){
            var _m_inf = bookingDate[i][j];
            if(!_m_obj[_m_inf.movie_id]){
                _m_obj[_m_inf.movie_id] = [];
                _mv_num ++;
            }
            _m_obj[_m_inf.movie_id].push(j);
        }

        movie_info.push(_m_obj);
                
        //记录当天电影的条数;
        day_movie_num.push(_mv_num);
    }

    //当只有1天的电影信息时，将数组的长度补齐，便于下面for循环输出;
    

    for(var k=0;k<base_movie.length;k++){
        var _inf = base_movie[k];
        base_info[_inf.movie_id] = k;
    }

    for(var i=0;i<movie_info.length;i++){

        var _style = ' style="display:none"',
            movie_num = 0,
            htmls_pic = [],
            htmls_info = [],
            scroll_width = day_movie_num[i] * 76;
        if(i == 0){
            _style = '';
        }
        htmls.push('<div id="movie_info_con'+ i +'"'+ _style +'>');

        //如果没有电影信息，则继续
        if(bookingDate[i] == ''){
            htmls.push('<div class="mv_nothing"></div>');
            htmls.push('</div>');
            continue;
        }
     
        htmls_pic.push('    <div id="wrapper'+ i +'" class="movie_wrapper">');
        htmls_pic.push('    <div id="scroller" class="movie_pic_list_con" style="width:'+ (scroll_width + pic_side_width*2) +'px">');
        htmls_pic.push('       <ul class="movie_pic_list" id="movie_pic_list_'+ i +'">');
        htmls_info.push('    <div class="movie_info_list_con" id="movie_info_list_con'+ i +'">');

        for(var j in movie_info[i]){
               
            var _m_inf1 = base_movie[base_info[j]],
                _m_inf2 = movie_info[i][j],
                _style1 = ' style="display:none"',
                _style2 = '',
                _movie_director = _m_inf1.movie_director || '-',
                _movie_starring = _m_inf1.movie_starring || '-',
                _movie_length = _m_inf1.movie_length || '-',
                _movie_type = _m_inf1.movie_type || '',
                _movie_pic = _m_inf1.movie_picture || '',
                _movie_name = _m_inf1.movie_name || '';

            if(movie_num == 0){
                _style1 = '';
                _style2 = ' style="margin-left:'+ pic_side_width +'px"';
            }else if(movie_num == day_movie_num[i]){
                _style2 = ' style="margin-right:'+ pic_side_width +'px"';
            }
            htmls_pic.push('            <li'+_style2+'><img alt="'+_movie_name+'" src="'+ _movie_pic +'" width="69" height="84" /></li>');
            htmls_info.push('<div'+ _style1 +' id="movie_info_list_'+ i + '_' + movie_num +'">');
            htmls_info.push('<ul class="movie_info_list1">');
            htmls_info.push('<li class="mv_title">'+ _m_inf1.movie_name +'</li>');
            htmls_info.push('<li><span class="mv_length">片长：</span>'+ _movie_length +'分钟</span><span class="mv_type">类型：</span>'+ _movie_type +'</li>');
            htmls_info.push('<li><span>导演：</span>'+ _movie_director +'</li>');
            htmls_info.push('<li><span>主演：</span>'+ _movie_starring +'</li>');
            htmls_info.push('</ul>');
            htmls_info.push('<ul class="movie_info_list2" id="movie_info_'+ i +'_'+ j +'">');

            for(var k=0;k<_m_inf2.length;k++){
                var _time_tb = bookingDate[i][_m_inf2[k]] || {},
                    _mv_str = '<div class="mv_lef_lin mv_lef_lin_null"></div>',
                    _wap_url = _time_tb.src_info && _time_tb.src_info[0] && _time_tb.src_info[0].wap_url || '',
                    _from = _time_tb.src_info && _time_tb.src_info[0] && _time_tb.src_info[0].src || '',
                    _style_class = 'movie_yd movie_bnyd',
                    booking_box = [];
                    
                    resetTemp.movieInfo.movie_fr = _from; //统计电影来源

                if(_time_tb.time && _time_tb.lan && _time_tb.type){
                   _mv_str = '<div class="mv_lef_lin"><span class="mv_time">' + _time_tb.time +'</span><span class="mv_lang">'+ _time_tb.lan + '/' + _time_tb.type + '</span></div>';
                    if(_wap_url && !from_src[_from]){
                            from_src[_from] = 1;
                        }
                }

                if(show_style == 1 && _time_tb.time){ //可预订
                    
                    booking_box.push('<span class="time">'+_time_tb.time+'</span>');
                    
                    var _time_tab_lan = _time_tb.lan || '-',
                        _time_tab_type = _time_tb.type || '-',
                        _time_tab_theater = _time_tb.theater || '-',
                        _time_tab_price = (_time_tb.src_info[0] && _time_tb.src_info[0].price) || _time_tb.origin_price || '-',
                        classNameLi = '';
                        styleLi = '';

                     var opt_third_from = _time_tb.src_info[0] && _time_tb.src_info[0].src || '',
                         opt_date       = _time_tb.date || "",
                         opt_cinema_id  = _time_tb.src_info[0] && _time_tb.src_info[0].cinema_id || '',
                         opt_seq_no     = _time_tb.src_info[0] && _time_tb.src_info[0].seq_no || '',
                         opt_movie_id   = _time_tb.src_info[0] && _time_tb.src_info[0].movie_id || '';

                     var  movieUrl = config.dataUrl + '/detail?qt=movie&act=select&from=webview'
                        + '&third_from=' + opt_third_from  
                        + '&seq_no=' + opt_seq_no  
                        + '&cinema_id=' + opt_cinema_id  
                        + '&date=' + opt_date 
                        + '&movie_id=' + opt_movie_id
                        + '&movie_info=' + encodeURIComponent('{"lan" : "' + _time_tab_lan + '","time" : "' + _time_tb.time +'","price" : "' + _time_tab_price +'","name" : "' + _m_inf1.movie_name +'"}');
                    booking_box.push('<span class="lan">'+ _time_tab_lan +"/" + _time_tab_type + '</span>');
                    booking_box.push('<span class="theater">'+ _time_tab_theater +'</span>');
                    booking_box.push('<span class="price">￥'+ _time_tab_price +'</span>');

                    if(opt_seq_no){
                        booking_box.push('<span class="btn">选座订票</span>');
                    }else{
                        booking_box.push('<span class="gray_btn">选座订票</span>');
                        }

                    if(k > 6){
                      classNameLi = 'bookingBox showlist';
                      styleLi =  'style="display:none"'
                    }else{
                      classNameLi = 'bookingBox';
                      styleLi = ''; 
                    }
                   
                    if(_time_tb.src_info[0] && _time_tb.src_info[0].seq_no){
                        if(opt_third_from == "wangpiao"){
                             htmls_info.push('<li class="'+classNameLi+'" ' + styleLi + ' onclick="movieOpenLink(\''+movieUrl+'\',' + STAT_INDEX_MOVIE_URL + ');">'+ booking_box.join('') +'</li>');
                        }else if(opt_third_from == "wanda"){
                             htmls_info.push('<li class="'+classNameLi+'" ' + styleLi + ' onclick="callAppFun(\'newwindow\',{page:\'wandamoviecheck.html\', third_from:\''+opt_third_from+'\',  date:\''+opt_date+'\',  cinema_id:\''+opt_cinema_id+'\',  seq_no:\''+opt_seq_no+'\',  movie_id:\''+opt_movie_id+'\'});">'+ booking_box.join('') +'</li>');
                        }else if(_time_tb.src_info[0].wap_url){
                           htmls_info.push('<li class="'+classNameLi+'" ' + styleLi + ' onclick="movieOpenLink(\'' + _time_tb.src_info[0].wap_url + '\');">'+ booking_box.join('') +'</li>');
                        }  
                    }else{
                          htmls_info.push('<li class="'+classNameLi+'" ' + styleLi + '">'+ booking_box.join('') +'</li>');
                    }
                   
                }else{ //不可预订 poi
                    htmls_info.push('<li class="' + _style_class+ '" >'+ _mv_str +'</li>');
                }
                
            }

            if(show_style != 1 && (_m_inf2.length) % 2 != 0){
                htmls_info.push('<li class="' + _style_class +'"><div class="mv_lef_lin"></div></li>');
            }

            
            htmls_info.push('</ul>');
            if(show_style == 1 && _m_inf2.length > 7){
                    htmls_info.push('<div class="bottom_nav bottom_nav_1"><a href="javascript:void(0)" onclick="movieShowList(this, \'showlist\', \'movie_info_'+i+'_'+j+'\')">查看更多影讯<em class="goto_icon_1"></em></a></div>');
            }
            htmls_info.push('</div>');

            movie_num ++;
        }
        
        htmls_pic.push('        </ul>');
        htmls_pic.push('    </div>'); 
        htmls_pic.push('    </div>'); 

        htmls_info.push('        </ul>');
        htmls_info.push('<span class="cur_movie_point"></span>')
        htmls_info.push('    </div>');

        htmls.push(htmls_pic.join(''));
        htmls.push(htmls_info.join(''));
        htmls.push('</div>');
    }
    htmls.push('</div>');
    htmls.push('</div>');
    //计算今天电影数据有几家合作方
    var _from_str = '';
    for(var i in from_src){
        _from_str += i + '|';
    }
    _from_str = _from_str.replace(/\|$/,'');

    T.g("movieCon").style.display = '';
    T.g('movieCon').innerHTML = htmls.join('');

    addMoiveAnimation(0);

    //重新生成数据后将上次绑定标记删除;
    showMovie.hasAddMoiveAnimation = false;
    showMovie.hasAddMoiveAnimation2 = false;

    //记录有影讯信息;
    resetTemp.movieInfo.haveMovie = 1;
    resetTemp.movieInfo.haveMovieLink = _from_str;

}

//电影院图片列表添加动画效果;
function addMoiveAnimation(i) {
    var wrapper = T.g('wrapper' + i) || '',
        pic_list = T.g('movie_pic_list_' + i) || '';

    if(!(wrapper && pic_list)){
        return;
    }
    var pic_list_li = pic_list.getElementsByTagName('li'),
        _goto_num = movieInfo.day_movie_num[i] > 1 ? 1 : movieInfo.day_movie_num[i] -1;

    window['myScroll' + i] = new iScroll(wrapper, {
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
            showMovieInfo(this.currPageX);
        }
     });
     //显示当前电影信息
     showMovieInfo(_goto_num);

     for(var j=0;j<pic_list_li.length;j++){
         (function(){
            var _j = j,
                _i = i;
            pic_list_li[_j].onmouseup = function(){
                window['myScroll' + _i].scrollToPage(_j);
            }
         })();
     }
}

//显示某个电影当天的放映时刻表;
function showMovieInfo(index) {
    var _cur_ind = resetTemp.movieInfo.curIndex || 0,
        _cur_inf = T.g('movie_info_list_' + _cur_ind + '_' + index);

    if(!_cur_inf){
        return;
    }
    for(var i=0;i<movieInfo.day_movie_num[_cur_ind];i++){
        T.g('movie_info_list_' + _cur_ind + '_' +i).style.display = 'none';
    }

    _cur_inf.style.display = '';
}

function movieShowList(obj, className, id, type){

   var showText = '查看更多影讯<em class="goto_icon_1"></em>',
       showText2 = '查看更多影讯<em class="goto_icon_1 btn2"></em>',
       hidText = '收起更多影讯<em class="goto_icon_1"></em>',
       sel = baidu.dom.q(className, id);
   
   if(obj.innerHTML == showText){
       obj.innerHTML = hidText;
       for(var i=0; i<sel.length; i++){
             sel[i].style.display = 'block';
             if(i > 5){
                obj.innerHTML = showText2;
                break;
            }
        }
   }else if(obj.innerHTML == showText2){
        obj.innerHTML = hidText;
        for(var i=0; i<sel.length; i++){
         sel[i].style.display = 'block';
        }
   }else{
       obj.innerHTML = showText;
       for(var i=0; i<sel.length; i++){
             sel[i].style.display = 'none';
        }
   }
   callAppFun('relayout');
}

function movieOpenLink(url, code){
    window.open(url);
    if(code){
        addStat(code);
    }

}