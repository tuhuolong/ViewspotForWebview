window.templateType = 'rebate';
/*
 *重置页面内容   
 */
function resetPageContent() {
    if(T.g('rebateInfo')){
        T.g('rebateInfo').style.display = 'none';
    }
    if(T.g('rebateSrcInfo')){
        T.g('rebateSrcInfo').style.display = 'none';
    }
}

/**
 *填充数据
 *@param {obj} json 数据内容 必填
		json 为客户端传入的数据，或者 回调函数传入的数据
 *@param {string} type 数据来源 saveData 标示来源与本地存储;
 */
function fillData(extD, opts) {
    var opts = opts || {},
        type = opts.type || {};

    if(!extD) return;
    var data = extD.detail_info && extD.detail_info.rebate,
        poi_name = extD.name;
    if(!data || data.length < 1){
		return;
	}
	renderInfo(data, poi_name);
    addStat(STAT_REBATE_PAGE_INIT);
    //通知客户端设置webview高度
    callAppFun('relayout');
}
/**
 * 渲染折扣信息
 * @author jason.zhou
 * @param {Array} data 折扣信息
 */
function renderInfo(data, poi_name) {
    preprocess(data);
    var tpl = [
        '<div class="top-effect"></div>',
        '<div class="discount-effect"></div>',
        '<ul>',
        '<% for(var i=0, d; d = data[i]; i++) { %>',
            '<li>',
            '<div><%=d.title%></div>',
            '<p>活动时间：<%=T.date.format(T.date.parse(d.rebate_start),"MM月dd日")%>至<%=T.date.format(T.date.parse(d.rebate_end),"MM月dd日")%>',
            '<div class="circle left"></div><div class="circle right"></div>',
            '</li>',
        '<% } %>',
        '</ul>',
        '<div class="bottom-effect">',
            '<div></div>',
            '<div></div>',
        '</div>',
        ''
        ],
        tp1src = [
            '来源：',
            '<% for(var i=0, d; d = data[i]; i++) { %>',
                '<span><%=d.cn_name%></span>',
            '<% } %>'
        ],
        rendersrcEl,
        renderEl,
        backToPlace,
        backToPlaceCon,
        poi_name = window.poiInfo.name || poi_name || '查看商户详情';

    var listCompiled = Tutu.Template(tpl.join('')),
        srcCompiled = Tutu.Template(tp1src.join(''));
    if (renderEl = T.g('rebateInfo')) {
        renderEl.innerHTML = listCompiled({data:data});
        renderEl.style.display = '';
    }

    if((backToPlace = T.g('backToPlace')) && (backToPlaceCon = T.g('backToPlaceCon')) && window.poiInfo.place_type && window.poiInfo.place_type == "rebate"){
        backToPlaceCon.innerHTML = poi_name;
        backToPlace.style.display = '';
    }

    if (rendersrcEl = T.g('rebateSrcInfo')) {
        rendersrcEl.innerHTML = srcCompiled({data:renderInfo.srcs});
        rendersrcEl.style.display = '';
    }
}
/**
 * 数据预处理
 */
function preprocess(data) {
    var srcs = [];
    data = T.array.filter(data, function(item, i){
        return !!item.cn_name && !!item.from_name && !!item.rebate_start && !!item.rebate_end;
    });
    for (var i = 0, d; d = data[i]; i++) {
        //d.title = d.title.replace(/(\d+\.?\d*-\d+\.?\d*)/, '<span class="title">$1</span>');
        srcs.push({
            "from_name": d.from_name,
            "cn_name": d.cn_name
        });
    }
    renderInfo.srcs = T.array.unique(srcs, function(a, b){
        return a.from_name == b.from_name;
    });
}

