

/*商户认领*/

function claimShop(extD, opts){
    resetTemp.claimShop = resetTemp.claimShop || {};

    if(!extD){
        return;
    }
    
    var data = extD.detail_info;
    if(data && data.new_catalog_id){
        var catalogStr = data.new_catalog_id,
            catalogState = false,
            catalogStrConfig = {"01":true, "07":true, "02":true, "03":true, "09":true, "05":true, "06":true, "0e":true, "0a":true, "04":true, "0d":true, "14":true};
        
        if(catalogStrConfig[catalogStr.substring(0, 2)]){
            catalogState = true;
        }else{
            catalogState =  false; 
        } 
    }

    if(catalogState == true){
        if(T.g('shellCon_con')){
           T.g('shellCon_con').style.marginBottom = "0";
        }
        resetTemp.claimShop.myShop = 1;
        T.g('myShop').style.display = "block";
        
    }        
}
