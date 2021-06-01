# ImgUpload
Aplicação para upload e compartilhamento(link) de imagens com font-end em react e back-end em nodeJS

# TECNOLOGIAS USADAS
    FRONT-END
        REACT

    BACK-END
        NODE JS
        EXPRESS
        MORGAN
        MULTER
       

## COMANDOS USADOS
    yarn add express morgan mongoose multer -D
    yarn add nodemon -D
    yarn add multer-s3  => permite fazer o storage na WS
    yarn add aws-sdk -d => permite fazer a integração com a S3
    yarn add dotenv => p/ o node poder ler o .env




### NOTAS
  MULTER:
    o multer vai funcionar como um middleware,
    moulter().single : fará o upload de apenas 1 arquivo por vez, p/ assim podemos acompanhar o progresso