

//大家印象
function pubImpression(extD,opts){
    resetTemp.pubImpression = resetTemp.pubImpression || {};
	var haveData = false,
	    data = extD.detail_info && extD.detail_info.di_review_keyword;

	/*自测代码
	//添加测试数据
	var data = new Array();
	data[0] = new Object();
	data[0] = {'keyword':'吃好喝好','keyword_type':1,'keyword_num':10};
	
	data[1] = new Object();
	data[1].keyword = '服务热情';
	data[1].keyword_type = 1;
	data[1].keyword_num = 6;
	
	data[2] = new Object();
	data[2].keyword = '环境优雅';
	data[2].keyword_type = 1;
	data[2].keyword_num = 8;
	
	data[3] = new Object();
	data[3].keyword = '卫生干净';
	data[3].keyword_type = 1;
	data[3].keyword_num = 13;
	
	data[4] = new Object();
	data[4].keyword = '菜品不错';
	data[4].keyword_type = 1;
	data[4].keyword_num = 6;

	data[5] = new Object();
	data[5].keyword = '服务不错';
	data[5].keyword_type = 1;
	data[5].keyword_num = 56;

	data[6] = new Object();
	data[6].keyword = '态度极好';
	data[6].keyword_type = 1;
	data[6].keyword_num = 20;

	data[7] = new Object();
	data[7].keyword = '态度不好';
	data[7].keyword_type = 0;
	data[7].keyword_num = 1;

	data[8] = new Object();
	data[8].keyword = '环境嘈杂';
	data[8].keyword_type = 0;
	data[8].keyword_num = 1;	
	自测代码*/
	
    //如果没有数据则返回;
    if(!(data && data.length)){
        return;
    }
    var htmls = [];
    for(var i=0;i<data.length;i++){
        var review_keyword = data[i],
            //stat = '',
            //s_name =  _json.s_name||"",
			keyword = review_keyword.keyword||"",
			keyword_type = review_keyword.keyword_type||"",
			keyword_num = review_keyword.keyword_num||"";
			keyword_type = parseInt(keyword_type);
		//keyword不存在 或者 keyword_num为0则不显示
        if((!keyword) || (!keyword_num)){
            continue;
        }
        //统计信息
        //stat = ' onclick = "addStat(\''+ STAT_INDEX_CLICK_MORE +'\',{datatype:\'more\',datafrom:\''+_json.name.toLowerCase()+'\'})"';
		if(keyword_type){
			htmls.push('    <li><a href="javascript:void(0)" class="button_box good"  onclick="impressionIndex(\''+keyword+'\')">'+ keyword+'<span>'+keyword_num +'</span></a></li>');
        }else{
			htmls.push('    <li><a href="javascript:void(0)" class="button_box bad"  onclick="impressionIndex(\''+keyword+'\')">'+ keyword+'<span>'+keyword_num +'</span></a></li>');
		}
		haveData = true;
    }
    

    if(haveData){
//        插入HTML代码
        T.g("impressionInfo").innerHTML = htmls.join('');
//        设置层显示
        T.g("pubImpression").style.display = '';
        resetTemp.pubImpression.haveImpression = true;
    }
}

function impressionIndex(keyword){
    resetTemp.impressionIndex = resetTemp.impressionIndex || {};
	//location.href = "../../pages/impression.html";
    if(!resetTemp.impressionIndex.impression_flag){  
        addStat(STAT_INDEX_CLICK_SHOW_KEY,{'uniq':'1'});
        resetTemp.impressionIndex.impression_flag = true;
    }else{
        addStat(STAT_INDEX_CLICK_SHOW_KEY);
    }
    callAppFun('newwindow',{'page':'impression.html','wd':keyword});
}
