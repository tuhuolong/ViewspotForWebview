

//setFavStatus('{"status":1}')

function setFavStatus(data) {
    resetTemp.setFavStatus = resetTemp.setFavStatus || {};
    //重置收藏夹跟客户端交互状态
    resetTemp.setFavStatus.isFavIng = 0;

    var data = data || '{}',
        data = JSON.parse(data),
        fav_btn = T.g('favoriteBtn'),
        className = fav_btn && fav_btn.className || '';
    if(!(data && (typeof data.status != 'undefined'))){
        return;
    }
    if(data.status == 1){
        if(className && className.indexOf('favorite_done') < 0){
            T.addClass(fav_btn,'favorite_done');
            addStat(STAT_INDEX_ADD_FAV);
        }
    }else{
        if(className && className.indexOf('favorite_done') > 0){
            T.removeClass(fav_btn,'favorite_done');
            addStat(STAT_INDEX_REMOVE_FAV);
        }
    }
    
    
}
