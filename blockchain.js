const cryptoJS=require('crypto-js')
const blockchain=require('./blockchain.json')

const generateHash= function (data){
    var difficulty="00"
    var nounce=0;
    let hash="";
    var temp=true;

    while(temp){
    
        var bufferHash=cryptoJS.SHA256(data+nounce.toString())
        
        
    
        var hexHash= bufferHash.toString(cryptoJS.enc.Hex);
    
        if(hexHash.startsWith(difficulty)){
            hash=hexHash;
            temp=false;
        }else{
            nounce++;
        }
    }

    
    return {nounce,hash}


}

module.exports=generateHash

