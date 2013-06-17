
/*展示餐饮排行榜页面信息*/

function rankonInfo(extD){
    resetTemp.rankInfo = resetTemp.rankInfo || {};
    var data = extD.detail_info.toplist.top,
		list = extD.detail_info.toplist.list,
        htmls = [],
		ri = T.g('rankInfo'),
		rli = T.g('rankListInfo'),
        d = null;

       //如果没有数据则返回;
    if(!(data && list && list.length)) {
        return
    }
	//插入HTML代码 对应当前商铺的排行信息
	htmls.push('<li><div id ="rankConShow" class="down">',
	'<span>' , data.title , '</span><span class="imgStyle">' + data.rank +	'</span>',
	'<br/><span class="pvCurrent">' , data.week_visit , '</span></div></li>');

	ri.innerHTML = htmls.join('');

	// 点击当前店铺餐饮排行榜信息，展开或收起下面的其它排行榜前五成员信息列表
	T.g('rankConShow').addEventListener('click',function(){
		if(rli.style.display != "none"){
			addStat(STAT_INDEX_RANK_UP);
			rli.style.display = 'none';
			ri.style.borderBottom = 'none';
			this.className = 'down'
		}else{
			addStat(STAT_INDEX_RANK_DOWN);
			rli.style.display = '';
			ri.style.borderBottom = '#d6d1c9 solid 1px';
			this.className = 'up'
		}
	});

	htmls = [];
    for(var i=0,len=list.length;i<len;i++){
        d = list[i];
		htmls.push('<li><div class="listImg">' + d.rank + '</div>',
			'<div class="listTitle">' , d.name , '</div>',
			'<div class="pvOther">' , d.week_visit , '</div></li>',
			(i != len - 1) ? '<li class = "splitLine1"></li>' : '');
    }  
    
    //插入HTML代码 对应排行榜中其它前五成员的下拉列表
    rli.innerHTML = htmls.join('');
    //设置层显示
	T.g('rankCon').style.display = '';
	ri.style.display = '';
	resetTemp.rankInfo.haveRank = true;
}