/**
 * 展示附近poi
 * @param {Array} 附近POI数据
 */
function nbpoi(data) {
    data = [{
            uid:"XXX",
            title: "XXX",
            reason:"XX",
            score:"XXX",
            price:"XXX",
            main_tag:"XXX",
            distance:"XXX",
            head_url:"../img/cater_banner.png"
    }];
    nbpoi.isEmpty = 1;
    var tpl = [
        '<div class="h3">你也许还喜欢</div>',
        '<div id="nbContent" class="box_1 nbpoi-content">',
        	'<ul>',
            '<% for (var i = 0, d; d = data[i]; i++) { %>',
                '<li onclick="callAppFun(\'poidetail\',{\'uid\':\'<%=d.uid%>\'})">',
                    '<a href="javascript:void(0)">',
                    	'<img src="<%=d.head_url%>" class="nbpoi-img" />',
                    '</a>',
                	'<dl>',
                		'<dt><%=d.title%></dt>',
                        '<dd>',
                            '<% if (d.reason) { %>',
                            '<p><%=d.reason%></p>',
                            '<% } %>',
                            '<p>',
                                '<% if (d.score) { %>',
                                    '评分：<%=d.score%>',
                                '<% } %>',
                                '<% if (d.price) { %>',
                                    '&nbsp;&nbsp;￥<%=d.price%>',
                                '<% } %>',
                                '<% if (d.main_tag) { %>',
                                    '&nbsp;&nbsp;<%=d.main_tag%>',
                                '<% } %>',
                                '<% if (d.distance) { %>',
                                    '<span><%=d.distance%></span>',
                                '<% } %>',
                            '</p>',
                        '</dd>',
                	'</dl>',
            '</li>',
            '<% } %>',
        	'</ul>',
        '</div>',
        '<div class="splitLine2"></div>'
    ];
    var listCompiled = Tutu.Template(tpl.join(''));
    T.g('nbpoiMain').innerHTML = listCompiled({data:data});
    T.g('nbpoiMain').style.display = '';
}
