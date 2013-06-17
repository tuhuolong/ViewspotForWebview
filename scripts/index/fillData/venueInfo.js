

/**
 * 运动场馆页面生成
 * @author jason.zhou
 * @param {Object} venue 场馆数据
 * @param {Object} opts 可选参数
 */

function venueInfo(venue,opts) {
    resetTemp.venueInfo = resetTemp.venueInfo || {};
    var html = [],
        venues = venue || venueInfo.venue,
        openTabIndex = opts.openTabIndex;
    resetTemp.venueInfo.venue = resetTemp.venueInfo.venue || venue; // 存在场馆数据
    if (typeof openTabIndex == 'undefined') {
        openTabIndex = 0;
    } else {
        addStat();
    }
    html.push('<div class="h3">场馆价格</div>');
    html.push('<div class="venue"><div id="venueMenuId"><ul>');
    for (var i = 0, len = venues.length; i < len; i++) {
        var td = venues[i];
        html.push('<li ');
        if (i == openTabIndex) {
            html.push('class="selected" ');
        } else {
            html.push('onclick="addStat(STAT_INDEX_VENUE_TAB);venueInfo(null,{openTabIndex:\'' + i + '\'});" ');
        }
        html.push('><strong id="tablink_'+i+'">'+td.venue_type+'</strong>');
        html.push('</li>');
    }
    html.push('</ul></div>');
    html.push('<div id="venueContentId"></div>');
    html.push('</div><div class="bottom-effect"><div></div><div></div></div>');
    html.push('<div class="splitLine2"></div>');
    T.g('venueCon').innerHTML = html.join('');
    showVenueDetail(venues[openTabIndex]);
    T.g('venueCon').style.display = '';
}
/**
 * 显示价格详细信息
 *@param {Array} booking booking信息 
 */
function showVenueDetail(venue) {
    var tpl = ['<div class="venue-tb2"><table></tbody>',
        '<tr>',
        '<th>时间</th><th>价格(元)</th>',
        '</tr>',
        '<% for(var i = 0; i < booking.length; i++ ) { %>',
            '<tr>',
                '<td><%=booking[i].booking_time%></td>',
                '<td><%=booking[i].booking_price%></td>',
            '</tr>',
        '<% } %>',
        '</tbody></table></div>'
        ],
        baseInfoTpl = [
            '<% if (!!floor_materials || !!ceilinged || !!sites_num || !!site_location) { %>',
            '<div class="venue-tb1"><ul>',
                '<% if (!!floor_materials) { %>',
                    '<li><span>地板材料：</span><span><%=floor_materials%></span></li>',
                '<% } %>',
                '<% if (!!site_location) { %>',
                    '<li><span>场地位置：</span><span><%=site_location%></span></li>',
                '<% } %>',
                '<% if (!!sites_num) { %>',
                    '<li><span>场地数量：</span><span><%=sites_num%></span></li>',
                '<% } %>',
                '<% if (!!ceilinged) { %>',
                    '<li><span>挑高：</span><span><%=ceilinged%></span></li>',
                '<% } %>',
            '</ul></div>',
            '<% } %>'
        ],
        htmls = [];
    var listCompiled = Tutu.Template(tpl.join('')),
        baseInfoCompiled = Tutu.Template(baseInfoTpl.join('')),
        baseInfoHtml = baseInfoCompiled(venue);
    if (baseInfoHtml) {
        htmls.push(baseInfoHtml);
    }
    htmls.push(listCompiled(venue));
    T.g('venueContentId').innerHTML = htmls.join('');
}

