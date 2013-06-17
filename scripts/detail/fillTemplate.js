/**
 *填充数据
 *@param {obj} json 数据内容 必填
 *@param {string} type 数据来源 saveData 标示来源与本地存储;
 */
function fillTemplate(json, uid, opts) {

    try {

        //test by jgd
        //json = window.pubTestInfo;
        //

        var opts = opts || {},
            type = opts.type || '',
            updateDataPage = {
                'index' : '1',
                'comment' : '1',
                'groupon' : '1',
                'sale' : '1'
            };

        if(!(type == 'emptyData' || type == 'checkData')){

            //使用数据开始填充模板的时间;
            window.statInfo.t4 = Date.now();
        }
        

        //因本地存储的只是 ext里面内容，所以做特殊处理
        if(window.templateType == 'impression' || (type && (type == 'saveData' || type == 'emptyData'))){
            //test by jgd
            //json = json.content.ext;
            //

            var extD = json;
        }else{
            //test by jgd
            //json = json;
            //

            var extD = json && json.content && json.content.ext || {};

            //将名称、地址、电话信息 存入 ext中;
            extD.name = json && json.content && json.content.name || '';
            extD.addr = json && json.content && json.content.addr || '';
            extD.phone = json && json.content && json.content.phone || '';

            if(!extD) return;
          
            extD = formatData(extD);

            //返回数据是否有更新;
            var isUpdateData = makeDataAndSave(extD, uid);
			
            //如果 返回数据的uid跟页面中的uid不一致或者数据没有更新则返回
            if(uid != poiInfo.uid || !isUpdateData){
                return;
            }

            if(type == 'checkData'){
                window.resetPageContent && window.resetPageContent('checkData');
            }
			
        }

        fillData(extD, opts);
        

        //如果取的是本地数据，则再次从服务器获取数据，并进行检查，本地数据是否最新;
        if(updateDataPage[window.templateType] && type && type == 'saveData'){
            setTimeout(function(){
                //如果本地缓存不存在则从服务端请求数据;
                getPlaceInfo('getAndCheckData');
            },3000)
        }

        
        

        
    }catch(e){
        var template = window.templateType || '';
        addStat(STAT_ERROR_1,{error:e.message, template:template});

        //通知客户端设置webview高度
        callAppFun('relayout');
    }finally{
        
    }
}