
window.INPUT_VCODE = false;
window.templateType = 'wanda_movie_booking';
//隐藏元素；
function resetPageContent() {
    if(T.G('movieLayer')){
        T.G('movieLayer').style.display = 'none';
    }
}
function fillData(extD, opts) {
    var opts = opts || {},
        type = opts.type || {};

    if(!extD || !window.poiInfo || !window.poiInfo.uid) {
        return;
    }
    var  mUrl = "&third_from=" + window.poiInfo.third_from
            + "&seq_no=" + window.poiInfo.seq_no
            + "&cinema_id=" + window.poiInfo.cinema_id 
            + "&date=" + window.poiInfo.date 
            + "&movie_id=" + window.poiInfo.movie_id;
    movieUrl = config.dataUrl + '/detail?qt=movie&act=select&from=webview' + mUrl;
    
    wandaMovieCheck(movieUrl);
    callAppFun('relayout');

}


(function (){
    var sendMo = {
        modataCheck : function(){
            var t =  new Date().getTime();
            var imgCheck_js_url = "http://map.baidu.com/maps/services/captcha?cb=sendMo.getImg&t=" + t;
            scriptRequest(imgCheck_js_url, 'movieLayerCode');
         },

        getImg : function(data){
            window.vcode = data.content.vcode;
            T.G("imgCheck").src = "http://map.baidu.com/maps/services/captcha/image?vcode=" + vcode;
        },

        getTel: function(){
            if(localStorage.getItem("movie_tel")){
               T.G("phone_code").value = localStorage.getItem("movie_tel");
            }
            return T.G("phone_code").value;
        },

        sendmoC : function(url){
            var phoneCode = encodeURIComponent(T.G("phone_code").value);
            if (sendMo.isEmpty(phoneCode)) {
                sendMo.showTipMsg_Tel('请输入手机号码！');
                return;
            } 
            if (!sendMo.isMobilePhone(phoneCode)) {
             sendMo.showTipMsg_Tel('请输入正确的手机号码！');
             return;
            }
            sendMo.showTipMsg_Tel('');
            if(localStorage.getItem("movie_tel") && localStorage.getItem("movie_tel") == T.G("phone_code").value){   //如果手机号 等于本地存储
               goWanda(url);
               window.INPUT_VCODE = false;
            }else{
                if(T.G('movie_input_vcode')){
                    T.G('movie_input_vcode').style.display = 'block';
                    T.G('showTipMsg').style.display = 'block';
                    if(T.G('mo_input').value.length != 0){
                        T.G('showTipMsg').innerHTML = '验证码错误或失败，请重新输入！';
                    }else{
                        T.G('showTipMsg').innerHTML = '请输入验证码！';
                    }
                }
            }
            

            if(!!window.INPUT_VCODE && T.G('mo_input').value.length == 4){
               goWanda(url);
               sendMo.modataCheck();//刷新验证码
            }
            
        },

        sendVcode : function(url){ //检测验证码合法性
            sendMo.sendVcode.url = url;
            var mo_inputV = encodeURIComponent(T.G("mo_input").value);
            if (sendMo.isEmpty(mo_inputV)) {
                sendMo.showTipMsg('请输入验证码！');
                return;
            }
            
            window.INPUT_VCODE = false;
            var sendUrl = 'http://map.baidu.com/maps/services/captcha/verify?code=' + mo_inputV + '&vcode=' + window.vcode + '&cb=sendMo.checkVcode';
            scriptRequest(sendUrl, 'movieLayerCodeVerify');

        },

        checkVcode : function(data){

            if(data.result && data.result.error != 0){
                sendMo.showTipMsg('验证码错误或失败，请重新输入！');
                return;
            }

            window.INPUT_VCODE = true;

            sendMo.showTipMsg('输入正确!');
        },

        showTipMsg : function(txt){
            T.G("showTipMsg").innerHTML = txt; 
        },

        showTipMsg_Tel : function(txt){
            T.G("showTipMsg_Tel").innerHTML = txt; 
        },

          /**
        * 验证手机号合法性
        * @param {String} s 手机号码
        */
        isMobilePhone: function(s) {
            return /^\d{11}/.test(s);
        },
        /**
        * 验证内容参数是否为空
        * @param {String} s 字符内容
        */
        isEmpty: function(s) {
            return !/./.test(s);
        },
        /**
        * 验证码校验
        * @param {String} s 字符内容
        */
        isVCode: function(s) {
            return /^[a-zA-Z0-9]{4}$/.test(s);
        }
    }

    window.sendMo = sendMo;
})();


function wandaMovieCheck(url){
        T.G('movieLayer').style.display = "block";

        var htmls = [];

        htmls.push('<div class="movieLayerBox">');
        htmls.push('<div class="phone_code"><span>手机号：</span><em onclick="chearValue(\'phone_code\')"></em><div class="inputBox"  onclick="getfocus(\'phone_code\');"><input type="tel" id="phone_code" value="" maxlength="11" /></div></div>');
        htmls.push('<div id="showTipMsg_Tel" class="showTipMsg"></div>');
        htmls.push('<div class="mo_input" id="movie_input_vcode" style="display:none" onclick="getfocus(\'mo_input\');"><span>验证码：</span><div class="vcodeBox"><input type="text" id="mo_input" maxlength="4" oninput="OnInput(event)" /></div><img src="" class="imgSrc"  id="imgCheck" onclick="sendMo.modataCheck()" /></div>');
        htmls.push('<div id="showTipMsg" style="display:none" class="showTipMsg"></div>');
        htmls.push('<div class="btn"><a id="goWandaUrl"  href="javascript:void(0)"  onclick="sendMo.sendmoC(\'' + url + '\');return false;">提交</a></div>');
        htmls.push('<div class="txt">验证手机号码，即可选择购票</div>')
        htmls.push('</div>');
        T.G('movieLayer').innerHTML = htmls.join('');

        if(localStorage.getItem("movie_tel")){
            T.G('movie_input_vcode').style.display = 'none';
            T.G('showTipMsg').style.display = 'none';
        }else{
            T.G('movie_input_vcode').style.display = 'block';
            T.G('showTipMsg').style.display = 'block'; 
        }
        
       sendMo.modataCheck();   //刷新验证码
       sendMo.getTel();   //获取本地存储手机号码
}

function getfocus(id){
    T.G(id).focus();
}

function goWanda(url){
    if(!url){
        return;
    }
    var tel = T.G("phone_code").value;
    localStorage.setItem("movie_tel", tel);
    sendMo.showTipMsg('');
    sendMo.showTipMsg_Tel('');
    url += "&user_mobile=" + encodeURIComponent(T.G("phone_code").value) + "&t=" + new Date().getTime();   
    movieOpenLink(url, STAT_INDEX_MOVIE_WANDA);
    T.G('movie_input_vcode').style.display = 'none';
    T.G('showTipMsg').style.display = 'none';
    T.G('mo_input').value = '';

    window.INPUT_VCODE = false;
}

function movieOpenLink(url, code){
    
    window.open(url);

    if(code){
        addStat(code);
    }
}

function OnInput (event) {
   if(event.target.value.length == 4){
         sendMo.showTipMsg('验证中...');
         sendMo.sendVcode();
    }else{
         sendMo.showTipMsg(''); 
    }
}

function chearValue(id){
    T.G(id).value = '';
    getfocus(id)
}