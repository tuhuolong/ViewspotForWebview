window.templateType = 'floor';
/*
 *重置页面内容   
 */
function resetPageContent() {
    if(T.g('floorInfo')){
        T.g('floorInfo').style.display = 'none';
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
    var floorData = extD.floor;
    if(!floorData || floorData.length < 1){
		return;
	}
	floorInfo(floorData);
    addStat(STAT_FLOOR_PAGE_INIT);
    //通知客户端设置webview高度
    callAppFun('relayout');
}
/**
 * 填充楼层信息
 * @author jason.zhou
 * @param {Array} 楼层信息
 */
function floorInfo(floorData) {
    var tpl = [
        '<ul>',
        '<% for(var i = 0, f; f = data[i]; i++) { %>',
            '<li>',
                '<div><%=f.floor_name%></div>',
                '<p><%=f.content%></p>',
            '</li>',
        '<% } %>',
        '</ul>'
        ],
        floorEl; 
    var listCompiled = Tutu.Template(tpl.join(''));
    if (floorEl = T.g('floorInfo')) {
        floorEl.innerHTML = listCompiled({data:floorData});
        floorEl.style.display = '';
    }
}

