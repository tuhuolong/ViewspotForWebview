
function fillData(extD,opts) {
    
    //临时变量存放处;
    setTemp.fillData = setTemp.fillData || {};

    var opts = opts || {},
        type = opts.type || '',
        src_name = extD.src_name,
        hunter_code = dataConfig[src_name] && dataConfig[src_name]['hunter'] && dataConfig[src_name]['hunter']['index'] || 0;

    //输出餐饮在线预订	
    bookOnline(extD,opts);

    //输出商户基本信息	
    //basicInfo(extD,opts);
    var title = new window.BMap.Viewspot.Title(document.getElementById('baseInfoPic'), opts);
    title.setName("圆明园遗址公园");
    title.setAddress("海淀区北京市海淀区清华西路28号(清华大学)");
    title.setStar(56);
    title.setNum("4.0");
    title.setCommNum(3);
    title.setLevel("景区级别:<font class = \'color_2\''>AAAAA</font>");
    title.setType("景区类型:<font class = \'color_2\''>历史遗迹</font>");

    var telephone = new window.BMap.Viewspot.Telephone(document.getElementById('telCon'), opts);
    telephone.addTel("(010)62551488");
    telephone.addTel(",(010)62543673");

    
    //输出优惠信息
    if(extD.detail_info && extD.detail_info.premium2 && extD.detail_info.premium2.length){
        saleInfo(extD,opts);
    }
    //输出商户认领模块
    if(extD.detail_info && extD.detail_info.new_catalog_id){
        if(!extD.detail_info._validate || extD.detail_info._validate != 1){
         claimShop(extD, opts);
      }
   }

    //输出团购信息
    if(extD.detail_info && extD.detail_info.groupon && extD.detail_info.groupon.length){
        grouponInfo(extD,opts);
    }

    //输出餐饮排行榜信息
    if(extD.detail_info && extD.detail_info.toplist && extD.detail_info.toplist.top){
		rankonInfo(extD,opts);
    }

    //输出折扣信息
    if(extD.detail_info && extD.detail_info.rebate && extD.detail_info.rebate.length){
        rebateInfo(extD.detail_info.rebate);
    }
    
    
    //输出楼层信息 
    if(extD.floor && extD.floor.length){
        floorInfo(extD.floor,opts);
    }
    //输出电影院信息
    if(extD.other_info && extD.other_info.time_table && extD.other_info.time_table.length > 0){
        movieInfo(extD,opts);
    }  
    //输出剧院信息
    if(extD.theatre_info && extD.theatre_info.time_table && extD.theatre_info.time_table.length > 0){
        //addStat(STAT_INDEX_THEATRE_DETAIL_SHOW);
        theatreInfo(extD,opts);
    }  
    //输出商户详细信息
    if(extD.rich_info){
        richInfo(extD,opts);
    }
    //输出图片模块
    /*if(extD.image){
        picInfo(extD,opts);
    }else if(type != 'emptyData'){
        T.g('noPicCon').style.display = '';
    }*/
    var picture = new window.BMap.Viewspot.Picture(document.getElementById('picCon'), extD, opts);

    //输出场馆片模块
    if(extD.venue && extD.venue.length > 0){
        venueInfo(extD.venue,opts);
    }
    //*/
    //KTV包厢价格
    ktvInfo(extD,opts);

   //输出 大家印象 信息               --question
    pubImpression(extD,opts);
    //输出评论信息
    if(extD.review && extD.review.length){
        commInfo(extD,opts);
    }else if(type != 'emptyData'){
        //T.g('noCommCon').style.display = '';
    }

    //景点门票预订
    if(extD.rich_info && extD.rich_info.scope_reserve  && extD.rich_info.scope_reserve.length){
         viewSpotTicket(extD, opts);
    }
    //输出景区景点介绍模块 by fuen
    if(extD.rich_info && !extD.rich_info.is_site && extD.scope_site && extD.scope_site.site_detail && extD.scope_site.site_detail.length){
        showViewSpotPro(extD, opts);
    }

    //输出景点介绍模块 by fuen
    if(extD.src_name && extD.src_name =='scope' && extD.rich_info && extD.rich_info.is_site){
        showViewSpotSitePro(extD, opts);
    }

    //输出景点游记攻略模块
    //if(extD.src_name && extD.src_name =='scope' && extD.strategy && extD.strategy.strategy_detail && extD.strategy.strategy_detail.length){
    //    showViewStrategy(extD, opts);
    //}
    //输出景点门票
    if(extD.src_name && extD.src_name =='scope' && (extD.rich_info.shop_hours || extD.detail_info.entrance_price)){
        //showViewSpotPrice(extD, opts);
        var price = new window.BMap.Viewspot.Price(document.getElementById('viewSpotPrice'), opts);
        price.setData("门票：门票：成人10元，学生5元。联票：成人25元，学生10元。<br />开放时间：7：00-19：00");
        price.setUrl("http://lvyou.baidu.com/yuanmingyuan/");
    }

    //输出景点游记攻略模块
    if(extD.src_name && extD.src_name =='scope' && extD.strategy && extD.strategy.strategy_detail && extD.strategy.strategy_detail.length){
        //showViewStrategy(extD, opts);
        var strategy = new window.BMap.Viewspot.Strategy(document.getElementById('viewStrategy'), extD, opts);
        strategy.setUrl("http://lvyou.baidu.com/yuanmingyuan/youji/");
        strategy.addDataItem();
    }

    //输出附近查找 by fuen
    /*if(extD && extD.src_name && dataConfig[extD.src_name] && dataConfig[extD.src_name].VS){
        ShowVicinityShop(dataConfig[extD.src_name].VS, opts);
    }else if(extD){
        ShowVicinityShop(dataConfig.defaul_t.VS, opts);
    }*/
    var nearbysearch = new window.BMap.Viewspot.NearbySearch(document.getElementById('vicinityShop'), extD, opts);

    //输出油价信息 by fuen
    if(extD.detail_info && extD.detail_info.oril_info && extD.detail_info.oril_info.oril_detail && extD.detail_info.oril_info.oril_detail.length){
     showOilPrices(extD, opts);
    }

   //输出同城信息 by fuen
   if(extD.activity && extD.activity.length){
        showCityWide(extD, opts);
   }

   //输出查看更多
    if(extD.detail_info && extD.detail_info.link && extD.detail_info.link[0]){
        //moreInfo(extD,opts);
        var more = new window.BMap.Viewspot.More(document.getElementById('moreCon'), extD, opts);
    }

    var reporterror = new window.BMap.Viewspot.ReportError(document.getElementById('shellCon'), extD, opts);

    //使用数据完成填充模板的时间;
    window.statInfo.t5 = Date.now();

    //开启hunter统计;
    if(hunter_code && !setTemp.fillData.hunter_start){
        window.Hunter && Hunter.start(hunter_code);
        //记录已经开启hunter
        setTemp.fillData.hunter_start = 1;
    }

    // 检测版本
    // 由于检测版本会导致place数据展现，因此使用timer延时处理
    // 渲染空模板时不进行模板版本检测;
    if(type != 'emptyData' && type != 'checkData'){
       setTimeout(function(){
            try {
                var opts = {};
                
                //记录是否有图片
                if(resetTemp.picInfo && resetTemp.picInfo.havePic){
                    opts.havePic = '1';
                }else{
                    opts.havePic = '0';
                }
                //记录是否有评论
                if(resetTemp.commInfo && resetTemp.commInfo.haveComm){
                    opts.haveComm = '1';
                }else{
                    opts.haveComm = '0';
                }
                if(resetTemp.saleInfo && resetTemp.saleInfo.haveSale){
                    opts.haveSale = '1';
                }
                if(resetTemp.basicInfo && resetTemp.basicInfo.haveOta){
                    opts.haveOta = '1';
                }
                if(resetTemp.rebateInfo && resetTemp.rebateInfo.dataNum){
                    opts.haveRebate = '1';
                }
                if(window.poiInfo.tel){
                    opts.haveTel = '1';
                }
                if(window.statInfo.localData){
                    opts.localData = '1';
                }
                if(resetTemp.grouponInfo && resetTemp.grouponInfo.haveGroup)
                {
                    opts.haveGroup = '1';
                }
                if(resetTemp.rankInfo && resetTemp.rankInfo.haveRank)
                {
                    opts.haveRank = '1';
                }
                if(resetTemp.movieInfo && resetTemp.movieInfo.haveMovie){
                    opts.haveMovie = '1';
                }
                if(resetTemp.theatreInfo && resetTemp.theatreInfo.haveTheatre){
                    opts.haveTheatre = '1';
                }
                if(resetTemp.ktvInfo && resetTemp.ktvInfo.haveKTV){
                    opts.haveKTV = '1';
                }
                if(resetTemp.pubImpression && resetTemp.pubImpression.haveImpression){
                    opts.haveImpression = '1';
                }
                if(resetTemp.venueInfo && resetTemp.venueInfo.venue){
                    opts.haveVenue = '1';
                }
                if(resetTemp.floorInfo && resetTemp.floorInfo.floor){
                    opts.haveFloor = '1';
                } 
                if(resetTemp.showOilPrices && resetTemp.showOilPrices.oril_price){
                    opts.orilPrice = '1';
                }

                if(resetTemp.showViewSpotPro && resetTemp.showViewSpotPro.showViewSite){
                    opts.showViewSite = '1';
                }

                if(resetTemp.showViewSpotPro && resetTemp.showViewSpotPro.ShowViewSpotTicket){
                    opts.ShowViewSpotTicket = '1';
                }

                if(resetTemp.bookOnline && resetTemp.bookOnline.haveDcan){
                    opts.hvDc = resetTemp.bookOnline.haveDcan;
                }                
                
                if(resetTemp.bookOnline && resetTemp.bookOnline.haveTel){
                    opts.hvDCTel = resetTemp.bookOnline.haveTel;
                }

                if(resetTemp.richInfo && resetTemp.richInfo.haveRecommend){
                    opts.hvRd = 1;
                }

                if(resetTemp.movieInfo && resetTemp.movieInfo.haveMovieLink){
                    opts.hvMc = resetTemp.movieInfo.haveMovieLink;
                }
                
                if(resetTemp.claimShop && resetTemp.claimShop.myShop){
                    opts.myShop = resetTemp.claimShop.myShop;
                }
                if(resetTemp.doubanTC && resetTemp.doubanTC.show){
                    opts.doubanTC = resetTemp.doubanTC.show;
                }

                if(resetTemp.movieInfo && resetTemp.movieInfo.moviebooking){
                    opts.moviebooking = 1;
                }
                
                if(resetTemp.movieInfo && resetTemp.movieInfo.movie_fr){
                    opts.movie_fr = resetTemp.movieInfo.movie_fr;
                }

                if(extD.detail_info && extD.detail_info.new_catalog_id){
                    opts.new_catalog_id = extD.detail_info.new_catalog_id;
                }
                
                //数据请求占用的时间
                opts.t1 = window.statInfo.t4 - (window.statInfo.t3 || window.statInfo.t2);
                //数据渲染占用的时间
                opts.t2 = window.statInfo.t5 - window.statInfo.t4;
                //页面总共占用的时间
                opts.t3 = window.statInfo.t5 - window.statInfo.t1;

                //酒店预订
                if(extD.detail_info && src_name == 'hotel' && !(setTemp.showHotelOTA && setTemp.showHotelOTA.hvData)){
                    otaRequest(window.poiInfo.uid, "first");
                }

                /*实时动态*//*,sbqt:'dynamic'*/
                if (!(setTemp.realTimeInfo && setTemp.realTimeInfo.info)) {
                    getPlaceInfo('realTimeInfo', {qt: 'rt', uid: window.poiInfo.uid, sbqt:'dynamic'},null,null,'realTimeInfoScript');
                }

                addStat(STAT_INDEX_SHOW,opts);
                if(extD.detail_info && extD.detail_info._validate && extD.detail_info._validate == 1 && extD.detail_info.origin_id && extD.detail_info.origin_id.lbc_uid){
                    addStat(1,{'stat_type':'lbc_poi','poi_id':extD.detail_info.origin_id.lbc_uid,'action':1});
                }
                
            } catch (e) {

            }
        },100); 
    }

    callAppFun('relayout');
}