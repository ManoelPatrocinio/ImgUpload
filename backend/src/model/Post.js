// ira defini a estrutura do table no BD

const mongoose = require('mongoose')
const aws = require('aws-sdk')
const fs = require('fs') //lib node para lidar com arquivos
const path = require('path')
const {promisify} = require('util')// converte a antiga forma de callback para a nova

const s3 =  new aws.S3()

const PostSchema = new mongoose.Schema({
    name:String,
    size:Number,
    key:String,
    url:String,
    createdAt:{
        type:Date,
        default:Date.now 
    }
})

//pre: executa antes de salvar no BD
PostSchema.pre('save',function(){ 
   
    if(!this.url){
        this.url = `${process.env.APP_URL}/files/${this.key}`;
    }

})

PostSchema.pre('remove',function(){
    if(process.env.STORAGE_TYPE === 's3'){
        return s3.deleteObject({
            Bucket: process.env.AWS_BUCKET,
            key:this.key
        }).promise()
    }else{
        //fs.unlink :deleta um arquivo no disco
        return promisify(fs.unlink)( 
            path.resolve(__dirname,"..","..","temp","uploads",this.key)
        );
    }
})
module.exports = mongoose.model("Post",PostSchema)
