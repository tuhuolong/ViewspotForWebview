
/**
 * 对浏览器的localStorage功能进行封装
 * 内部主要判断浏览器是否支持
 * @author jiazheng
 * @date 2012-03-08
 */
(function(){
    var _localStorage = {};
    /**
     * 常量定义
     */
    _localStorage.TYPE_STRING = 0;
    _localStorage.TYPE_NUMBER = 1;
    _localStorage.TYPE_BOOLEAN = 2;
    _localStorage.TYPE_OBJECT = 3;
    /**
     * 添加数据
     * @param {string} key
     * @param {string} value
     * @param {Object} 可选的配置参数，内容：{onSucceed, onError}
     */
    _localStorage.setItem = function(key, value, options) {
        if (window.localStorage) {
            options = options || {};
            try {
                localStorage.setItem(key, value);
                options.onSucceed && options.onSucceed();
            } catch (e) {
                // 通过try/catch捕获存储空间不足的问题
                options.onError && options.onError();
            }
        }
    };
    /**
     * 获取数据
     * @param {string} key
     * @param {enum type} 返回数据类型
     * @return {string} value
     */
    _localStorage.getItem = function(key, type) {
        if (window.localStorage) {
            var value = localStorage.getItem(key);
            if (value === null || !value) {
                // 如果内容为null，认为没有这个key和value，则直接返回
                //如果有key没value为空的时候，也直接返回
                // null，不考虑类型转换
                return null;
            }
            type = type || _localStorage.TYPE_STRING;
            switch (type) {
                case _localStorage.TYPE_NUMBER:
                    return value * 1;
                case _localStorage.TYPE_BOOLEAN:
                    if (value == 'false') {
                        return false;
                    }
                    return !!value;
                case _localStorage.TYPE_OBJECT:
                    return JSON.parse(value);
                default:
                    return value;
            }
        }
        return null;
    };
    /**
     * 移除数据
     * @param {string} 移除数据的key
     */
    _localStorage.removeItem = function(key) {
        if (window.localStorage) {
            localStorage.removeItem(key);
        }
    };
    /**
     * 清空所有数据
     */
    _localStorage.clear = function() {
        if (window.localStorage) {
            localStorage.clear();
        }
    };
    /**
     * 遍历存储中每一个数据项
     * @param {Function} 回调函数，函数参数为key:string, value:string
     */
    _localStorage.each = function(callback){
        if (window.localStorage) {
            try{
                for (var key in localStorage) {
                    callback(key, localStorage[key]);
                }
            }catch(e){
                
            }
            
        }
    };
    // 公开到window全局
    window.PlaceStorage = _localStorage;
})();


/**
 * Place详情数据存储管理器
 * @author jiazheng
 * @date 2012-03-08
 */

(function(){
    var _placeDataMgr = {};
    // place数据的全局索引
    var KEY_PLACE_INDEX = 'gPlaceIndex';
    // place数据的版本号，用于更新
    var KEY_PLACE_DATA_VERSION = 'gPlaceDataVersion';
    // 获取当前索引和版本号
    var _placeIndex = PlaceStorage.getItem(KEY_PLACE_INDEX) || 0;
    var _placeDataVersion;
    var _storageVersion = PlaceStorage.getItem(KEY_PLACE_DATA_VERSION);
    if (_storageVersion == null) {
        _placeDataVersion = '1.0';
        PlaceStorage.setItem(KEY_PLACE_DATA_VERSION, '1.0');
    } else {
        _placeDataVersion = _storageVersion;
    }
    /**
     * 添加一个Place数据
     * @param {string} uid
     *
     */
    _placeDataMgr.addPlaceData = function(uid, placeData){
        placeData._index = _placeIndex;
        PlaceStorage.setItem(uid, JSON.stringify(placeData), {
            onSucceed: function(){
                // 添加成功再增加索引
                _placeIndex ++;
                PlaceStorage.setItem(KEY_PLACE_INDEX, _placeIndex);
            },
            // 只要报错就认为是空间满了
            // 此时需要清除部分旧数据
            onError: function(){
                // 移除部分数据再添加一遍
                _removeOld();
                _placeDataMgr.addPlaceData(uid, placeData);
            }
        });
    };
    /**
     * 获取Place数据
     * @param {string} uid
     * @return {Object} Place数据
     */
    _placeDataMgr.getPlaceData = function(uid) {
        return PlaceStorage.getItem(uid, PlaceStorage.TYPE_OBJECT);
    };
    /**
     * 版本检测，如果传入的新版本号与当前版本不一致，则进行更新
     * 并删除现在全部的place详情数据
     * @param {string} 新版本号
     */
    _placeDataMgr.checkVersion = function(newVersion) {
        if (newVersion == _placeDataVersion) {
            return;
        }
        _placeDataVersion = newVersion;
        PlaceStorage.setItem(KEY_PLACE_DATA_VERSION, newVersion);
        // 清除每条Place数据
        PlaceStorage.each(function(key, value){
            if (key == KEY_PLACE_INDEX ||
                key == KEY_PLACE_DATA_VERSION) {
                return;
            }
            PlaceStorage.removeItem(key);
        });
        // 重新设置数据索引
        _placeIndex = 0;
        PlaceStorage.setItem(KEY_PLACE_INDEX, 0);

    }
    /**
     * 移除旧数据
     * @param {number} 移除数量，默认为5
     */
    var _removeOld = function(count){
        count = count || 5;
        var sortArr = [];
        PlaceStorage.each(function(key, value){
            if (key == KEY_PLACE_INDEX) {
                return;
            }
            var json = JSON.parse(value);
            var index = parseInt(json._index);
            sortArr.push({'uid': key, 'index': index});
        });
        // 排序
        sortArr.sort(function(a, b){
            return a.index - b.index;
        });
        // 将最老的数据完成
        count = count > sortArr.length ? sortArr.length : count;
        for (var i = 0; i < count; i ++) {
            PlaceStorage.removeItem(sortArr[i].uid);
        }
    }

    window.PlaceDataMgr = _placeDataMgr;
})();