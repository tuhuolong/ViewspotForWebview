//window.templateType = 'impression';
window.templateType = 'recommend';
/*
 *重置页面内容   
 */
function resetPageContent() {
    if(T.g('recommend_index')){
        T.g('recommend_index').style.display = 'none';
    }
}

/**
 *填充数据
 *@param {obj} json 数据内容 必填
		json 为客户端传入的数据，或者 回调函数传入的数据
 *@param {string} type 数据来源 saveData 标示来源与本地存储;
 *
 *测试转正式方法：  去掉所有标记为 test by jgd的语句
 */
function fillData(extD, opts) {
    var opts = opts || {},
    	type = opts.type || '';

    //test by jgd
    //json = window.pubTestInfo;
    //
    json = extD;

	var recommendIndex = json && json.rich_info && json.rich_info.recommend_commodity;
    if(!recommendIndex){
		return;
	}
	recommendInfo(recommendIndex);
    //通知客户端设置webview高度
    callAppFun('relayout');
}

/*评论信息*/
function recommendInfo(recommendIndex) {
    var recommend_commodity = recommendIndex,
        htmls = [],
        haveData = false;
    //如果没有数据则返回;
    if(!(recommend_commodity && recommend_commodity.length)) {
        return;
    }
    htmls.push("<ul>");

    for(var i=0;i<recommend_commodity.length;i++){
    	var item = recommend_commodity[i];
    	if(item.image.length){
    		htmls.push("<div class='dish_item' onclick='showRecommendinfo("+i+")'><div class='dish_item_inner'><li><div style='background:url(\"http://map.baidu.com/maps/services/thumbnails?width=93&height=106&align=center,center&src="+item.image[0].imgUrl+"\") no-repeat;background-size:100% 106px;' class='dish_image'><div class='dish_absolute'>"+item.recommend_num+"</div></div><div class='commodity_name'>"+item.commodity_name+"</div></li><div class='shadow_box'></div></div></div>");
    	}
    }


	htmls.push("</ul>");
    if(!haveData){
        //插入HTML代码
        T.g("recommendCon").innerHTML = htmls.join('');
        T.g("recommend_index").style.display = '';
    }
	
}
function showRecommendinfo(index){

    addStat(STAT_CATER_TJ2_CLICK);
	callAppFun('newwindow',{'page':'recommendinfo.html','index_num':index});

}

/*
window.pubTestInfo={
    "content": {
        "ext": {
            "detail_info": {
                "areaid": "1960",
                "checkin_num": "223",
                "collect_num": "129",
                "comment_num": "430",
                "environment_rating": "4.0",
                "image": "http:\/\/i2.dpfile.com\/pc\/b3d5117c5a68c4f2a78928d97b998214(249x249)\/thumb.jpg",
                "image_num": "301",
                "latest_num": "275",
                "link": [{
                    "cn_name": "\u5927\u4f17\u70b9\u8bc4",
                    "name": "dianping",
                    "url": "http:\/\/www.dianping.com\/shop\/3687757",
                    "url_mobilephone": "http:\/\/m.dianping.com\/shop.aspx?pid=3687757"
                }, {
                    "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
                    "name": "shenbian",
                    "url": "http:\/\/s.baidu.com\/shop\/c5defc72e0dd30d3e03b8246",
                    "url_mobilephone": "http:\/\/s.baidu.com\/shop\/c5defc72e0dd30d3e03b8246"
                }, {
                    "cn_name": "\u5f00\u996d\u5587",
                    "name": "kaifanla",
                    "url": "http:\/\/cn.openrice.com\/beijing\/canting\/detail\/430240",
                    "url_mobilephone": "http:\/\/cn.openrice.com\/beijing\/canting\/detail\/430240"
                }, {
                    "cn_name": "QQ\u7f8e\u98df",
                    "name": "qqmeishi",
                    "url": "http:\/\/meishi.qq.com\/shops\/16662478825963503330",
                    "url_mobilephone": "http:\/\/meishi.qq.com\/shops\/16662478825963503330"
                }, {
                    "cn_name": "\u996d\u7edf",
                    "name": "fantong",
                    "url": "http:\/\/www.fantong.com\/biz-224242\/",
                    "url_mobilephone": "http:\/\/wap.fantong.com\/biz-224242\/"
                }, {
                    "cn_name": "\u8ba2\u9910\u5c0f\u79d8\u4e66",
                    "name": "dingcanmishu",
                    "url": "http:\/\/bj.xiaomishu.com\/shop\/B05G13W42733\/",
                    "url_mobilephone": "http:\/\/bj.xiaomishu.com\/shop\/B05G13W42733\/"
                }],
                "name": "\u4e5d\u5934\u9e1f\u9152\u5bb6\u4e0a\u5730\u5e97",
                "overall_rating": "4.0",
                "phone": "010-62979650",
                "poi_address": "\u6d77\u6dc0\u533a\u4e0a\u5730\u897f\u8def\u4e1c\u5317\u65fa\u7efc\u5408\u697c\uff08\u5fd7\u8fdc\u5927\u53a6\u659c\u5bf9\u9762\uff09",
                "point": {
                    "x": "12947536.64",
                    "y": "4845449.36"
                },
                "price": "61",
                "service_rating": "4.0",
                "source_url": "http:\/\/www.dianping.com\/shop\/3687757",
                "tag": "\u4e0a\u5730",
                "taste_rating": "4.0",
                "total_num": "1367",
                "di_review_keyword": [{
                    "keyword": "\u670d\u52a1\u70ed\u60c5",
                    "keyword_type": "1",
                    "keyword_num": "11"
                }, {
                    "keyword": "\u73af\u5883\u5bbd\u655e",
                    "keyword_type": "1",
                    "keyword_num": "7"
                }, {
                    "keyword": "\u5241\u6912\u9c7c\u5934\u6b63\u5b97",
                    "keyword_type": "1",
                    "keyword_num": "2"
                }, {
                    "keyword": "\u5241\u6912\u9c7c\u5934\u8fc7\u763e",
                    "keyword_type": "1",
                    "keyword_num": "1"
                }, {
                    "keyword": "\u9ec4\u8c46\u732a\u8e44\u5730\u9053",
                    "keyword_type": "1",
                    "keyword_num": "1"
                }, {
                    "keyword": "\u9178\u6c64\u9c7c\u5730\u9053",
                    "keyword_type": "1",
                    "keyword_num": "1"
                }, {
                    "keyword": "\u6392\u9aa8\u85d5\u6c64\u6b63\u5b97",
                    "keyword_type": "1",
                    "keyword_num": "1"
                }, {
                    "keyword": "\u5241\u6912\u9c7c\u5934\u9c9c\u7f8e",
                    "keyword_type": "1",
                    "keyword_num": "1"
                }, {
                    "keyword": "\u73af\u5883\u5608\u6742",
                    "keyword_type": "0",
                    "keyword_num": "5"
                }, {
                    "keyword": "\u73af\u5883\u4e71",
                    "keyword_type": "0",
                    "keyword_num": "5"
                }],
                "_validate": 1,
                "origin_id": {
                    "lbc_uid": "7042213525806790647"
                },
                "review_flag": 1,
                "premium_flag": 0
            },
            "image": {
                "all": [{
                    "cn_name": "\u5546\u6237\u4e2d\u5fc3",
                    "imgUrl": "",
                    "link": "",
                    "link_mobilephone": "",
                    "name": "lbc-biaozhu",
                    "photo_num": ""
                }, {
                    "name": "shenbian",
                    "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
                    "imgUrl": "http:\/\/g.hiphotos.baidu.com\/shenbian\/w%3D640\/sign=bce38fd8918fa0ec7fc767091696594a\/2934349b033b5bb517d96d1536d3d539b700bccb.jpg",
                    "link": "http:\/\/s.baidu.com\/shop\/album\/c5defc72e0dd30d3e03b8246\/0\/",
                    "photo_num": "4",
                    "create_time": "1354759597",
                    "src_url": "http:\/\/s.baidu.com\/shop\/c5defc72e0dd30d3e03b8246"
                }, {
                    "name": "shenbian",
                    "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
                    "imgUrl": "http:\/\/a.hiphotos.baidu.com\/shenbian\/w%3D640\/sign=d01a157abaa1cd1105b671248913c8b0\/d833c895d143ad4bf9d5b78a82025aafa50f0684.jpg",
                    "link": "http:\/\/s.baidu.com\/shop\/album\/c5defc72e0dd30d3e03b8246\/0\/",
                    "photo_num": "4",
                    "create_time": "1323745441",
                    "src_url": "http:\/\/s.baidu.com\/shop\/c5defc72e0dd30d3e03b8246"
                }, {
                    "name": "shenbian",
                    "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
                    "imgUrl": "http:\/\/h.hiphotos.baidu.com\/shenbian\/w%3D640\/sign=b7f7443aad4bd11304cdb4366aaea488\/8ad4b31c8701a18bf8b4b2069e2f07082838fe18.jpg",
                    "link": "http:\/\/s.baidu.com\/shop\/album\/c5defc72e0dd30d3e03b8246\/0\/",
                    "photo_num": "4",
                    "create_time": "1322979922",
                    "src_url": "http:\/\/s.baidu.com\/shop\/c5defc72e0dd30d3e03b8246"
                }, {
                    "name": "shenbian",
                    "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
                    "imgUrl": "http:\/\/b.hiphotos.baidu.com\/shenbian\/w%3D640\/sign=9b42204f62d0f703e6b296d838fb5148\/242dd42a2834349b126a18ddc9ea15ce36d3be7d.jpg",
                    "link": "http:\/\/s.baidu.com\/shop\/album\/c5defc72e0dd30d3e03b8246\/0\/",
                    "photo_num": "4",
                    "create_time": "1312521696",
                    "src_url": "http:\/\/s.baidu.com\/shop\/c5defc72e0dd30d3e03b8246"
                }],
                "exterior": [{
                    "cn_name": "\u5546\u6237\u4e2d\u5fc3",
                    "imgUrl": "",
                    "link": "",
                    "link_mobilephone": "",
                    "name": "lbc-biaozhu",
                    "photo_num": ""
                }],
                "other": [{
                    "cn_name": "\u5927\u4f17\u70b9\u8bc4",
                    "imgUrl": "http:\/\/i2.dpfile.com\/pc\/28dec97a9edb526e954f01d260974c6e\/11808679_m.jpg",
                    "link": "http:\/\/www.dianping.com\/shop\/3687757\/photos",
                    "link_mobilephone": "http:\/\/www.dianping.com\/shop\/3687757\/photos",
                    "name": "dianping",
                    "photo_num": ""
                }, {
                    "cn_name": "\u5f00\u996d\u5587",
                    "imgUrl": "http:\/\/static2.cn.orstatic.com\/UserPhoto\/photo\/1\/19J\/008ZWZCE610BEFCD5BA605n.jpg",
                    "link": "http:\/\/cn.openrice.com\/beijing\/canting\/photos\/430240",
                    "link_mobilephone": "http:\/\/cn.openrice.com\/beijing\/canting\/photos\/430240",
                    "name": "kaifanla",
                    "photo_num": ""
                }, {
                    "cn_name": "\u8ba2\u9910\u5c0f\u79d8\u4e66",
                    "imgUrl": "http:\/\/upload3.95171.cn\/albumpicimages\/201005\/20\/_1274320675yxyP.jpg",
                    "link": "http:\/\/bj.xiaomishu.com\/shop\/B05G13W42733\/slides\/",
                    "link_mobilephone": "http:\/\/bj.xiaomishu.com\/shop\/B05G13W42733\/slides\/",
                    "name": "dingcanmishu",
                    "photo_num": ""
                }, {
                    "name": "shenbian",
                    "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
                    "imgUrl": "http:\/\/a.hiphotos.baidu.com\/shenbian\/w%3D640\/sign=d01a157abaa1cd1105b671248913c8b0\/d833c895d143ad4bf9d5b78a82025aafa50f0684.jpg",
                    "link": "http:\/\/s.baidu.com\/shop\/album\/c5defc72e0dd30d3e03b8246\/0\/",
                    "photo_num": "4",
                    "create_time": "1323745441",
                    "src_url": "http:\/\/s.baidu.com\/shop\/c5defc72e0dd30d3e03b8246"
                }, {
                    "name": "shenbian",
                    "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
                    "imgUrl": "http:\/\/h.hiphotos.baidu.com\/shenbian\/w%3D640\/sign=b7f7443aad4bd11304cdb4366aaea488\/8ad4b31c8701a18bf8b4b2069e2f07082838fe18.jpg",
                    "link": "http:\/\/s.baidu.com\/shop\/album\/c5defc72e0dd30d3e03b8246\/0\/",
                    "photo_num": "4",
                    "create_time": "1322979922",
                    "src_url": "http:\/\/s.baidu.com\/shop\/c5defc72e0dd30d3e03b8246"
                }, {
                    "name": "shenbian",
                    "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
                    "imgUrl": "http:\/\/b.hiphotos.baidu.com\/shenbian\/w%3D640\/sign=9b42204f62d0f703e6b296d838fb5148\/242dd42a2834349b126a18ddc9ea15ce36d3be7d.jpg",
                    "link": "http:\/\/s.baidu.com\/shop\/album\/c5defc72e0dd30d3e03b8246\/0\/",
                    "photo_num": "4",
                    "create_time": "1312521696",
                    "src_url": "http:\/\/s.baidu.com\/shop\/c5defc72e0dd30d3e03b8246"
                }],
                "recommend": [{
                    "cn_name": "\u5927\u4f17\u70b9\u8bc4",
                    "imgUrl": "http:\/\/i2.dpfile.com\/pc\/b3d5117c5a68c4f2a78928d97b998214(249x249)\/thumb.jpg",
                    "link": "http:\/\/www.dianping.com\/shop\/3687757\/photos",
                    "link_mobilephone": "http:\/\/www.dianping.com\/shop\/3687757\/photos",
                    "name": "dianping",
                    "photo_num": ""
                }, {
                    "cn_name": "\u5927\u4f17\u70b9\u8bc4",
                    "imgUrl": "http:\/\/i3.dpfile.com\/pc\/38f4be85d5f891ae3c7029af529bc83c(249x249)\/thumb.jpg",
                    "link": "http:\/\/www.dianping.com\/shop\/3687757\/photos",
                    "link_mobilephone": "http:\/\/www.dianping.com\/shop\/3687757\/photos",
                    "name": "dianping",
                    "photo_num": ""
                }, {
                    "cn_name": "\u5927\u4f17\u70b9\u8bc4",
                    "imgUrl": "http:\/\/i1.dpfile.com\/pc\/c1c305d9de67334bb07ae2e3dae89d5d(249x249)\/thumb.jpg",
                    "link": "http:\/\/www.dianping.com\/shop\/3687757\/photos",
                    "link_mobilephone": "http:\/\/www.dianping.com\/shop\/3687757\/photos",
                    "name": "dianping",
                    "photo_num": ""
                }, {
                    "name": "shenbian",
                    "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
                    "imgUrl": "http:\/\/c.hiphotos.baidu.com\/shenbian\/w%3D640\/sign=d3c9727d36d3d539c13d0cc70a86e927\/b90e7bec54e736d1350dde8b9b504fc2d5626912.jpg",
                    "link": "http:\/\/s.baidu.com\/shop\/album\/c5defc72e0dd30d3e03b8246\/0\/",
                    "photo_num": "59",
                    "create_time": "1347606214",
                    "src_url": "http:\/\/s.baidu.com\/shop\/c5defc72e0dd30d3e03b8246"
                }, {
                    "name": "shenbian",
                    "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
                    "imgUrl": "http:\/\/b.hiphotos.baidu.com\/shenbian\/w%3D640\/sign=a4efd97781cb39dbc1c06452e01709a7\/42a98226cffc1e17f3a931ac4a90f603738de91d.jpg",
                    "link": "http:\/\/s.baidu.com\/shop\/album\/c5defc72e0dd30d3e03b8246\/0\/",
                    "photo_num": "59",
                    "create_time": "1345988890",
                    "src_url": "http:\/\/s.baidu.com\/shop\/c5defc72e0dd30d3e03b8246"
                }, {
                    "name": "shenbian",
                    "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
                    "imgUrl": "http:\/\/d.hiphotos.baidu.com\/shenbian\/w%3D640\/sign=0aaa8e8edd54564ee565e73d83dc9cde\/4610b912c8fcc3ce80037bae9245d688d53f206f.jpg",
                    "link": "http:\/\/s.baidu.com\/shop\/album\/c5defc72e0dd30d3e03b8246\/0\/",
                    "photo_num": "59",
                    "create_time": "1345988810",
                    "src_url": "http:\/\/s.baidu.com\/shop\/c5defc72e0dd30d3e03b8246"
                }, {
                    "name": "shenbian",
                    "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
                    "imgUrl": "http:\/\/e.hiphotos.baidu.com\/shenbian\/w%3D640\/sign=1fcb37fcf81986184147ec807aec2e69\/09fa513d269759ee91bdd256b2fb43166c22dfba.jpg",
                    "link": "http:\/\/s.baidu.com\/shop\/album\/c5defc72e0dd30d3e03b8246\/0\/",
                    "photo_num": "59",
                    "create_time": "1345988731",
                    "src_url": "http:\/\/s.baidu.com\/shop\/c5defc72e0dd30d3e03b8246"
                }, {
                    "name": "shenbian",
                    "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
                    "imgUrl": "http:\/\/h.hiphotos.baidu.com\/shenbian\/w%3D640\/sign=4e59d64b76094b36db9218e993ce7c00\/9825bc315c6034a8212b9015cb1349540823765c.jpg",
                    "link": "http:\/\/s.baidu.com\/shop\/album\/c5defc72e0dd30d3e03b8246\/0\/",
                    "photo_num": "59",
                    "create_time": "1343287532",
                    "src_url": "http:\/\/s.baidu.com\/shop\/c5defc72e0dd30d3e03b8246"
                }, {
                    "name": "shenbian",
                    "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
                    "imgUrl": "http:\/\/b.hiphotos.baidu.com\/shenbian\/w%3D640\/sign=07429a70b31c8701d6b6b1e2177e9e6e\/42166d224f4a20a46f12185390529822720ed011.jpg",
                    "link": "http:\/\/s.baidu.com\/shop\/album\/c5defc72e0dd30d3e03b8246\/0\/",
                    "photo_num": "59",
                    "create_time": "1343276868",
                    "src_url": "http:\/\/s.baidu.com\/shop\/c5defc72e0dd30d3e03b8246"
                }, {
                    "name": "shenbian",
                    "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
                    "imgUrl": "http:\/\/f.hiphotos.baidu.com\/shenbian\/w%3D640\/sign=fb305a92acaf2eddd4f14aedbd110102\/5d6034a85edf8db1462a58f00923dd54564e7419.jpg",
                    "link": "http:\/\/s.baidu.com\/shop\/album\/c5defc72e0dd30d3e03b8246\/0\/",
                    "photo_num": "59",
                    "create_time": "1343276835",
                    "src_url": "http:\/\/s.baidu.com\/shop\/c5defc72e0dd30d3e03b8246"
                }, {
                    "name": "shenbian",
                    "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
                    "imgUrl": "http:\/\/h.hiphotos.baidu.com\/shenbian\/w%3D640\/sign=fda45b492e738bd4c421b135918a876c\/54fbb2fb43166d22685a3100462309f79052d270.jpg",
                    "link": "http:\/\/s.baidu.com\/shop\/album\/c5defc72e0dd30d3e03b8246\/0\/",
                    "photo_num": "59",
                    "create_time": "1343276795",
                    "src_url": "http:\/\/s.baidu.com\/shop\/c5defc72e0dd30d3e03b8246"
                }, {
                    "name": "shenbian",
                    "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
                    "imgUrl": "http:\/\/h.hiphotos.baidu.com\/shenbian\/w%3D640\/sign=74f393a65aafa40f3cc6cdd99b65038c\/86d6277f9e2f07082f3b0e94e924b899a901f263.jpg",
                    "link": "http:\/\/s.baidu.com\/shop\/album\/c5defc72e0dd30d3e03b8246\/0\/",
                    "photo_num": "59",
                    "create_time": "1343276746",
                    "src_url": "http:\/\/s.baidu.com\/shop\/c5defc72e0dd30d3e03b8246"
                }, {
                    "name": "shenbian",
                    "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
                    "imgUrl": "http:\/\/h.hiphotos.baidu.com\/shenbian\/w%3D640\/sign=cf74db2465380cd7e61ea1e99145ad14\/cf1b9d16fdfaaf518cd4a52b8c5494eef01f7a6a.jpg",
                    "link": "http:\/\/s.baidu.com\/shop\/album\/c5defc72e0dd30d3e03b8246\/0\/",
                    "photo_num": "59",
                    "create_time": "1343276700",
                    "src_url": "http:\/\/s.baidu.com\/shop\/c5defc72e0dd30d3e03b8246"
                }]
            },
            "review": [{
                "cn_name": "\u5927\u4f17\u70b9\u8bc4",
                "from": "dianping.com",
                "info": [{
                    "content": "\u4e5d\u5934\u9e1f\u5728\u5317\u4eac\u5f00\u4e86\u5f88\u591a\u5206\u5e97\uff0c\u5df2\u5bb6\u5e38\u83dc\u6700\u51fa\u540d\u3002\u73af\u5883\u4e5f\u8fd8\u4e0d\u9519\uff0c\u4ef7\u683c\u516c\u9053\uff0c\u9002\u5408\u5bb6\u5ead\u805a\u4f1a\u3001\u670b\u53cb\u5c0f\u805a\u3002\u6392\u9aa8\u7096\u7684\u5f88\u70c2\uff0c\u9178\u83dc\u9c7c\u5473\u9053\u4e5f\u597d\uff0c\u5176\u4ed6\u7684\u5c0f\u83dc\u90fd\u8fd8\u884c\u3002",
                    "date": "12-10-27 11:44",
                    "one_url": "http:\/\/www.dianping.com\/review\/36489656",
                    "user_name": "哈密路的秋千",
                    "user_logo": "http://i1.dpfile.com/pc/39f02f167dc490c7ba30b4d3cfedf3b5(48c48)/thumb.jpg",
                    "user_url": "http://www.dianping.com/member/1475008",
                    "heat": "10",
                    "overall_rating": "4",
                    "taste_rating": "3",
                    "environment_rating": "3",
                    "service_rating": "3",
                    "price": ""
                }, {
                    "content": "\u540c\u4e8b\u8bf7\u5ba2\uff0c\u597d\u4e45\u4e0d\u5403\u4e5d\u5934\u9e1f\uff0c\u60f3\u5f53\u5e74\u591a\u706b\u7684\u5e97\u554a\uff0c\u73b0\u5728\u5df2\u7136\u8fc7\u6c14\u4e86\u3002\u3002\u3002\u540c\u4e8b\u70b9\u7684\u83dc\uff0c\u9664\u4e86\u9999\u8fa3\u732a\u8e44\uff0c\u5176\u4ed6\u90fd\u6ca1\u70b9\u5230\u7279\u8272\u83dc\uff0c\u4e3a\u719f\u4e48\u6211\u8eab\u8fb9\u5168\u662f\u5230\u54ea\u90fd\u70b9\u5bab\u4fdd\u9e21\u4e01\u6216\u8005\u65e5\u672c\u8c46\u8150\u7684\u4eba\u554a\u3002\u3002\u3002\u3002\u3002",
                    "date": "12-10-15 15:38",
                    "one_url": "http:\/\/www.dianping.com\/review\/36227283",
                    "user_name": "哈密路的秋千",
                    "user_logo": "http://i1.dpfile.com/pc/39f02f167dc490c7ba30b4d3cfedf3b5(48c48)/thumb.jpg",
                    "user_url": "http://www.dianping.com/member/1475008",
                    "heat": "10",
                    "overall_rating": "4",
                    "taste_rating": "3",
                    "environment_rating": "3",
                    "service_rating": "3",
                    "price": ""
                }, {
                    "content": "\u5e97\u91cc\u7684\u73af\u5883\u8fd8\u597d\u5427\uff0c\u633a\u8212\u670d\u7684\uff0c\u70b9\u7684\u51e0\u6837\u83dc\u611f\u89c9\u90fd\u4e0d\u9519\uff0c\u5c31\u662f\u9178\u6c64\u9c7c\u6ca1\u6211\u60f3\u8c61\u7684\u597d\u5403\uff0c\u9ec4\u8c46\u7096\u732a\u8e44\u4e0d\u9519\uff0c\u770b\u8d77\u6765\u5f88\u6709\u8425\u517b\uff0c\u5403\u8d77\u6765\u4e5f\u4e0d\u6cb9\u817b\u3002",
                    "date": "12-10-14 19:48",
                    "one_url": "http:\/\/www.dianping.com\/review\/36208647"
                }, {
                    "content": "\u597d\u4e45\u6ca1\u5403\u6e56\u5317\u83dc\u4e86\uff0c\u8fd8\u662f\u5728\u6e56\u5317\u4e0a\u5927\u5b66\u65f6\u5403\u7684\uff0c\u90fd\u662f\u6e56\u5317\u4eba\u662f\u6700\u7cbe\u660e\u7684\uff0c\u5f53\u7136\u83dc\u4e5f\u4e0d\u4f8b\u5916\u3002\u90fd\u8bf4\u5929\u4e0a\u4e5d\u5934\u9e1f\uff0c\u5730\u4e0b\u6e56\u5317\u4f6c\u3002\u5f53\u7136\u8fd9\u5bb6\u5e97\u7684\u540d\u5b57\u8d77\u7684\u6070\u5230\u597d\u5904\u3002\u6211\u4eec\u70b9\u4e86\u5f88\u591a\u83dc\uff0c\u6211\u6700\u559c\u6b22\u5403\u7cd6\u918b\u6392\u9aa8\uff0c\u867d\u4e0d\u662f\u672c\u5e97\u7684\u62db\u724c\u83dc\uff0c\u4f46\u4e5f\u522b\u5177\u4e00\u683c\u3002\u5f53\u7136\u62db\u724c\u83dc\u9178\u6c64\u9c7c\u5c31\u522b\u63d0\u591a\u597d\u5403\u4e86\uff0c\u9178\u83dc\u591f\u9178\uff0c\u653e\u7684\u6709\u70b9\u5c11\u4e86\uff0c\u8981\u662f\u591a\u653e\u4e9b\u4f1a\u66f4\u597d\u5403\u7684\uff01\u4e0b\u6b21\u4f1a\u518d\u6765\u7684\uff01",
                    "date": "12-09-23 11:09",
                    "one_url": "http:\/\/www.dianping.com\/review\/35795541"
                }, {
                    "content": "team building\u603b\u6765\u5403\uff0c\u6ca1\u4ec0\u4e48\u610f\u601d\uff0c\u56e0\u4e3a\u5468\u8fb9\u4e5f\u6ca1\u4ec0\u4e48\u80fd\u5403\u7684\u4e86\u3002\u6bd5\u7adf\u4e0a\u5730\u8fd9\u4e2a\u5730\u65b9\u3002\u3002\u3002\u3002\u6ca1\u4ec0\u4e48\u7279\u522b\u559c\u6b22\u7684\u83dc\uff0c\u603b\u4e4b\u81ea\u5df1\u82b1\u94b1\u662f\u80af\u5b9a\u4e0d\u5728\u8fd9\u79cd\u5730\u65b9\u5403\u7684\u3002\u56e0\u4e3a\u4e3b\u8981\u90fd\u662f\u516c\u53f8\u7684\u4eba\u6765\u5403\u516c\u6b3e\uff0c\u6240\u4ee5\u83dc\u4ef7\u8d8a\u6765\u8d8a\u79bb\u8c31\uff0c\u8d28\u91cf\u4e5f\u6ca1\u4ec0\u4e48\u957f\u8fdb\u3002",
                    "date": "12-09-16 21:20",
                    "one_url": "http:\/\/www.dianping.com\/shop\/3687757\/review_all"
                }],
                "name": "dianping",
                "review_num": "331",
                "url": "http:\/\/www.dianping.com\/shop\/3687757\/review_all",
                "url_mobilephone": "http:\/\/www.dianping.com\/shop\/3687757\/review_all"
            }, {
                "from": "s.baidu.com",
                "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
                "name": "shenbian",
                "review_num": "22",
                "info": [{
                    "content": "\u6211\u63a8\u8350\u8fd9\u5bb6\u5e97",
                    "date": "2012-12-11 17:06:39",
                    "id": "1018490",
                    "user_name": "Yuqin101",
                    "user_logo": "",
                    "price": "0",
                    "rating": {
                        "\u53e3\u5473": 0,
                        "\u670d\u52a1": 0,
                        "\u73af\u5883": 0
                    },
                    "one_url": "http:\/\/s.baidu.com\/comment\/1dbe469e84f5c1fa41e59316",
                    "overall_rating": "5"
                }, {
                    "content": "like it.it is delicious",
                    "date": "2012-12-11 16:56:13",
                    "id": "1018486",
                    "user_name": "dujiao12345",
                    "user_logo": "http:\/\/hiphotos.baidu.com\/view\/abpic\/item\/738b4710b912c8fce8775d63fc039245d7882193.jpg",
                    "price": "12",
                    "rating": {
                        "\u53e3\u5473": 0,
                        "\u670d\u52a1": 0,
                        "\u73af\u5883": 0
                    },
                    "one_url": "http:\/\/s.baidu.com\/comment\/6d94a65208db3d6167349f16",
                    "overall_rating": "5"
                }, {
                    "content": "\u4e0d\u9519",
                    "date": "2012-12-07 21:39:18",
                    "id": "1017792",
                    "user_name": "\u53ef\u83f2\u53ef",
                    "user_logo": "",
                    "price": "0",
                    "rating": {
                        "\u53e3\u5473": 0,
                        "\u670d\u52a1": 0,
                        "\u73af\u5883": 0
                    },
                    "one_url": "http:\/\/s.baidu.com\/comment\/498c474183274ca1cae7d51b",
                    "overall_rating": "5"
                }, {
                    "content": "\u4e0d\u9519",
                    "date": "2012-12-07 17:25:01",
                    "id": "1017743",
                    "user_name": "leojianxing",
                    "user_logo": "",
                    "price": "0",
                    "rating": {
                        "\u53e3\u5473": 0,
                        "\u670d\u52a1": 0,
                        "\u73af\u5883": 0
                    },
                    "one_url": "http:\/\/s.baidu.com\/comment\/fcf8724af7ae09116f11841b",
                    "overall_rating": "5"
                }, {
                    "content": "\u6211\u63a8\u8350\u8fd9\u5bb6\u5e97",
                    "date": "2012-12-07 16:10:37",
                    "id": "1017726",
                    "user_name": "bjtufang",
                    "user_logo": "",
                    "price": "0",
                    "rating": {
                        "\u53e3\u5473": 0,
                        "\u670d\u52a1": 0,
                        "\u73af\u5883": 0
                    },
                    "one_url": "http:\/\/s.baidu.com\/comment\/3f6281724c3fc0cd36e6971b",
                    "overall_rating": "5"
                }],
                "url": "http:\/\/s.baidu.com\/shop\/c5defc72e0dd30d3e03b8246\/#commentList",
                "src_url": "http:\/\/s.baidu.com\/shop\/c5defc72e0dd30d3e03b8246"
            }, {
                "cn_name": "QQ\u7f8e\u98df",
                "from": "meishi.qq.com",
                "info": [{
                    "content": "\u8fd9\u5bb6\u4e5d\u5934\u9e1f\u662f\u4ece\u4e0a\u5730\u82b1\u9e1f\u5e02\u573a\u90a3\u642c\u8fc1\u8fc7\u6765\u7684\uff0c\u65b0\u5e97\u7ecf\u8fc7\u88c5\u4fee\uff0c\u5f88\u65f6\u5c1a\uff0c\u9002\u5408\u5bb6\u5ead\u5bb4\u4f1a\u548c\u516c\u53f8\u805a\u9910\u8bf7\u5ba2\u3002\u4e00\u5c42\u5927\u5385\u6211\u8ba4\u4e3a\u4e3e\u529e\u4e2a\u5341\u4e94\u684c\u5de6\u53f3\u7684\u5a5a\u5bb4\u7edd\u5bf9\u6ca1\u6709\u95ee\u9898\u3002\u8fd9\u5bb6\u5e97\u7684\u83dc\u6211\u89c9\u5f97\u5f88\u597d\uff0c\u4e0d\u8bba\u662f\u53e3\u5473\u8fd8\u662f\u83dc\u7684\u65b0\u9c9c\u5ea6\u3002\u5927\u4f17\u83dc\u6211\u63a8\u8350\u9178\u6c64\u9c7c\uff0c\u5241\u6912\u9c7c\u5934\uff0c\u6e56\u5317\u7279\u8272\u83dc\u6211\u63a8\u8350\u83b2\u85d5\u7096\u6392\u9aa8\u3001\u7c73\u7c89\u84b8\u83dc\u7c7b\u3002\u9664\u4e86\u83dc\u54c1\u53ef\u53e3\u5916\uff0c\u6211\u5bf9\u5b83\u7684\u670d\u52a1\u4e5f\u5f88\u8ba4\u53ef\uff0c\u539f\u56e0\u6709\u4e8c\uff1a\u7b2c\u4e00\u6211\u5728\u5b83\u90a3\u91cc\u529e\u7684\u5a5a\u793c\uff0c\u5e97\u8001\u677f\u966a\u6211\u4e00\u76f4\u5230\u665a\u4e0a12\u70b9\uff0c\u7763\u4fc3\u5458\u5de5\u88c5\u9970\u5a5a\u793c\u73b0\u573a\uff1b\u7b2c\u4e8c\uff0c\u4e00\u6b21\u5403\u996d\u4e0b\u96e8\u6ca1\u5e26\u4f1e\uff0c\u5e97\u5bb6\u514d\u8d39\u501f\u7ed9\u6211\u4f1e\uff0c\u4e5f\u6ca1\u8981\u6c42\u62bc\u91d1\u4ec0\u4e48\u7684\uff0c\u81f3\u5c11\u540c\u6863\u6b21\u7684\u522b\u7684\u5e97\uff0c\u6211\u6ca1\u9047\u5230\u8fc7\u8fd9\u6837\u7684\u3002",
                    "date": "11-08-09 15:08",
                    "one_url": "http:\/\/www.meishi.qq.com\/reviews\/1312873683_16662478825963503330_57265168_2"
                }, {
                    "content": "\u53e3\u5473\u90fd\u6bd4\u8f83\u91cd\u3002\u8fa3\u7684\u83dc\u5f88\u591a\u3002\u5e74\u4f1a\u7684\u65f6\u5019\u5403\u7684\u3002\u670d\u52a1\u8fd8\u7b97\u53ef\u4ee5\u3002\u73af\u5883\u5f88\u4e00\u822c\uff0c\u6709\u70b9\u5435\u3002",
                    "date": "12-07-20 13:13",
                    "one_url": "http:\/\/www.meishi.qq.com\/reviews\/1342761190_16662478825963503330_6388797_2"
                }, {
                    "content": "\u79bb\u516c\u53f8\u5f88\u8fd1 \u6240\u4ee5\u5c31\u548c\u540c\u4e8b\u5728\u8fd9\u91cc\u805a\u9910\u4e86 \u4e00\u8fdb\u5230\u5e97\u91cc\u611f\u89c9\u5f88\u5bbd\u655e \u7279\u522b\u7684\u660e\u4eae\u548c\u8212\u670d \u800c\u4e14\u8fd9\u5bb6\u5e97\u7684\u5305\u53a2\u5f88\u62a2\u624b \u6211\u4e0a\u4e2a\u661f\u671f\u8ba2\u5927\u5305\u53a2\u7684\u65f6\u5019\u90fd\u6ca1\u6709\u4e86\uff0c\u88ab\u8ba2\u4e86\u51fa\u53bb \u8fd9\u6b21\u597d\u4e0d\u5bb9\u6613\u8ba2\u7684 \u5728\u5305\u53a2\u91cc\u5403\u996d\u5f88\u5b89\u9759\uff0c\u6ca1\u90a3\u4e48\u5435\u95f9\uff0c \u800c\u4e14\u6211\u4eec\u4e5f\u662f\u7b2c\u4e00\u6b21\u6765\u8fd9\u7684 \u5bf9\u8fd9\u7684\u7279\u8272\u83dc\u4e0d\u662f\u5f88\u4e86\u89e3 \u670d\u52a1\u5458\u5c31\u7ed9\u6211\u4eec\u4ecb\u7ecd\u4e86\u51e0\u4e2a\u7279\u8272 \u8fd9\u51e0\u6b3e\u83dc\u5403\u8d77\u6765\u8fd8\u4e0d\u9519\uff0c \u5e76\u4e14\u8fd9\u7684\u670d\u52a1\u5458\u7684\u670d\u52a1\u6001\u5ea6\u4e5f\u975e\u5e38\u7684\u4e0d\u9519 \u6211\u9ebb\u70e6\u5979\u7ed9\u6211\u62ff\u4e86\u597d\u51e0\u6b21\u7684\u9910\u5dfe\u7eb8 \u5979\u90fd\u6ca1\u6709\u4e0d\u8010\u70e6 \u603b\u662f\u7b11\u563b\u563b\u7684 \u5bf9\u8fd9\u5bb6\u5e97\u7684\u5370\u8c61\u4e0d\u9519 \u4e0b\u6b21\u8fd8\u4f1a\u518d\u6765\u7684\uff01",
                    "date": "12-03-02 15:02",
                    "one_url": "http:\/\/www.meishi.qq.com\/reviews\/1330671768_16662478825963503330_78198648_2"
                }, {
                    "content": "\u516c\u53f8\u7b54\u8c22\u4f1a\u4e3e\u529e\u7684\u4e00\u6b21\u805a\u9910\u3002\u83dc\u505a\u7684\u5f88\u4e0d\u9519\uff0c\u5f88\u53ef\u53e3\u3002\u670d\u52a1\u4e00\u822c\u4e86\uff0c\u670d\u52a1\u5458\u53cd\u6620\u6709\u70b9\u8fdf\u949d\u3002\u73af\u5883\u8fd8\u53ef\u4ee5\u3002",
                    "date": "12-02-20 17:49",
                    "one_url": "http:\/\/www.meishi.qq.com\/reviews\/1329731356_16662478825963503330_564017768_1"
                }, {
                    "content": "\u5f88\u4e0d\u9519\u7684\u6e56\u5317\u9910\u9986\uff0c\u5728\u8fd9\u5403\u996d\u4e0d\u4e0b10\u6b21\u4e86\u5f97\u3002\u54ea\u9053\u83dc\u57fa\u672c\u4e0a\u90fd\u8fd8\u4e0d\u9519\uff0c\u5c31\u662f\u90a3\u4e2a\u7206\u809a\u6709\u70b9\u4e0d\u5408\u53e3\u5473\uff0c\u53ef\u80fd\u662f\u6e56\u5317\u6e56\u5357\u559c\u6b22\u5403\u59dc\u7684\u7f18\u6545\u5427\uff0c\u9c9c\u867e\u8c46\u8150\u8fd8\u4e0d\u9519\uff0c\u6709\u70b9\u7126\u7126\u7684 \u5ae9\u5ae9\u7684\uff0c\u5f88\u559c\u6b22\uff1b\u540c\u4e8b\u6bcf\u6b21\u53bb\u90fd\u5fc5\u70b9\u90a3\u4e2a\u828b\u5934\u505a\u7684\u7c73\u7c89\u8089\uff1b\u6700\u65e9\u7684\u65f6\u5019\u8fd9\u91cc\u8fd8\u6709\u53e3\u6c34\u9e21\uff0c\u76f8\u5f53\u597d\u5403\uff0c\u4e0d\u77e5\u9053\u4e3a\u4ec0\u4e48\u73b0\u5728\u6ca1\u6709\u4e86\u3002\u518d\u8bf4\u8bf4\u5241\u6912\u9c7c\u5934\uff0c\u5f88\u6b63\u5b97\uff0c\u9c9c\u9999\u8fa3\u90fd\u5360\u4e86\uff0c\u6700\u540e\u518d\u5012\u4e0a\u9762\u6761\u90a3\u4e48\u4e00\u548c\uff0c\u5473\u9053\u592a\u597d\u4e86\uff0c\u8fd9\u4e2a\u7edd\u5bf9\u662f\u5fc5\u70b9\u7684\uff0c\u6211\u975e\u5e38\u975e\u5e38\u559c\u6b22\u3002\u70ed\u5e72\u9762\u4e5f\u4e0d\u9519\uff0c\u5f53\u4e3b\u98df\u5f88\u597d\u3002\u8fd8\u6709\u725b\u86d9\u4ec0\u4e48\u7684\u504f\u8fa3\uff0c\u732a\u8e44\u4e5f\u4e0d\u9519\uff0c\u8fd8\u6709\u82b1\u751f\u82d7\u7684\u5e72\u9505\u5f88\u7279\u522b\u3002\u5927\u90e8\u5206\u83dc\u90fd\u5c1d\u8bd5\u8fc7\uff0c\u4e0b\u6b21\u53bb\u5c1d\u5c1d\u65b0\u9c9c\u7684\u3002",
                    "date": "11-11-03 11:44",
                    "one_url": "http:\/\/www.meishi.qq.com\/reviews\/1320291879_16662478825963503330_314326347_2"
                }],
                "name": "qqmeishi",
                "review_num": "15",
                "url": "http:\/\/meishi.qq.com\/shops\/16662478825963503330#shop_pro_comment",
                "url_mobilephone": "http:\/\/meishi.qq.com\/shops\/16662478825963503330#shop_pro_comment"
            }, {
                "cn_name": "\u996d\u7edf",
                "from": "fantong.com",
                "info": [{
                    "content": "\u6211\u5f88\u559c\u6b22\u5403\u6e56\u5317\u83dc\uff0c\u8fd9\u4e5f\u662f\u8fde\u9501\u5e97\uff0c\u83dc\u54c1\u7684\u6781\uff0c\u9999\uff0c\u5473\uff0c\u91cf\u90fd\u4ee4\u6211\u6bd4\u8f83\u6ee1\u610f\uff0c\u6211\u4eec\u7ecf\u5e38\u4f1a\u53bb\u8fd9\u91cc\u7528\u9910\uff0c\u611f\u89c9\u73af\u5883\uff0c\u670d\u52a1\u90fd\u8fd8\u633a\u865a\u7684\uff0c\u5475\u5475",
                    "date": "2012-07-17 14:18:16",
                    "one_url": "http:\/\/www.fantong.com\/biz-224242\/#commentM"
                }, {
                    "content": "\u5929\u4e0a\u4e5d\u5934\u9e1f\uff0c\u5730\u4e0a\u6e56\u5317\u4f6c\uff0c\u4e00\u770b\u8fd9\u5bb6\u5e97\u7684\u540d\u5b57\u5c31\u77e5\u9053\u662f\u505a\u6e56\u5317\u83dc\u7684\uff0c\u540c\u4e8b\u805a\u9910\u6765\u8fc7\u4e00\u6b21\uff0c\u611f\u89c9\u8fd8\u662f\u633a\u4e0d\u9519\u7684\uff0c\u505a\u7684\u6e56\u5317\u83dc\u633a\u6b63\u5b97\u7684\uff0c\u9ec4\u8c46\u7096\u732a\u8e44\u95fb\u7740\u5c31\u633a\u9999\uff0c\u732a\u8e44\u5403\u7740\u80a5\u800c\u4e0d\u817b\uff0c\u5f88\u662f\u8f6f\u5ae9\uff01\u6b66\u660c\u9c7c\u7684\u9020\u578b\u633a\u597d\u770b\uff0c\u9c7c\u8089\u5f88\u5ae9\u6ed1\uff01\u8fd8\u6709\u6b66\u6c49\u9e2d\u8116\uff0c\u8fa3\u8fa3\u7684\uff0c\u8d8a\u56bc\u8d8a\u6709\u5473\uff0c\u6211\u8fd8\u662f\u633a\u559c\u6b22\u5403\u6b66\u6c49\u9e2d\u8116\u7684\uff0c\u6700\u540e\u518d\u5403\u70b9\u4e3b\u98df\uff0c\u6211\u6700\u7231\u7684\u6b66\u6c49\u70ed\u5e72\u9762\uff0c\u95fb\u7740\u5c0f\u78e8\u6cb9\u7684\u9999\u5473\u5c31\u98df\u6b32\u5927\u5f00\uff0c\u4ee5\u540e\u8fd8\u5f97\u53bb\u5c1d\u5c1d\uff01",
                    "date": "2012-07-15 20:31:42",
                    "one_url": "http:\/\/www.fantong.com\/biz-224242\/#commentM"
                }, {
                    "content": "\u56e0\u4e3a\u6211\u662f\u6e56\u5317\u4eba\u6240\u4ee5\u8fd9\u5e97\u91cc\u9762\u7684\u83dc\u5f88\u9002\u5408\u6211\uff0c\u6211\u7ecf\u5e38\u5e26\u670b\u53cb\u4e00\u8d77\u6765\uff0c\u6bcf\u6b21\u90fd\u4f1a\u70b9\u90a3\u4e2a\u9ec4\u8c46\u732a\u8e44\u5473\u9053\u5f88\u9c9c\uff0c\u732a\u8e44\u7096\u7684\u7279\u522b\u5165\u5473\uff0c\u8fd8\u6709\u5241\u6912\u9c7c\u5934\u6211\u4e5f\u7279\u522b\u559c\u6b22\uff0c\u670d\u52a1\u4e5f\u5f88\u4e0d\u9519\u554a",
                    "date": "2012-07-12 11:43:43",
                    "one_url": "http:\/\/www.fantong.com\/biz-224242\/#commentM"
                }, {
                    "content": "\u540d\u5b57\u8d77\u7684\u5012\u662f\u5f88\u9738\u6c14\u554a\uff0c\u5473\u9053\u4e5f\u8fd8\u662f\u4e0d\u9519\u7684\uff01\u63a8\u8350\u4e2a\u5241\u6912\u9c7c\u5934\u554a\uff0c\u9178\u6c64\u9c7c\u554a\uff0c\u4e09\u9c9c\u8c46\u76ae\u554a\uff0c\u548c\u6e56\u5357\u83dc\u5f88\u591a\u662f\u91cd\u590d\u7684\uff0c\u5473\u9053\u4e5f\u90fd\u662f\u5dee\u4e0d\u591a\u7684",
                    "date": "2012-07-06 12:35:59",
                    "one_url": "http:\/\/www.fantong.com\/biz-224242\/#commentM"
                }, {
                    "content": "\u6392\u9aa8\u85d5\u6c64\u5f88\u6b63\u5b97\uff0c\u7528\u7684\u662f\u6e56\u5317\u7ea2\u85d5\uff0c\u5473\u9053\u5f88\u68d2\uff0c\u4e0d\u8fc7\u6392\u9aa8\u4e0d\u592a\u591a\uff01\u70ed\u5e72\u9762\u5473\u9053\u5f88\u597d\uff0c\u5728\u5317\u4eac\u7b97\u662f\u9876\u7ea7\u4e86\uff0c\u78b1\u6ca1\u6709\u6b66\u6c49\u7684\u70ed\u5e72\u9762\u591a\uff0c\u4e5f\u4e0d\u9519\u3002\u9178\u83dc\u8089\u672b\u7092\u7c89\u4e1d\uff0c\u6539\u826f\u4e86\uff0c\u6ca1\u90a3\u4e48\u54b8\uff0c\u9002\u5408\u4e0d\u4e0b\u996d\u76f4\u63a5\u5403\uff0c\u4e0d\u8fc7\u6e56\u5317\u83dc\u7528\u7684\u662f\u82d5\u7c89\uff0c\u800c\u7c89\u4e1d\u4e00\u822c\u662f\u7eff\u8c46\u7c89\uff0c\u5931\u53bb\u4e86\u8f6f\u7cef\u7684\u53e3\u611f\u3002\u6885\u83dc\u6263\u8089\uff0c\u5f88\u70c2\u3002\u8fd9\u5bb6\u7684\u6e56\u5317\u5bb6\u5e38\u83dc\u5f88\u597d\uff0c\u5176\u4ed6\u83dc\u5c31\u4e00\u822c\u4e86\u3002",
                    "date": "2012-06-22 19:26:13",
                    "one_url": "http:\/\/www.fantong.com\/biz-224242\/#commentM"
                }],
                "name": "fantong",
                "review_num": "79",
                "url": "http:\/\/www.fantong.com\/biz-224242\/#commentM",
                "url_mobilephone": "http:\/\/www.fantong.com\/biz-224242\/#commentM"
            }, {
                "cn_name": "\u8ba2\u9910\u5c0f\u79d8\u4e66",
                "from": "xiaomishu.com",
                "info": [{
                    "content": "\u83dc\u54c1\u504f\u8fa3\uff0c\u4f46\u5473\u9053\u8fd8\u53ef\u4ee5\u3002",
                    "date": "2012\u5e7410\u670814\u65e5 10\u65f640\u5206",
                    "one_url": "http:\/\/www.xiaomishu.com\/shop\/B05G13W42733\/review\/825516\/#menu"
                }, {
                    "content": "\u4e0a\u83dc\u901f\u5ea6\u5feb\uff01 \u83dc\u7cfb\u6e58\u9102\u6df7\u5408\u4e86\uff01 100\u8fd420\uff0c\u503c\uff01",
                    "date": "2012\u5e7410\u670805\u65e5 22\u65f659\u5206",
                    "one_url": "http:\/\/www.xiaomishu.com\/shop\/B05G13W42733\/review\/820405\/#menu"
                }, {
                    "content": "\u4e0a\u5730\u4e5d\u5934\u9e1f\u9152\u5bb6\u79bb\u516c\u53f8\u8fd1\uff0c\u5e38\u53bb\uff0c\u4e0d\u8fc7\u4eba\u574750\u53ef\u4e0d\u591f\u3002\u4e0a\u5730\u9644\u8fd1\u516c\u53f8\u6253\u62989.5\u6298\uff0c\u4e0d\u591f\u9694\u58c1\u5c31\u662f\u6f47\u6e58\u5e9c\uff1b\u8fd8\u662f\u6f47\u6e58\u5e9c\u4eba\u6c14\u65fa",
                    "date": "2012\u5e7405\u670816\u65e5 22\u65f644\u5206",
                    "one_url": "http:\/\/www.xiaomishu.com\/shop\/B05G13W42733\/review\/708753\/#menu"
                }, {
                    "content": "\u96c5\u9ad8\u5361\u540d\u5f55\u4e0a\u6709\u8fd9\u5bb6,\u53bb\u4e86\u627e\u4e0d\u5230,\u8def\u4eba\u8bf4\u642c\u5bb6\u4e86,\u627e\u5230\u65b0\u5730\u513f,\u524d\u53f0\u8bf4\u5361\u4e0d\u80fd\u7528,\u8ba9\u53eb\u7ecf\u7406\u6765\u89e3\u91ca,\u4e00\u4e2a\u670d\u52a1\u5458\u8bf4\u5361\u80fd\u7528,\u8fd8\u80fd\u6253\u6298,\u8bf4\u524d\u53f0\u65b0\u6765\u7684\u4e0d\u77e5\u9053.\u5403\u5b8c\u996d\u7ed3\u5e10\u524d\u53f0\u8bf4\u5361\u4e0d\u80fd\u7528,\u9886\u73ed\u8fc7\u6765\u8bf4\u8ddf\u96c5\u9ad8\u516c\u53f8\u6ca1\u534f\u8c03\u597d,\u6ca1\u534f\u8c03\u597d\u4f60\u5f80\u540d\u5f55\u4e0a\u5199,\u8499\u4eba\u5440,\u90a3\u4e2a\u670d\u52a1\u5458\u4e4b\u524d\u8bf4\u7684\u8bdd\u8fd8\u4e0d\u8ba4\u5e10\u4e86.\u8981\u4e0d\u9910\u5385\u9664\u4e86\u4e00\u4e2a\u7ed3\u5a5a\u7684\u6ca1\u4ec0\u9ebd\u5ba2\u4eba.\u83dc\u91cf\u53c8\u5c0f,\u670d\u52a1\u5458\u52a8\u4f5c\u8d85\u6162,\u83dc\u7684\u53e3\u5473\u6781\u4e3a\u4e00\u822c,\u6700\u540e\u9760\u8ba9\u670d\u52a1\u5458\u54c0\u6c42\u5ba2\u4eba\u4e0d\u8981\u8ba9\u4ed6\u4eec\u4e22\u4e86\u5de5\u4f5c\u800c\u7528\u73b0\u91d1\u7ed3\u5e10,\u5f00\u7684\u53d1\u7968\u4e5f\u4e0d\u662f\u4e5d\u5934\u9e1f\u7684,\u662f\u4e2a\u5176\u4ed6\u7684\u9910\u5385\u7684.\u4e0d\u77e5\u9053\u8fd9\u5bb6\u4e5d\u5934\u9e1f\u8fd8\u6709\u591a\u5c11\u732b\u6eba.\u53cd\u6b63\u8fd9\u4e2a\u9ed1\u5e97\u518d\u4e0d\u53bb\u4e86.\u6574\u4e2a\u4e00\u4e2a\u6b3a\u8bc8!\u987a\u4fbf\u63d0\u9192\u4e0d\u60f3\u5403\u996d\u627e\u6c14\u751f\u7684\u90fd\u522b\u53bb!",
                    "date": "2010\u5e7404\u670825\u65e5 17\u65f633\u5206",
                    "one_url": "http:\/\/www.xiaomishu.com\/shop\/B05G13W42733\/review\/162572\/#menu"
                }],
                "name": "dingcanmishu",
                "review_num": "4",
                "url": "http:\/\/bj.xiaomishu.com\/shop\/B05G13W42733\/review\/#menu",
                "url_mobilephone": "http:\/\/bj.xiaomishu.com\/shop\/B05G13W42733\/review\/#menu"
            }],
            "rich_info": {
                "alias": "",
                "atmosphere": ",\u5927\u578b\u5bb4\u4f1a,\u5bb6\u4eba\u56e2\u805a,\u5bb6\u5ead\u805a\u4f1a,\u670b\u53cb\u805a\u9910,\u670b\u53cb\u805a\u4f1a,\u60c5\u4fa3\u7ea6\u4f1a,\u5546\u52a1\u5bb4\u8bf7,\u968f\u4fbf\u5403\u5403,\u4f11\u95f2\u5c0f\u61a9",
                "business_state": "1",
                "description": "",
                "featured_service": ",\u53ef\u9001\u5916\u5356,\u53ef\u4ee5\u5305\u573a,\u53ef\u4ee5\u5237\u5361,\u53ef\u4ee5\u505c\u8f66,\u514d\u8d39\u505c\u8f66,\u80fd\u4e0a\u7f51,\u80fd\u5237\u5361,\u662f\u8001\u5b57\u53f7,\u6709\u5305\u53a2,\u6709\u65e0\u70df\u533a,\u6709\u591c\u5bb5",
                "recommendation": ",\u5241\u6912\u9c7c\u5934,\u5241\u6912\u9c7c\u5934\u3001\u7cd6\u918b\u6392\u9aa8\u3001\u9ec4\u8c46\u732a\u8e44,\u9e45\u809d,\u9171\u62cc\u8106\u7b0b,\u6bdb\u6c0f\u7ea2\u70e7\u8089,\u6392\u9aa8\u7096\u83b2\u85d5,\u5176 \u5b83,\u4e09\u9c9c\u8c46\u76ae,\u6c34\u716e\u725b\u8089,\u6c34\u716e\u9c7c,\u9178\u6912\u725b\u86d9,\u9178\u6912\u9c7c\u7247,\u7cd6\u918b\u6392\u9aa8,\u6843\u5b50,\u5c0f\u7092\u9ec4\u725b\u8089,\u7af9\u7b52\u7c89\u84b8\u6392\u9aa8",
                "reservation": [{
                    "src": "fantong",
                    "url": "http:\/\/www.fantong.com\/biz-order-224242\/",
                    "url_mobile": "http:\/\/www.fantong.com\/biz-order-224242\/"
                }],
                "shop_hours": "",
                "recommend_commodity": [
                    {
                        "commodity_name": "麻辣香锅",
                        "recommend_num": "1028",
                        "image": [
                        {
                            "cn_name": "大众点评",
                            "imgUrl": "http://i1.dpfile.com/pc/d2e1c480dcbdab94cb2dbc790483161e(249x249)/thumb.jpg",
                            "link": "http://www.dianping.com/shop/2987527/photos",
                            "name": "dianping"
                        }
                        ]
                    },
                    {
                        "commodity_name": "麻辣香锅",
                        "recommend_num": "1028",
                        "image": [
                        {
                            "cn_name": "大众点评",
                            "imgUrl": "http://i1.dpfile.com/pc/d2e1c480dcbdab94cb2dbc790483161e(249x249)/thumb.jpg",
                            "link": "http://www.dianping.com/shop/2987527/photos",
                            "name": "dianping"
                        }
                        ]
                    },
                    {
                        "commodity_name": "麻辣香锅",
                        "recommend_num": "1028",
                        "image": [
                        {
                            "cn_name": "大众点评",
                            "imgUrl": "http://i1.dpfile.com/pc/d2e1c480dcbdab94cb2dbc790483161e(249x249)/thumb.jpg",
                            "link": "http://www.dianping.com/shop/2987527/photos",
                            "name": "dianping"
                        }
                        ]
                    },
                    {
                        "commodity_name": "麻辣香锅",
                        "recommend_num": "1028",
                        "image": [
                        {
                            "cn_name": "大众点评",
                            "imgUrl": "http://i1.dpfile.com/pc/d2e1c480dcbdab94cb2dbc790483161e(249x249)/thumb.jpg",
                            "link": "http://www.dianping.com/shop/2987527/photos",
                            "name": "dianping"
                        }
                        ]
                    },
                    {
                        "commodity_name": "麻辣香锅",
                        "recommend_num": "1028",
                        "image": [
                        {
                            "cn_name": "大众点评",
                            "imgUrl": "http://i1.dpfile.com/pc/d2e1c480dcbdab94cb2dbc790483161e(249x249)/thumb.jpg",
                            "link": "http://www.dianping.com/shop/2987527/photos",
                            "name": "dianping"
                        }
                        ]
                    },
                    {
                        "commodity_name": "麻辣香锅",
                        "recommend_num": "1028",
                        "image": [
                        {
                            "cn_name": "大众点评",
                            "imgUrl": "http://i1.dpfile.com/pc/d2e1c480dcbdab94cb2dbc790483161e(249x249)/thumb.jpg",
                            "link": "http://www.dianping.com/shop/2987527/photos",
                            "name": "dianping"
                        }
                        ]
                    },
                    {
                        "commodity_name": "麻辣香锅",
                        "recommend_num": "1028",
                        "image": [
                        {
                            "cn_name": "大众点评",
                            "imgUrl": "http://i1.dpfile.com/pc/d2e1c480dcbdab94cb2dbc790483161e(249x249)/thumb.jpg",
                            "link": "http://www.dianping.com/shop/2987527/photos",
                            "name": "dianping"
                        }
                        ]
                    }
                ]
            },
            "src_name": "cater"
        },
        "uid": "566a4deaba7b9a549d82ea3e",
        "name": "\u4e5d\u5934\u9e1f\u9152\u5bb6\u4e0a\u5730\u5e97",
        "geo": "1|12947536.64,4845449.36;12947536.64,4845449.36|12947536.64,4845449.36;",
        "addr": "\u6d77\u6dc0\u533a\u4e0a\u5730\u897f\u8def\u4e1c\u5317\u65fa\u7efc\u5408\u697c\uff08\u5fd7\u8fdc\u5927\u53a6\u659c\u5bf9\u9762\uff09",
        "phone": "(010)62979650",
        "area": "1960"
    }
}
*/