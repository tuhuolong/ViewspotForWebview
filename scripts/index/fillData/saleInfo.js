
/*优惠信息*/

function saleInfo(extD){
    resetTemp.saleInfo = resetTemp.saleInfo || {};
    var data = extD.detail_info && extD.detail_info.premium2,
        htmls = [],
        haveData = false,
        dataNum = 0;

    //如果没有数据则返回;
    if(!(data && data.length)) {
        return
    }

    for(var i=0;i<data.length;i++){
        var d = data[i];
            
        //如果没有优惠标题则继续;
        if(!(d && d.discount_title)){
            continue;
        }

        //如果有数据则haveData 为true
        haveData = true;
        //记录总共有几条优惠数据；
        dataNum ++;
    }  

    var d = data[0],        
        tit = d.discount_title.replace(/&lt;[\w\\/]*&gt;/ig,''),
        tit_str = dataNum>1 ? '优惠信息' : tit,
        num_str = dataNum>1 ? '<span class="num_con">'+ dataNum +'</span>' : '';

    htmls.push('    <li class="color_1"><a href="javascript:void(0)" onclick="addStat(\''+ STAT_INDEX_CLICK_SALE + '\');callAppFun(\'newwindow\',{page:\'sale.html\'})">' + tit_str + num_str + '</a></li>');

    if(haveData){
        //插入HTML代码
        T.g('saleInfo').innerHTML = htmls.join('');
        //设置层显示
        T.g('saleGrouponCon').style.display = '';
        T.g('saleInfo').style.display = '';

        //记录是否有优惠信息
        resetTemp.saleInfo.haveSale = true;
        
    }
    
}

