function getParam(url){
    if(url.indexOf("?") > -1) {
      var query = url.slice(url.indexOf("?")+1);
    } else if (url.indexOf("#") > -1) {
      var query = url.slice(url.indexOf("#")+1);
    } else {
      return;
    }
  if(query == "")
    return
  var param = {};
  var p = query.split("&");
  for(var i = 0; i<p.length ; i++){
    var q = p[i].split("=");
    param[q[0]]=q[1];
  }
  return param;
}


(function(){
    var url = document.location.href;
	var uid = getParam(url) && getParam(url).uid;
	setPlaceInfo('{uid:"'+uid+'"}');
})()