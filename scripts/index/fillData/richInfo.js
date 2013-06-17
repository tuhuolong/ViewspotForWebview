
/*商户详细信息*/
function richInfo(extD,opts){
    resetTemp.richInfo = resetTemp.richInfo || {};
    var data = extD.rich_info || {},
        dataNum = 0,
        haveMoreInfo = false,
        src_name = extD.src_name,
        opts = opts || {},
        type = opts.type || {},
        htmls = [],
        length_limited = 150,
        data_config = dataConfig[src_name] || dataConfig['defaul_t'];

    //推荐菜测试
//    data.recommendation = '红薯   鸡翅   鸡心   烤肠   梅肉   牛肩峰    牛舌   培根卷   三角肉   羊肉串牛肩峰    牛舌   培根卷   三角肉   羊肉串';
    //商户描述测试
//    data.description = '肉食动物的最爱。烤肉一轮一轮地上，口味对得起价钱。三角肉超好吃，牛肩峰非常嫩，火鸡卷咸咸的，很有嚼头。自助台上各种色拉也挺丰富，很能解腻。环境还不错。';


    //判断是否有更多详情
    if(data_config &&　data_config.more_key && data_config.more_key.length){
        for(var i=0;i<data_config.more_key.length;i++){
            if(data[data_config.more_key[i]] ){
                haveMoreInfo = true;
                break;
            }
        }
    }


    if(data_config &&　data_config.rich_key && data_config.rich_key.length && data_config.rich_info){

        for(var i=0;i<data_config.rich_key.length;i++){

            if(!data_config.rich_info[data_config.rich_key[i]]){
                continue;
            }

            var key = data_config.rich_key[i],
                class_name = data_config.rich_info[key].className || '',
                class_mar = ' mt-10';

            if(dataNum == 0){
                class_mar = '';
            }

            if(data[key] && data_config.rich_info[key] && data_config.rich_info[key].name){

                var short_info = data[key],
                    info_leng = short_info.length >length_limited ? length_limited : short_info.length;

                //字数超过150个字后，进行裁剪;
                if(short_info.length >length_limited){
                    short_info = short_info.slice(0,info_leng) + '...';
                }

//                if(data_config.rich_info[key].showType == 'oneline'){
                htmls.push('    <li class="h3'+ class_mar +'">' + data_config.rich_info[key].name + '</li>');

                if(key == 'recommendation' && data.recommend_commodity && data.recommend_commodity[0]){
                    short_info = short_info.replace(/,/g,'&nbsp;&nbsp;&nbsp;');
                    htmls.push('    <li onclick="showRecommend()" class="pd-13 box_1 '+ class_name +'"><p class="pd-16">' + short_info + '</p>');
                    resetTemp.richInfo.haveRecommend = 1;
                }else{
                    htmls.push('    <li class="box_1 '+ class_name +'"><p class="pd-5">' + short_info + '</p>');
                }
                htmls.push('</li>');
//                }else{
//                    htmls.push('    <li class="h3 font_2">'+ data_config.rich_info[key].name +'</li>');
//                    htmls.push('    <li class="'+ class_name +'">'+ short_info +'</li>');
//                }
                
                //说明richInfo有数据
                dataNum ++;
            }
        }

    }

    //如果没有数据则隐藏dom元素;
    if(type != 'emptyData' && !dataNum){
        T.g("richCon").style.display = 'none';
        return;
    }

    //输出更多详情;
    if(haveMoreInfo){
        htmls[htmls.length -1] = '<div class="bottom_nav bottom_nav_1"><div><span><a href="javascript:void(0)" onclick="addStat(\''+ STAT_INDEX_CLICK_RICH + '\');callAppFun(\'newwindow\',{page:\'more.html\'});event.stopPropagation();">查看更多简介<em class="goto_icon_1"></em></a></span></div></div>';
    }

    //插入HTML代码
    T.g("richInfo").innerHTML = htmls.join('');
    //显示dom容器
    T.g("richCon").style.display = '';
}
//add by jgd 
/*打开推荐菜二级页面，并向二级页面传递参数
**参数内容：etxD.rich_info.recommend_commodity    (是一个数组[*])
**
*/
function showRecommend(){
    //alert(extD.rich_info.recommend_commodity[0]);
    addStat(STAT_CATER_TJ_CLICK);
    callAppFun('newwindow',{'page':'recommend.html'});

}
