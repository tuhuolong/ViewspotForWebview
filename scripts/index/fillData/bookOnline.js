
/*优惠信息*/

window._haveData_tel_fantong = false


function bookOnline(extD){
    resetTemp.bookOnline = resetTemp.bookOnline || {};
    var data = extD.rich_info || {};


    //添加 在线预订 by jgd
    /*
    **修改标注：
    **  如果存在ext.rich_info.reservation[], 则添加此部分
    **  8.9对应discount
    **  background=url(http://map.baidu.com/fwmap/upload/place/icon/'+extD.rich_info.reservation[0].src+'/50.png)
    **  onclick = extD.rich_info.reservation[0].url;
    */
    if(data.reservation){
        var _htmls_reservation = [],
            _htmls_reservation_tel = [],
            _haveData_reservation = false,
            _haveData_tel_order = false,
            from_arr = ['dingcanmishu','fantong'],
            fantongTelS = '';

        for(var i=0;i<from_arr.length;i++){
            var _from = from_arr[i],
                _item = data.reservation[_from] || {},
                _discount = _item.discount * 1 || '',
                _phone = _item.phone || '',
                _src = _item.src || '',
                _bg = 'http://map.baidu.com/fwmap/upload/place/icon/'+_src+'/50.png',
                _extern_link = _item.url_mobilephone || '';

            if(_src && _extern_link){
                _htmls_reservation.push('<li class="color_1 tel_style"><a href="'+_extern_link+'" onclick="addStat('+ STAT_CATER_YD_CLICK + ',{_from:\''+ _src +'\'})" target="_blank"><span style="background-image:url(\''+_bg+'\');">在线订座');
                if(_discount && !isNaN(_discount) && _discount>0 && _discount<1){
                    _htmls_reservation.push(' : <em>'+_discount*10+'</em>折');
                }
                _htmls_reservation.push('</span></a></li>');

                _haveData_reservation = true;

                resetTemp.bookOnline.haveDcan = _src;
                
            }

            if(_phone && _from == 'fantong' && (!_src || !_extern_link)){
                fantongTelS = 'fantongTelS';
                window._haveData_tel_fantong = true;
            }else{
                fantongTelS = '';
                window._haveData_tel_fantong = false;
            }

            if(_phone){
                _htmls_reservation_tel.push('<li class="color_1 order_tel_icon tel_style"><a class= "'+fantongTelS+'" onclick="addStat(STAT_CATER_TEL_CLICK, {_from:\'' +_src + '\'});callAppFun(\'tel\',{tel:\''+ _phone +'\'});return false;" target="_blank"><span>电话订座');
                _htmls_reservation_tel.push('</span></a></li>');

                _haveData_tel_order = true;
                resetTemp.bookOnline.haveTel = _src;
            }
            

            if(_haveData_reservation || _haveData_tel_order){
                //显示一条数据后退出
                break;
            }
            
        }
        if(_haveData_reservation || _haveData_tel_order){
            
            if(_haveData_reservation){
                T.g("bookOnlineCon").innerHTML = _htmls_reservation.join('');
                T.g("bookOnline").style.display="";
            }
            if(_haveData_tel_order){
                T.g("teleOrderCon").innerHTML = _htmls_reservation_tel.join('');
                T.g("teleOrder").style.display="";
            }

            if(_haveData_reservation && _haveData_tel_order){
                T.addClass(T.g("bookTelOrderCon"),'bookTelOrder');
            }


            
            if(T.g('telNumCon') && T.g('telNumCon').parentNode){
                T.removeClass(T.g('telNumCon').parentNode,'tel_style');
            }

            T.g("bookTelOrderCon").style.display="";
        }
    }
   
}

