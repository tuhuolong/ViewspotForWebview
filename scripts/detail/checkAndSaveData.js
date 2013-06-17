
//检测数据是否有更新
function checkAndSaveData(poiUid) {
    window.localData && delete window.localData._index;
    //当服务端数据中图片的url跟本地数据中图片的url不一致时，清除本地图片缓存;
    if(window.localData && window.localData.detail_info && window.localData.detail_info.image && 
       window.saveData && window.saveData.detail_info && window.saveData.detail_info.image && 
       window.localData.detail_info.image != window.saveData.detail_info.image){
        PlaceStorage.removeItem(poiUid + '_img');
    }
    
    if(JSON.stringify(window.localData) != JSON.stringify(window.saveData)){
        window.PlaceDataMgr.addPlaceData(poiUid, saveData);

        //二次请求后数据有更新的量;
        if(window.localData){
            addStat(STAT_INDEX_CHECK_AND_UP);
        }
        return true;
    }
    return false;
}
