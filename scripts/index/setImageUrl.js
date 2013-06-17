//设置裁剪后的图片url
function setImageUrl(info, uid){
    var data = info.content && info.content.data,
        type = info.content && info.content.type;

    if(!data || !type){
        imgSrl = '';
    }else{
        var imgSrl = 'data:' + type + ';base64,' + data;
        T.g('baseInfoPic').style.backgroundImage = 'url("' + imgSrl + '")';
    }

    window.PlaceDataMgr.addPlaceData(uid + '_img', imgSrl);
}