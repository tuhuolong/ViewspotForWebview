
function formatData(extD) {

    //添加测试数据

//   餐饮预订测试数据    
//    extD.rich_info.reservation = [{
//            'discount' : '2',
//            'src' : 'fantong',
//            'url' : 'url'
//        },
//        {
//            'discount' : '0.2',
//            'src' : 'dingcanmishu',
//            'url' : 'url'
//        },
//        {
//            'discount' : '2',
//            'src' : 'test',
//            'url' : 'url'
//        }
//    ];

    if(extD.detail_info && extD.rich_info && extD.rich_info.scope_grade){
        extD.detail_info.scope_grade = extD.rich_info.scope_grade;
    }
    if(extD.detail_info && extD.rich_info && extD.rich_info.scope_type){
        extD.detail_info.scope_type = extD.rich_info.scope_type;
    }

    //将detail_info中的tag字段存储在rich_info中
    if(extD.detail_info && extD.detail_info.tag && extD.rich_info){
        extD.rich_info.tag = extD.detail_info.tag;
    }
    //将detail_info.link[*].url更新为手机端链接优先
    if(extD.detail_info && extD.detail_info.link && extD.detail_info.link.length){
        for(var i=0;i<extD.detail_info.link.length;i++){
            var _link = extD.detail_info.link[i] && extD.detail_info.link[i].url_mobilephone;
            if(_link && extD.detail_info.link[i].url){
                extD.detail_info.link[i].url = _link;
            }
        }
    }
    //theatre_info.time_table[*].order_url[*].url更新为手机端链接优先
    if(extD.theatre_info && extD.theatre_info.time_table && extD.theatre_info.time_table.length){
        for(var i=0;i<extD.theatre_info.time_table.length;i++){
            var _data = extD.theatre_info.time_table[i] && extD.theatre_info.time_table[i].order_url;
            if(_data && _data.length){
                for(var j=0;j<_data.length;j++){
                    var _inner_k = _data[j] && _data[j].url_mobilephone;
                    if(_inner_k && _data[j].url){
                        _data[j].url = _inner_k;
                    }
                }
            }
        }
    }
    //scope_site.site_detail[*].site_link_mb, scope_site.total_link_mb,更新为手机端链接优先
    if(extD.scope_site && extD.scope_site.total_link_mb){
        var data_link = extD.scope_site && extD.scope_site.total_link_mb_mobilephone;
        if(data_link && extD.scope_site.total_link_mb){
            extD.scope_site.total_link_mb = data_link;
        }
        if(extD.scope_site.site_detail && extD.scope_site.site_detail.length){
            for(var i=0;i<extD.scope_site.site_detail.length;i++){
                var _inner_j = extD.scope_site.site_detail[i] && extD.scope_site.site_detail[i].site_link_mb_mobilephone;
                if(_inner_j && extD.scope_site.site_detail[i].site_link_mb){
                    extD.scope_site.site_detail[i].site_link_mb = _inner_j;
                }
            }
        }
    }
    //strategy.strategy_detail[*].link_mb, strategy.total_link_mb,更新为手机端链接优先
    if(extD.strategy && extD.strategy.total_link_mb){
        var data_link = extD.strategy && extD.strategy.total_link_mb_mobilephone;
        if(data_link && extD.strategy.total_link_mb){
            extD.strategy.total_link_mb = data_link;
        }
        if(extD.strategy.strategy_detail && extD.strategy.strategy_detail.length){
            for(var i=0;i<extD.strategy.strategy_detail.length;i++){
                var _inner_j = extD.strategy.strategy_detail[i] && extD.strategy.strategy_detail[i].link_mb_mobilephone;
                if(_inner_j && extD.strategy.strategy_detail[i].link_mb){
                    extD.strategy.strategy_detail[i].link_mb = _inner_j;
                }
            }
        }
    }
    

    //将图片由对象转换为数组;
    if(extD.image){
        var img_arr = [];
        for(var i in extD.image){
            if(T.lang.isArray(extD.image[i])){
                //img_arr = img_arr.concat(extD.image[i]);
                for(var j=0;j<extD.image[i].length;j++){
                    var _img_inf = extD.image[i][j];
                    if(_img_inf.imgUrl && _img_inf.cn_name && _img_inf.name){
                        img_arr.push(_img_inf);
                    }
                    
                }
//                    //排除饭桶的图片;
//                    for(var j=0;j<extD.image[i].length;j++){
//                        var _imgInfo = extD.image[i][j];
//                        if(_imgInfo.name != 'fantong'){
//                            img_arr.push(_imgInfo);
//                        }
//                    }
            }
        }
        extD.image = img_arr;
    }
    //image[*].url更新为手机端链接优先
    if(extD.image && extD.image.length){
        for(var i=0;i<extD.image.length;i++){
            var _data = extD.image[i] && extD.image[i].link_mobilephone;
            if(_data && extD.image[i].link){
                extD.image[i].link = _data;
            }
        }
    }

    if(extD.rich_info){

        if(extD.rich_info.recommendation){
            extD.rich_info.recommendation = extD.rich_info.recommendation.replace(/^,/,'');
            extD.rich_info.recommendation = extD.rich_info.recommendation.replace(/,/g,'  ');//⋅
        }
        if(extD.rich_info.description){
            extD.rich_info.description = extD.rich_info.description.replace(/\s/ig,'');
        }

        if(extD.rich_info.reservation && extD.rich_info.reservation[0]){
            var _rich_obj = {},
                _reservation = extD.rich_info.reservation;
            for(var i=0;i<_reservation.length;i++){
                var temp_obj = _reservation[i];
                _rich_obj[temp_obj.src] = temp_obj;
            }
            extD.rich_info.reservation = _rich_obj;
        }

    }

    if(extD.review){
        if(extD.review[0] && !T.lang.isArray(extD.review[0].info)){
            for(var k=0;k<extD.review.length;k++){
                var review_data = extD.review[k],
                    review_info_json = {};

                review_info_json.content = review_data.info;
                review_info_json.date = review_data.data;
                review_info_json.one_url = review_data.url;

                extD.review[k].info = [review_info_json];
            }
        }

        //删除不正常数据，并将url替换为服务端url
        for(var k=0;k<extD.review.length;k++){
            if(!extD.review[k]){
                extD.review.splice(k,1);
            }else{
                var _data = extD.review[k].url_mobilephone;
                extD.review[k].url = _data;
            }
        }

//        //评论排序，将身边评论放在最上方;        
//        if(extD.review[0] && (extD.review[0].name != 'shenbian')){
//            for(var k=0;k<extD.review.length;k++){
//                var tmp = extD.review[0];
//                if(extD.review[k].name == 'shenbian'){
//                    extD.review[0] = extD.review[k];
//                    extD.review[k] = tmp;
//                }
//            }
//        }
        
        
    }

    

    return extD;

}

