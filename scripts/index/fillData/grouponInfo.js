
/*展示团购页面信息*/

function grouponInfo(extD){
    resetTemp.grouponInfo = resetTemp.grouponInfo || {};
    var data = extD.detail_info && extD.detail_info.groupon,
        htmls = [],
        haveData = false,
        dataNum = 0,
        grouponTitle = '',
        groupDataStr ='',
        topStyle = '';

       //如果没有数据则返回;
    if(!(data && data.length)) {
        return
    }

    var rebateArr = [];
    for(var i=0;i<data.length;i++){
      var d = data[i];
        //如果有数据则haveData 为true
        haveData = true;
        //记录总共有几条团购数据；
        dataNum ++;
        if(data[i].groupon_rebate){
            rebateArr.push(data[i].groupon_rebate*1)
        }
    }  
    
    

    if(dataNum<=1)
    {
          
          if(data[0].groupon_rebate && data[0].groupon_price){
                grouponTitle = "超低价" + data[0].groupon_price*1 + "元，" + data[0].groupon_rebate*1 + "折"
            }else{
                grouponTitle = data[0].groupon_title.replace(/&lt;[\w\\/]*&gt;/ig,'');
            }
    }
    else
    {
        if(rebateArr.length){
            grouponTitle = "最低" + rebateArr.sort(sortFun)[0] + "折起";
        }else{
            grouponTitle = "团购信息";
        }
        groupDataStr = '<span class="num_con goto_icon_group">'+ dataNum +'</span>';
    }
    htmls.push('<li class="color_1 group_css"'+ topStyle +'><a href="javascript:void(0)" onclick="addStat(\''+ STAT_INDEX_GROUPON_BUTTON_CLICK + '\');callAppFun(\'newwindow\',{page:\'groupon.html\'})"><span>'+grouponTitle+'</span>'+ groupDataStr +'</a></li>');
    if(haveData){
    //插入HTML代码
    	T.g('grouponInfo').innerHTML = htmls.join('');
    //设置层显示
        T.g('saleGrouponCon').style.display = '';
    	T.g('grouponInfo').style.display = '';

    //记录是否有团购信息
    	resetTemp.grouponInfo.haveGroup = true;
        
    }
}
