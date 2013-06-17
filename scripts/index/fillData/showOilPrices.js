


/**
 * 油价页面生成
 * @author fuen
 * @param {Object} extD 油价数据
 * @param {Object} opts 可选参数
 */

function showOilPrices(extD, opts){
    resetTemp.showOilPrices = resetTemp.showOilPrices || {};
    var data = extD.detail_info.oril_info.oril_detail,
        linkData = extD.detail_info,
        html = [],
        linkHtml = [],
        oril_name = '',
        html_li = "<li><div></div></li>";

    resetTemp.showOilPrices.oril_price =  1;
    T.g('oril_info').style.display = "block";
    for(var i=0,len=data.length; i<len; i++){
        switch(data[i].oril_type){
            case "gasoline_89" : oril_name =  "89#";
            break;
            case "gasoline_90" : oril_name =  "90#";
            break;
            case "gasoline_92" : oril_name =  "92#";
            break;
            case "gasoline_93" : oril_name =  "93#";
            break;
            case "gasoline_95" : oril_name =  "95#";
            break;
            case "gasoline_97" : oril_name =  "97#";
            break;
            case "gasoline_98" : oril_name =  "98#";
            break;
            case "derv_0" : oril_name =  "0#柴";
            break;
            case "derv_negative10" : oril_name =  "负10#柴";
            break;
            case "derv_negative20" : oril_name =  "负20#柴";
            break;
            default: oril_name = ""
        }
        html.push('<li><div><span class="oril_type"><em>'+oril_name+'油</em></span><span class="oril_price"><em>￥'+data[i].oril_price+'</em></span></div></li>')
    }
    if((data.length) % 2 != 0){
        html.push(html_li);
    }
    T.g('oril_info_list').innerHTML = html.join('');
    
   
    /*if(linkData && linkData.link && linkData.link.length > 0){
        linkHtml.push('油价来源：')
        for(var j=0, jlen = linkData.link.length; j<jlen; j++){
            linkHtml.push('<a href="' + linkData.link[j].url + '">' + linkData.link[j].cn_name + '</a>');
        }
        T.g("oril_from").innerHTML = linkHtml.join('');
    }*/

}
