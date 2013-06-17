
//by jingd

function ktvInfo(extD,opts) {
    resetTemp.ktvInfo = resetTemp.ktvInfo || {};
    var data = extD.price_table || {},
        htmls = [];
    window._ktvData = data;
    if(!(data && data.length)){
        return;
    }

    var nowDay = new Date().getDay(),
        numToDay =["周日","周一","周二","周三","周四","周五","周六"],
        today = numToDay[nowDay],
        dayArray = new Array(),
        IsDayExist = false,
        roomArray = new Array(),
        IsRoomExist = false,
        unitArray = new Array(),
        IsUnitExist = false;
    for(var i=0;i<data.length;i++){
        for(var j=0;j<dayArray.length;j++){
            if(dayArray[j] == data[i].price_day){
                IsDayExist = true;
            }
        }
        if(!IsDayExist){
            dayArray[dayArray.length] = data[i].price_day;
        }else{
            IsDayExist = false;
        }
        for(var j=0;j<roomArray.length;j++){
            if(roomArray[j] == data[i].price_box){
                IsRoomExist = true;
            }
        }
        if(!IsRoomExist){
            roomArray[roomArray.length] = data[i].price_box;
        }else{
            IsRoomExist = false;
        }

    }
    htmls.push('<div class="ktv_menu">');
    htmls.push('    <div class="menu_btn">');
    htmls.push('        <div>');
    htmls.push('            <select id="ktv_select_1" onchange="updateKtvRoom();">');
    var IsTodayExist = false;
    for(var i=0;i<dayArray.length;i++){
        if(dayArray[i] == today){
            htmls.push('        <option value="'+today+'" selected="selected">'+today+'</option>');
            IsTodayExist = true;
        }else{
            htmls.push('        <option value="'+dayArray[i]+'">'+dayArray[i]+'</option>');
        }
    }
    htmls.push('            </select>');    
    htmls.push('        </div>'); 
    htmls.push('        <div class="ktv_block"></div>');  
    htmls.push('    </div>');
    htmls.push('    <div class="menu_btn">');
    htmls.push('        <select id="ktv_select_2" onchange="updateKtvDay();">');
    for(var i=0;i<roomArray.length;i++){
        htmls.push('        <option value="'+roomArray[i]+'">'+roomArray[i]+'</option>');
    }
    var priceArray=[];
    for(var i=0;i<data.length;i++){
        if(IsTodayExist){
            if(data[i].price_day == today && data[i].price_box == roomArray[0]){
                priceArray[priceArray.length] = data[i];
                for(var j=0;j<unitArray.length;j++){
                    if(unitArray[j] == data[i].price_unit){
                        IsUnitExist = true;
                    }
                }
                if(!IsUnitExist){
                    unitArray[unitArray.length] = data[i].price_unit;
                }else{
                    IsUnitExist = false;
                }
            }   
        }else{
            if(data[i].price_day == dayArray[0] && data[i].price_box == roomArray[0]){
                priceArray[priceArray.length] = data[i];
                for(var j=0;j<unitArray.length;j++){
                    if(unitArray[j] == data[i].price_unit){
                        IsUnitExist = true;
                    }
                }
                if(!IsUnitExist){
                    unitArray[unitArray.length] = data[i].price_unit;
                }else{
                    IsUnitExist = false;
                }
            }
        }
    }
    htmls.push('        </select>');
    htmls.push('    </div>');
    htmls.push('</div>');
    htmls.push('<div class="content" id="ktv_price_content">')
    for(var j=0;j<unitArray.length;j++){
        if(j){
            htmls.push('<div class="dushed_line"><div class="lack_ball left"></div><div class="lack_ball right"></div><div class="overlay_div overlay_left"></div><div class="overlay_div overlay_right"></div></div>');    
        }
        htmls.push('<div class="content_info">');
        htmls.push('    <div class="price_per">计价单位:<span>'+unitArray[j]+'<span></div>');
        htmls.push('    <ul class="price_table">');
        htmls.push('        <div><li class="ktv_list">时段</li></div>');
        htmls.push('        <div><li class="ktv_list">价格</li></div>');
        for(var i=0;i<priceArray.length;i++){
            
            if(priceArray[i].price_num && priceArray[i].price_unit == unitArray[j]){
                htmls.push('        <div><li class="ktv_list" id="ktv_time_1_'+i+'">'+priceArray[i].price_time+'</li></div>');
                htmls.push('        <div><li class="ktv_list" id="ktv_price_1_'+i+'">'+priceArray[i].price_num+'</li></div>');
            }else if(priceArray[i].price_unit == unitArray[j]){
                htmls.push('        <div><li class="ktv_list" id="ktv_time_1_'+i+'">'+priceArray[i].price_time+'</li></div>');
                htmls.push('        <div><li class="ktv_list" id="ktv_price_1_'+i+'">'+'-'+'</li></div>');    
            } 
        }
        htmls.push('    </ul>');
        htmls.push('</div>');
    }
    htmls.push('<div class="content_ahead_clear"></div>');
    htmls.push('</div>');   //end of content

    if(1){
        //插入HTML代码
        T.g("ktvInfo").innerHTML = htmls.join('');
        //显示dom容器
        T.g("ktvCon").style.display = '';
        resetTemp.ktvInfo.haveKTV = true;
    }
}
function updateKtvRoom(){   //由day的select控制
    var day = document.getElementById("ktv_select_1").value,
        room = document.getElementById("ktv_select_2").value;
    var roomArray=[],
        IsRoomExist = false;
    for(var i=0;i<window._ktvData.length;i++){
        if(window._ktvData[i].price_day == day){
            for(var j=0;j<roomArray.length;j++){
                if(roomArray[j] == window._ktvData[i].price_box){
                    IsRoomExist = true;
                }
            }
            if(!IsRoomExist){
                roomArray[roomArray.length] = window._ktvData[i].price_box;
            }else{
                IsRoomExist = false;
            }
        }
    }
    var selectEle = document.getElementById("ktv_select_2"),
        htmls = [];
    for(var i=0;i<roomArray.length;i++){
        if(roomArray[i] == room){
            htmls.push('<option value="'+roomArray[i]+'" selected="selected">'+roomArray[i]+'</option>');
        }else{
            htmls.push('<option value="'+roomArray[i]+'">'+roomArray[i]+'</option>');
        }
    }
    selectEle.innerHTML = htmls.join('');
    addStat(STAT_INDEX_CLICK_KTV_DAY);
    updateKtvPrice();
}
function updateKtvDay(){    //由room的select控制
    var room = document.getElementById("ktv_select_2").value,
        day = document.getElementById("ktv_select_1").value;
    var dayArray=[],
        IsDayExist = false;
    for(var i=0;i<window._ktvData.length;i++){
        if(window._ktvData[i].price_box == room){
            for(var j=0;j<dayArray.length;j++){
                if(dayArray[j] == window._ktvData[i].price_day){
                    IsDayExist = true;
                }
            }
            if(!IsDayExist){
                dayArray[dayArray.length] = window._ktvData[i].price_day;
            }else{
                IsDayExist = false;
            }
        }
    }
    var selectEle = document.getElementById("ktv_select_1"),
        htmls = [];
    for(var i=0;i<dayArray.length;i++){
        if(dayArray[i] == day){
            htmls.push('<option value="'+dayArray[i]+'" selected="selected">'+dayArray[i]+'</option>');
        }else{
            htmls.push('<option value="'+dayArray[i]+'">'+dayArray[i]+'</option>');
        }
    }
    selectEle.innerHTML = htmls.join('');
    addStat(STAT_INDEX_CLICK_KTV_BOX);
    updateKtvPrice();
}
function updateKtvPrice(){
    var room = document.getElementById("ktv_select_2").value,
        day = document.getElementById("ktv_select_1").value,
        htmls = [],
        priceArray =[],
        unitArray = new Array(),
        IsUnitExist = false;
    for(var i=0;i<window._ktvData.length;i++){
        if(window._ktvData[i].price_day == day && window._ktvData[i].price_box == room){
            priceArray[priceArray.length] = window._ktvData[i];
            for(var j=0;j<unitArray.length;j++){
                if(unitArray[j] == window._ktvData[i].price_unit){
                    IsUnitExist = true;
                }
            }
            if(!IsUnitExist){
                unitArray[unitArray.length] = window._ktvData[i].price_unit;
            }else{
                IsUnitExist = false;
            }
        }
    }

    for(var j=0;j<unitArray.length;j++){
        if(j){
            htmls.push('<div class="dushed_line"><div class="lack_ball left"></div><div class="lack_ball right"></div><div class="overlay_div overlay_left"></div><div class="overlay_div overlay_right"></div></div>');    
        }
        htmls.push('<div class="content_info">');
        htmls.push('    <div class="price_per">计价单位:<span>'+unitArray[j]+'<span></div>');
        htmls.push('    <ul class="price_table">');
        htmls.push('        <div><li class="ktv_list">时段</li></div>');
        htmls.push('        <div><li class="ktv_list">价格</li></div>');
        for(var i=0;i<priceArray.length;i++){
            
            if(priceArray[i].price_num && priceArray[i].price_unit == unitArray[j]){
                htmls.push('        <div><li class="ktv_list" id="ktv_time_1_'+i+'">'+priceArray[i].price_time+'</li></div>');
                htmls.push('        <div><li class="ktv_list" id="ktv_price_1_'+i+'">'+priceArray[i].price_num+'</li></div>');
            }else if(priceArray[i].price_unit == unitArray[j]){
                htmls.push('        <div><li class="ktv_list" id="ktv_time_1_'+i+'">'+priceArray[i].price_time+'</li></div>');
                htmls.push('        <div><li class="ktv_list" id="ktv_price_1_'+i+'">'+'-'+'</li></div>');    
            } 
        }
        htmls.push('    </ul>');
        htmls.push('</div>');
    }
    document.getElementById("ktv_price_content").innerHTML = htmls.join('');
}

