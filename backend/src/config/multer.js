const multer = require('multer');
const path = require('path')
const crypto = require('crypto');
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')


/**
 * Configuração do storage S3
 */
const storageTypes = {
    local:  multer.diskStorage({
        destination:(req,file,callback)=>{
            callback (null,path.resolve(__dirname,'..','..','temp','uploads')) //destino dos arquivos
        },
        filename:(req,file,callback)=>{ //define um hash a ser posto no inicio do nome da imagem, p/não ter img com msm nome
            crypto.randomBytes(16,(err, hash)=>{
                if(err) callback(err);

                file.key =`${hash.toString('hex')}-${file.originalname}` //converter os bytes gerados pelo crypto em hexadecimal

                callback (null, file.key)
            }) 
        }
    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket:'uploadImg',
        contentType: multerS3.AUTO_CONTENT_TYPE, // para o navegador exibir a imagem e não baixa-lo de vez
        acl: 'public-read',
        key:(req,file,callback)=>{
            crypto.randomBytes(16,(err, hash)=>{
                if(err) callback(err);

                const fileName =`${hash.toString('hex')}-${file.originalname}` //converter os bytes gerados pelo crypto em hexadecimal

                callback (null,fileName)
            }) 
        }
    })

    
}

module.exports ={
    dest: path.resolve(__dirname,'..','..','temp','uploads'), //destino dos arquivos, casa não especficado
    storage:storageTypes[process.env.STORAGE_TYPE],
    limits:{
        fileSize: 2 * 1024 * 1024, //limite no tamanho do arquivo(2mb)
    },
    fileFilter:(req, file, callback) =>{
        const allowedMimes =[ //formatos de imagens suportados
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif",
        ];

        if (allowedMimes.includes(file.mimetype)) {
            callback(null,true) //retorna sucesse(true)
        } else {
            callback(new Error("Invalid file type!"))
        }
    }
}