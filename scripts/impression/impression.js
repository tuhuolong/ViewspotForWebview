window.templateType = 'impression';
window.impressionPage = 0;
/*
 *重置页面内容   
 */
function resetPageContent() {
    if(T.g('impression_index')){
        T.g('impression_index').style.display = 'none';
    }
}



//impression的向服务器请求数据的url格式，
function getPlaceInfo(callback) {
	if(T.g('comment_footer')){
		T.g('comment_footer').style.display='none';
	}
	if(T.g('comment_footer_loading')){
		T.g('comment_footer_loading').style.display = '';
	}
	scriptRequest(config.dataUrl + '/detail?qt=sreview&wd='+window.poiInfo.wd+'&uid=' + window.poiInfo.uid + '&page='+window.impressionPage+'&rn=10&t='+Date.now(),'getImpressionInfo',{'cbFun':callback, 'sendUid':1});
}


/**
 *填充数据
 *@param {obj} json 数据内容 必填
		json 为客户端传入的数据，或者 回调函数传入的数据
 *@param {string} type 数据来源 saveData 标示来源与本地存储;
 */
function fillData(json, uid, opts) {
    var json = json || {};

	var impressionIndex = json;
    if(!impressionIndex){
		return;
	}
	impressionInfo(impressionIndex);
	//向服务器发送的请求页，第2页
	window.impressionPage = window.impressionPage + 1;
	if(T.g('comment_footer_loading')){
		T.g('comment_footer_loading').style.display = 'none';
	}
	if(window.impressionPage*10 >= window.total_comment_num){
    	 if(T.g('comment_detail_container')){
            T.g('comment_detail_container').style.border = '1px solid';
         }         
    }else{
    	if(T.g('comment_footer')){
			T.g('comment_footer').style.display='';
		}
    }

}

/*评论信息*/
function impressionInfo(impressionIndex) {
    var total_re_num = impressionIndex && impressionIndex.total_re_num,
		wd = impressionIndex && impressionIndex.wd,
		comment_info = impressionIndex && impressionIndex.comment_info,
        htmls = [],
        haveData = false;
	window.total_comment_num = parseInt(total_re_num);
    //如果没有数据则返回;
    if(!(total_re_num && wd && comment_info && comment_info.length)) {
        return;
    }
	var j = {};
	j.info = comment_info;

	if(!window.impressionPage){
		htmls.push('<div class="impression_index_container">');
		htmls.push('    <div class="comment_from font_2 center">');
		htmls.push('        <span class="bigfont_red_center">“'+wd+'”</span><span class="font_1 ">在'+total_re_num+'条评论中提到</span>')
		htmls.push('   </div>');
		htmls.push('	<div class="comment_detail_container" id="comment_detail_container">');
	}
	for(var k=0; k<j.info.length; k++){
	
		var info = j.info[k];
		//如果没有内容则继续;
		if(!(info && info.content)){
			continue;
		}

		htmls.push('<div class="impression_detail box_bottom_dashed">');

		info.user_name = info.name ?info.name : "身边网友";
		info.logo_url = info.logo_url ?info.logo_url: "../img/default_usericon.png";
		info.rating=info.rating ?info.rating: "0";

		var ratingwidth= Math.round((info.rating*1)*(60/5) + parseInt(info.rating*1)*2);
		htmls.push('    <div class="title">');
		htmls.push('        <div class="name_impression bigfont">'+info.user_name +'</div>');
		htmls.push('         <div class="oneline_impression">');
		htmls.push('        		<span class="star"><b style="width: '+ratingwidth+'px"></b></span>');
		htmls.push('        		<span class="score_impression">'+info.rating+'</span>');		
		htmls.push('        </div>')
		htmls.push('    </div>');
		
		//高亮处 处理
		if(!info.highlight_sentence){
			return;
		}
		var highlight_sentence = [];
		highlight_sentence = info.highlight_sentence.split(',');
		var lightStartIndex = parseInt(highlight_sentence[0]),
			lightEndIndex = parseInt(highlight_sentence[1]);
		//end 高亮处 处理
		
		/*start 短评论处理*/
		if(!info.short_sentence){
		}
		var short_sentence = [];
		short_sentence = info.short_sentence.split(',');
		var shortStartIndex = parseInt(short_sentence[0]),
			shortEndIndex = parseInt(short_sentence[1]);
		var shortLightStartIndex = lightStartIndex - shortStartIndex,
			shortLightEndIndex = lightEndIndex - shortStartIndex;
		/*end 短评论处理*/
		
		/*得到full_info和short_info,将<b></b>标签插入进*/
		var full_info = info.content;
		//var short_info = info.content.Substring(shortStartIndex,shortEndIndex);
		var short_info = info.content.slice(shortStartIndex,shortEndIndex);
		full_info = full_info.slice(0,lightStartIndex)+"<b>"+
					full_info.slice(lightStartIndex,lightEndIndex)+"</b>"+
					full_info.slice(lightEndIndex,full_info.length);
		short_info = short_info.slice(0,shortLightStartIndex)+"<b>"+
					short_info.slice(shortLightStartIndex,shortLightEndIndex)+"</b>"+
					short_info.slice(shortLightEndIndex,short_info.length);
		
		if(full_info.length == short_info.length){
			htmls.push('<div class="info  "><span>'+full_info +' </span></div>');
		}else{
			htmls.push('<div  class="info" style="display:none" id="_impression_full_info'+window.impressionPage+'p'+k+'" onclick="showDetail(this,\'_impression_short_info'+window.impressionPage+'p'+k+'\')"><span>'+full_info+'</span> <span class="shangla"></span></div>');
			htmls.push('<div class="info" id="_impression_short_info'+window.impressionPage+'p'+k+'" onclick="addStat(\''+STAT_IMPRESSION_XIALA+'\');showDetail(this,\'_impression_full_info'+window.impressionPage+'p'+k+'\')"><span >'+short_info+'</span> <span class="xiala"></span></div>');
			//htmls.push('<div class="info" onclick="showDetail(this)"><span >'+short_info + ' '+shortLightStartIndex + ' '+short_info.length+' '+shortLightEndIndex +'</span> <span class="xiala"></span></div>');
		}
		var info_src_name;
		eval("info_src_name="+info.sub_src);
		htmls.push('	<div class="subSrc">'+info_src_name.cn_name+'</div>');	

		//htmls.push('    <div class="date">'+year+'-'+month+'-'+day+' '+hour+':'+minute+'</div>');
		htmls.push('    <div class="date">'+info.comment_time+'</div>');
		htmls.push('</div>');
	}
	if(!window.impressionPage){
		htmls.push('	</div>');//comment_detail_container end
		if(10 < total_re_num){
			htmls.push('	<div class="comment_footer" id="comment_footer" onclick="addStat(\''+STAT_INDEX_CLICK_MORE_COMMENT+'\');getPlaceInfo(\'fillTemplate\',\''+wd+'\')">更多评论</div>');
			htmls.push('	<div class="comment_footer" id="comment_footer_loading" style="display:none" ><span></span>正在载入</div>');
		}
		htmls.push('    </div>');
	}
    if(!haveData){
        //插入HTML代码
        if(!window.impressionPage){
        	T.g("impressionCon").innerHTML = htmls.join('');
	        //设置层显示
	        T.g("impressionCon").style.display = '';
			T.g("impression_index").style.display = '';
			if(10 >= total_re_num){
                if(T.g('comment_detail_container')){
                    T.g('comment_detail_container').style.border="1px solid";
                }				
			}
			addStat(STAT_IMPRESSION_SHOW);
        }else{
            if(T.g("comment_detail_container")){
                T.g("comment_detail_container").innerHTML += htmls.join('');
            }        	
        }
    }

    callAppFun('relayout');
	
}
function showDetail(ele, eleToShow){
	ele.style.display='none';
	document.getElementById(eleToShow).style.display='';

    callAppFun('relayout');
}
