/**
 * place
 */


//生成本地存储数据，并做缓存
function makeDataAndSave(extD, poiUid){

    window.saveData = extD;

//    //存储类型
//    if(extD.src_name){
//        saveData.src_name = extD.src_name;
//    }
//
//    //存储商户基本信息
//    if(extD.detail_info){
//        saveData.detail_info = {};
//        if(extD.detail_info.image){
//            saveData.detail_info.image = extD.detail_info.image;
//        }
//        if(extD.detail_info.overall_rating){
//            saveData.detail_info.overall_rating = extD.detail_info.overall_rating;
//        }
//        if(extD.detail_info.taste_rating){
//            saveData.detail_info.taste_rating = extD.detail_info.taste_rating;
//        }
//        if(extD.detail_info.environment_rating){
//            saveData.detail_info.environment_rating = extD.detail_info.environment_rating;
//        }
//        if(extD.detail_info.service_rating){
//            saveData.detail_info.service_rating = extD.detail_info.service_rating;
//        }
//        if(extD.detail_info.hygiene_rating){
//            saveData.detail_info.hygiene_rating = extD.detail_info.hygiene_rating;
//        }
//        if(extD.detail_info.price){
//            saveData.detail_info.price = extD.detail_info.price;
//        }
//        //存储查看更多
//        if(extD.detail_info.link && extD.detail_info.link){
//            saveData.detail_info.link = extD.detail_info.link;
//        }
//    }
//    //存储商户详细信息
//    if(extD.rich_info){
//        saveData.rich_info = {};
//        if(extD.detail_info && extD.detail_info.tag){
//            saveData.rich_info.tag = extD.detail_info.tag;
//        }
//        if(extD.rich_info.recommendation){
//            saveData.rich_info.recommendation = extD.rich_info.recommendation;
//        }
//        if(extD.rich_info.shop_hours){
//            saveData.rich_info.shop_hours = extD.rich_info.shop_hours;
//        }
//    }
//    //存储优惠信息
//    if(extD.detail_info && extD.detail_info.premium && extD.detail_info.premium.length){
//        extD.detail_info.premium = [];
//        var data = extD.detail_info.premium;
//
//        for(var i=0;i<data.length;i++){
//            var _json = {};
//            if(data.discount_title && data.cn_name && (data.discount_url_mobile || data.discount_url_pc)){
//                _json.discount_title = data.discount_title;
//                _json.discount_url_mobile = data.discount_url_mobile || data.discount_url_pc;
//                _json.cn_name = data.cn_name;
//                extD.detail_info.premium.push(_json);
//            }
//        }
//        
//    }
//    //存储评论信息
//    if(extD.review && extD.review.length){
//        saveData.review = extD.review;
////        for(var i=0;i<extD.review.length;i++){
////            var _json = {},
////                data = extD.review[i];
////            if(data.cn_name){
////                _json.cn_name = data.cn_name;
////            }
////
////            if(T.lang.isArray(data.info)){
////                _json.info = data.info[0] && data.info[0].content;
////            }else{
////                _json.info = data.info;
////            }
////            if(data.url){
////                _json.url = data.url;
////            }
////            if(data.review_num){
////                _json.review_num = data.review_num;
////            }
////            if(data.name){
////                _json.name = data.name;
////            }
////            saveData.review.push(_json);
////        }
//    }


    //存储数据
    return checkAndSaveData(poiUid);
}
