

/*评论信息*/

function commInfo(extD,opts) {
    resetTemp.commInfo = resetTemp.commInfo || {};
    var data = extD.review,
        htmls = [],
        dataNum = 0,
        show_num_all = 0,
        opts = opts || {},
        type = opts.type || {},
        length_limit = 50;

//    data[0].info = [{},{}];
//    data[0].info[0].price = '50';
//    data[0].info[0].overall_rating = '4.0';
//    data[0].info[0].content = '菜做得都很有新意，味道和传统的不太一样，吃个新鲜地方不是很大，应该适合地段有关，二楼的平台不错，要是天气不太热可以选择哪里，吃吃饭，看看风景很是不错。菜做得都很有新意，味';
//    data[0].info[0].date = '12-08-23  21:41';

    htmls.push('');
    
    if(data && data.length){
        for(var i=0;i<data.length;i++){
            var j = data[i];
            if(!j){
                continue;
            }
            for(var k=0;k<j.info.length;k++){
               if(dataNum <5 && j && j.info && j.info[k] && j.info[k].content){
                    var info = j.info[k],
                        short_info = info.content,
                        info_leng = short_info.length >length_limit ? length_limit : short_info.length,
                        price = info.price * 1,
                        user_photo = info.user_logo || '../img/default_usericon.png',
                        user_name = info.user_name || j.cn_name + '网友',
                        overall_rating = info.overall_rating || 0,
                        w = Math.round((overall_rating*1)*(60/5) + parseInt(overall_rating*1)*2),
                        w = isNaN(w)?0:w;

                    if(short_info.length >length_limit){
                        short_info = short_info.slice(0,info_leng)+'...';
                    }
                    if(dataNum != 0){
                        htmls.push('<li class="splitLine1"></li>');
                    }
                    
                    
                    htmls.push('<li class="com_base"><img src="'+ user_photo +'" width="40" height="40" /><div class="com_username">'+ user_name +'</div>');
                    htmls.push('    <div class="st1">');
                    
                    if(typeof overall_rating != 'undefined'){
                        htmls.push('<span class="star"><b style="width:' + w + 'px"></b></span><span class="num">' + overall_rating + '</span>');    
                    }
                    if((typeof overall_rating != 'undefined') && price){
                        htmls.push(' | ');
                    }
                    if(price){
                        htmls.push('<span class="comm_price">均价 <em>&#165;'+ price +'</em></span>');
                    }

                    htmls.push('</div></li>');

                    if(info_leng < length_limit){
                        htmls.push('<li class="comm_cont">'+ short_info + '</li>');
                    }else{
                        htmls.push('<li class="comm_cont" id="comm_list_'+dataNum+'" _id="comm_list_'+dataNum+'_all" onclick="commShow(this)">'+ short_info + '<span class="comm_cont_down_com"></span><span class="showBtn">点击展开<span></span></span></li>');
                        htmls.push('<li class="comm_cont comm_cont_all" style="display:none;" id="comm_list_'+dataNum+'_all" _id="comm_list_'+dataNum+'" onclick="commShow(this)">'+ info.content + '<span class="comm_cont_down_com"></span><span class="hiddenBtn">点击收起<span></span></span></li>');
                        htmls.push('');
                    }
                    

                    if(info.date){
                        htmls.push('<li class="comm_time">');
                        if(j.cn_name){
                            htmls.push('来自'+j.cn_name+ ' ');
                        }
                        htmls.push(info.date + '</li>');
                    }
    //                htmls.push('<li class="back_a"><a href="javascript:void(0)" onclick="addStat(\''+ STAT_INDEX_CLICK_COMM + '\');callAppFun(\'newwindow\',{page:\'comment.html\'})">'+ short_info + '</a></li>');
                    
                    //显示条数计算;
                    dataNum++;
                }

                if(j && j.info && j.info.length && j.review_num){
                    show_num_all += j.review_num * 1;
                } 
            }
            
        }

        htmls.push('<li class="bottom_nav"><div><span><a onclick="addStat(STAT_INDEX_CLICK_WRITE);callAppFun(\'openModule\',{\'name\':\'sbUgc\'});;"><em class="write_icon"></em>我要评论</a></span><span><a onclick="addStat(\''+ STAT_INDEX_CLICK_COMM + '\');callAppFun(\'newwindow\',{page:\'comment.html\'})" href="javascript:void(0)">查看更多评论<em class="goto_icon_1"></em></a></span></div></li>');
    }

    if(type != 'emptyData' && !dataNum){
        T.g("commCon").style.display = 'none';
        T.g('noCommCon').style.display = '';
        return;
    }
    resetTemp.commInfo.haveComm = 1;

    T.g("commInfo").innerHTML = htmls.join('');
    T.g("commCon").style.display = '';
    
}

function commShow(obj) {
    var _id = obj.getAttribute('_id');

    if(T.g(_id)){
        T.g(_id).style.display = 'block';
    }
    
    obj.style.display = 'none';

    callAppFun('relayout');
}
