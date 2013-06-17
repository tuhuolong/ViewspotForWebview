window.templateType = 'more';

/*
 *重置页面内容   
 */
function resetPageContent() {
    if(T.g('container')){
        T.g('container').style.display = 'none';
    }
}

/**
 *填充数据
 *@param {obj} json 数据内容 必填
 *@param {string} type 数据来源 saveData 标示来源与本地存储;
 */
function fillData(extD, opts) {
    var opts = opts || {},
        type = opts.type || {};

    if(!extD) return;


    //输出商户详细信息
    if(extD.rich_info){
        moreInfo(extD);
    }

    //通知客户端设置webview高度
    callAppFun('relayout');
}

function moreInfo(extD) {
    var data = extD.rich_info,
        src_name = extD.src_name;
        

    //如果没有信息则返回;
    if(!data){
        return;
    }

    var htmls = [],
        data_config = dataConfig[src_name];

    if(data_config && data_config.more_key && data_config.more_key.length && data_config.more_info){
    
        for(var i=0;i<data_config.more_key.length;i++){
            var key = data_config.more_key[i];
            if(data[key] && data_config.more_info[key] && data_config.more_info[key].name){

                var _value = data[key].replace(/,/g,'&nbsp;&nbsp;');

                htmls.push('<div class="container box_1">');
                htmls.push('    <ul class="list shop min_hei_1" id="richInfo">');
                htmls.push('        <li class="h3">'+ data_config.more_info[key].name +'</li>');
                htmls.push('        <li>'+ _value +'</li>');
                htmls.push('    </ul>');
                htmls.push('</div>');

            }
        }
    }

    
    T.g('container').style.display = '';
    T.g('container').innerHTML = htmls.join('');
}