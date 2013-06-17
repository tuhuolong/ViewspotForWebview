

/**
 * 展示楼层页面信息
 * @author jason.zhou
 * @param {Array} data  楼层数据
 * @param {Object} opts  可选参数
 */

function floorInfo(data, opts) {
    resetTemp.floorInfo = resetTemp.floorInfo || {};
    resetTemp.floorInfo.floor = resetTemp.floorInfo.floor || data; // 存在场馆数据
    //插入HTML代码
    T.g('floorCon').innerHTML = '<img src="../img/transparent.gif" class="iconfloor"/><a href="javascript:void(0)" onclick="addStat(\''+ STAT_INDEX_CLICK_FLOOR + '\');callAppFun(\'newwindow\',{page:\'floor.html\'})">楼层分布</a>';
    //设置层显示
    T.g('floorCon').style.display = '';
}
