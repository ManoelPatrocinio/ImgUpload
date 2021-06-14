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
        AXIOS
       

## COMANDOS USADOS
    yarn add express morgan mongoose multer -D
    yarn add nodemon -D
    yarn add multer-s3  => permite fazer o storage na WS
    yarn add aws-sdk -d => permite fazer a integração com a S3
    yarn add dotenv => p/ o node poder ler o .env
    yarn add styled-components => permite criar componentes stilizados
    yarn add react-dropzone => permite criar zona de upload
    yarn add react-circular-progressbar => perimte o usa de barra de progresso circular
    yarn add react-icons
    yarn add lodash => traz uma serie de ultilitarios
    yarn add filesize => nomeclatur 







### NOTAS
  MULTER:
    o multer vai funcionar como um middleware,
    moulter().single : fará o upload de apenas 1 arquivo por vez, p/ assim podemos acompanhar o progresso