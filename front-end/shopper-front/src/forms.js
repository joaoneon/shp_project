import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);
  const [isValidationSuccessful, setIsValidationSuccessful] = useState(false);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append('csvFile', selectedFile);

      try {
        const response = await axios.post('http://localhost:3001/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Arquivo enviado com sucesso:', response.data);
        if (response.status === 200) {
          setIsUploadSuccessful(true);
        }
      } catch (error) {
        console.error('Erro ao enviar o arquivo:', error);
      }
    }
  };

  const handleValidation = async () => {
    try {
      const response = await axios.get('http://localhost:3001/validar-arquivo');

      if (response.status === 200) {
        setIsValidationSuccessful(true);
      }
    } catch (error) {
      console.error('Erro ao validar o arquivo:', error);
    }
  };

  const handleUpdate = async () =>{
    try {
      const response = await axios.put('http://localhost:3001/update-db');
      
      if (response.status === 200){
        alert('Banco de dados atualizado');
      }
    } catch (error) {
      console.error('Erro ao atualizar o banco de dados: ', error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileSelect} />
      <button type="submit">Enviar</button>
      <button id="botao-validar" onClick={handleValidation} disabled={!isUploadSuccessful}>Validar Arquivo</button>
      <button id="botao-integrar" disabled={!isValidationSuccessful} onClick={handleUpdate}>Alterar no BD</button>
    </form>
  );
};

export default FileUpload;
