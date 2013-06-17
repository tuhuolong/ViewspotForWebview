
/**
 * 实时动态信息展示
 * @author jason.zhou
 * @param {Array} response 数据
 * @param {String} uid 
 * @param {Object}  
 */

function realTimeInfo(json, uid, opts) {
    setTemp.realTimeInfo = setTemp.realTimeInfo || {};
    /*json = [{
    "from": "s.baidu.com",
    "cn_name": "\u767e\u5ea6\u8eab\u8fb9",
    "name": "shenbian",
    "review_num": "4",
    "info": [{
        "content": "test1",
        "date": "6711\u5c0f\u65f6\u524d",
        "id": "826441",
        "user_name": "Firelake_Lee",
        "user_logo": "",
        "price": "0",
        "rating": {
            "\u53e3\u5473": 0,
            "\u670d\u52a1": 0,
            "\u73af\u5883": 0
        },
        "one_url": "http:\/\/s.baidu.com\/comment\/88c3f066581e957c88344f00",
        "overall_rating": "5"
    }, {
        "content": "\u4eba\u8fd8\u662f\u5f88\u591a\u7684\uff0c\u800c\u4e14\u4e5f\u5728\u90a3\u8fb9\u7684\u91cd\u70b9\u5546\u4e1a\u533a\uff0c\u65c1\u8fb9\u662f\u56fd\u6cf0\u767e\u8d27\uff0c\u5bf9\u9762\u5219\u662f\u6c38\u8f89\u8d85\u5e02\uff0c\u54c8\u54c8\uff0c\u6240\u4ee5\uff0c\u6bcf\u6b21\u53bb\u7684\u65f6\u5019\u5fc5\u987b\u6ca1\u6709\u4f4d\u7f6e\u554a\uff0c\u4e24\u5c42\u697c\u7684\u6837\u5b50\uff0c\u4e00\u5c42\u6c38\u8fdc\u6ca1\u6709\u7a7a\u4f4d\uff0c\u4e8c\u697c\u7a7a\u95f4\u8fd8\u662f\u86ee\u5927\u7684",
        "date": "11994\u5c0f\u65f6\u524d",
        "id": "685332",
        "user_name": "\u8336\u8336",
        "user_logo": "http:\/\/hiphotos.baidu.com\/view\/abpic\/item\/7e3e6709c93d70cf6852f374f8dcd100baa12b1a.jpg",
        "price": "30",
        "rating": {
            "\u53e3\u5473": 5,
            "\u670d\u52a1": 5,
            "\u73af\u5883": 5
        },
        "one_url": "http:\/\/s.baidu.com\/comment\/abd16dc4872316d9aeb404e9",
        "overall_rating": "5"
    }, {
        "content": "\u70ed\u95f9\u8981\u4e86\u4e24\u5757\u542e\u6307\u539f\u5473\u9e21\uff0c\u5403\u5b8c\u633a\u817b\u7684\uff0c\u8fd8\u5403\u4e86\u4e00\u4e2a\u65b0\u63a8\u51fa\u7684\u9ebb\u85af\u86cb\u631e\uff0c\u89c9\u5f97\u4e0d\u600e\u4e48\u597d\u5403\uff0c\u90a3\u5757\u9ebb\u85af\u6ca1\u4ec0\u4e48\u5473\u9053\uff0c\u3002\u4eba\u4e00\u76f4\u4e0d\u600e\u4e48\u5c11\u3002\u3002",
        "date": "16838\u5c0f\u65f6\u524d",
        "id": "402107",
        "user_name": "ixi",
        "user_logo": "http:\/\/hiphotos.baidu.com\/view\/abpic\/item\/9213b07eca806538bd3d26a997dda144ac3482b1.jpg",
        "price": "0",
        "rating": {
            "\u53e3\u5473": 3,
            "\u670d\u52a1": 3,
            "\u73af\u5883": 3
        },
        "one_url": "http:\/\/s.baidu.com\/comment\/fb98ec77eb7c378cbc09dbbe",
        "overall_rating": "3"
    }, {
        "content": "\u6700\u559c\u6b22\u6765\u7684\u5feb\u9910\u5e97\u4e86\uff0c\u6bcf\u6b21\u901b\u8857\u7684\u65f6\u5019\uff0c\u90fd\u4f1a\u627e\u80af\u5fb7\u57fa\u5403\uff0c\u5e38\u70b9\u7684\u5c31\u662f\u9999\u8fa3\u9e21\u817f\u5821\uff0c\u4e00\u676f\u53ef\u4e50\uff0c\u4e00\u4efd\u4e2d\u5206\u7684\u85af\u6761\uff0c\u5f88\u5c11\u53bb\u5403\u9e21\u7fc5\u7684\uff0c\u751c\u7b52\u4e0d\u9519\uff0c\u5403\u5728\u5634\u91cc\u6d53\u6d53\u7684\u5976\u9999\u5473\u3002",
        "date": "16854\u5c0f\u65f6\u524d",
        "id": "387741",
        "user_name": "\u5fc3\u788e\u7684\u611f\u89c9",
        "user_logo": "http:\/\/hiphotos.baidu.com\/view\/abpic\/item\/8cb1cb13495409233ac7ec059258d109b3de491b.jpg",
        "price": "30",
        "rating": {
            "\u53e3\u5473": 4,
            "\u670d\u52a1": 4,
            "\u73af\u5883": 4
        },
        "one_url": "http:\/\/s.baidu.com\/comment\/f2fb93d2233ed3ea4d05b876",
        "overall_rating": "4"
    }],
    "url": "http:\/\/s.baidu.com\/shop\/ee3c5c5159ff7acc69b06934\/#commentList",
    "src_url": "http:\/\/s.baidu.com\/shop\/ee3c5c5159ff7acc69b06934"
}];*/
    if (uid != window.poiInfo.uid) {
        return;
    }
    if (!(json && json[0].info && json[0].info.length)) {
        return;
    }
    json[0].info = T.array.filter(json[0].info, function(item, i){
        item.user_logo = item.user_logo || '../img/default_usericon.png';
        return !!item.user_name && !!item.user_logo && !!item.date && !!item.content; // 
    });
    if (!json[0].info.length){
        return;
    }
    var info = setTemp.realTimeInfo.info = json[0].info,
        scrollWidth = info.length * 60,
        width = getPicSideWid({'width':30}),
        tpl = [
            '<div class="h3">实时动态</div>',
            '<div class="realtime">',
                '<div id="realtimeDetail" class="realtime-detail"></div>',
                '<div id="realtimeList" class="realtime-list">',
                    '<div style="width:'+ (scrollWidth + width * 2 )+'px;">',
                    '<ul class="realtime-pic-list">',
                        '<% for(var i = 0, d; d = data[i]; i++ ) { %>',
        '<% if(i == 0) { %>',
                            '<li style="margin-left:' + (width - 5) + 'px" onmouseup="realtimeScroll.scrollToPage(<%=i%>)"><img src="<%=d.user_logo%>"/></li>',
        '<% } else { %>',
                            '<li onmouseup="realtimeScroll.scrollToPage(<%=i%>)"><img src="<%=d.user_logo%>"/></li>',
        '<% } %>',
                        '<% } %>',
                    '</ul>',
                    '</div>',
                '</div>',
                '<div class="bottom_nav"><span><a onclick="addStat(STAT_INDEX_REALINFO_ADD_COMM);callAppFun(\'openModule\',{\'name\':\'sbUgc\'});;">我在现场</a></span><span><a onclick="addStat(STAT_INDEX_REALINFO_COMM_MORE);callAppFun(\'newwindow\',{\'page\':\'comment.html\'})" href="javascript:void(0)">查看更多评论<em class="goto_icon_1"></em></a></span></div>',
            '</div>'
        ];
    var listCompiled = Tutu.Template(tpl.join(''));
    T.g('realtimeInfo').innerHTML = listCompiled({'data':info});
    T.g('realtimeInfo').style.display = '';
    addRealtimeScroll();
    addStat(STAT_INDEX_HAVE_RealInfo);
    callAppFun('relayout');
}
function addRealtimeScroll() {
    var wrapper = T.g('realtimeList');

    if(!wrapper){
        return;
    }
    var len = setTemp.realTimeInfo.info.length,
        _goto_num = len > 1 ? 1 : 0;

    window['realtimeScroll'] = new iScroll(wrapper, {
        snap: true,
        momentum: false,
        hScrollbar: false,
        scrollPart : false,
        onBeforeScrollStart : null,
        x : - (_goto_num * 60),
        currPageX : _goto_num,
        wrapperW : 60,
        noScrollWid : getPicSideWid({'width':30}) + 100,
        onScrollEnd : function(){
            realTimeDetail(this.currPageX);
        }
     });

     realTimeDetail(_goto_num);
}
/**
 * 显示实时动态明细
 * @author jason.zhou
 */
function realTimeDetail(index) {
    var tpl = [
        '<dl>',
            '<dt><img src="../img/transparent.gif" class="timeclock"/><span><%=date%></span><span><%=user_name%></span></dt>',
            '<dd><%=content%></dd>',
        '</dl>',
        '<div class="arrow-down"></div>'
    ];
    var listCompiled = Tutu.Template(tpl.join(''));
    T.g('realtimeDetail').innerHTML = listCompiled(setTemp.realTimeInfo.info[index]);
}

