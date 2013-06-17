/**
 * 展示top
 * @param {Object} top数据
 */
function bctop(data) {
    bctop.isEmpty = 1;
    var tpl = [
        '<div id="bcTopTitle" class="bctop-title collapse" onclick="toggleBctopDetail(this);">',
        	'<dl>',
                '<dt><span><%=top.title%></span><em><%=top.rank%></em></dt>',
        		'<dd><%=top.week_visit%></dd>',
        	'</dl>',
            '<img src="../img/transparent.gif" class="bctop-btn-toggle"/>',
        '</div>',
        '<div id="bcTopContent" class="bctop-content" style="display:none">',
        '</div>'
    ];
    var listCompiled = Tutu.Template(tpl.join(''));
    T.g('bctopMain').innerHTML = listCompiled(data);
    T.g('bcTopContent').innerHTML = bctopDetail(data.list);
    T.g('bctopMain').style.display = '';
}
/**
 * 显示明细
 * @param {Array} 明细数据
 */
function bctopDetail(data) {
    var tpl = [
        	'<ul>',
            '<% for (var i = 0, d; d = list[i]; i++) { %>',
                '<li onclick="callAppFun(\'poidetail\',{\'uid\':\'<%=d.uid%>\'})">',
                	'<em><%=d.rank%></em>',
                	'<dl>',
                		'<dt><%=d.name%></dt>',
                		'<dd><%=d.week_visit%></dd>',
                	'</dl>',
                '</li>',
            '<% } %>',
        	'</ul>'
    ];
    var listCompiled = Tutu.Template(tpl.join(''));
    return listCompiled({list:data});
}
function toggleBctopDetail(el) {
    T.dom.toggleClass(el, 'collapse');
    T.dom.toggle(T.g('bcTopContent'));
}

