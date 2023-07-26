const express=require('express');
const generateHash = require('./blockchain');
const fs=require('fs')
const app=express();
const blockchain=require('./blockchain.json')

const port=3000;
app.use(express.json())

app.post('/block',async(req,res)=>{
    try{
        let data=req.body.data;

        const newBlock=generateHash(data,(blockchain.length+1))

        const buffer=fs.readFileSync('blockchain.json', 'utf8')
        const parseData=JSON.parse(buffer)

        parseData.push(newBlock)

        fs.writeFile('blockchain.json', JSON.stringify(parseData), (e) => {
            if (e) {
                res.status(404).send(e.message);
            } else {
                res.status(200).send(newBlock);
            }
        })
    }catch(e){
        res.status(404).send(e.message)
    }
    
})


app.get('/block',async(req,res)=>{
    const query=req.query.blockNo

    try{
        res.status(200).send(blockchain[query-1])
    }catch(e){
        res.status(404).send(e.message)
    }
})

app.get('/block/stats',async(req,res)=>{
    const blockCount=blockchain.length
    const latestBlockHash=blockchain[blockCount-1].hex

    res.status(200).send({blockCount,latestBlockHash})
})


app.listen(port,()=>{
    console.log('Server is up on the port: ',port)
})
