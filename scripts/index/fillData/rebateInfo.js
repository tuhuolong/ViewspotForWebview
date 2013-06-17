


/**
 * 折扣信息入口展示
 * @author jason.zhou
 * @param {Array} 折扣信息
 */
function rebateInfo(data){
    resetTemp.rebateInfo = resetTemp.rebateInfo || {};
    //如果没有数据则返回;
    if (!(data && data.length)) {
        return;
    }
    data = T.array.filter(data, function(item, i){
        return !!item.title;
    });
    if (!data.length) {
        return;
    }
    var dataNum = data.length,
        d = data[0],        
        tit = d.title.replace(/&lt;[\w\\/]*&gt;/ig,''),
        tit_str = dataNum>1 ? '折扣信息' : tit,
        num_str = dataNum>1 ? '<span class="num_con">'+ dataNum +'</span>' : '',
        html;
    html = '    <li class="color_1 rebate_css"><a href="javascript:void(0)" onclick="addStat(\''+ STAT_INDEX_CLICK_REBATE + '\');callAppFun(\'newwindow\',{page:\'rebate.html\'})">' + tit_str + num_str + '</a></li>';

    //记录是否有优惠信息
    resetTemp.rebateInfo.dataNum = dataNum;
    if(dataNum){
        //插入HTML代码
        T.g('rebateInInfo').innerHTML = html;
        //设置层显示
        T.g('rebateInInfo').style.display = '';
        T.g('saleGrouponCon').style.display = '';
    }
}
