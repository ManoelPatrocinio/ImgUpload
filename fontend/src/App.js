import React, {Component} from 'react';
import {uniqueId} from 'lodash';
import filesize from "filesize";
import api from "./services/api"
import GlobalStyle from './styles/global';
import {Container, Content} from "./styles";

import Upload from './components/Upload';
import FileList from './components/FileList';

class App  extends Component{
  state ={
    uploadedFiles:[], //armazena a informação dos arquivos que o user fez upload
  }

  async componentDidMount() { // listagem das imagem já carregadas
    const response = await api.get("posts");

    this.setState({
      uploadedFiles: response.data.map(file => ({
        id: file._id,
        name: file.name,
        readableSize: filesize(file.size),
        preview: file.url,
        uploaded: true,
        url: file.url
      }))
    });
  }

  handleupload = files =>{
    const uploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size), //nomeclatura do arquivo
      preview: URL.createObjectURL(file), // gera uma url antes dele chagar ao server
      progress: 0, // progresso inicia com 0
      uploaded: false, // se fez upload
      error: false, 
      url: null // url pra preview da imagem
    }))

    
    this.setState({
      uploadedFiles : this.state.uploadedFiles.concat(uploadedFiles) // adiciona a lista a nova img
    });

    uploadedFiles.forEach(this.processUpload); //mostra o status de processamento do upload  
  }

  updateFile = (id, data) => {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      })
    });
  };

  processUpload = (uploadedFile) =>{ //faz a requisição de 1 arquivo por vez
    const data = new FormData();

    data.append('file', uploadedFile.file, uploadedFile.name);
    api.post("posts",data,{
      onUploadProgress:e =>{
        const progress = parseInt(Math.round(( e.loaded * 100) / e.total));//retorn o progresso de requisição
        this.updateFile(uploadedFile.id, {
          progress
        });
      }  
    }).then(response =>{
      this.updateFile(uploadedFile.id,{
        uploaded: true,
        id: response.data._id,
        url: response.data.url
      })
    })
    .catch( () => {
      this.updateFile(uploadedFile.id,{
        error: true,
        
      })
    })
  }


  handleDelete = async id =>{
    await api.delete(`posts/${id}`);
    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id),
    })
  }

  componentWillUnmount(){ //limpa o cache de imagem do navegador
    this.state.uploadedFiles.forEach(file =>URL.revokeObjectURL(file.preview))
  }
  render(){
    const { uploadedFiles } = this.state;
    return (
      <Container>
        <Content>
          <Upload onUpload={this.handleupload}/>
          {!! uploadedFiles.length &&(
            <FileList files={uploadedFiles} onDelete={this.handleDelete}/>
          )}
        </Content>
        <GlobalStyle/>
      </Container>
    ) 
  }
}

export default App;