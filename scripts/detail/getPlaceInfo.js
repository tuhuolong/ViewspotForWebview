
/**
 * 通过script请求从服务端获取数据，并通过callback解析返回内容;
 * @author jason.zhou
 * @param {String} callback 回调函数名称
 * @param {Object} params 请求参数
 * @param {Object} opts 见scriptRequest参数opts
 * @param {Object} id 创建script标签id  TODO 觉的这个没用
 * @param {String} url 请求url
 */
function getPlaceInfo(callback, params, opts, url, id) {
    url = url || config.dataUrl + '/detail';
    params = params || {
        qt: 'ninf',
        uid:window.poiInfo.uid,
        from : 'webview',
        os: 'map_'+ window.mobileType +'_app'
    };
    id = id || 'getPlaceInfo';
    opts = {'cbFun' : callback, 'sendUid' : 1};
    url = url + '?t=' + Date.now();
    for (var k in params) {
        if (params.hasOwnProperty(k) && params[k]) {
            url = url + '&' + k + '=' + params[k];
        }
    }
    scriptRequest(url, id , opts);
    //scriptRequest('http://client.map.baidu.com/detail?t=' + Date.now()+ '&qt=ninf&uid='+window.poiInfo.uid+'&from=webview&os=map_'+ window.mobileType +'_app','getPlaceInfo',{'cbFun' : callback, 'sendUid' : 1});
    //scriptRequest('http://client.map.baidu.com/detail?t=' + Date.now()+ '&qt=ninf&uid='+window.poiInfo.uid+'&os=map_'+ window.mobileType +'_app','getPlaceInfo',{'cbFun' : callback, 'sendUid' : 1});
    //scriptRequest('http://tc-map-data-webming02.tc.baidu.com:8008/detail?t=' + Date.now()+ '&qt=ninf&uid='+window.poiInfo.uid+'&os=map_'+ window.mobileType +'_app','getPlaceInfo',{'cbFun' : callback, 'sendUid' : 1});
    //scriptRequest('http://map.baidu.com/detail?t=' + Date.now()+ '&qt=ninf&uid=' + window.poiInfo.uid + '&from=maponline&os=map_'+ window.mobileType +'_app','getPlaceInfo',{'cbFun' : callback, 'sendUid' : 1});
}
