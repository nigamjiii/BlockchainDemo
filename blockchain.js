const cryptoJS=require('crypto-js')
const blockchain=require('./blockchain.json')
const blockchainLength=blockchain.length
console.log(blockchainLength)

const generateHash= function (data,blockNo){
    let difficulty="00"
    let nounce=0;
    let hex="";

    let temp=true;

    while(temp){
    
        hash=cryptoJS.SHA256(data+nounce.toString())
        
    
        let hexHash= hash.toString(cryptoJS.enc.Hex);
    
        if(hexHash.startsWith(difficulty)){
            hex=hexHash;
            temp=false;
        }else{
            nounce++;
        }
    }

    let block={
        blockNo,
        data,
        nounce,
        hex,
        prevHash:blockchain[blockchainLength-1].hex
    }
    return block


}

module.exports=generateHash

