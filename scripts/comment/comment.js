window.templateType = 'comment';

/**
 *填充数据
 *@param {obj} json 数据内容 必填
 *@param {string} type 数据来源 saveData 标示来源与本地存储;
 */
function fillData(extD,opts) {

    setTemp.fillData = setTemp.fillData || {};

    var opts = opts || {},
        type = opts.type || '',
        src_name = extD.src_name,
        hunter_code = dataConfig[src_name] && dataConfig[src_name]['hunter'] && dataConfig[src_name]['hunter']['comment'] || 0;

    if(!extD) {
		showNoComm();
		return;
	}
    //输出评论信息
    if(extD.review){
        commInfo(extD);
    }else{
		showNoComm();
	}


    if(type != 'emptyData' && type != 'checkData'){

        var opt={};
        if(extD.detail_info&&extD.detail_info.review_flag&&extD.detail_info.review_flag==1){	
            opt.haveWrite=1;
        }
        setTimeout(function(){
            addStat(window["STAT_COMMENT_SHOW"], opt);
        }, 100);
    }

    //开启hunter统计;
    if(hunter_code && !setTemp.fillData.hunter_start){
        window.Hunter && Hunter.start(hunter_code);
        //记录已经开启hunter
        setTemp.fillData.hunter_start = 1;
    }

    //通知客户端设置webview高度
    callAppFun('relayout');

}

/*评论信息*/
function commInfo(extD) {

    //评论排序，将身边评论放在最上方; 
    var data = [];
    if(extD && extD.review && extD.review[0]){
        for(var k=0;k<extD.review.length;k++){
            data.push(extD.review[k]);
            var tmp = data[0];
            if((extD.review[0].name != 'baidumap') && (extD.review[k].name == 'baidumap')){
                data[0] = extD.review[k];
                data[k] = tmp;
            }
        }
    }

    var htmls = [],
        haveData = false,
        show_num_all = 0;
	var cutNum=120;		

    //如果没有数据则返回;
    if(!(data && data.length)) {
        return;
    }

    

	if(extD.detail_info&&extD.detail_info.review_flag&&extD.detail_info.review_flag==1&& window.mobileType != 'ipad'){	
		htmls.push('<div class="comment-btn box_1" id="comment-btn">');
		htmls.push('   <ul class="list con1 write goto_icon">');
		htmls.push('       <li class="back_a"><a href="javascript:void(0)" >给个评价吧</a></li>');
		htmls.push('    </ul>');
		htmls.push('</div>');	
	}
	

    for(var i=0;i<data.length;i++){
        var j = data[i];
		if(!(j&&j.info && j.info.length)){
            continue;
        }
        var style = '',
            className = '',
            url = j.url || '',
            num = 1,
            s_name =  j.s_name||"",
            _review_num = j.review_num || 0,
            _cn_name = j.cn_name || '';

        s_name = s_name=="" ? "" : "_"+s_name;

        var image_url="http://map.baidu.com/fwmap/upload/place/icon/"+j.name+"/50"+s_name+".png";
            


//        if(T.lang.isArray(j.info)){
//            j.info = j.info[0] && j.info[0].content;
//        }
        if(!(j.info && j.info.length)){
            continue;
        }
		
		
		
		htmls.push('<div class="comment">');
		htmls.push('    <div class="comment-from font_2 bigfont">');

//        if(j.name != 'shenbian'){
        htmls.push('        <span class="icon"><img src="'+image_url+'" width="25px" height="25px"></span>');
        htmls.push('        <span class="text">'+_cn_name);
        if(_review_num){
            htmls.push('        ('+_review_num+'条)');
        }
        
        htmls.push('        </span>')
//        }
		
		htmls.push('   </div>');
		
		for(var k=0; k<j.info.length; k++){
		
			var info = j.info[k],
                _price = info.price && (info.price * 1),
                class_header = '',
                _short_id = 'comm_list_short_'+ i + '_' + k,
                _full_id = 'comm_list_full_'+ i + '_' + k;
            //如果没有内容则继续;
            if(!(info && info.content)){
                continue;
            }

            if(k == 0){
               class_header  = ' comment-header';
            }


      /*
            var short_info = info.content,
                info_leng = short_info.length >120 ? 120 : short_info.length;

            //评论最后10个字用 省略号 替换;
            if(info_leng > 50){
                short_info = short_info.slice(0,info_leng - 10) + '...';
            }
		*/
			htmls.push('<div class="comment-detail box_1'+ class_header +'">');

            var user_name = info.user_name ?info.user_name : _cn_name + "网友";
            var user_logo = info.user_logo ?info.user_logo: "../img/default_usericon.png";
            var rating=info.overall_rating ?info.overall_rating: "0";

            var overall_rating = rating || 0,
                ratingwidth= Math.round((overall_rating*1)*(60/5) + parseInt(overall_rating*1)*2);

            htmls.push('    <div class="title">');
            htmls.push('        <div class="icon"><img src="'+user_logo +'" width="42px" height="42px"></img></div>');
            htmls.push('        <div class="name bigfont">'+user_name +'</div>');
            htmls.push('         <div class="oneline">');
            htmls.push('        		<span class="star"><b style="width: '+ratingwidth+'px"></b></span>');
            htmls.push('        		<span class="score">'+rating+'</span>');

            if(_price){
                htmls.push('       		<span class="fenge">| 均价</span>');
                htmls.push('       		 <span class="money">￥'+_price+'</span>');
            }
            
            htmls.push('        </div>')
            htmls.push('    </div>');
            
            var full_info = info.content;
            var short_info = full_info.length>cutNum ? full_info.substr(0, cutNum): full_info;
            
            if(full_info.length <= short_info.length){
                htmls.push('<div class="info  "><span>'+full_info +' </span></div>');
            }else{
                htmls.push('<div class="info" onclick="showDetail(this,\''+ _full_id +'\')" id="'+ _short_id +'"><span >'+short_info + '</span> <span class="xiala"></span></div>');
                htmls.push('<div class="info" onclick="showDetail(this,\''+ _short_id +'\')" id="'+ _full_id +'" style="display:none"><span>'+full_info +' </span> <span class="shangla"></span></div>');
            }
            
            if(info.date){
                    htmls.push('<li class="date">');
                    if(_cn_name){
                        htmls.push('来自'+_cn_name+ ' ');
                    }
                    htmls.push(info.date + '</li>');
            }
            
            htmls.push('</div>');
            num++;
		}
	    if(_cn_name && _review_num && url){
			htmls.push('<div class="comment-footer box_1 font_2 bigfont"><a onclick="addStat(STAT_INDEX_CLICK_COMM_GOTO,{datafrom:\''+ j.name +'\'})" href="' + url + '">到' + _cn_name + '查看全部'+ _review_num +'条评论</a>');
		}
		htmls.push('    </div>')
	
        
    }
    

    if(!haveData){
        //插入HTML代码
        T.g("commentCon").innerHTML = htmls.join('');
        //设置层显示
        T.g("commentCon").style.display = '';
    }
	
	if(T.g("comment-btn")){
		T.g("comment-btn").onclick=function(){
			addStat(window["STAT_COMMENT_CLICK_WRITE"]);
			callAppFun('openModule',{'name':'sbUgc'});
		}
	}
	
}


function showDetail(ele, showDom){
	ele.style.display = 'none';
    T.g(showDom).style.display = '';

    //通知客户端设置webview高度
    callAppFun('relayout');
}
function showNoComm(){
	var html='<ul class="noCommInfo">暂无评论</ul>';
	T.g("commentCon").innerHTML = html;
}