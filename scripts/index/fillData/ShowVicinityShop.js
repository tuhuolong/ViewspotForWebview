
/**
 * 附近找页面生成
 * @author fuen
 * @param {Object} shop  附近数据
 * @param {Object} opts  可选参数
 */

function ShowVicinityShop(shop, opts){
    if(!shop || shop.length==0 ){
        return;
    }
    var html = [], 
        shopData = vicinityShop,
        statCode = 990;

    T.g('vicinityShop').style.display = 'block';

    html.push('<div class="h3">在该点附近找</div>');
    html.push('<div class="box_1"><ul class="c_list" id="vicinityShopBox">');

    for(var i=0,len=shop.length; i<len; i++){

       statCode = window['STAT_INDEX_VICINITY_'+ shopData[shop[i]].name];

       html.push('<li onclick="callAppFun(\'nearbysearch\',{\'wd\':\'' + shopData[shop[i]].key + '\'});addStat(' + statCode + ');"><div><span class="icon ' + shopData[shop[i]].name + '"></span><span class="text">' + shopData[shop[i]].key + '</span></div></li>');   
    }

    html.push('</ul>');
    html.push('<div class="bottom_nav bottom_nav_1"><div><span><a href="javascript:void(0)" onclick="addStat(\''+ STAT_INDEX_VICINITY_MORE + '\');callAppFun(\'nearbysearch\')">查看更多<em class="goto_icon_1"></em></a></span></div></div></div>');
    html.push('<div class="splitLine2"></div>');

    T.g('vicinityShop').innerHTML = html.join('');
}
