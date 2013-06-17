/**
 * place
 */


/**
 *将图片转换成base64格式
 *@param {obj} info json对象
 *@info.url {string}图片地址 必须
 *@info.width  {string}图片宽度 width与height必须有一个
 *@info.height {string}图片高度 width与height必须有一个
 *@info.align  {string}图片裁剪方式 可选
 *@info.quality  {unmber}图片压缩比例 值1-100 可选
 *@info.id  {string}裁剪图片的id，裁剪后通过异步的形式返回，然后通过img id 设置图片的url
 */

function getImgBase64(info) {

    var url = info.url,
        width = info.width,
        height = info.height,
        align = info.align,
        quality = info.quality,
        id = info.id,
        _p_w = width ? 'width='+width+'&' : '',
        _p_h = height ? 'height='+height+'&' : '',
        _p_a = align ? 'align='+align+'&' : '',
        _p_q = quality ? 'quality='+quality+'&' : '';


    //如果没有图片url或者裁剪宽高都没给的时候直接返回;
    if(!url || !width && !height){
        return;
    }

    scriptRequest('http://map.baidu.com/maps/services/thumbnails?'+ _p_w +_p_h + _p_a + _p_q + 'src='+ url,'thumbnails',{'cbStr' : 'cb','cbFun' : 'setImageUrl','sendUid' : 1});

}
